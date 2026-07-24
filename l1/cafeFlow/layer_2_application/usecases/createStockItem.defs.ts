/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createStockItem.defs.ts" enhancement="_blank"/>

export const createStockItemUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createStockItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createStockItem",
    "ports": [],
    "functions": [
      {
        "functionName": "createStockItem",
        "inputTypeName": "CreateStockItemInput",
        "outputTypeName": "CreateStockItemOutput",
        "input": [
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
            "name": "currentBalance",
            "type": "number",
            "required": true,
            "ofEntity": "StockItem",
            "fieldRef": "StockItem.currentBalance"
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
            "name": "createdAt",
            "type": "string",
            "required": true,
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
          "Generate stockItemId via ctx.idGenerator and createdAt/updatedAt via ctx.clock.now()",
          "Validate name is non-empty",
          "Validate unit is one of: kg, liter, portion, unit",
          "Validate currentBalance >= 0 and minimumLevel >= 0",
          "Apply lowStockMustBeVisible inline: persist currentBalance and minimumLevel so the item is eligible for low-stock visibility whenever currentBalance <= minimumLevel (no extra flag; alert queries compare these fields)",
          "Create StockItem via ctx.mdm.entity.create with mdmId=stockItemId, type StockItem, and fields name, unit, currentBalance, minimumLevel, description, createdAt, updatedAt (module-specific fields under details.cafeFlow when applicable)",
          "Return the created stock item projection matching outputShape"
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
              "name": "createdAt",
              "type": "string",
              "required": true,
              "fieldRef": "StockItem.createdAt"
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

export default createStockItemUsecase;

export const pipeline = [
  {
    "id": "createStockItem__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createStockItem.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createStockItem.defs.ts",
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
