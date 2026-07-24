/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/shiftWorkspace.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { CafeFlowShiftWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/shiftWorkspace.js';
import type { CloseDailyShiftCmdInput, CloseDailyShiftCmdOutput, GetShiftClosingReportInput, GetShiftClosingReportOutput, OpenDailyShiftCmdInput, OpenDailyShiftCmdOutput } from '/_102051_/l2/cafeFlow/web/contracts/shiftWorkspace.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowShiftWorkspaceBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_openDailyShiftCmdState = Assert<Assignable<typeof page.openDailyShiftCmdState, "idle" | "loading" | "success" | "error">>;
type _State_openDailyShiftCmdShiftDate = Assert<Assignable<typeof page.openDailyShiftCmdShiftDate, string | OpenDailyShiftCmdInput["shiftDate"]>>;
type _State_openDailyShiftCmdOpenedByUserId = Assert<Assignable<typeof page.openDailyShiftCmdOpenedByUserId, string | OpenDailyShiftCmdInput["openedByUserId"]>>;
type _State_openDailyShiftCmdNotes = Assert<Assignable<typeof page.openDailyShiftCmdNotes, string | OpenDailyShiftCmdInput["notes"]>>;
type _State_openDailyShiftCmdOutput = Assert<Assignable<typeof page.openDailyShiftCmdOutput, OpenDailyShiftCmdOutput | null>>;
type _State_openDailyShiftCmdError = Assert<Assignable<typeof page.openDailyShiftCmdError, string>>;
type _State_closeDailyShiftCmdState = Assert<Assignable<typeof page.closeDailyShiftCmdState, "idle" | "loading" | "success" | "error">>;
type _State_closeDailyShiftCmdDailyShiftId = Assert<Assignable<typeof page.closeDailyShiftCmdDailyShiftId, string | CloseDailyShiftCmdInput["dailyShiftId"]>>;
type _State_closeDailyShiftCmdCashTotal = Assert<Assignable<typeof page.closeDailyShiftCmdCashTotal, string | CloseDailyShiftCmdInput["cashTotal"]>>;
type _State_closeDailyShiftCmdOtherPaymentsTotal = Assert<Assignable<typeof page.closeDailyShiftCmdOtherPaymentsTotal, string | CloseDailyShiftCmdInput["otherPaymentsTotal"]>>;
type _State_closeDailyShiftCmdNotes = Assert<Assignable<typeof page.closeDailyShiftCmdNotes, string | CloseDailyShiftCmdInput["notes"]>>;
type _State_closeDailyShiftCmdClosedByUserId = Assert<Assignable<typeof page.closeDailyShiftCmdClosedByUserId, string | CloseDailyShiftCmdInput["closedByUserId"]>>;
type _State_closeDailyShiftCmdClosedAt = Assert<Assignable<typeof page.closeDailyShiftCmdClosedAt, string | CloseDailyShiftCmdInput["closedAt"]>>;
type _State_closeDailyShiftCmdOutput = Assert<Assignable<typeof page.closeDailyShiftCmdOutput, CloseDailyShiftCmdOutput | null>>;
type _State_closeDailyShiftCmdError = Assert<Assignable<typeof page.closeDailyShiftCmdError, string>>;
type _State_getShiftClosingReportState = Assert<Assignable<typeof page.getShiftClosingReportState, "idle" | "loading" | "success" | "error">>;
type _State_getShiftClosingReportShiftClosingReportId = Assert<Assignable<typeof page.getShiftClosingReportShiftClosingReportId, string | GetShiftClosingReportInput["shiftClosingReportId"]>>;
type _State_getShiftClosingReportData = Assert<Assignable<typeof page.getShiftClosingReportData, GetShiftClosingReportOutput | null>>;
type _Action_openDailyShiftCmd = Assert<Assignable<typeof page.openDailyShiftCmd, (...args: any[]) => unknown>>;
type _Handler_handleOpenDailyShiftCmdClick = Assert<Assignable<typeof page.handleOpenDailyShiftCmdClick, (...args: any[]) => unknown>>;
type _Action_closeDailyShiftCmd = Assert<Assignable<typeof page.closeDailyShiftCmd, (...args: any[]) => unknown>>;
type _Handler_handleCloseDailyShiftCmdClick = Assert<Assignable<typeof page.handleCloseDailyShiftCmdClick, (...args: any[]) => unknown>>;
type _Action_loadGetShiftClosingReport = Assert<Assignable<typeof page.loadGetShiftClosingReport, (...args: any[]) => unknown>>;
type _Handler_handleGetShiftClosingReportClick = Assert<Assignable<typeof page.handleGetShiftClosingReportClick, (...args: any[]) => unknown>>;
type _Action_setOpenDailyShiftCmdShiftDate = Assert<Assignable<typeof page.setOpenDailyShiftCmdShiftDate, (...args: any[]) => unknown>>;
type _Handler_handleOpenDailyShiftCmdShiftDateChange = Assert<Assignable<typeof page.handleOpenDailyShiftCmdShiftDateChange, (...args: any[]) => unknown>>;
type _Action_setOpenDailyShiftCmdOpenedByUserId = Assert<Assignable<typeof page.setOpenDailyShiftCmdOpenedByUserId, (...args: any[]) => unknown>>;
type _Handler_handleOpenDailyShiftCmdOpenedByUserIdChange = Assert<Assignable<typeof page.handleOpenDailyShiftCmdOpenedByUserIdChange, (...args: any[]) => unknown>>;
type _Action_setOpenDailyShiftCmdNotes = Assert<Assignable<typeof page.setOpenDailyShiftCmdNotes, (...args: any[]) => unknown>>;
type _Handler_handleOpenDailyShiftCmdNotesChange = Assert<Assignable<typeof page.handleOpenDailyShiftCmdNotesChange, (...args: any[]) => unknown>>;
type _Action_setCloseDailyShiftCmdDailyShiftId = Assert<Assignable<typeof page.setCloseDailyShiftCmdDailyShiftId, (...args: any[]) => unknown>>;
type _Handler_handleCloseDailyShiftCmdDailyShiftIdChange = Assert<Assignable<typeof page.handleCloseDailyShiftCmdDailyShiftIdChange, (...args: any[]) => unknown>>;
type _Action_setCloseDailyShiftCmdCashTotal = Assert<Assignable<typeof page.setCloseDailyShiftCmdCashTotal, (...args: any[]) => unknown>>;
type _Handler_handleCloseDailyShiftCmdCashTotalChange = Assert<Assignable<typeof page.handleCloseDailyShiftCmdCashTotalChange, (...args: any[]) => unknown>>;
type _Action_setCloseDailyShiftCmdOtherPaymentsTotal = Assert<Assignable<typeof page.setCloseDailyShiftCmdOtherPaymentsTotal, (...args: any[]) => unknown>>;
type _Handler_handleCloseDailyShiftCmdOtherPaymentsTotalChange = Assert<Assignable<typeof page.handleCloseDailyShiftCmdOtherPaymentsTotalChange, (...args: any[]) => unknown>>;
type _Action_setCloseDailyShiftCmdNotes = Assert<Assignable<typeof page.setCloseDailyShiftCmdNotes, (...args: any[]) => unknown>>;
type _Handler_handleCloseDailyShiftCmdNotesChange = Assert<Assignable<typeof page.handleCloseDailyShiftCmdNotesChange, (...args: any[]) => unknown>>;
type _Action_setCloseDailyShiftCmdClosedByUserId = Assert<Assignable<typeof page.setCloseDailyShiftCmdClosedByUserId, (...args: any[]) => unknown>>;
type _Handler_handleCloseDailyShiftCmdClosedByUserIdChange = Assert<Assignable<typeof page.handleCloseDailyShiftCmdClosedByUserIdChange, (...args: any[]) => unknown>>;
type _Action_setCloseDailyShiftCmdClosedAt = Assert<Assignable<typeof page.setCloseDailyShiftCmdClosedAt, (...args: any[]) => unknown>>;
type _Handler_handleCloseDailyShiftCmdClosedAtChange = Assert<Assignable<typeof page.handleCloseDailyShiftCmdClosedAtChange, (...args: any[]) => unknown>>;
type _Action_setGetShiftClosingReportShiftClosingReportId = Assert<Assignable<typeof page.setGetShiftClosingReportShiftClosingReportId, (...args: any[]) => unknown>>;
type _Handler_handleGetShiftClosingReportShiftClosingReportIdChange = Assert<Assignable<typeof page.handleGetShiftClosingReportShiftClosingReportIdChange, (...args: any[]) => unknown>>;

export {};