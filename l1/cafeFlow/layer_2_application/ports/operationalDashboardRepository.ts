/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.ts" enhancement="_blank"/>
import type { OperationalDashboard } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.js';

export type OperationalDashboardId = string;
export type DailyShiftId = string;

export interface OperationalDashboardFilter {
  dailyShiftId?: DailyShiftId;
  referenceDate?: string;
}

export interface IOperationalDashboardRepository {
  getById(id: OperationalDashboardId): Promise<OperationalDashboard | null>;
  list(filter: OperationalDashboardFilter): Promise<OperationalDashboard[]>;
  save(aggregate: OperationalDashboard): Promise<void>;
  findCurrent(): Promise<OperationalDashboard | null>;
  findByDailyShiftId(dailyShiftId: DailyShiftId): Promise<OperationalDashboard | null>;
}
