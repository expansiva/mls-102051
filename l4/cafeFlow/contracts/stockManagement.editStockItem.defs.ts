/// <mls fileReference="_102051_/l4/cafeFlow/contracts/stockManagement.editStockItem.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/stockManagement.defs.ts — DO NOT EDIT.
// Contract of record: bffCall editStockItem (command); Output kind=object; route cafeFlow.stockManagement.editStockItem.

export interface EditStockItemInput {
  stockItemId: string;
  name?: string;
  unit?: string;
  minimumLevel?: number;
  description?: string;
}

export interface EditStockItemOutput {
  stockItemId: string;
  name: string;
  unit: string;
  currentBalance: number;
  minimumLevel: number;
  updatedAt: string;
}

export const editStockItemRoute = 'cafeFlow.stockManagement.editStockItem' as const;
