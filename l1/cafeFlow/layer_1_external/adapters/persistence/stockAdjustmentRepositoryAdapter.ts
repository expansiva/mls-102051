/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  DateRange,
  IStockAdjustmentRepository,
  ProductId,
  StockAdjustmentId,
} from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.js';
import type { StockAdjustment } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.js';

interface StockAdjustmentRow {
  stock_adjustment_id: string;
  stock_item_id: string;
  direction: string;
  reason: string;
  manager_user_id: string;
  shift_id: string | null;
  status: string;
  created_at: string;
  voided_by_user_id: string | null;
  compensating_adjustment_id: string | null;
  details: string | null;
}

interface StockAdjustmentDetails {
  quantity: number;
  resultingBalance: number;
  notes: string | null;
  voidedAt: string | null;
}

function toRow(record: StockAdjustment): StockAdjustmentRow {
  const details: StockAdjustmentDetails = {
    quantity: record.quantity,
    resultingBalance: record.resultingBalance,
    notes: record.notes,
    voidedAt: record.voidedAt,
  };
  return {
    stock_adjustment_id: record.stockAdjustmentId,
    stock_item_id: record.stockItemId,
    direction: record.direction,
    reason: record.reason,
    manager_user_id: record.managerUserId,
    shift_id: record.shiftId,
    status: record.status,
    created_at: record.createdAt,
    voided_by_user_id: record.voidedByUserId,
    compensating_adjustment_id: record.compensatingAdjustmentId,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: StockAdjustmentRow): StockAdjustmentDetails {
  try {
    return JSON.parse(row.details ?? '{}') as StockAdjustmentDetails;
  } catch {
    return {
      quantity: 0,
      resultingBalance: 0,
      notes: null,
      voidedAt: null,
    };
  }
}

function toDomain(row: StockAdjustmentRow): StockAdjustment {
  const d = parseDetails(row);
  return {
    stockAdjustmentId: row.stock_adjustment_id,
    stockItemId: row.stock_item_id,
    quantity: d.quantity,
    direction: row.direction as StockAdjustment['direction'],
    reason: row.reason as StockAdjustment['reason'],
    managerUserId: row.manager_user_id,
    shiftId: row.shift_id,
    resultingBalance: d.resultingBalance,
    notes: d.notes,
    status: row.status as StockAdjustment['status'],
    createdAt: row.created_at,
    voidedAt: d.voidedAt,
    voidedByUserId: row.voided_by_user_id,
    compensatingAdjustmentId: row.compensating_adjustment_id,
  };
}

export function createStockAdjustmentRepositoryAdapter(
  ctx: RequestContext,
): IStockAdjustmentRepository {
  const getTable = () => ctx.data.moduleData.getTable<StockAdjustmentRow>('stock_adjustment');

  return {
    async append(record) {
      await (await getTable()).insert({ record: toRow(record) });
    },

    async listByPeriod(period: DateRange) {
      const rows = await (
        await getTable()
      ).findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows
        .filter((row) => row.created_at >= period.from && row.created_at <= period.to)
        .map(toDomain);
    },

    async listByProductId(productId: ProductId) {
      const rows = await (
        await getTable()
      ).findMany({
        where: { stock_item_id: productId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async getById(id: StockAdjustmentId) {
      const row = await (await getTable()).findOne({ where: { stock_adjustment_id: id } });
      return row ? toDomain(row) : null;
    },
  };
}
