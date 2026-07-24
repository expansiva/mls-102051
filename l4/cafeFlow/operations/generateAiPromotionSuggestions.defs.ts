/// <mls fileReference="_102051_/l4/cafeFlow/operations/generateAiPromotionSuggestions.defs.ts" enhancement="_blank"/>

export const operationGenerateAiPromotionSuggestions = {
  "operationId": "generateAiPromotionSuggestions",
  "title": "Gerar sugestões de itens a promover (IA)",
  "actors": [
    "gerente"
  ],
  "entity": "AiPromotionSuggestion",
  "kind": "view",
  "reads": [
    "AiPromotionSuggestion",
    "OperationalDashboard",
    "MenuItem",
    "OrderItem",
    "Order",
    "StockItem"
  ],
  "writes": [],
  "rulesApplied": [
    "aiPromotionSuggestionsAreDecisionSupport"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Obter sugestões da IA sobre quais itens promover com base nos últimos 7 dias de vendas e estoque",
    "steps": [
      "O gerente solicita sugestões de promoção a partir do dashboard operacional em exibição",
      "O sistema consulta vendas dos últimos 7 dias, itens de cardápio e níveis de estoque vinculados ao dashboard",
      "A IA gera e devolve sugestões com justificativa, confiança e desconto sugerido para apoio à decisão"
    ],
    "outcome": "O gerente recebe a lista de sugestões de itens a promover sem disparo de campanhas automatizadas"
  },
  "accessPattern": {
    "kind": "list",
    "description": "Lista as sugestões de promoção geradas pela IA para o dashboard operacional selecionado",
    "entity": "AiPromotionSuggestion",
    "keyField": "AiPromotionSuggestion.aiPromotionSuggestionId",
    "filters": [
      "AiPromotionSuggestion.operationalDashboardId",
      "AiPromotionSuggestion.status"
    ],
    "sort": [
      "AiPromotionSuggestion.confidenceScore"
    ],
    "pagination": "none",
    "selection": "none",
    "output": [
      "AiPromotionSuggestion.aiPromotionSuggestionId",
      "AiPromotionSuggestion.operationalDashboardId",
      "AiPromotionSuggestion.menuItemId",
      "AiPromotionSuggestion.menuItemName",
      "AiPromotionSuggestion.menuCategoryId",
      "AiPromotionSuggestion.reason",
      "AiPromotionSuggestion.salesLast7Days",
      "AiPromotionSuggestion.salesToday",
      "AiPromotionSuggestion.currentStockLevel",
      "AiPromotionSuggestion.confidenceScore",
      "AiPromotionSuggestion.suggestedDiscountPercent",
      "AiPromotionSuggestion.status",
      "AiPromotionSuggestion.generatedAt",
      "AiPromotionSuggestion.expiresAt"
    ]
  },
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
  },
  "inputs": [
    {
      "inputId": "operationalDashboardId",
      "fieldRef": "AiPromotionSuggestion.operationalDashboardId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador do dashboard operacional a partir do qual as sugestões de promoção serão geradas"
    }
  ],
  "contextResolution": [
    {
      "inputId": "operationalDashboardId",
      "targetRef": "AiPromotionSuggestion.operationalDashboardId",
      "source": "selectedEntity",
      "originRef": "OperationalDashboard.operationalDashboardId",
      "description": "Resolve o dashboard operacional atualmente selecionado/visualizado pelo gerente na tela de operações"
    }
  ],
  "acceptanceAssertions": [
    "Após a solicitação, o gerente recebe uma lista de sugestões de promoção baseadas nos últimos 7 dias de vendas",
    "Cada sugestão retornada inclui menuItemName, reason, salesLast7Days, confidenceScore e status pending",
    "As sugestões geradas são apenas apoio à decisão do gerente e não disparam campanhas automatizadas",
    "As sugestões retornadas estão vinculadas ao operationalDashboardId do dashboard operacional selecionado"
  ],
  "pageId": "generateAiPromotionSuggestions",
  "commandName": "generateAiPromotionSuggestions",
  "bffName": "cafeFlow.generateAiPromotionSuggestions.generateAiPromotionSuggestions",
  "capability": {
    "capabilityId": "generateAiPromotionSuggestions",
    "title": "Gerar sugestões de itens a promover (IA)",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationGenerateAiPromotionSuggestions;
