/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummaryRepositoryAdapter.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  AiSalesSummaryFilter,
  DateRange,
  IAiSalesSummaryRepository,
} from '/_102051_/l1/cafeFlow/layer_2_application/ports/aiSalesSummaryRepository.js';
import type { AiSalesSummary } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.js';

interface AiSalesSummaryRow {
  ai_sales_summary_id: string;
  operational_dashboard_id: string;
  model_id: string | null;
  created_at: string;
  details: string | null;
}

interface AiSalesSummaryDetails {
  summaryDate: string;
  periodStart: string;
  periodEnd: string;
  summaryText: string;
  promptTokens: number | null;
  completionTokens: number | null;
  generatedAt: string | null;
  updatedAt: string;
}

function toRow(summary: AiSalesSummary): AiSalesSummaryRow {
  const details: AiSalesSummaryDetails = {
    summaryDate: summary.summaryDate,
    periodStart: summary.periodStart,
    periodEnd: summary.periodEnd,
    summaryText: summary.summaryText,
    promptTokens: summary.promptTokens,
    completionTokens: summary.completionTokens,
    generatedAt: summary.generatedAt,
    updatedAt: summary.updatedAt,
  };
  return {
    ai_sales_summary_id: summary.aiSalesSummaryId,
    operational_dashboard_id: summary.operationalDashboardId,
    model_id: summary.modelId,
    created_at: summary.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: AiSalesSummaryRow): AiSalesSummaryDetails {
  try {
    return JSON.parse(row.details ?? '{}') as AiSalesSummaryDetails;
  } catch {
    return {
      summaryDate: row.created_at,
      periodStart: row.created_at,
      periodEnd: row.created_at,
      summaryText: '',
      promptTokens: null,
      completionTokens: null,
      generatedAt: null,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: AiSalesSummaryRow): AiSalesSummary {
  const d = parseDetails(row);
  return {
    aiSalesSummaryId: row.ai_sales_summary_id,
    operationalDashboardId: row.operational_dashboard_id,
    summaryDate: d.summaryDate,
    periodStart: d.periodStart,
    periodEnd: d.periodEnd,
    summaryText: d.summaryText ?? '',
    modelId: row.model_id,
    promptTokens: d.promptTokens ?? null,
    completionTokens: d.completionTokens ?? null,
    generatedAt: d.generatedAt ?? null,
    createdAt: row.created_at,
    updatedAt: d.updatedAt ?? row.created_at,
  };
}

export function createAiSalesSummaryRepositoryAdapter(
  ctx: RequestContext,
): IAiSalesSummaryRepository {
  const getTable = () => ctx.data.moduleData.getTable<AiSalesSummaryRow>('ai_sales_summary');

  return {
    async getById(id) {
      const row = await (await getTable()).findOne({ where: { ai_sales_summary_id: id } });
      return row ? toDomain(row) : null;
    },

    async list(filter: AiSalesSummaryFilter) {
      const where: Partial<AiSalesSummaryRow> = {};
      if (filter.operationalDashboardId) {
        where.operational_dashboard_id = filter.operationalDashboardId;
      }
      const rows = await (await getTable()).findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      let results = rows.map(toDomain);
      if (filter.summaryDate) {
        results = results.filter((item) => item.summaryDate === filter.summaryDate);
      }
      if (filter.periodStart) {
        results = results.filter((item) => item.periodStart === filter.periodStart);
      }
      if (filter.periodEnd) {
        results = results.filter((item) => item.periodEnd === filter.periodEnd);
      }
      return results;
    },

    async save(aggregate) {
      const repo = await getTable();
      const existing = await repo.findOne({
        where: { ai_sales_summary_id: aggregate.aiSalesSummaryId },
      });
      if (existing) {
        await repo.update({
          where: { ai_sales_summary_id: aggregate.aiSalesSummaryId },
          patch: toRow(aggregate),
        });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findByPeriod(period: DateRange) {
      const rows = await (await getTable()).findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      const match = rows
        .map(toDomain)
        .find((item) => item.periodStart === period.start && item.periodEnd === period.end);
      return match ?? null;
    },

    async findLatest() {
      const rows = await (await getTable()).findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
        limit: 1,
      });
      const row = rows[0];
      return row ? toDomain(row) : null;
    },
  };
}
