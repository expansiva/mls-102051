/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.ts" enhancement="_blank"/>
export type StockConsumptionStatus = 'posted' | 'voided';

export interface StockConsumption {
  stockConsumptionId: string;
  orderId: string;
  stockItemId: string;
  quantity: number;
  occurredAt: string;
  status: StockConsumptionStatus;
  voidedAt: string | null;
  voidReason: string | null;
  createdAt: string;
}
