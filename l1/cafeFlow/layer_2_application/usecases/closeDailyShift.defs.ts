/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/closeDailyShift.defs.ts" enhancement="_blank"/>

export const closeDailyShiftUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "closeDailyShift",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "closeDailyShift",
    "ports": [
      "DailyShift",
      "Order",
      "ShiftClosingReport",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "closeDailyShift",
        "inputTypeName": "CloseDailyShiftInput",
        "outputTypeName": "CloseDailyShiftOutput",
        "input": [
          {
            "name": "cashTotal",
            "type": "number",
            "required": false,
            "ofEntity": "DailyShift",
            "fieldRef": "DailyShift.cashTotal"
          },
          {
            "name": "otherPaymentsTotal",
            "type": "number",
            "required": false,
            "ofEntity": "DailyShift",
            "fieldRef": "DailyShift.otherPaymentsTotal"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "DailyShift",
            "fieldRef": "DailyShift.notes"
          }
        ],
        "output": [
          {
            "name": "dailyShiftId",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "shiftDate",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "closedByUserId",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "closedAt",
            "type": "string",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "totalOrders",
            "type": "number",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "totalSalesAmount",
            "type": "number",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "totalItemsSold",
            "type": "number",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "cashTotal",
            "type": "number",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "otherPaymentsTotal",
            "type": "number",
            "required": true,
            "ofEntity": "DailyShift"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "DailyShift"
          },
          {
            "name": "shiftClosingReportId",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "totalSalesAmountReport",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "totalOrdersCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "totalItemsSoldReport",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "cashPaymentsAmount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "otherPaymentsAmount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "topSellingItemsSummary",
            "type": "string",
            "required": false,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "lowStockSignalsCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "stockoutSignalsCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "generatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          }
        ],
        "ports": [
          "DailyShift",
          "Order",
          "ShiftClosingReport"
        ],
        "rulesApplied": [
          "ordersRequireOpenDailyShift",
          "shiftClosingReportContents"
        ],
        "transactional": true,
        "steps": [
          "Resolve closedByUserId from ctx.sessionContext.actorId (actorSession) and closedAt from ctx.clock.now()",
          "Resolve activeLifecycleInstance: via DailyShift port list/find the single DailyShift with status 'open'; if none, fail validation (ordersRequireOpenDailyShift / no open shift)",
          "Load the open DailyShift by id via DailyShift port",
          "Validate shift.status === 'open'; otherwise reject close (ordersRequireOpenDailyShift — only an open shift can be closed / accept new orders)",
          "Via Order port, list orders for dailyShiftId; include nested OrderItems and OrderPayments (or load related collections) for aggregation",
          "Compute totalOrders = count of non-cancelled orders; totalSalesAmount = sum of totalAmount of non-cancelled orders; totalItemsSold = sum of OrderItem.quantity for non-cancelled items on those orders",
          "Compute cashPaymentsAmount from OrderPayments with paymentMethod 'cash' and status not voided; otherPaymentsAmount from remaining non-voided payments (pix/creditCard/debitCard/mixed)",
          "Apply user-confirmed cashTotal/otherPaymentsTotal when provided; otherwise default to computed cash/other payment totals",
          "Apply shiftClosingReportContents: build topSellingItemsSummary from OrderItems aggregated by menuItemId/menuItemName (qty desc); via ctx.mdm.collection.listByType StockItem compute lowStockSignalsCount (0 < currentBalance <= minimumLevel) and stockoutSignalsCount (currentBalance <= 0)",
          "Inside ctx.data transaction: set DailyShift status='closed', closedByUserId, closedAt, totalOrders, totalSalesAmount, totalItemsSold, cashTotal, otherPaymentsTotal, notes, updatedAt=closedAt; save via DailyShift port",
          "Create ShiftClosingReport with new id from ctx.idGenerator, dailyShiftId, shiftDate, totals, cash/other amounts, topSellingItemsSummary, stock signal counts, closingNotes=notes, generatedAt=closedAt; save via ShiftClosingReport port",
          "Return outputShape: closed DailyShift fields plus report id and report projection fields (totalSalesAmountReport, totalOrdersCount, totalItemsSoldReport, cashPaymentsAmount, otherPaymentsAmount, topSellingItemsSummary, lowStockSignalsCount, stockoutSignalsCount, generatedAt)"
        ],
        "outputShape": {
          "kind": "object",
          "fields": [
            {
              "name": "dailyShiftId",
              "type": "string",
              "required": true,
              "fieldRef": "DailyShift.dailyShiftId"
            },
            {
              "name": "shiftDate",
              "type": "string",
              "required": true,
              "fieldRef": "DailyShift.shiftDate"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "fieldRef": "DailyShift.status"
            },
            {
              "name": "closedByUserId",
              "type": "string",
              "required": true,
              "fieldRef": "DailyShift.closedByUserId"
            },
            {
              "name": "closedAt",
              "type": "string",
              "required": true,
              "fieldRef": "DailyShift.closedAt"
            },
            {
              "name": "totalOrders",
              "type": "number",
              "required": true,
              "fieldRef": "DailyShift.totalOrders"
            },
            {
              "name": "totalSalesAmount",
              "type": "number",
              "required": true,
              "fieldRef": "DailyShift.totalSalesAmount"
            },
            {
              "name": "totalItemsSold",
              "type": "number",
              "required": true,
              "fieldRef": "DailyShift.totalItemsSold"
            },
            {
              "name": "cashTotal",
              "type": "number",
              "required": true,
              "fieldRef": "DailyShift.cashTotal"
            },
            {
              "name": "otherPaymentsTotal",
              "type": "number",
              "required": true,
              "fieldRef": "DailyShift.otherPaymentsTotal"
            },
            {
              "name": "notes",
              "type": "string",
              "required": false,
              "fieldRef": "DailyShift.notes"
            },
            {
              "name": "shiftClosingReportId",
              "type": "string",
              "required": true,
              "fieldRef": "ShiftClosingReport.shiftClosingReportId"
            },
            {
              "name": "totalSalesAmountReport",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.totalSalesAmount"
            },
            {
              "name": "totalOrdersCount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.totalOrdersCount"
            },
            {
              "name": "totalItemsSoldReport",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.totalItemsSold"
            },
            {
              "name": "cashPaymentsAmount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.cashPaymentsAmount"
            },
            {
              "name": "otherPaymentsAmount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.otherPaymentsAmount"
            },
            {
              "name": "topSellingItemsSummary",
              "type": "string",
              "required": false,
              "fieldRef": "ShiftClosingReport.topSellingItemsSummary"
            },
            {
              "name": "lowStockSignalsCount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.lowStockSignalsCount"
            },
            {
              "name": "stockoutSignalsCount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.stockoutSignalsCount"
            },
            {
              "name": "generatedAt",
              "type": "string",
              "required": true,
              "fieldRef": "ShiftClosingReport.generatedAt"
            }
          ]
        }
      }
    ],
    "rulesApplied": [
      "ordersRequireOpenDailyShift",
      "shiftClosingReportContents"
    ],
    "mdmRefs": [
      "StockItem"
    ]
  }
} as const;

export default closeDailyShiftUsecase;

export const pipeline = [
  {
    "id": "closeDailyShift__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/closeDailyShift.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/closeDailyShift.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "ordersRequireOpenDailyShift",
      "shiftClosingReportContents"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
