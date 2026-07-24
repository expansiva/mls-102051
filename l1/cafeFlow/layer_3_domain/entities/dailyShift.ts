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

export function dailyShiftHasOpenIdentity(
  shift: Pick<DailyShift, 'openedByUserId' | 'openedAt'>,
): boolean {
  return Boolean(shift.openedByUserId) && Boolean(shift.openedAt);
}

export function dailyShiftCloseFieldsConsistent(
  shift: Pick<DailyShift, 'closedByUserId' | 'closedAt'>,
): boolean {
  const hasClosedBy = shift.closedByUserId != null;
  const hasClosedAt = shift.closedAt != null;
  return hasClosedBy === hasClosedAt;
}

export function dailyShiftOpenStatusHasNoCloseFields(
  shift: Pick<DailyShift, 'status' | 'closedByUserId' | 'closedAt'>,
): boolean {
  if (shift.status !== 'open') {
    return true;
  }
  return shift.closedByUserId == null && shift.closedAt == null;
}

export function dailyShiftClosedStatusHasCloseFields(
  shift: Pick<DailyShift, 'status' | 'closedByUserId' | 'closedAt'>,
): boolean {
  if (shift.status !== 'closed') {
    return true;
  }
  return shift.closedByUserId != null && shift.closedAt != null;
}

export function dailyShiftClosedAtAfterOpenedAt(
  shift: Pick<DailyShift, 'openedAt' | 'closedAt'>,
): boolean {
  if (shift.closedAt == null) {
    return true;
  }
  return shift.closedAt >= shift.openedAt;
}

export function dailyShiftNonNegativeTotals(
  shift: Pick<
    DailyShift,
    'totalOrders' | 'totalItemsSold' | 'totalSalesAmount' | 'cashTotal' | 'otherPaymentsTotal'
  >,
): boolean {
  const values = [
    shift.totalOrders,
    shift.totalItemsSold,
    shift.totalSalesAmount,
    shift.cashTotal,
    shift.otherPaymentsTotal,
  ];
  return values.every((value) => value == null || value >= 0);
}

export function dailyShiftPaymentTotalsMatchSales(
  shift: Pick<DailyShift, 'totalSalesAmount' | 'cashTotal' | 'otherPaymentsTotal'>,
): boolean {
  if (
    shift.totalSalesAmount == null ||
    shift.cashTotal == null ||
    shift.otherPaymentsTotal == null
  ) {
    return true;
  }
  return shift.cashTotal + shift.otherPaymentsTotal === shift.totalSalesAmount;
}

export function dailyShiftUpdatedAtAfterCreatedAt(
  shift: Pick<DailyShift, 'createdAt' | 'updatedAt'>,
): boolean {
  return shift.updatedAt >= shift.createdAt;
}
