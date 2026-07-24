/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiPromotionSuggestions.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IAiPromotionSuggestionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/aiPromotionSuggestionRepository.js';
import type { IOperationalDashboardRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { AiPromotionSuggestion } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.js';
import {
  isNonEmptyReason,
  isValidConfidenceScore,
  isValidCurrentStockLevel,
  isValidSalesLast7Days,
  isValidSalesToday,
  isValidSuggestedDiscountPercent,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.js';
import type { Order } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface GenerateAiPromotionSuggestionsInput {
  operationalDashboardId: string;
}

/** Wire row for one AI promotion suggestion (outputShape list item). */
export interface GenerateAiPromotionSuggestionsItem {
  aiPromotionSuggestionId: string;
  operationalDashboardId: string;
  menuItemId: string;
  menuItemName: string;
  menuCategoryId?: string | null;
  reason: string;
  salesLast7Days: number;
  salesToday?: number | null;
  currentStockLevel?: number | null;
  confidenceScore: number;
  suggestedDiscountPercent?: number | null;
  status: string;
  generatedAt: string;
  expiresAt?: string | null;
}

/** outputShape.kind = list — canonical wire shape is the array of item fields. */
export type GenerateAiPromotionSuggestionsOutput = GenerateAiPromotionSuggestionsItem[];

interface MenuItemProjection {
  menuItemId: string;
  menuItemName: string;
  menuCategoryId: string | null;
  stockItemId: string | null;
}

function dateOnly(isoOrDate: string): string {
  return isoOrDate.slice(0, 10);
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(`${dateOnly(dateStr)}T00:00:00.000Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

function isCancelledOrder(order: Order): boolean {
  return String(order.status) === 'cancelled';
}

function orderInWindow(order: Order, fromDate: string, toDate: string): boolean {
  const day = dateOnly(order.registeredAt || order.createdAt);
  return day >= fromDate && day <= toDate;
}

function orderIsToday(order: Order, today: string): boolean {
  return dateOnly(order.registeredAt || order.createdAt) === today;
}

function readModuleSection(details: Record<string, unknown>): Record<string, unknown> {
  const section = details.cafeFlow;
  if (section && typeof section === 'object' && !Array.isArray(section)) {
    return section as Record<string, unknown>;
  }
  return details;
}

function asNullableString(value: unknown): string | null {
  if (value === null || value === undefined) {
    return null;
  }
  const s = String(value).trim();
  return s.length > 0 ? s : null;
}

function asNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function mapSuggestionToOutput(s: AiPromotionSuggestion): GenerateAiPromotionSuggestionsItem {
  return {
    aiPromotionSuggestionId: s.aiPromotionSuggestionId,
    operationalDashboardId: s.operationalDashboardId,
    menuItemId: s.menuItemId,
    menuItemName: s.menuItemName,
    menuCategoryId: s.menuCategoryId,
    reason: s.reason,
    salesLast7Days: s.salesLast7Days,
    salesToday: s.salesToday,
    currentStockLevel: s.currentStockLevel,
    confidenceScore: s.confidenceScore,
    suggestedDiscountPercent: s.suggestedDiscountPercent,
    status: s.status,
    generatedAt: s.generatedAt,
    expiresAt: s.expiresAt,
  };
}

/**
 * Heuristic decision-support scoring only — never mutates promotions/campaigns.
 * // rule: aiPromotionSuggestionsAreDecisionSupport
 */
function buildSuggestionMetrics(input: {
  salesLast7Days: number;
  salesToday: number;
  currentStockLevel: number | null;
}): { reason: string; confidenceScore: number; suggestedDiscountPercent: number | null } {
  const { salesLast7Days, salesToday, currentStockLevel } = input;
  const highStock = currentStockLevel !== null && currentStockLevel >= 20;
  const mediumStock = currentStockLevel !== null && currentStockLevel >= 10;
  const lowSales7d = salesLast7Days <= 5;
  const veryLowSales7d = salesLast7Days <= 2;
  const noSalesToday = salesToday <= 0;

  let confidenceScore = 40;
  let suggestedDiscountPercent: number | null = 10;
  const reasons: string[] = [];

  if (veryLowSales7d) {
    confidenceScore += 25;
    suggestedDiscountPercent = 20;
    reasons.push('vendas muito baixas nos últimos 7 dias');
  } else if (lowSales7d) {
    confidenceScore += 15;
    suggestedDiscountPercent = 15;
    reasons.push('vendas abaixo do esperado nos últimos 7 dias');
  } else {
    confidenceScore += 5;
    suggestedDiscountPercent = 10;
    reasons.push('oportunidade de impulsionar item com vendas moderadas');
  }

  if (noSalesToday) {
    confidenceScore += 10;
    reasons.push('sem vendas hoje');
  }

  if (highStock) {
    confidenceScore += 20;
    suggestedDiscountPercent = Math.max(suggestedDiscountPercent ?? 0, 20);
    reasons.push('estoque elevado');
  } else if (mediumStock) {
    confidenceScore += 10;
    suggestedDiscountPercent = Math.max(suggestedDiscountPercent ?? 0, 15);
    reasons.push('estoque confortável para promoção');
  } else if (currentStockLevel !== null && currentStockLevel <= 0) {
    confidenceScore = Math.max(20, confidenceScore - 30);
    suggestedDiscountPercent = null;
    reasons.push('estoque zerado — promoção não recomendada operacionalmente');
  }

  confidenceScore = Math.max(0, Math.min(100, confidenceScore));
  const reason = `Sugestão de apoio à decisão: ${reasons.join('; ')}.`;
  return { reason, confidenceScore, suggestedDiscountPercent };
}

export async function generateAiPromotionSuggestions(
  ctx: RequestContext,
  input: GenerateAiPromotionSuggestionsInput,
): Promise<GenerateAiPromotionSuggestionsOutput> {
  const aiPromotionSuggestions = resolveRepository<IAiPromotionSuggestionRepository>(
    ctx,
    'AiPromotionSuggestion',
  );
  const operationalDashboards = resolveRepository<IOperationalDashboardRepository>(
    ctx,
    'OperationalDashboard',
  );
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  // Available for consumption-window analytics if needed alongside MDM stock balances.
  resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  const dashboard = await operationalDashboards.getById(input.operationalDashboardId);
  if (!dashboard) {
    throw new AppError(
      'NOT_FOUND',
      `OperationalDashboard not found: ${input.operationalDashboardId}`,
      404,
      { operationalDashboardId: input.operationalDashboardId },
    );
  }

  const referenceDate = dateOnly(dashboard.referenceDate);
  const windowFrom = addDays(referenceDate, -6);
  const windowTo = referenceDate;

  const existing = await aiPromotionSuggestions.list({
    operationalDashboardId: input.operationalDashboardId,
  });

  const freshExisting = existing.filter((s) => {
    if (String(s.status) === 'expired') {
      return false;
    }
    // Stale when dashboard was recomputed after the suggestion was generated.
    return s.generatedAt >= dashboard.lastComputedAt || dateOnly(s.generatedAt) === referenceDate;
  });

  if (freshExisting.length > 0) {
    // rule: aiPromotionSuggestionsAreDecisionSupport
    return freshExisting
      .slice()
      .sort((a, b) => b.confidenceScore - a.confidenceScore)
      .map(mapSuggestionToOutput);
  }

  const allOrders = await orders.list({});
  const windowOrders = allOrders.filter(
    (order) => !isCancelledOrder(order) && orderInWindow(order, windowFrom, windowTo),
  );

  const salesLast7DaysMap = new Map<string, number>();
  const salesTodayMap = new Map<string, number>();
  const menuItemNameFromOrders = new Map<string, string>();

  for (const order of windowOrders) {
    const today = orderIsToday(order, referenceDate);
    for (const item of order.items ?? []) {
      if (String(item.status) === 'cancelled') {
        continue;
      }
      const qty = Number(item.quantity) || 0;
      if (qty <= 0) {
        continue;
      }
      salesLast7DaysMap.set(
        item.menuItemId,
        (salesLast7DaysMap.get(item.menuItemId) ?? 0) + qty,
      );
      if (today) {
        salesTodayMap.set(item.menuItemId, (salesTodayMap.get(item.menuItemId) ?? 0) + qty);
      }
      if (item.menuItemName) {
        menuItemNameFromOrders.set(item.menuItemId, item.menuItemName);
      }
    }
  }

  // Also consider shift orders that may not fall in registeredAt window edge cases.
  const shiftOrders = await orders.findByDailyShiftId(dashboard.dailyShiftId);
  for (const order of shiftOrders) {
    if (isCancelledOrder(order)) {
      continue;
    }
    for (const item of order.items ?? []) {
      if (String(item.status) === 'cancelled') {
        continue;
      }
      const qty = Number(item.quantity) || 0;
      if (qty <= 0) {
        continue;
      }
      if (!salesLast7DaysMap.has(item.menuItemId)) {
        salesLast7DaysMap.set(item.menuItemId, qty);
      }
      salesTodayMap.set(
        item.menuItemId,
        Math.max(salesTodayMap.get(item.menuItemId) ?? 0, qty) === qty &&
          !salesTodayMap.has(item.menuItemId)
          ? qty
          : (salesTodayMap.get(item.menuItemId) ?? 0),
      );
      // Prefer accumulating today's shift items into salesToday.
      if (!orderIsToday(order, referenceDate) && String(order.status) !== 'cancelled') {
        // shift is "today" relative to dashboard — count toward today if not already counted
      }
      if (item.menuItemName) {
        menuItemNameFromOrders.set(item.menuItemId, item.menuItemName);
      }
    }
  }

  // Re-accumulate salesToday strictly from shift orders (dashboard day).
  salesTodayMap.clear();
  for (const order of shiftOrders) {
    if (isCancelledOrder(order)) {
      continue;
    }
    for (const item of order.items ?? []) {
      if (String(item.status) === 'cancelled') {
        continue;
      }
      const qty = Number(item.quantity) || 0;
      if (qty <= 0) {
        continue;
      }
      salesTodayMap.set(item.menuItemId, (salesTodayMap.get(item.menuItemId) ?? 0) + qty);
      if (!salesLast7DaysMap.has(item.menuItemId)) {
        salesLast7DaysMap.set(item.menuItemId, qty);
      }
      if (item.menuItemName) {
        menuItemNameFromOrders.set(item.menuItemId, item.menuItemName);
      }
    }
  }

  const menuItemIds = [...new Set([...salesLast7DaysMap.keys(), ...salesTodayMap.keys()])];

  // Include low-stock ids from dashboard when present (comma-separated or JSON).
  const lowStockRaw = dashboard.lowStockItemIds;
  if (lowStockRaw) {
    try {
      const parsed = JSON.parse(lowStockRaw) as unknown;
      if (Array.isArray(parsed)) {
        for (const id of parsed) {
          if (typeof id === 'string' && id.length > 0) {
            menuItemIds.push(id);
          }
        }
      }
    } catch {
      for (const id of lowStockRaw.split(',').map((s) => s.trim()).filter(Boolean)) {
        menuItemIds.push(id);
      }
    }
  }

  const distinctMenuItemIds = [...new Set(menuItemIds)];

  const menuEntities =
    distinctMenuItemIds.length > 0
      ? await ctx.mdm.collection.getMany({ mdmIds: distinctMenuItemIds })
      : [];

  const menuById = new Map<string, MenuItemProjection>();
  const stockItemIds: string[] = [];

  for (const entity of menuEntities) {
    const details = entity.details as unknown as Record<string, unknown>;
    const section = readModuleSection(details);
    const menuItemName =
      asNullableString(details.name) ??
      asNullableString(section.name) ??
      menuItemNameFromOrders.get(entity.mdmId) ??
      entity.mdmId;
    const menuCategoryId =
      asNullableString(section.menuCategoryId) ?? asNullableString(details.menuCategoryId);
    const stockItemId =
      asNullableString(section.stockItemId) ??
      asNullableString(details.stockItemId) ??
      asNullableString(section.productId) ??
      null;
    if (stockItemId) {
      stockItemIds.push(stockItemId);
    }
    // Relationship-based stock link (Owns / OffersProduct style) when present on refs.
    const relatedStock = entity.related('so' as never);
    if (!stockItemId && Array.isArray(relatedStock)) {
      for (const rid of relatedStock) {
        if (typeof rid === 'string' && rid.length > 0) {
          stockItemIds.push(rid);
        }
      }
    }
    menuById.set(entity.mdmId, {
      menuItemId: entity.mdmId,
      menuItemName,
      menuCategoryId,
      stockItemId,
    });
  }

  // Ensure order-only menu items still appear even if MDM miss.
  for (const id of distinctMenuItemIds) {
    if (!menuById.has(id)) {
      menuById.set(id, {
        menuItemId: id,
        menuItemName: menuItemNameFromOrders.get(id) ?? id,
        menuCategoryId: null,
        stockItemId: null,
      });
    }
  }

  const distinctStockIds = [...new Set(stockItemIds)];
  const stockEntities =
    distinctStockIds.length > 0
      ? await ctx.mdm.collection.getMany({ mdmIds: distinctStockIds })
      : [];

  const stockBalanceById = new Map<string, number>();
  for (const entity of stockEntities) {
    const details = entity.details as unknown as Record<string, unknown>;
    const section = readModuleSection(details);
    const balance =
      asNullableNumber(section.currentBalance) ??
      asNullableNumber(section.balance) ??
      asNullableNumber(details.currentBalance) ??
      asNullableNumber(details.balance) ??
      0;
    stockBalanceById.set(entity.mdmId, balance);
  }

  const now = ctx.clock.nowIso();
  const expiresAt = `${addDays(referenceDate, 1)}T23:59:59.000Z`;

  // Candidate menu items: underperforming and/or high/low stock — decision support only.
  // rule: aiPromotionSuggestionsAreDecisionSupport
  const candidates: AiPromotionSuggestion[] = [];

  for (const [menuItemId, menu] of menuById) {
    const salesLast7Days = salesLast7DaysMap.get(menuItemId) ?? 0;
    const salesToday = salesTodayMap.get(menuItemId) ?? 0;
    const currentStockLevel =
      menu.stockItemId !== null ? (stockBalanceById.get(menu.stockItemId) ?? null) : null;

    // Focus on items that may benefit from a promo (low sales and/or elevated stock).
    const underperforming = salesLast7Days <= 8;
    const elevatedStock = currentStockLevel !== null && currentStockLevel >= 10;
    if (!underperforming && !elevatedStock) {
      continue;
    }

    const metrics = buildSuggestionMetrics({
      salesLast7Days,
      salesToday,
      currentStockLevel,
    });

    if (!isNonEmptyReason(metrics.reason)) {
      continue;
    }
    if (!isValidConfidenceScore(metrics.confidenceScore)) {
      continue;
    }
    if (!isValidSuggestedDiscountPercent(metrics.suggestedDiscountPercent)) {
      continue;
    }
    if (!isValidSalesLast7Days(salesLast7Days) || !isValidSalesToday(salesToday)) {
      continue;
    }
    if (!isValidCurrentStockLevel(currentStockLevel)) {
      continue;
    }

    const suggestion: AiPromotionSuggestion = {
      aiPromotionSuggestionId: ctx.idGenerator.newId(),
      operationalDashboardId: dashboard.operationalDashboardId,
      menuItemId,
      menuItemName: menu.menuItemName,
      menuCategoryId: menu.menuCategoryId,
      reason: metrics.reason,
      salesLast7Days,
      salesToday,
      currentStockLevel,
      confidenceScore: metrics.confidenceScore,
      suggestedDiscountPercent: metrics.suggestedDiscountPercent,
      status: 'pending',
      reviewedAt: null,
      reviewedByUserId: null,
      reviewNotes: null,
      generatedAt: now,
      expiresAt,
      createdAt: now,
      updatedAt: now,
    };

    // Persist projection for later review — does not accept/apply promotions.
    // rule: aiPromotionSuggestionsAreDecisionSupport
    await aiPromotionSuggestions.save(suggestion);
    candidates.push(suggestion);
  }

  candidates.sort((a, b) => b.confidenceScore - a.confidenceScore);

  return candidates.map(mapSuggestionToOutput);
}
