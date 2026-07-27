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

export function isNonNegativeTotalSalesAmount(
  report: Pick<ShiftClosingReport, 'totalSalesAmount'>,
): boolean {
  return report.totalSalesAmount >= 0;
}

export function isNonNegativeCashPaymentsAmount(
  report: Pick<ShiftClosingReport, 'cashPaymentsAmount'>,
): boolean {
  return report.cashPaymentsAmount >= 0;
}

export function isNonNegativeOtherPaymentsAmount(
  report: Pick<ShiftClosingReport, 'otherPaymentsAmount'>,
): boolean {
  return report.otherPaymentsAmount >= 0;
}

export function totalsMatchPaymentBreakdown(
  report: Pick<
    ShiftClosingReport,
    'totalSalesAmount' | 'cashPaymentsAmount' | 'otherPaymentsAmount'
  >,
): boolean {
  return (
    report.totalSalesAmount ===
    report.cashPaymentsAmount + report.otherPaymentsAmount
  );
}

export function isNonNegativeTotalOrdersCount(
  report: Pick<ShiftClosingReport, 'totalOrdersCount'>,
): boolean {
  return report.totalOrdersCount >= 0;
}

export function isNonNegativeTotalItemsSold(
  report: Pick<ShiftClosingReport, 'totalItemsSold'>,
): boolean {
  return report.totalItemsSold >= 0;
}

export function emptyOrdersImpliesEmptySales(
  report: Pick<
    ShiftClosingReport,
    'totalOrdersCount' | 'totalItemsSold' | 'totalSalesAmount'
  >,
): boolean {
  if (report.totalOrdersCount !== 0) {
    return true;
  }
  return report.totalItemsSold === 0 && report.totalSalesAmount === 0;
}

export function itemsSoldImpliesAtLeastOneOrder(
  report: Pick<ShiftClosingReport, 'totalItemsSold' | 'totalOrdersCount'>,
): boolean {
  if (report.totalItemsSold <= 0) {
    return true;
  }
  return report.totalOrdersCount >= 1;
}

export function isNonNegativeLowStockSignalsCount(
  report: Pick<ShiftClosingReport, 'lowStockSignalsCount'>,
): boolean {
  return report.lowStockSignalsCount >= 0;
}

export function isNonNegativeStockoutSignalsCount(
  report: Pick<ShiftClosingReport, 'stockoutSignalsCount'>,
): boolean {
  return report.stockoutSignalsCount >= 0;
}

export function generatedAtOnOrAfterShiftDate(
  report: Pick<ShiftClosingReport, 'generatedAt' | 'shiftDate'>,
): boolean {
  return report.generatedAt >= report.shiftDate;
}

export function createdAtNotAfterUpdatedAt(
  report: Pick<ShiftClosingReport, 'createdAt' | 'updatedAt'>,
): boolean {
  return report.createdAt <= report.updatedAt;
}

export function generatedAtNotAfterUpdatedAt(
  report: Pick<ShiftClosingReport, 'generatedAt' | 'updatedAt'>,
): boolean {
  return report.generatedAt <= report.updatedAt;
}

export function isValidShiftClosingReport(
  report: ShiftClosingReport,
): boolean {
  return (
    isNonNegativeTotalSalesAmount(report) &&
    isNonNegativeCashPaymentsAmount(report) &&
    isNonNegativeOtherPaymentsAmount(report) &&
    totalsMatchPaymentBreakdown(report) &&
    isNonNegativeTotalOrdersCount(report) &&
    isNonNegativeTotalItemsSold(report) &&
    emptyOrdersImpliesEmptySales(report) &&
    itemsSoldImpliesAtLeastOneOrder(report) &&
    isNonNegativeLowStockSignalsCount(report) &&
    isNonNegativeStockoutSignalsCount(report) &&
    generatedAtOnOrAfterShiftDate(report) &&
    createdAtNotAfterUpdatedAt(report) &&
    generatedAtNotAfterUpdatedAt(report)
  );
}
