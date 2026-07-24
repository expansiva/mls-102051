/// <mls fileReference="_102051_/l4/cafeFlow/ontology/OperationalDashboard.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityOperationalDashboard = {
  "entityId": "OperationalDashboard",
  "title": "Dashboard Operacional",
  "description": "Painel do gerente com vendas de hoje, itens mais vendidos e alertas de estoque baixo, base para decisões durante o turno.",
  "kind": "metric",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "operationalDashboardId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do registro do dashboard operacional."
    },
    {
      "fieldId": "dailyShiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do turno diário (DailyShift) a partir do qual o dashboard é calculado."
    },
    {
      "fieldId": "referenceDate",
      "type": "date",
      "required": true,
      "description": "Data de referência (dia) dos indicadores exibidos no dashboard."
    },
    {
      "fieldId": "todaySalesTotal",
      "type": "money",
      "required": true,
      "description": "Total de vendas acumuladas do turno corrente, em moeda local."
    },
    {
      "fieldId": "todayOrdersCount",
      "type": "number",
      "required": true,
      "description": "Quantidade de pedidos concluídos/servidos no turno corrente."
    },
    {
      "fieldId": "todayItemsSold",
      "type": "number",
      "required": true,
      "description": "Quantidade de itens vendidos no turno corrente."
    },
    {
      "fieldId": "topMenuItemId",
      "type": "uuid",
      "required": false,
      "description": "Identificador do item de cardápio (MenuItem) mais vendido no turno, quando houver."
    },
    {
      "fieldId": "topMenuItemQuantity",
      "type": "number",
      "required": false,
      "description": "Quantidade vendida do item de cardápio mais vendido no turno."
    },
    {
      "fieldId": "topSellingItemsCount",
      "type": "number",
      "required": true,
      "description": "Quantidade de itens do cardápio classificados como destaque (top vendidos) no turno."
    },
    {
      "fieldId": "lowStockItemsCount",
      "type": "number",
      "required": true,
      "description": "Quantidade de itens de estoque atualmente abaixo do nível mínimo configurado."
    },
    {
      "fieldId": "outOfStockItemsCount",
      "type": "number",
      "required": true,
      "description": "Quantidade de itens de estoque em situação de ruptura (sem saldo)."
    },
    {
      "fieldId": "lowStockItemIds",
      "type": "text",
      "required": false,
      "description": "Lista resumida de identificadores de itens de estoque (StockItem) com alerta de estoque baixo."
    },
    {
      "fieldId": "hasLowStockAlert",
      "type": "boolean",
      "required": true,
      "description": "Indica se há ao menos um alerta ativo de estoque baixo/ruptura no turno."
    },
    {
      "fieldId": "lastComputedAt",
      "type": "datetime",
      "required": true,
      "description": "Momento em que o snapshot/aggregação do dashboard foi calculado pela última vez."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro do dashboard."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro do dashboard."
    }
  ]
} as const;

export default cafeFlowEntityOperationalDashboard;
