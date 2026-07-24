/// <mls fileReference="_102051_/l4/cafeFlow/ontology/ShiftReport.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityShiftReport = {
  "entityId": "ShiftReport",
  "title": "Relatório de Fechamento de Turno",
  "description": "Relatório consolidado do turno encerrado, com total de vendas por tipo (mesa/takeout), itens mais vendidos e cancelamentos, preservado para consulta posterior.",
  "kind": "metric",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "shiftReportId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do relatório de fechamento de turno."
    },
    {
      "fieldId": "shiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do turno encerrado que originou este relatório."
    },
    {
      "fieldId": "totalSalesDineIn",
      "type": "money",
      "required": true,
      "description": "Total de vendas do turno originadas de pedidos de mesa."
    },
    {
      "fieldId": "totalSalesTakeout",
      "type": "money",
      "required": true,
      "description": "Total de vendas do turno originadas de pedidos takeout."
    },
    {
      "fieldId": "totalSales",
      "type": "money",
      "required": true,
      "description": "Total geral de vendas do turno (mesa + takeout)."
    },
    {
      "fieldId": "totalOrders",
      "type": "number",
      "required": true,
      "description": "Quantidade total de pedidos considerados no turno."
    },
    {
      "fieldId": "totalCancellations",
      "type": "number",
      "required": true,
      "description": "Quantidade total de cancelamentos registrados no turno."
    },
    {
      "fieldId": "topSellingItemName",
      "type": "string",
      "required": false,
      "description": "Nome do item mais vendido no turno, para exibição no relatório."
    },
    {
      "fieldId": "topSellingItemQuantity",
      "type": "number",
      "required": false,
      "description": "Quantidade vendida do item mais vendido no turno."
    },
    {
      "fieldId": "generatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que o relatório foi gerado a partir do encerramento do turno."
    },
    {
      "fieldId": "preservedUntil",
      "type": "datetime",
      "required": false,
      "description": "Data limite de preservação do relatório para consulta histórica."
    },
    {
      "fieldId": "notes",
      "type": "text",
      "required": false,
      "description": "Observações operacionais registradas no fechamento do turno."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro do relatório."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro do relatório."
    }
  ]
} as const;

export default cafeFlowEntityShiftReport;
