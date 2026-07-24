/// <mls fileReference="_102051_/l4/cafeFlow/operations/closeShift.defs.ts" enhancement="_blank"/>

export const operationCloseShift = {
  "operationId": "closeShift",
  "title": "Fechar turno e gerar relatório",
  "actors": [
    "gerente"
  ],
  "entity": "Shift",
  "kind": "update",
  "reads": [
    "Shift",
    "Order",
    "OrderItem",
    "MenuItem",
    "ShiftReport"
  ],
  "writes": [
    "Shift",
    "ShiftReport"
  ],
  "rulesApplied": [
    "shiftCloseRequiresNoActiveOrders",
    "orderRequiresOpenShift",
    "shiftReportPreservedAfterReopen"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Encerrar o turno aberto da unidade e gerar o relatório de fechamento",
    "steps": [
      "O gerente solicita o fechamento do turno aberto da unidade",
      "O sistema confere se ainda há pedidos ativos (Recebido, Em preparo ou Pronto)",
      "O gerente confirma o encerramento e pode informar observações",
      "O sistema registra closedAt, closedByUserId e altera o status do turno para closed",
      "O sistema gera o relatório de fechamento com totais por tipo, mais vendidos e cancelamentos"
    ],
    "outcome": "Turno encerrado e congelado para alterações, com relatório de fechamento disponível para consulta"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Confirmação de fechamento do turno aberto da unidade, com geração automática do relatório de fechamento",
    "entity": "Shift",
    "keyField": "Shift.shiftId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Shift.shiftId",
      "Shift.status",
      "Shift.closedAt",
      "Shift.closedByUserId",
      "Shift.notes",
      "ShiftReport.shiftReportId",
      "ShiftReport.totalSalesDineIn",
      "ShiftReport.totalSalesTakeout",
      "ShiftReport.totalSales",
      "ShiftReport.totalOrders",
      "ShiftReport.totalCancellations",
      "ShiftReport.topSellingItemName",
      "ShiftReport.topSellingItemQuantity",
      "ShiftReport.generatedAt"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "shiftId",
        "type": "string",
        "required": true,
        "fieldRef": "Shift.shiftId"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "Shift.status"
      },
      {
        "name": "closedAt",
        "type": "string",
        "required": true,
        "fieldRef": "Shift.closedAt"
      },
      {
        "name": "closedByUserId",
        "type": "string",
        "required": true,
        "fieldRef": "Shift.closedByUserId"
      },
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "fieldRef": "Shift.notes"
      },
      {
        "name": "shiftReportId",
        "type": "string",
        "required": true,
        "fieldRef": "ShiftReport.shiftReportId"
      },
      {
        "name": "totalSalesDineIn",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalSalesDineIn"
      },
      {
        "name": "totalSalesTakeout",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalSalesTakeout"
      },
      {
        "name": "totalSales",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalSales"
      },
      {
        "name": "totalOrders",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalOrders"
      },
      {
        "name": "totalCancellations",
        "type": "number",
        "required": true,
        "fieldRef": "ShiftReport.totalCancellations"
      },
      {
        "name": "topSellingItemName",
        "type": "string",
        "required": false,
        "fieldRef": "ShiftReport.topSellingItemName"
      },
      {
        "name": "topSellingItemQuantity",
        "type": "number",
        "required": false,
        "fieldRef": "ShiftReport.topSellingItemQuantity"
      },
      {
        "name": "generatedAt",
        "type": "string",
        "required": true,
        "fieldRef": "ShiftReport.generatedAt"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "shiftId",
      "fieldRef": "Shift.shiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Identificador do turno aberto da unidade que será encerrado"
    },
    {
      "inputId": "notes",
      "fieldRef": "Shift.notes",
      "required": false,
      "source": "userInput",
      "description": "Observações operacionais opcionais registradas no encerramento do turno"
    },
    {
      "inputId": "closedByUserId",
      "fieldRef": "Shift.closedByUserId",
      "required": true,
      "source": "actorSession",
      "description": "Identificador do gerente autenticado responsável pelo encerramento"
    },
    {
      "inputId": "closedAt",
      "fieldRef": "Shift.closedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora em que o turno é efetivamente encerrado"
    }
  ],
  "contextResolution": [
    {
      "inputId": "shiftId",
      "targetRef": "Shift.shiftId",
      "source": "activeLifecycleInstance",
      "originRef": "Shift.shiftId",
      "description": "Resolve o único turno com status open da unidade no contexto operacional atual"
    },
    {
      "inputId": "closedByUserId",
      "targetRef": "Shift.closedByUserId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "Obtém o identificador do gerente autenticado na sessão"
    },
    {
      "inputId": "closedAt",
      "targetRef": "Shift.closedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Usa o timestamp atual do servidor no momento da confirmação do fechamento"
    },
    {
      "targetRef": "Shift.status",
      "source": "systemDefault",
      "originRef": "systemDefault.locale",
      "description": "Define o status do turno como closed ao confirmar o encerramento"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, o turno existe com status closed e closedAt preenchido",
    "closedByUserId é preenchido com o identificador do gerente que confirmou o fechamento",
    "O fechamento é bloqueado quando existem pedidos ativos com status Recebido, Em preparo ou Pronto vinculados ao turno",
    "Um ShiftReport é gerado e vinculado ao shiftId com totalSalesDineIn, totalSalesTakeout, totalSales, totalOrders, totalCancellations e item mais vendido",
    "Após o encerramento o turno fica congelado para alterações e não aceita novos pedidos",
    "O relatório de fechamento permanece disponível para consulta após o encerramento"
  ],
  "pageId": "shiftLifecycle",
  "commandName": "closeShift",
  "bffName": "cafeFlow.shiftLifecycle.closeShift",
  "capability": {
    "capabilityId": "shiftLifecycle",
    "title": "Ciclo de vida do turno diário",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCloseShift;
