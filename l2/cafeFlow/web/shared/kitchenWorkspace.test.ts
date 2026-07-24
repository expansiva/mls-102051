/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.test.ts" enhancement="_102020_/l2/enhancementAura"/>

import type { CafeFlowKitchenWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.js';
import type { ChangeOrderStatusInput, ChangeOrderStatusOutput, FetchKitchenQueueInput, FetchKitchenQueueOutput } from '/_102051_/l2/cafeFlow/web/contracts/kitchenWorkspace.js';

type IsAny<T> = 0 extends (1 & T) ? true : false;
type Assignable<Actual, Expected> = IsAny<Actual> extends true ? false : [Actual] extends [Expected] ? true : false;
type Assert<T extends true> = T;

declare const page: CafeFlowKitchenWorkspaceBase;

// This file is generated from .defs.ts. Add narrower state/action assertions here as materialization rules evolve.
type _State_status = Assert<Assignable<typeof page.status, string>>;
type _State_fetchKitchenQueueState = Assert<Assignable<typeof page.fetchKitchenQueueState, "idle" | "loading" | "success" | "error">>;
type _State_fetchKitchenQueueDailyShiftId = Assert<Assignable<typeof page.fetchKitchenQueueDailyShiftId, string | FetchKitchenQueueInput["dailyShiftId"]>>;
type _State_fetchKitchenQueueData = Assert<Assignable<typeof page.fetchKitchenQueueData, unknown[] | FetchKitchenQueueOutput>>;
type _State_changeOrderStatusState = Assert<Assignable<typeof page.changeOrderStatusState, "idle" | "loading" | "success" | "error">>;
type _State_changeOrderStatusOrderId = Assert<Assignable<typeof page.changeOrderStatusOrderId, string | ChangeOrderStatusInput["orderId"]>>;
type _State_changeOrderStatusStatus = Assert<Assignable<typeof page.changeOrderStatusStatus, string | ChangeOrderStatusInput["status"]>>;
type _State_changeOrderStatusCancellationReason = Assert<Assignable<typeof page.changeOrderStatusCancellationReason, string | ChangeOrderStatusInput["cancellationReason"]>>;
type _State_changeOrderStatusUpdatedAt = Assert<Assignable<typeof page.changeOrderStatusUpdatedAt, string | ChangeOrderStatusInput["updatedAt"]>>;
type _State_changeOrderStatusOutput = Assert<Assignable<typeof page.changeOrderStatusOutput, ChangeOrderStatusOutput | null>>;
type _State_changeOrderStatusError = Assert<Assignable<typeof page.changeOrderStatusError, string>>;
type _Action_loadFetchKitchenQueue = Assert<Assignable<typeof page.loadFetchKitchenQueue, (...args: any[]) => unknown>>;
type _Handler_handleFetchKitchenQueueClick = Assert<Assignable<typeof page.handleFetchKitchenQueueClick, (...args: any[]) => unknown>>;
type _Action_changeOrderStatus = Assert<Assignable<typeof page.changeOrderStatus, (...args: any[]) => unknown>>;
type _Handler_handleChangeOrderStatusClick = Assert<Assignable<typeof page.handleChangeOrderStatusClick, (...args: any[]) => unknown>>;
type _Action_setFetchKitchenQueueDailyShiftId = Assert<Assignable<typeof page.setFetchKitchenQueueDailyShiftId, (...args: any[]) => unknown>>;
type _Handler_handleFetchKitchenQueueDailyShiftIdChange = Assert<Assignable<typeof page.handleFetchKitchenQueueDailyShiftIdChange, (...args: any[]) => unknown>>;
type _Action_setChangeOrderStatusOrderId = Assert<Assignable<typeof page.setChangeOrderStatusOrderId, (...args: any[]) => unknown>>;
type _Handler_handleChangeOrderStatusOrderIdChange = Assert<Assignable<typeof page.handleChangeOrderStatusOrderIdChange, (...args: any[]) => unknown>>;
type _Action_setChangeOrderStatusStatus = Assert<Assignable<typeof page.setChangeOrderStatusStatus, (...args: any[]) => unknown>>;
type _Handler_handleChangeOrderStatusStatusChange = Assert<Assignable<typeof page.handleChangeOrderStatusStatusChange, (...args: any[]) => unknown>>;
type _Action_setChangeOrderStatusCancellationReason = Assert<Assignable<typeof page.setChangeOrderStatusCancellationReason, (...args: any[]) => unknown>>;
type _Handler_handleChangeOrderStatusCancellationReasonChange = Assert<Assignable<typeof page.handleChangeOrderStatusCancellationReasonChange, (...args: any[]) => unknown>>;
type _Action_setChangeOrderStatusUpdatedAt = Assert<Assignable<typeof page.setChangeOrderStatusUpdatedAt, (...args: any[]) => unknown>>;
type _Handler_handleChangeOrderStatusUpdatedAtChange = Assert<Assignable<typeof page.handleChangeOrderStatusUpdatedAtChange, (...args: any[]) => unknown>>;

export {};