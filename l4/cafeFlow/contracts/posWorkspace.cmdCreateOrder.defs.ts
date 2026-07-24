/// <mls fileReference="_102051_/l4/cafeFlow/contracts/posWorkspace.cmdCreateOrder.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/posWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall cmdCreateOrder (command); Output kind=object; route cafeFlow.posWorkspace.cmdCreateOrder.

export interface CmdCreateOrderInput {
  orderType: string;
  tableNumber?: string;
  customerName?: string;
  notes?: string;
  menuItemId: string;
  quantity: number;
  observations?: string;
  dailyShiftId: string;
}

export interface CmdCreateOrderItemsItem {
  orderItemId: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  observations: string;
  status: string;
}

export interface CmdCreateOrderOutput {
  orderId: string;
  dailyShiftId: string;
  orderType: string;
  tableNumber: string;
  customerName: string;
  totalAmount: number;
  status: string;
  registeredAt: string;
  confirmedAt: string;
  items: CmdCreateOrderItemsItem[];
}

export const cmdCreateOrderRoute = 'cafeFlow.posWorkspace.cmdCreateOrder' as const;
