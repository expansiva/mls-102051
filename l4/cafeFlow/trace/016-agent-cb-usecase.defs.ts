{
  "savedAt": "2026-07-22T21:19:48.574Z",
  "agentName": "agentCbUsecase",
  "stepId": 16,
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
                "Load existing StockItem by stockItemId via ctx.mdm.entity.get({ mdmId: stockItemId }); fail if not found",
                "Validate name is non-empty",
                "Validate unit is one of: kg, liter, portion, unit",
                "Validate minimumLevel is >= 0",
                "Apply lowStockMustBeVisible inline: after update, if currentBalance < new minimumLevel the item remains eligible for low-stock highlight/alerts (visibility is driven by comparing currentBalance to minimumLevel; do not hide or clear balance)",
                "Do not modify currentBalance — cadastral update only",
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
          "rulesApplied": [
            "lowStockMustBeVisible"
          ],
          "mdmRefs": [
            "StockItem"
          ]
        },
        "questions": [],
        "trace": [
          "StockItem is mdmRef — update via ctx.mdm.entity, ports empty",
          "Public inputs: stockItemId (routeParam), name/unit/minimumLevel/description (userInput)",
          "updatedAt from ctx.clock systemDefault",
          "outputShape mirrored verbatim",
          "lowStockMustBeVisible applied inline; currentBalance preserved"
        ]
      }
    },
    "status": "completed",
    "stepId": 23,
    "interaction": null,
    "nextSteps": null
  }
}
