/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace posWorkspace; one contract file per workspace, all bffCalls).

// bffCall queryOpenOrders (query) — Output kind=paginated; route cafeFlow.posWorkspace.queryOpenOrders.
export interface QueryOpenOrdersInput {
  dailyShiftId: string;
  status?: string;
  orderType?: string;
  tableNumber?: string;
  page?: number;
  pageSize?: number;
}
export interface QueryOpenOrdersOutput {
  orders: { orderId: string; dailyShiftId: string; orderType: string; tableNumber: string; customerName: string; totalAmount: string; status: string; notes: string; registeredAt: string; confirmedAt: string; inPreparationAt: string; readyAt: string }[];
  total: number;
}
export const queryOpenOrdersRoute = 'cafeFlow.posWorkspace.queryOpenOrders' as const;

// bffCall queryMenuItems (query) — Output kind=array; route cafeFlow.posWorkspace.queryMenuItems.
export interface QueryMenuItemsInput {
  menuCategoryId?: string;
}
export interface QueryMenuItemsOutput {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description: string;
  price: string;
  status: string;
  imageUrl: string;
  displayOrder: string;
}
export const queryMenuItemsRoute = 'cafeFlow.posWorkspace.queryMenuItems' as const;

// bffCall cmdCreateOrder (command) — Output kind=object; route cafeFlow.posWorkspace.cmdCreateOrder.
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
  items: { orderItemId: string; menuItemId: string; menuItemName: string; quantity: string; unitPrice: string; subtotal: string; observations: string; status: string }[];
}
export const cmdCreateOrderRoute = 'cafeFlow.posWorkspace.cmdCreateOrder' as const;

// bffCall cmdUpdateOrderStatus (command) — Output kind=object; route cafeFlow.posWorkspace.cmdUpdateOrderStatus.
export interface CmdUpdateOrderStatusInput {
  orderId: string;
  status: string;
  cancellationReason?: string;
}
export interface CmdUpdateOrderStatusOutput {}
export const cmdUpdateOrderStatusRoute = 'cafeFlow.posWorkspace.cmdUpdateOrderStatus' as const;

// bffCall cmdRecordBasicPayment (command) — Output kind=object; route cafeFlow.posWorkspace.cmdRecordBasicPayment.
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
