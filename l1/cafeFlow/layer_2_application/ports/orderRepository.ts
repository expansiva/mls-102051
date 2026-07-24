/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.ts" enhancement="_blank"/>
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export type OrderId = string;
export type DailyShiftId = string;
export type TableId = string;

export interface OrderFilter {
  dailyShiftId?: DailyShiftId;
  status?: OrderStatus;
  tableId?: TableId;
}

export interface IOrderRepository {
  /** Load an order by its identity */
  getById(id: OrderId): Promise<Order | null>;
  /** List orders matching domain filter */
  list(filter: OrderFilter): Promise<Order[]>;
  /** Persist order aggregate including items and payments */
  save(aggregate: Order): Promise<void>;
  /** Find orders belonging to a daily shift */
  findByDailyShiftId(dailyShiftId: DailyShiftId): Promise<Order[]>;
  /** Find the open order for a table */
  findOpenByTable(tableId: TableId): Promise<Order | null>;
  /** Find orders by lifecycle status */
  findByStatus(status: OrderStatus): Promise<Order[]>;
}
