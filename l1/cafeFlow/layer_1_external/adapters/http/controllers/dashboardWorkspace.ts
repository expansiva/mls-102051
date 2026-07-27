/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/dashboardWorkspace.ts" enhancement="_blank"/>
import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewOperationalDashboard, type ViewOperationalDashboardInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewOperationalDashboard.js';
import { generateAiSalesSummary, type GenerateAiSalesSummaryInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiSalesSummary.js';
import { generateAiPromotionSuggestions, type GenerateAiPromotionSuggestionsInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiPromotionSuggestions.js';

const ALLOWED: readonly string[] = ['cafeFlow:gerente'];

function enforceActors(ctx: RequestContext, allowed: readonly string[], route: string): BffResponse | null {
  if (allowed.length === 0) return null;
  const scope = ctx.sessionContext?.actorScope ?? [];
  if (scope.length === 0) {
    ctx.log.info('bff.actor.no-scope', { route, allowed });
    return null;
  }
  if (scope.some((s) => allowed.includes(s))) return null;
  return fail(new AppError('FORBIDDEN_ACTOR', 'actor scope not permitted for ' + route, 403, { route }));
}

export const dashboardWorkspaceGetDashboardHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.dashboardWorkspace.getDashboard');
  if (denial) return denial;

  // dailyShiftId is activeLifecycleInstance — resolved inside the usecase from ctx/ports.
  const input: ViewOperationalDashboardInput = {};
  const result = await viewOperationalDashboard(ctx, input);

  return ok({
    operationalDashboardId: result.operationalDashboardId,
    dailyShiftId: result.dailyShiftId,
    referenceDate: result.referenceDate,
    todaySalesTotal: result.todaySalesTotal,
    todayOrdersCount: result.todayOrdersCount,
    todayItemsSold: result.todayItemsSold,
    topMenuItemId: result.topMenuItemId,
    topMenuItemQuantity: result.topMenuItemQuantity,
    topSellingItemsCount: result.topSellingItemsCount,
    lowStockItemsCount: result.lowStockItemsCount,
    outOfStockItemsCount: result.outOfStockItemsCount,
    hasLowStockAlert: result.hasLowStockAlert,
    lastComputedAt: result.lastComputedAt,
    topSellingItems: result.topSellingItems,
    lowStockAlerts: result.lowStockAlerts,
  });
};

export const dashboardWorkspaceGetAiSalesSummaryHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.dashboardWorkspace.getAiSalesSummary');
  if (denial) return denial;

  const params = (request.params ?? {}) as { operationalDashboardId?: string };
  if (!params.operationalDashboardId) {
    throw new AppError('VALIDATION_ERROR', 'operationalDashboardId is required', 400, { field: 'operationalDashboardId' });
  }

  const input: GenerateAiSalesSummaryInput = {
    operationalDashboardId: params.operationalDashboardId,
  };
  const result = await generateAiSalesSummary(ctx, input);

  return ok({
    aiSalesSummaryId: result.aiSalesSummaryId,
    operationalDashboardId: result.operationalDashboardId,
    summaryDate: result.summaryDate,
    periodStart: result.periodStart,
    periodEnd: result.periodEnd,
    summaryText: result.summaryText,
    modelId: result.modelId,
    promptTokens: result.promptTokens,
    completionTokens: result.completionTokens,
    generatedAt: result.generatedAt,
  });
};

export const dashboardWorkspaceGetAiPromotionSuggestionsHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.dashboardWorkspace.getAiPromotionSuggestions');
  if (denial) return denial;

  const params = (request.params ?? {}) as { operationalDashboardId?: string };
  if (!params.operationalDashboardId) {
    throw new AppError('VALIDATION_ERROR', 'operationalDashboardId is required', 400, { field: 'operationalDashboardId' });
  }

  const input: GenerateAiPromotionSuggestionsInput = {
    operationalDashboardId: params.operationalDashboardId,
  };
  const result = await generateAiPromotionSuggestions(ctx, input);

  const items = (result ?? []).map((row) => ({
    aiPromotionSuggestionId: row.aiPromotionSuggestionId,
    operationalDashboardId: row.operationalDashboardId,
    menuItemId: row.menuItemId,
    menuItemName: row.menuItemName,
    menuCategoryId: row.menuCategoryId,
    reason: row.reason,
    salesLast7Days: row.salesLast7Days,
    salesToday: row.salesToday,
    currentStockLevel: row.currentStockLevel,
    confidenceScore: row.confidenceScore,
    suggestedDiscountPercent: row.suggestedDiscountPercent,
    status: row.status,
    generatedAt: row.generatedAt,
    expiresAt: row.expiresAt,
  }));

  return ok(items);
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.dashboardWorkspace.getDashboard', handler: dashboardWorkspaceGetDashboardHandler },
  { key: 'cafeFlow.dashboardWorkspace.getAiSalesSummary', handler: dashboardWorkspaceGetAiSalesSummaryHandler },
  { key: 'cafeFlow.dashboardWorkspace.getAiPromotionSuggestions', handler: dashboardWorkspaceGetAiPromotionSuggestionsHandler },
];
