/// <mls fileReference="_102051_/l4/cafeFlow/operations/viewDashboard.defs.ts" enhancement="_blank"/>

export const operationViewDashboard = {
  "operationId": "viewDashboard",
  "title": "Visualizar dashboard do dia",
  "actors": [
    "gerente"
  ],
  "entity": "Shift",
  "kind": "view",
  "reads": [
    "Shift",
    "Order",
    "OrderItem",
    "MenuItem",
    "StockItem"
  ],
  "writes": [],
  "rulesApplied": [
    "dashboardReflectsOpenShift",
    "oneOpenShiftPerUnitPerDay"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Acompanhar vendas do turno atual, itens mais vendidos e alertas de estoque baixo em um único painel",
    "steps": [
      "O gerente acessa o dashboard do dia",
      "O sistema resolve o turno aberto da unidade ativa",
      "O sistema agrega vendas e pedidos do turno (excluindo cancelados), monta o ranking de mais vendidos e lista itens abaixo do estoque mínimo",
      "O gerente visualiza indicadores de vendas, ranking e alertas de estoque"
    ],
    "outcome": "Dashboard do turno aberto exibido com totais de vendas e pedidos, ranking de mais vendidos e lista de estoque baixo"
  },
  "accessPattern": {
    "kind": "getById",
    "description": "Obtém o dashboard operacional do turno aberto da unidade no momento da consulta",
    "entity": "Shift",
    "keyField": "Shift.shiftId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "Shift.shiftId",
      "Shift.status",
      "Shift.openedAt",
      "Shift.unitId",
      "Order.orderId",
      "Order.totalAmount",
      "Order.status",
      "OrderItem.quantity",
      "MenuItem.menuItemId",
      "MenuItem.name",
      "StockItem.stockItemId",
      "StockItem.name",
      "StockItem.currentQuantity",
      "StockItem.minimumLevel",
      "StockItem.unit",
      "StockItem.status"
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
        "name": "unitId",
        "type": "string",
        "required": true,
        "fieldRef": "Shift.unitId"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "Shift.status"
      },
      {
        "name": "openedAt",
        "type": "string",
        "required": true,
        "fieldRef": "Shift.openedAt"
      },
      {
        "name": "totalSales",
        "type": "number",
        "required": true
      },
      {
        "name": "totalOrders",
        "type": "number",
        "required": true
      },
      {
        "name": "topSellers",
        "type": "array",
        "required": true,
        "item": {
          "fields": [
            {
              "name": "menuItemId",
              "type": "string",
              "required": true,
              "fieldRef": "MenuItem.menuItemId"
            },
            {
              "name": "name",
              "type": "string",
              "required": true,
              "fieldRef": "MenuItem.name"
            },
            {
              "name": "quantity",
              "type": "number",
              "required": true
            }
          ]
        }
      },
      {
        "name": "lowStockAlerts",
        "type": "array",
        "required": true,
        "item": {
          "fields": [
            {
              "name": "stockItemId",
              "type": "string",
              "required": true,
              "fieldRef": "StockItem.stockItemId"
            },
            {
              "name": "name",
              "type": "string",
              "required": true,
              "fieldRef": "StockItem.name"
            },
            {
              "name": "currentQuantity",
              "type": "number",
              "required": true,
              "fieldRef": "StockItem.currentQuantity"
            },
            {
              "name": "minimumLevel",
              "type": "number",
              "required": true,
              "fieldRef": "StockItem.minimumLevel"
            },
            {
              "name": "unit",
              "type": "string",
              "required": true,
              "fieldRef": "StockItem.unit"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "fieldRef": "StockItem.status"
            }
          ]
        }
      }
    ]
  },
  "inputs": [
    {
      "inputId": "shiftId",
      "fieldRef": "Shift.shiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Turno aberto atual da unidade cujos indicadores alimentam o dashboard"
    },
    {
      "inputId": "unitId",
      "fieldRef": "Shift.unitId",
      "required": true,
      "source": "businessContext",
      "description": "Unidade ativa do contexto de negócio para localizar o turno aberto"
    }
  ],
  "contextResolution": [
    {
      "inputId": "shiftId",
      "targetRef": "Shift.shiftId",
      "source": "activeLifecycleInstance",
      "originRef": "Shift.shiftId",
      "description": "Resolve o único turno com status open da unidade ativa no momento da consulta"
    },
    {
      "inputId": "unitId",
      "targetRef": "Shift.unitId",
      "source": "businessContext",
      "originRef": "businessContext.activeUnitId",
      "description": "Obtém a unidade ativa do contexto de negócio da sessão do gerente"
    }
  ],
  "acceptanceAssertions": [
    "Após a consulta, os indicadores de vendas do turno aberto (total de vendas e quantidade de pedidos) são exibidos",
    "O ranking de itens mais vendidos do turno aberto é exibido, sem incluir itens cancelados nas vendas nem nos mais vendidos",
    "A lista de itens de estoque com quantidade atual abaixo do mínimo é exibida no dashboard",
    "O dashboard reflete exclusivamente os dados do turno aberto da unidade no momento da consulta"
  ],
  "pageId": "viewDashboard",
  "commandName": "viewDashboard",
  "bffName": "cafeFlow.viewDashboard.viewDashboard",
  "capability": {
    "capabilityId": "viewDashboard",
    "title": "Visualizar dashboard do dia",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationViewDashboard;
