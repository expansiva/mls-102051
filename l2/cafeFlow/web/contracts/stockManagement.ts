/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/stockManagement.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace stockManagement; one contract file per workspace, all bffCalls).

// bffCall listStockItems (query) — Output kind=paginated; route cafeFlow.stockManagement.listStockItems.
export interface ListStockItemsInput {
  nameFilter?: string;
  lowStockOnly?: boolean;
  page?: number;
  pageSize?: number;
}
export interface ListStockItemsOutput {
  stockItems: { stockItemId: string; name: string; unit: string; currentBalance: number; minimumLevel: number; isLowStock: boolean; description: string; updatedAt: string }[];
  total: number;
}
export const listStockItemsRoute = 'cafeFlow.stockManagement.listStockItems' as const;

// bffCall addStockItem (command) — Output kind=object; route cafeFlow.stockManagement.addStockItem.
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

// bffCall editStockItem (command) — Output kind=object; route cafeFlow.stockManagement.editStockItem.
export interface EditStockItemInput {
  stockItemId: string;
  name: string;
  unit: string;
  minimumLevel: number;
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

// bffCall removeStockItem (command) — Output kind=object; route cafeFlow.stockManagement.removeStockItem.
export interface RemoveStockItemInput {
  stockItemId: string;
}
export interface RemoveStockItemOutput {
  stockItemId: string;
  name: string;
}
export const removeStockItemRoute = 'cafeFlow.stockManagement.removeStockItem' as const;

// bffCall registerStockAdjustment (command) — Output kind=object; route cafeFlow.stockManagement.registerStockAdjustment.
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
