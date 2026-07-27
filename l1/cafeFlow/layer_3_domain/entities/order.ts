/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/order.ts" enhancement="_blank"/>
export type OrderType = 'table' | 'takeout';

export type OrderStatus =
  | 'registered'
  | 'confirmed'
  | 'inPreparation'
  | 'ready'
  | 'served'
  | 'cancelled';

export type OrderItemStatus =
  | 'pending'
  | 'sentToKitchen'
  | 'inPreparation'
  | 'ready'
  | 'cancelled';

export type OrderPaymentMethod =
  | 'cash'
  | 'pix'
  | 'creditCard'
  | 'debitCard'
  | 'mixed';

export type OrderPaymentStatus = 'open' | 'closed' | 'voided';

export interface OrderItem {
  orderItemId: string;
  orderId: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  observations: string | null;
  status: OrderItemStatus;
  sentToKitchenAt: string | null;
  startedPreparationAt: string | null;
  readyAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface OrderPayment {
  orderPaymentId: string;
  orderId: string;
  totalAmount: number;
  paymentMethod: OrderPaymentMethod;
  status: OrderPaymentStatus;
  paidAt: string | null;
  closedAt: string | null;
  voidedAt: string | null;
  voidReason: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  orderId: string;
  dailyShiftId: string;
  orderType: OrderType;
  tableNumber: string | null;
  customerName: string | null;
  totalAmount: number;
  notes: string | null;
  status: OrderStatus;
  registeredAt: string;
  confirmedAt: string | null;
  inPreparationAt: string | null;
  readyAt: string | null;
  servedAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  items: OrderItem[];
  payment: OrderPayment | null;
  createdAt: string;
  updatedAt: string;
}

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  registered: ['confirmed', 'cancelled'],
  confirmed: ['inPreparation', 'cancelled'],
  inPreparation: ['ready', 'cancelled'],
  ready: ['served', 'cancelled'],
  served: [],
  cancelled: [],
};

export const ORDER_ITEM_STATUS_TRANSITIONS: Record<OrderItemStatus, OrderItemStatus[]> = {
  pending: ['sentToKitchen'],
  sentToKitchen: ['inPreparation', 'cancelled'],
  inPreparation: ['ready', 'cancelled'],
  ready: [],
  cancelled: [],
};

export const ORDER_PAYMENT_STATUS_TRANSITIONS: Record<OrderPaymentStatus, OrderPaymentStatus[]> = {
  open: ['closed', 'voided'],
  closed: [],
  voided: [],
};

export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  return ORDER_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function canTransitionOrderItem(from: OrderItemStatus, to: OrderItemStatus): boolean {
  return ORDER_ITEM_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function canTransitionOrderPayment(
  from: OrderPaymentStatus,
  to: OrderPaymentStatus,
): boolean {
  return ORDER_PAYMENT_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function orderRequiresItem(order: Pick<Order, 'items'>): boolean {
  return order.items.length > 0;
}

export function recomputeOrderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}

export function computeOrderItemSubtotal(quantity: number, unitPrice: number): number {
  return quantity * unitPrice;
}

export function orderRequiresTableNumber(order: Pick<Order, 'orderType' | 'tableNumber'>): boolean {
  if (order.orderType !== 'table') return true;
  return typeof order.tableNumber === 'string' && order.tableNumber.trim().length > 0;
}

export function orderRequiresCustomerName(
  order: Pick<Order, 'orderType' | 'customerName'>,
): boolean {
  if (order.orderType !== 'takeout') return true;
  return typeof order.customerName === 'string' && order.customerName.trim().length > 0;
}

export function isValidOrderItemQuantity(quantity: number): boolean {
  return quantity > 0;
}

export function isValidOrderItemUnitPrice(unitPrice: number): boolean {
  return unitPrice >= 0;
}

export function isValidOrderItemSubtotal(
  item: Pick<OrderItem, 'quantity' | 'unitPrice' | 'subtotal'>,
): boolean {
  return item.subtotal >= 0 && item.subtotal === computeOrderItemSubtotal(item.quantity, item.unitPrice);
}

export function isValidOrderTotal(
  order: Pick<Order, 'totalAmount' | 'items'>,
): boolean {
  return order.totalAmount >= 0 && order.totalAmount === recomputeOrderTotal(order.items);
}

export function paymentMatchesOrderTotal(
  order: Pick<Order, 'totalAmount'>,
  payment: Pick<OrderPayment, 'totalAmount'>,
): boolean {
  return payment.totalAmount >= 0 && payment.totalAmount === order.totalAmount;
}

export function paymentMayCloseForOrder(order: Pick<Order, 'status'>): boolean {
  return order.status === 'served';
}
