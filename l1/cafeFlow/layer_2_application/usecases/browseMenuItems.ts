/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface BrowseMenuItemsInput {
  status?: string;
  menuCategoryId?: string;
  name?: string;
  page?: number;
  pageSize?: number;
}

export interface BrowseMenuItemRow {
  menuItemId: string;
  menuCategoryId: string;
  categoryName: string;
  name: string;
  description?: string | null;
  price: number;
  status: string;
  pausedAt?: string | null;
  pauseReason?: string | null;
  imageUrl?: string | null;
  displayOrder?: number | null;
  requiresStockLink: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrowseMenuItemsOutput {
  menuItems: BrowseMenuItemRow[];
  total: number;
}

interface CafeFlowMenuItemDetails {
  menuCategoryId?: string | null;
  description?: string | null;
  price?: number | null;
  status?: string | null;
  pausedAt?: string | null;
  pauseReason?: string | null;
  imageUrl?: string | null;
  displayOrder?: number | null;
  requiresStockLink?: boolean | null;
}

interface ParsedMenuItem {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description: string | null;
  price: number;
  status: string;
  pausedAt: string | null;
  pauseReason: string | null;
  imageUrl: string | null;
  displayOrder: number | null;
  requiresStockLink: boolean;
  createdAt: string;
  updatedAt: string;
}

function readCafeFlowDetails(details: unknown): CafeFlowMenuItemDetails {
  const root = (details ?? {}) as unknown as Record<string, unknown>;
  const nested = root.cafeFlow;
  if (nested && typeof nested === 'object') {
    return nested as CafeFlowMenuItemDetails;
  }
  return root as unknown as CafeFlowMenuItemDetails;
}

export async function browseMenuItems(
  ctx: RequestContext,
  input: BrowseMenuItemsInput,
): Promise<BrowseMenuItemsOutput> {
  const listed = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.MenuItem',
    page: 1,
    pageSize: 10_000,
  });

  const entities = await ctx.mdm.collection.getMany({
    mdmIds: listed.items.map((item) => item.mdmId),
  });

  const parsed: ParsedMenuItem[] = [];
  for (const entity of entities) {
    const moduleDetails = readCafeFlowDetails(entity.details);
    const menuCategoryId =
      typeof moduleDetails.menuCategoryId === 'string' ? moduleDetails.menuCategoryId.trim() : '';
    const price = moduleDetails.price;

    // rule: menuItemNeedsCategoryAndPrice — keep only items with category + numeric price
    if (
      !menuCategoryId ||
      price == null ||
      typeof price !== 'number' ||
      Number.isNaN(price)
    ) {
      continue;
    }

    const name = entity.details.name ?? entity.index.name ?? '';
    const status = String(moduleDetails.status ?? 'active');

    parsed.push({
      menuItemId: entity.mdmId,
      menuCategoryId,
      name,
      description: moduleDetails.description ?? null,
      price,
      status,
      pausedAt: moduleDetails.pausedAt ?? null,
      pauseReason: moduleDetails.pauseReason ?? null,
      imageUrl: moduleDetails.imageUrl ?? null,
      displayOrder:
        typeof moduleDetails.displayOrder === 'number' ? moduleDetails.displayOrder : null,
      requiresStockLink: Boolean(moduleDetails.requiresStockLink),
      createdAt: entity.index.createdAt,
      updatedAt: entity.index.updatedAt,
    });
  }

  let filtered = parsed;

  if (input.status != null && input.status !== '') {
    filtered = filtered.filter((item) => String(item.status) === input.status);
  }
  if (input.menuCategoryId != null && input.menuCategoryId !== '') {
    filtered = filtered.filter((item) => item.menuCategoryId === input.menuCategoryId);
  }
  if (input.name != null && input.name.trim() !== '') {
    const needle = input.name.trim().toLowerCase();
    filtered = filtered.filter((item) => item.name.toLowerCase().includes(needle));
  }

  // rule: onlyActiveMenuItemsCanBeOrdered — informational on browse; paused items stay visible
  // (POS order flows enforce active-only; this managerial list does not hide paused)

  filtered.sort((a, b) => {
    const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });

  const total = filtered.length;
  const page = input.page != null && input.page > 0 ? input.page : 1;
  const pageSize = input.pageSize != null && input.pageSize > 0 ? input.pageSize : 50;
  const offset = (page - 1) * pageSize;
  const pageItems = filtered.slice(offset, offset + pageSize);

  const categoryIds = [
    ...new Set(pageItems.map((item) => item.menuCategoryId).filter((id) => id.length > 0)),
  ];
  const categories = await ctx.mdm.collection.getMany({ mdmIds: categoryIds });
  const categoryNameById = new Map<string, string>();
  for (const category of categories) {
    categoryNameById.set(
      category.mdmId,
      category.details.name ?? category.index.name ?? '',
    );
  }

  const menuItems: BrowseMenuItemRow[] = pageItems.map((item) => ({
    menuItemId: item.menuItemId,
    menuCategoryId: item.menuCategoryId,
    categoryName: categoryNameById.get(item.menuCategoryId) ?? '',
    name: item.name,
    description: item.description,
    price: item.price,
    status: item.status,
    pausedAt: item.pausedAt,
    pauseReason: item.pauseReason,
    imageUrl: item.imageUrl,
    displayOrder: item.displayOrder,
    requiresStockLink: item.requiresStockLink,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  return { menuItems, total };
}
