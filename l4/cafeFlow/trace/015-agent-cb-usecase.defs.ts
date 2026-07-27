{
  "savedAt": "2026-07-24T20:01:09.923Z",
  "agentName": "agentCbUsecase",
  "stepId": 15,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitUsecase",
      "arguments": {
        "status": "ok",
        "result": {
          "usecaseId": "updateStockItem",
          "ports": [],
          "functions": [
            {
              "functionName": "updateStockItem",
              "inputTypeName": "UpdateStockItemInput",
              "outputTypeName": "UpdateStockItemOutput",
              "input": [
                {
                  "name": "stockItemId",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockItem",
                  "fieldRef": "StockItem.stockItemId"
                },
                {
                  "name": "name",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockItem",
                  "fieldRef": "StockItem.name"
                },
                {
                  "name": "unit",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockItem",
                  "fieldRef": "StockItem.unit"
                },
                {
                  "name": "minimumLevel",
                  "type": "number",
                  "required": true,
                  "ofEntity": "StockItem",
                  "fieldRef": "StockItem.minimumLevel"
                },
                {
                  "name": "description",
                  "type": "string",
                  "required": false,
                  "ofEntity": "StockItem",
                  "fieldRef": "StockItem.description"
                }
              ],
              "output": [
                {
                  "name": "stockItemId",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockItem"
                },
                {
                  "name": "name",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockItem"
                },
                {
                  "name": "unit",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockItem"
                },
                {
                  "name": "currentBalance",
                  "type": "number",
                  "required": true,
                  "ofEntity": "StockItem"
                },
                {
                  "name": "minimumLevel",
                  "type": "number",
                  "required": true,
                  "ofEntity": "StockItem"
                },
                {
                  "name": "description",
                  "type": "string",
                  "required": false,
                  "ofEntity": "StockItem"
                },
                {
                  "name": "updatedAt",
                  "type": "string",
                  "required": true,
                  "ofEntity": "StockItem"
                }
              ],
              "ports": [],
              "rulesApplied": [
                "lowStockMustBeVisible"
              ],
              "transactional": true,
              "steps": [
                "Resolve updatedAt from ctx.clock.now() (systemDefault); do not accept it from the client",
                "Load existing StockItem via ctx.mdm.entity.get({ mdmId: stockItemId }); fail if not found",
                "Validate unit is one of kg|liter|portion|unit; validate name is non-empty; validate minimumLevel >= 0",
                "Apply lowStockMustBeVisible inline: after update, if currentBalance < new minimumLevel the item remains eligible for low-stock highlight (no extra persistence flag required beyond the stored minimumLevel vs currentBalance)",
                "Do not mutate currentBalance — cadastral update only",
                "Persist via ctx.mdm.entity.update with name, unit, minimumLevel, description and updatedAt",
                "Return stockItemId, name, unit, currentBalance (unchanged), minimumLevel, description, updatedAt"
              ],
              "outputShape": {
                "kind": "object",
                "fields": [
                  {
                    "name": "stockItemId",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockItem.stockItemId"
                  },
                  {
                    "name": "name",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockItem.name"
                  },
                  {
                    "name": "unit",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockItem.unit"
                  },
                  {
                    "name": "currentBalance",
                    "type": "number",
                    "required": true,
                    "fieldRef": "StockItem.currentBalance"
                  },
                  {
                    "name": "minimumLevel",
                    "type": "number",
                    "required": true,
                    "fieldRef": "StockItem.minimumLevel"
                  },
                  {
                    "name": "description",
                    "type": "string",
                    "required": false,
                    "fieldRef": "StockItem.description"
                  },
                  {
                    "name": "updatedAt",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockItem.updatedAt"
                  }
                ]
              }
            }
          ],
          "mdmRefs": [
            "StockItem"
          ]
        },
        "questions": [],
        "trace": [
          "StockItem is mdmRef — no port; MDM update via ctx.mdm.entity",
          "Public inputs: routeParam stockItemId + userInput name/unit/minimumLevel/description",
          "updatedAt from ctx.clock; currentBalance preserved",
          "outputShape mirrored verbatim; rule lowStockMustBeVisible applied inline"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
