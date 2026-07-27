/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/aiPromotionSuggestionRepository.ts" enhancement="_blank"/>
import type {
  AiPromotionSuggestion,
  AiPromotionSuggestionStatus,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.js';

export type AiPromotionSuggestionId = string;

export interface DateRange {
  from: string;
  to: string;
}

export interface AiPromotionSuggestionFilter {
  operationalDashboardId?: string;
  menuItemId?: string;
  menuCategoryId?: string;
  status?: AiPromotionSuggestionStatus;
}

export interface IAiPromotionSuggestionRepository {
  getById(id: AiPromotionSuggestionId): Promise<AiPromotionSuggestion | null>;
  list(filter: AiPromotionSuggestionFilter): Promise<AiPromotionSuggestion[]>;
  save(aggregate: AiPromotionSuggestion): Promise<void>;
  findActiveByPeriod(period: DateRange): Promise<AiPromotionSuggestion[]>;
  findPendingReview(): Promise<AiPromotionSuggestion[]>;
}
