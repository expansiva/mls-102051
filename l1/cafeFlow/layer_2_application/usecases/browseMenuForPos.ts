/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuForPos.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface BrowseMenuForPosInput {
  menuCategoryId?: string;
}

export interface BrowseMenuForPosItem {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description?: string;
  price: number;
  status: string;
  imageUrl?: string;
  displayOrder?: number;
}

export interface BrowseMenuForPosOutput {
  items: BrowseMenuForPosItem[];
}

interface MenuItemModuleDetails {
  menuCategoryId?: string | null;
  description?: string | null;
  price?: number | null;
  status?: string | null;
  imageUrl?: string | null;
  displayOrder?: number | null;
  name?: string | null;
}

function readMenuItemModuleDetails(details: unknown): MenuItemModuleDetails {
  const root = (details ?? {}) as unknown as Record<string, unknown>;
  const nested = (root.cafeFlow ?? root) as unknown as MenuItemModuleDetails;
  return nested;
}

export async function browseMenuForPos(
  ctx: RequestContext,
  input: BrowseMenuForPosInput,
): Promise<BrowseMenuForPosOutput> {
  const listed = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.MenuItem',
  });

  const mdmIds = listed.items.map((item) => item.mdmId);
  const entities = await ctx.mdm.collection.getMany({ mdmIds });

  const items: BrowseMenuForPosItem[] = [];

  for (const entity of entities) {
    const root = entity.details as unknown as Record<string, unknown>;
    const mod = readMenuItemModuleDetails(entity.details);
    const name = String(root.name ?? entity.index.name ?? mod.name ?? '');
    const menuCategoryId = mod.menuCategoryId ?? null;
    const price = mod.price;
    const status = String(mod.status ?? root.status ?? '');
    const description = mod.description ?? undefined;
    const imageUrl = mod.imageUrl ?? undefined;
    const displayOrder = typeof mod.displayOrder === 'number' ? mod.displayOrder : undefined;

    // rule: onlyActiveMenuItemsCanBeOrdered
    if (String(status).toLowerCase() !== 'active') {
      continue;
    }

    // rule: menuItemNeedsCategoryAndPrice
    if (
      menuCategoryId == null ||
      menuCategoryId === '' ||
      price == null ||
      typeof price !== 'number'
    ) {
      continue;
    }

    if (input.menuCategoryId && menuCategoryId !== input.menuCategoryId) {
      continue;
    }

    const item: BrowseMenuForPosItem = {
      menuItemId: entity.mdmId,
      menuCategoryId,
      name,
      price,
      status,
    };
    if (description != null && description !== undefined) {
      item.description = description;
    }
    if (imageUrl != null && imageUrl !== undefined) {
      item.imageUrl = imageUrl;
    }
    if (displayOrder !== undefined) {
      item.displayOrder = displayOrder;
    }
    items.push(item);
  }

  items.sort((a, b) => {
    const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });

  return { items };
}
