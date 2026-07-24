/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/shiftWorkspace.ts" enhancement="_blank"/>
import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { openDailyShift, type OpenDailyShiftInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/openDailyShift.js';
import { closeDailyShift, type CloseDailyShiftInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/closeDailyShift.js';
import { viewShiftClosingReport, type ViewShiftClosingReportInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.js';

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

export const shiftWorkspaceOpenDailyShiftCmdHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.shiftWorkspace.openDailyShiftCmd');
  if (denial) return denial;

  const params = (request.params ?? {}) as { shiftDate?: string; notes?: string };
  if (!params.shiftDate) {
    throw new AppError('VALIDATION_ERROR', 'shiftDate is required', 400, { field: 'shiftDate' });
  }

  const input: OpenDailyShiftInput = {
    shiftDate: params.shiftDate,
    notes: params.notes,
  };
  const result = await openDailyShift(ctx, input);

  return ok({
    dailyShiftId: result.dailyShiftId,
    shiftDate: result.shiftDate,
    status: result.status,
    openedByUserId: result.openedByUserId,
    openedAt: result.openedAt,
    notes: result.notes,
    createdAt: result.createdAt,
  });
};

export const shiftWorkspaceCloseDailyShiftCmdHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.shiftWorkspace.closeDailyShiftCmd');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    cashTotal?: number;
    otherPaymentsTotal?: number;
    notes?: string;
  };

  const input: CloseDailyShiftInput = {
    cashTotal: params.cashTotal,
    otherPaymentsTotal: params.otherPaymentsTotal,
    notes: params.notes,
  };
  const result = await closeDailyShift(ctx, input);

  return ok({
    dailyShiftId: result.dailyShiftId,
    shiftDate: result.shiftDate,
    status: result.status,
    closedByUserId: result.closedByUserId,
    closedAt: result.closedAt,
    totalOrders: result.totalOrders,
    totalSalesAmount: result.totalSalesAmount,
    totalItemsSold: result.totalItemsSold,
    cashTotal: result.cashTotal,
    otherPaymentsTotal: result.otherPaymentsTotal,
    shiftClosingReportId: result.shiftClosingReportId,
    generatedAt: result.generatedAt,
  });
};

export const shiftWorkspaceGetShiftClosingReportHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.shiftWorkspace.getShiftClosingReport');
  if (denial) return denial;

  const params = (request.params ?? {}) as { shiftClosingReportId?: string };
  if (!params.shiftClosingReportId) {
    throw new AppError('VALIDATION_ERROR', 'shiftClosingReportId is required', 400, { field: 'shiftClosingReportId' });
  }

  const input: ViewShiftClosingReportInput = {
    shiftClosingReportId: params.shiftClosingReportId,
  };
  const result = await viewShiftClosingReport(ctx, input);

  return ok({
    shiftClosingReportId: result.shiftClosingReportId,
    dailyShiftId: result.dailyShiftId,
    shiftDate: result.shiftDate,
    totalSalesAmount: result.totalSalesAmount,
    totalOrdersCount: result.totalOrdersCount,
    totalItemsSold: result.totalItemsSold,
    cashPaymentsAmount: result.cashPaymentsAmount,
    otherPaymentsAmount: result.otherPaymentsAmount,
    topSellingItemsSummary: result.topSellingItemsSummary,
    lowStockSignalsCount: result.lowStockSignalsCount,
    stockoutSignalsCount: result.stockoutSignalsCount,
    closingNotes: result.closingNotes,
    generatedAt: result.generatedAt,
  });
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.shiftWorkspace.openDailyShiftCmd', handler: shiftWorkspaceOpenDailyShiftCmdHandler },
  { key: 'cafeFlow.shiftWorkspace.closeDailyShiftCmd', handler: shiftWorkspaceCloseDailyShiftCmdHandler },
  { key: 'cafeFlow.shiftWorkspace.getShiftClosingReport', handler: shiftWorkspaceGetShiftClosingReportHandler },
];
