/// <mls fileReference="_102051_/l4/cafeFlow/contracts/dashboardWorkspace.getDashboard.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/dashboardWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall getDashboard (query); Output kind=object; route cafeFlow.dashboardWorkspace.getDashboard.

export interface GetDashboardInput {
  dailyShiftId: string;
}

export interface GetDashboardLowStockAlertsItem {
  stockItemId: string;
  name: string;
  currentBalance: number;
  minimumLevel: number;
  unit: string;
  isOutOfStock: boolean;
}

export interface GetDashboardTopSellingItemsItem {
  menuItemId: string;
  name: string;
  quantitySold: number;
  unitPrice: number;
}

export interface GetDashboardOutput {
  operationalDashboardId: string;
  dailyShiftId: string;
  referenceDate: string;
  todaySalesTotal: number;
  todayOrdersCount: number;
  todayItemsSold: number;
  topMenuItemId: string;
  topMenuItemQuantity: number;
  topSellingItemsCount: number;
  lowStockItemsCount: number;
  outOfStockItemsCount: number;
  hasLowStockAlert: boolean;
  lastComputedAt: string;
  topSellingItems: GetDashboardTopSellingItemsItem[];
  lowStockAlerts: GetDashboardLowStockAlertsItem[];
}

export const getDashboardRoute = 'cafeFlow.dashboardWorkspace.getDashboard' as const;
