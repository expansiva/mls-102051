/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateMenuItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface UpdateMenuItemInput {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description?: string;
  price: number;
  status: string;
  pauseReason?: string;
  imageUrl?: string;
  displayOrder?: number;
  requiresStockLink: boolean;
}

export interface UpdateMenuItemOutput {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description?: string;
  price: number;
  status: string;
  pausedAt?: string;
  pauseReason?: string;
  imageUrl?: string;
  displayOrder?: number;
  requiresStockLink: boolean;
  updatedAt: string;
}

interface CafeFlowMenuItemDetails {
  menuItemId?: string;
  menuCategoryId?: string;
  description?: string | null;
  price?: number;
  status?: string;
  pausedAt?: string | null;
  pauseReason?: string | null;
  imageUrl?: string | null;
  displayOrder?: number | null;
  requiresStockLink?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export async function updateMenuItem(
  ctx: RequestContext,
  input: UpdateMenuItemInput,
): Promise<UpdateMenuItemOutput> {
  const existing = await ctx.mdm.entity.get({ mdmId: input.menuItemId });

  if (!input.menuCategoryId || typeof input.price !== 'number' || !(input.price > 0)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'menuItemNeedsCategoryAndPrice: item de cardápio precisa de categoria e preço maior que zero.',
      400,
      { ruleId: 'menuItemNeedsCategoryAndPrice' },
    );
  }

  await ctx.mdm.entity.get({ mdmId: input.menuCategoryId });

  if (input.status !== 'active' && input.status !== 'paused') {
    throw new AppError(
      'VALIDATION_ERROR',
      "status must be 'active' or 'paused'.",
      400,
      { status: input.status, ruleId: 'onlyActiveMenuItemsCanBeOrdered' },
    );
  }

  // rule: onlyActiveMenuItemsCanBeOrdered — when status is 'paused', item is unavailable for new POS orders; when 'active', it is available again.
  const now = ctx.clock.nowIso();
  const pausedAt = input.status === 'paused' ? now : null;
  const pauseReason =
    input.status === 'paused' ? (input.pauseReason ?? null) : null;

  const details = existing.details as unknown as Record<string, unknown>;
  const prevCafeFlow = (details.cafeFlow ?? {}) as unknown as CafeFlowMenuItemDetails;

  const cafeFlow: CafeFlowMenuItemDetails = {
    ...prevCafeFlow,
    menuItemId: input.menuItemId,
    menuCategoryId: input.menuCategoryId,
    description: input.description !== undefined ? input.description : (prevCafeFlow.description ?? null),
    price: input.price,
    status: input.status,
    pausedAt,
    pauseReason,
    imageUrl: input.imageUrl !== undefined ? input.imageUrl : (prevCafeFlow.imageUrl ?? null),
    displayOrder:
      input.displayOrder !== undefined
        ? input.displayOrder
        : (prevCafeFlow.displayOrder ?? null),
    requiresStockLink: input.requiresStockLink,
    updatedAt: now,
  };

  const updated = await ctx.mdm.entity.update({
    mdmId: input.menuItemId,
    expectedVersion: existing.version,
    patch: {
      name: input.name,
      cafeFlow,
    } as never,
  });

  const outDetails = updated.details as unknown as Record<string, unknown>;
  const outCafe = (outDetails.cafeFlow ?? cafeFlow) as unknown as CafeFlowMenuItemDetails;

  return {
    menuItemId: input.menuItemId,
    menuCategoryId: outCafe.menuCategoryId ?? input.menuCategoryId,
    name: updated.details.name ?? input.name,
    description: outCafe.description ?? undefined,
    price: outCafe.price ?? input.price,
    status: outCafe.status ?? input.status,
    pausedAt: outCafe.pausedAt ?? undefined,
    pauseReason: outCafe.pauseReason ?? undefined,
    imageUrl: outCafe.imageUrl ?? undefined,
    displayOrder: outCafe.displayOrder ?? undefined,
    requiresStockLink: outCafe.requiresStockLink ?? input.requiresStockLink,
    updatedAt: outCafe.updatedAt ?? now,
  };
}
