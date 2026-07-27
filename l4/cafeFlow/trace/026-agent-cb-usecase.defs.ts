{
  "savedAt": "2026-07-25T23:28:35.977Z",
  "agentName": "agentCbUsecase",
  "stepId": 26,
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
              "transactional": true,
              "steps": [
                "Resolve summaryDate and periodEnd from ctx.clock.now (system date); compute periodStart as 7 days before summaryDate",
                "Load OperationalDashboard by input operationalDashboardId via OperationalDashboard port; fail if not found",
                "Try find existing AiSalesSummary by operationalDashboardId + summaryDate via AiSalesSummary port; if found with non-empty summaryText, return it",
                "Load DailyShift by dashboard.dailyShiftId; list DailyShifts whose shiftDate is within [periodStart, periodEnd] via DailyShift port",
                "List Orders for those dailyShiftIds via Order port (OrderItems are embedded on each Order)",
                "Apply aiSummaryUsesExistingOperationalData inline: build the narrative exclusively from already-persisted OperationalDashboard metrics (todaySalesTotal, todayOrdersCount, todayItemsSold, top sellers, stock alerts) plus DailyShift totals and Order/OrderItem aggregates for the 7-day window — never invent external sales figures",
                "Generate summaryText (non-empty narrative) and optional modelId/promptTokens/completionTokens; set generatedAt from ctx.clock.now",
                "Create AiSalesSummary with ctx.idGenerator for aiSalesSummaryId, operationalDashboardId, summaryDate, periodStart, periodEnd, summaryText and token metadata; save via AiSalesSummary port inside ctx.data transaction",
                "Return the AiSalesSummary fields per outputShape"
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
          "lookup view generateAiSalesSummary: public input only operationalDashboardId (selectedEntity)",
          "context: summaryDate/periodEnd/periodStart from systemDefault.now (periodStart = now-7d)",
          "ports: AiSalesSummary, OperationalDashboard, DailyShift, Order (OrderItem via Order aggregate)",
          "output pinned to outputShape; rule aiSummaryUsesExistingOperationalData applied inline"
        ]
      }
    },
    "status": "completed",
    "stepId": 9,
    "interaction": null,
    "nextSteps": null
  }
}
