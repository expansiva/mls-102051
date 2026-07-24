/// <mls fileReference="_102051_/l4/cafeFlow/journeys/useDashboardAndAi.defs.ts" enhancement="_blank"/>

export const useDashboardAndAiJourney = {
  "journeyId": "useDashboardAndAi",
  "actorId": "gerente",
  "title": "Usar dashboard e assistente de IA",
  "goal": "Entender vendas de hoje, itens fortes e o que promover, com apoio de IA",
  "steps": [
    "Abrir dashboard operacional",
    "Pedir resumo de vendas do dia",
    "Pedir sugestões de itens a promover",
    "Agir com base nos insights"
  ],
  "outcome": "Gerente com visão operacional do dia e recomendações de IA acionáveis.",
  "operationIds": [
    "viewOperationalDashboard",
    "browseStockItems",
    "generateAiSalesSummary",
    "generateAiPromotionSuggestions",
    "browseMenuItems",
    "createMenuItem",
    "updateMenuItem",
    "createStockItem",
    "updateStockItem",
    "deleteStockItem"
  ],
  "workspaceId": "menuManagement"
} as const;

export default useDashboardAndAiJourney;
