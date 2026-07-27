/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenQueue.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { Order } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export interface ViewKitchenQueueInput {}

export interface ViewKitchenQueueOrderItem {
  orderItemId: string;
  menuItemName: string;
  quantity: number;
  observations?: string | null;
  status: string;
}

export interface ViewKitchenQueueOrder {
  orderId: string;
  orderType: string;
  tableNumber?: string | null;
  customerName?: string | null;
  notes?: string | null;
  status: string;
  confirmedAt?: string | null;
  inPreparationAt?: string | null;
  items: ViewKitchenQueueOrderItem[];
}

/** Wire shape: list of kitchen-queue orders (outputShape.kind = list). */
export type ViewKitchenQueueOutput = ViewKitchenQueueOrder[];

function projectKitchenQueueOrder(order: Order): ViewKitchenQueueOrder {
  // rule: orderItemsArePrepReference
  const items: ViewKitchenQueueOrderItem[] = (order.items ?? []).map((item) => ({
    orderItemId: item.orderItemId,
    menuItemName: item.menuItemName,
    quantity: item.quantity,
    observations: item.observations ?? null,
    status: item.status,
  }));

  // rule: orderRequiresTableOrTakeout
  return {
    orderId: order.orderId,
    orderType: order.orderType,
    tableNumber: order.tableNumber ?? null,
    customerName: order.customerName ?? null,
    notes: order.notes ?? null,
    status: order.status,
    confirmedAt: order.confirmedAt ?? null,
    inPreparationAt: order.inPreparationAt ?? null,
    items,
  };
}

export async function viewKitchenQueue(
  ctx: RequestContext,
  _input: ViewKitchenQueueInput,
): Promise<ViewKitchenQueueOutput> {
  const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');
  const dailyShiftsRepo = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');

  // rule: ordersRequireOpenDailyShift
  const openShifts = await dailyShiftsRepo.list({ status: 'open' });
  const openShift = openShifts[0] ?? null;
  if (!openShift) {
    return [];
  }

  const shiftOrders = await ordersRepo.findByDailyShiftId(openShift.dailyShiftId);

  // rule: orderEntersKitchenQueueAfterAttendantConfirmation
  // rule: completedOrdersLeaveKitchenQueue
  const kitchenOrders = shiftOrders.filter(
    (order) => order.status === 'confirmed' || order.status === 'inPreparation',
  );

  kitchenOrders.sort((a, b) => {
    const aAt = a.confirmedAt ?? a.registeredAt;
    const bAt = b.confirmedAt ?? b.registeredAt;
    return aAt < bAt ? -1 : aAt > bAt ? 1 : 0;
  });

  return kitchenOrders.map(projectKitchenQueueOrder);
}
