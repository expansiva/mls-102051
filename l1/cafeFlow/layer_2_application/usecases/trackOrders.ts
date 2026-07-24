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

const KITCHEN_QUEUE_EXCLUDED: ReadonlySet<string> = new Set(['served', 'cancelled']);

function mapOrderToTrackOutput(order: Order): TrackOrdersOrder {
  return {
    orderId: order.orderId,
    dailyShiftId: order.dailyShiftId,
    orderType: order.orderType,
    tableNumber: order.tableNumber ?? undefined,
    customerName: order.customerName ?? undefined,
    totalAmount: order.totalAmount,
    notes: order.notes ?? undefined,
    status: order.status,
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

export async function trackOrders(
  ctx: RequestContext,
  input: TrackOrdersInput,
): Promise<TrackOrdersOutput> {
  const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');

  // rule: ordersRequireOpenDailyShift
  const openShifts = await dailyShifts.list({ status: 'open' });
  const openShift = openShifts[0] ?? null;
  if (!openShift) {
    return { orders: [], total: 0 };
  }

  // dailyShiftId is resolved server-side from the active open shift — never from client input
  let matched = await ordersRepo.findByDailyShiftId(openShift.dailyShiftId);

  // rule: completedOrdersLeaveKitchenQueue — served/cancelled leave the open tracking queue
  matched = matched.filter((order) => !KITCHEN_QUEUE_EXCLUDED.has(String(order.status)));

  // rule: orderRequiresTableOrTakeout — table orders carry tableNumber; takeout may omit it
  // rule: onlyReadyOrdersCanBeServed — tracking surface only lists non-terminal kitchen statuses
  if (input.status !== undefined && input.status !== null && String(input.status).length > 0) {
    const statusFilter = String(input.status);
    matched = matched.filter((order) => String(order.status) === statusFilter);
  }
  if (input.orderType !== undefined && input.orderType !== null && String(input.orderType).length > 0) {
    const orderTypeFilter = String(input.orderType) as OrderType;
    matched = matched.filter((order) => String(order.orderType) === orderTypeFilter);
  }
  if (
    input.tableNumber !== undefined &&
    input.tableNumber !== null &&
    String(input.tableNumber).length > 0
  ) {
    const tableNumberFilter = String(input.tableNumber);
    matched = matched.filter((order) => (order.tableNumber ?? '') === tableNumberFilter);
  }

  matched = matched.slice().sort((a, b) => {
    if (a.registeredAt < b.registeredAt) return -1;
    if (a.registeredAt > b.registeredAt) return 1;
    return 0;
  });

  const total = matched.length;
  const page = input.page !== undefined && input.page > 0 ? input.page : 1;
  const pageSize =
    input.pageSize !== undefined && input.pageSize > 0 ? input.pageSize : total > 0 ? total : 1;
  const offset = (page - 1) * pageSize;
  const pageSlice = matched.slice(offset, offset + pageSize);

  const orders: TrackOrdersOrder[] = pageSlice.map(mapOrderToTrackOutput);

  return { orders, total };
}
