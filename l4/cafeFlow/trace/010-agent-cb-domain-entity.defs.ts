{
  "savedAt": "2026-07-25T23:24:53.685Z",
  "agentName": "agentCbDomainEntity",
  "stepId": 10,
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
              "entityId": "AiPromotionSuggestion",
              "invariants": [
                "status lifecycle: pending → accepted | rejected | expired; accepted, rejected and expired are terminal",
                "reviewedAt and reviewedByUserId are required when status is accepted or rejected",
                "reviewedAt and reviewedByUserId must be absent when status is pending or expired",
                "reviewNotes may only be set when status is accepted or rejected",
                "generatedAt must be <= createdAt and <= updatedAt",
                "reviewedAt, when present, must be >= generatedAt and >= createdAt",
                "expiresAt, when present, must be > generatedAt",
                "status may become expired only when expiresAt is set and current time >= expiresAt; a pending suggestion past expiresAt must transition to expired",
                "accepted or rejected suggestions cannot transition to expired",
                "salesLast7Days must be >= 0",
                "salesToday, when present, must be >= 0",
                "currentStockLevel, when present, must be >= 0",
                "confidenceScore must be between 0 and 100 inclusive",
                "suggestedDiscountPercent, when present, must be > 0 and <= 100",
                "updatedAt must be >= createdAt",
                "reason must be non-empty",
                "menuItemName must be non-empty"
              ]
            }
          ]
        },
        "questions": [],
        "trace": [
          "Derived lifecycle, required-when, temporal and quantity/monetary invariants from AiPromotionSuggestion field descriptions and status enum"
        ]
      }
    },
    "status": "completed",
    "stepId": 16,
    "interaction": null,
    "nextSteps": null
  }
}
