/// <mls fileReference="_102051_/l4/cafeFlow/contracts/shiftWorkspace.openDailyShiftCmd.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/shiftWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall openDailyShiftCmd (command); Output kind=object; route cafeFlow.shiftWorkspace.openDailyShiftCmd.

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
