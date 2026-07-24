/// <mls fileReference="_102051_/l4/cafeFlow/contracts/dashboardWorkspace.getAiSalesSummary.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/dashboardWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall getAiSalesSummary (query); Output kind=object; route cafeFlow.dashboardWorkspace.getAiSalesSummary.

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
