/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { Order, OrderStatus } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { canTransitionOrder } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export interface UpdateOrderStatusInput {
  orderId: string;
  status: string;
  cancellationReason?: string;
}

export interface UpdateOrderStatusOutput {
  orderId: string;
  status: string;
  confirmedAt?: string;
  inPreparationAt?: string;
  readyAt?: string;
  servedAt?: string;
  cancelledAt?: string;
  cancellationReason?: string;
  updatedAt: string;
}

const ALLOWED_TARGET_STATUSES: ReadonlySet<string> = new Set([
  'confirmed',
  'inPreparation',
  'ready',
  'served',
  'cancelled',
]);

interface MenuItemIngredientLink {
  stockItemId: string;
  quantityPerPortion: number;
}

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return {};
}

function readIngredientsFromMenuDetails(details: unknown): MenuItemIngredientLink[] {
  const root = asRecord(details);
  const cafeFlow = asRecord(root.cafeFlow);
  const rawIngredients = Array.isArray(cafeFlow.ingredients)
    ? cafeFlow.ingredients
    : Array.isArray(root.ingredients)
      ? root.ingredients
      : [];
  const links: MenuItemIngredientLink[] = [];
  for (const entry of rawIngredients) {
    const row = asRecord(entry);
    const stockItemId = typeof row.stockItemId === 'string' ? row.stockItemId : null;
    const quantityPerPortion = Number(row.quantityPerPortion ?? row.quantity ?? NaN);
    if (!stockItemId || !Number.isFinite(quantityPerPortion)) {
      continue;
    }
    links.push({ stockItemId, quantityPerPortion });
  }
  return links;
}

function readCurrentBalance(details: unknown): number {
  const root = asRecord(details);
  const cafeFlow = asRecord(root.cafeFlow);
  const raw = cafeFlow.currentBalance ?? root.currentBalance ?? 0;
  const balance = Number(raw);
  return Number.isFinite(balance) ? balance : 0;
}

export async function updateOrderStatus(
  ctx: RequestContext,
  input: UpdateOrderStatusInput,
): Promise<UpdateOrderStatusOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  const now = ctx.clock.nowIso();

  if (!ALLOWED_TARGET_STATUSES.has(input.status)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'status must be one of: confirmed | inPreparation | ready | served | cancelled',
      400,
      { status: input.status },
    );
  }

  const targetStatus = input.status as OrderStatus;

  const existing = await orders.getById(input.orderId);
  if (!existing) {
    throw new AppError('NOT_FOUND', `Order not found: ${input.orderId}`, 404, {
      orderId: input.orderId,
    });
  }

  // rule: kitchenStatusProgressesInOrder
  if (!canTransitionOrder(existing.status, targetStatus)) {
    throw new AppError(
      'VALIDATION_ERROR',
      `kitchenStatusProgressesInOrder: cannot transition from '${existing.status}' to '${targetStatus}'`,
      400,
      {
        ruleId: 'kitchenStatusProgressesInOrder',
        from: existing.status,
        to: targetStatus,
      },
    );
  }

  // rule: onlyReadyOrdersCanBeServed
  if (targetStatus === 'served' && existing.status !== 'ready') {
    throw new AppError(
      'VALIDATION_ERROR',
      'onlyReadyOrdersCanBeServed: only orders with status ready can be served',
      400,
      {
        ruleId: 'onlyReadyOrdersCanBeServed',
        from: existing.status,
        to: targetStatus,
      },
    );
  }

  if (targetStatus === 'cancelled') {
    const reason = input.cancellationReason?.trim() ?? '';
    if (!reason) {
      throw new AppError(
        'VALIDATION_ERROR',
        'cancellationReason is required when cancelling an order',
        400,
        { orderId: input.orderId },
      );
    }
  }

  const order: Order = {
    ...existing,
    items: existing.items.map((item) => ({ ...item })),
    payment: existing.payment ? { ...existing.payment } : null,
    status: targetStatus,
    updatedAt: now,
  };

  if (targetStatus === 'confirmed') {
    order.confirmedAt = now;
    // rule: orderEntersKitchenQueueAfterAttendantConfirmation
  } else if (targetStatus === 'inPreparation') {
    order.inPreparationAt = now;
  } else if (targetStatus === 'ready') {
    order.readyAt = now;
  } else if (targetStatus === 'served') {
    order.servedAt = now;
    // rule: completedOrdersLeaveKitchenQueue
  } else if (targetStatus === 'cancelled') {
    order.cancelledAt = now;
    order.cancellationReason = input.cancellationReason?.trim() ?? null;
    // rule: completedOrdersLeaveKitchenQueue
  }

  await ctx.data.runInTransaction(async (tx) => {
    const txCtx: RequestContext = { ...ctx, data: tx };
    const txOrders = resolveRepository<IOrderRepository>(txCtx, 'Order');
    const txStockConsumptions = resolveRepository<IStockConsumptionRepository>(
      txCtx,
      'StockConsumption',
    );

    // rule: autoStockDeductionOnServe
    if (targetStatus === 'served') {
      const qtyByMenuItemId = new Map<string, number>();
      for (const item of order.items) {
        if (item.status === 'cancelled') {
          continue;
        }
        const prev = qtyByMenuItemId.get(item.menuItemId) ?? 0;
        qtyByMenuItemId.set(item.menuItemId, prev + item.quantity);
      }

      const menuItemIds = [...qtyByMenuItemId.keys()];
      const menuEntities =
        menuItemIds.length > 0
          ? await txCtx.mdm.collection.getMany({ mdmIds: menuItemIds })
          : [];

      const requiredByStockItemId = new Map<string, number>();
      for (const menuEntity of menuEntities) {
        const orderQty = qtyByMenuItemId.get(menuEntity.mdmId) ?? 0;
        if (orderQty <= 0) {
          continue;
        }
        const ingredients = readIngredientsFromMenuDetails(menuEntity.details);
        for (const link of ingredients) {
          const need = link.quantityPerPortion * orderQty;
          const prev = requiredByStockItemId.get(link.stockItemId) ?? 0;
          requiredByStockItemId.set(link.stockItemId, prev + need);
        }
      }

      const stockItemIds = [...requiredByStockItemId.keys()];
      if (stockItemIds.length > 0) {
        const stockEntities = await txCtx.mdm.collection.getMany({ mdmIds: stockItemIds });
        const stockById = new Map(stockEntities.map((entity) => [entity.mdmId, entity]));

        for (const stockItemId of stockItemIds) {
          const requiredQty = requiredByStockItemId.get(stockItemId) ?? 0;
          if (requiredQty <= 0) {
            continue;
          }

          const stockEntity = stockById.get(stockItemId);
          if (!stockEntity) {
            throw new AppError('NOT_FOUND', `MDM record not found: ${stockItemId}`, 404, {
              mdmId: stockItemId,
              ruleId: 'autoStockDeductionOnServe',
            });
          }

          const detailsRoot = asRecord(stockEntity.details);
          const cafeFlow = asRecord(detailsRoot.cafeFlow);
          const currentBalance = readCurrentBalance(stockEntity.details);
          const nextBalance = currentBalance - requiredQty;

          await txCtx.mdm.entity.update({
            mdmId: stockEntity.mdmId,
            expectedVersion: stockEntity.version,
            patch: {
              cafeFlow: {
                ...cafeFlow,
                currentBalance: nextBalance,
              },
            } as unknown as Parameters<typeof txCtx.mdm.entity.update>[0]['patch'],
          });

          const consumption: StockConsumption = {
            stockConsumptionId: txCtx.idGenerator.newId(),
            orderId: order.orderId,
            stockItemId,
            quantity: requiredQty,
            occurredAt: now,
            status: 'posted',
            voidedAt: null,
            voidReason: null,
            createdAt: now,
          };
          await txStockConsumptions.append(consumption);
        }
      }
    }

    await txOrders.save(order);
  });

  // silence unused outer resolves when transaction re-binds adapters
  void orders;
  void stockConsumptions;

  const output: UpdateOrderStatusOutput = {
    orderId: order.orderId,
    status: order.status,
    updatedAt: order.updatedAt,
  };
  if (order.confirmedAt != null) {
    output.confirmedAt = order.confirmedAt;
  }
  if (order.inPreparationAt != null) {
    output.inPreparationAt = order.inPreparationAt;
  }
  if (order.readyAt != null) {
    output.readyAt = order.readyAt;
  }
  if (order.servedAt != null) {
    output.servedAt = order.servedAt;
  }
  if (order.cancelledAt != null) {
    output.cancelledAt = order.cancelledAt;
  }
  if (order.cancellationReason != null) {
    output.cancellationReason = order.cancellationReason;
  }
  return output;
}
