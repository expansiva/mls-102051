/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.ts" enhancement="_blank"/>
import { type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  IOrderRepository,
  OrderFilter,
} from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type {
  Order,
  OrderItem,
  OrderPayment,
  OrderStatus,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

interface OrderRow {
  order_id: string;
  daily_shift_id: string;
  order_type: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface OrderDetails {
  tableNumber: string | null;
  customerName: string | null;
  totalAmount: number;
  notes: string | null;
  registeredAt: string;
  confirmedAt: string | null;
  inPreparationAt: string | null;
  readyAt: string | null;
  servedAt: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;
  updatedAt: string;
  items: OrderItem[];
  payment: OrderPayment | null;
}

const OPEN_STATUSES: OrderStatus[] = [
  'registered',
  'confirmed',
  'inPreparation',
  'ready',
];

function toRow(order: Order): OrderRow {
  const details: OrderDetails = {
    tableNumber: order.tableNumber,
    customerName: order.customerName,
    totalAmount: order.totalAmount,
    notes: order.notes,
    registeredAt: order.registeredAt,
    confirmedAt: order.confirmedAt,
    inPreparationAt: order.inPreparationAt,
    readyAt: order.readyAt,
    servedAt: order.servedAt,
    cancelledAt: order.cancelledAt,
    cancellationReason: order.cancellationReason,
    updatedAt: order.updatedAt,
    items: order.items,
    payment: order.payment,
  };
  return {
    order_id: order.orderId,
    daily_shift_id: order.dailyShiftId,
    order_type: order.orderType,
    status: order.status,
    created_at: order.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: OrderRow): OrderDetails {
  try {
    return JSON.parse(row.details ?? '{}') as OrderDetails;
  } catch {
    return {
      tableNumber: null,
      customerName: null,
      totalAmount: 0,
      notes: null,
      registeredAt: row.created_at,
      confirmedAt: null,
      inPreparationAt: null,
      readyAt: null,
      servedAt: null,
      cancelledAt: null,
      cancellationReason: null,
      updatedAt: row.created_at,
      items: [],
      payment: null,
    };
  }
}

function toDomain(row: OrderRow): Order {
  const d = parseDetails(row);
  return {
    orderId: row.order_id,
    dailyShiftId: row.daily_shift_id,
    orderType: row.order_type as Order['orderType'],
    tableNumber: d.tableNumber ?? null,
    customerName: d.customerName ?? null,
    totalAmount: d.totalAmount ?? 0,
    notes: d.notes ?? null,
    status: row.status as Order['status'],
    registeredAt: d.registeredAt ?? row.created_at,
    confirmedAt: d.confirmedAt ?? null,
    inPreparationAt: d.inPreparationAt ?? null,
    readyAt: d.readyAt ?? null,
    servedAt: d.servedAt ?? null,
    cancelledAt: d.cancelledAt ?? null,
    cancellationReason: d.cancellationReason ?? null,
    items: d.items ?? [],
    payment: d.payment ?? null,
    createdAt: row.created_at,
    updatedAt: d.updatedAt ?? row.created_at,
  };
}

export function createOrderRepositoryAdapter(ctx: RequestContext): IOrderRepository {
  const getTable = () => ctx.data.moduleData.getTable<OrderRow>('order');

  return {
    async getById(id) {
      const row = await (await getTable()).findOne({ where: { order_id: id } });
      return row ? toDomain(row) : null;
    },

    async list(filter: OrderFilter) {
      const where: Partial<OrderRow> = {};
      if (filter?.dailyShiftId) where.daily_shift_id = filter.dailyShiftId;
      if (filter?.status) where.status = filter.status;
      const rows = await (await getTable()).findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      let orders = rows.map(toDomain);
      if (filter?.tableNumber) {
        orders = orders.filter((o) => o.tableNumber === filter.tableNumber);
      }
      return orders;
    },

    async save(aggregate) {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { order_id: aggregate.orderId } });
      if (existing) {
        await repo.update({ where: { order_id: aggregate.orderId }, patch: toRow(aggregate) });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findByDailyShiftId(dailyShiftId) {
      const rows = await (await getTable()).findMany({
        where: { daily_shift_id: dailyShiftId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async findOpenByTable(tableRef) {
      const rows = await (await getTable()).findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      const open = rows
        .map(toDomain)
        .find(
          (o) =>
            o.tableNumber === tableRef &&
            OPEN_STATUSES.includes(o.status),
        );
      return open ?? null;
    },

    async findByStatus(status) {
      const rows = await (await getTable()).findMany({
        where: { status },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },
  };
}
