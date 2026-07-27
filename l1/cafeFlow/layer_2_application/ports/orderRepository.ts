/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.ts" enhancement="_blank"/>
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';

export type OrderId = string;
export type DailyShiftId = string;
export type TableRef = string;

export interface OrderFilter {
  dailyShiftId?: string;
  status?: OrderStatus;
  tableNumber?: string;
}

export interface IOrderRepository {
  getById(id: OrderId): Promise<Order | null>;
  list(filter: OrderFilter): Promise<Order[]>;
  save(aggregate: Order): Promise<void>;
  findByDailyShiftId(dailyShiftId: DailyShiftId): Promise<Order[]>;
  findOpenByTable(tableRef: TableRef): Promise<Order | null>;
  findByStatus(status: OrderStatus): Promise<Order[]>;
}
