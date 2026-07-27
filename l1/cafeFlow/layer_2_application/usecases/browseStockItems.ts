/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface BrowseStockItemsInput {
  nameFilter?: string;
  lowStockOnly?: boolean;
  page?: number;
  pageSize?: number;
}

export interface BrowseStockItem {
  stockItemId: string;
  name: string;
  unit: string;
  currentBalance: number;
  minimumLevel: number;
  description?: string;
  updatedAt: string;
  isLowStock: boolean;
}

export interface BrowseStockItemsOutput {
  stockItems: BrowseStockItem[];
  total: number;
}

type CafeFlowStockItemDetails = {
  stockItemId?: string;
  name?: string;
  unit?: string;
  currentBalance?: number;
  minimumLevel?: number;
  description?: string | null;
  updatedAt?: string;
};

export async function browseStockItems(
  ctx: RequestContext,
  input: BrowseStockItemsInput,
): Promise<BrowseStockItemsOutput> {
  const listed = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.StockItem',
    status: 'Active',
    sort: { field: 'name', direction: 'asc' },
  });

  const mdmIds = listed.items.map((item) => item.mdmId);
  const entities = await ctx.mdm.collection.getMany({ mdmIds });

  const nameFilter = input.nameFilter?.trim().toLowerCase() ?? '';

  let stockItems: BrowseStockItem[] = entities.map((entity) => {
    const moduleDetails = (entity.details as unknown as { cafeFlow?: CafeFlowStockItemDetails }).cafeFlow ?? {};
    const baseName = entity.details.name ?? moduleDetails.name ?? '';
    const currentBalance = Number(moduleDetails.currentBalance ?? 0);
    const minimumLevel = Number(moduleDetails.minimumLevel ?? 0);
    // rule: lowStockMustBeVisible
    const isLowStock = currentBalance <= minimumLevel;

    return {
      stockItemId: moduleDetails.stockItemId ?? entity.mdmId,
      name: baseName,
      unit: String(moduleDetails.unit ?? ''),
      currentBalance,
      minimumLevel,
      description: moduleDetails.description ?? undefined,
      updatedAt: moduleDetails.updatedAt ?? entity.index.updatedAt,
      isLowStock,
    };
  });

  if (nameFilter) {
    stockItems = stockItems.filter((item) => item.name.toLowerCase().includes(nameFilter));
  }

  if (input.lowStockOnly === true) {
    // rule: lowStockMustBeVisible
    stockItems = stockItems.filter((item) => item.isLowStock);
  }

  stockItems = stockItems.slice().sort((a, b) => a.name.localeCompare(b.name));

  const total = stockItems.length;
  const page = Math.max(1, input.page ?? 1);
  const pageSize = Math.max(1, input.pageSize ?? (total || 1));
  const offset = (page - 1) * pageSize;
  const paged = stockItems.slice(offset, offset + pageSize);

  return {
    stockItems: paged,
    total,
  };
}
