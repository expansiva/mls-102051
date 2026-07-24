/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/dashboardWorkspace.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace dashboardWorkspace; one contract file per workspace, all bffCalls).

// bffCall getDashboard (query) — Output kind=object; route cafeFlow.dashboardWorkspace.getDashboard.
export interface GetDashboardInput {
  dailyShiftId: string;
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
  topSellingItems: { menuItemId: string; name: string; quantitySold: number; unitPrice: number }[];
  lowStockAlerts: { stockItemId: string; name: string; currentBalance: number; minimumLevel: number; unit: string; isOutOfStock: boolean }[];
}
export const getDashboardRoute = 'cafeFlow.dashboardWorkspace.getDashboard' as const;

// bffCall getAiSalesSummary (query) — Output kind=object; route cafeFlow.dashboardWorkspace.getAiSalesSummary.
export interface GetAiSalesSummaryInput {
  operationalDashboardId: string;
}
export interface GetAiSalesSummaryOutput {
  aiSalesSummaryId: string;
  operationalDashboardId: string;
  summaryDate: string;
  periodStart: string;
  periodEnd: string;
  summaryText: string;
  modelId: string;
  promptTokens: number;
  completionTokens: number;
  generatedAt: string;
}
export const getAiSalesSummaryRoute = 'cafeFlow.dashboardWorkspace.getAiSalesSummary' as const;

// bffCall getAiPromotionSuggestions (query) — Output kind=array; route cafeFlow.dashboardWorkspace.getAiPromotionSuggestions.
export interface GetAiPromotionSuggestionsInput {
  operationalDashboardId: string;
}
export interface GetAiPromotionSuggestionsOutput {
  aiPromotionSuggestionId: string;
  operationalDashboardId: string;
  menuItemId: string;
  menuItemName: string;
  menuCategoryId: string;
  reason: string;
  salesLast7Days: number;
  salesToday: number;
  currentStockLevel: number;
  confidenceScore: number;
  suggestedDiscountPercent: number;
  status: string;
  generatedAt: string;
  expiresAt: string;
}
export const getAiPromotionSuggestionsRoute = 'cafeFlow.dashboardWorkspace.getAiPromotionSuggestions' as const;
