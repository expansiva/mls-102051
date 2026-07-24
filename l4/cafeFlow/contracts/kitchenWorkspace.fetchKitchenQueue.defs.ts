/// <mls fileReference="_102051_/l4/cafeFlow/contracts/kitchenWorkspace.fetchKitchenQueue.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/kitchenWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall fetchKitchenQueue (query); Output kind=list; route cafeFlow.kitchenWorkspace.fetchKitchenQueue.

export interface FetchKitchenQueueInput {
  dailyShiftId: string;
}

export interface FetchKitchenQueueItem {
  orderId: string;
  orderType: string;
  tableNumber: string;
  customerName: string;
  notes: string;
  status: string;
  confirmedAt: string;
  inPreparationAt: string;
  items: string;
}

export type FetchKitchenQueueOutput = FetchKitchenQueueItem[];

export const fetchKitchenQueueRoute = 'cafeFlow.kitchenWorkspace.fetchKitchenQueue' as const;
