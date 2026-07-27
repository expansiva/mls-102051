/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.ts" enhancement="_blank"/>
import type { DailyShift, DailyShiftStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.js';

export type DailyShiftId = string;
export type CalendarDate = string;

export interface DateRange {
  from: CalendarDate;
  to: CalendarDate;
}

export interface DailyShiftFilter {
  dailyShiftId?: string;
  shiftDate?: CalendarDate;
  status?: DailyShiftStatus;
  openedByUserId?: string;
}

export interface IDailyShiftRepository {
  getById(id: DailyShiftId): Promise<DailyShift | null>;
  list(filter: DailyShiftFilter): Promise<DailyShift[]>;
  save(aggregate: DailyShift): Promise<void>;
  findOpenByDate(date: CalendarDate): Promise<DailyShift | null>;
  findByPeriod(period: DateRange): Promise<DailyShift[]>;
}
