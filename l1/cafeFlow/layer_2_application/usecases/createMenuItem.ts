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

  // rule: menuItemNeedsCategoryAndPrice
  if (!input.menuCategoryId || input.menuCategoryId.trim() === '') {
    throw new AppError(
      'VALIDATION_ERROR',
      'menuItemNeedsCategoryAndPrice: menuCategoryId is required.',
      400,
      { ruleId: 'menuItemNeedsCategoryAndPrice' },
    );
  }
  if (input.price == null || !Number.isFinite(input.price) || input.price <= 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'menuItemNeedsCategoryAndPrice: price must be a finite number greater than 0.',
      400,
      { ruleId: 'menuItemNeedsCategoryAndPrice' },
    );
  }

  // rule: onlyActiveMenuItemsCanBeOrdered — paused items are not orderable at POS
  let status: string;
  if (input.status == null || String(input.status).trim() === '') {
    status = 'active';
  } else if (input.status === 'active' || input.status === 'paused') {
    status = input.status;
  } else {
    throw new AppError(
      'VALIDATION_ERROR',
      "onlyActiveMenuItemsCanBeOrdered: status must be 'active' or 'paused'.",
      400,
      { ruleId: 'onlyActiveMenuItemsCanBeOrdered' },
    );
  }

  await ctx.mdm.entity.get({ mdmId: input.menuCategoryId });

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

  const moduleDetails = (
    created.details as unknown as {
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
    }
  ).cafeFlow;

  const output: CreateMenuItemOutput = {
    menuItemId: created.mdmId,
    menuCategoryId: moduleDetails?.menuCategoryId ?? input.menuCategoryId,
    name: created.details.name ?? input.name,
    price: moduleDetails?.price ?? input.price,
    status: moduleDetails?.status ?? status,
    requiresStockLink: moduleDetails?.requiresStockLink ?? input.requiresStockLink,
    createdAt: moduleDetails?.createdAt ?? created.index.createdAt ?? now,
    updatedAt: moduleDetails?.updatedAt ?? created.index.updatedAt ?? now,
  };

  const description = moduleDetails?.description ?? input.description;
  if (description != null && description !== '') {
    output.description = description;
  }
  const imageUrl = moduleDetails?.imageUrl ?? input.imageUrl;
  if (imageUrl != null && imageUrl !== '') {
    output.imageUrl = imageUrl;
  }
  const displayOrder = moduleDetails?.displayOrder ?? input.displayOrder;
  if (displayOrder != null) {
    output.displayOrder = displayOrder;
  }

  return output;
}
