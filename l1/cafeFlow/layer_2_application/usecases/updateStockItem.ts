/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateStockItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import type { MdmDetailRecord } from '/_102034_/l1/mdm/module.js';

export interface UpdateStockItemInput {
  stockItemId: string;
  name: string;
  unit: string;
  minimumLevel: number;
  description?: string;
}

export interface UpdateStockItemOutput {
  stockItemId: string;
  name: string;
  unit: string;
  currentBalance: number;
  minimumLevel: number;
  description?: string;
  updatedAt: string;
}

const ALLOWED_UNITS = new Set(['kg', 'liter', 'portion', 'unit']);

interface CafeFlowStockItemDetails {
  unit?: string;
  currentBalance?: number;
  minimumLevel?: number;
  description?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export async function updateStockItem(
  ctx: RequestContext,
  input: UpdateStockItemInput,
): Promise<UpdateStockItemOutput> {
  const name = (input.name ?? '').trim();
  if (!name) {
    throw new AppError('VALIDATION_ERROR', 'name must be non-empty.', 400, {
      field: 'name',
    });
  }

  if (!ALLOWED_UNITS.has(input.unit)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'unit must be one of kg|liter|portion|unit.',
      400,
      { field: 'unit', unit: input.unit },
    );
  }

  if (!Number.isFinite(input.minimumLevel) || input.minimumLevel < 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'minimumLevel must be a finite number >= 0.',
      400,
      { field: 'minimumLevel', minimumLevel: input.minimumLevel },
    );
  }

  const updatedAt = ctx.clock.nowIso();

  let entity;
  try {
    entity = await ctx.mdm.entity.get({ mdmId: input.stockItemId });
  } catch (err) {
    if (err instanceof AppError && err.code === 'NOT_FOUND') {
      throw new AppError('NOT_FOUND', `StockItem not found: ${input.stockItemId}`, 404, {
        stockItemId: input.stockItemId,
      });
    }
    throw err;
  }

  const details = entity.details as unknown as MdmDetailRecord & {
    cafeFlow?: CafeFlowStockItemDetails;
  };
  const cafeFlow = (details.cafeFlow ?? {}) as CafeFlowStockItemDetails;

  const currentBalance =
    typeof cafeFlow.currentBalance === 'number' && Number.isFinite(cafeFlow.currentBalance)
      ? cafeFlow.currentBalance
      : 0;
  const createdAt =
    typeof cafeFlow.createdAt === 'string' && cafeFlow.createdAt.length > 0
      ? cafeFlow.createdAt
      : entity.index.createdAt;
  const description =
    input.description !== undefined
      ? input.description
      : cafeFlow.description ?? null;

  // rule: lowStockMustBeVisible — after update, when currentBalance < minimumLevel the item
  // remains eligible for low-stock highlight (derived from balance vs minimumLevel; no flag; do not mutate currentBalance)
  void (currentBalance < input.minimumLevel);

  const updated = await ctx.mdm.entity.update({
    mdmId: input.stockItemId,
    expectedVersion: entity.version,
    patch: {
      name,
      cafeFlow: {
        ...cafeFlow,
        unit: input.unit,
        minimumLevel: input.minimumLevel,
        description,
        currentBalance,
        createdAt,
        updatedAt,
      },
    } as unknown as Partial<MdmDetailRecord>,
  });

  const outDetails = updated.details as unknown as MdmDetailRecord & {
    cafeFlow?: CafeFlowStockItemDetails;
  };
  const outCafe = (outDetails.cafeFlow ?? {}) as CafeFlowStockItemDetails;
  const outDescription =
    outCafe.description === null || outCafe.description === undefined
      ? undefined
      : outCafe.description;

  return {
    stockItemId: updated.mdmId,
    name: typeof outDetails.name === 'string' ? outDetails.name : name,
    unit: typeof outCafe.unit === 'string' ? outCafe.unit : input.unit,
    currentBalance:
      typeof outCafe.currentBalance === 'number' ? outCafe.currentBalance : currentBalance,
    minimumLevel:
      typeof outCafe.minimumLevel === 'number' ? outCafe.minimumLevel : input.minimumLevel,
    description: outDescription,
    updatedAt: typeof outCafe.updatedAt === 'string' ? outCafe.updatedAt : updatedAt,
  };
}
