/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.ts" enhancement="_blank"/>
export type AiPromotionSuggestionStatus = 'pending' | 'accepted' | 'rejected' | 'expired';

export interface AiPromotionSuggestion {
  aiPromotionSuggestionId: string;
  operationalDashboardId: string;
  menuItemId: string;
  menuItemName: string;
  menuCategoryId: string | null;
  reason: string;
  salesLast7Days: number;
  salesToday: number | null;
  currentStockLevel: number | null;
  confidenceScore: number;
  suggestedDiscountPercent: number | null;
  status: AiPromotionSuggestionStatus;
  reviewedAt: string | null;
  reviewedByUserId: string | null;
  reviewNotes: string | null;
  generatedAt: string;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export const AI_PROMOTION_SUGGESTION_STATUS_TRANSITIONS: Record<
  AiPromotionSuggestionStatus,
  AiPromotionSuggestionStatus[]
> = {
  pending: ['accepted', 'rejected', 'expired'],
  accepted: [],
  rejected: [],
  expired: [],
};

export function canTransitionAiPromotionSuggestion(
  from: AiPromotionSuggestionStatus,
  to: AiPromotionSuggestionStatus,
): boolean {
  return AI_PROMOTION_SUGGESTION_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function isValidConfidenceScore(confidenceScore: number): boolean {
  return confidenceScore >= 0 && confidenceScore <= 100;
}

export function isValidSuggestedDiscountPercent(
  suggestedDiscountPercent: number | null,
): boolean {
  if (suggestedDiscountPercent === null) {
    return true;
  }
  return suggestedDiscountPercent >= 0 && suggestedDiscountPercent <= 100;
}

export function isValidSalesLast7Days(salesLast7Days: number): boolean {
  return salesLast7Days >= 0;
}

export function isValidSalesToday(salesToday: number | null): boolean {
  if (salesToday === null) {
    return true;
  }
  return salesToday >= 0;
}

export function isValidCurrentStockLevel(currentStockLevel: number | null): boolean {
  if (currentStockLevel === null) {
    return true;
  }
  return currentStockLevel >= 0;
}

export function hasRequiredReviewFieldsWhenDecided(
  suggestion: Pick<AiPromotionSuggestion, 'status' | 'reviewedAt' | 'reviewedByUserId'>,
): boolean {
  if (suggestion.status === 'accepted' || suggestion.status === 'rejected') {
    return suggestion.reviewedAt !== null && suggestion.reviewedByUserId !== null;
  }
  return true;
}

export function hasNullReviewFieldsWhenPending(
  suggestion: Pick<AiPromotionSuggestion, 'status' | 'reviewedAt' | 'reviewedByUserId'>,
): boolean {
  if (suggestion.status === 'pending') {
    return suggestion.reviewedAt === null && suggestion.reviewedByUserId === null;
  }
  return true;
}

export function isValidExpiresAt(
  suggestion: Pick<AiPromotionSuggestion, 'expiresAt' | 'generatedAt'>,
): boolean {
  if (suggestion.expiresAt === null) {
    return true;
  }
  return suggestion.expiresAt > suggestion.generatedAt;
}

export function isValidReviewedAt(
  suggestion: Pick<AiPromotionSuggestion, 'reviewedAt' | 'generatedAt'>,
): boolean {
  if (suggestion.reviewedAt === null) {
    return true;
  }
  return suggestion.reviewedAt >= suggestion.generatedAt;
}

export function isValidUpdatedAt(
  suggestion: Pick<AiPromotionSuggestion, 'updatedAt' | 'createdAt'>,
): boolean {
  return suggestion.updatedAt >= suggestion.createdAt;
}

export function isNonEmptyReason(reason: string): boolean {
  return reason.trim().length > 0;
}
