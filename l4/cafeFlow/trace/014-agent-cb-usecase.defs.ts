{
  "savedAt": "2026-07-22T21:19:38.586Z",
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
        },
        "questions": [],
        "trace": [
          "lookup view generateAiSalesSummary: public input operationalDashboardId only; dates from systemDefault via ctx.clock",
          "ports exactly as provided; OrderItem via Order aggregate; rule aiSummaryUsesExistingOperationalData applied inline",
          "output[] pinned to outputShape top-level fields"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
