/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.ts" enhancement="_blank"/>
export type DailyShiftStatus = 'open' | 'closed';

export interface DailyShift {
  dailyShiftId: string;
  shiftDate: string;
  status: DailyShiftStatus;
  openedByUserId: string;
  closedByUserId: string | null;
  openedAt: string;
  closedAt: string | null;
  totalOrders: number | null;
  totalSalesAmount: number | null;
  totalItemsSold: number | null;
  cashTotal: number | null;
  otherPaymentsTotal: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export const DAILY_SHIFT_STATUS_TRANSITIONS: Record<DailyShiftStatus, DailyShiftStatus[]> = {
  open: ['closed'],
  closed: [],
};

export function canTransitionDailyShift(from: DailyShiftStatus, to: DailyShiftStatus): boolean {
  return DAILY_SHIFT_STATUS_TRANSITIONS[from]?.includes(to) ?? false;
}

export function isDailyShiftImmutable(status: DailyShiftStatus): boolean {
  return status === 'closed';
}

export function dailyShiftClosureFieldsValid(
  shift: Pick<DailyShift, 'status' | 'closedByUserId' | 'closedAt'>,
): boolean {
  if (shift.status === 'closed') {
    return shift.closedByUserId != null && shift.closedAt != null;
  }
  return shift.closedByUserId == null && shift.closedAt == null;
}

export function dailyShiftClosedAtAfterOpenedAt(
  shift: Pick<DailyShift, 'status' | 'openedAt' | 'closedAt'>,
): boolean {
  if (shift.status !== 'closed' || shift.closedAt == null) {
    return true;
  }
  return shift.closedAt >= shift.openedAt;
}

export function dailyShiftUpdatedAtAfterCreatedAt(
  shift: Pick<DailyShift, 'createdAt' | 'updatedAt'>,
): boolean {
  return shift.updatedAt >= shift.createdAt;
}

function calendarDateOf(isoDateTime: string): string {
  return isoDateTime.slice(0, 10);
}

export function dailyShiftOpenedAtMatchesShiftDate(
  shift: Pick<DailyShift, 'shiftDate' | 'openedAt'>,
): boolean {
  return calendarDateOf(shift.openedAt) === shift.shiftDate;
}

export function dailyShiftClosedAtMatchesShiftDate(
  shift: Pick<DailyShift, 'status' | 'shiftDate' | 'closedAt'>,
): boolean {
  if (shift.status !== 'closed' || shift.closedAt == null) {
    return true;
  }
  return calendarDateOf(shift.closedAt) === shift.shiftDate;
}

export function dailyShiftNonNegativeCounts(
  shift: Pick<DailyShift, 'totalOrders' | 'totalItemsSold'>,
): boolean {
  if (shift.totalOrders != null && shift.totalOrders < 0) {
    return false;
  }
  if (shift.totalItemsSold != null && shift.totalItemsSold < 0) {
    return false;
  }
  return true;
}

export function dailyShiftNonNegativeAmounts(
  shift: Pick<DailyShift, 'totalSalesAmount' | 'cashTotal' | 'otherPaymentsTotal'>,
): boolean {
  if (shift.totalSalesAmount != null && shift.totalSalesAmount < 0) {
    return false;
  }
  if (shift.cashTotal != null && shift.cashTotal < 0) {
    return false;
  }
  if (shift.otherPaymentsTotal != null && shift.otherPaymentsTotal < 0) {
    return false;
  }
  return true;
}

export function dailyShiftPaymentTotalsConsistent(
  shift: Pick<DailyShift, 'status' | 'cashTotal' | 'otherPaymentsTotal' | 'totalSalesAmount'>,
): boolean {
  if (shift.status !== 'closed') {
    return true;
  }
  if (
    shift.cashTotal == null ||
    shift.otherPaymentsTotal == null ||
    shift.totalSalesAmount == null
  ) {
    return true;
  }
  return shift.cashTotal + shift.otherPaymentsTotal === shift.totalSalesAmount;
}

export function dailyShiftZeroOrdersImpliesZeroSales(
  shift: Pick<DailyShift, 'totalOrders' | 'totalSalesAmount' | 'totalItemsSold'>,
): boolean {
  const orders = shift.totalOrders ?? 0;
  if (orders !== 0) {
    return true;
  }
  const salesOk = shift.totalSalesAmount == null || shift.totalSalesAmount === 0;
  const itemsOk = shift.totalItemsSold == null || shift.totalItemsSold === 0;
  return salesOk && itemsOk;
}
