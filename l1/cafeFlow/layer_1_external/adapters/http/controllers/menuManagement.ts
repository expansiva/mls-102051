/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/menuManagement.ts" enhancement="_blank"/>
import { ok, fail, AppError, type BffHandler, type BffResponse, type ControllerRoute, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { browseMenuItems, type BrowseMenuItemsInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.js';
import { createMenuItem, type CreateMenuItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/createMenuItem.js';
import { updateMenuItem, type UpdateMenuItemInput } from '/_102051_/l1/cafeFlow/layer_2_application/usecases/updateMenuItem.js';

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

export const menuManagementListMenuItemsHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.menuManagement.listMenuItems');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    status?: string;
    menuCategoryId?: string;
    name?: string;
    page?: number;
    pageSize?: number;
  };

  const input: BrowseMenuItemsInput = {
    status: params.status,
    menuCategoryId: params.menuCategoryId,
    name: params.name,
    page: params.page,
    pageSize: params.pageSize,
  };

  const result = await browseMenuItems(ctx, input);

  const menuItems = (result.menuItems ?? []).map((row) => ({
    menuItemId: row.menuItemId,
    menuCategoryId: row.menuCategoryId,
    categoryName: row.categoryName,
    name: row.name,
    description: row.description,
    price: row.price,
    status: row.status,
    pausedAt: row.pausedAt,
    pauseReason: row.pauseReason,
    imageUrl: row.imageUrl,
    displayOrder: row.displayOrder,
    requiresStockLink: row.requiresStockLink,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  }));

  return ok({
    menuItems,
    total: result.total,
    page: params.page != null && params.page > 0 ? params.page : 1,
    pageSize: params.pageSize != null && params.pageSize > 0 ? params.pageSize : 50,
  });
};

export const menuManagementCreateMenuItemCmdHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.menuManagement.createMenuItemCmd');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    menuCategoryId?: string;
    name?: string;
    description?: string;
    price?: number;
    status?: string;
    imageUrl?: string;
    displayOrder?: number;
    requiresStockLink?: boolean;
  };

  if (!params.menuCategoryId) {
    throw new AppError('VALIDATION_ERROR', 'menuCategoryId is required', 400, { field: 'menuCategoryId' });
  }
  if (!params.name) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }
  if (params.price == null) {
    throw new AppError('VALIDATION_ERROR', 'price is required', 400, { field: 'price' });
  }
  if (params.requiresStockLink == null) {
    throw new AppError('VALIDATION_ERROR', 'requiresStockLink is required', 400, { field: 'requiresStockLink' });
  }

  const input: CreateMenuItemInput = {
    menuCategoryId: params.menuCategoryId,
    name: params.name,
    description: params.description,
    price: params.price,
    status: params.status,
    imageUrl: params.imageUrl,
    displayOrder: params.displayOrder,
    requiresStockLink: params.requiresStockLink,
  };

  const result = await createMenuItem(ctx, input);

  return ok({
    menuItemId: result.menuItemId,
    menuCategoryId: result.menuCategoryId,
    name: result.name,
    description: result.description,
    price: result.price,
    status: result.status,
    imageUrl: result.imageUrl,
    displayOrder: result.displayOrder,
    requiresStockLink: result.requiresStockLink,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt,
  });
};

export const menuManagementUpdateMenuItemCmdHandler: BffHandler = async ({ request, ctx }) => {
  const denial = enforceActors(ctx, ALLOWED, 'cafeFlow.menuManagement.updateMenuItemCmd');
  if (denial) return denial;

  const params = (request.params ?? {}) as {
    menuItemId?: string;
    menuCategoryId?: string;
    name?: string;
    description?: string;
    price?: number;
    status?: string;
    pauseReason?: string;
    imageUrl?: string;
    displayOrder?: number;
    requiresStockLink?: boolean;
  };

  if (!params.menuItemId) {
    throw new AppError('VALIDATION_ERROR', 'menuItemId is required', 400, { field: 'menuItemId' });
  }
  if (!params.menuCategoryId) {
    throw new AppError('VALIDATION_ERROR', 'menuCategoryId is required', 400, { field: 'menuCategoryId' });
  }
  if (!params.name) {
    throw new AppError('VALIDATION_ERROR', 'name is required', 400, { field: 'name' });
  }
  if (params.price == null) {
    throw new AppError('VALIDATION_ERROR', 'price is required', 400, { field: 'price' });
  }
  if (!params.status) {
    throw new AppError('VALIDATION_ERROR', 'status is required', 400, { field: 'status' });
  }
  if (params.requiresStockLink == null) {
    throw new AppError('VALIDATION_ERROR', 'requiresStockLink is required', 400, { field: 'requiresStockLink' });
  }

  const input: UpdateMenuItemInput = {
    menuItemId: params.menuItemId,
    menuCategoryId: params.menuCategoryId,
    name: params.name,
    description: params.description,
    price: params.price,
    status: params.status,
    pauseReason: params.pauseReason,
    imageUrl: params.imageUrl,
    displayOrder: params.displayOrder,
    requiresStockLink: params.requiresStockLink,
  };

  const result = await updateMenuItem(ctx, input);

  return ok({
    menuItemId: result.menuItemId,
    menuCategoryId: result.menuCategoryId,
    name: result.name,
    description: result.description,
    price: result.price,
    status: result.status,
    pausedAt: result.pausedAt,
    pauseReason: result.pauseReason,
    imageUrl: result.imageUrl,
    displayOrder: result.displayOrder,
    requiresStockLink: result.requiresStockLink,
    updatedAt: result.updatedAt,
  });
};

export const routes: ControllerRoute[] = [
  { key: 'cafeFlow.menuManagement.listMenuItems', handler: menuManagementListMenuItemsHandler },
  { key: 'cafeFlow.menuManagement.createMenuItemCmd', handler: menuManagementCreateMenuItemCmdHandler },
  { key: 'cafeFlow.menuManagement.updateMenuItemCmd', handler: menuManagementUpdateMenuItemCmdHandler },
];
