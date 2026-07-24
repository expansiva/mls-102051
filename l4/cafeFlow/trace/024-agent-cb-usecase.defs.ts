{
  "savedAt": "2026-07-22T21:21:31.391Z",
  "agentName": "agentCbUsecase",
  "stepId": 24,
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
                "Resolve managerUserId from ctx.sessionContext.actorId (actorSession)",
                "Generate stockAdjustmentId via ctx.idGenerator and createdAt via ctx.clock.now()",
                "Resolve optional active DailyShift: query DailyShift port for status 'open'; use dailyShiftId as shiftId when found, else leave shiftId unset",
                "Load StockItem by stockItemId via ctx.mdm.entity.get({ mdmId: stockItemId }); fail if not found",
                "Validate direction in [in, out, correction] and reason in [count, loss, expiration, divergence, other]; quantity must be > 0 (rule managerManualStockAdjustmentAllowed)",
                "Compute resultingBalance from StockItem.currentBalance and direction/quantity (in: +quantity, out: -quantity, correction: set to quantity)",
                "Reject if resultingBalance would be negative",
                "Inside ctx.data transaction: create StockAdjustment with status 'posted' via StockAdjustment port; update StockItem.currentBalance to resultingBalance and updatedAt via ctx.mdm.entity.update",
                "Return the created StockAdjustment fields matching outputShape"
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
          "Added StockAdjustment to usecase and function ports alongside DailyShift; StockItem remains MDM via ctx.mdm"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
