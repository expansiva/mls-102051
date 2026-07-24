/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.ts" enhancement="_blank"/>
export interface ShiftClosingReport {
  shiftClosingReportId: string;
  dailyShiftId: string;
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
  createdAt: string;
  updatedAt: string;
}

export function shiftClosingReportPaymentsMatchTotal(
  report: Pick<ShiftClosingReport, 'totalSalesAmount' | 'cashPaymentsAmount' | 'otherPaymentsAmount'>,
): boolean {
  return report.totalSalesAmount === report.cashPaymentsAmount + report.otherPaymentsAmount;
}

export function shiftClosingReportCountsAreNonNegative(
  report: Pick<
    ShiftClosingReport,
    'totalOrdersCount' | 'totalItemsSold' | 'lowStockSignalsCount' | 'stockoutSignalsCount'
  >,
): boolean {
  return (
    report.totalOrdersCount >= 0 &&
    report.totalItemsSold >= 0 &&
    report.lowStockSignalsCount >= 0 &&
    report.stockoutSignalsCount >= 0
  );
}

export function shiftClosingReportAmountsAreNonNegative(
  report: Pick<ShiftClosingReport, 'totalSalesAmount' | 'cashPaymentsAmount' | 'otherPaymentsAmount'>,
): boolean {
  return (
    report.totalSalesAmount >= 0 &&
    report.cashPaymentsAmount >= 0 &&
    report.otherPaymentsAmount >= 0
  );
}

export function shiftClosingReportGeneratedAtIsValid(
  report: Pick<ShiftClosingReport, 'generatedAt'>,
  dailyShiftClosedAt: string,
): boolean {
  return report.generatedAt >= dailyShiftClosedAt;
}

export function shiftClosingReportTimestampsAreValid(
  report: Pick<ShiftClosingReport, 'createdAt' | 'updatedAt'>,
): boolean {
  return report.updatedAt >= report.createdAt;
}

export function shiftClosingReportRequiresClosedDailyShift(dailyShiftStatus: string): boolean {
  return dailyShiftStatus === 'closed';
}

export function shiftClosingReportIsUniqueForDailyShift(
  existingReports: Array<Pick<ShiftClosingReport, 'dailyShiftId' | 'shiftClosingReportId'>>,
  dailyShiftId: string,
  excludeShiftClosingReportId?: string,
): boolean {
  return !existingReports.some(
    (report) =>
      report.dailyShiftId === dailyShiftId &&
      report.shiftClosingReportId !== excludeShiftClosingReportId,
  );
}
