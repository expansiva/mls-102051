/// <mls fileReference="_102051_/l4/cafeFlow/contracts/posWorkspace.cmdRecordBasicPayment.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/posWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdRecordBasicPayment (command); Output kind=object; route cafeFlow.posWorkspace.cmdRecordBasicPayment.

export interface CmdRecordBasicPaymentInput {
  orderId: string;
  totalAmount: number;
  paymentMethod: string;
  notes?: string;
}

export interface CmdRecordBasicPaymentOutput {
  orderPaymentId: string;
  orderId: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  paidAt: string;
}

export const cmdRecordBasicPaymentRoute = 'cafeFlow.posWorkspace.cmdRecordBasicPayment' as const;
