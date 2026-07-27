/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiSalesSummary.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IAiSalesSummaryRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/aiSalesSummaryRepository.js';
import type { IOperationalDashboardRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { AiSalesSummary } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.js';
import {
  isValidAiSalesSummaryPeriod,
  isNonEmptyAiSalesSummaryText,
  hasValidAiSalesSummaryTokenCounts,
  aiSalesSummaryTokensRequireModelId,
  hasValidAiSalesSummaryTimestamps,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.js';
import type { OperationalDashboard } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.js';
import type { DailyShift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.js';
import type { Order } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface GenerateAiSalesSummaryInput {
  operationalDashboardId: string;
}

export interface GenerateAiSalesSummaryOutput {
  aiSalesSummaryId: string;
  operationalDashboardId: string;
  summaryDate: string;
  periodStart: string;
  periodEnd: string;
  summaryText: string;
  modelId?: string;
  promptTokens?: number;
  completionTokens?: number;
  generatedAt?: string;
}

function toCalendarDate(iso: string): string {
  return iso.slice(0, 10);
}

function addDays(calendarDate: string, days: number): string {
  const d = new Date(`${calendarDate}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function toOutput(summary: AiSalesSummary): GenerateAiSalesSummaryOutput {
  return {
    aiSalesSummaryId: summary.aiSalesSummaryId,
    operationalDashboardId: summary.operationalDashboardId,
    summaryDate: summary.summaryDate,
    periodStart: summary.periodStart,
    periodEnd: summary.periodEnd,
    summaryText: summary.summaryText,
    ...(summary.modelId != null ? { modelId: summary.modelId } : {}),
    ...(summary.promptTokens != null ? { promptTokens: summary.promptTokens } : {}),
    ...(summary.completionTokens != null ? { completionTokens: summary.completionTokens } : {}),
    ...(summary.generatedAt != null ? { generatedAt: summary.generatedAt } : {}),
  };
}

/**
 * Builds a non-empty narrative exclusively from already-persisted operational metrics.
 * rule: aiSummaryUsesExistingOperationalData
 */
function buildSummaryTextFromOperationalData(params: {
  dashboard: OperationalDashboard;
  shifts: DailyShift[];
  orders: Order[];
  periodStart: string;
  periodEnd: string;
  summaryDate: string;
}): string {
  const { dashboard, shifts, orders, periodStart, periodEnd, summaryDate } = params;

  let periodSales = 0;
  let periodOrders = 0;
  let periodItems = 0;
  for (const shift of shifts) {
    periodSales += shift.totalSalesAmount ?? 0;
    periodOrders += shift.totalOrders ?? 0;
    periodItems += shift.totalItemsSold ?? 0;
  }

  // Prefer shift totals; fall back to order aggregates when shift totals are absent.
  if (periodOrders === 0 && orders.length > 0) {
    periodOrders = orders.length;
    periodSales = 0;
    periodItems = 0;
    for (const order of orders) {
      if (order.status === 'cancelled') continue;
      periodSales += order.totalAmount;
      for (const item of order.items) {
        if (item.status === 'cancelled') continue;
        periodItems += item.quantity;
      }
    }
  }

  const lines: string[] = [];
  lines.push(
    `Resumo de vendas de ${summaryDate} (janela ${periodStart} a ${periodEnd}).`,
  );
  lines.push(
    `Hoje: vendas R$ ${dashboard.todaySalesTotal.toFixed(2)}, ` +
      `${dashboard.todayOrdersCount} pedido(s), ${dashboard.todayItemsSold} item(ns) vendido(s).`,
  );
  lines.push(
    `Período de 7 dias: vendas R$ ${periodSales.toFixed(2)}, ` +
      `${periodOrders} pedido(s) em ${shifts.length} turno(s), ${periodItems} item(ns).`,
  );

  if (dashboard.topMenuItemId != null && dashboard.topMenuItemQuantity != null) {
    lines.push(
      `Item mais vendido do dia: ${dashboard.topMenuItemId} ` +
        `(${dashboard.topMenuItemQuantity} un.; top sellers: ${dashboard.topSellingItemsCount}).`,
    );
  } else {
    lines.push('Sem item destaque de vendas no dia.');
  }

  if (dashboard.hasLowStockAlert) {
    lines.push(
      `Alerta de estoque: ${dashboard.lowStockItemsCount} item(ns) baixo(s), ` +
        `${dashboard.outOfStockItemsCount} esgotado(s)` +
        (dashboard.lowStockItemIds != null && dashboard.lowStockItemIds.trim().length > 0
          ? ` (ids: ${dashboard.lowStockItemIds}).`
          : '.'),
    );
  } else {
    lines.push('Sem alertas de estoque baixo ou esgotado.');
  }

  lines.push(
    `Dashboard ${dashboard.operationalDashboardId} (turno ${dashboard.dailyShiftId}), ` +
      `última computação em ${dashboard.lastComputedAt}.`,
  );

  return lines.join(' ');
}

export async function generateAiSalesSummary(
  ctx: RequestContext,
  input: GenerateAiSalesSummaryInput,
): Promise<GenerateAiSalesSummaryOutput> {
  const aiSalesSummaries = resolveRepository<IAiSalesSummaryRepository>(ctx, 'AiSalesSummary');
  const operationalDashboards = resolveRepository<IOperationalDashboardRepository>(
    ctx,
    'OperationalDashboard',
  );
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
  const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');

  const now = ctx.clock.nowIso();
  const summaryDate = toCalendarDate(now);
  const periodEnd = summaryDate;
  const periodStart = addDays(summaryDate, -7);

  const dashboard = await operationalDashboards.getById(input.operationalDashboardId);
  if (!dashboard) {
    throw new AppError(
      'NOT_FOUND',
      `OperationalDashboard not found: ${input.operationalDashboardId}`,
      404,
      { operationalDashboardId: input.operationalDashboardId },
    );
  }

  const existingList = await aiSalesSummaries.list({
    operationalDashboardId: input.operationalDashboardId,
    summaryDate,
  });
  const existing = existingList.find((s) => isNonEmptyAiSalesSummaryText(s)) ?? null;
  if (existing) {
    return toOutput(existing);
  }

  const linkedShift = await dailyShifts.getById(dashboard.dailyShiftId);
  if (!linkedShift) {
    throw new AppError(
      'NOT_FOUND',
      `DailyShift not found for dashboard: ${dashboard.dailyShiftId}`,
      404,
      { dailyShiftId: dashboard.dailyShiftId },
    );
  }

  const shiftsInPeriod = await dailyShifts.findByPeriod({
    from: periodStart,
    to: periodEnd,
  });

  const orders: Order[] = [];
  for (const shift of shiftsInPeriod) {
    const shiftOrders = await ordersRepo.findByDailyShiftId(shift.dailyShiftId);
    for (const order of shiftOrders) {
      orders.push(order);
    }
  }

  // rule: aiSummaryUsesExistingOperationalData
  const summaryText = buildSummaryTextFromOperationalData({
    dashboard,
    shifts: shiftsInPeriod,
    orders,
    periodStart,
    periodEnd,
    summaryDate,
  });

  const modelId: string | null = 'cafeFlow.ruleBasedSalesSummary';
  const promptTokens: number | null = null;
  const completionTokens: number | null = null;
  const generatedAt: string | null = now;

  const summary: AiSalesSummary = {
    aiSalesSummaryId: ctx.idGenerator.newId(),
    operationalDashboardId: input.operationalDashboardId,
    summaryDate,
    periodStart,
    periodEnd,
    summaryText,
    modelId,
    promptTokens,
    completionTokens,
    generatedAt,
    createdAt: now,
    updatedAt: now,
  };

  if (!isValidAiSalesSummaryPeriod(summary)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Invalid AiSalesSummary period: periodStart <= periodEnd <= summaryDate required.',
      400,
      { ruleId: 'isValidAiSalesSummaryPeriod', periodStart, periodEnd, summaryDate },
    );
  }
  if (!isNonEmptyAiSalesSummaryText(summary)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'AiSalesSummary summaryText must be non-empty.',
      400,
      { ruleId: 'isNonEmptyAiSalesSummaryText' },
    );
  }
  if (!hasValidAiSalesSummaryTokenCounts(summary)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'AiSalesSummary token counts must be non-negative when present.',
      400,
      { ruleId: 'hasValidAiSalesSummaryTokenCounts' },
    );
  }
  if (!aiSalesSummaryTokensRequireModelId(summary)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'AiSalesSummary token metadata requires a non-empty modelId.',
      400,
      { ruleId: 'aiSalesSummaryTokensRequireModelId' },
    );
  }
  if (!hasValidAiSalesSummaryTimestamps(summary)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'AiSalesSummary timestamps are inconsistent.',
      400,
      { ruleId: 'hasValidAiSalesSummaryTimestamps' },
    );
  }

  await ctx.data.runInTransaction(async () => {
    await aiSalesSummaries.save(summary);
  });

  return toOutput(summary);
}
