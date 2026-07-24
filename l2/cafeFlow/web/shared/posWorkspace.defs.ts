/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/posWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posWorkspace",
  "pageName": "Lançar e acompanhar pedidos",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowPosWorkspaceBase",
  "routePattern": "/cafeFlow/posWorkspace",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:orderLifecycle",
    "operation:trackOrders",
    "operation:browseMenuForPos",
    "operation:createOrder",
    "operation:updateOrderStatus",
    "operation:recordBasicPayment"
  ],
  "operationIds": [
    "trackOrders",
    "browseMenuForPos",
    "createOrder",
    "updateOrderStatus",
    "recordBasicPayment"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "posWorkspace",
    "workspaceKind": "workflow",
    "workflowId": "orderLifecycle",
    "actor": "atendente",
    "entity": "Order",
    "owners": [
      {
        "kind": "workflow",
        "id": "orderLifecycle",
        "defPath": "_102051_/l4/cafeFlow/workflows/orderLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "trackOrders",
        "defPath": "_102051_/l4/cafeFlow/operations/trackOrders.defs.ts"
      },
      {
        "kind": "operation",
        "id": "browseMenuForPos",
        "defPath": "_102051_/l4/cafeFlow/operations/browseMenuForPos.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createOrder",
        "defPath": "_102051_/l4/cafeFlow/operations/createOrder.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateOrderStatus",
        "defPath": "_102051_/l4/cafeFlow/operations/updateOrderStatus.defs.ts"
      },
      {
        "kind": "operation",
        "id": "recordBasicPayment",
        "defPath": "_102051_/l4/cafeFlow/operations/recordBasicPayment.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "O atendente define o canal (mesa ou takeout), inclui itens ativos do cardápio com quantidades e observações e associa o pagamento básico quando aplicável.",
        "O atendente confere o lançamento, confirma o pedido e o envia à fila da cozinha.",
        "O cozinheiro consulta a fila, inicia o preparo e atualiza o status para em preparo.",
        "Ao concluir o preparo, o cozinheiro marca o pedido como pronto para o salão ou balcão.",
        "O atendente avisa o cliente e marca o pedido como servido ou entregue, concluindo o ciclo e disparando a baixa automática de estoque."
      ],
      "operations": [
        {
          "operationId": "trackOrders",
          "commandName": "trackOrders",
          "steps": [
            "Abrir a lista de pedidos abertos do turno diário em andamento",
            "Visualizar tipo (mesa ou takeout), identificação, status e horários de cada pedido",
            "Identificar pedidos com status pronto para avisar o cliente e preparar a entrega",
            "Consultar detalhes e itens quando precisar esclarecer o andamento"
          ]
        },
        {
          "operationId": "browseMenuForPos",
          "commandName": "browseMenuForPos",
          "steps": [
            "O atendente abre o cardápio no POS durante o lançamento do pedido",
            "O sistema lista somente itens ativos que possuem categoria e preço definidos",
            "O atendente filtra opcionalmente por categoria e visualiza nome, preço, descrição e imagem",
            "O atendente seleciona os itens desejados para compor o pedido"
          ]
        },
        {
          "operationId": "createOrder",
          "commandName": "createOrder",
          "steps": [
            "Indica se o pedido é de mesa ou takeout e informa o número da mesa ou o nome do cliente",
            "Seleciona itens disponíveis do cardápio com quantidades e observações do cliente",
            "Confere o total calculado no lançamento e confirma o envio à cozinha"
          ]
        },
        {
          "operationId": "updateOrderStatus",
          "commandName": "updateOrderStatus",
          "steps": [
            "Seleciona o pedido na lista ou fila operacional do salão/cozinha",
            "Informa o novo status permitido pela transição (confirmed, inPreparation, ready, served ou cancelled)",
            "Quando o destino for cancelamento, informa o motivo",
            "Confirma a atualização do status"
          ]
        },
        {
          "operationId": "recordBasicPayment",
          "commandName": "recordBasicPayment",
          "steps": [
            "Seleciona o pedido em atendimento já totalizado",
            "Informa ou confirma o valor total do pedido",
            "Escolhe a forma de pagamento básica (dinheiro, pix, crédito, débito ou misto)",
            "Opcionalmente registra observações do fechamento",
            "Confirma o lançamento do pagamento básico"
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts",
    "contracts": [
      {
        "commandName": "queryOpenOrders",
        "routeConst": "queryOpenOrdersRoute"
      },
      {
        "commandName": "queryMenuItems",
        "routeConst": "queryMenuItemsRoute"
      },
      {
        "commandName": "cmdCreateOrder",
        "routeConst": "cmdCreateOrderRoute"
      },
      {
        "commandName": "cmdUpdateOrderStatus",
        "routeConst": "cmdUpdateOrderStatusRoute"
      },
      {
        "commandName": "cmdRecordBasicPayment",
        "routeConst": "cmdRecordBasicPaymentRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.defs.ts",
    "layoutId": "kanban_pipeline"
  },
  "states": [
    {
      "stateKey": "ui.posWorkspace.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.action.queryOpenOrders.status",
      "name": "queryOpenOrdersState",
      "kind": "actionStatus",
      "actionRef": "queryOpenOrders",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.dailyShiftId",
      "name": "queryOpenOrdersDailyShiftId",
      "kind": "input",
      "source": "activeLifecycleInstance",
      "presentation": "form",
      "contractRef": {
        "commandName": "queryOpenOrders",
        "direction": "input",
        "field": "dailyShiftId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.status",
      "name": "queryOpenOrdersStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "queryOpenOrders",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.orderType",
      "name": "queryOpenOrdersOrderType",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "queryOpenOrders",
        "direction": "input",
        "field": "orderType"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.tableNumber",
      "name": "queryOpenOrdersTableNumber",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "queryOpenOrders",
        "direction": "input",
        "field": "tableNumber"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.page",
      "name": "queryOpenOrdersPage",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "queryOpenOrders",
        "direction": "input",
        "field": "page"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.pageSize",
      "name": "queryOpenOrdersPageSize",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "queryOpenOrders",
        "direction": "input",
        "field": "pageSize"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.data.queryOpenOrders",
      "name": "queryOpenOrdersData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "queryOpenOrders",
        "direction": "output"
      },
      "outputShape": "paginated",
      "collection": false,
      "defaultValue": {
        "items": [],
        "total": 0
      }
    },
    {
      "stateKey": "ui.posWorkspace.action.queryMenuItems.status",
      "name": "queryMenuItemsState",
      "kind": "actionStatus",
      "actionRef": "queryMenuItems",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.posWorkspace.input.queryMenuItems.menuCategoryId",
      "name": "queryMenuItemsMenuCategoryId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "queryMenuItems",
        "direction": "input",
        "field": "menuCategoryId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.data.queryMenuItems",
      "name": "queryMenuItemsData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "queryMenuItems",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.posWorkspace.action.cmdCreateOrder.status",
      "name": "cmdCreateOrderState",
      "kind": "actionStatus",
      "actionRef": "cmdCreateOrder",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.orderType",
      "name": "cmdCreateOrderOrderType",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateOrder",
        "direction": "input",
        "field": "orderType"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.tableNumber",
      "name": "cmdCreateOrderTableNumber",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateOrder",
        "direction": "input",
        "field": "tableNumber"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.customerName",
      "name": "cmdCreateOrderCustomerName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateOrder",
        "direction": "input",
        "field": "customerName"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.notes",
      "name": "cmdCreateOrderNotes",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateOrder",
        "direction": "input",
        "field": "notes"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.menuItemId",
      "name": "cmdCreateOrderMenuItemId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateOrder",
        "direction": "input",
        "field": "menuItemId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.quantity",
      "name": "cmdCreateOrderQuantity",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateOrder",
        "direction": "input",
        "field": "quantity"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.observations",
      "name": "cmdCreateOrderObservations",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateOrder",
        "direction": "input",
        "field": "observations"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.dailyShiftId",
      "name": "cmdCreateOrderDailyShiftId",
      "kind": "input",
      "source": "activeLifecycleInstance",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdCreateOrder",
        "direction": "input",
        "field": "dailyShiftId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.output.cmdCreateOrder",
      "name": "cmdCreateOrderOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdCreateOrder",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.posWorkspace.action.cmdCreateOrder.error",
      "name": "cmdCreateOrderError",
      "kind": "actionError",
      "actionRef": "cmdCreateOrder",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.action.cmdUpdateOrderStatus.status",
      "name": "cmdUpdateOrderStatusState",
      "kind": "actionStatus",
      "actionRef": "cmdUpdateOrderStatus",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdUpdateOrderStatus.orderId",
      "name": "cmdUpdateOrderStatusOrderId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdUpdateOrderStatus",
        "direction": "input",
        "field": "orderId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdUpdateOrderStatus.status",
      "name": "cmdUpdateOrderStatusStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateOrderStatus",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason",
      "name": "cmdUpdateOrderStatusCancellationReason",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdUpdateOrderStatus",
        "direction": "input",
        "field": "cancellationReason"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.output.cmdUpdateOrderStatus",
      "name": "cmdUpdateOrderStatusOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdUpdateOrderStatus",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.posWorkspace.action.cmdUpdateOrderStatus.error",
      "name": "cmdUpdateOrderStatusError",
      "kind": "actionError",
      "actionRef": "cmdUpdateOrderStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.action.cmdRecordBasicPayment.status",
      "name": "cmdRecordBasicPaymentState",
      "kind": "actionStatus",
      "actionRef": "cmdRecordBasicPayment",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.orderId",
      "name": "cmdRecordBasicPaymentOrderId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "cmdRecordBasicPayment",
        "direction": "input",
        "field": "orderId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount",
      "name": "cmdRecordBasicPaymentTotalAmount",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdRecordBasicPayment",
        "direction": "input",
        "field": "totalAmount"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod",
      "name": "cmdRecordBasicPaymentPaymentMethod",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdRecordBasicPayment",
        "direction": "input",
        "field": "paymentMethod"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.notes",
      "name": "cmdRecordBasicPaymentNotes",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "cmdRecordBasicPayment",
        "direction": "input",
        "field": "notes"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.posWorkspace.output.cmdRecordBasicPayment",
      "name": "cmdRecordBasicPaymentOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "cmdRecordBasicPayment",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.posWorkspace.action.cmdRecordBasicPayment.error",
      "name": "cmdRecordBasicPaymentError",
      "kind": "actionError",
      "actionRef": "cmdRecordBasicPayment",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "queryOpenOrders",
      "kind": "query",
      "commandRef": "queryOpenOrders",
      "routeKey": "cafeFlow.posWorkspace.queryOpenOrders",
      "purpose": "Acompanhar pedidos abertos",
      "methodName": "loadQueryOpenOrders",
      "handlerName": "handleQueryOpenOrdersClick",
      "inputStateKeys": [
        "ui.posWorkspace.input.queryOpenOrders.dailyShiftId",
        "ui.posWorkspace.input.queryOpenOrders.status",
        "ui.posWorkspace.input.queryOpenOrders.orderType",
        "ui.posWorkspace.input.queryOpenOrders.tableNumber",
        "ui.posWorkspace.input.queryOpenOrders.page",
        "ui.posWorkspace.input.queryOpenOrders.pageSize"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.posWorkspace.data.queryOpenOrders"
      ],
      "statusStateKey": "ui.posWorkspace.action.queryOpenOrders.status"
    },
    {
      "actionId": "queryMenuItems",
      "kind": "query",
      "commandRef": "queryMenuItems",
      "routeKey": "cafeFlow.posWorkspace.queryMenuItems",
      "purpose": "Consultar cardápio no POS",
      "methodName": "loadQueryMenuItems",
      "handlerName": "handleQueryMenuItemsClick",
      "inputStateKeys": [
        "ui.posWorkspace.input.queryMenuItems.menuCategoryId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.posWorkspace.data.queryMenuItems"
      ],
      "statusStateKey": "ui.posWorkspace.action.queryMenuItems.status"
    },
    {
      "actionId": "cmdCreateOrder",
      "kind": "command",
      "commandRef": "cmdCreateOrder",
      "routeKey": "cafeFlow.posWorkspace.cmdCreateOrder",
      "purpose": "Registrar pedido",
      "methodName": "cmdCreateOrder",
      "handlerName": "handleCmdCreateOrderClick",
      "inputStateKeys": [
        "ui.posWorkspace.input.cmdCreateOrder.orderType",
        "ui.posWorkspace.input.cmdCreateOrder.tableNumber",
        "ui.posWorkspace.input.cmdCreateOrder.customerName",
        "ui.posWorkspace.input.cmdCreateOrder.notes",
        "ui.posWorkspace.input.cmdCreateOrder.menuItemId",
        "ui.posWorkspace.input.cmdCreateOrder.quantity",
        "ui.posWorkspace.input.cmdCreateOrder.observations",
        "ui.posWorkspace.input.cmdCreateOrder.dailyShiftId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.posWorkspace.output.cmdCreateOrder"
      ],
      "statusStateKey": "ui.posWorkspace.action.cmdCreateOrder.status",
      "errorStateKey": "ui.posWorkspace.action.cmdCreateOrder.error",
      "feedback": {
        "successMessageKey": "action.cmdCreateOrder.success",
        "errorMessageKey": "action.cmdCreateOrder.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.posWorkspace.input.cmdCreateOrder.orderType",
        "ui.posWorkspace.input.cmdCreateOrder.tableNumber",
        "ui.posWorkspace.input.cmdCreateOrder.customerName",
        "ui.posWorkspace.input.cmdCreateOrder.notes",
        "ui.posWorkspace.input.cmdCreateOrder.menuItemId",
        "ui.posWorkspace.input.cmdCreateOrder.quantity",
        "ui.posWorkspace.input.cmdCreateOrder.observations",
        "ui.posWorkspace.input.cmdCreateOrder.dailyShiftId"
      ],
      "refreshActionIds": [
        "queryOpenOrders",
        "queryMenuItems"
      ]
    },
    {
      "actionId": "cmdUpdateOrderStatus",
      "kind": "command",
      "commandRef": "cmdUpdateOrderStatus",
      "routeKey": "cafeFlow.posWorkspace.cmdUpdateOrderStatus",
      "purpose": "Atualizar status do pedido",
      "methodName": "cmdUpdateOrderStatus",
      "handlerName": "handleCmdUpdateOrderStatusClick",
      "inputStateKeys": [
        "ui.posWorkspace.input.cmdUpdateOrderStatus.orderId",
        "ui.posWorkspace.input.cmdUpdateOrderStatus.status",
        "ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.posWorkspace.input.cmdUpdateOrderStatus.orderId"
      ],
      "outputStateKeys": [
        "ui.posWorkspace.output.cmdUpdateOrderStatus"
      ],
      "statusStateKey": "ui.posWorkspace.action.cmdUpdateOrderStatus.status",
      "errorStateKey": "ui.posWorkspace.action.cmdUpdateOrderStatus.error",
      "feedback": {
        "successMessageKey": "action.cmdUpdateOrderStatus.success",
        "errorMessageKey": "action.cmdUpdateOrderStatus.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.posWorkspace.input.cmdUpdateOrderStatus.orderId",
        "ui.posWorkspace.input.cmdUpdateOrderStatus.status",
        "ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason"
      ],
      "refreshActionIds": [
        "queryOpenOrders",
        "queryMenuItems"
      ]
    },
    {
      "actionId": "cmdRecordBasicPayment",
      "kind": "command",
      "commandRef": "cmdRecordBasicPayment",
      "routeKey": "cafeFlow.posWorkspace.cmdRecordBasicPayment",
      "purpose": "Registrar pagamento básico",
      "methodName": "cmdRecordBasicPayment",
      "handlerName": "handleCmdRecordBasicPaymentClick",
      "inputStateKeys": [
        "ui.posWorkspace.input.cmdRecordBasicPayment.orderId",
        "ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount",
        "ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod",
        "ui.posWorkspace.input.cmdRecordBasicPayment.notes"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.posWorkspace.input.cmdRecordBasicPayment.orderId"
      ],
      "outputStateKeys": [
        "ui.posWorkspace.output.cmdRecordBasicPayment"
      ],
      "statusStateKey": "ui.posWorkspace.action.cmdRecordBasicPayment.status",
      "errorStateKey": "ui.posWorkspace.action.cmdRecordBasicPayment.error",
      "feedback": {
        "successMessageKey": "action.cmdRecordBasicPayment.success",
        "errorMessageKey": "action.cmdRecordBasicPayment.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.posWorkspace.input.cmdRecordBasicPayment.orderId",
        "ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount",
        "ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod",
        "ui.posWorkspace.input.cmdRecordBasicPayment.notes"
      ],
      "refreshActionIds": [
        "queryOpenOrders",
        "queryMenuItems"
      ]
    },
    {
      "actionId": "set.queryOpenOrdersDailyShiftId",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.dailyShiftId",
      "methodName": "setQueryOpenOrdersDailyShiftId",
      "handlerName": "handleQueryOpenOrdersDailyShiftIdChange"
    },
    {
      "actionId": "set.queryOpenOrdersStatus",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.status",
      "methodName": "setQueryOpenOrdersStatus",
      "handlerName": "handleQueryOpenOrdersStatusChange"
    },
    {
      "actionId": "set.queryOpenOrdersOrderType",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.orderType",
      "methodName": "setQueryOpenOrdersOrderType",
      "handlerName": "handleQueryOpenOrdersOrderTypeChange"
    },
    {
      "actionId": "set.queryOpenOrdersTableNumber",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.tableNumber",
      "methodName": "setQueryOpenOrdersTableNumber",
      "handlerName": "handleQueryOpenOrdersTableNumberChange"
    },
    {
      "actionId": "set.queryOpenOrdersPage",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.page",
      "methodName": "setQueryOpenOrdersPage",
      "handlerName": "handleQueryOpenOrdersPageChange"
    },
    {
      "actionId": "set.queryOpenOrdersPageSize",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.queryOpenOrders.pageSize",
      "methodName": "setQueryOpenOrdersPageSize",
      "handlerName": "handleQueryOpenOrdersPageSizeChange"
    },
    {
      "actionId": "set.queryMenuItemsMenuCategoryId",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.queryMenuItems.menuCategoryId",
      "methodName": "setQueryMenuItemsMenuCategoryId",
      "handlerName": "handleQueryMenuItemsMenuCategoryIdChange"
    },
    {
      "actionId": "set.cmdCreateOrderOrderType",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.orderType",
      "methodName": "setCmdCreateOrderOrderType",
      "handlerName": "handleCmdCreateOrderOrderTypeChange"
    },
    {
      "actionId": "set.cmdCreateOrderTableNumber",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.tableNumber",
      "methodName": "setCmdCreateOrderTableNumber",
      "handlerName": "handleCmdCreateOrderTableNumberChange"
    },
    {
      "actionId": "set.cmdCreateOrderCustomerName",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.customerName",
      "methodName": "setCmdCreateOrderCustomerName",
      "handlerName": "handleCmdCreateOrderCustomerNameChange"
    },
    {
      "actionId": "set.cmdCreateOrderNotes",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.notes",
      "methodName": "setCmdCreateOrderNotes",
      "handlerName": "handleCmdCreateOrderNotesChange"
    },
    {
      "actionId": "set.cmdCreateOrderMenuItemId",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.menuItemId",
      "methodName": "setCmdCreateOrderMenuItemId",
      "handlerName": "handleCmdCreateOrderMenuItemIdChange"
    },
    {
      "actionId": "set.cmdCreateOrderQuantity",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.quantity",
      "methodName": "setCmdCreateOrderQuantity",
      "handlerName": "handleCmdCreateOrderQuantityChange"
    },
    {
      "actionId": "set.cmdCreateOrderObservations",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.observations",
      "methodName": "setCmdCreateOrderObservations",
      "handlerName": "handleCmdCreateOrderObservationsChange"
    },
    {
      "actionId": "set.cmdCreateOrderDailyShiftId",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdCreateOrder.dailyShiftId",
      "methodName": "setCmdCreateOrderDailyShiftId",
      "handlerName": "handleCmdCreateOrderDailyShiftIdChange"
    },
    {
      "actionId": "set.cmdUpdateOrderStatusOrderId",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdUpdateOrderStatus.orderId",
      "methodName": "setCmdUpdateOrderStatusOrderId",
      "handlerName": "handleCmdUpdateOrderStatusOrderIdChange"
    },
    {
      "actionId": "set.cmdUpdateOrderStatusStatus",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdUpdateOrderStatus.status",
      "methodName": "setCmdUpdateOrderStatusStatus",
      "handlerName": "handleCmdUpdateOrderStatusStatusChange"
    },
    {
      "actionId": "set.cmdUpdateOrderStatusCancellationReason",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason",
      "methodName": "setCmdUpdateOrderStatusCancellationReason",
      "handlerName": "handleCmdUpdateOrderStatusCancellationReasonChange"
    },
    {
      "actionId": "set.cmdRecordBasicPaymentOrderId",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.orderId",
      "methodName": "setCmdRecordBasicPaymentOrderId",
      "handlerName": "handleCmdRecordBasicPaymentOrderIdChange"
    },
    {
      "actionId": "set.cmdRecordBasicPaymentTotalAmount",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount",
      "methodName": "setCmdRecordBasicPaymentTotalAmount",
      "handlerName": "handleCmdRecordBasicPaymentTotalAmountChange"
    },
    {
      "actionId": "set.cmdRecordBasicPaymentPaymentMethod",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod",
      "methodName": "setCmdRecordBasicPaymentPaymentMethod",
      "handlerName": "handleCmdRecordBasicPaymentPaymentMethodChange"
    },
    {
      "actionId": "set.cmdRecordBasicPaymentNotes",
      "kind": "stateSetter",
      "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.notes",
      "methodName": "setCmdRecordBasicPaymentNotes",
      "handlerName": "handleCmdRecordBasicPaymentNotesChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "queryMenuItems",
      "stateKey": "ui.posWorkspace.data.queryMenuItems"
    }
  ],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt",
      "en"
    ]
  },
  "i18n": {
    "section.posWorkspace.openOrdersSection.title": "Pedidos Abertos",
    "organism.posWorkspace.queryOpenOrders.title": "Acompanhar pedidos abertos",
    "intent.posWorkspace.queryOpenOrders.list.title": "Acompanhar pedidos abertos",
    "intent.posWorkspace.queryOpenOrders.list.empty": "Nenhum registro encontrado",
    "intent.posWorkspace.queryOpenOrders.list.column.orders.label": "Orders",
    "intent.posWorkspace.queryOpenOrders.list.column.total.label": "Total",
    "intent.posWorkspace.queryOpenOrders.list.filter.dailyShiftId.label": "Daily Shift Id",
    "intent.posWorkspace.queryOpenOrders.list.filter.status.label": "Status",
    "intent.posWorkspace.queryOpenOrders.list.filter.orderType.label": "Order Type",
    "intent.posWorkspace.queryOpenOrders.list.filter.tableNumber.label": "Table Number",
    "intent.posWorkspace.queryOpenOrders.list.filter.page.label": "Page",
    "intent.posWorkspace.queryOpenOrders.list.filter.pageSize.label": "Page Size",
    "organism.posWorkspace.cmdUpdateOrderStatus.title": "Atualizar status do pedido",
    "intent.posWorkspace.cmdUpdateOrderStatus.form.title": "Atualizar status do pedido",
    "intent.posWorkspace.cmdUpdateOrderStatus.form.action.cmdUpdateOrderStatus": "Atualizar status do pedido",
    "intent.posWorkspace.cmdUpdateOrderStatus.form.field.status.label": "Status",
    "intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason.label": "Cancellation Reason",
    "section.posWorkspace.createOrderSection.title": "Lançar Pedido",
    "organism.posWorkspace.queryMenuItems.title": "Consultar cardápio no POS",
    "intent.posWorkspace.queryMenuItems.list.title": "Consultar cardápio no POS",
    "intent.posWorkspace.queryMenuItems.list.empty": "Nenhum registro encontrado",
    "intent.posWorkspace.queryMenuItems.list.column.menuItemId.label": "Menu Item Id",
    "intent.posWorkspace.queryMenuItems.list.column.menuCategoryId.label": "Menu Category Id",
    "intent.posWorkspace.queryMenuItems.list.column.name.label": "Name",
    "intent.posWorkspace.queryMenuItems.list.column.description.label": "Description",
    "intent.posWorkspace.queryMenuItems.list.column.price.label": "Price",
    "intent.posWorkspace.queryMenuItems.list.column.status.label": "Status",
    "intent.posWorkspace.queryMenuItems.list.column.imageUrl.label": "Image Url",
    "intent.posWorkspace.queryMenuItems.list.column.displayOrder.label": "Display Order",
    "intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId.label": "Menu Category Id",
    "organism.posWorkspace.cmdCreateOrder.title": "Registrar pedido",
    "intent.posWorkspace.cmdCreateOrder.form.title": "Registrar pedido",
    "intent.posWorkspace.cmdCreateOrder.form.action.cmdCreateOrder": "Registrar pedido",
    "intent.posWorkspace.cmdCreateOrder.form.field.orderType.label": "Order Type",
    "intent.posWorkspace.cmdCreateOrder.form.field.tableNumber.label": "Table Number",
    "intent.posWorkspace.cmdCreateOrder.form.field.customerName.label": "Customer Name",
    "intent.posWorkspace.cmdCreateOrder.form.field.notes.label": "Notes",
    "intent.posWorkspace.cmdCreateOrder.form.field.menuItemId.label": "Menu Item Id",
    "intent.posWorkspace.cmdCreateOrder.form.field.quantity.label": "Quantity",
    "intent.posWorkspace.cmdCreateOrder.form.field.observations.label": "Observations",
    "intent.posWorkspace.cmdCreateOrder.form.field.dailyShiftId.label": "Daily Shift Id",
    "section.posWorkspace.paymentSection.title": "Registrar Pagamento",
    "organism.posWorkspace.cmdRecordBasicPayment.title": "Registrar pagamento básico",
    "intent.posWorkspace.cmdRecordBasicPayment.form.title": "Registrar pagamento básico",
    "intent.posWorkspace.cmdRecordBasicPayment.form.action.cmdRecordBasicPayment": "Registrar pagamento básico",
    "intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount.label": "Total Amount",
    "intent.posWorkspace.cmdRecordBasicPayment.form.field.paymentMethod.label": "Payment Method",
    "intent.posWorkspace.cmdRecordBasicPayment.form.field.notes.label": "Notes",
    "section.posWorkspace.sec-open-orders.title": "Pedidos Abertos do Turno",
    "section.posWorkspace.sec-create-order.title": "Lançar Novo Pedido",
    "section.posWorkspace.sec-payment.title": "Registrar Pagamento"
  },
  "automation": {
    "statePrefix": "ui.posWorkspace",
    "stateKeys": [
      "ui.posWorkspace.status",
      "ui.posWorkspace.action.queryOpenOrders.status",
      "ui.posWorkspace.input.queryOpenOrders.dailyShiftId",
      "ui.posWorkspace.input.queryOpenOrders.status",
      "ui.posWorkspace.input.queryOpenOrders.orderType",
      "ui.posWorkspace.input.queryOpenOrders.tableNumber",
      "ui.posWorkspace.input.queryOpenOrders.page",
      "ui.posWorkspace.input.queryOpenOrders.pageSize",
      "ui.posWorkspace.data.queryOpenOrders",
      "ui.posWorkspace.action.queryMenuItems.status",
      "ui.posWorkspace.input.queryMenuItems.menuCategoryId",
      "ui.posWorkspace.data.queryMenuItems",
      "ui.posWorkspace.action.cmdCreateOrder.status",
      "ui.posWorkspace.input.cmdCreateOrder.orderType",
      "ui.posWorkspace.input.cmdCreateOrder.tableNumber",
      "ui.posWorkspace.input.cmdCreateOrder.customerName",
      "ui.posWorkspace.input.cmdCreateOrder.notes",
      "ui.posWorkspace.input.cmdCreateOrder.menuItemId",
      "ui.posWorkspace.input.cmdCreateOrder.quantity",
      "ui.posWorkspace.input.cmdCreateOrder.observations",
      "ui.posWorkspace.input.cmdCreateOrder.dailyShiftId",
      "ui.posWorkspace.output.cmdCreateOrder",
      "ui.posWorkspace.action.cmdCreateOrder.error",
      "ui.posWorkspace.action.cmdUpdateOrderStatus.status",
      "ui.posWorkspace.input.cmdUpdateOrderStatus.orderId",
      "ui.posWorkspace.input.cmdUpdateOrderStatus.status",
      "ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason",
      "ui.posWorkspace.output.cmdUpdateOrderStatus",
      "ui.posWorkspace.action.cmdUpdateOrderStatus.error",
      "ui.posWorkspace.action.cmdRecordBasicPayment.status",
      "ui.posWorkspace.input.cmdRecordBasicPayment.orderId",
      "ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount",
      "ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod",
      "ui.posWorkspace.input.cmdRecordBasicPayment.notes",
      "ui.posWorkspace.output.cmdRecordBasicPayment",
      "ui.posWorkspace.action.cmdRecordBasicPayment.error"
    ],
    "actionIds": [
      "queryOpenOrders",
      "queryMenuItems",
      "cmdCreateOrder",
      "cmdUpdateOrderStatus",
      "cmdRecordBasicPayment",
      "set.queryOpenOrdersDailyShiftId",
      "set.queryOpenOrdersStatus",
      "set.queryOpenOrdersOrderType",
      "set.queryOpenOrdersTableNumber",
      "set.queryOpenOrdersPage",
      "set.queryOpenOrdersPageSize",
      "set.queryMenuItemsMenuCategoryId",
      "set.cmdCreateOrderOrderType",
      "set.cmdCreateOrderTableNumber",
      "set.cmdCreateOrderCustomerName",
      "set.cmdCreateOrderNotes",
      "set.cmdCreateOrderMenuItemId",
      "set.cmdCreateOrderQuantity",
      "set.cmdCreateOrderObservations",
      "set.cmdCreateOrderDailyShiftId",
      "set.cmdUpdateOrderStatusOrderId",
      "set.cmdUpdateOrderStatusStatus",
      "set.cmdUpdateOrderStatusCancellationReason",
      "set.cmdRecordBasicPaymentOrderId",
      "set.cmdRecordBasicPaymentTotalAmount",
      "set.cmdRecordBasicPaymentPaymentMethod",
      "set.cmdRecordBasicPaymentNotes"
    ]
  }
};

export const pipeline = [
  {
    "id": "posWorkspace__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/posWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/posWorkspace.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "ordersRequireOpenDailyShift",
      "orderRequiresTableOrTakeout",
      "onlyReadyOrdersCanBeServed",
      "completedOrdersLeaveKitchenQueue",
      "onlyActiveMenuItemsCanBeOrdered",
      "menuItemNeedsCategoryAndPrice",
      "orderEntersKitchenQueueAfterAttendantConfirmation",
      "orderTotalFromPriceAtLaunchTime",
      "orderItemsArePrepReference",
      "autoStockDeductionOnServe",
      "kitchenStatusProgressesInOrder",
      "shiftClosingRecordsBasicTotalsAndPayments"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
