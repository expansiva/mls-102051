/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/kitchenWorkspace.ts" enhancement="_blank"/>
import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { viewKitchenQueue, type ViewKitchenQueueInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenQueue.js';
import { updateOrderStatus, type UpdateOrderStatusInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.js';

const ALLOWED: readonly string[] = ['cafeFlow:cozinheiro', 'cafeFlow:atendente'];

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

export const kitchenWorkspaceFetchKitchenQueueHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.kitchenWorkspace.fetchKitchenQueue');
  if (denial) return denial;

  // dailyShiftId is activeLifecycleInstance — resolved inside the usecase from ports/ctx.
  const input: ViewKitchenQueueInput = {};
  const result = await viewKitchenQueue(ctx, input);

  const items = (result ?? []).map((row) => ({
    orderId: row.orderId,
    orderType: row.orderType,
    tableNumber: row.tableNumber,
    customerName: row.customerName,
    notes: row.notes,
    status: row.status,
    confirmedAt: row.confirmedAt,
    inPreparationAt: row.inPreparationAt,
    items: row.items,
  }));
  return ok(items);
};

export const kitchenWorkspaceChangeOrderStatusHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.kitchenWorkspace.changeOrderStatus');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    orderId?: string;
    status?: string;
    cancellationReason?: string;
  };

  if (!params.orderId) {
    throw new AppError('VALIDATION_ERROR', 'orderId is required', 400, { field: 'orderId' });
  }
  if (!params.status) {
    throw new AppError('VALIDATION_ERROR', 'status is required', 400, { field: 'status' });
  }

  // updatedAt is systemDefault — resolved inside the usecase from ctx.clock.
  const input: UpdateOrderStatusInput = {
    orderId: params.orderId,
    status: params.status,
    cancellationReason: params.cancellationReason,
  };

  const result = await updateOrderStatus(ctx, input);

  return ok({
    orderId: result.orderId,
    status: result.status,
    confirmedAt: result.confirmedAt,
    inPreparationAt: result.inPreparationAt,
    readyAt: result.readyAt,
    servedAt: result.servedAt,
    cancelledAt: result.cancelledAt,
    cancellationReason: result.cancellationReason,
    updatedAt: result.updatedAt,
  });
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.kitchenWorkspace.fetchKitchenQueue', handler: kitchenWorkspaceFetchKitchenQueueHandler },
  { key: 'cafeFlow.kitchenWorkspace.changeOrderStatus', handler: kitchenWorkspaceChangeOrderStatusHandler },
];
