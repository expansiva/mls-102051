/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/recordBasicPayment.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IStockConsumptionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.js';
import type {
  OrderPayment,
  OrderPaymentMethod,
} from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { StockConsumption } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.js';

const VALID_PAYMENT_METHODS: ReadonlySet<string> = new Set([
  'cash',
  'pix',
  'creditCard',
  'debitCard',
  'mixed',
]);

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

export async function recordBasicPayment(
  ctx: RequestContext,
  input: RecordBasicPaymentInput,
): Promise<RecordBasicPaymentOutput> {
  const orders = resolveRepository<IOrderRepository>(ctx, 'Order');
  const stockConsumptions = resolveRepository<IStockConsumptionRepository>(ctx, 'StockConsumption');

  const now = ctx.clock.nowIso();
  const orderPaymentId = ctx.idGenerator.newId();

  if (!VALID_PAYMENT_METHODS.has(input.paymentMethod)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'shiftClosingRecordsBasicTotalsAndPayments: paymentMethod must be one of cash|pix|creditCard|debitCard|mixed.',
      400,
      { ruleId: 'shiftClosingRecordsBasicTotalsAndPayments', paymentMethod: input.paymentMethod },
    );
  }

  if (!(input.totalAmount > 0)) {
    throw new AppError(
      'VALIDATION_ERROR',
      'shiftClosingRecordsBasicTotalsAndPayments: totalAmount must be greater than zero.',
      400,
      { ruleId: 'shiftClosingRecordsBasicTotalsAndPayments', totalAmount: input.totalAmount },
    );
  }

  const paymentMethod = input.paymentMethod as OrderPaymentMethod;

  const payment = await ctx.data.runInTransaction(async () => {
    const order = await orders.getById(input.orderId);
    if (!order) {
      throw new AppError('NOT_FOUND', `Order not found: ${input.orderId}`, 404, {
        orderId: input.orderId,
      });
    }

    // rule: shiftClosingRecordsBasicTotalsAndPayments — one-to-one non-voided payment
    if (order.payment !== null && order.payment.status !== 'voided') {
      throw new AppError(
        'CONFLICT',
        'shiftClosingRecordsBasicTotalsAndPayments: order already has a non-voided payment.',
        409,
        {
          ruleId: 'shiftClosingRecordsBasicTotalsAndPayments',
          orderId: order.orderId,
          existingOrderPaymentId: order.payment.orderPaymentId,
          existingStatus: order.payment.status,
        },
      );
    }

    const orderPayment: OrderPayment = {
      orderPaymentId,
      orderId: order.orderId,
      totalAmount: input.totalAmount,
      paymentMethod,
      status: 'open',
      paidAt: now,
      closedAt: null,
      voidedAt: null,
      voidReason: null,
      notes: input.notes ?? null,
      createdAt: now,
      updatedAt: now,
    };

    order.payment = orderPayment;
    order.updatedAt = now;

    await orders.save(order);

    const stockConsumption: StockConsumption = {
      stockConsumptionId: ctx.idGenerator.newId(),
      orderId: order.orderId,
      stockItemId: orderPayment.orderPaymentId,
      quantity: 1,
      occurredAt: now,
      status: 'posted',
      voidedAt: null,
      voidReason: null,
      createdAt: now,
    };
    // rule: shiftClosingRecordsBasicTotalsAndPayments — append-only payment audit trail
    await stockConsumptions.append(stockConsumption);

    return orderPayment;
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
