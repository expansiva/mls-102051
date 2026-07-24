/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.ts" enhancement="_blank"/>
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export type StockConsumptionId = string;
export type OrderId = string;
export type ProductId = string;

export interface DateRange {
  from: string;
  to: string;
}

export interface IStockConsumptionRepository {
  /** Append a stock consumption event (append-only) */
  append(record: StockConsumption): Promise<void>;
  /** List stock consumptions for owning order */
  listByOwnerId(ownerId: OrderId): Promise<StockConsumption[]>;
  /** List stock consumptions within a period */
  listByPeriod(period: DateRange): Promise<StockConsumption[]>;
  /** List stock consumptions for a product */
  listByProductId(productId: ProductId): Promise<StockConsumption[]>;
  /** Load a stock consumption event by identity */
  getById(id: StockConsumptionId): Promise<StockConsumption | null>;
}
