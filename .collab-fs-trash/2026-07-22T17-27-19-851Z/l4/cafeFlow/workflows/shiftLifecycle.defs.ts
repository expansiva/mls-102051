/// <mls fileReference="_102051_/l4/cafeFlow/workflows/shiftLifecycle.defs.ts" enhancement="_blank"/>

export const workflowShiftLifecycle = {
  "workflowId": "shiftLifecycle",
  "title": "Ciclo de vida do turno diário",
  "executionMode": "sequential",
  "trigger": "Gerente abre o turno do dia na unidade para iniciar as operações.",
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
      "on": "closeShift",
      "by": "gerente",
      "guard": "Não há pedidos ativos além dos já cancelados ou entregues/retirados"
    }
  ],
  "operationIds": [
    "openShift",
    "closeShift"
  ],
  "entities": [
    "Shift",
    "Order",
    "ShiftReport"
  ],
  "rulesApplied": [
    "oneOpenShiftPerUnitPerDay",
    "shiftCloseRequiresNoActiveOrders",
    "shiftReportPreservedAfterReopen"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Abrir o turno do dia para registrar pedidos e encerrá-lo com relatório de fechamento.",
    "steps": [
      "O gerente verifica o contexto da unidade e se existe turno anterior em aberto.",
      "O gerente abre o turno do dia registrando o horário de início.",
      "O gerente confere pedidos ainda em aberto antes de fechar o turno.",
      "O gerente encerra o turno e consulta o relatório de fechamento."
    ],
    "outcome": "Turno encerrado com relatório de fechamento disponível para consulta."
  },
  "pageId": "shiftLifecycle",
  "capabilities": [
    {
      "capabilityId": "shiftLifecycle",
      "title": "Ciclo de vida do turno diário",
      "actor": "gerente",
      "priority": "now"
    }
  ],
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default workflowShiftLifecycle;
