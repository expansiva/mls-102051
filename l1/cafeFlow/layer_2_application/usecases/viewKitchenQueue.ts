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

export interface ViewKitchenQueueEntry {
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

/** Canonical list wire shape (outputShape.kind = list). */
export type ViewKitchenQueueOutput = ViewKitchenQueueEntry[];

function projectKitchenQueueEntry(order: Order): ViewKitchenQueueEntry {
  // rule: orderRequiresTableOrTakeout — reflected by orderType/tableNumber already on the aggregate
  // rule: orderItemsArePrepReference
  return {
    orderId: order.orderId,
    orderType: order.orderType,
    tableNumber: order.tableNumber,
    customerName: order.customerName,
    notes: order.notes,
    status: order.status,
    confirmedAt: order.confirmedAt,
    inPreparationAt: order.inPreparationAt,
    items: order.items.map((item) => ({
      orderItemId: item.orderItemId,
      menuItemName: item.menuItemName,
      quantity: item.quantity,
      observations: item.observations,
      status: item.status,
    })),
  };
}

export async function viewKitchenQueue(
  ctx: RequestContext,
  _input: ViewKitchenQueueInput,
): Promise<ViewKitchenQueueOutput> {
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
  const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');

  // activeLifecycleInstance: single open DailyShift (not a public input)
  const openShifts = await dailyShifts.list({ status: 'open' });
  const openShift = openShifts[0] ?? null;

  // rule: ordersRequireOpenDailyShift — empty kitchen queue when no open shift
  if (!openShift) {
    return [];
  }

  const shiftOrders = await ordersRepo.findByDailyShiftId(openShift.dailyShiftId);

  // rule: orderEntersKitchenQueueAfterAttendantConfirmation — exclude registered
  // rule: completedOrdersLeaveKitchenQueue — exclude ready, served, cancelled
  const kitchenOrders = shiftOrders.filter(
    (order) => order.status === 'confirmed' || order.status === 'inPreparation',
  );

  kitchenOrders.sort((a, b) => {
    const aAt = a.confirmedAt ?? a.registeredAt;
    const bAt = b.confirmedAt ?? b.registeredAt;
    return aAt < bAt ? -1 : aAt > bAt ? 1 : 0;
  });

  return kitchenOrders.map(projectKitchenQueueEntry);
}
