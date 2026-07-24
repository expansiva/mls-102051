/// <mls fileReference="_102051_/l4/cafeFlow/contracts/stockManagement.addStockItem.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/stockManagement.defs.ts — DO NOT EDIT.
// Contract of record: bffCall addStockItem (command); Output kind=object; route cafeFlow.stockManagement.addStockItem.

export interface AddStockItemInput {
  name: string;
  unit: string;
  currentBalance: number;
  minimumLevel: number;
  description?: string;
}

export interface AddStockItemOutput {
  stockItemId: string;
  name: string;
  unit: string;
  currentBalance: number;
  minimumLevel: number;
  createdAt: string;
}

export const addStockItemRoute = 'cafeFlow.stockManagement.addStockItem' as const;
