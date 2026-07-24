/// <mls fileReference="_102051_/l4/cafeFlow/contracts/posWorkspace.queryOpenOrders.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/posWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall queryOpenOrders (query); Output kind=paginated; route cafeFlow.posWorkspace.queryOpenOrders.

export interface QueryOpenOrdersInput {
  dailyShiftId: string;
  status?: string;
  orderType?: string;
  tableNumber?: string;
  page?: number;
  pageSize?: number;
}

export interface QueryOpenOrdersOrdersItem {
  orderId: string;
  dailyShiftId: string;
  orderType: string;
  tableNumber: string;
  customerName: string;
  totalAmount: number;
  status: string;
  notes: string;
  registeredAt: string;
  confirmedAt: string;
  inPreparationAt: string;
  readyAt: string;
}

export interface QueryOpenOrdersOutput {
  orders: QueryOpenOrdersOrdersItem[];
  total: number;
}

export const queryOpenOrdersRoute = 'cafeFlow.posWorkspace.queryOpenOrders' as const;
