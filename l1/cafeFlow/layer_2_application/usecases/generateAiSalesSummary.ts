/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiSalesSummary.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IAiSalesSummaryRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/aiSalesSummaryRepository.js';
import type { IOperationalDashboardRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { AiSalesSummary } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.js';
import { hasNonEmptySummaryText } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.js';
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

function toLocalDate(iso: string): string {
  return iso.slice(0, 10);
}

function addDays(localDate: string, days: number): string {
  const date = new Date(`${localDate}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function mapToOutput(summary: AiSalesSummary): GenerateAiSalesSummaryOutput {
  return {
    aiSalesSummaryId: summary.aiSalesSummaryId,
    operationalDashboardId: summary.operationalDashboardId,
    summaryDate: summary.summaryDate,
    periodStart: summary.periodStart,
    periodEnd: summary.periodEnd,
    summaryText: summary.summaryText,
    modelId: summary.modelId ?? undefined,
    promptTokens: summary.promptTokens ?? undefined,
    completionTokens: summary.completionTokens ?? undefined,
    generatedAt: summary.generatedAt ?? undefined,
  };
}

interface AggregatedSalesMetrics {
  totalSales: number;
  totalOrders: number;
  totalItemsSold: number;
  servedOrders: number;
  cancelledOrders: number;
  topItems: Array<{ menuItemId: string; menuItemName: string; quantity: number; sales: number }>;
}

function aggregateOrders(orders: Order[]): AggregatedSalesMetrics {
  let totalSales = 0;
  let totalOrders = 0;
  let totalItemsSold = 0;
  let servedOrders = 0;
  let cancelledOrders = 0;
  const itemMap = new Map<string, { menuItemId: string; menuItemName: string; quantity: number; sales: number }>();

  for (const order of orders) {
    // rule: aiSummaryUsesExistingOperationalData
    totalOrders += 1;
    if (order.status === 'cancelled') {
      cancelledOrders += 1;
      continue;
    }
    totalSales += order.totalAmount;
    if (order.status === 'served') {
      servedOrders += 1;
    }
    for (const item of order.items ?? []) {
      if (item.status === 'cancelled') {
        continue;
      }
      totalItemsSold += item.quantity;
      const existing = itemMap.get(item.menuItemId);
      if (existing) {
        existing.quantity += item.quantity;
        existing.sales += item.subtotal;
      } else {
        itemMap.set(item.menuItemId, {
          menuItemId: item.menuItemId,
          menuItemName: item.menuItemName,
          quantity: item.quantity,
          sales: item.subtotal,
        });
      }
    }
  }

  const topItems = [...itemMap.values()]
    .sort((a, b) => b.quantity - a.quantity || b.sales - a.sales)
    .slice(0, 5);

  return {
    totalSales,
    totalOrders,
    totalItemsSold,
    servedOrders,
    cancelledOrders,
    topItems,
  };
}

function buildNarrativeSummaryText(params: {
  summaryDate: string;
  periodStart: string;
  periodEnd: string;
  dashboard: OperationalDashboard;
  currentShift: DailyShift | null;
  periodShifts: DailyShift[];
  metrics: AggregatedSalesMetrics;
}): string {
  const { summaryDate, periodStart, periodEnd, dashboard, currentShift, periodShifts, metrics } = params;
  // rule: aiSummaryUsesExistingOperationalData — narrative built only from loaded operational aggregates
  const shiftSales = periodShifts.reduce((sum, s) => sum + (s.totalSalesAmount ?? 0), 0);
  const shiftOrders = periodShifts.reduce((sum, s) => sum + (s.totalOrders ?? 0), 0);
  const shiftItems = periodShifts.reduce((sum, s) => sum + (s.totalItemsSold ?? 0), 0);

  const topItemsText =
    metrics.topItems.length > 0
      ? metrics.topItems
          .map((item, index) => `${index + 1}. ${item.menuItemName} (${item.quantity} un., R$ ${item.sales.toFixed(2)})`)
          .join('; ')
      : dashboard.topMenuItemId
        ? `item líder do dia: ${dashboard.topMenuItemId} (${dashboard.topMenuItemQuantity ?? 0} un.)`
        : 'sem itens em destaque no período';

  const stockAlert = dashboard.hasLowStockAlert
    ? `Alerta de estoque: ${dashboard.lowStockItemsCount} item(ns) em baixo estoque e ${dashboard.outOfStockItemsCount} sem estoque.`
    : 'Sem alertas de estoque baixo ou esgotado no painel atual.';

  const currentShiftLine = currentShift
    ? `Turno atual (${currentShift.shiftDate}, status ${currentShift.status}): ${currentShift.totalOrders ?? 0} pedidos, R$ ${(currentShift.totalSalesAmount ?? 0).toFixed(2)} em vendas.`
    : 'Turno atual não encontrado para o painel.';

  return [
    `Resumo de vendas de ${summaryDate} (período ${periodStart} a ${periodEnd}).`,
    `Painel do dia: R$ ${dashboard.todaySalesTotal.toFixed(2)} em vendas, ${dashboard.todayOrdersCount} pedidos e ${dashboard.todayItemsSold} itens vendidos.`,
    currentShiftLine,
    `Janela dos últimos turnos (${periodShifts.length} turno(s)): R$ ${shiftSales.toFixed(2)} em vendas agregadas de turno, ${shiftOrders} pedidos e ${shiftItems} itens (totais de turno).`,
    `Pedidos no período (fonte Order): ${metrics.totalOrders} pedidos, R$ ${metrics.totalSales.toFixed(2)} em vendas, ${metrics.totalItemsSold} itens; ${metrics.servedOrders} servidos e ${metrics.cancelledOrders} cancelados.`,
    `Itens mais vendidos: ${topItemsText}.`,
    stockAlert,
  ].join(' ');
}

export async function generateAiSalesSummary(
  ctx: RequestContext,
  input: GenerateAiSalesSummaryInput,
): Promise<GenerateAiSalesSummaryOutput> {
  const aiSalesSummaries = resolveRepository<IAiSalesSummaryRepository>(ctx, 'AiSalesSummary');
  const operationalDashboards = resolveRepository<IOperationalDashboardRepository>(ctx, 'OperationalDashboard');
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');

  const now = ctx.clock.nowIso();
  const summaryDate = toLocalDate(now);
  const periodEnd = summaryDate;
  const periodStart = addDays(summaryDate, -6);

  const dashboard = await operationalDashboards.getById(input.operationalDashboardId);
  if (!dashboard) {
    throw new AppError(
      'NOT_FOUND',
      `OperationalDashboard not found: ${input.operationalDashboardId}`,
      404,
      { operationalDashboardId: input.operationalDashboardId },
    );
  }

  const currentShift = await dailyShifts.getById(dashboard.dailyShiftId);

  const periodShifts = await dailyShifts.findByPeriod({ from: periodStart, to: periodEnd });

  // rule: aiSummaryUsesExistingOperationalData
  const ordersInPeriod: Order[] = [];
  for (const shift of periodShifts) {
    const shiftOrders = await orders.findByDailyShiftId(shift.dailyShiftId);
    ordersInPeriod.push(...shiftOrders);
  }

  const metrics = aggregateOrders(ordersInPeriod);

  const existingList = await aiSalesSummaries.list({
    operationalDashboardId: input.operationalDashboardId,
    summaryDate,
  });
  const existing = existingList.find((row) => hasNonEmptySummaryText(row)) ?? null;
  if (existing) {
    return mapToOutput(existing);
  }

  const summaryText = buildNarrativeSummaryText({
    summaryDate,
    periodStart,
    periodEnd,
    dashboard,
    currentShift,
    periodShifts,
    metrics,
  });

  const modelId = 'cafeFlow.local-narrative-v1';
  const promptTokens = 0;
  const completionTokens = summaryText.length;
  const generatedAt = now;

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

  await aiSalesSummaries.save(summary);

  return mapToOutput(summary);
}
