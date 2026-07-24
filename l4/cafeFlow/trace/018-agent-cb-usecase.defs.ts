{
  "savedAt": "2026-07-22T21:19:47.994Z",
  "agentName": "agentCbUsecase",
  "stepId": 18,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitUsecase",
      "arguments": {
        "status": "ok",
        "result": {
          "usecaseId": "createStockAdjustment",
          "ports": [
            "DailyShift"
          ],
          "functions": [
            {
              "functionName": "createStockAdjustment",
              "inputTypeName": "CreateStockAdjustmentInput",
              "outputTypeName": "CreateStockAdjustmentOutput",
              "input": [
                {
                  "name": "stockItemId",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment",
                  "fieldRef": "StockAdjustment.stockItemId"
                },
                {
                  "name": "quantity",
                  "type": "number",
                  "required": true,
                  "ofEntity": "StockAdjustment",
                  "fieldRef": "StockAdjustment.quantity"
                },
                {
                  "name": "direction",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment",
                  "fieldRef": "StockAdjustment.direction"
                },
                {
                  "name": "reason",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment",
                  "fieldRef": "StockAdjustment.reason"
                },
                {
                  "name": "notes",
                  "type": "string",
                  "required": false,
                  "ofEntity": "StockAdjustment",
                  "fieldRef": "StockAdjustment.notes"
                }
              ],
              "output": [
                {
                  "name": "stockAdjustmentId",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "stockItemId",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "quantity",
                  "type": "number",
                  "required": true,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "direction",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "reason",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "managerUserId",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "shiftId",
                  "type": "string",
                  "required": false,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "resultingBalance",
                  "type": "number",
                  "required": true,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "notes",
                  "type": "string",
                  "required": false,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "status",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment"
                },
                {
                  "name": "createdAt",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockAdjustment"
                }
              ],
              "ports": [
                "DailyShift"
              ],
              "rulesApplied": [
                "managerManualStockAdjustmentAllowed"
              ],
              "transactional": true,
              "steps": [
                "Generate stockAdjustmentId via ctx.idGenerator and createdAt via ctx.clock",
                "Resolve managerUserId from ctx.sessionContext (actorSession.actorId)",
                "Resolve optional open DailyShift via DailyShift port (list/find by status 'open'); use its dailyShiftId as shiftId when present, otherwise leave shiftId unset",
                "Load StockItem by stockItemId via ctx.mdm.entity.get({ mdmId: stockItemId }); fail if not found",
                "Apply managerManualStockAdjustmentAllowed inline: only an authenticated manager may post a manual adjustment; include rule id in validation error details when blocked",
                "Validate quantity > 0, direction in [in, out, correction], reason in [count, loss, expiration, divergence, other]",
                "Compute resultingBalance from StockItem.currentBalance and direction (in: add quantity; out: subtract quantity; correction: set to quantity); reject if resultingBalance would be negative",
                "Build StockAdjustment { stockAdjustmentId, stockItemId, quantity, direction, reason, managerUserId, shiftId?, resultingBalance, notes?, status: 'posted', createdAt }",
                "Persist the new StockAdjustment aggregate (posted) inside ctx.data transaction wrapper",
                "Update StockItem.currentBalance to resultingBalance (and updatedAt) via ctx.mdm.entity.update inside the same transaction",
                "Return stockAdjustmentId, stockItemId, quantity, direction, reason, managerUserId, shiftId, resultingBalance, notes, status, createdAt"
              ],
              "outputShape": {
                "kind": "object",
                "fields": [
                  {
                    "name": "stockAdjustmentId",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockAdjustment.stockAdjustmentId"
                  },
                  {
                    "name": "stockItemId",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockAdjustment.stockItemId"
                  },
                  {
                    "name": "quantity",
                    "type": "number",
                    "required": true,
                    "fieldRef": "StockAdjustment.quantity"
                  },
                  {
                    "name": "direction",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockAdjustment.direction"
                  },
                  {
                    "name": "reason",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockAdjustment.reason"
                  },
                  {
                    "name": "managerUserId",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockAdjustment.managerUserId"
                  },
                  {
                    "name": "shiftId",
                    "type": "string",
                    "required": false,
                    "fieldRef": "StockAdjustment.shiftId"
                  },
                  {
                    "name": "resultingBalance",
                    "type": "number",
                    "required": true,
                    "fieldRef": "StockAdjustment.resultingBalance"
                  },
                  {
                    "name": "notes",
                    "type": "string",
                    "required": false,
                    "fieldRef": "StockAdjustment.notes"
                  },
                  {
                    "name": "status",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockAdjustment.status"
                  },
                  {
                    "name": "createdAt",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockAdjustment.createdAt"
                  }
                ]
              }
            }
          ],
          "rulesApplied": [
            "managerManualStockAdjustmentAllowed"
          ],
          "mdmRefs": [
            "StockItem"
          ]
        },
        "questions": [],
        "trace": [
          "createStockAdjustment: commandInput create on StockAdjustment; public inputs stockItemId/quantity/direction/reason/notes; managerUserId/shiftId/ids/timestamps from context; StockItem via ctx.mdm; open DailyShift via port; rule managerManualStockAdjustmentAllowed inline; outputShape canonical fields"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
