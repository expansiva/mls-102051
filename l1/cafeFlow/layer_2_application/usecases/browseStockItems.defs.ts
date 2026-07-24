/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.defs.ts" enhancement="_blank"/>

export const browseStockItemsUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "browseStockItems",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "browseStockItems",
    "ports": [],
    "functions": [
      {
        "functionName": "browseStockItems",
        "inputTypeName": "BrowseStockItemsInput",
        "outputTypeName": "BrowseStockItemsOutput",
        "input": [
          {
            "name": "nameFilter",
            "type": "string",
            "required": false,
            "fieldRef": "StockItem.name"
          },
          {
            "name": "lowStockOnly",
            "type": "boolean",
            "required": false
          },
          {
            "name": "page",
            "type": "number",
            "required": false
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": false
          }
        ],
        "output": [
          {
            "name": "stockItems",
            "type": "array",
            "required": true
          },
          {
            "name": "total",
            "type": "number",
            "required": true
          }
        ],
        "ports": [],
        "rulesApplied": [
          "lowStockMustBeVisible"
        ],
        "transactional": false,
        "steps": [
          "list StockItem records via ctx.mdm.collection.listByType for type StockItem",
          "when nameFilter is provided, keep only items whose name matches the filter (case-insensitive contains)",
          "for each item compute isLowStock inline per lowStockMustBeVisible: currentBalance <= minimumLevel",
          "when lowStockOnly is true, keep only items where isLowStock is true",
          "sort remaining items by name ascending",
          "compute total as the count after filters",
          "apply optional page/pageSize pagination and return stockItems page plus total"
        ],
        "outputShape": {
          "kind": "paginated",
          "fields": [
            {
              "name": "stockItems",
              "type": "array",
              "required": true,
              "item": {
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
                  },
                  {
                    "name": "isLowStock",
                    "type": "boolean",
                    "required": true
                  }
                ]
              }
            },
            {
              "name": "total",
              "type": "number",
              "required": true
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

export default browseStockItemsUsecase;

export const pipeline = [
  {
    "id": "browseStockItems__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.defs.ts",
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
