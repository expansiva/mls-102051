/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.ts" enhancement="_blank"/>
export interface AiSalesSummary {
  aiSalesSummaryId: string;
  operationalDashboardId: string;
  summaryDate: string;
  periodStart: string;
  periodEnd: string;
  summaryText: string;
  modelId: string | null;
  promptTokens: number | null;
  completionTokens: number | null;
  generatedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export function isValidAiSalesSummaryPeriod(
  summary: Pick<AiSalesSummary, 'periodStart' | 'periodEnd' | 'summaryDate'>,
): boolean {
  return (
    summary.periodStart <= summary.periodEnd &&
    summary.periodEnd <= summary.summaryDate
  );
}

export function isNonEmptyAiSalesSummaryText(
  summary: Pick<AiSalesSummary, 'summaryText'>,
): boolean {
  return summary.summaryText.trim().length > 0;
}

export function hasValidAiSalesSummaryTokenCounts(
  summary: Pick<AiSalesSummary, 'promptTokens' | 'completionTokens'>,
): boolean {
  if (summary.promptTokens != null && summary.promptTokens < 0) return false;
  if (summary.completionTokens != null && summary.completionTokens < 0) return false;
  return true;
}

export function aiSalesSummaryTokensRequireModelId(
  summary: Pick<AiSalesSummary, 'promptTokens' | 'completionTokens' | 'modelId'>,
): boolean {
  const hasTokens =
    summary.promptTokens != null || summary.completionTokens != null;
  if (!hasTokens) return true;
  return summary.modelId != null && summary.modelId.trim().length > 0;
}

export function hasValidAiSalesSummaryTimestamps(
  summary: Pick<AiSalesSummary, 'createdAt' | 'updatedAt' | 'generatedAt'>,
): boolean {
  if (summary.createdAt > summary.updatedAt) return false;
  if (summary.generatedAt != null && summary.generatedAt > summary.updatedAt) {
    return false;
  }
  return true;
}
