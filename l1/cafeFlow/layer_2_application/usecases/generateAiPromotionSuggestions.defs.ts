/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiPromotionSuggestions.defs.ts" enhancement="_blank"/>

export const generateAiPromotionSuggestionsUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "generateAiPromotionSuggestions",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "generateAiPromotionSuggestions",
    "ports": [
      "AiPromotionSuggestion",
      "OperationalDashboard",
      "Order",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "generateAiPromotionSuggestions",
        "inputTypeName": "GenerateAiPromotionSuggestionsInput",
        "outputTypeName": "GenerateAiPromotionSuggestionsOutput",
        "input": [
          {
            "name": "operationalDashboardId",
            "type": "string",
            "required": true,
            "ofEntity": "AiPromotionSuggestion",
            "fieldRef": "AiPromotionSuggestion.operationalDashboardId"
          }
        ],
        "output": [
          {
            "name": "aiPromotionSuggestionId",
            "type": "string",
            "required": true,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "operationalDashboardId",
            "type": "string",
            "required": true,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "menuItemId",
            "type": "string",
            "required": true,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "menuItemName",
            "type": "string",
            "required": true,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": false,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "reason",
            "type": "string",
            "required": true,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "salesLast7Days",
            "type": "number",
            "required": true,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "salesToday",
            "type": "number",
            "required": false,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "currentStockLevel",
            "type": "number",
            "required": false,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "confidenceScore",
            "type": "number",
            "required": true,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "suggestedDiscountPercent",
            "type": "number",
            "required": false,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "generatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "AiPromotionSuggestion"
          },
          {
            "name": "expiresAt",
            "type": "string",
            "required": false,
            "ofEntity": "AiPromotionSuggestion"
          }
        ],
        "ports": [
          "AiPromotionSuggestion",
          "OperationalDashboard",
          "Order"
        ],
        "rulesApplied": [
          "aiPromotionSuggestionsAreDecisionSupport"
        ],
        "transactional": false,
        "steps": [
          "resolveRepository AiPromotionSuggestion, OperationalDashboard, Order ports",
          "load OperationalDashboard by input.operationalDashboardId; if not found, fail validation",
          "list Orders via Order port for sales window covering last 7 days relative to dashboard.referenceDate (and today slice)",
          "aggregate order line quantities by menuItemId into salesLast7Days and salesToday maps (skip cancelled orders/items)",
          "collect distinct menuItemIds from aggregates; bulk-read MenuItem via ctx.mdm.collection.getMany / hydrateMany (never get-in-loop)",
          "collect stock-related ids from menu/stock links when present; bulk-read StockItem via ctx.mdm.collection.getMany for currentBalance as currentStockLevel",
          "list existing AiPromotionSuggestion via AiPromotionSuggestion port filtered by operationalDashboardId (and optionally status)",
          "if none (or stale vs lastComputedAt), build decision-support suggestion projections per underperforming/high-stock menu items: reason, confidenceScore, suggestedDiscountPercent, status='pending', generatedAt=ctx.clock, optional expiresAt — do NOT trigger campaigns or mutate promotions (rule aiPromotionSuggestionsAreDecisionSupport)",
          "sort suggestions by confidenceScore descending",
          "return list shaped as outputShape fields only (aiPromotionSuggestionId, operationalDashboardId, menuItemId, menuItemName, menuCategoryId, reason, salesLast7Days, salesToday, currentStockLevel, confidenceScore, suggestedDiscountPercent, status, generatedAt, expiresAt)"
        ],
        "outputShape": {
          "kind": "list",
          "fields": [
            {
              "name": "aiPromotionSuggestionId",
              "type": "string",
              "required": true,
              "fieldRef": "AiPromotionSuggestion.aiPromotionSuggestionId"
            },
            {
              "name": "operationalDashboardId",
              "type": "string",
              "required": true,
              "fieldRef": "AiPromotionSuggestion.operationalDashboardId"
            },
            {
              "name": "menuItemId",
              "type": "string",
              "required": true,
              "fieldRef": "AiPromotionSuggestion.menuItemId"
            },
            {
              "name": "menuItemName",
              "type": "string",
              "required": true,
              "fieldRef": "AiPromotionSuggestion.menuItemName"
            },
            {
              "name": "menuCategoryId",
              "type": "string",
              "required": false,
              "fieldRef": "AiPromotionSuggestion.menuCategoryId"
            },
            {
              "name": "reason",
              "type": "string",
              "required": true,
              "fieldRef": "AiPromotionSuggestion.reason"
            },
            {
              "name": "salesLast7Days",
              "type": "number",
              "required": true,
              "fieldRef": "AiPromotionSuggestion.salesLast7Days"
            },
            {
              "name": "salesToday",
              "type": "number",
              "required": false,
              "fieldRef": "AiPromotionSuggestion.salesToday"
            },
            {
              "name": "currentStockLevel",
              "type": "number",
              "required": false,
              "fieldRef": "AiPromotionSuggestion.currentStockLevel"
            },
            {
              "name": "confidenceScore",
              "type": "number",
              "required": true,
              "fieldRef": "AiPromotionSuggestion.confidenceScore"
            },
            {
              "name": "suggestedDiscountPercent",
              "type": "number",
              "required": false,
              "fieldRef": "AiPromotionSuggestion.suggestedDiscountPercent"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "fieldRef": "AiPromotionSuggestion.status"
            },
            {
              "name": "generatedAt",
              "type": "string",
              "required": true,
              "fieldRef": "AiPromotionSuggestion.generatedAt"
            },
            {
              "name": "expiresAt",
              "type": "string",
              "required": false,
              "fieldRef": "AiPromotionSuggestion.expiresAt"
            }
          ]
        }
      }
    ],
    "rulesApplied": [
      "aiPromotionSuggestionsAreDecisionSupport"
    ],
    "mdmRefs": [
      "MenuItem",
      "StockItem"
    ]
  }
} as const;

export default generateAiPromotionSuggestionsUsecase;

export const pipeline = [
  {
    "id": "generateAiPromotionSuggestions__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiPromotionSuggestions.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiPromotionSuggestions.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/aiPromotionSuggestionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.d.ts",
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
      "aiPromotionSuggestionsAreDecisionSupport"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
