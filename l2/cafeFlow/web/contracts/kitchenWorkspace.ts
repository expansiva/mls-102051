/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/kitchenWorkspace.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace kitchenWorkspace; one contract file per workspace, all bffCalls).

// bffCall fetchKitchenQueue (query) — Output kind=array; route cafeFlow.kitchenWorkspace.fetchKitchenQueue.
export interface FetchKitchenQueueInput {
  dailyShiftId: string;
}
export interface FetchKitchenQueueOutput {
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
export const fetchKitchenQueueRoute = 'cafeFlow.kitchenWorkspace.fetchKitchenQueue' as const;

// bffCall changeOrderStatus (command) — Output kind=object; route cafeFlow.kitchenWorkspace.changeOrderStatus.
export interface ChangeOrderStatusInput {
  orderId: string;
  status: string;
  cancellationReason?: string;
  updatedAt: string;
}
export interface ChangeOrderStatusOutput {
  orderId: string;
  status: string;
  confirmedAt: string;
  inPreparationAt: string;
  readyAt: string;
  servedAt: string;
  cancelledAt: string;
  cancellationReason: string;
  updatedAt: string;
}
export const changeOrderStatusRoute = 'cafeFlow.kitchenWorkspace.changeOrderStatus' as const;
