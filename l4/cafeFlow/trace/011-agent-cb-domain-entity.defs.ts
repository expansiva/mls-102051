{
  "savedAt": "2026-07-25T23:24:55.520Z",
  "agentName": "agentCbDomainEntity",
  "stepId": 11,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitDomainEntities",
      "arguments": {
        "status": "ok",
        "result": {
          "items": [
            {
              "entityId": "AiSalesSummary",
              "invariants": [
                "periodStart must be on or before periodEnd",
                "periodEnd must be on or before summaryDate",
                "periodStart is normally summaryDate minus 7 days (period covers up to the reference day)",
                "summaryText must be non-empty when the summary is persisted as generated",
                "promptTokens and completionTokens, when present, must be >= 0",
                "if promptTokens or completionTokens is set, modelId should be present",
                "generatedAt, when present, must be on or after createdAt's calendar instant context and not after updatedAt unreasonably; generatedAt <= updatedAt",
                "createdAt must be on or before updatedAt",
                "aiSalesSummaryId, operationalDashboardId, summaryDate, periodStart, periodEnd, summaryText, createdAt, updatedAt are always required"
              ]
            }
          ]
        },
        "questions": [],
        "trace": [
          "Derived temporal ordering: periodStart<=periodEnd<=summaryDate; createdAt<=updatedAt; generatedAt constraints",
          "Token quantities non-negative; modelId required-when tokens present",
          "summaryText non-empty as core narrative output"
        ]
      }
    },
    "status": "completed",
    "stepId": 18,
    "interaction": null,
    "nextSteps": null
  }
}
