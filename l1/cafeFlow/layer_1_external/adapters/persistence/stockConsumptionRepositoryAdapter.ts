/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumptionRepositoryAdapter.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  DateRange,
  IStockConsumptionRepository,
} from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

interface StockConsumptionRow {
  stock_consumption_id: string;
  order_id: string;
  stock_item_id: string;
  status: string;
  created_at: string;
  details: string | null;
}

interface StockConsumptionDetails {
  quantity: number;
  occurredAt: string;
  voidedAt: string | null;
  voidReason: string | null;
}

function toRow(record: StockConsumption): StockConsumptionRow {
  const details: StockConsumptionDetails = {
    quantity: record.quantity,
    occurredAt: record.occurredAt,
    voidedAt: record.voidedAt,
    voidReason: record.voidReason,
  };
  return {
    stock_consumption_id: record.stockConsumptionId,
    order_id: record.orderId,
    stock_item_id: record.stockItemId,
    status: record.status,
    created_at: record.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: StockConsumptionRow): StockConsumptionDetails {
  try {
    return JSON.parse(row.details ?? '{}') as StockConsumptionDetails;
  } catch {
    return {
      quantity: 0,
      occurredAt: row.created_at,
      voidedAt: null,
      voidReason: null,
    };
  }
}

function toDomain(row: StockConsumptionRow): StockConsumption {
  const d = parseDetails(row);
  return {
    stockConsumptionId: row.stock_consumption_id,
    orderId: row.order_id,
    stockItemId: row.stock_item_id,
    quantity: d.quantity,
    occurredAt: d.occurredAt,
    status: row.status as StockConsumption['status'],
    voidedAt: d.voidedAt,
    voidReason: d.voidReason,
    createdAt: row.created_at,
  };
}

export function createStockConsumptionRepositoryAdapter(
  ctx: RequestContext,
): IStockConsumptionRepository {
  const getTable = () => ctx.data.moduleData.getTable<StockConsumptionRow>('stock_consumption');

  return {
    async append(record) {
      await (await getTable()).insert({ record: toRow(record) });
    },

    async listByOwnerId(ownerId) {
      const rows = await (
        await getTable()
      ).findMany({
        where: { order_id: ownerId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
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

    async listByProductId(productId) {
      const rows = await (
        await getTable()
      ).findMany({
        where: { stock_item_id: productId },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows.map(toDomain);
    },

    async getById(id) {
      const row = await (await getTable()).findOne({ where: { stock_consumption_id: id } });
      return row ? toDomain(row) : null;
    },
  };
}
