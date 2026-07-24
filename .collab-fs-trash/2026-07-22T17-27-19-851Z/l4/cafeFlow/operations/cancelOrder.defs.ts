/// <mls fileReference="_102051_/l4/cafeFlow/operations/cancelOrder.defs.ts" enhancement="_blank"/>

export const operationCancelOrder = {
  "operationId": "cancelOrder",
  "title": "Cancelar pedido",
  "actors": [
    "atendente"
  ],
  "entity": "Order",
  "kind": "update",
  "reads": [
    "Order",
    "OrderItem",
    "OrderCancellation",
    "StockConsumption",
    "StockItem",
    "MenuItemIngredient",
    "Shift"
  ],
  "writes": [
    "Order",
    "OrderItem",
    "OrderCancellation",
    "StockConsumption",
    "StockItem"
  ],
  "rulesApplied": [
    "orderCancellationBeforeDelivery",
    "stockConsumptionProportionalToIngredients"
  ],
  "story": {
    "actor": "Atendente",
    "goal": "Cancelar um pedido ativo antes da entrega/retirada, registrando o motivo e estornando o estoque",
    "steps": [
      "Localiza o pedido ativo (na fila da cozinha ou recém-lançado) que precisa ser cancelado",
      "Informa o motivo do cancelamento e confirma a operação",
      "O sistema marca o pedido e seus itens como cancelados, registra o cancelamento e devolve ao estoque os ingredientes baixados no lançamento"
    ],
    "outcome": "Pedido cancelado com motivo registrado, itens cancelados e estoque estornado proporcionalmente aos ingredientes"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Formulário de cancelamento do pedido selecionado, com motivo obrigatório",
    "entity": "Order",
    "keyField": "Order.orderId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "Order.orderId",
      "Order.status",
      "Order.cancelledAt",
      "Order.totalAmount",
      "Order.type",
      "Order.tableNumber",
      "Order.customerName",
      "Order.updatedAt"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "orderId",
        "type": "string",
        "required": true,
        "fieldRef": "Order.orderId"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "Order.status"
      },
      {
        "name": "cancelledAt",
        "type": "string",
        "required": true,
        "fieldRef": "Order.cancelledAt"
      },
      {
        "name": "totalAmount",
        "type": "number",
        "required": true,
        "fieldRef": "Order.totalAmount"
      },
      {
        "name": "type",
        "type": "string",
        "required": true,
        "fieldRef": "Order.type"
      },
      {
        "name": "tableNumber",
        "type": "string",
        "required": false,
        "fieldRef": "Order.tableNumber"
      },
      {
        "name": "customerName",
        "type": "string",
        "required": false,
        "fieldRef": "Order.customerName"
      },
      {
        "name": "updatedAt",
        "type": "string",
        "required": true,
        "fieldRef": "Order.updatedAt"
      },
      {
        "name": "orderCancellationId",
        "type": "string",
        "required": true,
        "fieldRef": "OrderCancellation.orderCancellationId"
      },
      {
        "name": "reason",
        "type": "string",
        "required": true,
        "fieldRef": "OrderCancellation.reason"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "orderId",
      "fieldRef": "Order.orderId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador do pedido ativo selecionado para cancelamento"
    },
    {
      "inputId": "reason",
      "fieldRef": "OrderCancellation.reason",
      "required": true,
      "source": "userInput",
      "description": "Motivo simples do cancelamento, obrigatório para o relatório de turno"
    },
    {
      "inputId": "cancelledByUserId",
      "fieldRef": "OrderCancellation.cancelledByUserId",
      "required": true,
      "source": "actorSession",
      "description": "Identificador do atendente que confirma o cancelamento"
    },
    {
      "inputId": "cancelledAt",
      "fieldRef": "Order.cancelledAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora em que o cancelamento é registrado"
    },
    {
      "inputId": "orderCancellationId",
      "fieldRef": "OrderCancellation.orderCancellationId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado para o registro de cancelamento"
    },
    {
      "inputId": "shiftId",
      "fieldRef": "Order.shiftId",
      "required": true,
      "source": "selectedEntity",
      "description": "Turno vinculado ao pedido cancelado, copiado do próprio pedido"
    }
  ],
  "contextResolution": [
    {
      "inputId": "orderId",
      "targetRef": "Order.orderId",
      "source": "selectedEntity",
      "originRef": "Order.orderId",
      "description": "Pedido ativo previamente selecionado na lista/fila para cancelamento"
    },
    {
      "inputId": "cancelledByUserId",
      "targetRef": "OrderCancellation.cancelledByUserId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "Identificador do ator autenticado (atendente) obtido da sessão"
    },
    {
      "inputId": "cancelledAt",
      "targetRef": "Order.cancelledAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Timestamp atual do servidor no momento da confirmação do cancelamento"
    },
    {
      "inputId": "orderCancellationId",
      "targetRef": "OrderCancellation.orderCancellationId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "UUID gerado pelo sistema para o novo registro de OrderCancellation"
    },
    {
      "inputId": "shiftId",
      "targetRef": "OrderCancellation.shiftId",
      "source": "selectedEntity",
      "originRef": "Order.shiftId",
      "description": "shiftId lido do pedido selecionado sendo cancelado"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, o pedido existe com status cancelled e cancelledAt preenchido",
    "O motivo do cancelamento é obrigatório e fica registrado em OrderCancellation vinculado ao orderId e ao shiftId",
    "Cancelamento é bloqueado se o pedido já estiver com status delivered",
    "Cancelamento é permitido a partir de qualquer status anterior à entrega/retirada (registered, received, inPreparation, ready)",
    "Os OrderItems do pedido passam a status cancelado com cancelledAt preenchido",
    "As baixas de estoque (StockConsumption) geradas no lançamento do pedido são estornadas e as quantidades dos StockItems correspondentes são devolvidas proporcionalmente aos ingredientes",
    "O registro de cancelamento inclui cancelledByUserId do atendente autenticado e cancelledAt com o horário da operação"
  ],
  "pageId": "orderLifecycle",
  "commandName": "cancelOrder",
  "bffName": "cafeFlow.orderLifecycle.cancelOrder",
  "capability": {
    "capabilityId": "orderLifecycle",
    "title": "Ciclo de vida do pedido",
    "actor": "atendente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCancelOrder;
