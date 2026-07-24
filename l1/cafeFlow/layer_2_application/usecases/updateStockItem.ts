/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateStockItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

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
  currentBalance?: number;
  minimumLevel?: number;
  description?: string | null;
  unit?: string;
  updatedAt?: string;
  createdAt?: string;
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

  const unit = (input.unit ?? '').trim();
  if (!ALLOWED_UNITS.has(unit)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'unit must be one of: kg, liter, portion, unit.',
      400,
      { field: 'unit', value: input.unit },
    );
  }

  if (typeof input.minimumLevel !== 'number' || Number.isNaN(input.minimumLevel) || input.minimumLevel < 0) {
    throw new AppError('VALIDATION_ERROR', 'minimumLevel must be >= 0.', 400, {
      field: 'minimumLevel',
      value: input.minimumLevel,
    });
  }

  const existing = await ctx.mdm.entity.get({ mdmId: input.stockItemId });
  const details = (existing.details ?? {}) as unknown as Record<string, unknown>;
  const moduleDetails = ((details.cafeFlow ?? {}) as unknown as CafeFlowStockItemDetails) ?? {};

  // Do not modify currentBalance — cadastral update only
  const currentBalance =
    typeof moduleDetails.currentBalance === 'number' ? moduleDetails.currentBalance : 0;

  const updatedAt = ctx.clock.nowIso();
  const description =
    input.description !== undefined ? input.description : (moduleDetails.description ?? undefined);

  // rule: lowStockMustBeVisible — after update, if currentBalance < new minimumLevel the item
  // remains eligible for low-stock highlight/alerts (visibility is driven by comparing
  // currentBalance to minimumLevel; do not hide or clear balance)
  const _lowStockVisible = currentBalance < input.minimumLevel;

  const updated = await ctx.mdm.entity.update({
    mdmId: input.stockItemId,
    expectedVersion: existing.version,
    patch: {
      name,
      cafeFlow: {
        ...moduleDetails,
        unit,
        minimumLevel: input.minimumLevel,
        description: description ?? null,
        currentBalance,
        updatedAt,
      },
    } as unknown as Partial<import('/_102034_/l1/mdm/module.js').MdmDetailRecord>,
  });

  const updatedDetails = (updated.details ?? {}) as unknown as Record<string, unknown>;
  const updatedModule = ((updatedDetails.cafeFlow ?? {}) as unknown as CafeFlowStockItemDetails) ?? {};
  const resultBalance =
    typeof updatedModule.currentBalance === 'number' ? updatedModule.currentBalance : currentBalance;
  const resultDescription =
    updatedModule.description === null || updatedModule.description === undefined
      ? description
      : updatedModule.description;

  return {
    stockItemId: updated.mdmId,
    name: typeof updated.details.name === 'string' ? updated.details.name : name,
    unit: typeof updatedModule.unit === 'string' ? updatedModule.unit : unit,
    currentBalance: resultBalance,
    minimumLevel:
      typeof updatedModule.minimumLevel === 'number' ? updatedModule.minimumLevel : input.minimumLevel,
    ...(resultDescription !== undefined && resultDescription !== null
      ? { description: resultDescription }
      : input.description !== undefined
        ? { description: input.description }
        : {}),
    updatedAt:
      typeof updatedModule.updatedAt === 'string' ? updatedModule.updatedAt : updatedAt,
  };
}
