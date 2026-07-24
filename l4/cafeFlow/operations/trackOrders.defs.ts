/// <mls fileReference="_102051_/l4/cafeFlow/operations/trackOrders.defs.ts" enhancement="_blank"/>

export const operationTrackOrders = {
  "operationId": "trackOrders",
  "title": "Acompanhar pedidos abertos",
  "actors": [
    "atendente"
  ],
  "entity": "Order",
  "kind": "query",
  "reads": [
    "Order",
    "OrderItem",
    "DailyShift"
  ],
  "writes": [],
  "rulesApplied": [
    "ordersRequireOpenDailyShift",
    "orderRequiresTableOrTakeout",
    "onlyReadyOrdersCanBeServed",
    "completedOrdersLeaveKitchenQueue"
  ],
  "story": {
    "actor": "Atendente",
    "goal": "Ver o andamento dos pedidos abertos do turno para informar o cliente e se preparar para servir ou entregar",
    "steps": [
      "Abrir a lista de pedidos abertos do turno diário em andamento",
      "Visualizar tipo (mesa ou takeout), identificação, status e horários de cada pedido",
      "Identificar pedidos com status pronto para avisar o cliente e preparar a entrega",
      "Consultar detalhes e itens quando precisar esclarecer o andamento"
    ],
    "outcome": "Status atual dos pedidos abertos conhecido, permitindo informar o cliente e agir na hora certa"
  },
  "accessPattern": {
    "kind": "list",
    "description": "Lista os pedidos abertos do turno diário em andamento (não servidos e não cancelados), com status e itens, para o atendente acompanhar o fluxo salão-cozinha",
    "entity": "Order",
    "keyField": "Order.orderId",
    "filters": [
      "Order.status",
      "Order.orderType",
      "Order.dailyShiftId",
      "Order.tableNumber"
    ],
    "sort": [
      "Order.registeredAt"
    ],
    "pagination": "optional",
    "selection": "single",
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
      "Order.confirmedAt",
      "Order.inPreparationAt",
      "Order.readyAt",
      "OrderItem.orderItemId",
      "OrderItem.menuItemName",
      "OrderItem.quantity",
      "OrderItem.observations",
      "OrderItem.status"
    ]
  },
  "outputShape": {
    "kind": "paginated",
    "fields": [
      {
        "name": "orders",
        "type": "array",
        "required": true,
        "item": {
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
              "required": false,
              "fieldRef": "Order.confirmedAt"
            },
            {
              "name": "inPreparationAt",
              "type": "string",
              "required": false,
              "fieldRef": "Order.inPreparationAt"
            },
            {
              "name": "readyAt",
              "type": "string",
              "required": false,
              "fieldRef": "Order.readyAt"
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
        }
      },
      {
        "name": "total",
        "type": "number",
        "required": true
      }
    ]
  },
  "inputs": [
    {
      "inputId": "dailyShiftId",
      "fieldRef": "Order.dailyShiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Turno diário aberto ao qual os pedidos acompanhados estão vinculados"
    },
    {
      "inputId": "status",
      "fieldRef": "Order.status",
      "required": false,
      "source": "userInput",
      "description": "Filtro opcional por status do pedido (ex.: ready para localizar o que já pode ser servido)"
    },
    {
      "inputId": "orderType",
      "fieldRef": "Order.orderType",
      "required": false,
      "source": "userInput",
      "description": "Filtro opcional por origem do pedido: mesa (table) ou takeout"
    },
    {
      "inputId": "tableNumber",
      "fieldRef": "Order.tableNumber",
      "required": false,
      "source": "userInput",
      "description": "Filtro opcional pelo número ou identificador da mesa"
    },
    {
      "inputId": "page",
      "type": "number",
      "required": false,
      "source": "userInput",
      "description": "Número da página para paginação da lista de pedidos"
    },
    {
      "inputId": "pageSize",
      "type": "number",
      "required": false,
      "source": "userInput",
      "description": "Quantidade de pedidos por página"
    }
  ],
  "contextResolution": [
    {
      "inputId": "dailyShiftId",
      "targetRef": "Order.dailyShiftId",
      "source": "activeLifecycleInstance",
      "originRef": "DailyShift.dailyShiftId",
      "description": "Resolve o único DailyShift com status open no contexto operacional atual e usa seu dailyShiftId para restringir a lista aos pedidos do turno em andamento"
    }
  ],
  "acceptanceAssertions": [
    "A lista retorna apenas pedidos vinculados ao turno diário aberto (DailyShift com status open)",
    "Pedidos com status served ou cancelled não aparecem na lista padrão de pedidos abertos",
    "Cada pedido listado expõe orderId, orderType, tableNumber ou customerName conforme o tipo, totalAmount, status e registeredAt",
    "Pedidos com status ready ficam visíveis para o atendente localizar mesa ou cliente takeout e informar que pode retirar/servir",
    "O status atual de cada pedido aberto reflete o ciclo coordenado (registered, confirmed, inPreparation, ready)",
    "Itens de cada pedido (nome, quantidade, observações e status) são retornados para apoiar a consulta de andamento",
    "Filtros opcionais por status, orderType e tableNumber restringem a lista sem excluir o vínculo obrigatório ao turno aberto",
    "A resposta paginada inclui a coleção orders e o total de registros correspondentes aos filtros"
  ],
  "pageId": "trackOrders",
  "commandName": "trackOrders",
  "bffName": "cafeFlow.trackOrders.trackOrders",
  "capability": {
    "capabilityId": "trackOrders",
    "title": "Acompanhar pedidos abertos",
    "actor": "atendente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationTrackOrders;
