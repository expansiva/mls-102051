/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.ts" enhancement="_blank"/>
import type { StockAdjustment } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.js';

export type StockAdjustmentId = string;
export type ProductId = string;

export interface DateRange {
  from: string;
  to: string;
}

export interface IStockAdjustmentRepository {
  append(record: StockAdjustment): Promise<void>;
  listByPeriod(period: DateRange): Promise<StockAdjustment[]>;
  listByProductId(productId: ProductId): Promise<StockAdjustment[]>;
  getById(id: StockAdjustmentId): Promise<StockAdjustment | null>;
}
