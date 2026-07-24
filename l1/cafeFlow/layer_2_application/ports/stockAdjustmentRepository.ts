/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.ts" enhancement="_blank"/>
import type { StockAdjustment } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.js';

export type StockAdjustmentId = string;
export type ProductId = string;

export interface DateRange {
  from: string;
  to: string;
}

export interface IStockAdjustmentRepository {
  /** Append a stock adjustment event (append-only) */
  append(record: StockAdjustment): Promise<void>;
  /** List stock adjustments within a period */
  listByPeriod(period: DateRange): Promise<StockAdjustment[]>;
  /** List stock adjustments for a product */
  listByProductId(productId: ProductId): Promise<StockAdjustment[]>;
  /** Load a stock adjustment event by identity */
  getById(id: StockAdjustmentId): Promise<StockAdjustment | null>;
}
