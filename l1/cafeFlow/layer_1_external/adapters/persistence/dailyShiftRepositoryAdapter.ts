/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/dailyShiftRepositoryAdapter.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  DailyShiftFilter,
  DateRange,
  IDailyShiftRepository,
  LocalDate,
} from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { DailyShift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.js';

interface DailyShiftRow {
  daily_shift_id: string;
  status: string;
  opened_by_user_id: string;
  closed_by_user_id: string | null;
  created_at: string;
  details: string | null;
}

interface DailyShiftDetails {
  shiftDate: string;
  openedAt: string;
  closedAt: string | null;
  totalOrders: number | null;
  totalSalesAmount: number | null;
  totalItemsSold: number | null;
  cashTotal: number | null;
  otherPaymentsTotal: number | null;
  notes: string | null;
  updatedAt: string;
}

function toRow(shift: DailyShift): DailyShiftRow {
  const details: DailyShiftDetails = {
    shiftDate: shift.shiftDate,
    openedAt: shift.openedAt,
    closedAt: shift.closedAt,
    totalOrders: shift.totalOrders,
    totalSalesAmount: shift.totalSalesAmount,
    totalItemsSold: shift.totalItemsSold,
    cashTotal: shift.cashTotal,
    otherPaymentsTotal: shift.otherPaymentsTotal,
    notes: shift.notes,
    updatedAt: shift.updatedAt,
  };
  return {
    daily_shift_id: shift.dailyShiftId,
    status: shift.status,
    opened_by_user_id: shift.openedByUserId,
    closed_by_user_id: shift.closedByUserId,
    created_at: shift.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: DailyShiftRow): DailyShiftDetails {
  try {
    return JSON.parse(row.details ?? '{}') as DailyShiftDetails;
  } catch {
    return {
      shiftDate: '',
      openedAt: row.created_at,
      closedAt: null,
      totalOrders: null,
      totalSalesAmount: null,
      totalItemsSold: null,
      cashTotal: null,
      otherPaymentsTotal: null,
      notes: null,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: DailyShiftRow): DailyShift {
  const d = parseDetails(row);
  return {
    dailyShiftId: row.daily_shift_id,
    shiftDate: d.shiftDate,
    status: row.status as DailyShift['status'],
    openedByUserId: row.opened_by_user_id,
    closedByUserId: row.closed_by_user_id,
    openedAt: d.openedAt,
    closedAt: d.closedAt,
    totalOrders: d.totalOrders,
    totalSalesAmount: d.totalSalesAmount,
    totalItemsSold: d.totalItemsSold,
    cashTotal: d.cashTotal,
    otherPaymentsTotal: d.otherPaymentsTotal,
    notes: d.notes,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createDailyShiftRepositoryAdapter(ctx: RequestContext): IDailyShiftRepository {
  const getTable = () => ctx.data.moduleData.getTable<DailyShiftRow>('daily_shift');

  return {
    async getById(id) {
      const row = await (await getTable()).findOne({ where: { daily_shift_id: id } });
      return row ? toDomain(row) : null;
    },

    async list(filter: DailyShiftFilter) {
      const where: Partial<DailyShiftRow> = {};
      if (filter?.status) where.status = filter.status;
      const rows = await (await getTable()).findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      let results = rows.map(toDomain);
      if (filter?.shiftDate) {
        results = results.filter((shift) => shift.shiftDate === filter.shiftDate);
      }
      return results;
    },

    async save(aggregate) {
      const repo = await getTable();
      const existing = await repo.findOne({ where: { daily_shift_id: aggregate.dailyShiftId } });
      if (existing) {
        await repo.update({ where: { daily_shift_id: aggregate.dailyShiftId }, patch: toRow(aggregate) });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findOpenByDate(date: LocalDate) {
      const rows = await (await getTable()).findMany({
        where: { status: 'open' },
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      const match = rows.map(toDomain).find((shift) => shift.shiftDate === date);
      return match ?? null;
    },

    async findByPeriod(period: DateRange) {
      const rows = await (await getTable()).findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows
        .map(toDomain)
        .filter((shift) => shift.shiftDate >= period.from && shift.shiftDate <= period.to);
    },
  };
}
