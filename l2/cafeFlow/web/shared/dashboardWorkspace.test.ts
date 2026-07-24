/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { CafeFlowDashboardWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.js';
import type { GetAiPromotionSuggestionsInput, GetAiPromotionSuggestionsOutput, GetAiSalesSummaryInput, GetAiSalesSummaryOutput, GetDashboardInput, GetDashboardOutput } from '/_102051_/l2/cafeFlow/web/contracts/dashboardWorkspace.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowDashboardWorkspaceBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_getDashboardState = Assert<Assignable<typeof page.getDashboardState, "idle" | "loading" | "success" | "error">>;
type _State_getDashboardDailyShiftId = Assert<Assignable<typeof page.getDashboardDailyShiftId, string | GetDashboardInput["dailyShiftId"]>>;
type _State_getDashboardData = Assert<Assignable<typeof page.getDashboardData, GetDashboardOutput | null>>;
type _State_getAiSalesSummaryState = Assert<Assignable<typeof page.getAiSalesSummaryState, "idle" | "loading" | "success" | "error">>;
type _State_getAiSalesSummaryOperationalDashboardId = Assert<Assignable<typeof page.getAiSalesSummaryOperationalDashboardId, string | GetAiSalesSummaryInput["operationalDashboardId"]>>;
type _State_getAiSalesSummaryData = Assert<Assignable<typeof page.getAiSalesSummaryData, GetAiSalesSummaryOutput | null>>;
type _State_getAiPromotionSuggestionsState = Assert<Assignable<typeof page.getAiPromotionSuggestionsState, "idle" | "loading" | "success" | "error">>;
type _State_getAiPromotionSuggestionsOperationalDashboardId = Assert<Assignable<typeof page.getAiPromotionSuggestionsOperationalDashboardId, string | GetAiPromotionSuggestionsInput["operationalDashboardId"]>>;
type _State_getAiPromotionSuggestionsData = Assert<Assignable<typeof page.getAiPromotionSuggestionsData, unknown[] | GetAiPromotionSuggestionsOutput>>;
type _Action_loadGetDashboard = Assert<Assignable<typeof page.loadGetDashboard, (...args: any[]) => unknown>>;
type _Handler_handleGetDashboardClick = Assert<Assignable<typeof page.handleGetDashboardClick, (...args: any[]) => unknown>>;
type _Action_loadGetAiSalesSummary = Assert<Assignable<typeof page.loadGetAiSalesSummary, (...args: any[]) => unknown>>;
type _Handler_handleGetAiSalesSummaryClick = Assert<Assignable<typeof page.handleGetAiSalesSummaryClick, (...args: any[]) => unknown>>;
type _Action_loadGetAiPromotionSuggestions = Assert<Assignable<typeof page.loadGetAiPromotionSuggestions, (...args: any[]) => unknown>>;
type _Handler_handleGetAiPromotionSuggestionsClick = Assert<Assignable<typeof page.handleGetAiPromotionSuggestionsClick, (...args: any[]) => unknown>>;
type _Action_setGetDashboardDailyShiftId = Assert<Assignable<typeof page.setGetDashboardDailyShiftId, (...args: any[]) => unknown>>;
type _Handler_handleGetDashboardDailyShiftIdChange = Assert<Assignable<typeof page.handleGetDashboardDailyShiftIdChange, (...args: any[]) => unknown>>;
type _Action_setGetAiSalesSummaryOperationalDashboardId = Assert<Assignable<typeof page.setGetAiSalesSummaryOperationalDashboardId, (...args: any[]) => unknown>>;
type _Handler_handleGetAiSalesSummaryOperationalDashboardIdChange = Assert<Assignable<typeof page.handleGetAiSalesSummaryOperationalDashboardIdChange, (...args: any[]) => unknown>>;
type _Action_setGetAiPromotionSuggestionsOperationalDashboardId = Assert<Assignable<typeof page.setGetAiPromotionSuggestionsOperationalDashboardId, (...args: any[]) => unknown>>;
type _Handler_handleGetAiPromotionSuggestionsOperationalDashboardIdChange = Assert<Assignable<typeof page.handleGetAiPromotionSuggestionsOperationalDashboardIdChange, (...args: any[]) => unknown>>;

export {};