/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/aiSalesSummaryRepository.ts" enhancement="_blank"/>
import type { AiSalesSummary } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.js';

export type AiSalesSummaryId = string;

export interface DateRange {
  start: string;
  end: string;
}

export interface AiSalesSummaryFilter {
  operationalDashboardId?: string;
  summaryDate?: string;
}

export interface IAiSalesSummaryRepository {
  getById(id: AiSalesSummaryId): Promise<AiSalesSummary | null>;
  list(filter: AiSalesSummaryFilter): Promise<AiSalesSummary[]>;
  save(aggregate: AiSalesSummary): Promise<void>;
  findByPeriod(period: DateRange): Promise<AiSalesSummary | null>;
  findLatest(): Promise<AiSalesSummary | null>;
}
