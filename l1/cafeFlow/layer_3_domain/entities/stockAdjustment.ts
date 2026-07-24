/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.ts" enhancement="_blank"/>
export type StockAdjustmentDirection = 'in' | 'out' | 'correction';

export type StockAdjustmentReason = 'count' | 'loss' | 'expiration' | 'divergence' | 'other';

export type StockAdjustmentStatus = 'posted' | 'voided';

export interface StockAdjustment {
  stockAdjustmentId: string;
  stockItemId: string;
  quantity: number;
  direction: StockAdjustmentDirection;
  reason: StockAdjustmentReason;
  managerUserId: string;
  shiftId: string | null;
  resultingBalance: number;
  notes: string | null;
  status: StockAdjustmentStatus;
  createdAt: string;
  voidedAt: string | null;
  voidedByUserId: string | null;
  compensatingAdjustmentId: string | null;
}
