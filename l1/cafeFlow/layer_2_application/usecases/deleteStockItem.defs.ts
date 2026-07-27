/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/deleteStockItem.defs.ts" enhancement="_blank"/>

export const deleteStockItemUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "deleteStockItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "deleteStockItem",
    "ports": [],
    "functions": [
      {
        "functionName": "deleteStockItem",
        "inputTypeName": "DeleteStockItemInput",
        "outputTypeName": "DeleteStockItemOutput",
        "input": [
          {
            "name": "stockItemId",
            "type": "string",
            "required": true,
            "ofEntity": "StockItem",
            "fieldRef": "StockItem.stockItemId"
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
          }
        ],
        "ports": [],
        "rulesApplied": [],
        "transactional": true,
        "steps": [
          "Load StockItem by stockItemId via ctx.mdm.entity.get({ mdmId: stockItemId }); if not found, fail with not-found validation error",
          "Capture name from the loaded StockItem before deletion",
          "Delete the StockItem via ctx.mdm.entity.delete({ mdmId: stockItemId }) inside the transaction wrapper (ctx.data)",
          "Return stockItemId and name of the removed item"
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
            }
          ]
        }
      }
    ],
    "mdmRefs": [
      "StockItem"
    ]
  }
} as const;

export default deleteStockItemUsecase;

export const pipeline = [
  {
    "id": "deleteStockItem__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/deleteStockItem.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/deleteStockItem.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
