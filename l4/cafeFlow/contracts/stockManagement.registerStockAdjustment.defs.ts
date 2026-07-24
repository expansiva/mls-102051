/// <mls fileReference="_102051_/l4/cafeFlow/contracts/stockManagement.registerStockAdjustment.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/stockManagement.defs.ts — DO NOT EDIT.
// Contract of record: bffCall registerStockAdjustment (command); Output kind=object; route cafeFlow.stockManagement.registerStockAdjustment.

export interface RegisterStockAdjustmentInput {
  stockItemId: string;
  quantity: number;
  direction: string;
  reason: string;
  notes?: string;
}

export interface RegisterStockAdjustmentOutput {
  stockAdjustmentId: string;
  stockItemId: string;
  quantity: number;
  direction: string;
  reason: string;
  resultingBalance: number;
  status: string;
  createdAt: string;
}

export const registerStockAdjustmentRoute = 'cafeFlow.stockManagement.registerStockAdjustment' as const;
