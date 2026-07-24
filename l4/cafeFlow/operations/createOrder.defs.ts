/// <mls fileReference="_102051_/l4/cafeFlow/operations/createOrder.defs.ts" enhancement="_blank"/>

export const operationCreateOrder = {
  "operationId": "createOrder",
  "title": "Registrar pedido",
  "actors": [
    "atendente"
  ],
  "entity": "Order",
  "kind": "create",
  "reads": [
    "MenuItem",
    "DailyShift"
  ],
  "writes": [
    "Order",
    "OrderItem"
  ],
  "rulesApplied": [
    "orderRequiresTableOrTakeout",
    "orderEntersKitchenQueueAfterAttendantConfirmation",
    "orderTotalFromPriceAtLaunchTime",
    "ordersRequireOpenDailyShift",
    "orderItemsArePrepReference"
  ],
  "story": {
    "actor": "Atendente",
    "goal": "Registrar um novo pedido de mesa ou takeout com itens e enviá-lo à fila da cozinha",
    "steps": [
      "Indica se o pedido é de mesa ou takeout e informa o número da mesa ou o nome do cliente",
      "Seleciona itens disponíveis do cardápio com quantidades e observações do cliente",
      "Confere o total calculado no lançamento e confirma o envio à cozinha"
    ],
    "outcome": "Pedido criado vinculado ao turno aberto, com itens e total congelados no lançamento, status confirmed e visível na fila da cozinha"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Formulário de registro de pedido: canal (mesa/takeout), itens do cardápio com quantidades e observações, e confirmação para envio à cozinha",
    "entity": "Order",
    "keyField": "Order.orderId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "Order.orderId",
      "Order.dailyShiftId",
      "Order.orderType",
      "Order.tableNumber",
      "Order.customerName",
      "Order.totalAmount",
      "Order.notes",
      "Order.status",
      "Order.registeredAt",
      "Order.confirmedAt"
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
        "name": "dailyShiftId",
        "type": "string",
        "required": true,
        "fieldRef": "Order.dailyShiftId"
      },
      {
        "name": "orderType",
        "type": "string",
        "required": true,
        "fieldRef": "Order.orderType"
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
        "name": "totalAmount",
        "type": "number",
        "required": true,
        "fieldRef": "Order.totalAmount"
      },
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "fieldRef": "Order.notes"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "Order.status"
      },
      {
        "name": "registeredAt",
        "type": "string",
        "required": true,
        "fieldRef": "Order.registeredAt"
      },
      {
        "name": "confirmedAt",
        "type": "string",
        "required": true,
        "fieldRef": "Order.confirmedAt"
      },
      {
        "name": "items",
        "type": "array",
        "required": true,
        "item": {
          "fields": [
            {
              "name": "orderItemId",
              "type": "string",
              "required": true,
              "fieldRef": "OrderItem.orderItemId"
            },
            {
              "name": "menuItemId",
              "type": "string",
              "required": true,
              "fieldRef": "OrderItem.menuItemId"
            },
            {
              "name": "menuItemName",
              "type": "string",
              "required": true,
              "fieldRef": "OrderItem.menuItemName"
            },
            {
              "name": "quantity",
              "type": "number",
              "required": true,
              "fieldRef": "OrderItem.quantity"
            },
            {
              "name": "unitPrice",
              "type": "number",
              "required": true,
              "fieldRef": "OrderItem.unitPrice"
            },
            {
              "name": "subtotal",
              "type": "number",
              "required": true,
              "fieldRef": "OrderItem.subtotal"
            },
            {
              "name": "observations",
              "type": "string",
              "required": false,
              "fieldRef": "OrderItem.observations"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "fieldRef": "OrderItem.status"
            }
          ]
        }
      }
    ]
  },
  "inputs": [
    {
      "inputId": "orderType",
      "fieldRef": "Order.orderType",
      "required": true,
      "source": "userInput",
      "description": "Canal do pedido: mesa (table) ou takeout"
    },
    {
      "inputId": "tableNumber",
      "fieldRef": "Order.tableNumber",
      "required": false,
      "source": "userInput",
      "description": "Número ou identificador da mesa quando o pedido é de mesa"
    },
    {
      "inputId": "customerName",
      "fieldRef": "Order.customerName",
      "required": false,
      "source": "userInput",
      "description": "Nome do cliente para pedidos takeout ou identificação adicional"
    },
    {
      "inputId": "notes",
      "fieldRef": "Order.notes",
      "required": false,
      "source": "userInput",
      "description": "Observações gerais do pedido para referência da cozinha"
    },
    {
      "inputId": "menuItemId",
      "fieldRef": "OrderItem.menuItemId",
      "required": true,
      "source": "userInput",
      "description": "Identificador do item do cardápio em cada linha do pedido"
    },
    {
      "inputId": "quantity",
      "fieldRef": "OrderItem.quantity",
      "required": true,
      "source": "userInput",
      "description": "Quantidade do item em cada linha do pedido"
    },
    {
      "inputId": "observations",
      "fieldRef": "OrderItem.observations",
      "required": false,
      "source": "userInput",
      "description": "Observações específicas do item em cada linha do pedido"
    },
    {
      "inputId": "dailyShiftId",
      "fieldRef": "Order.dailyShiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Turno diário aberto ao qual o pedido será vinculado"
    },
    {
      "inputId": "orderId",
      "fieldRef": "Order.orderId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado para o novo pedido"
    },
    {
      "inputId": "registeredAt",
      "fieldRef": "Order.registeredAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora em que o pedido foi registrado"
    },
    {
      "inputId": "confirmedAt",
      "fieldRef": "Order.confirmedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora da confirmação e envio à cozinha"
    }
  ],
  "contextResolution": [
    {
      "inputId": "dailyShiftId",
      "targetRef": "Order.dailyShiftId",
      "source": "activeLifecycleInstance",
      "originRef": "DailyShift.dailyShiftId",
      "description": "Resolve o único DailyShift com status open no momento da operação; falha se não houver turno aberto"
    },
    {
      "inputId": "orderId",
      "targetRef": "Order.orderId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Gera um UUID para identificar o novo pedido"
    },
    {
      "inputId": "registeredAt",
      "targetRef": "Order.registeredAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Timestamp atual do servidor no momento do registro"
    },
    {
      "inputId": "confirmedAt",
      "targetRef": "Order.confirmedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Timestamp atual do servidor no momento da confirmação e envio à cozinha"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação o pedido existe com status confirmed e confirmedAt preenchido",
    "O pedido fica vinculado ao DailyShift aberto (dailyShiftId do turno com status open)",
    "Não é permitido criar pedido quando não há turno diário aberto",
    "orderType é obrigatoriamente table ou takeout",
    "Quando orderType é table, tableNumber deve estar preenchido",
    "totalAmount é a soma de (preço do cardápio × quantidade) de cada item no instante do lançamento",
    "Cada OrderItem é criado com menuItemName e unitPrice capturados do MenuItem no momento do lançamento",
    "O pedido confirmado fica visível na fila ativa da cozinha",
    "Itens e observações registrados tornam-se a referência de preparo para a cozinha"
  ],
  "pageId": "orderLifecycle",
  "commandName": "createOrder",
  "bffName": "cafeFlow.orderLifecycle.createOrder",
  "capability": {
    "capabilityId": "orderLifecycle",
    "title": "Ciclo de vida do pedido",
    "actor": "atendente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCreateOrder;
