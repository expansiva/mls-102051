/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/trackOrders.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { Order, OrderStatus, OrderType } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface TrackOrdersInput {
  status?: string;
  orderType?: string;
  tableNumber?: string;
  page?: number;
  pageSize?: number;
}

export interface TrackOrdersItem {
  orderItemId: string;
  menuItemName: string;
  quantity: number;
  observations?: string;
  status: string;
}

export interface TrackOrdersOrder {
  orderId: string;
  dailyShiftId: string;
  orderType: string;
  tableNumber?: string;
  customerName?: string;
  totalAmount: number;
  notes?: string;
  status: string;
  registeredAt: string;
  confirmedAt?: string;
  inPreparationAt?: string;
  readyAt?: string;
  items: TrackOrdersItem[];
}

export interface TrackOrdersOutput {
  orders: TrackOrdersOrder[];
  total: number;
}

export async function trackOrders(
  ctx: RequestContext,
  input: TrackOrdersInput,
): Promise<TrackOrdersOutput> {
  const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');
  const dailyShiftsRepo = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');

  // rule: ordersRequireOpenDailyShift
  const openShifts = await dailyShiftsRepo.list({ status: 'open' });
  const openShift = openShifts[0] ?? null;
  if (!openShift) {
    return { orders: [], total: 0 };
  }

  let orders = await ordersRepo.findByDailyShiftId(openShift.dailyShiftId);

  // rule: completedOrdersLeaveKitchenQueue — exclude served/cancelled from default open-orders list
  // unless the caller explicitly filters by those statuses
  if (!input.status) {
    orders = orders.filter((o) => o.status !== 'served' && o.status !== 'cancelled');
  }

  if (input.status) {
    orders = orders.filter((o) => String(o.status) === input.status);
  }

  if (input.orderType) {
    orders = orders.filter((o) => String(o.orderType) === input.orderType);
  }

  if (input.tableNumber) {
    orders = orders.filter((o) => o.tableNumber === input.tableNumber);
  }

  // rule: orderRequiresTableOrTakeout — keep only orders that satisfy table/takeout invariants
  orders = orders.filter((o) => {
    if (o.orderType === 'table') {
      return typeof o.tableNumber === 'string' && o.tableNumber.trim().length > 0;
    }
    if (o.orderType === 'takeout') {
      return true;
    }
    return false;
  });

  // rule: onlyReadyOrdersCanBeServed — when filtering ready, surface only ready kitchen queue
  if (input.status === 'ready') {
    orders = orders.filter((o) => o.status === 'ready');
  }

  orders = [...orders].sort((a, b) => a.registeredAt.localeCompare(b.registeredAt));

  const total = orders.length;

  const page = input.page != null && input.page > 0 ? input.page : 1;
  const pageSize =
    input.pageSize != null && input.pageSize > 0 ? input.pageSize : total > 0 ? total : 20;
  const start = (page - 1) * pageSize;
  const pageOrders = orders.slice(start, start + pageSize);

  const mapped: TrackOrdersOrder[] = pageOrders.map((order: Order) => mapOrder(order));

  return { orders: mapped, total };
}

function mapOrder(order: Order): TrackOrdersOrder {
  return {
    orderId: order.orderId,
    dailyShiftId: order.dailyShiftId,
    orderType: order.orderType as OrderType,
    tableNumber: order.tableNumber ?? undefined,
    customerName: order.customerName ?? undefined,
    totalAmount: order.totalAmount,
    notes: order.notes ?? undefined,
    status: order.status as OrderStatus,
    registeredAt: order.registeredAt,
    confirmedAt: order.confirmedAt ?? undefined,
    inPreparationAt: order.inPreparationAt ?? undefined,
    readyAt: order.readyAt ?? undefined,
    items: (order.items ?? []).map((item) => ({
      orderItemId: item.orderItemId,
      menuItemName: item.menuItemName,
      quantity: item.quantity,
      observations: item.observations ?? undefined,
      status: item.status,
    })),
  };
}
