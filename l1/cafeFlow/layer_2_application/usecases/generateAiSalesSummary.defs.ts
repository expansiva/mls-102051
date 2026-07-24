/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiSalesSummary.defs.ts" enhancement="_blank"/>

export const generateAiSalesSummaryUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "generateAiSalesSummary",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "generateAiSalesSummary",
    "ports": [
      "AiSalesSummary",
      "OperationalDashboard",
      "DailyShift",
      "Order",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "generateAiSalesSummary",
        "inputTypeName": "GenerateAiSalesSummaryInput",
        "outputTypeName": "GenerateAiSalesSummaryOutput",
        "input": [
          {
            "name": "operationalDashboardId",
            "type": "string",
            "required": true,
            "ofEntity": "OperationalDashboard",
            "fieldRef": "OperationalDashboard.operationalDashboardId"
          }
        ],
        "output": [
          {
            "name": "aiSalesSummaryId",
            "type": "string",
            "required": true,
            "ofEntity": "AiSalesSummary"
          },
          {
            "name": "operationalDashboardId",
            "type": "string",
            "required": true,
            "ofEntity": "AiSalesSummary"
          },
          {
            "name": "summaryDate",
            "type": "string",
            "required": true,
            "ofEntity": "AiSalesSummary"
          },
          {
            "name": "periodStart",
            "type": "string",
            "required": true,
            "ofEntity": "AiSalesSummary"
          },
          {
            "name": "periodEnd",
            "type": "string",
            "required": true,
            "ofEntity": "AiSalesSummary"
          },
          {
            "name": "summaryText",
            "type": "string",
            "required": true,
            "ofEntity": "AiSalesSummary"
          },
          {
            "name": "modelId",
            "type": "string",
            "required": false,
            "ofEntity": "AiSalesSummary"
          },
          {
            "name": "promptTokens",
            "type": "number",
            "required": false,
            "ofEntity": "AiSalesSummary"
          },
          {
            "name": "completionTokens",
            "type": "number",
            "required": false,
            "ofEntity": "AiSalesSummary"
          },
          {
            "name": "generatedAt",
            "type": "string",
            "required": false,
            "ofEntity": "AiSalesSummary"
          }
        ],
        "ports": [
          "AiSalesSummary",
          "OperationalDashboard",
          "DailyShift",
          "Order"
        ],
        "rulesApplied": [
          "aiSummaryUsesExistingOperationalData"
        ],
        "transactional": false,
        "steps": [
          "Resolve summaryDate and periodEnd from ctx.clock.now (system date); compute periodStart as approximately 7 days before summaryDate",
          "Load OperationalDashboard by input operationalDashboardId via OperationalDashboard port; fail validation if not found",
          "Load the DailyShift referenced by dashboard.dailyShiftId via DailyShift port",
          "List DailyShifts whose shiftDate falls within [periodStart, periodEnd] via DailyShift port to gather the last-7-days operational window",
          "For those shifts, list Orders via Order port (OrderItems are embedded on each Order); aggregate only existing sales metrics (totals, counts, top items, statuses) — never invent external data (rule aiSummaryUsesExistingOperationalData)",
          "Also read dashboard snapshot fields (todaySalesTotal, todayOrdersCount, todayItemsSold, topMenuItem*, low/out-of-stock counts and alerts) as the day-current operational source",
          "Lookup existing AiSalesSummary by operationalDashboardId (and summaryDate) via AiSalesSummary port; if found with non-empty summaryText, return it mapped to the output shape",
          "Otherwise build a narrative summaryText from the aggregated OperationalDashboard + DailyShift + Order/OrderItem data for the period; set modelId/promptTokens/completionTokens/generatedAt when the assistant path is used",
          "Return aiSalesSummaryId, operationalDashboardId, summaryDate, periodStart, periodEnd, summaryText, modelId, promptTokens, completionTokens, generatedAt"
        ],
        "outputShape": {
          "kind": "object",
          "fields": [
            {
              "name": "aiSalesSummaryId",
              "type": "string",
              "required": true,
              "fieldRef": "AiSalesSummary.aiSalesSummaryId"
            },
            {
              "name": "operationalDashboardId",
              "type": "string",
              "required": true,
              "fieldRef": "AiSalesSummary.operationalDashboardId"
            },
            {
              "name": "summaryDate",
              "type": "string",
              "required": true,
              "fieldRef": "AiSalesSummary.summaryDate"
            },
            {
              "name": "periodStart",
              "type": "string",
              "required": true,
              "fieldRef": "AiSalesSummary.periodStart"
            },
            {
              "name": "periodEnd",
              "type": "string",
              "required": true,
              "fieldRef": "AiSalesSummary.periodEnd"
            },
            {
              "name": "summaryText",
              "type": "string",
              "required": true,
              "fieldRef": "AiSalesSummary.summaryText"
            },
            {
              "name": "modelId",
              "type": "string",
              "required": false,
              "fieldRef": "AiSalesSummary.modelId"
            },
            {
              "name": "promptTokens",
              "type": "number",
              "required": false,
              "fieldRef": "AiSalesSummary.promptTokens"
            },
            {
              "name": "completionTokens",
              "type": "number",
              "required": false,
              "fieldRef": "AiSalesSummary.completionTokens"
            },
            {
              "name": "generatedAt",
              "type": "string",
              "required": false,
              "fieldRef": "AiSalesSummary.generatedAt"
            }
          ]
        }
      }
    ],
    "rulesApplied": [
      "aiSummaryUsesExistingOperationalData"
    ],
    "mdmRefs": []
  }
} as const;

export default generateAiSalesSummaryUsecase;

export const pipeline = [
  {
    "id": "generateAiSalesSummary__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiSalesSummary.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiSalesSummary.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/aiSalesSummaryRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "aiSummaryUsesExistingOperationalData"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
