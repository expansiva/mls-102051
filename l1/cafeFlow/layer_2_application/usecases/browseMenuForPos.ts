/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuForPos.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface BrowseMenuForPosInput {
  menuCategoryId?: string;
}

export interface BrowseMenuForPosMenuItem {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description?: string | null;
  price: number;
  status: string;
  imageUrl?: string | null;
  displayOrder?: number | null;
}

export interface BrowseMenuForPosOutput {
  menuItems: BrowseMenuForPosMenuItem[];
}

function readModuleDetails(details: unknown): Record<string, unknown> {
  const root = (details ?? {}) as unknown as Record<string, unknown>;
  const nested = root.cafeFlow;
  if (nested && typeof nested === 'object') {
    return nested as Record<string, unknown>;
  }
  return root;
}

function asOptionalString(value: unknown): string | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  return String(value);
}

function asOptionalNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }
  const n = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(n) ? n : null;
}

export async function browseMenuForPos(
  ctx: RequestContext,
  input: BrowseMenuForPosInput,
): Promise<BrowseMenuForPosOutput> {
  const listed = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.MenuItem',
    status: 'Active',
  });
  const mdmIds = listed.items.map((item) => item.mdmId);
  const entities = await ctx.mdm.collection.getMany({ mdmIds });

  const menuItems: BrowseMenuForPosMenuItem[] = [];

  for (const entity of entities) {
    const details = entity.details as unknown as Record<string, unknown>;
    const moduleDetails = readModuleDetails(entity.details);

    const name = asOptionalString(details.name) ?? asOptionalString(moduleDetails.name) ?? '';
    const menuCategoryId =
      asOptionalString(moduleDetails.menuCategoryId) ?? asOptionalString(details.menuCategoryId);
    const price = asOptionalNumber(moduleDetails.price) ?? asOptionalNumber(details.price);
    const status =
      asOptionalString(moduleDetails.status) ?? asOptionalString(details.status) ?? '';
    const description =
      asOptionalString(moduleDetails.description) ?? asOptionalString(details.description);
    const imageUrl = asOptionalString(moduleDetails.imageUrl) ?? asOptionalString(details.imageUrl);
    const displayOrder =
      asOptionalNumber(moduleDetails.displayOrder) ?? asOptionalNumber(details.displayOrder);

    // rule: onlyActiveMenuItemsCanBeOrdered
    if (status !== 'active') {
      continue;
    }

    // rule: menuItemNeedsCategoryAndPrice
    if (!menuCategoryId || price === null) {
      continue;
    }

    if (input.menuCategoryId && menuCategoryId !== input.menuCategoryId) {
      continue;
    }

    menuItems.push({
      menuItemId: entity.mdmId,
      menuCategoryId,
      name,
      description,
      price,
      status,
      imageUrl,
      displayOrder,
    });
  }

  menuItems.sort((a, b) => {
    const orderA = a.displayOrder ?? Number.MAX_SAFE_INTEGER;
    const orderB = b.displayOrder ?? Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.name.localeCompare(b.name);
  });

  return { menuItems };
}
