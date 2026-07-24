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
  description?: string;
  price: number;
  status: string;
  pausedAt?: string;
  pauseReason?: string;
  imageUrl?: string;
  displayOrder?: number;
  requiresStockLink: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BrowseMenuItemsOutput {
  menuItems: BrowseMenuItemRow[];
  total: number;
}

interface MenuItemDetails {
  menuItemId?: string;
  menuCategoryId?: string | null;
  name?: string;
  description?: string | null;
  price?: number | null;
  status?: string;
  pausedAt?: string | null;
  pauseReason?: string | null;
  imageUrl?: string | null;
  displayOrder?: number | null;
  requiresStockLink?: boolean;
  cafeFlow?: {
    menuItemId?: string;
    menuCategoryId?: string | null;
    name?: string;
    description?: string | null;
    price?: number | null;
    status?: string;
    pausedAt?: string | null;
    pauseReason?: string | null;
    imageUrl?: string | null;
    displayOrder?: number | null;
    requiresStockLink?: boolean;
  };
}

interface MenuCategoryDetails {
  name?: string;
  cafeFlow?: {
    name?: string;
  };
}

function readMenuItemFields(details: Record<string, unknown>, mdmId: string): {
  menuItemId: string;
  menuCategoryId: string | null;
  name: string;
  description: string | null;
  price: number | null;
  status: string;
  pausedAt: string | null;
  pauseReason: string | null;
  imageUrl: string | null;
  displayOrder: number | null;
  requiresStockLink: boolean;
} {
  const typed = details as unknown as MenuItemDetails;
  const nested = typed.cafeFlow ?? {};
  return {
    menuItemId: nested.menuItemId ?? typed.menuItemId ?? mdmId,
    menuCategoryId: (nested.menuCategoryId ?? typed.menuCategoryId ?? null) as string | null,
    name: String(nested.name ?? typed.name ?? details['name'] ?? ''),
    description: (nested.description ?? typed.description ?? null) as string | null,
    price: (nested.price ?? typed.price ?? null) as number | null,
    status: String(nested.status ?? typed.status ?? 'active'),
    pausedAt: (nested.pausedAt ?? typed.pausedAt ?? null) as string | null,
    pauseReason: (nested.pauseReason ?? typed.pauseReason ?? null) as string | null,
    imageUrl: (nested.imageUrl ?? typed.imageUrl ?? null) as string | null,
    displayOrder: (nested.displayOrder ?? typed.displayOrder ?? null) as number | null,
    requiresStockLink: Boolean(nested.requiresStockLink ?? typed.requiresStockLink ?? false),
  };
}

function readCategoryName(details: Record<string, unknown>, fallbackName: string): string {
  const typed = details as unknown as MenuCategoryDetails;
  const nested = typed.cafeFlow ?? {};
  return String(nested.name ?? typed.name ?? details['name'] ?? fallbackName);
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

  const nameFilter = input.name?.trim().toLowerCase() ?? '';
  const statusFilter = input.status?.trim();
  const categoryFilter = input.menuCategoryId?.trim();

  const filtered = entities
    .map((entity) => {
      const details = entity.details as unknown as Record<string, unknown>;
      const fields = readMenuItemFields(details, entity.mdmId);
      return { entity, fields };
    })
    .filter(({ fields }) => {
      // rule: menuItemNeedsCategoryAndPrice — only well-formed items with category and price are order-ready
      if (!fields.menuCategoryId || fields.price === null || fields.price === undefined || Number.isNaN(Number(fields.price))) {
        return false;
      }
      // rule: onlyActiveMenuItemsCanBeOrdered — managerial browse keeps paused items visible; filter only when caller asks
      if (statusFilter && String(fields.status) !== statusFilter) {
        return false;
      }
      if (categoryFilter && fields.menuCategoryId !== categoryFilter) {
        return false;
      }
      if (nameFilter && !fields.name.toLowerCase().includes(nameFilter)) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      const orderA = a.fields.displayOrder ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.fields.displayOrder ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      return a.fields.name.localeCompare(b.fields.name, undefined, { sensitivity: 'base' });
    });

  const total = filtered.length;
  const page = Math.max(1, input.page ?? 1);
  const pageSize = Math.max(1, input.pageSize ?? 50);
  const offset = (page - 1) * pageSize;
  const pageSlice = filtered.slice(offset, offset + pageSize);

  const categoryIds = [
    ...new Set(
      pageSlice
        .map((row) => row.fields.menuCategoryId)
        .filter((id): id is string => typeof id === 'string' && id.length > 0),
    ),
  ];
  const categories = await ctx.mdm.collection.getMany({ mdmIds: categoryIds });
  const categoryNameById = new Map<string, string>();
  for (const category of categories) {
    const details = category.details as unknown as Record<string, unknown>;
    categoryNameById.set(
      category.mdmId,
      readCategoryName(details, category.index.name ?? category.mdmId),
    );
  }

  const menuItems: BrowseMenuItemRow[] = pageSlice.map(({ entity, fields }) => {
    const row: BrowseMenuItemRow = {
      menuItemId: fields.menuItemId,
      menuCategoryId: fields.menuCategoryId as string,
      categoryName: categoryNameById.get(fields.menuCategoryId as string) ?? '',
      name: fields.name,
      price: Number(fields.price),
      status: fields.status,
      requiresStockLink: fields.requiresStockLink,
      createdAt: entity.index.createdAt,
      updatedAt: entity.index.updatedAt,
    };
    if (fields.description != null) {
      row.description = fields.description;
    }
    if (fields.pausedAt != null) {
      row.pausedAt = fields.pausedAt;
    }
    if (fields.pauseReason != null) {
      row.pauseReason = fields.pauseReason;
    }
    if (fields.imageUrl != null) {
      row.imageUrl = fields.imageUrl;
    }
    if (fields.displayOrder != null) {
      row.displayOrder = fields.displayOrder;
    }
    return row;
  });

  return { menuItems, total };
}
