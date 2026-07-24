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
          "Resolve closedByUserId from ctx.sessionContext.actorId (actorSession) and closedAt from ctx.clock.now() (systemDefault)",
          "Resolve activeLifecycleInstance: via DailyShift port list/find the single DailyShift with status 'open'; if none, fail validation with ordersRequireOpenDailyShift (no open shift to close)",
          "Load the open DailyShift by id via DailyShift port; validate status is still 'open' (ordersRequireOpenDailyShift / only open shifts can be closed)",
          "Via Order port, list all Orders for dailyShiftId; exclude cancelled when aggregating sales; compute totalOrders, totalSalesAmount from order.totalAmount, and totalItemsSold from non-cancelled OrderItems quantities",
          "Derive cashPaymentsAmount and otherPaymentsAmount from OrderPayment data on those orders (cash vs non-cash methods); use user-provided cashTotal/otherPaymentsTotal when present as the conferenced totals, otherwise use the derived payment sums",
          "Apply shiftClosingReportContents: build topSellingItemsSummary from OrderItem aggregation (menuItemName + quantity ranking); via ctx.mdm.collection.listByType for StockItem compute lowStockSignalsCount (currentBalance > 0 && currentBalance <= minimumLevel) and stockoutSignalsCount (currentBalance <= 0)",
          "Inside ctx.data transaction: generate shiftClosingReportId via ctx.idGenerator; create ShiftClosingReport with dailyShiftId, shiftDate, totals, payment amounts, topSellingItemsSummary, stock signal counts, closingNotes from notes, generatedAt=closedAt; save via ShiftClosingReport port",
          "Update DailyShift: status='closed', closedByUserId, closedAt, totalOrders, totalSalesAmount, totalItemsSold, cashTotal, otherPaymentsTotal, notes, updatedAt=closedAt; save via DailyShift port",
          "Return outputShape: DailyShift closed fields plus ShiftClosingReport id and report metrics (totalSalesAmountReport, totalOrdersCount, totalItemsSoldReport, cashPaymentsAmount, otherPaymentsAmount, topSellingItemsSummary, lowStockSignalsCount, stockoutSignalsCount, generatedAt)"
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
