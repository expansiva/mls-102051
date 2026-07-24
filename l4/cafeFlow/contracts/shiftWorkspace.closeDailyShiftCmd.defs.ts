/// <mls fileReference="_102051_/l4/cafeFlow/contracts/shiftWorkspace.closeDailyShiftCmd.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/shiftWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall closeDailyShiftCmd (command); Output kind=object; route cafeFlow.shiftWorkspace.closeDailyShiftCmd.

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
