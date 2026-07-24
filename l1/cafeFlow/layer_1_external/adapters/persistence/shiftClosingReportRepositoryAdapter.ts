/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReportRepositoryAdapter.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type {
  DateRange,
  IShiftClosingReportRepository,
  ShiftClosingReportFilter,
} from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

interface ShiftClosingReportRow {
  shift_closing_report_id: string;
  daily_shift_id: string;
  created_at: string;
  details: string | null;
}

interface ShiftClosingReportDetails {
  shiftDate: string;
  totalSalesAmount: number;
  totalOrdersCount: number;
  totalItemsSold: number;
  cashPaymentsAmount: number;
  otherPaymentsAmount: number;
  topSellingItemsSummary: string | null;
  lowStockSignalsCount: number;
  stockoutSignalsCount: number;
  closingNotes: string | null;
  generatedAt: string;
  updatedAt: string;
}

function toRow(report: ShiftClosingReport): ShiftClosingReportRow {
  const details: ShiftClosingReportDetails = {
    shiftDate: report.shiftDate,
    totalSalesAmount: report.totalSalesAmount,
    totalOrdersCount: report.totalOrdersCount,
    totalItemsSold: report.totalItemsSold,
    cashPaymentsAmount: report.cashPaymentsAmount,
    otherPaymentsAmount: report.otherPaymentsAmount,
    topSellingItemsSummary: report.topSellingItemsSummary,
    lowStockSignalsCount: report.lowStockSignalsCount,
    stockoutSignalsCount: report.stockoutSignalsCount,
    closingNotes: report.closingNotes,
    generatedAt: report.generatedAt,
    updatedAt: report.updatedAt,
  };
  return {
    shift_closing_report_id: report.shiftClosingReportId,
    daily_shift_id: report.dailyShiftId,
    created_at: report.createdAt,
    details: JSON.stringify(details),
  };
}

function parseDetails(row: ShiftClosingReportRow): ShiftClosingReportDetails {
  try {
    return JSON.parse(row.details ?? '{}') as ShiftClosingReportDetails;
  } catch {
    return {
      shiftDate: '',
      totalSalesAmount: 0,
      totalOrdersCount: 0,
      totalItemsSold: 0,
      cashPaymentsAmount: 0,
      otherPaymentsAmount: 0,
      topSellingItemsSummary: null,
      lowStockSignalsCount: 0,
      stockoutSignalsCount: 0,
      closingNotes: null,
      generatedAt: row.created_at,
      updatedAt: row.created_at,
    };
  }
}

function toDomain(row: ShiftClosingReportRow): ShiftClosingReport {
  const d = parseDetails(row);
  return {
    shiftClosingReportId: row.shift_closing_report_id,
    dailyShiftId: row.daily_shift_id,
    shiftDate: d.shiftDate,
    totalSalesAmount: d.totalSalesAmount,
    totalOrdersCount: d.totalOrdersCount,
    totalItemsSold: d.totalItemsSold,
    cashPaymentsAmount: d.cashPaymentsAmount,
    otherPaymentsAmount: d.otherPaymentsAmount,
    topSellingItemsSummary: d.topSellingItemsSummary ?? null,
    lowStockSignalsCount: d.lowStockSignalsCount,
    stockoutSignalsCount: d.stockoutSignalsCount,
    closingNotes: d.closingNotes ?? null,
    generatedAt: d.generatedAt,
    createdAt: row.created_at,
    updatedAt: d.updatedAt,
  };
}

export function createShiftClosingReportRepositoryAdapter(
  ctx: RequestContext,
): IShiftClosingReportRepository {
  const getTable = () => ctx.data.moduleData.getTable<ShiftClosingReportRow>('shift_closing_report');

  return {
    async getById(id) {
      const row = await (await getTable()).findOne({ where: { shift_closing_report_id: id } });
      return row ? toDomain(row) : null;
    },

    async list(filter?: ShiftClosingReportFilter) {
      const where: Partial<ShiftClosingReportRow> = {};
      if (filter?.dailyShiftId) where.daily_shift_id = filter.dailyShiftId;
      const rows = await (await getTable()).findMany({
        where,
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      let reports = rows.map(toDomain);
      if (filter?.shiftDate) {
        reports = reports.filter((report) => report.shiftDate === filter.shiftDate);
      }
      return reports;
    },

    async save(aggregate) {
      const repo = await getTable();
      const existing = await repo.findOne({
        where: { shift_closing_report_id: aggregate.shiftClosingReportId },
      });
      if (existing) {
        await repo.update({
          where: { shift_closing_report_id: aggregate.shiftClosingReportId },
          patch: toRow(aggregate),
        });
      } else {
        await repo.insert({ record: toRow(aggregate) });
      }
    },

    async findByDailyShiftId(dailyShiftId) {
      const row = await (await getTable()).findOne({ where: { daily_shift_id: dailyShiftId } });
      return row ? toDomain(row) : null;
    },

    async findByPeriod(period: DateRange) {
      const rows = await (await getTable()).findMany({
        orderBy: { field: 'created_at', direction: 'desc' },
      });
      return rows
        .map(toDomain)
        .filter((report) => report.shiftDate >= period.from && report.shiftDate <= period.to);
    },
  };
}
