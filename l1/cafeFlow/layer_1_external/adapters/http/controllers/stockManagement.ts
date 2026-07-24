/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/stockManagement.ts" enhancement="_blank"/>
import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { browseStockItems, type BrowseStockItemsInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.js';
import { createStockItem, type CreateStockItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/createStockItem.js';
import { updateStockItem, type UpdateStockItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/updateStockItem.js';
import { deleteStockItem, type DeleteStockItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/deleteStockItem.js';
import { createStockAdjustment, type CreateStockAdjustmentInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/createStockAdjustment.js';

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

export const stockManagementListStockItemsHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.stockManagement.listStockItems');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    nameFilter?: string;
    lowStockOnly?: boolean;
    page?: number;
    pageSize?: number;
  };

  const input: BrowseStockItemsInput = {
    nameFilter: params.nameFilter,
    lowStockOnly: params.lowStockOnly,
    page: params.page,
    pageSize: params.pageSize,
  };

  const result = await browseStockItems(ctx, input);

  const stockItems = (result.stockItems ?? []).map((row) => ({
    stockItemId: row.stockItemId,
    name: row.name,
    unit: row.unit,
    currentBalance: row.currentBalance,
    minimumLevel: row.minimumLevel,
    isLowStock: row.isLowStock,
    description: row.description,
    updatedAt: row.updatedAt,
  }));

  return ok({
    stockItems,
    total: result.total,
    page: params.page,
    pageSize: params.pageSize,
  });
};

export const stockManagementAddStockItemHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.stockManagement.addStockItem');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    name?: string;
    unit?: string;
    currentBalance?: number;
    minimumLevel?: number;
    description?: string;
  };

  if (!params.name) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }
  if (!params.unit) {
    throw new AppError('VALIDATION_ERROR', 'unit is required', 400, { field: 'unit' });
  }
  if (params.currentBalance === undefined || params.currentBalance === null) {
    throw new AppError('VALIDATION_ERROR', 'currentBalance is required', 400, { field: 'currentBalance' });
  }
  if (params.minimumLevel === undefined || params.minimumLevel === null) {
    throw new AppError('VALIDATION_ERROR', 'minimumLevel is required', 400, { field: 'minimumLevel' });
  }

  const input: CreateStockItemInput = {
    name: params.name,
    unit: params.unit,
    currentBalance: params.currentBalance,
    minimumLevel: params.minimumLevel,
    description: params.description,
  };

  const result = await createStockItem(ctx, input);

  return ok({
    stockItemId: result.stockItemId,
    name: result.name,
    unit: result.unit,
    currentBalance: result.currentBalance,
    minimumLevel: result.minimumLevel,
    createdAt: result.createdAt,
  });
};

export const stockManagementEditStockItemHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.stockManagement.editStockItem');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    stockItemId?: string;
    name?: string;
    unit?: string;
    minimumLevel?: number;
    description?: string;
  };

  if (!params.stockItemId) {
    throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400, { field: 'stockItemId' });
  }
  if (!params.name) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }
  if (!params.unit) {
    throw new AppError('VALIDATION_ERROR', 'unit is required', 400, { field: 'unit' });
  }
  if (params.minimumLevel === undefined || params.minimumLevel === null) {
    throw new AppError('VALIDATION_ERROR', 'minimumLevel is required', 400, { field: 'minimumLevel' });
  }

  const input: UpdateStockItemInput = {
    stockItemId: params.stockItemId,
    name: params.name,
    unit: params.unit,
    minimumLevel: params.minimumLevel,
    description: params.description,
  };

  const result = await updateStockItem(ctx, input);

  return ok({
    stockItemId: result.stockItemId,
    name: result.name,
    unit: result.unit,
    currentBalance: result.currentBalance,
    minimumLevel: result.minimumLevel,
    updatedAt: result.updatedAt,
  });
};

export const stockManagementRemoveStockItemHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.stockManagement.removeStockItem');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    stockItemId?: string;
  };

  if (!params.stockItemId) {
    throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400, { field: 'stockItemId' });
  }

  const input: DeleteStockItemInput = {
    stockItemId: params.stockItemId,
  };

  const result = await deleteStockItem(ctx, input);

  return ok({
    stockItemId: result.stockItemId,
    name: result.name,
  });
};

export const stockManagementRegisterStockAdjustmentHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.stockManagement.registerStockAdjustment');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    stockItemId?: string;
    quantity?: number;
    direction?: string;
    reason?: string;
    notes?: string;
  };

  if (!params.stockItemId) {
    throw new AppError('VALIDATION_ERROR', 'stockItemId is required', 400, { field: 'stockItemId' });
  }
  if (params.quantity === undefined || params.quantity === null) {
    throw new AppError('VALIDATION_ERROR', 'quantity is required', 400, { field: 'quantity' });
  }
  if (!params.direction) {
    throw new AppError('VALIDATION_ERROR', 'direction is required', 400, { field: 'direction' });
  }
  if (!params.reason) {
    throw new AppError('VALIDATION_ERROR', 'reason is required', 400, { field: 'reason' });
  }

  const input: CreateStockAdjustmentInput = {
    stockItemId: params.stockItemId,
    quantity: params.quantity,
    direction: params.direction,
    reason: params.reason,
    notes: params.notes,
  };

  const result = await createStockAdjustment(ctx, input);

  return ok({
    stockAdjustmentId: result.stockAdjustmentId,
    stockItemId: result.stockItemId,
    quantity: result.quantity,
    direction: result.direction,
    reason: result.reason,
    resultingBalance: result.resultingBalance,
    status: result.status,
    createdAt: result.createdAt,
  });
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.stockManagement.listStockItems', handler: stockManagementListStockItemsHandler },
  { key: 'cafeFlow.stockManagement.addStockItem', handler: stockManagementAddStockItemHandler },
  { key: 'cafeFlow.stockManagement.editStockItem', handler: stockManagementEditStockItemHandler },
  { key: 'cafeFlow.stockManagement.removeStockItem', handler: stockManagementRemoveStockItemHandler },
  { key: 'cafeFlow.stockManagement.registerStockAdjustment', handler: stockManagementRegisterStockAdjustmentHandler },
];
