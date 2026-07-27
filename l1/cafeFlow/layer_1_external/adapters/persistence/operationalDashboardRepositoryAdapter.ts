/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboardRepositoryAdapter.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  IOperationalDashboardRepository,
  OperationalDashboardFilter,
} from '/_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.js';
import type { OperationalDashboard } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.js';

interface OperationalDashboardRow {
  operational_dashboard_id: string;
  daily_shift_id: string;
  top_menu_item_id: string | null;
  created_at: string;
  details: string | null;
}

interface OperationalDashboardDetails {
  referenceDate: string;
  todaySalesTotal: number;
  todayOrdersCount: number;
  todayItemsSold: number;
  topMenuItemQuantity: number | null;
  topSellingItemsCount: number;
  lowStockItemsCount: number;
  outOfStockItemsCount: number;
  lowStockItemIds: string | null;
  hasLowStockAlert: boolean;
  lastComputedAt: string;
  updatedAt: string;
}

function toRow(dashboard: OperationalDashboard): OperationalDashboardRow {
  const details: OperationalDashboardDetails = {
    referenceDate: dashboard.referenceDate,
    todaySalesTotal: dashboard.todaySalesTotal,
    todayOrdersCount: dashboard.todayOrdersCount,
    todayItemsSold: dashboard.todayItemsSold,
    topMenuItemQuantity: dashboard.topMenuItemQuantity,
    topSellingItemsCount: dashboard.topSellingItemsCount,
    lowStockItemsCount: dashboard.lowStockItemsCount,
    outOfStockItemsCount: dashboard.outOfStockItemsCount,
    lowStockItemIds: dashboard.lowStockItemIds,
    hasLowStockAlert: dashboard.hasLowStockAlert,
    lastComputedAt: dashboard.lastComputedAt,
    updatedAt: dashboard.updatedAt,
  };
  return {
    operational_dashboard_id: dashboard.operationalDashboardId,
    daily_shift_id: dashboard.dailyShiftId,
    top_menu_item_id: dashboard.topMenuItemId,
    created_at: dashboard.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: OperationalDashboardRow): OperationalDashboardDetails {
  try {
    return JSON.parse(row.details ?? '{}') as OperationalDashboardDetails;
  } catch {
    return {
      referenceDate: row.created_at.slice(0, 10),
      todaySalesTotal: 0,
      todayOrdersCount: 0,
      todayItemsSold: 0,
      topMenuItemQuantity: null,
      topSellingItemsCount: 0,
      lowStockItemsCount: 0,
      outOfStockItemsCount: 0,
      lowStockItemIds: null,
      hasLowStockAlert: false,
      lastComputedAt: row.created_at,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: OperationalDashboardRow): OperationalDashboard {
  const d = parseDetails(row);
  return {
    operationalDashboardId: row.operational_dashboard_id,
    dailyShiftId: row.daily_shift_id,
    referenceDate: d.referenceDate,
    todaySalesTotal: d.todaySalesTotal,
    todayOrdersCount: d.todayOrdersCount,
    todayItemsSold: d.todayItemsSold,
    topMenuItemId: row.top_menu_item_id,
    topMenuItemQuantity: d.topMenuItemQuantity,
    topSellingItemsCount: d.topSellingItemsCount,
    lowStockItemsCount: d.lowStockItemsCount,
    outOfStockItemsCount: d.outOfStockItemsCount,
    lowStockItemIds: d.lowStockItemIds,
    hasLowStockAlert: d.hasLowStockAlert,
    lastComputedAt: d.lastComputedAt,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createOperationalDashboardRepositoryAdapter(
  ctx: RequestContext,
): IOperationalDashboardRepository {
  const getTable = () =>
    ctx.data.moduleData.getTable<OperationalDashboardRow>('operational_dashboard');

  return {
    async getById(id) {
      const row = await (
        await getTable()
      ).findOne({ where: { operational_dashboard_id: id } });
      return row ? toDomain(row) : null;
    },

    async list(filter: OperationalDashboardFilter) {
      const where: Partial<OperationalDashboardRow> = {};
      if (filter?.dailyShiftId) where.daily_shift_id = filter.dailyShiftId;
      const rows = await (
        await getTable()
      ).findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      let result = rows.map(toDomain);
      if (filter?.referenceDate) {
        result = result.filter((d) => d.referenceDate === filter.referenceDate);
      }
      return result;
    },

    async save(aggregate) {
      const repo = await getTable();
      const existing = await repo.findOne({
        where: { operational_dashboard_id: aggregate.operationalDashboardId },
      });
      if (existing) {
        await repo.update({
          where: { operational_dashboard_id: aggregate.operationalDashboardId },
          patch: toRow(aggregate),
        });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findCurrent() {
      const rows = await (
        await getTable()
      ).findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
        limit: 1,
      });
      return rows.length > 0 ? toDomain(rows[0]) : null;
    },

    async findByDailyShiftId(dailyShiftId) {
      const row = await (
        await getTable()
      ).findOne({ where: { daily_shift_id: dailyShiftId } });
      return row ? toDomain(row) : null;
    },
  };
}
