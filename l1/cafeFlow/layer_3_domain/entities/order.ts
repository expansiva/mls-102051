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

export type OrderPaymentMethod = 'cash' | 'pix' | 'creditCard' | 'debitCard' | 'mixed';

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

export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  return ORDER_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function orderRequiresItem(order: Pick<Order, 'items'>): boolean {
  return order.items.length > 0;
}

export function recomputeOrderTotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => sum + item.subtotal, 0);
}

export function orderTotalMatchesItems(order: Pick<Order, 'totalAmount' | 'items'>): boolean {
  return order.totalAmount === recomputeOrderTotal(order.items);
}

export function orderRequiresTableNumber(order: Pick<Order, 'orderType' | 'tableNumber'>): boolean {
  if (order.orderType !== 'table') {
    return true;
  }
  return order.tableNumber !== null && order.tableNumber.trim().length > 0;
}

export function orderRequiresCustomerName(order: Pick<Order, 'orderType' | 'customerName'>): boolean {
  if (order.orderType !== 'takeout') {
    return true;
  }
  return order.customerName !== null && order.customerName.trim().length > 0;
}

export function orderTerminalTimestampsExclusive(
  order: Pick<Order, 'servedAt' | 'cancelledAt'>,
): boolean {
  return !(order.servedAt !== null && order.cancelledAt !== null);
}

const ORDER_STATUS_RANK: Record<OrderStatus, number> = {
  registered: 0,
  confirmed: 1,
  inPreparation: 2,
  ready: 3,
  served: 4,
  cancelled: -1,
};

export function orderHasRequiredLifecycleTimestamps(
  order: Pick<
    Order,
    | 'status'
    | 'confirmedAt'
    | 'inPreparationAt'
    | 'readyAt'
    | 'servedAt'
    | 'cancelledAt'
    | 'cancellationReason'
  >,
): boolean {
  if (order.status === 'cancelled') {
    return order.cancelledAt !== null && order.cancellationReason !== null;
  }
  const rank = ORDER_STATUS_RANK[order.status];
  if (rank >= ORDER_STATUS_RANK.confirmed && order.confirmedAt === null) {
    return false;
  }
  if (rank >= ORDER_STATUS_RANK.inPreparation && order.inPreparationAt === null) {
    return false;
  }
  if (rank >= ORDER_STATUS_RANK.ready && order.readyAt === null) {
    return false;
  }
  if (order.status === 'served' && order.servedAt === null) {
    return false;
  }
  return true;
}

export function orderLifecycleTimestampsOrdered(
  order: Pick<
    Order,
    | 'registeredAt'
    | 'confirmedAt'
    | 'inPreparationAt'
    | 'readyAt'
    | 'servedAt'
    | 'createdAt'
    | 'updatedAt'
  >,
): boolean {
  if (order.updatedAt < order.createdAt) {
    return false;
  }
  if (order.confirmedAt !== null && order.confirmedAt < order.registeredAt) {
    return false;
  }
  if (
    order.inPreparationAt !== null &&
    order.confirmedAt !== null &&
    order.inPreparationAt < order.confirmedAt
  ) {
    return false;
  }
  if (
    order.readyAt !== null &&
    order.inPreparationAt !== null &&
    order.readyAt < order.inPreparationAt
  ) {
    return false;
  }
  if (order.servedAt !== null && order.readyAt !== null && order.servedAt < order.readyAt) {
    return false;
  }
  return true;
}

export function orderItemSubtotalMatches(item: Pick<OrderItem, 'quantity' | 'unitPrice' | 'subtotal'>): boolean {
  return item.subtotal === item.quantity * item.unitPrice;
}

export function orderItemQuantityPositive(item: Pick<OrderItem, 'quantity'>): boolean {
  return item.quantity > 0;
}
