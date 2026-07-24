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

const VALID_DIRECTIONS: readonly StockAdjustmentDirection[] = ['in', 'out', 'correction'];
const VALID_REASONS: readonly StockAdjustmentReason[] = [
  'count',
  'loss',
  'expiration',
  'divergence',
  'other',
];

function isStockAdjustmentDirection(value: string): value is StockAdjustmentDirection {
  return (VALID_DIRECTIONS as readonly string[]).includes(value);
}

function isStockAdjustmentReason(value: string): value is StockAdjustmentReason {
  return (VALID_REASONS as readonly string[]).includes(value);
}

function readCurrentBalance(details: unknown): number {
  const root = (details ?? {}) as unknown as {
    currentBalance?: unknown;
    cafeFlow?: { currentBalance?: unknown };
  };
  const nested = root.cafeFlow?.currentBalance;
  if (typeof nested === 'number' && Number.isFinite(nested)) {
    return nested;
  }
  if (typeof root.currentBalance === 'number' && Number.isFinite(root.currentBalance)) {
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
  // correction: set absolute balance to quantity
  return quantity;
}

export async function createStockAdjustment(
  ctx: RequestContext,
  input: CreateStockAdjustmentInput,
): Promise<CreateStockAdjustmentOutput> {
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
  const stockAdjustments = resolveRepository<IStockAdjustmentRepository>(ctx, 'StockAdjustment');

  const managerUserId = ctx.sessionContext.actorId ?? ctx.sessionContext.actorSession?.actorId;
  if (!managerUserId) {
    throw new AppError(
      'VALIDATION_ERROR',
      'managerUserId is required from the active actor session.',
      400,
      { field: 'managerUserId' },
    );
  }

  // rule: managerManualStockAdjustmentAllowed
  if (!isStockAdjustmentDirection(input.direction)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'managerManualStockAdjustmentAllowed: direction must be one of in, out, correction.',
      400,
      {
        ruleId: 'managerManualStockAdjustmentAllowed',
        field: 'direction',
        value: input.direction,
        allowed: VALID_DIRECTIONS,
      },
    );
  }
  if (!isStockAdjustmentReason(input.reason)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'managerManualStockAdjustmentAllowed: reason must be one of count, loss, expiration, divergence, other.',
      400,
      {
        ruleId: 'managerManualStockAdjustmentAllowed',
        field: 'reason',
        value: input.reason,
        allowed: VALID_REASONS,
      },
    );
  }
  if (!(typeof input.quantity === 'number') || !(input.quantity > 0)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'managerManualStockAdjustmentAllowed: quantity must be greater than zero.',
      400,
      {
        ruleId: 'managerManualStockAdjustmentAllowed',
        field: 'quantity',
        value: input.quantity,
      },
    );
  }

  const direction = input.direction;
  const reason = input.reason;

  const openShifts = await dailyShifts.list({ status: 'open' });
  const openShift = openShifts[0] ?? null;
  const shiftId = openShift?.dailyShiftId;

  const stockItemEntity = await ctx.mdm.entity.get({ mdmId: input.stockItemId });
  const currentBalance = readCurrentBalance(stockItemEntity.details);
  const resultingBalance = computeResultingBalance(currentBalance, direction, input.quantity);

  if (resultingBalance < 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'managerManualStockAdjustmentAllowed: resulting balance cannot be negative.',
      400,
      {
        ruleId: 'managerManualStockAdjustmentAllowed',
        currentBalance,
        quantity: input.quantity,
        direction,
        resultingBalance,
      },
    );
  }

  const now = ctx.clock.nowIso();
  const stockAdjustmentId = ctx.idGenerator.newId();

  const adjustment: StockAdjustment = {
    stockAdjustmentId,
    stockItemId: input.stockItemId,
    quantity: input.quantity,
    direction,
    reason,
    managerUserId,
    shiftId: shiftId ?? null,
    resultingBalance,
    notes: input.notes ?? null,
    status: 'posted',
    voidedAt: null,
    voidedByUserId: null,
    compensatingAdjustmentId: null,
    createdAt: now,
  };

  await ctx.data.runInTransaction(async (tx) => {
    const txCtx: RequestContext = { ...ctx, data: tx };
    const txStockAdjustments = resolveRepository<IStockAdjustmentRepository>(
      txCtx,
      'StockAdjustment',
    );
    await txStockAdjustments.append(adjustment);

    const details = stockItemEntity.details as unknown as {
      cafeFlow?: Record<string, unknown>;
      currentBalance?: unknown;
      [key: string]: unknown;
    };
    const cafeFlowDetails =
      details.cafeFlow && typeof details.cafeFlow === 'object'
        ? { ...details.cafeFlow, currentBalance: resultingBalance }
        : { currentBalance: resultingBalance };

    await ctx.mdm.entity.update({
      mdmId: input.stockItemId,
      expectedVersion: stockItemEntity.version,
      patch: {
        ...details,
        cafeFlow: cafeFlowDetails,
        currentBalance: resultingBalance,
      } as unknown as Partial<typeof stockItemEntity.details>,
    });
  });

  // silence unused binding when only used for type resolution outside tx
  void stockAdjustments;

  return {
    stockAdjustmentId: adjustment.stockAdjustmentId,
    stockItemId: adjustment.stockItemId,
    quantity: adjustment.quantity,
    direction: adjustment.direction,
    reason: adjustment.reason,
    managerUserId: adjustment.managerUserId,
    shiftId: adjustment.shiftId ?? undefined,
    resultingBalance: adjustment.resultingBalance,
    notes: adjustment.notes ?? undefined,
    status: adjustment.status,
    createdAt: adjustment.createdAt,
  };
}
