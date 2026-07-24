/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewOperationalDashboard.defs.ts" enhancement="_blank"/>

export const viewOperationalDashboardUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewOperationalDashboard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewOperationalDashboard",
    "ports": [
      "OperationalDashboard",
      "DailyShift",
      "Order",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "viewOperationalDashboard",
        "inputTypeName": "ViewOperationalDashboardInput",
        "outputTypeName": "ViewOperationalDashboardOutput",
        "input": [],
        "output": [
          {
            "name": "operationalDashboardId",
            "type": "string",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "dailyShiftId",
            "type": "string",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "referenceDate",
            "type": "string",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "todaySalesTotal",
            "type": "number",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "todayOrdersCount",
            "type": "number",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "todayItemsSold",
            "type": "number",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "topMenuItemId",
            "type": "string",
            "required": false,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "topMenuItemQuantity",
            "type": "number",
            "required": false,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "topSellingItemsCount",
            "type": "number",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "lowStockItemsCount",
            "type": "number",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "outOfStockItemsCount",
            "type": "number",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "hasLowStockAlert",
            "type": "boolean",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "lastComputedAt",
            "type": "string",
            "required": true,
            "ofEntity": "OperationalDashboard"
          },
          {
            "name": "topSellingItems",
            "type": "array",
            "required": true
          },
          {
            "name": "lowStockAlerts",
            "type": "array",
            "required": true
          }
        ],
        "ports": [
          "OperationalDashboard",
          "DailyShift",
          "Order"
        ],
        "rulesApplied": [
          "lowStockMustBeVisible",
          "dashboardHighlightsCoreMetrics"
        ],
        "transactional": false,
        "steps": [
          "Resolve the single open DailyShift (status 'open') via DailyShift port; if none is open, return validation error or empty dashboard per L4 (never treat dailyShiftId as missing client input)",
          "Load OperationalDashboard for the resolved dailyShiftId via OperationalDashboard port (lookup by dailyShiftId)",
          "List Orders for the open dailyShiftId via Order port; aggregate non-cancelled orders for todaySalesTotal, todayOrdersCount and todayItemsSold from order totals and embedded OrderItems",
          "Aggregate OrderItems by menuItemId to rank top sellers; collect distinct menuItemIds and bulk-read MenuItem via ctx.mdm.collection.getMany",
          "Build topSellingItems (menuItemId, name, quantitySold, unitPrice) and set topMenuItemId, topMenuItemQuantity, topSellingItemsCount (dashboardHighlightsCoreMetrics)",
          "List StockItem via ctx.mdm.collection.listByType; select items where currentBalance <= minimumLevel (lowStockMustBeVisible); count lowStockItemsCount and outOfStockItemsCount (currentBalance <= 0); set hasLowStockAlert when any alert exists",
          "Build lowStockAlerts with stockItemId, name, currentBalance, minimumLevel, unit, isOutOfStock",
          "Compose output from OperationalDashboard snapshot fields plus computed topSellingItems and lowStockAlerts; expose lastComputedAt as the aggregation timestamp"
        ],
        "outputShape": {
          "kind": "object",
          "fields": [
            {
              "name": "operationalDashboardId",
              "type": "string",
              "required": true,
              "fieldRef": "OperationalDashboard.operationalDashboardId"
            },
            {
              "name": "dailyShiftId",
              "type": "string",
              "required": true,
              "fieldRef": "OperationalDashboard.dailyShiftId"
            },
            {
              "name": "referenceDate",
              "type": "string",
              "required": true,
              "fieldRef": "OperationalDashboard.referenceDate"
            },
            {
              "name": "todaySalesTotal",
              "type": "number",
              "required": true,
              "fieldRef": "OperationalDashboard.todaySalesTotal"
            },
            {
              "name": "todayOrdersCount",
              "type": "number",
              "required": true,
              "fieldRef": "OperationalDashboard.todayOrdersCount"
            },
            {
              "name": "todayItemsSold",
              "type": "number",
              "required": true,
              "fieldRef": "OperationalDashboard.todayItemsSold"
            },
            {
              "name": "topMenuItemId",
              "type": "string",
              "required": false,
              "fieldRef": "OperationalDashboard.topMenuItemId"
            },
            {
              "name": "topMenuItemQuantity",
              "type": "number",
              "required": false,
              "fieldRef": "OperationalDashboard.topMenuItemQuantity"
            },
            {
              "name": "topSellingItemsCount",
              "type": "number",
              "required": true,
              "fieldRef": "OperationalDashboard.topSellingItemsCount"
            },
            {
              "name": "lowStockItemsCount",
              "type": "number",
              "required": true,
              "fieldRef": "OperationalDashboard.lowStockItemsCount"
            },
            {
              "name": "outOfStockItemsCount",
              "type": "number",
              "required": true,
              "fieldRef": "OperationalDashboard.outOfStockItemsCount"
            },
            {
              "name": "hasLowStockAlert",
              "type": "boolean",
              "required": true,
              "fieldRef": "OperationalDashboard.hasLowStockAlert"
            },
            {
              "name": "lastComputedAt",
              "type": "string",
              "required": true,
              "fieldRef": "OperationalDashboard.lastComputedAt"
            },
            {
              "name": "topSellingItems",
              "type": "array",
              "required": true,
              "item": {
                "fields": [
                  {
                    "name": "menuItemId",
                    "type": "string",
                    "required": true,
                    "fieldRef": "MenuItem.menuItemId"
                  },
                  {
                    "name": "name",
                    "type": "string",
                    "required": true,
                    "fieldRef": "MenuItem.name"
                  },
                  {
                    "name": "quantitySold",
                    "type": "number",
                    "required": true
                  },
                  {
                    "name": "unitPrice",
                    "type": "number",
                    "required": true,
                    "fieldRef": "MenuItem.price"
                  }
                ]
              }
            },
            {
              "name": "lowStockAlerts",
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
                    "name": "unit",
                    "type": "string",
                    "required": true,
                    "fieldRef": "StockItem.unit"
                  },
                  {
                    "name": "isOutOfStock",
                    "type": "boolean",
                    "required": true
                  }
                ]
              }
            }
          ]
        }
      }
    ],
    "rulesApplied": [
      "lowStockMustBeVisible",
      "dashboardHighlightsCoreMetrics"
    ],
    "mdmRefs": [
      "MenuItem",
      "StockItem"
    ]
  }
} as const;

export default viewOperationalDashboardUsecase;

export const pipeline = [
  {
    "id": "viewOperationalDashboard__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewOperationalDashboard.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewOperationalDashboard.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "lowStockMustBeVisible",
      "dashboardHighlightsCoreMetrics"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
