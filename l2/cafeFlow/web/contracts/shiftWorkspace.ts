/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/shiftWorkspace.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace shiftWorkspace; one contract file per workspace, all bffCalls).

// bffCall openDailyShiftCmd (command) — Output kind=object; route cafeFlow.shiftWorkspace.openDailyShiftCmd.
export interface OpenDailyShiftCmdInput {
  shiftDate: string;
  openedByUserId: string;
  notes?: string;
}
export interface OpenDailyShiftCmdOutput {
  dailyShiftId: string;
  shiftDate: string;
  status: string;
  openedByUserId: string;
  openedAt: string;
  notes: string;
  createdAt: string;
}
export const openDailyShiftCmdRoute = 'cafeFlow.shiftWorkspace.openDailyShiftCmd' as const;

// bffCall closeDailyShiftCmd (command) — Output kind=object; route cafeFlow.shiftWorkspace.closeDailyShiftCmd.
export interface CloseDailyShiftCmdInput {
  dailyShiftId: string;
  cashTotal?: number;
  otherPaymentsTotal?: number;
  notes?: string;
  closedByUserId: string;
  closedAt: string;
}
export interface CloseDailyShiftCmdOutput {
  dailyShiftId: string;
  shiftDate: string;
  status: string;
  closedByUserId: string;
  closedAt: string;
  totalOrders: number;
  totalSalesAmount: number;
  totalItemsSold: number;
  cashTotal: number;
  otherPaymentsTotal: number;
  shiftClosingReportId: string;
  generatedAt: string;
}
export const closeDailyShiftCmdRoute = 'cafeFlow.shiftWorkspace.closeDailyShiftCmd' as const;

// bffCall getShiftClosingReport (query) — Output kind=object; route cafeFlow.shiftWorkspace.getShiftClosingReport.
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
