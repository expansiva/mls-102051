/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewOperationalDashboard.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOperationalDashboardRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { Order } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface ViewOperationalDashboardInput {}

export interface DashboardTopSellingItem {
  menuItemId: string;
  name: string;
  quantitySold: number;
  unitPrice: number;
}

export interface DashboardLowStockAlert {
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
  topSellingItems: DashboardTopSellingItem[];
  lowStockAlerts: DashboardLowStockAlert[];
}

interface MenuItemDetails {
  name?: string;
  price?: number;
  cafeFlow?: {
    name?: string;
    price?: number;
  };
}

interface StockItemDetails {
  name?: string;
  currentBalance?: number;
  minimumLevel?: number;
  unit?: string;
  cafeFlow?: {
    name?: string;
    currentBalance?: number;
    minimumLevel?: number;
    unit?: string;
  };
}

function isNonCancelledOrder(order: Order): boolean {
  return String(order.status) !== 'cancelled';
}

function isNonCancelledItem(status: string): boolean {
  return String(status) !== 'cancelled';
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
      'Nenhum turno diário aberto para compor o dashboard operacional.',
      400,
      { ruleId: 'dashboardHighlightsCoreMetrics' },
    );
  }

  const now = ctx.clock.nowIso();
  const existing = await dashboards.findByDailyShiftId(openShift.dailyShiftId);

  const orders = await ordersRepo.findByDailyShiftId(openShift.dailyShiftId);
  const activeOrders = orders.filter(isNonCancelledOrder);

  let todaySalesTotal = 0;
  let todayItemsSold = 0;
  const quantityByMenuItemId = new Map<string, { quantitySold: number; unitPrice: number }>();

  for (const order of activeOrders) {
    todaySalesTotal += order.totalAmount ?? 0;
    for (const item of order.items ?? []) {
      if (!isNonCancelledItem(item.status)) {
        continue;
      }
      todayItemsSold += item.quantity;
      const prev = quantityByMenuItemId.get(item.menuItemId);
      if (prev) {
        prev.quantitySold += item.quantity;
        // keep latest known unit price
        prev.unitPrice = item.unitPrice;
      } else {
        quantityByMenuItemId.set(item.menuItemId, {
          quantitySold: item.quantity,
          unitPrice: item.unitPrice,
        });
      }
    }
  }

  const todayOrdersCount = activeOrders.length;

  const ranked = [...quantityByMenuItemId.entries()]
    .map(([menuItemId, agg]) => ({
      menuItemId,
      quantitySold: agg.quantitySold,
      unitPrice: agg.unitPrice,
    }))
    .sort((a, b) => b.quantitySold - a.quantitySold);

  const topMenuItemIds = ranked.map((r) => r.menuItemId);
  const menuEntities =
    topMenuItemIds.length > 0
      ? await ctx.mdm.collection.getMany({ mdmIds: topMenuItemIds })
      : [];
  const menuById = new Map(menuEntities.map((e) => [e.mdmId, e]));

  // rule: dashboardHighlightsCoreMetrics
  const topSellingItems: DashboardTopSellingItem[] = ranked.map((r) => {
    const entity = menuById.get(r.menuItemId);
    const details = (entity?.details ?? {}) as unknown as MenuItemDetails;
    const name =
      details.cafeFlow?.name ??
      details.name ??
      (entity?.details as { name?: string } | undefined)?.name ??
      r.menuItemId;
    const unitPrice =
      details.cafeFlow?.price ?? details.price ?? r.unitPrice;
    return {
      menuItemId: r.menuItemId,
      name: String(name),
      quantitySold: r.quantitySold,
      unitPrice: Number(unitPrice),
    };
  });

  const topSeller = topSellingItems[0];
  const topMenuItemId = topSeller?.menuItemId;
  const topMenuItemQuantity = topSeller?.quantitySold;
  const topSellingItemsCount = topSellingItems.length;

  const stockList = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.StockItem',
  });
  const stockMdmIds = stockList.items.map((item) => item.mdmId);
  const stockEntities =
    stockMdmIds.length > 0
      ? await ctx.mdm.collection.getMany({ mdmIds: stockMdmIds })
      : [];

  // rule: lowStockMustBeVisible
  const lowStockAlerts: DashboardLowStockAlert[] = [];
  for (const entity of stockEntities) {
    const details = (entity.details ?? {}) as unknown as StockItemDetails;
    const name =
      details.cafeFlow?.name ??
      details.name ??
      entity.index.name ??
      entity.mdmId;
    const currentBalance = Number(
      details.cafeFlow?.currentBalance ?? details.currentBalance ?? 0,
    );
    const minimumLevel = Number(
      details.cafeFlow?.minimumLevel ?? details.minimumLevel ?? 0,
    );
    const unit = String(details.cafeFlow?.unit ?? details.unit ?? '');
    if (currentBalance <= minimumLevel) {
      lowStockAlerts.push({
        stockItemId: entity.mdmId,
        name: String(name),
        currentBalance,
        minimumLevel,
        unit,
        isOutOfStock: currentBalance <= 0,
      });
    }
  }

  const lowStockItemsCount = lowStockAlerts.length;
  const outOfStockItemsCount = lowStockAlerts.filter((a) => a.isOutOfStock).length;
  const hasLowStockAlert = lowStockItemsCount > 0 || outOfStockItemsCount > 0;

  const operationalDashboardId =
    existing?.operationalDashboardId ?? ctx.idGenerator.newId();
  const referenceDate = existing?.referenceDate ?? openShift.shiftDate;
  const lastComputedAt = now;

  return {
    operationalDashboardId,
    dailyShiftId: openShift.dailyShiftId,
    referenceDate,
    todaySalesTotal,
    todayOrdersCount,
    todayItemsSold,
    ...(topMenuItemId !== undefined ? { topMenuItemId } : {}),
    ...(topMenuItemQuantity !== undefined ? { topMenuItemQuantity } : {}),
    topSellingItemsCount,
    lowStockItemsCount,
    outOfStockItemsCount,
    hasLowStockAlert,
    lastComputedAt,
    topSellingItems,
    lowStockAlerts,
  };
}
