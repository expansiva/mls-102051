/// <mls fileReference="_102051_/l4/cafeFlow/contracts/dashboardWorkspace.getAiPromotionSuggestions.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/dashboardWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall getAiPromotionSuggestions (query); Output kind=list; route cafeFlow.dashboardWorkspace.getAiPromotionSuggestions.

export interface GetAiPromotionSuggestionsInput {
  operationalDashboardId: string;
}

export interface GetAiPromotionSuggestionsItem {
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

export type GetAiPromotionSuggestionsOutput = GetAiPromotionSuggestionsItem[];

export const getAiPromotionSuggestionsRoute = 'cafeFlow.dashboardWorkspace.getAiPromotionSuggestions' as const;
