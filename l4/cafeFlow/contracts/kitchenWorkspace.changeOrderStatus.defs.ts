/// <mls fileReference="_102051_/l4/cafeFlow/contracts/kitchenWorkspace.changeOrderStatus.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/kitchenWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall changeOrderStatus (command); Output kind=object; route cafeFlow.kitchenWorkspace.changeOrderStatus.

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
