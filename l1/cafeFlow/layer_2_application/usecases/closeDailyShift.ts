/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/closeDailyShift.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IDailyShiftRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { IShiftClosingReportRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.js';
import type { DailyShift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.js';
import { canTransitionDailyShift } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.js';
import type { Order, OrderItem } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
import type { ShiftClosingReport } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.js';

export interface CloseDailyShiftInput {
  cashTotal?: number;
  otherPaymentsTotal?: number;
  notes?: string;
}

export interface CloseDailyShiftOutput {
  dailyShiftId: string;
  shiftDate: string;
  status: string;
  closedByUserId: string;
  closedAt: string;
  totalOrders: number;
  totalSalesAmount: number;
  totalItemsSold: number;
  cashTotal: number;
  otherPaymentsTotal: number;
  notes?: string;
  shiftClosingReportId: string;
  totalSalesAmountReport: number;
  totalOrdersCount: number;
  totalItemsSoldReport: number;
  cashPaymentsAmount: number;
  otherPaymentsAmount: number;
  topSellingItemsSummary?: string;
  lowStockSignalsCount: number;
  stockoutSignalsCount: number;
  generatedAt: string;
}

function isCancelledOrder(order: Order): boolean {
  return String(order.status) === 'cancelled';
}

function isCancelledItem(item: OrderItem): boolean {
  return String(item.status) === 'cancelled';
}

function buildTopSellingItemsSummary(orders: Order[]): string | null {
  const qtyByName = new Map<string, number>();
  for (const order of orders) {
    if (isCancelledOrder(order)) {
      continue;
    }
    for (const item of order.items ?? []) {
      if (isCancelledItem(item)) {
        continue;
      }
      const name = item.menuItemName?.trim() || item.menuItemId;
      qtyByName.set(name, (qtyByName.get(name) ?? 0) + item.quantity);
    }
  }
  const ranked = [...qtyByName.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([name, qty]) => `${name}: ${qty}`);
  if (ranked.length === 0) {
    return null;
  }
  return ranked.join('; ');
}

function derivePaymentTotals(orders: Order[]): { cash: number; other: number } {
  let cash = 0;
  let other = 0;
  for (const order of orders) {
    if (isCancelledOrder(order)) {
      continue;
    }
    const payment = order.payment;
    if (!payment || String(payment.status) === 'voided') {
      continue;
    }
    const amount = payment.totalAmount ?? 0;
    if (String(payment.paymentMethod) === 'cash') {
      cash += amount;
    } else {
      other += amount;
    }
  }
  return { cash, other };
}

export async function closeDailyShift(
  ctx: RequestContext,
  input: CloseDailyShiftInput,
): Promise<CloseDailyShiftOutput> {
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
  const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');
  const shiftClosingReports = resolveRepository<IShiftClosingReportRepository>(
    ctx,
    'ShiftClosingReport',
  );

  const closedAt = ctx.clock.nowIso();
  const closedByUserId = ctx.sessionContext.actorId ?? ctx.sessionContext.actorSession?.actorId;
  if (!closedByUserId) {
    throw new AppError('VALIDATION_ERROR', 'Actor session is required to close a daily shift.', 400);
  }

  // rule: ordersRequireOpenDailyShift — resolve the single open DailyShift (activeLifecycleInstance)
  const openShifts = await dailyShifts.list({ status: 'open' });
  if (openShifts.length === 0) {
    throw new AppError(
      'VALIDATION_ERROR',
      'ordersRequireOpenDailyShift: não há turno diário aberto para fechar.',
      400,
      { ruleId: 'ordersRequireOpenDailyShift' },
    );
  }
  const openShift = openShifts[0]!;
  const dailyShift = await dailyShifts.getById(openShift.dailyShiftId);
  if (!dailyShift || String(dailyShift.status) !== 'open') {
    throw new AppError(
      'VALIDATION_ERROR',
      'ordersRequireOpenDailyShift: somente turnos abertos podem ser fechados.',
      400,
      { ruleId: 'ordersRequireOpenDailyShift', dailyShiftId: openShift.dailyShiftId },
    );
  }
  if (!canTransitionDailyShift(dailyShift.status, 'closed')) {
    throw new AppError(
      'VALIDATION_ERROR',
      'ordersRequireOpenDailyShift: transição de status do turno não permitida.',
      400,
      { ruleId: 'ordersRequireOpenDailyShift', from: dailyShift.status, to: 'closed' },
    );
  }

  const orders = await ordersRepo.findByDailyShiftId(dailyShift.dailyShiftId);
  const activeOrders = orders.filter((order) => !isCancelledOrder(order));

  const totalOrders = activeOrders.length;
  const totalSalesAmount = activeOrders.reduce((sum, order) => sum + (order.totalAmount ?? 0), 0);
  let totalItemsSold = 0;
  for (const order of activeOrders) {
    for (const item of order.items ?? []) {
      if (!isCancelledItem(item)) {
        totalItemsSold += item.quantity;
      }
    }
  }

  const derivedPayments = derivePaymentTotals(orders);
  const cashTotal = input.cashTotal ?? derivedPayments.cash;
  const otherPaymentsTotal = input.otherPaymentsTotal ?? derivedPayments.other;
  const cashPaymentsAmount = cashTotal;
  const otherPaymentsAmount = otherPaymentsTotal;

  // rule: shiftClosingReportContents — top sellers + stock signal counts
  const topSellingItemsSummary = buildTopSellingItemsSummary(orders);

  const stockList = await ctx.mdm.collection.listByType({ type: 'cafeFlow.StockItem' });
  const stockMdmIds = stockList.items.map((item) => item.mdmId);
  const stockEntities =
    stockMdmIds.length > 0
      ? await ctx.mdm.collection.getMany({ mdmIds: stockMdmIds })
      : [];

  let lowStockSignalsCount = 0;
  let stockoutSignalsCount = 0;
  for (const entity of stockEntities) {
    const details = (entity.details ?? {}) as unknown as Record<string, unknown>;
    const moduleDetails = (details.cafeFlow ?? details) as Record<string, unknown>;
    const currentBalance = Number(
      moduleDetails.currentBalance ?? details.currentBalance ?? 0,
    );
    const minimumLevel = Number(
      moduleDetails.minimumLevel ?? details.minimumLevel ?? 0,
    );
    if (currentBalance <= 0) {
      stockoutSignalsCount += 1;
    } else if (currentBalance <= minimumLevel) {
      lowStockSignalsCount += 1;
    }
  }

  const shiftClosingReportId = ctx.idGenerator.newId();
  const notes = input.notes ?? dailyShift.notes ?? null;

  const report: ShiftClosingReport = {
    shiftClosingReportId,
    dailyShiftId: dailyShift.dailyShiftId,
    shiftDate: dailyShift.shiftDate,
    totalSalesAmount,
    totalOrdersCount: totalOrders,
    totalItemsSold,
    cashPaymentsAmount,
    otherPaymentsAmount,
    topSellingItemsSummary,
    lowStockSignalsCount,
    stockoutSignalsCount,
    closingNotes: notes,
    generatedAt: closedAt,
    createdAt: closedAt,
    updatedAt: closedAt,
  };

  const closedShift: DailyShift = {
    ...dailyShift,
    status: 'closed',
    closedByUserId,
    closedAt,
    totalOrders,
    totalSalesAmount,
    totalItemsSold,
    cashTotal,
    otherPaymentsTotal,
    notes,
    updatedAt: closedAt,
  };

  await ctx.data.runInTransaction(async () => {
    await shiftClosingReports.save(report);
    await dailyShifts.save(closedShift);
  });

  return {
    dailyShiftId: closedShift.dailyShiftId,
    shiftDate: closedShift.shiftDate,
    status: closedShift.status,
    closedByUserId: closedShift.closedByUserId!,
    closedAt: closedShift.closedAt!,
    totalOrders,
    totalSalesAmount,
    totalItemsSold,
    cashTotal,
    otherPaymentsTotal,
    notes: notes ?? undefined,
    shiftClosingReportId: report.shiftClosingReportId,
    totalSalesAmountReport: report.totalSalesAmount,
    totalOrdersCount: report.totalOrdersCount,
    totalItemsSoldReport: report.totalItemsSold,
    cashPaymentsAmount: report.cashPaymentsAmount,
    otherPaymentsAmount: report.otherPaymentsAmount,
    topSellingItemsSummary: report.topSellingItemsSummary ?? undefined,
    lowStockSignalsCount: report.lowStockSignalsCount,
    stockoutSignalsCount: report.stockoutSignalsCount,
    generatedAt: report.generatedAt,
  };
}
