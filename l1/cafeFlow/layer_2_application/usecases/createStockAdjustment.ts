/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createStockAdjustment.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { IStockAdjustmentRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.js';
import type {
  StockAdjustment,
  StockAdjustmentDirection,
  StockAdjustmentReason,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.js';

export interface CreateStockAdjustmentInput {
  stockItemId: string;
  quantity: number;
  direction: string;
  reason: string;
  notes?: string;
}

export interface CreateStockAdjustmentOutput {
  stockAdjustmentId: string;
  stockItemId: string;
  quantity: number;
  direction: string;
  reason: string;
  managerUserId: string;
  shiftId?: string;
  resultingBalance: number;
  notes?: string;
  status: string;
  createdAt: string;
}

const VALID_DIRECTIONS: ReadonlySet<string> = new Set(['in', 'out', 'correction']);
const VALID_REASONS: ReadonlySet<string> = new Set([
  'count',
  'loss',
  'expiration',
  'divergence',
  'other',
]);

function readCurrentBalance(details: unknown): number {
  const root = (details ?? {}) as unknown as Record<string, unknown>;
  const cafeFlow = (root.cafeFlow ?? {}) as unknown as Record<string, unknown>;
  if (typeof cafeFlow.currentBalance === 'number') {
    return cafeFlow.currentBalance;
  }
  if (typeof root.currentBalance === 'number') {
    return root.currentBalance;
  }
  return 0;
}

function computeResultingBalance(
  currentBalance: number,
  direction: StockAdjustmentDirection,
  quantity: number,
): number {
  if (direction === 'in') {
    return currentBalance + quantity;
  }
  if (direction === 'out') {
    return currentBalance - quantity;
  }
  // correction: inventory count sets absolute balance
  return quantity;
}

export async function createStockAdjustment(
  ctx: RequestContext,
  input: CreateStockAdjustmentInput,
): Promise<CreateStockAdjustmentOutput> {
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
  const stockAdjustments = resolveRepository<IStockAdjustmentRepository>(ctx, 'StockAdjustment');

  const managerUserId = ctx.sessionContext.actorId;
  // rule: managerManualStockAdjustmentAllowed
  if (!managerUserId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'managerManualStockAdjustmentAllowed: only an authenticated manager may perform manual stock adjustments.',
      400,
      { ruleId: 'managerManualStockAdjustmentAllowed' },
    );
  }

  if (!VALID_DIRECTIONS.has(input.direction)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'direction must be one of in|out|correction.',
      400,
      { direction: input.direction },
    );
  }
  if (!VALID_REASONS.has(input.reason)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'reason must be one of count|loss|expiration|divergence|other.',
      400,
      { reason: input.reason },
    );
  }
  if (!(typeof input.quantity === 'number') || !(input.quantity > 0)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'quantity must be greater than 0.',
      400,
      { quantity: input.quantity },
    );
  }

  const direction = input.direction as StockAdjustmentDirection;
  const reason = input.reason as StockAdjustmentReason;

  const openShifts = await dailyShifts.list({ status: 'open' });
  const openShift = openShifts[0] ?? null;
  const shiftId = openShift?.dailyShiftId ?? null;

  let stockItemEntity;
  try {
    stockItemEntity = await ctx.mdm.entity.get({ mdmId: input.stockItemId });
  } catch {
    throw new AppError('NOT_FOUND', `MDM record not found: ${input.stockItemId}`, 404, {
      mdmId: input.stockItemId,
    });
  }

  const currentBalance = readCurrentBalance(stockItemEntity.details);
  const resultingBalance = computeResultingBalance(currentBalance, direction, input.quantity);
  if (direction === 'out' && resultingBalance < 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'resultingBalance would be negative for out adjustment.',
      400,
      { currentBalance, quantity: input.quantity, resultingBalance },
    );
  }

  const now = ctx.clock.nowIso();
  const stockAdjustmentId = ctx.idGenerator.newId();
  const notes = input.notes ?? null;

  const adjustment: StockAdjustment = {
    stockAdjustmentId,
    stockItemId: input.stockItemId,
    quantity: input.quantity,
    direction,
    reason,
    managerUserId,
    shiftId,
    resultingBalance,
    notes,
    status: 'posted',
    createdAt: now,
    voidedAt: null,
    voidedByUserId: null,
    compensatingAdjustmentId: null,
  };

  const detailsRoot = (stockItemEntity.details ?? {}) as unknown as Record<string, unknown>;
  const existingCafeFlow = (detailsRoot.cafeFlow ?? {}) as unknown as Record<string, unknown>;

  await ctx.data.runInTransaction(async () => {
    await stockAdjustments.append(adjustment);
    await ctx.mdm.entity.update({
      mdmId: input.stockItemId,
      expectedVersion: stockItemEntity.version,
      patch: {
        cafeFlow: {
          ...existingCafeFlow,
          currentBalance: resultingBalance,
        },
      } as unknown as Partial<import('/_102034_/l1/mdm/module.js').MdmDetailRecord>,
    });
  });

  const output: CreateStockAdjustmentOutput = {
    stockAdjustmentId: adjustment.stockAdjustmentId,
    stockItemId: adjustment.stockItemId,
    quantity: adjustment.quantity,
    direction: adjustment.direction,
    reason: adjustment.reason,
    managerUserId: adjustment.managerUserId,
    resultingBalance: adjustment.resultingBalance,
    status: adjustment.status,
    createdAt: adjustment.createdAt,
  };
  if (adjustment.shiftId != null) {
    output.shiftId = adjustment.shiftId;
  }
  if (adjustment.notes != null) {
    output.notes = adjustment.notes;
  }
  return output;
}
