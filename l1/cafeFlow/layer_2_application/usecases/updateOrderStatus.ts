/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { canTransitionOrder } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';
export interface UpdateOrderStatusInput {
orderId: string;
status: string;
cancellationReason?: string;
}
export interface UpdateOrderStatusOutput {
orderId: string;
status: string;
confirmedAt?: string | null;
inPreparationAt?: string | null;
readyAt?: string | null;
servedAt?: string | null;
cancelledAt?: string | null;
cancellationReason?: string | null;
updatedAt: string;
}
const ALLOWED_TARGET_STATUSES: ReadonlySet<string> = new Set([
'confirmed',
'inPreparation',
'ready',
'served',
'cancelled',
]);
interface RecipeIngredient {
stockItemId: string;
quantityPerPortion: number;
}
interface MdmEntityRef {
mdmId: string;
version: number;
details: unknown;
}
function extractIngredients(details: unknown): RecipeIngredient[] {
const root = (details ?? {}) as Record<string, unknown>;
const moduleDetails = (root.cafeFlow ?? root) as Record<string, unknown>;
const raw = moduleDetails.ingredients ?? moduleDetails.recipe ?? root.ingredients;
if (!Array.isArray(raw)) {
return [];
}
const result: RecipeIngredient[] = [];
for (const entry of raw) {
const row = (entry ?? {}) as Record<string, unknown>;
const stockItemId = row.stockItemId;
const quantityPerPortion = row.quantityPerPortion;
if (typeof stockItemId !== 'string' || stockItemId.length === 0) {
continue;
}
const qty = typeof quantityPerPortion === 'number' ? quantityPerPortion : Number(quantityPerPortion);
if (!Number.isFinite(qty) || qty < 0) {
continue;
}
result.push({ stockItemId, quantityPerPortion: qty });
}
return result;
}
function readCurrentBalance(details: unknown): number {
const root = (details ?? {}) as Record<string, unknown>;
const moduleDetails = (root.cafeFlow ?? {}) as Record<string, unknown>;
const raw = moduleDetails.currentBalance ?? root.currentBalance ?? 0;
const value = typeof raw === 'number' ? raw : Number(raw);
return Number.isFinite(value) ? value : 0;
}
function assertOrderStatusTransition(from: OrderStatus, to: OrderStatus): void {
if (to === 'served' && from !== 'ready') {
throw new AppError(
'VALIDATION_ERROR',
'onlyReadyOrdersCanBeServed: only orders with status ready can transition to served.',
400,
{ ruleId: 'onlyReadyOrdersCanBeServed', from, to },
);
}
if (to === 'confirmed' && from !== 'registered') {
throw new AppError(
'VALIDATION_ERROR',
'orderEntersKitchenQueueAfterAttendantConfirmation: confirmed is allowed only from registered (attendant confirmation).',
400,
{ ruleId: 'orderEntersKitchenQueueAfterAttendantConfirmation', from, to },
);
}
const kitchenForward: Partial<Record<OrderStatus, OrderStatus>> = {
registered: 'confirmed',
confirmed: 'inPreparation',
inPreparation: 'ready',
};
if (to === 'confirmed' || to === 'inPreparation' || to === 'ready') {
if (kitchenForward[from] !== to) {
throw new AppError(
'VALIDATION_ERROR',
'kitchenStatusProgressesInOrder: kitchen status must progress registered→confirmed→inPreparation→ready.',
400,
{ ruleId: 'kitchenStatusProgressesInOrder', from, to },
);
}
}
if (!canTransitionOrder(from, to)) {
throw new AppError(
'VALIDATION_ERROR',
`Invalid order status transition from ${from} to ${to}.`,
400,
{ from, to },
);
}
}
async function applyAutoStockDeductionOnServe(
ctx: RequestContext,
order: Order,
now: string,
stockConsumptions: IStockConsumptionRepository,
): Promise<void> {
// rule: autoStockDeductionOnServe
const qtyByMenuItemId = new Map<string, number>();
for (const item of order.items) {
if (String(item.status) === 'cancelled') {
continue;
}
if (typeof item.menuItemId !== 'string' || item.menuItemId.length === 0) {
continue;
}
qtyByMenuItemId.set(item.menuItemId, (qtyByMenuItemId.get(item.menuItemId) ?? 0) + item.quantity);
}
const menuItemIds = [...qtyByMenuItemId.keys()];
if (menuItemIds.length === 0) {
return;
}
const menuEntities = (await ctx.mdm.collection.getMany({ mdmIds: menuItemIds })) as unknown as MdmEntityRef[];
const requiredByStockItemId = new Map<string, number>();
for (const entity of menuEntities) {
const orderQty = qtyByMenuItemId.get(entity.mdmId) ?? 0;
if (orderQty <= 0) {
continue;
}
for (const ingredient of extractIngredients(entity.details)) {
const need = ingredient.quantityPerPortion * orderQty;
requiredByStockItemId.set(
ingredient.stockItemId,
(requiredByStockItemId.get(ingredient.stockItemId) ?? 0) + need,
);
}
}
const stockItemIds = [...requiredByStockItemId.keys()];
if (stockItemIds.length === 0) {
return;
}
const stockEntities = (await ctx.mdm.collection.getMany({ mdmIds: stockItemIds })) as unknown as MdmEntityRef[];
const stockById = new Map(stockEntities.map((entity) => [entity.mdmId, entity]));
for (const stockItemId of stockItemIds) {
const consumedQty = requiredByStockItemId.get(stockItemId) ?? 0;
if (consumedQty <= 0) {
continue;
}
const stock = stockById.get(stockItemId);
if (!stock) {
throw new AppError('NOT_FOUND', `MDM StockItem not found: ${stockItemId}`, 404, {
mdmId: stockItemId,
ruleId: 'autoStockDeductionOnServe',
});
}
const detailsRoot = stock.details as unknown as Record<string, unknown>;
const existingCafeFlow = {
...((detailsRoot.cafeFlow as Record<string, unknown> | undefined) ?? {}),
};
const currentBalance = readCurrentBalance(stock.details);
const nextBalance = currentBalance - consumedQty;
const cafeFlow = {
...existingCafeFlow,
currentBalance: nextBalance,
};
await ctx.mdm.entity.update({
mdmId: stock.mdmId,
expectedVersion: stock.version,
patch: { cafeFlow } as never,
});
const consumption: StockConsumption = {
stockConsumptionId: ctx.idGenerator.newId(),
orderId: order.orderId,
stockItemId,
quantity: consumedQty,
occurredAt: now,
status: 'posted',
voidedAt: null,
voidReason: null,
createdAt: now,
};
await stockConsumptions.append(consumption);
}
}
export async function updateOrderStatus(
ctx: RequestContext,
input: UpdateOrderStatusInput,
): Promise<UpdateOrderStatusOutput> {
const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');
const now = ctx.clock.nowIso();
const existing = await orders.getById(input.orderId);
if (!existing) {
throw new AppError('NOT_FOUND', `Order not found: ${input.orderId}`, 404, {
orderId: input.orderId,
});
}
if (!ALLOWED_TARGET_STATUSES.has(input.status)) {
throw new AppError(
'VALIDATION_ERROR',
`Invalid status "${input.status}". Allowed: confirmed | inPreparation | ready | served | cancelled.`,
400,
{ status: input.status },
);
}
const targetStatus = input.status as OrderStatus;
assertOrderStatusTransition(existing.status, targetStatus);
const order: Order = {
...existing,
items: existing.items.map((item) => ({ ...item })),
payment: existing.payment ? { ...existing.payment } : null,
};
if (targetStatus === 'confirmed') {
// rule: orderEntersKitchenQueueAfterAttendantConfirmation
order.status = 'confirmed';
order.confirmedAt = now;
} else if (targetStatus === 'inPreparation') {
// rule: kitchenStatusProgressesInOrder
order.status = 'inPreparation';
order.inPreparationAt = now;
} else if (targetStatus === 'ready') {
// rule: kitchenStatusProgressesInOrder
order.status = 'ready';
order.readyAt = now;
} else if (targetStatus === 'served') {
// rule: onlyReadyOrdersCanBeServed
// rule: completedOrdersLeaveKitchenQueue
order.status = 'served';
order.servedAt = now;
} else if (targetStatus === 'cancelled') {
// rule: completedOrdersLeaveKitchenQueue
order.status = 'cancelled';
order.cancelledAt = now;
order.cancellationReason = input.cancellationReason ?? order.cancellationReason ?? null;
}
order.updatedAt = now;
await ctx.data.runInTransaction(async () => {
if (targetStatus === 'served') {
await applyAutoStockDeductionOnServe(ctx, order, now, stockConsumptions);
}
await orders.save(order);
});
return {
orderId: order.orderId,
status: order.status,
confirmedAt: order.confirmedAt,
inPreparationAt: order.inPreparationAt,
readyAt: order.readyAt,
servedAt: order.servedAt,
cancelledAt: order.cancelledAt,
cancellationReason: order.cancellationReason,
updatedAt: order.updatedAt,
};
}
