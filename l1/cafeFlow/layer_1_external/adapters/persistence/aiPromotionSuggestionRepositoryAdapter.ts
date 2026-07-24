/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestionRepositoryAdapter.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  AiPromotionSuggestionFilter,
  DateRange,
  IAiPromotionSuggestionRepository,
} from '/_102051_/l1/cafeFlow/layer_2_application/ports/aiPromotionSuggestionRepository.js';
import type {
  AiPromotionSuggestion,
  AiPromotionSuggestionStatus,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.js';

interface AiPromotionSuggestionRow {
  ai_promotion_suggestion_id: string;
  operational_dashboard_id: string;
  menu_item_id: string;
  menu_category_id: string | null;
  status: string;
  reviewed_by_user_id: string | null;
  created_at: string;
  details: string | null;
}

interface AiPromotionSuggestionDetails {
  menuItemName: string;
  reason: string;
  salesLast7Days: number;
  salesToday: number | null;
  currentStockLevel: number | null;
  confidenceScore: number;
  suggestedDiscountPercent: number | null;
  reviewedAt: string | null;
  reviewNotes: string | null;
  generatedAt: string;
  expiresAt: string | null;
  updatedAt: string;
}

function toRow(suggestion: AiPromotionSuggestion): AiPromotionSuggestionRow {
  const details: AiPromotionSuggestionDetails = {
    menuItemName: suggestion.menuItemName,
    reason: suggestion.reason,
    salesLast7Days: suggestion.salesLast7Days,
    salesToday: suggestion.salesToday,
    currentStockLevel: suggestion.currentStockLevel,
    confidenceScore: suggestion.confidenceScore,
    suggestedDiscountPercent: suggestion.suggestedDiscountPercent,
    reviewedAt: suggestion.reviewedAt,
    reviewNotes: suggestion.reviewNotes,
    generatedAt: suggestion.generatedAt,
    expiresAt: suggestion.expiresAt,
    updatedAt: suggestion.updatedAt,
  };
  return {
    ai_promotion_suggestion_id: suggestion.aiPromotionSuggestionId,
    operational_dashboard_id: suggestion.operationalDashboardId,
    menu_item_id: suggestion.menuItemId,
    menu_category_id: suggestion.menuCategoryId,
    status: suggestion.status,
    reviewed_by_user_id: suggestion.reviewedByUserId,
    created_at: suggestion.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: AiPromotionSuggestionRow): AiPromotionSuggestionDetails {
  try {
    return JSON.parse(row.details ?? '{}') as AiPromotionSuggestionDetails;
  } catch {
    return {
      menuItemName: '',
      reason: '',
      salesLast7Days: 0,
      salesToday: null,
      currentStockLevel: null,
      confidenceScore: 0,
      suggestedDiscountPercent: null,
      reviewedAt: null,
      reviewNotes: null,
      generatedAt: row.created_at,
      expiresAt: null,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: AiPromotionSuggestionRow): AiPromotionSuggestion {
  const d = parseDetails(row);
  return {
    aiPromotionSuggestionId: row.ai_promotion_suggestion_id,
    operationalDashboardId: row.operational_dashboard_id,
    menuItemId: row.menu_item_id,
    menuItemName: d.menuItemName,
    menuCategoryId: row.menu_category_id,
    reason: d.reason,
    salesLast7Days: d.salesLast7Days,
    salesToday: d.salesToday,
    currentStockLevel: d.currentStockLevel,
    confidenceScore: d.confidenceScore,
    suggestedDiscountPercent: d.suggestedDiscountPercent,
    status: row.status as AiPromotionSuggestionStatus,
    reviewedAt: d.reviewedAt,
    reviewedByUserId: row.reviewed_by_user_id,
    reviewNotes: d.reviewNotes,
    generatedAt: d.generatedAt,
    expiresAt: d.expiresAt,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createAiPromotionSuggestionRepositoryAdapter(
  ctx: RequestContext,
): IAiPromotionSuggestionRepository {
  const getTable = () =>
    ctx.data.moduleData.getTable<AiPromotionSuggestionRow>('ai_promotion_suggestion');

  return {
    async getById(id) {
      const row = await (await getTable()).findOne({
        where: { ai_promotion_suggestion_id: id },
      });
      return row ? toDomain(row) : null;
    },

    async list(filter: AiPromotionSuggestionFilter) {
      const where: Partial<AiPromotionSuggestionRow> = {};
      if (filter.operationalDashboardId) {
        where.operational_dashboard_id = filter.operationalDashboardId;
      }
      if (filter.menuItemId) {
        where.menu_item_id = filter.menuItemId;
      }
      if (filter.menuCategoryId !== undefined) {
        where.menu_category_id = filter.menuCategoryId;
      }
      if (filter.status) {
        where.status = filter.status;
      }
      const rows = await (await getTable()).findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async save(aggregate) {
      const repo = await getTable();
      const existing = await repo.findOne({
        where: { ai_promotion_suggestion_id: aggregate.aiPromotionSuggestionId },
      });
      if (existing) {
        await repo.update({
          where: { ai_promotion_suggestion_id: aggregate.aiPromotionSuggestionId },
          patch: toRow(aggregate),
        });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findActiveByPeriod(period: DateRange) {
      const rows = await (await getTable()).findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows
        .map(toDomain)
        .filter((suggestion) => {
          if (suggestion.status === 'rejected' || suggestion.status === 'expired') {
            return false;
          }
          const generatedAt = suggestion.generatedAt;
          if (generatedAt < period.from || generatedAt > period.to) {
            return false;
          }
          if (suggestion.expiresAt !== null && suggestion.expiresAt < period.from) {
            return false;
          }
          return true;
        });
    },

    async findPendingReview() {
      const rows = await (await getTable()).findMany({
        where: { status: 'pending' },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },
  };
}
