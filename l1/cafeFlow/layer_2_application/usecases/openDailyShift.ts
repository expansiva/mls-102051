/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/openDailyShift.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { DailyShift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.js';
import { dailyShiftHasOpenIdentity } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.js';

export interface OpenDailyShiftInput {
  shiftDate: string;
  notes?: string;
}

export interface OpenDailyShiftOutput {
  dailyShiftId: string;
  shiftDate: string;
  status: string;
  openedByUserId: string;
  openedAt: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export async function openDailyShift(
  ctx: RequestContext,
  input: OpenDailyShiftInput,
): Promise<OpenDailyShiftOutput> {
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');

  const openedByUserId = ctx.sessionContext.actorId;
  if (!openedByUserId) {
    throw new AppError('VALIDATION_ERROR', 'Actor session is required to open a daily shift.', 400);
  }

  const now = ctx.clock.nowIso();
  const dailyShiftId = ctx.idGenerator.newId();

  const existingOpen = await dailyShifts.list({ status: 'open' });
  if (existingOpen.length > 0) {
    // rule: ordersRequireOpenDailyShift — only one open shift allowed at a time
    throw new AppError(
      'VALIDATION_ERROR',
      'ordersRequireOpenDailyShift: already exists an open daily shift; only one open shift is allowed.',
      400,
      { ruleId: 'ordersRequireOpenDailyShift', openDailyShiftIds: existingOpen.map((s) => s.dailyShiftId) },
    );
  }

  const dailyShift: DailyShift = {
    dailyShiftId,
    shiftDate: input.shiftDate,
    status: 'open',
    openedByUserId,
    closedByUserId: null,
    openedAt: now,
    closedAt: null,
    totalOrders: null,
    totalSalesAmount: null,
    totalItemsSold: null,
    cashTotal: null,
    otherPaymentsTotal: null,
    notes: input.notes ?? null,
    createdAt: now,
    updatedAt: now,
  };

  if (!dailyShiftHasOpenIdentity(dailyShift)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'Daily shift must have openedByUserId and openedAt.',
      400,
    );
  }

  await ctx.data.runInTransaction(async () => {
    await dailyShifts.save(dailyShift);
  });

  return {
    dailyShiftId: dailyShift.dailyShiftId,
    shiftDate: dailyShift.shiftDate,
    status: dailyShift.status,
    openedByUserId: dailyShift.openedByUserId,
    openedAt: dailyShift.openedAt,
    notes: dailyShift.notes ?? undefined,
    createdAt: dailyShift.createdAt,
    updatedAt: dailyShift.updatedAt,
  };
}
