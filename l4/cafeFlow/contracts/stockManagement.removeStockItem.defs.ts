/// <mls fileReference="_102051_/l4/cafeFlow/contracts/stockManagement.removeStockItem.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/stockManagement.defs.ts — DO NOT EDIT.
// Contract of record: bffCall removeStockItem (command); Output kind=object; route cafeFlow.stockManagement.removeStockItem.

export interface RemoveStockItemInput {
  stockItemId: string;
}

export interface RemoveStockItemOutput {
  stockItemId: string;
  name: string;
}

export const removeStockItemRoute = 'cafeFlow.stockManagement.removeStockItem' as const;
