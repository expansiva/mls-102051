/// <mls fileReference="_102051_/l4/cafeFlow/workspaces/aiAssistant.defs.ts" enhancement="_blank"/>

export const aiAssistantWorkspace = {
  "workspaceId": "aiAssistant",
  "title": "Assistente de IA do gerente",
  "actors": [
    "gerente"
  ],
  "kind": "operation",
  "entity": "DailySalesSummary",
  "bffCalls": [
    {
      "bffId": "generateDailySummary",
      "kind": "command",
      "uses": [
        {
          "operationId": "generateDailySalesSummary"
        }
      ],
      "input": [],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "dailySalesSummaryId",
            "from": "generateDailySalesSummary.dailySalesSummaryId"
          },
          {
            "name": "shiftId",
            "from": "generateDailySalesSummary.shiftId"
          },
          {
            "name": "summaryText",
            "from": "generateDailySalesSummary.summaryText"
          },
          {
            "name": "generatedAt",
            "from": "generateDailySalesSummary.generatedAt"
          },
          {
            "name": "modelVersion",
            "from": "generateDailySalesSummary.modelVersion"
          },
          {
            "name": "sourceDataSnapshot",
            "from": "generateDailySalesSummary.sourceDataSnapshot"
          },
          {
            "name": "createdAt",
            "from": "generateDailySalesSummary.createdAt"
          }
        ]
      },
      "route": "cafeFlow.aiAssistant.generateDailySummary"
    },
    {
      "bffId": "generatePromotionSuggestions",
      "kind": "command",
      "uses": [
        {
          "operationId": "generatePromotionSuggestions"
        }
      ],
      "input": [],
      "output": {
        "kind": "object",
        "fields": [
          {
            "name": "promotionSuggestionId",
            "from": "generatePromotionSuggestions.promotionSuggestionId"
          },
          {
            "name": "shiftId",
            "from": "generatePromotionSuggestions.shiftId"
          },
          {
            "name": "generatedAt",
            "from": "generatePromotionSuggestions.generatedAt"
          },
          {
            "name": "analysisWindowDays",
            "from": "generatePromotionSuggestions.analysisWindowDays"
          },
          {
            "name": "reason",
            "from": "generatePromotionSuggestions.reason"
          },
          {
            "name": "managerDecision",
            "from": "generatePromotionSuggestions.managerDecision"
          },
          {
            "name": "createdAt",
            "from": "generatePromotionSuggestions.createdAt"
          }
        ]
      },
      "route": "cafeFlow.aiAssistant.generatePromotionSuggestions"
    }
  ],
  "sections": [
    {
      "sectionId": "aiAssistantSection",
      "intent": "O gerente solicita à IA o resumo das vendas do dia e sugestões de itens a promover.",
      "organisms": [
        {
          "role": "primarySurface",
          "action": "generateDailySummary"
        },
        {
          "role": "contextualAction",
          "action": "generatePromotionSuggestions"
        }
      ]
    }
  ],
  "operationIds": [
    "generateDailySalesSummary",
    "generatePromotionSuggestions"
  ],
  "purpose": "O gerente pede à IA o resumo das vendas do dia e sugestões de itens a promover.",
  "sliceHash": "djb2:445d8406"
} as const;

export default aiAssistantWorkspace;
