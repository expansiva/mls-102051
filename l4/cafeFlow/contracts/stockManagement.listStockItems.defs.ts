/// <mls fileReference="_102051_/l4/cafeFlow/contracts/stockManagement.listStockItems.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/stockManagement.defs.ts — DO NOT EDIT.
// Contract of record: bffCall listStockItems (query); Output kind=paginated; route cafeFlow.stockManagement.listStockItems.

export interface ListStockItemsInput {
  nameFilter?: string;
  lowStockOnly?: boolean;
  page?: number;
  pageSize?: number;
}

export interface ListStockItemsStockItemsItem {
  stockItemId: string;
  name: string;
  unit: string;
  currentBalance: number;
  minimumLevel: number;
  isLowStock: boolean;
  description: string;
  updatedAt: string;
}

export interface ListStockItemsOutput {
  stockItems: ListStockItemsStockItemsItem[];
  total: number;
}

export const listStockItemsRoute = 'cafeFlow.stockManagement.listStockItems' as const;
