/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/dashboardWorkspace.defs.ts" enhancement="_blank"/>

export const dashboardWorkspaceController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "dashboardWorkspace",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "dashboardWorkspace",
    "controllerName": "DashboardWorkspaceController",
    "ownerKind": "workspace",
    "workspaceId": "dashboardWorkspace",
    "actors": [
      "gerente"
    ],
    "allowedScopes": [
      "cafeFlow:gerente"
    ],
    "handlers": [
      {
        "handlerName": "dashboardWorkspaceGetDashboardHandler",
        "command": "getDashboard",
        "bffId": "getDashboard",
        "route": "cafeFlow.dashboardWorkspace.getDashboard",
        "kind": "query",
        "usecaseRef": "viewOperationalDashboard",
        "usecaseRefs": [
          "viewOperationalDashboard"
        ],
        "inputTypeName": "ViewOperationalDashboardInput",
        "inputContract": [
          {
            "inputId": "dailyShiftId",
            "fieldRef": "OperationalDashboard.dailyShiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Identificador do turno diário aberto a partir do qual o dashboard operacional é calculado e exibido"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "operationalDashboardId",
              "operationId": "viewOperationalDashboard",
              "path": [
                "operationalDashboardId"
              ],
              "fromItems": false
            },
            {
              "name": "dailyShiftId",
              "operationId": "viewOperationalDashboard",
              "path": [
                "dailyShiftId"
              ],
              "fromItems": false
            },
            {
              "name": "referenceDate",
              "operationId": "viewOperationalDashboard",
              "path": [
                "referenceDate"
              ],
              "fromItems": false
            },
            {
              "name": "todaySalesTotal",
              "operationId": "viewOperationalDashboard",
              "path": [
                "todaySalesTotal"
              ],
              "fromItems": false
            },
            {
              "name": "todayOrdersCount",
              "operationId": "viewOperationalDashboard",
              "path": [
                "todayOrdersCount"
              ],
              "fromItems": false
            },
            {
              "name": "todayItemsSold",
              "operationId": "viewOperationalDashboard",
              "path": [
                "todayItemsSold"
              ],
              "fromItems": false
            },
            {
              "name": "topMenuItemId",
              "operationId": "viewOperationalDashboard",
              "path": [
                "topMenuItemId"
              ],
              "fromItems": false
            },
            {
              "name": "topMenuItemQuantity",
              "operationId": "viewOperationalDashboard",
              "path": [
                "topMenuItemQuantity"
              ],
              "fromItems": false
            },
            {
              "name": "topSellingItemsCount",
              "operationId": "viewOperationalDashboard",
              "path": [
                "topSellingItemsCount"
              ],
              "fromItems": false
            },
            {
              "name": "lowStockItemsCount",
              "operationId": "viewOperationalDashboard",
              "path": [
                "lowStockItemsCount"
              ],
              "fromItems": false
            },
            {
              "name": "outOfStockItemsCount",
              "operationId": "viewOperationalDashboard",
              "path": [
                "outOfStockItemsCount"
              ],
              "fromItems": false
            },
            {
              "name": "hasLowStockAlert",
              "operationId": "viewOperationalDashboard",
              "path": [
                "hasLowStockAlert"
              ],
              "fromItems": false
            },
            {
              "name": "lastComputedAt",
              "operationId": "viewOperationalDashboard",
              "path": [
                "lastComputedAt"
              ],
              "fromItems": false
            },
            {
              "name": "topSellingItems",
              "operationId": "viewOperationalDashboard",
              "path": [
                "topSellingItems"
              ],
              "fromItems": false
            },
            {
              "name": "lowStockAlerts",
              "operationId": "viewOperationalDashboard",
              "path": [
                "lowStockAlerts"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "dashboardWorkspaceGetAiSalesSummaryHandler",
        "command": "getAiSalesSummary",
        "bffId": "getAiSalesSummary",
        "route": "cafeFlow.dashboardWorkspace.getAiSalesSummary",
        "kind": "query",
        "usecaseRef": "generateAiSalesSummary",
        "usecaseRefs": [
          "generateAiSalesSummary"
        ],
        "inputTypeName": "GenerateAiSalesSummaryInput",
        "inputContract": [
          {
            "inputId": "operationalDashboardId",
            "fieldRef": "OperationalDashboard.operationalDashboardId",
            "required": true,
            "source": "selectedEntity",
            "description": "Dashboard operacional atualmente em contexto, a partir do qual o resumo de vendas será derivado"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "aiSalesSummaryId",
              "operationId": "generateAiSalesSummary",
              "path": [
                "aiSalesSummaryId"
              ],
              "fromItems": false
            },
            {
              "name": "operationalDashboardId",
              "operationId": "generateAiSalesSummary",
              "path": [
                "operationalDashboardId"
              ],
              "fromItems": false
            },
            {
              "name": "summaryDate",
              "operationId": "generateAiSalesSummary",
              "path": [
                "summaryDate"
              ],
              "fromItems": false
            },
            {
              "name": "periodStart",
              "operationId": "generateAiSalesSummary",
              "path": [
                "periodStart"
              ],
              "fromItems": false
            },
            {
              "name": "periodEnd",
              "operationId": "generateAiSalesSummary",
              "path": [
                "periodEnd"
              ],
              "fromItems": false
            },
            {
              "name": "summaryText",
              "operationId": "generateAiSalesSummary",
              "path": [
                "summaryText"
              ],
              "fromItems": false
            },
            {
              "name": "modelId",
              "operationId": "generateAiSalesSummary",
              "path": [
                "modelId"
              ],
              "fromItems": false
            },
            {
              "name": "promptTokens",
              "operationId": "generateAiSalesSummary",
              "path": [
                "promptTokens"
              ],
              "fromItems": false
            },
            {
              "name": "completionTokens",
              "operationId": "generateAiSalesSummary",
              "path": [
                "completionTokens"
              ],
              "fromItems": false
            },
            {
              "name": "generatedAt",
              "operationId": "generateAiSalesSummary",
              "path": [
                "generatedAt"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "dashboardWorkspaceGetAiPromotionSuggestionsHandler",
        "command": "getAiPromotionSuggestions",
        "bffId": "getAiPromotionSuggestions",
        "route": "cafeFlow.dashboardWorkspace.getAiPromotionSuggestions",
        "kind": "query",
        "usecaseRef": "generateAiPromotionSuggestions",
        "usecaseRefs": [
          "generateAiPromotionSuggestions"
        ],
        "inputTypeName": "GenerateAiPromotionSuggestionsInput",
        "inputContract": [
          {
            "inputId": "operationalDashboardId",
            "fieldRef": "AiPromotionSuggestion.operationalDashboardId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador do dashboard operacional a partir do qual as sugestões de promoção serão geradas"
          }
        ],
        "projection": {
          "kind": "list",
          "arrayFieldName": null,
          "itemFields": [
            {
              "name": "aiPromotionSuggestionId",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "aiPromotionSuggestionId"
              ],
              "fromItems": true
            },
            {
              "name": "operationalDashboardId",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "operationalDashboardId"
              ],
              "fromItems": true
            },
            {
              "name": "menuItemId",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "menuItemId"
              ],
              "fromItems": true
            },
            {
              "name": "menuItemName",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "menuItemName"
              ],
              "fromItems": true
            },
            {
              "name": "menuCategoryId",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "menuCategoryId"
              ],
              "fromItems": true
            },
            {
              "name": "reason",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "reason"
              ],
              "fromItems": true
            },
            {
              "name": "salesLast7Days",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "salesLast7Days"
              ],
              "fromItems": true
            },
            {
              "name": "salesToday",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "salesToday"
              ],
              "fromItems": true
            },
            {
              "name": "currentStockLevel",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "currentStockLevel"
              ],
              "fromItems": true
            },
            {
              "name": "confidenceScore",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "confidenceScore"
              ],
              "fromItems": true
            },
            {
              "name": "suggestedDiscountPercent",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "suggestedDiscountPercent"
              ],
              "fromItems": true
            },
            {
              "name": "status",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "status"
              ],
              "fromItems": true
            },
            {
              "name": "generatedAt",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "generatedAt"
              ],
              "fromItems": true
            },
            {
              "name": "expiresAt",
              "operationId": "generateAiPromotionSuggestions",
              "path": [
                "expiresAt"
              ],
              "fromItems": true
            }
          ],
          "topFields": []
        },
        "optionalUses": []
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.dashboardWorkspace.getDashboard",
        "handlerName": "dashboardWorkspaceGetDashboardHandler"
      },
      {
        "key": "cafeFlow.dashboardWorkspace.getAiSalesSummary",
        "handlerName": "dashboardWorkspaceGetAiSalesSummaryHandler"
      },
      {
        "key": "cafeFlow.dashboardWorkspace.getAiPromotionSuggestions",
        "handlerName": "dashboardWorkspaceGetAiPromotionSuggestionsHandler"
      }
    ]
  }
} as const;

export default dashboardWorkspaceController;

export const pipeline = [
  {
    "id": "dashboardWorkspace__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/dashboardWorkspace.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/dashboardWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/viewOperationalDashboard.d.ts",
      "_102051_/l4/cafeFlow/contracts/dashboardWorkspace.getDashboard.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiSalesSummary.d.ts",
      "_102051_/l4/cafeFlow/contracts/dashboardWorkspace.getAiSalesSummary.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiPromotionSuggestions.d.ts",
      "_102051_/l4/cafeFlow/contracts/dashboardWorkspace.getAiPromotionSuggestions.defs.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
