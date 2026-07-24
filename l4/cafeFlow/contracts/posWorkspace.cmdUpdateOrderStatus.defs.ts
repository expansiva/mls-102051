/// <mls fileReference="_102051_/l4/cafeFlow/contracts/posWorkspace.cmdUpdateOrderStatus.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/posWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdUpdateOrderStatus (command); Output kind=object; route cafeFlow.posWorkspace.cmdUpdateOrderStatus.

export interface CmdUpdateOrderStatusInput {
  orderId: string;
  status: string;
  cancellationReason?: string;
}

export interface CmdUpdateOrderStatusOutput {
  orderId: string;
  status: string;
  confirmedAt?: string;
  inPreparationAt?: string;
  readyAt?: string;
  servedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  updatedAt: string;
}

export const cmdUpdateOrderStatusRoute = 'cafeFlow.posWorkspace.cmdUpdateOrderStatus' as const;
