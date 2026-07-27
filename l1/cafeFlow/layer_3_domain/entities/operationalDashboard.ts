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

export function isNonNegativeTodaySalesTotal(
  dashboard: Pick<OperationalDashboard, 'todaySalesTotal'>,
): boolean {
  return dashboard.todaySalesTotal >= 0;
}

export function isNonNegativeTodayOrdersCount(
  dashboard: Pick<OperationalDashboard, 'todayOrdersCount'>,
): boolean {
  return dashboard.todayOrdersCount >= 0;
}

export function isNonNegativeTodayItemsSold(
  dashboard: Pick<OperationalDashboard, 'todayItemsSold'>,
): boolean {
  return dashboard.todayItemsSold >= 0;
}

export function isNonNegativeTopSellingItemsCount(
  dashboard: Pick<OperationalDashboard, 'topSellingItemsCount'>,
): boolean {
  return dashboard.topSellingItemsCount >= 0;
}

export function isNonNegativeLowStockItemsCount(
  dashboard: Pick<OperationalDashboard, 'lowStockItemsCount'>,
): boolean {
  return dashboard.lowStockItemsCount >= 0;
}

export function isNonNegativeOutOfStockItemsCount(
  dashboard: Pick<OperationalDashboard, 'outOfStockItemsCount'>,
): boolean {
  return dashboard.outOfStockItemsCount >= 0;
}

export function todayItemsSoldCoversOrders(
  dashboard: Pick<OperationalDashboard, 'todayItemsSold' | 'todayOrdersCount'>,
): boolean {
  return dashboard.todayItemsSold >= dashboard.todayOrdersCount;
}

export function emptyOrdersImpliesEmptySalesSnapshot(
  dashboard: Pick<
    OperationalDashboard,
    | 'todayOrdersCount'
    | 'todaySalesTotal'
    | 'todayItemsSold'
    | 'topMenuItemId'
    | 'topMenuItemQuantity'
  >,
): boolean {
  if (dashboard.todayOrdersCount !== 0) {
    return true;
  }
  return (
    dashboard.todaySalesTotal === 0 &&
    dashboard.todayItemsSold === 0 &&
    dashboard.topMenuItemId === null &&
    dashboard.topMenuItemQuantity === null
  );
}

export function topMenuItemFieldsAreConsistent(
  dashboard: Pick<OperationalDashboard, 'topMenuItemId' | 'topMenuItemQuantity'>,
): boolean {
  const hasId = dashboard.topMenuItemId !== null;
  const hasQuantity = dashboard.topMenuItemQuantity !== null;
  return hasId === hasQuantity;
}

export function topMenuItemQuantityIsValidWhenPresent(
  dashboard: Pick<
    OperationalDashboard,
    'topMenuItemId' | 'topMenuItemQuantity' | 'todayItemsSold' | 'topSellingItemsCount'
  >,
): boolean {
  if (dashboard.topMenuItemId === null) {
    return true;
  }
  const quantity = dashboard.topMenuItemQuantity;
  if (quantity === null) {
    return false;
  }
  return (
    quantity > 0 &&
    quantity <= dashboard.todayItemsSold &&
    dashboard.topSellingItemsCount >= 1
  );
}

export function zeroItemsSoldImpliesNoTopSellers(
  dashboard: Pick<
    OperationalDashboard,
    'todayItemsSold' | 'topMenuItemId' | 'topMenuItemQuantity' | 'topSellingItemsCount'
  >,
): boolean {
  if (dashboard.todayItemsSold !== 0) {
    return true;
  }
  return (
    dashboard.topMenuItemId === null &&
    dashboard.topMenuItemQuantity === null &&
    dashboard.topSellingItemsCount === 0
  );
}

export function hasLowStockAlertMatchesCounts(
  dashboard: Pick<
    OperationalDashboard,
    'hasLowStockAlert' | 'lowStockItemsCount' | 'outOfStockItemsCount'
  >,
): boolean {
  const expected =
    dashboard.lowStockItemsCount > 0 || dashboard.outOfStockItemsCount > 0;
  return dashboard.hasLowStockAlert === expected;
}

export function lowStockItemIdsMatchAlert(
  dashboard: Pick<OperationalDashboard, 'hasLowStockAlert' | 'lowStockItemIds'>,
): boolean {
  const ids = dashboard.lowStockItemIds;
  const hasIds = ids !== null && ids.trim().length > 0;
  if (dashboard.hasLowStockAlert) {
    return hasIds;
  }
  return !hasIds;
}

export function createdAtNotAfterUpdatedAt(
  dashboard: Pick<OperationalDashboard, 'createdAt' | 'updatedAt'>,
): boolean {
  return dashboard.createdAt <= dashboard.updatedAt;
}

export function createdAtNotAfterLastComputedAt(
  dashboard: Pick<OperationalDashboard, 'createdAt' | 'lastComputedAt'>,
): boolean {
  return dashboard.createdAt <= dashboard.lastComputedAt;
}

export function lastComputedAtOnOrAfterReferenceDateStart(
  dashboard: Pick<OperationalDashboard, 'lastComputedAt' | 'referenceDate'>,
): boolean {
  const referenceDayStart = dashboard.referenceDate.slice(0, 10);
  const lastComputedDay = dashboard.lastComputedAt.slice(0, 10);
  return lastComputedDay >= referenceDayStart;
}

export function isValidOperationalDashboard(
  dashboard: OperationalDashboard,
): boolean {
  return (
    isNonNegativeTodaySalesTotal(dashboard) &&
    isNonNegativeTodayOrdersCount(dashboard) &&
    isNonNegativeTodayItemsSold(dashboard) &&
    isNonNegativeTopSellingItemsCount(dashboard) &&
    isNonNegativeLowStockItemsCount(dashboard) &&
    isNonNegativeOutOfStockItemsCount(dashboard) &&
    todayItemsSoldCoversOrders(dashboard) &&
    emptyOrdersImpliesEmptySalesSnapshot(dashboard) &&
    topMenuItemFieldsAreConsistent(dashboard) &&
    topMenuItemQuantityIsValidWhenPresent(dashboard) &&
    zeroItemsSoldImpliesNoTopSellers(dashboard) &&
    hasLowStockAlertMatchesCounts(dashboard) &&
    lowStockItemIdsMatchAlert(dashboard) &&
    createdAtNotAfterUpdatedAt(dashboard) &&
    createdAtNotAfterLastComputedAt(dashboard) &&
    lastComputedAtOnOrAfterReferenceDateStart(dashboard)
  );
}
