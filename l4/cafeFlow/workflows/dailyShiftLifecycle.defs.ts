/// <mls fileReference="_102051_/l4/cafeFlow/workflows/dailyShiftLifecycle.defs.ts" enhancement="_blank"/>

export const workflowDailyShiftLifecycle = {
  "workflowId": "dailyShiftLifecycle",
  "title": "Ciclo do turno diário",
  "executionMode": "sequential",
  "trigger": "Gerente abre o turno diário para iniciar a operação do dia.",
  "actors": [
    "gerente"
  ],
  "states": [
    "open",
    "closed"
  ],
  "transitions": [
    {
      "from": "open",
      "to": "closed",
      "on": "closeDailyShift",
      "by": "gerente",
      "guard": "Turno deve estar aberto e a operação do dia encerrada"
    }
  ],
  "operationIds": [
    "openDailyShift",
    "closeDailyShift"
  ],
  "entities": [
    "DailyShift",
    "ShiftClosingReport",
    "Order"
  ],
  "rulesApplied": [
    "ordersRequireOpenDailyShift",
    "shiftClosingReportContents"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Organizar a operação do dia e fechar com relatório claro de vendas e rupturas",
    "steps": [
      "O gerente abre o turno diário para agrupar pedidos, vendas e movimentos daquele dia.",
      "Ao longo do dia, acompanha pedidos e estoque dentro do turno aberto.",
      "No encerramento, fecha o turno e revisa o relatório com vendas, itens e indícios de ruptura.",
      "Confere totais de pedidos e formas de pagamento básicas registradas no fechamento."
    ],
    "outcome": "Dia operacional encapsulado em um turno com relatório de fechamento útil para a gestão."
  },
  "pageId": "dailyShiftLifecycle",
  "capabilities": [
    {
      "capabilityId": "dailyShiftLifecycle",
      "title": "Ciclo do turno diário",
      "actor": "gerente",
      "priority": "now"
    }
  ],
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default workflowDailyShiftLifecycle;
