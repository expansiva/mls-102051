/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type {
  Order,
  OrderItem,
  OrderType,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import {
  orderRequiresItem,
  orderRequiresTableNumber,
  recomputeOrderTotal,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export interface CreateOrderItemInput {
  menuItemId: string;
  quantity: number;
  observations?: string;
}

export interface CreateOrderInput {
  orderType: string;
  tableNumber?: string;
  customerName?: string;
  notes?: string;
  items: CreateOrderItemInput[];
}

export interface CreateOrderOutputItem {
  orderItemId: string;
  menuItemId: string;
  menuItemName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  observations?: string;
  status: string;
}

export interface CreateOrderOutput {
  orderId: string;
  dailyShiftId: string;
  orderType: string;
  tableNumber?: string;
  customerName?: string;
  totalAmount: number;
  notes?: string;
  status: string;
  registeredAt: string;
  confirmedAt: string;
  items: CreateOrderOutputItem[];
}

export async function createOrder(
  ctx: RequestContext,
  input: CreateOrderInput,
): Promise<CreateOrderOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
  const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  const openShifts = await dailyShifts.list({ status: 'open' });
  const openShift = openShifts[0] ?? null;
  if (!openShift) {
    throw new AppError(
      'VALIDATION_ERROR',
      'ordersRequireOpenDailyShift: não há turno diário aberto para registrar o pedido.',
      400,
      { ruleId: 'ordersRequireOpenDailyShift' },
    );
  }

  const orderType = input.orderType as OrderType;
  if (orderType !== 'table' && orderType !== 'takeout') {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderRequiresTableOrTakeout: orderType deve ser "table" ou "takeout".',
      400,
      { ruleId: 'orderRequiresTableOrTakeout', orderType: input.orderType },
    );
  }

  const tableNumber = input.tableNumber?.trim() ? input.tableNumber.trim() : null;
  const customerName = input.customerName?.trim() ? input.customerName.trim() : null;
  const notes = input.notes?.trim() ? input.notes.trim() : null;

  if (!orderRequiresTableNumber({ orderType, tableNumber })) {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderRequiresTableOrTakeout: pedidos do tipo mesa precisam de tableNumber.',
      400,
      { ruleId: 'orderRequiresTableOrTakeout', orderType, tableNumber },
    );
  }

  if (!input.items || input.items.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderRequiresItem: o pedido precisa de ao menos um item.',
      400,
      { ruleId: 'orderRequiresItem' },
    );
  }

  const now = ctx.clock.nowIso();
  const orderId = ctx.idGenerator.newId();

  const menuItemIds = [...new Set(input.items.map((item) => item.menuItemId))];
  const menuEntities = await ctx.mdm.collection.getMany({ mdmIds: menuItemIds });
  const menuById = new Map(menuEntities.map((entity) => [entity.mdmId, entity]));

  const items: OrderItem[] = [];
  for (const line of input.items) {
    if (!(line.quantity > 0)) {
      throw new AppError(
        'VALIDATION_ERROR',
        'A quantidade do item deve ser maior que zero.',
        400,
        { menuItemId: line.menuItemId, quantity: line.quantity },
      );
    }

    const menuEntity = menuById.get(line.menuItemId);
    if (!menuEntity) {
      throw new AppError('NOT_FOUND', `MenuItem not found: ${line.menuItemId}`, 404, {
        mdmId: line.menuItemId,
      });
    }

    if (String(menuEntity.details.status) !== 'Active') {
      throw new AppError(
        'VALIDATION_ERROR',
        `MenuItem is not active: ${line.menuItemId}`,
        400,
        { mdmId: line.menuItemId, status: menuEntity.details.status },
      );
    }

    // rule: orderTotalFromPriceAtLaunchTime
    // rule: orderItemsArePrepReference
    const details = menuEntity.details as unknown as Record<string, unknown>;
    const cafeFlowDetails =
      details.cafeFlow && typeof details.cafeFlow === 'object'
        ? (details.cafeFlow as Record<string, unknown>)
        : details;
    const unitPriceRaw =
      cafeFlowDetails.unitPrice ?? cafeFlowDetails.price ?? details.unitPrice ?? details.price ?? 0;
    const unitPrice = Number(unitPriceRaw);
    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      throw new AppError(
        'VALIDATION_ERROR',
        `MenuItem has invalid unitPrice: ${line.menuItemId}`,
        400,
        { mdmId: line.menuItemId, unitPrice: unitPriceRaw },
      );
    }

    const menuItemName =
      (typeof cafeFlowDetails.name === 'string' && cafeFlowDetails.name) ||
      (typeof details.name === 'string' && details.name) ||
      menuEntity.index.name ||
      line.menuItemId;

    const subtotal = unitPrice * line.quantity;
    const orderItemId = ctx.idGenerator.newId();

    items.push({
      orderItemId,
      orderId,
      menuItemId: line.menuItemId,
      menuItemName,
      quantity: line.quantity,
      unitPrice,
      subtotal,
      observations: line.observations?.trim() ? line.observations.trim() : null,
      status: 'sentToKitchen',
      sentToKitchenAt: now,
      startedPreparationAt: null,
      readyAt: null,
      cancelledAt: null,
      cancellationReason: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  // rule: orderTotalFromPriceAtLaunchTime
  const totalAmount = recomputeOrderTotal(items);

  // rule: orderEntersKitchenQueueAfterAttendantConfirmation
  const order: Order = {
    orderId,
    dailyShiftId: openShift.dailyShiftId,
    orderType,
    tableNumber,
    customerName,
    totalAmount,
    notes,
    status: 'confirmed',
    registeredAt: now,
    confirmedAt: now,
    inPreparationAt: null,
    readyAt: null,
    servedAt: null,
    cancelledAt: null,
    cancellationReason: null,
    items,
    payment: null,
    createdAt: now,
    updatedAt: now,
  };

  if (!orderRequiresItem(order)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'orderRequiresItem: o pedido precisa de ao menos um item.',
      400,
      { ruleId: 'orderRequiresItem' },
    );
  }

  await ctx.data.runInTransaction(async () => {
    await orders.save(order);

    for (const item of items) {
      const consumption: StockConsumption = {
        stockConsumptionId: ctx.idGenerator.newId(),
        orderId: order.orderId,
        stockItemId: item.menuItemId,
        quantity: item.quantity,
        occurredAt: now,
        status: 'posted',
        voidedAt: null,
        voidReason: null,
        createdAt: now,
      };
      await stockConsumptions.append(consumption);
    }
  });

  return {
    orderId: order.orderId,
    dailyShiftId: order.dailyShiftId,
    orderType: order.orderType,
    tableNumber: order.tableNumber ?? undefined,
    customerName: order.customerName ?? undefined,
    totalAmount: order.totalAmount,
    notes: order.notes ?? undefined,
    status: order.status,
    registeredAt: order.registeredAt,
    confirmedAt: order.confirmedAt!,
    items: items.map((item) => ({
      orderItemId: item.orderItemId,
      menuItemId: item.menuItemId,
      menuItemName: item.menuItemName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
      observations: item.observations ?? undefined,
      status: item.status,
    })),
  };
}
