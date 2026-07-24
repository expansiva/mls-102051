/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';

export interface ViewShiftClosingReportInput {
  shiftClosingReportId: string;
}

export interface ViewShiftClosingReportOutput {
  shiftClosingReportId: string;
  dailyShiftId: string;
  shiftDate: string;
  totalSalesAmount: number;
  totalOrdersCount: number;
  totalItemsSold: number;
  cashPaymentsAmount: number;
  otherPaymentsAmount: number;
  topSellingItemsSummary?: string;
  lowStockSignalsCount: number;
  stockoutSignalsCount: number;
  closingNotes?: string;
  generatedAt: string;
}

export async function viewShiftClosingReport(
  ctx: RequestContext,
  input: ViewShiftClosingReportInput,
): Promise<ViewShiftClosingReportOutput> {
  const shiftClosingReports = resolveRepository<IShiftClosingReportRepository>(ctx, 'ShiftClosingReport');

  const report = await shiftClosingReports.getById(input.shiftClosingReportId);
  if (!report) {
    throw new AppError(
      'NOT_FOUND',
      `ShiftClosingReport not found: ${input.shiftClosingReportId}`,
      404,
      { shiftClosingReportId: input.shiftClosingReportId },
    );
  }

  // rule: shiftClosingReportContents
  // rule: shiftClosingRecordsBasicTotalsAndPayments
  const output: ViewShiftClosingReportOutput = {
    shiftClosingReportId: report.shiftClosingReportId,
    dailyShiftId: report.dailyShiftId,
    shiftDate: report.shiftDate,
    totalSalesAmount: report.totalSalesAmount,
    totalOrdersCount: report.totalOrdersCount,
    totalItemsSold: report.totalItemsSold,
    cashPaymentsAmount: report.cashPaymentsAmount,
    otherPaymentsAmount: report.otherPaymentsAmount,
    lowStockSignalsCount: report.lowStockSignalsCount,
    stockoutSignalsCount: report.stockoutSignalsCount,
    generatedAt: report.generatedAt,
  };

  if (report.topSellingItemsSummary != null) {
    output.topSellingItemsSummary = report.topSellingItemsSummary;
  }
  if (report.closingNotes != null) {
    output.closingNotes = report.closingNotes;
  }

  return output;
}
