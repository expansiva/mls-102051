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
  summary: Pick<AiSalesSummary, 'periodStart' | 'periodEnd'>,
): boolean {
  return summary.periodEnd >= summary.periodStart;
}

export function isSummaryDateWithinPeriod(
  summary: Pick<AiSalesSummary, 'summaryDate' | 'periodStart' | 'periodEnd'>,
): boolean {
  return (
    summary.summaryDate >= summary.periodStart &&
    summary.summaryDate <= summary.periodEnd
  );
}

export function hasNonEmptySummaryText(
  summary: Pick<AiSalesSummary, 'summaryText'>,
): boolean {
  return summary.summaryText.trim().length > 0;
}

export function hasValidPromptTokens(
  summary: Pick<AiSalesSummary, 'promptTokens'>,
): boolean {
  return summary.promptTokens === null || summary.promptTokens >= 0;
}

export function hasValidCompletionTokens(
  summary: Pick<AiSalesSummary, 'completionTokens'>,
): boolean {
  return summary.completionTokens === null || summary.completionTokens >= 0;
}

export function hasValidGeneratedAt(
  summary: Pick<AiSalesSummary, 'generatedAt' | 'createdAt'>,
): boolean {
  return summary.generatedAt === null || summary.generatedAt >= summary.createdAt;
}

export function hasValidUpdatedAt(
  summary: Pick<AiSalesSummary, 'updatedAt' | 'createdAt'>,
): boolean {
  return summary.updatedAt >= summary.createdAt;
}
