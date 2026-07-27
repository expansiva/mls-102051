/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/recordBasicPayment.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type { OrderPayment, OrderPaymentMethod } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import { paymentMatchesOrderTotal } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

export interface RecordBasicPaymentInput {
  orderId: string;
  totalAmount: number;
  paymentMethod: string;
  notes?: string;
}

export interface RecordBasicPaymentOutput {
  orderPaymentId: string;
  orderId: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  paidAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

const VALID_PAYMENT_METHODS: readonly OrderPaymentMethod[] = [
  'cash',
  'pix',
  'creditCard',
  'debitCard',
  'mixed',
] as const;

function isValidPaymentMethod(method: string): method is OrderPaymentMethod {
  return (VALID_PAYMENT_METHODS as readonly string[]).includes(method);
}

export async function recordBasicPayment(
  ctx: RequestContext,
  input: RecordBasicPaymentInput,
): Promise<RecordBasicPaymentOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  if (!isValidPaymentMethod(input.paymentMethod)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'shiftClosingRecordsBasicTotalsAndPayments: paymentMethod must be one of cash|pix|creditCard|debitCard|mixed.',
      400,
      { ruleId: 'shiftClosingRecordsBasicTotalsAndPayments', paymentMethod: input.paymentMethod },
    );
  }

  if (!(typeof input.totalAmount === 'number' && Number.isFinite(input.totalAmount) && input.totalAmount > 0)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'shiftClosingRecordsBasicTotalsAndPayments: totalAmount must be a positive money value.',
      400,
      { ruleId: 'shiftClosingRecordsBasicTotalsAndPayments', totalAmount: input.totalAmount },
    );
  }

  const now = ctx.clock.nowIso();
  const orderPaymentId = ctx.idGenerator.newId();

  const payment: OrderPayment = {
    orderPaymentId,
    orderId: input.orderId,
    totalAmount: input.totalAmount,
    paymentMethod: input.paymentMethod,
    status: 'open',
    paidAt: now,
    closedAt: null,
    voidedAt: null,
    voidReason: null,
    notes: input.notes ?? null,
    createdAt: now,
    updatedAt: now,
  };

  await ctx.data.runInTransaction(async () => {
    const order = await orders.getById(input.orderId);
    if (!order) {
      throw new AppError('NOT_FOUND', `Order not found: ${input.orderId}`, 404, {
        orderId: input.orderId,
      });
    }

    // one-to-one: reject when a non-voided payment already exists
    if (order.payment !== null && String(order.payment.status) !== 'voided') {
      throw new AppError(
        'VALIDATION_ERROR',
        'shiftClosingRecordsBasicTotalsAndPayments: order already has a non-voided payment.',
        400,
        { ruleId: 'shiftClosingRecordsBasicTotalsAndPayments', orderId: input.orderId },
      );
    }

    if (!paymentMatchesOrderTotal(order, payment)) {
      throw new AppError(
        'VALIDATION_ERROR',
        'shiftClosingRecordsBasicTotalsAndPayments: payment totalAmount must match order totalAmount.',
        400,
        {
          ruleId: 'shiftClosingRecordsBasicTotalsAndPayments',
          orderTotal: order.totalAmount,
          paymentTotal: payment.totalAmount,
        },
      );
    }

    const updatedOrder = {
      ...order,
      payment,
      updatedAt: now,
    };
    await orders.save(updatedOrder);

    // rule: shiftClosingRecordsBasicTotalsAndPayments — append stock consumption audit per non-cancelled item
    for (const item of order.items) {
      if (String(item.status) === 'cancelled') continue;
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
    orderPaymentId: payment.orderPaymentId,
    orderId: payment.orderId,
    totalAmount: payment.totalAmount,
    paymentMethod: payment.paymentMethod,
    status: payment.status,
    paidAt: payment.paidAt ?? undefined,
    notes: payment.notes ?? undefined,
    createdAt: payment.createdAt,
    updatedAt: payment.updatedAt,
  };
}
