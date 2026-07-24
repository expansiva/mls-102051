/// <mls fileReference="_102051_/l4/cafeFlow/contracts/shiftWorkspace.getShiftClosingReport.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/shiftWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall getShiftClosingReport (query); Output kind=object; route cafeFlow.shiftWorkspace.getShiftClosingReport.

export interface GetShiftClosingReportInput {
  shiftClosingReportId: string;
}

export interface GetShiftClosingReportOutput {
  shiftClosingReportId: string;
  dailyShiftId: string;
  shiftDate: string;
  totalSalesAmount: number;
  totalOrdersCount: number;
  totalItemsSold: number;
  cashPaymentsAmount: number;
  otherPaymentsAmount: number;
  topSellingItemsSummary: string;
  lowStockSignalsCount: number;
  stockoutSignalsCount: number;
  closingNotes: string;
  generatedAt: string;
}

export const getShiftClosingReportRoute = 'cafeFlow.shiftWorkspace.getShiftClosingReport' as const;
