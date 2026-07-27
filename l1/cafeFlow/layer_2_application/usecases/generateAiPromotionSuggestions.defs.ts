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
          "validate required operationalDashboardId from selected OperationalDashboard",
          "resolve OperationalDashboard port and load dashboard by operationalDashboardId; fail if not found",
          "resolve Order port and list orders (with embedded order items) covering the last 7 days relative to dashboard.referenceDate / ctx.clock to aggregate salesLast7Days and salesToday per menuItemId",
          "collect distinct menuItemIds from sales aggregation; bulk-read MenuItem via ctx.mdm.collection.getMany({ mdmIds }) (never get inside a loop); read related StockItem balances via ctx.mdm.collection when linked",
          "resolve AiPromotionSuggestion port and list existing suggestions filtered by operationalDashboardId (and status when present), sorted by confidenceScore descending",
          "if no fresh pending suggestions exist for the dashboard, build decision-support suggestion projections in memory from low/slow movers (salesLast7Days, salesToday, currentStockLevel, menuItemName, menuCategoryId), assigning pending status, confidenceScore and optional suggestedDiscountPercent — do NOT auto-launch campaigns (rule aiPromotionSuggestionsAreDecisionSupport)",
          "map each suggestion to the canonical output shape (aiPromotionSuggestionId, operationalDashboardId, menuItemId, menuItemName, menuCategoryId, reason, salesLast7Days, salesToday, currentStockLevel, confidenceScore, suggestedDiscountPercent, status, generatedAt, expiresAt)",
          "return the list sorted by confidenceScore descending; suggestions remain decision-support only and are scoped to the selected operationalDashboardId"
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
