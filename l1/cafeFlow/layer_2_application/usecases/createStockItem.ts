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
    throw new AppError('VALIDATION_ERROR', 'name must be non-empty', 400, { field: 'name' });
  }

  if (!ALLOWED_UNITS.has(input.unit)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'unit must be one of: kg, liter, portion, unit',
      400,
      { field: 'unit', value: input.unit },
    );
  }

  if (input.currentBalance < 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'currentBalance must be >= 0',
      400,
      { field: 'currentBalance', value: input.currentBalance },
    );
  }

  if (input.minimumLevel < 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'minimumLevel must be >= 0',
      400,
      { field: 'minimumLevel', value: input.minimumLevel },
    );
  }

  // rule: lowStockMustBeVisible — persist currentBalance and minimumLevel so the item is
  // eligible for low-stock visibility whenever currentBalance <= minimumLevel (no extra flag)
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
        description: input.description ?? null,
      },
    },
  });

  const cafeFlowDetails = (
    created.details as unknown as {
      cafeFlow?: {
        unit?: string;
        currentBalance?: number;
        minimumLevel?: number;
        description?: string | null;
      };
    }
  ).cafeFlow;

  const description = cafeFlowDetails?.description ?? input.description ?? undefined;

  return {
    stockItemId: created.mdmId,
    name: created.details.name,
    unit: cafeFlowDetails?.unit ?? input.unit,
    currentBalance: cafeFlowDetails?.currentBalance ?? input.currentBalance,
    minimumLevel: cafeFlowDetails?.minimumLevel ?? input.minimumLevel,
    ...(description !== undefined && description !== null ? { description } : {}),
    createdAt: created.index.createdAt,
    updatedAt: created.index.updatedAt,
  };
}
