/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface BrowseStockItemsInput {
  nameFilter?: string;
  lowStockOnly?: boolean;
  page?: number;
  pageSize?: number;
}

export interface BrowseStockItemRow {
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
  stockItems: BrowseStockItemRow[];
  total: number;
}

interface StockItemModuleDetails {
  unit?: string;
  currentBalance?: number;
  minimumLevel?: number;
  description?: string | null;
  updatedAt?: string;
}

export async function browseStockItems(
  ctx: RequestContext,
  input: BrowseStockItemsInput,
): Promise<BrowseStockItemsOutput> {
  const listed = await ctx.mdm.collection.listByType({
    type: 'cafeFlow.StockItem',
    page: 1,
    pageSize: 10_000,
    sort: { field: 'name', direction: 'asc' },
  });

  const entities = await ctx.mdm.collection.getMany({
    mdmIds: listed.items.map((item) => item.mdmId),
  });

  const nameFilter = input.nameFilter?.trim().toLowerCase() ?? '';

  let stockItems: BrowseStockItemRow[] = entities.map((entity) => {
    const details = entity.details as unknown as Record<string, unknown>;
    const moduleDetails = ((details.cafeFlow as StockItemModuleDetails | undefined) ??
      (details as unknown as StockItemModuleDetails)) as StockItemModuleDetails;

    const name = String(entity.details.name ?? entity.index.name ?? '');
    const unit = String(moduleDetails.unit ?? '');
    const currentBalance = Number(moduleDetails.currentBalance ?? 0);
    const minimumLevel = Number(moduleDetails.minimumLevel ?? 0);
    const rawDescription = moduleDetails.description;
    const description =
      rawDescription == null || String(rawDescription).trim() === ''
        ? undefined
        : String(rawDescription);
    const updatedAt = String(moduleDetails.updatedAt ?? entity.index.updatedAt ?? '');

    // rule: lowStockMustBeVisible — currentBalance <= minimumLevel must be flagged for the UI
    const isLowStock = currentBalance <= minimumLevel;

    const row: BrowseStockItemRow = {
      stockItemId: entity.mdmId,
      name,
      unit,
      currentBalance,
      minimumLevel,
      updatedAt,
      isLowStock,
    };
    if (description !== undefined) {
      row.description = description;
    }
    return row;
  });

  if (nameFilter.length > 0) {
    stockItems = stockItems.filter((item) => item.name.toLowerCase().includes(nameFilter));
  }

  if (input.lowStockOnly === true) {
    // rule: lowStockMustBeVisible
    stockItems = stockItems.filter((item) => item.isLowStock);
  }

  stockItems.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));

  const total = stockItems.length;

  if (input.page != null || input.pageSize != null) {
    const page = Math.max(1, input.page ?? 1);
    const pageSize = Math.max(1, input.pageSize ?? 20);
    const offset = (page - 1) * pageSize;
    stockItems = stockItems.slice(offset, offset + pageSize);
  }

  return { stockItems, total };
}
