/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateStockItem.defs.ts" enhancement="_blank"/>

export const updateStockItemUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateStockItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
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
          "Load existing StockItem by stockItemId via ctx.mdm.entity.get({ mdmId: stockItemId }); if not found, fail with not-found",
          "Validate name is non-empty; unit is one of kg|liter|portion|unit; minimumLevel is a finite number >= 0",
          "Apply lowStockMustBeVisible inline: after update, when currentBalance < minimumLevel the item remains eligible for low-stock highlight in stock control and dashboard (no extra persistence flag; visibility is derived from balance vs minimumLevel). Do not mutate currentBalance",
          "Update StockItem via ctx.mdm.entity.update with name, unit, minimumLevel, description and updatedAt; preserve currentBalance and createdAt",
          "Return stockItemId, name, unit, currentBalance, minimumLevel, description, updatedAt"
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
  }
} as const;

export default updateStockItemUsecase;

export const pipeline = [
  {
    "id": "updateStockItem__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateStockItem.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateStockItem.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "lowStockMustBeVisible"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
