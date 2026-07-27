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

interface TopSellerAgg {
  menuItemId: string;
  menuItemName: string;
  quantity: number;
}

function isNonCancelledOrder(order: Order): boolean {
  return String(order.status) !== 'cancelled';
}

function isNonCancelledItem(item: OrderItem): boolean {
  return String(item.status) !== 'cancelled';
}

function buildTopSellingItemsSummary(orders: Order[]): string | null {
  const byItem = new Map<string, TopSellerAgg>();
  for (const order of orders) {
    if (!isNonCancelledOrder(order)) continue;
    for (const item of order.items ?? []) {
      if (!isNonCancelledItem(item)) continue;
      const existing = byItem.get(item.menuItemId);
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        byItem.set(item.menuItemId, {
          menuItemId: item.menuItemId,
          menuItemName: item.menuItemName,
          quantity: item.quantity,
        });
      }
    }
  }
  const ranked = [...byItem.values()].sort((a, b) => b.quantity - a.quantity);
  if (ranked.length === 0) return null;
  return ranked
    .slice(0, 10)
    .map((entry) => `${entry.menuItemName} (${entry.quantity})`)
    .join(', ');
}

export async function closeDailyShift(
  ctx: RequestContext,
  input: CloseDailyShiftInput,
): Promise<CloseDailyShiftOutput> {
  const dailyShifts = resolveRepository<IDailyShiftRepository>(ctx, 'DailyShift');
  const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');
  const reports = resolveRepository<IShiftClosingReportRepository>(ctx, 'ShiftClosingReport');

  const closedAt = ctx.clock.nowIso();
  const closedByUserId = ctx.sessionContext.actorId;
  if (!closedByUserId) {
    throw new AppError('VALIDATION_ERROR', 'Actor session is required to close a daily shift.', 400, {
      field: 'closedByUserId',
    });
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
  const shift = await dailyShifts.getById(openShift.dailyShiftId);
  if (!shift) {
    throw new AppError('NOT_FOUND', `DailyShift not found: ${openShift.dailyShiftId}`, 404, {
      dailyShiftId: openShift.dailyShiftId,
    });
  }
  if (String(shift.status) !== 'open' || !canTransitionDailyShift(shift.status, 'closed')) {
    throw new AppError(
      'VALIDATION_ERROR',
      'ordersRequireOpenDailyShift: somente um turno aberto pode ser fechado.',
      400,
      { ruleId: 'ordersRequireOpenDailyShift', status: shift.status },
    );
  }

  const orders = await ordersRepo.findByDailyShiftId(shift.dailyShiftId);
  const activeOrders = orders.filter(isNonCancelledOrder);

  const totalOrders = activeOrders.length;
  const totalSalesAmount = activeOrders.reduce((sum, order) => sum + order.totalAmount, 0);
  let totalItemsSold = 0;
  for (const order of activeOrders) {
    for (const item of order.items ?? []) {
      if (isNonCancelledItem(item)) {
        totalItemsSold += item.quantity;
      }
    }
  }

  let cashPaymentsAmount = 0;
  let otherPaymentsAmount = 0;
  for (const order of activeOrders) {
    const payment = order.payment;
    if (!payment || String(payment.status) === 'voided') continue;
    if (String(payment.paymentMethod) === 'cash') {
      cashPaymentsAmount += payment.totalAmount;
    } else {
      otherPaymentsAmount += payment.totalAmount;
    }
  }

  const cashTotal = input.cashTotal ?? cashPaymentsAmount;
  const otherPaymentsTotal = input.otherPaymentsTotal ?? otherPaymentsAmount;
  const notes = input.notes ?? shift.notes ?? null;

  // rule: shiftClosingReportContents — top sellers + stock signal counts from MDM StockItem
  const topSellingItemsSummary = buildTopSellingItemsSummary(orders);

  let lowStockSignalsCount = 0;
  let stockoutSignalsCount = 0;
  const stockList = await ctx.mdm.collection.listByType({ type: 'cafeFlow.StockItem' });
  const stockMdmIds = stockList.items.map((item) => item.mdmId);
  if (stockMdmIds.length > 0) {
    const stockEntities = await ctx.mdm.collection.getMany({ mdmIds: stockMdmIds });
    for (const entity of stockEntities) {
      const details = entity.details as unknown as Record<string, unknown>;
      const moduleDetails = (details.cafeFlow ?? details) as Record<string, unknown>;
      const currentBalance = Number(moduleDetails.currentBalance ?? 0);
      const minimumLevel = Number(moduleDetails.minimumLevel ?? 0);
      if (currentBalance <= 0) {
        stockoutSignalsCount += 1;
      } else if (currentBalance <= minimumLevel) {
        lowStockSignalsCount += 1;
      }
    }
  }

  const shiftClosingReportId = ctx.idGenerator.newId();

  const closedShift: DailyShift = {
    ...shift,
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

  const report: ShiftClosingReport = {
    shiftClosingReportId,
    dailyShiftId: shift.dailyShiftId,
    shiftDate: shift.shiftDate,
    totalSalesAmount,
    totalOrdersCount: totalOrders,
    totalItemsSold,
    cashPaymentsAmount: cashTotal,
    otherPaymentsAmount: otherPaymentsTotal,
    topSellingItemsSummary,
    lowStockSignalsCount,
    stockoutSignalsCount,
    closingNotes: notes,
    generatedAt: closedAt,
    createdAt: closedAt,
    updatedAt: closedAt,
  };

  await ctx.data.runInTransaction(async () => {
    await dailyShifts.save(closedShift);
    await reports.save(report);
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
