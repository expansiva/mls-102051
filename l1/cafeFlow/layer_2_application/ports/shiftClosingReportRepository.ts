/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.ts" enhancement="_blank"/>
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

export type ShiftClosingReportId = string;
export type DailyShiftId = string;

export interface DateRange {
  from: string;
  to: string;
}

export interface ShiftClosingReportFilter {
  dailyShiftId?: string;
  shiftDate?: string;
}

export interface IShiftClosingReportRepository {
  getById(id: ShiftClosingReportId): Promise<ShiftClosingReport | null>;
  list(filter: ShiftClosingReportFilter): Promise<ShiftClosingReport[]>;
  save(aggregate: ShiftClosingReport): Promise<void>;
  findByDailyShiftId(dailyShiftId: DailyShiftId): Promise<ShiftClosingReport | null>;
  findByPeriod(period: DateRange): Promise<ShiftClosingReport[]>;
}
