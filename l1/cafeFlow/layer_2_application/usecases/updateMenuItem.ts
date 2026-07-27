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
  menuCategoryId?: string;
  description?: string | null;
  price?: number;
  status?: string;
  pausedAt?: string | null;
  pauseReason?: string | null;
  imageUrl?: string | null;
  displayOrder?: number | null;
  requiresStockLink?: boolean;
  updatedAt?: string;
  createdAt?: string;
  [key: string]: unknown;
}

export async function updateMenuItem(
  ctx: RequestContext,
  input: UpdateMenuItemInput,
): Promise<UpdateMenuItemOutput> {
  const existing = await ctx.mdm.entity.get({ mdmId: input.menuItemId });

  if (!input.menuCategoryId.trim() || !(input.price > 0)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'menuItemNeedsCategoryAndPrice: o item precisa de categoria e preço maior que zero.',
      400,
      { ruleId: 'menuItemNeedsCategoryAndPrice' },
    );
  }

  await ctx.mdm.entity.get({ mdmId: input.menuCategoryId });

  const now = ctx.clock.nowIso();

  if (input.status !== 'active' && input.status !== 'paused') {
    throw new AppError(
      'VALIDATION_ERROR',
      'onlyActiveMenuItemsCanBeOrdered: status deve ser active ou paused.',
      400,
      { ruleId: 'onlyActiveMenuItemsCanBeOrdered' },
    );
  }

  let pausedAt: string | null = null;
  let pauseReason: string | null = null;
  if (input.status === 'paused') {
    // rule: onlyActiveMenuItemsCanBeOrdered
    pausedAt = now;
    pauseReason = input.pauseReason ?? null;
  } else {
    // rule: onlyActiveMenuItemsCanBeOrdered — clear pause so item is orderable again
    pausedAt = null;
    pauseReason = null;
  }

  const existingDetails = existing.details as unknown as Record<string, unknown>;
  const existingCafeFlow = (existingDetails.cafeFlow ?? {}) as CafeFlowMenuItemDetails;

  const nextCafeFlow: CafeFlowMenuItemDetails = {
    ...existingCafeFlow,
    menuCategoryId: input.menuCategoryId,
    description:
      input.description !== undefined ? input.description : (existingCafeFlow.description ?? null),
    price: input.price,
    status: input.status,
    pausedAt,
    pauseReason,
    imageUrl: input.imageUrl !== undefined ? input.imageUrl : (existingCafeFlow.imageUrl ?? null),
    displayOrder:
      input.displayOrder !== undefined ? input.displayOrder : (existingCafeFlow.displayOrder ?? null),
    requiresStockLink: input.requiresStockLink,
    updatedAt: now,
  };

  const updated = await ctx.mdm.entity.update({
    mdmId: input.menuItemId,
    expectedVersion: existing.version,
    patch: {
      name: input.name,
      cafeFlow: nextCafeFlow,
    } as unknown as Partial<typeof existing.details>,
  });

  const cafeFlow = ((updated.details as unknown as Record<string, unknown>).cafeFlow ??
    nextCafeFlow) as CafeFlowMenuItemDetails;

  const description =
    cafeFlow.description === null || cafeFlow.description === undefined
      ? undefined
      : String(cafeFlow.description);
  const outPausedAt =
    cafeFlow.pausedAt === null || cafeFlow.pausedAt === undefined
      ? undefined
      : String(cafeFlow.pausedAt);
  const outPauseReason =
    cafeFlow.pauseReason === null || cafeFlow.pauseReason === undefined
      ? undefined
      : String(cafeFlow.pauseReason);
  const outImageUrl =
    cafeFlow.imageUrl === null || cafeFlow.imageUrl === undefined
      ? undefined
      : String(cafeFlow.imageUrl);
  const outDisplayOrder =
    cafeFlow.displayOrder === null || cafeFlow.displayOrder === undefined
      ? undefined
      : Number(cafeFlow.displayOrder);

  return {
    menuItemId: updated.mdmId,
    menuCategoryId: String(cafeFlow.menuCategoryId ?? input.menuCategoryId),
    name: updated.details.name,
    description,
    price: Number(cafeFlow.price ?? input.price),
    status: String(cafeFlow.status ?? input.status),
    pausedAt: outPausedAt,
    pauseReason: outPauseReason,
    imageUrl: outImageUrl,
    displayOrder: outDisplayOrder,
    requiresStockLink: Boolean(cafeFlow.requiresStockLink ?? input.requiresStockLink),
    updatedAt: String(cafeFlow.updatedAt ?? now),
  };
}
