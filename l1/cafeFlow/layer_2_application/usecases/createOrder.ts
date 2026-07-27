/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderItem, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import {
computeOrderItemSubtotal,
orderRequiresItem,
orderRequiresTableNumber,
recomputeOrderTotal,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';
export interface CreateOrderItemInput {
menuItemId: string;
quantity: number;
observations?: string;
}
export interface CreateOrderInput {
orderType: string;
tableNumber?: string;
customerName?: string;
notes?: string;
items: CreateOrderItemInput[];
}
export interface CreateOrderOutputItem {
orderItemId: string;
menuItemId: string;
menuItemName: string;
quantity: number;
unitPrice: number;
subtotal: number;
observations?: string;
status: string;
}
export interface CreateOrderOutput {
orderId: string;
dailyShiftId: string;
orderType: string;
tableNumber?: string;
customerName?: string;
totalAmount: number;
notes?: string;
status: string;
registeredAt: string;
confirmedAt: string;
items: CreateOrderOutputItem[];
}
interface MenuItemLaunchSnapshot {
menuItemId: string;
menuItemName: string;
unitPrice: number;
}
function isOrderType(value: string): value is OrderType {
return value === 'table' || value === 'takeout';
}
function readMenuItemLaunchSnapshot(
mdmId: string,
details: unknown,
): MenuItemLaunchSnapshot {
const root = (details ?? {}) as unknown as Record<string, unknown>;
const cafeFlow = (root.cafeFlow ?? {}) as unknown as Record<string, unknown>;
const menuItemName = String(root.name ?? cafeFlow.name ?? '');
const rawPrice = cafeFlow.unitPrice ?? root.unitPrice ?? 0;
const unitPrice = typeof rawPrice === 'number' ? rawPrice : Number(rawPrice);
return {
menuItemId: mdmId,
menuItemName,
unitPrice: Number.isFinite(unitPrice) ? unitPrice : 0,
};
}
export async function createOrder(
ctx: RequestContext,
input: CreateOrderInput,
): Promise<CreateOrderOutput> {
const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');
const openShifts = await dailyShifts.list({ status: 'open' });
const openShift = openShifts[0] ?? null;
if (!openShift) {
throw new AppError(
'VALIDATION_ERROR',
'ordersRequireOpenDailyShift: não há turno diário aberto para registrar pedidos.',
400,
{ ruleId: 'ordersRequireOpenDailyShift' },
);
}
if (!isOrderType(input.orderType)) {
throw new AppError(
'VALIDATION_ERROR',
'orderRequiresTableOrTakeout: orderType deve ser table ou takeout.',
400,
{ ruleId: 'orderRequiresTableOrTakeout', orderType: input.orderType },
);
}
const tableNumber = input.tableNumber?.trim() ? input.tableNumber.trim() : null;
if (!orderRequiresTableNumber({ orderType: input.orderType, tableNumber })) {
throw new AppError(
'VALIDATION_ERROR',
'orderRequiresTableOrTakeout: pedidos de mesa exigem tableNumber.',
400,
{ ruleId: 'orderRequiresTableOrTakeout', orderType: input.orderType },
);
}
const rawItems = input.items ?? [];
if (rawItems.length === 0 || !orderRequiresItem({ items: rawItems as unknown as Order['items'] })) {
throw new AppError(
'VALIDATION_ERROR',
'orderItemsArePrepReference: o pedido precisa de ao menos um item.',
400,
{ ruleId: 'orderItemsArePrepReference' },
);
}
const menuItemIds = [...new Set(rawItems.map((item) => item.menuItemId))];
const menuEntities = await ctx.mdm.collection.getMany({ mdmIds: menuItemIds });
const menuById = new Map<string, MenuItemLaunchSnapshot>(
menuEntities.map((entity) => [
entity.mdmId,
readMenuItemLaunchSnapshot(entity.mdmId, entity.details),
]),
);
for (const menuItemId of menuItemIds) {
if (!menuById.has(menuItemId)) {
throw new AppError('NOT_FOUND', `MDM record not found: ${menuItemId}`, 404, {
mdmId: menuItemId,
});
}
}
const now = ctx.clock.nowIso();
const orderId = ctx.idGenerator.newId();
// rule: orderTotalFromPriceAtLaunchTime
// rule: orderItemsArePrepReference
const items: OrderItem[] = rawItems.map((line) => {
const snapshot = menuById.get(line.menuItemId)!;
const quantity = line.quantity;
const unitPrice = snapshot.unitPrice;
const subtotal = computeOrderItemSubtotal(quantity, unitPrice);
return {
orderItemId: ctx.idGenerator.newId(),
orderId,
menuItemId: line.menuItemId,
menuItemName: snapshot.menuItemName,
quantity,
unitPrice,
subtotal,
observations: line.observations ?? null,
status: 'sentToKitchen',
sentToKitchenAt: now,
startedPreparationAt: null,
readyAt: null,
cancelledAt: null,
cancellationReason: null,
createdAt: now,
updatedAt: now,
};
});
const totalAmount = recomputeOrderTotal(items);
// rule: orderEntersKitchenQueueAfterAttendantConfirmation
const order: Order = {
orderId,
dailyShiftId: openShift.dailyShiftId,
orderType: input.orderType,
tableNumber,
customerName: input.customerName?.trim() ? input.customerName.trim() : null,
totalAmount,
notes: input.notes ?? null,
status: 'confirmed',
registeredAt: now,
confirmedAt: now,
inPreparationAt: null,
readyAt: null,
servedAt: null,
cancelledAt: null,
cancellationReason: null,
items,
payment: null,
createdAt: now,
updatedAt: now,
};
await ctx.data.runInTransaction(async () => {
await orders.save(order);
for (const item of items) {
const consumption: StockConsumption = {
stockConsumptionId: ctx.idGenerator.newId(),
orderId: order.orderId,
stockItemId: item.menuItemId,
quantity: item.quantity,
occurredAt: now,
status: 'posted',
voidedAt: null,
voidReason: null,
createdAt: now,
};
await stockConsumptions.append(consumption);
}
});
return {
orderId: order.orderId,
dailyShiftId: order.dailyShiftId,
orderType: order.orderType,
tableNumber: order.tableNumber ?? undefined,
customerName: order.customerName ?? undefined,
totalAmount: order.totalAmount,
notes: order.notes ?? undefined,
status: order.status,
registeredAt: order.registeredAt,
confirmedAt: order.confirmedAt ?? now,
items: items.map((item) => ({
orderItemId: item.orderItemId,
menuItemId: item.menuItemId,
menuItemName: item.menuItemName,
quantity: item.quantity,
unitPrice: item.unitPrice,
subtotal: item.subtotal,
observations: item.observations ?? undefined,
status: item.status,
})),
};
}
