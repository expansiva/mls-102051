/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/posWorkspace.ts" enhancement="_blank"/>
import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { trackOrders, type TrackOrdersInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/trackOrders.js';
import { browseMenuForPos, type BrowseMenuForPosInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuForPos.js';
import { createOrder, type CreateOrderInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.js';
import { updateOrderStatus, type UpdateOrderStatusInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.js';
import { recordBasicPayment, type RecordBasicPaymentInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/recordBasicPayment.js';

const ALLOWED: readonly string[] = ['cafeFlow:atendente', 'cafeFlow:cozinheiro'];

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

export const posWorkspaceQueryOpenOrdersHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.posWorkspace.queryOpenOrders');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    status?: string;
    orderType?: string;
    tableNumber?: string;
    page?: number;
    pageSize?: number;
  };

  const input: TrackOrdersInput = {
    status: params.status,
    orderType: params.orderType,
    tableNumber: params.tableNumber,
    page: params.page,
    pageSize: params.pageSize,
  };

  const result = await trackOrders(ctx, input);

  const orders = (result.orders ?? []).map((row) => ({
    orderId: row.orderId,
    dailyShiftId: row.dailyShiftId,
    orderType: row.orderType,
    tableNumber: row.tableNumber,
    customerName: row.customerName,
    totalAmount: row.totalAmount,
    status: row.status,
    notes: row.notes,
    registeredAt: row.registeredAt,
    confirmedAt: row.confirmedAt,
    inPreparationAt: row.inPreparationAt,
    readyAt: row.readyAt,
  }));

  return ok({
    orders,
    total: result.total,
    page: params.page,
    pageSize: params.pageSize,
  });
};

export const posWorkspaceQueryMenuItemsHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.posWorkspace.queryMenuItems');
  if (denial) return denial;

  const params = (request.params ?? {}) as { menuCategoryId?: string };

  const input: BrowseMenuForPosInput = {
    menuCategoryId: params.menuCategoryId,
  };

  const result = await browseMenuForPos(ctx, input);

  const items = (result.items ?? []).map((row) => ({
    menuItemId: row.menuItemId,
    menuCategoryId: row.menuCategoryId,
    name: row.name,
    description: row.description,
    price: row.price,
    status: row.status,
    imageUrl: row.imageUrl,
    displayOrder: row.displayOrder,
  }));

  return ok(items);
};

export const posWorkspaceCmdCreateOrderHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.posWorkspace.cmdCreateOrder');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    orderType?: string;
    tableNumber?: string;
    customerName?: string;
    notes?: string;
    items?: Array<{ menuItemId?: string; quantity?: number; observations?: string }>;
    menuItemId?: string;
    quantity?: number;
    observations?: string;
  };

  if (!params.orderType) {
    throw new AppError('VALIDATION_ERROR', 'orderType is required', 400, { field: 'orderType' });
  }

  // Accept either an items[] array or a single menuItemId/quantity pair from the boundary.
  let items: CreateOrderInput['items'];
  if (Array.isArray(params.items) && params.items.length > 0) {
    for (const line of params.items) {
      if (!line.menuItemId) {
        throw new AppError('VALIDATION_ERROR', 'menuItemId is required', 400, { field: 'menuItemId' });
      }
      if (line.quantity === undefined || line.quantity === null) {
        throw new AppError('VALIDATION_ERROR', 'quantity is required', 400, { field: 'quantity' });
      }
    }
    items = params.items.map((line) => ({
      menuItemId: line.menuItemId as string,
      quantity: line.quantity as number,
      observations: line.observations,
    }));
  } else {
    if (!params.menuItemId) {
      throw new AppError('VALIDATION_ERROR', 'menuItemId is required', 400, { field: 'menuItemId' });
    }
    if (params.quantity === undefined || params.quantity === null) {
      throw new AppError('VALIDATION_ERROR', 'quantity is required', 400, { field: 'quantity' });
    }
    items = [
      {
        menuItemId: params.menuItemId,
        quantity: params.quantity,
        observations: params.observations,
      },
    ];
  }

  const input: CreateOrderInput = {
    orderType: params.orderType,
    tableNumber: params.tableNumber,
    customerName: params.customerName,
    notes: params.notes,
    items,
  };

  const result = await createOrder(ctx, input);

  return ok({
    orderId: result.orderId,
    dailyShiftId: result.dailyShiftId,
    orderType: result.orderType,
    tableNumber: result.tableNumber,
    customerName: result.customerName,
    totalAmount: result.totalAmount,
    status: result.status,
    registeredAt: result.registeredAt,
    confirmedAt: result.confirmedAt,
    items: result.items,
  });
};

export const posWorkspaceCmdUpdateOrderStatusHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.posWorkspace.cmdUpdateOrderStatus');
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

  const input: UpdateOrderStatusInput = {
    orderId: params.orderId,
    status: params.status,
    cancellationReason: params.cancellationReason,
  };

  const result = await updateOrderStatus(ctx, input);
  return ok(result);
};

export const posWorkspaceCmdRecordBasicPaymentHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.posWorkspace.cmdRecordBasicPayment');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    orderId?: string;
    totalAmount?: number;
    paymentMethod?: string;
    notes?: string;
  };

  if (!params.orderId) {
    throw new AppError('VALIDATION_ERROR', 'orderId is required', 400, { field: 'orderId' });
  }
  if (params.totalAmount === undefined || params.totalAmount === null) {
    throw new AppError('VALIDATION_ERROR', 'totalAmount is required', 400, { field: 'totalAmount' });
  }
  if (!params.paymentMethod) {
    throw new AppError('VALIDATION_ERROR', 'paymentMethod is required', 400, { field: 'paymentMethod' });
  }

  const input: RecordBasicPaymentInput = {
    orderId: params.orderId,
    totalAmount: params.totalAmount,
    paymentMethod: params.paymentMethod,
    notes: params.notes,
  };

  const result = await recordBasicPayment(ctx, input);

  return ok({
    orderPaymentId: result.orderPaymentId,
    orderId: result.orderId,
    totalAmount: result.totalAmount,
    paymentMethod: result.paymentMethod,
    status: result.status,
    paidAt: result.paidAt,
  });
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.posWorkspace.queryOpenOrders', handler: posWorkspaceQueryOpenOrdersHandler },
  { key: 'cafeFlow.posWorkspace.queryMenuItems', handler: posWorkspaceQueryMenuItemsHandler },
  { key: 'cafeFlow.posWorkspace.cmdCreateOrder', handler: posWorkspaceCmdCreateOrderHandler },
  { key: 'cafeFlow.posWorkspace.cmdUpdateOrderStatus', handler: posWorkspaceCmdUpdateOrderStatusHandler },
  { key: 'cafeFlow.posWorkspace.cmdRecordBasicPayment', handler: posWorkspaceCmdRecordBasicPaymentHandler },
];
