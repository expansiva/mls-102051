/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createMenuItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface CreateMenuItemInput {
  menuCategoryId: string;
  name: string;
  description?: string;
  price: number;
  status?: string;
  imageUrl?: string;
  displayOrder?: number;
  requiresStockLink: boolean;
}

export interface CreateMenuItemOutput {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description?: string;
  price: number;
  status: string;
  imageUrl?: string;
  displayOrder?: number;
  requiresStockLink: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function createMenuItem(
  ctx: RequestContext,
  input: CreateMenuItemInput,
): Promise<CreateMenuItemOutput> {
  const now = ctx.clock.nowIso();

  if (!input.menuCategoryId?.trim() || !(input.price > 0)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'menuItemNeedsCategoryAndPrice: o item de cardápio precisa de categoria e preço maior que zero.',
      400,
      { ruleId: 'menuItemNeedsCategoryAndPrice' },
    );
  }

  try {
    await ctx.mdm.entity.get({ mdmId: input.menuCategoryId });
  } catch (err) {
    if (err instanceof AppError && err.code === 'NOT_FOUND') {
      throw new AppError(
        'VALIDATION_ERROR',
        'menuItemNeedsCategoryAndPrice: menuCategoryId must reference an existing MenuCategory.',
        400,
        { ruleId: 'menuItemNeedsCategoryAndPrice', menuCategoryId: input.menuCategoryId },
      );
    }
    throw err;
  }

  // rule: onlyActiveMenuItemsCanBeOrdered — active items are orderable; paused are not available for new POS launches
  const status = input.status ?? 'active';
  if (status !== 'active' && status !== 'paused') {
    throw new AppError(
      'VALIDATION_ERROR',
      'onlyActiveMenuItemsCanBeOrdered: status must be active or paused.',
      400,
      { ruleId: 'onlyActiveMenuItemsCanBeOrdered' },
    );
  }

  const created = await ctx.mdm.entity.create({
    details: {
      subtype: 'Product',
      name: input.name,
      status: 'Active',
      moduleTypes: ['cafeFlow.MenuItem'],
      tags: ['cafeFlow', 'cafeFlow.MenuItem'],
      cafeFlow: {
        menuCategoryId: input.menuCategoryId,
        description: input.description ?? null,
        price: input.price,
        status,
        imageUrl: input.imageUrl ?? null,
        displayOrder: input.displayOrder ?? null,
        requiresStockLink: input.requiresStockLink,
        createdAt: now,
        updatedAt: now,
      },
    },
  });

  const moduleDetails = (created.details as unknown as {
    cafeFlow?: {
      menuCategoryId?: string;
      description?: string | null;
      price?: number;
      status?: string;
      imageUrl?: string | null;
      displayOrder?: number | null;
      requiresStockLink?: boolean;
      createdAt?: string;
      updatedAt?: string;
    };
  }).cafeFlow;

  const description = moduleDetails?.description ?? input.description ?? undefined;
  const imageUrl = moduleDetails?.imageUrl ?? input.imageUrl ?? undefined;
  const displayOrder = moduleDetails?.displayOrder ?? input.displayOrder ?? undefined;

  return {
    menuItemId: created.mdmId,
    menuCategoryId: moduleDetails?.menuCategoryId ?? input.menuCategoryId,
    name: created.details.name ?? input.name,
    ...(description !== undefined && description !== null ? { description } : {}),
    price: moduleDetails?.price ?? input.price,
    status: moduleDetails?.status ?? status,
    ...(imageUrl !== undefined && imageUrl !== null ? { imageUrl } : {}),
    ...(displayOrder !== undefined && displayOrder !== null ? { displayOrder } : {}),
    requiresStockLink: moduleDetails?.requiresStockLink ?? input.requiresStockLink,
    createdAt: moduleDetails?.createdAt ?? created.index.createdAt ?? now,
    updatedAt: moduleDetails?.updatedAt ?? created.index.updatedAt ?? now,
  };
}
