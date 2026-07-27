{
  "savedAt": "2026-07-24T20:01:01.108Z",
  "agentName": "agentCbUsecase",
  "stepId": 14,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitUsecase",
      "arguments": {
        "status": "ok",
        "result": {
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
                "Load OperationalDashboard by input.operationalDashboardId via OperationalDashboard port; fail if not found",
                "Load the DailyShift referenced by dashboard.dailyShiftId via DailyShift port for shift-level sales context",
                "List Orders (and embedded OrderItems) via Order port scoped to the dashboard dailyShift and/or shifts whose shiftDate falls within [periodStart, periodEnd]",
                "Apply aiSummaryUsesExistingOperationalData inline: build the narrative exclusively from already-persisted OperationalDashboard aggregates (todaySalesTotal, todayOrdersCount, todayItemsSold, top sellers, stock alerts), DailyShift totals, and Order/OrderItem lines — never invent external metrics",
                "Lookup existing AiSalesSummary by operationalDashboardId (and summaryDate when present) via AiSalesSummary port; if found with non-empty summaryText, return it mapped to outputShape",
                "Otherwise compose summaryText from the collected operational facts (sales totals, order counts, items sold, top items, low/out-of-stock counts) for the period; set operationalDashboardId from the loaded dashboard, periodStart/periodEnd/summaryDate from resolved dates, and optional model/token/generatedAt metadata when available",
                "Return the AiSalesSummary projection matching outputShape (aiSalesSummaryId, operationalDashboardId, summaryDate, periodStart, periodEnd, summaryText, modelId, promptTokens, completionTokens, generatedAt)"
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
        },
        "questions": [],
        "trace": [
          "lookup view generateAiSalesSummary: public input operationalDashboardId only; dates from systemDefault via ctx.clock",
          "ports AiSalesSummary+OperationalDashboard+DailyShift+Order; OrderItem via Order aggregate embed",
          "output pinned to outputShape; rule aiSummaryUsesExistingOperationalData applied inline; no writes/eventWrites"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
