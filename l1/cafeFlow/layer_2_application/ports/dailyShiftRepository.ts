/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.ts" enhancement="_blank"/>
import type { DailyShift, DailyShiftStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.js';

export type DailyShiftId = string;
export type LocalDate = string;

export interface DateRange {
  from: LocalDate;
  to: LocalDate;
}

export interface DailyShiftFilter {
  status?: DailyShiftStatus;
  shiftDate?: LocalDate;
}

export interface IDailyShiftRepository {
  getById(id: DailyShiftId): Promise<DailyShift | null>;
  list(filter: DailyShiftFilter): Promise<DailyShift[]>;
  save(aggregate: DailyShift): Promise<void>;
  findOpenByDate(date: LocalDate): Promise<DailyShift | null>;
  findByPeriod(period: DateRange): Promise<DailyShift[]>;
}
