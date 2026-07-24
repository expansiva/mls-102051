/// <mls fileReference="_102051_/l4/cafeFlow/ontology/ShiftClosingReport.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityShiftClosingReport = {
  "entityId": "ShiftClosingReport",
  "title": "Relatório de Fechamento de Turno",
  "description": "Visão consolidada do turno encerrado com totais de vendas, itens movimentados, formas de pagamento básicas e sinais de estoque baixo/ruptura.",
  "kind": "metric",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "shiftClosingReportId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do relatório de fechamento de turno."
    },
    {
      "fieldId": "dailyShiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do turno diário encerrado que originou o relatório."
    },
    {
      "fieldId": "shiftDate",
      "type": "date",
      "required": true,
      "description": "Data de referência do turno encerrado."
    },
    {
      "fieldId": "totalSalesAmount",
      "type": "money",
      "required": true,
      "description": "Total de vendas do turno em moeda."
    },
    {
      "fieldId": "totalOrdersCount",
      "type": "number",
      "required": true,
      "description": "Quantidade total de pedidos realizados no turno."
    },
    {
      "fieldId": "totalItemsSold",
      "type": "number",
      "required": true,
      "description": "Quantidade total de itens vendidos no turno."
    },
    {
      "fieldId": "cashPaymentsAmount",
      "type": "money",
      "required": true,
      "description": "Valor total recebido em dinheiro durante o turno."
    },
    {
      "fieldId": "otherPaymentsAmount",
      "type": "money",
      "required": true,
      "description": "Valor total recebido via outras formas de pagamento básicas durante o turno."
    },
    {
      "fieldId": "topSellingItemsSummary",
      "type": "text",
      "required": false,
      "description": "Lista dos itens mais vendidos do turno para destaque no relatório."
    },
    {
      "fieldId": "lowStockSignalsCount",
      "type": "number",
      "required": true,
      "description": "Quantidade de itens de estoque que ficaram abaixo do nível mínimo durante o turno."
    },
    {
      "fieldId": "stockoutSignalsCount",
      "type": "number",
      "required": true,
      "description": "Quantidade de itens de estoque que sofreram ruptura (zerados) durante o turno."
    },
    {
      "fieldId": "closingNotes",
      "type": "text",
      "required": false,
      "description": "Observações e motivos registrados no fechamento do turno."
    },
    {
      "fieldId": "generatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que o relatório de fechamento foi gerado."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro."
    }
  ],
  "lifecycleStates": [
    "generated",
    "viewed",
    "archived"
  ]
} as const;

export default cafeFlowEntityShiftClosingReport;
