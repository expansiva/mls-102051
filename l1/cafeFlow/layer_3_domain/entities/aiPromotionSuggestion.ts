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

export function aiPromotionSuggestionRequiresReviewFields(
  suggestion: Pick<AiPromotionSuggestion, 'status' | 'reviewedAt' | 'reviewedByUserId'>,
): boolean {
  if (suggestion.status === 'accepted' || suggestion.status === 'rejected') {
    return suggestion.reviewedAt != null && suggestion.reviewedByUserId != null;
  }
  return suggestion.reviewedAt == null && suggestion.reviewedByUserId == null;
}

export function aiPromotionSuggestionReviewNotesAllowed(
  suggestion: Pick<AiPromotionSuggestion, 'status' | 'reviewNotes'>,
): boolean {
  if (suggestion.status === 'accepted' || suggestion.status === 'rejected') {
    return true;
  }
  return suggestion.reviewNotes == null;
}

export function aiPromotionSuggestionGeneratedAtValid(
  suggestion: Pick<AiPromotionSuggestion, 'generatedAt' | 'createdAt' | 'updatedAt'>,
): boolean {
  return (
    suggestion.generatedAt <= suggestion.createdAt &&
    suggestion.generatedAt <= suggestion.updatedAt
  );
}

export function aiPromotionSuggestionReviewedAtValid(
  suggestion: Pick<AiPromotionSuggestion, 'reviewedAt' | 'generatedAt' | 'createdAt'>,
): boolean {
  if (suggestion.reviewedAt == null) {
    return true;
  }
  return (
    suggestion.reviewedAt >= suggestion.generatedAt &&
    suggestion.reviewedAt >= suggestion.createdAt
  );
}

export function aiPromotionSuggestionExpiresAtValid(
  suggestion: Pick<AiPromotionSuggestion, 'expiresAt' | 'generatedAt'>,
): boolean {
  if (suggestion.expiresAt == null) {
    return true;
  }
  return suggestion.expiresAt > suggestion.generatedAt;
}

export function canExpireAiPromotionSuggestion(
  suggestion: Pick<AiPromotionSuggestion, 'status' | 'expiresAt'>,
  nowIso: string,
): boolean {
  if (suggestion.status !== 'pending') {
    return false;
  }
  if (suggestion.expiresAt == null) {
    return false;
  }
  return nowIso >= suggestion.expiresAt;
}

export function aiPromotionSuggestionSalesLast7DaysValid(
  suggestion: Pick<AiPromotionSuggestion, 'salesLast7Days'>,
): boolean {
  return suggestion.salesLast7Days >= 0;
}

export function aiPromotionSuggestionSalesTodayValid(
  suggestion: Pick<AiPromotionSuggestion, 'salesToday'>,
): boolean {
  if (suggestion.salesToday == null) {
    return true;
  }
  return suggestion.salesToday >= 0;
}

export function aiPromotionSuggestionCurrentStockLevelValid(
  suggestion: Pick<AiPromotionSuggestion, 'currentStockLevel'>,
): boolean {
  if (suggestion.currentStockLevel == null) {
    return true;
  }
  return suggestion.currentStockLevel >= 0;
}

export function aiPromotionSuggestionConfidenceScoreValid(
  suggestion: Pick<AiPromotionSuggestion, 'confidenceScore'>,
): boolean {
  return suggestion.confidenceScore >= 0 && suggestion.confidenceScore <= 100;
}

export function aiPromotionSuggestionSuggestedDiscountPercentValid(
  suggestion: Pick<AiPromotionSuggestion, 'suggestedDiscountPercent'>,
): boolean {
  if (suggestion.suggestedDiscountPercent == null) {
    return true;
  }
  return (
    suggestion.suggestedDiscountPercent > 0 &&
    suggestion.suggestedDiscountPercent <= 100
  );
}

export function aiPromotionSuggestionUpdatedAtValid(
  suggestion: Pick<AiPromotionSuggestion, 'updatedAt' | 'createdAt'>,
): boolean {
  return suggestion.updatedAt >= suggestion.createdAt;
}

export function aiPromotionSuggestionReasonValid(
  suggestion: Pick<AiPromotionSuggestion, 'reason'>,
): boolean {
  return suggestion.reason.trim().length > 0;
}

export function aiPromotionSuggestionMenuItemNameValid(
  suggestion: Pick<AiPromotionSuggestion, 'menuItemName'>,
): boolean {
  return suggestion.menuItemName.trim().length > 0;
}
