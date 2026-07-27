/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewOperationalDashboard.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOperationalDashboardRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { Order } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
export interface ViewOperationalDashboardInput {}
export interface TopSellingItem {
menuItemId: string;
name: string;
quantitySold: number;
unitPrice: number;
}
export interface LowStockAlert {
stockItemId: string;
name: string;
currentBalance: number;
minimumLevel: number;
unit: string;
isOutOfStock: boolean;
}
export interface ViewOperationalDashboardOutput {
operationalDashboardId: string;
dailyShiftId: string;
referenceDate: string;
todaySalesTotal: number;
todayOrdersCount: number;
todayItemsSold: number;
topMenuItemId?: string;
topMenuItemQuantity?: number;
topSellingItemsCount: number;
lowStockItemsCount: number;
outOfStockItemsCount: number;
hasLowStockAlert: boolean;
lastComputedAt: string;
topSellingItems: TopSellingItem[];
lowStockAlerts: LowStockAlert[];
}
interface MenuItemQtyAgg {
quantitySold: number;
unitPrice: number;
name: string;
}
function asRecord(value: unknown): Record<string, unknown> {
return (value ?? {}) as unknown as Record<string, unknown>;
}
function moduleDetails(details: unknown): Record<string, unknown> {
const root = asRecord(details);
const nested = root.cafeFlow;
if (nested && typeof nested === 'object') {
return asRecord(nested);
}
return root;
}
function readNumber(value: unknown, fallback = 0): number {
const n = typeof value === 'number' ? value : Number(value);
return Number.isFinite(n) ? n : fallback;
}
function readString(value: unknown, fallback = ''): string {
return typeof value === 'string' ? value : fallback;
}
function aggregateFromOrders(orders: Order[]): {
todaySalesTotal: number;
todayOrdersCount: number;
todayItemsSold: number;
qtyByMenuItem: Map<string, MenuItemQtyAgg>;
} {
const activeOrders = orders.filter((order) => String(order.status) !== 'cancelled');
let todaySalesTotal = 0;
let todayItemsSold = 0;
const qtyByMenuItem = new Map<string, MenuItemQtyAgg>();
for (const order of activeOrders) {
todaySalesTotal += order.totalAmount;
for (const item of order.items ?? []) {
if (String(item.status) === 'cancelled') {
continue;
}
todayItemsSold += item.quantity;
const existing = qtyByMenuItem.get(item.menuItemId);
if (existing) {
existing.quantitySold += item.quantity;
existing.unitPrice = item.unitPrice;
if (!existing.name && item.menuItemName) {
existing.name = item.menuItemName;
}
} else {
qtyByMenuItem.set(item.menuItemId, {
quantitySold: item.quantity,
unitPrice: item.unitPrice,
name: item.menuItemName ?? '',
});
}
}
}
return {
todaySalesTotal,
todayOrdersCount: activeOrders.length,
todayItemsSold,
qtyByMenuItem,
};
}
export async function viewOperationalDashboard(
ctx: RequestContext,
_input: ViewOperationalDashboardInput,
): Promise<ViewOperationalDashboardOutput> {
const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
const dashboards = resolveRepository<IOperationalDashboardRepository>(ctx, 'OperationalDashboard');
const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');
const openShifts = await dailyShifts.list({ status: 'open' });
const openShift = openShifts[0] ?? null;
if (!openShift) {
throw new AppError(
'VALIDATION_ERROR',
'Nenhum turno diário aberto encontrado para o dashboard operacional.',
400,
{ ruleId: 'activeLifecycleInstance' },
);
}
const dailyShiftId = openShift.dailyShiftId;
const referenceDate = openShift.shiftDate;
const now = ctx.clock.nowIso();
const existing = await dashboards.findByDailyShiftId(dailyShiftId);
const shiftOrders = await ordersRepo.findByDailyShiftId(dailyShiftId);
const live = aggregateFromOrders(shiftOrders);
const ranked = [...live.qtyByMenuItem.entries()]
.map(([menuItemId, agg]) => ({ menuItemId, ...agg }))
.sort((a, b) => b.quantitySold - a.quantitySold);
const topMenuItemIds = ranked.map((row) => row.menuItemId);
const menuEntities =
topMenuItemIds.length > 0
? await ctx.mdm.collection.getMany({ mdmIds: topMenuItemIds })
: [];
const menuById = new Map(menuEntities.map((entity) => [entity.mdmId, entity]));
const topSellingItems: TopSellingItem[] = ranked.map((row) => {
const entity = menuById.get(row.menuItemId);
const entityRec = entity ? asRecord(entity) : {};
const details = moduleDetails(entityRec.details);
const root = asRecord(entityRec.details);
const name =
readString(root.name) ||
readString(details.name) ||
row.name ||
row.menuItemId;
const unitPrice = readNumber(details.price, row.unitPrice);
return {
menuItemId: row.menuItemId,
name,
quantitySold: row.quantitySold,
unitPrice,
};
});
const topRanked = ranked[0];
const liveTopMenuItemId = topRanked?.menuItemId;
const liveTopMenuItemQuantity = topRanked?.quantitySold;
// rule: lowStockMustBeVisible
const stockIndex = await ctx.mdm.collection.listByType({
type: 'cafeFlow.StockItem',
page: 1,
pageSize: 1000,
});
const stockMdmIds = stockIndex.items.map((item) => item.mdmId);
const stockEntities =
stockMdmIds.length > 0
? await ctx.mdm.collection.getMany({ mdmIds: stockMdmIds })
: [];
const lowStockAlerts: LowStockAlert[] = [];
let lowStockItemsCount = 0;
let outOfStockItemsCount = 0;
for (const entity of stockEntities) {
const root = asRecord(entity.details);
const details = moduleDetails(entity.details);
const currentBalance = readNumber(
details.currentBalance ?? root.currentBalance,
0,
);
const minimumLevel = readNumber(
details.minimumLevel ?? root.minimumLevel,
0,
);
const isOutOfStock = currentBalance <= 0;
const isLowStock = currentBalance <= minimumLevel;
if (!isLowStock && !isOutOfStock) {
continue;
}
if (isLowStock) {
lowStockItemsCount += 1;
}
if (isOutOfStock) {
outOfStockItemsCount += 1;
}
lowStockAlerts.push({
stockItemId: entity.mdmId,
name: readString(root.name) || readString(details.name) || entity.mdmId,
currentBalance,
minimumLevel,
unit: readString(details.unit ?? root.unit, 'un'),
isOutOfStock,
});
}
const hasLowStockAlert = lowStockItemsCount > 0 || outOfStockItemsCount > 0;
// Prefer persisted snapshot scalars when present; always attach live projections.
const todaySalesTotal = existing?.todaySalesTotal ?? live.todaySalesTotal;
const todayOrdersCount = existing?.todayOrdersCount ?? live.todayOrdersCount;
const todayItemsSold = existing?.todayItemsSold ?? live.todayItemsSold;
const topMenuItemId =
existing?.topMenuItemId ?? liveTopMenuItemId ?? undefined;
const topMenuItemQuantity =
existing?.topMenuItemQuantity ?? liveTopMenuItemQuantity ?? undefined;
const topSellingItemsCount =
existing?.topSellingItemsCount ?? topSellingItems.length;
// rule: dashboardHighlightsCoreMetrics
const output: ViewOperationalDashboardOutput = {
operationalDashboardId:
existing?.operationalDashboardId ?? ctx.idGenerator.newId(),
dailyShiftId,
referenceDate: existing?.referenceDate ?? referenceDate,
todaySalesTotal,
todayOrdersCount,
todayItemsSold,
topSellingItemsCount,
lowStockItemsCount: existing ? lowStockItemsCount : lowStockItemsCount,
outOfStockItemsCount: existing ? outOfStockItemsCount : outOfStockItemsCount,
hasLowStockAlert,
lastComputedAt: existing?.lastComputedAt ?? now,
topSellingItems,
lowStockAlerts,
};
if (topMenuItemId !== undefined && topMenuItemId !== null) {
output.topMenuItemId = topMenuItemId;
}
if (topMenuItemQuantity !== undefined && topMenuItemQuantity !== null) {
output.topMenuItemQuantity = topMenuItemQuantity;
}
return output;
}
