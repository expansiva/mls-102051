/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createStockItem.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface CreateStockItemInput {
  name: string;
  unit: string;
  currentBalance: number;
  minimumLevel: number;
  description?: string;
}

export interface CreateStockItemOutput {
  stockItemId: string;
  name: string;
  unit: string;
  currentBalance: number;
  minimumLevel: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const ALLOWED_UNITS = new Set(['kg', 'liter', 'portion', 'unit']);

export async function createStockItem(
  ctx: RequestContext,
  input: CreateStockItemInput,
): Promise<CreateStockItemOutput> {
  const name = (input.name ?? '').trim();
  if (!name) {
    throw new AppError('VALIDATION_ERROR', 'name must be non-empty', 400, { name: input.name });
  }

  if (!ALLOWED_UNITS.has(input.unit)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'unit must be one of: kg, liter, portion, unit',
      400,
      { unit: input.unit },
    );
  }

  if (
    typeof input.currentBalance !== 'number' ||
    Number.isNaN(input.currentBalance) ||
    input.currentBalance < 0
  ) {
    throw new AppError(
      'VALIDATION_ERROR',
      'currentBalance must be a non-negative number',
      400,
      { currentBalance: input.currentBalance },
    );
  }

  if (
    typeof input.minimumLevel !== 'number' ||
    Number.isNaN(input.minimumLevel) ||
    input.minimumLevel < 0
  ) {
    throw new AppError(
      'VALIDATION_ERROR',
      'minimumLevel must be a non-negative number',
      400,
      { minimumLevel: input.minimumLevel },
    );
  }

  const description = input.description ?? null;

  // StockItem is MDM-owned; no local repository port.
  const created = await ctx.mdm.entity.create({
    details: {
      subtype: 'Product',
      name,
      status: 'Active',
      moduleTypes: ['cafeFlow.StockItem'],
      tags: ['cafeFlow'],
      cafeFlow: {
        unit: input.unit,
        currentBalance: input.currentBalance,
        minimumLevel: input.minimumLevel,
        description,
      },
    },
  });

  // rule: lowStockMustBeVisible — item is persisted with currentBalance and minimumLevel so it is eligible for low-stock visibility when currentBalance <= minimumLevel

  const moduleDetails = (
    created.details as unknown as {
      cafeFlow?: {
        unit?: string;
        currentBalance?: number;
        minimumLevel?: number;
        description?: string | null;
      };
    }
  ).cafeFlow;

  const output: CreateStockItemOutput = {
    stockItemId: created.mdmId,
    name: created.details.name,
    unit: moduleDetails?.unit ?? input.unit,
    currentBalance: moduleDetails?.currentBalance ?? input.currentBalance,
    minimumLevel: moduleDetails?.minimumLevel ?? input.minimumLevel,
    createdAt: created.index.createdAt,
    updatedAt: created.index.updatedAt,
  };

  const resolvedDescription = moduleDetails?.description ?? description;
  if (resolvedDescription != null && resolvedDescription !== '') {
    output.description = resolvedDescription;
  }

  return output;
}
