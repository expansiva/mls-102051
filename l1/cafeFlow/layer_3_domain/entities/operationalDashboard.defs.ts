/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.defs.ts" enhancement="_blank"/>

export const operationalDashboardDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "OperationalDashboard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "OperationalDashboard",
    "title": "Dashboard Operacional",
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
    ],
    "valueObjects": [],
    "statusEnum": [],
    "invariants": [
      "todaySalesTotal >= 0",
      "todayOrdersCount >= 0",
      "todayItemsSold >= 0",
      "topSellingItemsCount >= 0",
      "lowStockItemsCount >= 0",
      "outOfStockItemsCount >= 0",
      "todayItemsSold >= todayOrdersCount (cada pedido concluído tem ao menos um item)",
      "se todayOrdersCount == 0 então todaySalesTotal == 0, todayItemsSold == 0, topMenuItemId ausente e topMenuItemQuantity ausente",
      "topMenuItemId e topMenuItemQuantity são ambos presentes ou ambos ausentes",
      "quando topMenuItemId presente: topMenuItemQuantity > 0, topMenuItemQuantity <= todayItemsSold e topSellingItemsCount >= 1",
      "quando todayItemsSold == 0: topMenuItemId e topMenuItemQuantity ausentes e topSellingItemsCount == 0",
      "hasLowStockAlert <=> (lowStockItemsCount > 0 || outOfStockItemsCount > 0)",
      "quando hasLowStockAlert == true: lowStockItemIds presente e não vazio; quando false: lowStockItemIds ausente ou vazio",
      "createdAt <= updatedAt",
      "createdAt <= lastComputedAt",
      "lastComputedAt >= início do dia de referenceDate",
      "dailyShiftId e referenceDate devem referir o mesmo turno/dia operacional"
    ]
  }
} as const;

export default operationalDashboardDomainEntity;

export const pipeline = [
  {
    "id": "operationalDashboard__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
