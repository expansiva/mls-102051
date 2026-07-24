/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.ts" enhancement="_blank"/>
export interface OperationalDashboard {
  operationalDashboardId: string;
  dailyShiftId: string;
  referenceDate: string;
  todaySalesTotal: number;
  todayOrdersCount: number;
  todayItemsSold: number;
  topMenuItemId: string | null;
  topMenuItemQuantity: number | null;
  topSellingItemsCount: number;
  lowStockItemsCount: number;
  outOfStockItemsCount: number;
  lowStockItemIds: string | null;
  hasLowStockAlert: boolean;
  lastComputedAt: string;
  createdAt: string;
  updatedAt: string;
}

export function isValidTodaySalesTotal(todaySalesTotal: number): boolean {
  return todaySalesTotal >= 0;
}

export function isValidTodayOrdersCount(todayOrdersCount: number): boolean {
  return todayOrdersCount >= 0;
}

export function isValidTodayItemsSold(todayItemsSold: number): boolean {
  return todayItemsSold >= 0;
}

export function isValidTopSellingItemsCount(topSellingItemsCount: number): boolean {
  return topSellingItemsCount >= 0;
}

export function isValidLowStockItemsCount(lowStockItemsCount: number): boolean {
  return lowStockItemsCount >= 0;
}

export function isValidOutOfStockItemsCount(outOfStockItemsCount: number): boolean {
  return outOfStockItemsCount >= 0;
}

export function isValidTopMenuItemQuantity(topMenuItemQuantity: number | null): boolean {
  return topMenuItemQuantity === null || topMenuItemQuantity >= 0;
}

export function isConsistentHasLowStockAlert(
  dashboard: Pick<OperationalDashboard, 'hasLowStockAlert' | 'lowStockItemsCount' | 'outOfStockItemsCount'>,
): boolean {
  const expected = dashboard.lowStockItemsCount > 0 || dashboard.outOfStockItemsCount > 0;
  return dashboard.hasLowStockAlert === expected;
}

export function isConsistentTopMenuItem(
  dashboard: Pick<OperationalDashboard, 'topMenuItemId' | 'topMenuItemQuantity'>,
): boolean {
  if (dashboard.topMenuItemId !== null) {
    return dashboard.topMenuItemQuantity !== null;
  }
  return dashboard.topMenuItemQuantity === null;
}

export function isValidLastComputedAt(
  dashboard: Pick<OperationalDashboard, 'lastComputedAt' | 'createdAt'>,
): boolean {
  return dashboard.lastComputedAt >= dashboard.createdAt;
}

export function isValidUpdatedAt(
  dashboard: Pick<OperationalDashboard, 'updatedAt' | 'createdAt'>,
): boolean {
  return dashboard.updatedAt >= dashboard.createdAt;
}
