/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "kitchenWorkspace",
  "pageName": "Fila da cozinha",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowKitchenWorkspaceBase",
  "routePattern": "/cafeFlow/kitchenWorkspace",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:orderLifecycle",
    "operation:viewKitchenQueue",
    "operation:updateOrderStatus"
  ],
  "operationIds": [
    "viewKitchenQueue",
    "updateOrderStatus"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "kitchenWorkspace",
    "workspaceKind": "workflow",
    "workflowId": "orderLifecycle",
    "actor": "cozinheiro",
    "entity": "Order",
    "owners": [
      {
        "kind": "workflow",
        "id": "orderLifecycle",
        "defPath": "_102051_/l4/cafeFlow/workflows/orderLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "viewKitchenQueue",
        "defPath": "_102051_/l4/cafeFlow/operations/viewKitchenQueue.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateOrderStatus",
        "defPath": "_102051_/l4/cafeFlow/operations/updateOrderStatus.defs.ts"
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
          "operationId": "viewKitchenQueue",
          "commandName": "viewKitchenQueue",
          "steps": [
            "O cozinheiro abre a fila da cozinha vinculada ao turno diário aberto",
            "O sistema lista apenas pedidos confirmados e em preparo, com itens, quantidades e observações",
            "O cozinheiro visualiza canal (mesa/takeout), mesa ou cliente e observações para ordenar o preparo"
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
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/kitchenWorkspace.ts",
    "contracts": [
      {
        "commandName": "fetchKitchenQueue",
        "routeConst": "fetchKitchenQueueRoute"
      },
      {
        "commandName": "changeOrderStatus",
        "routeConst": "changeOrderStatusRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/kitchenWorkspace.defs.ts",
    "layoutId": "cfe-20260723170708.1000"
  },
  "states": [
    {
      "stateKey": "ui.kitchenWorkspace.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenWorkspace.action.fetchKitchenQueue.status",
      "name": "fetchKitchenQueueState",
      "kind": "actionStatus",
      "actionRef": "fetchKitchenQueue",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId",
      "name": "fetchKitchenQueueDailyShiftId",
      "kind": "input",
      "source": "activeLifecycleInstance",
      "presentation": "form",
      "contractRef": {
        "commandName": "fetchKitchenQueue",
        "direction": "input",
        "field": "dailyShiftId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue",
      "name": "fetchKitchenQueueData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "fetchKitchenQueue",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    },
    {
      "stateKey": "ui.kitchenWorkspace.action.changeOrderStatus.status",
      "name": "changeOrderStatusState",
      "kind": "actionStatus",
      "actionRef": "changeOrderStatus",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.orderId",
      "name": "changeOrderStatusOrderId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "changeOrderStatus",
        "direction": "input",
        "field": "orderId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.status",
      "name": "changeOrderStatusStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "changeOrderStatus",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason",
      "name": "changeOrderStatusCancellationReason",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "changeOrderStatus",
        "direction": "input",
        "field": "cancellationReason"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt",
      "name": "changeOrderStatusUpdatedAt",
      "kind": "input",
      "source": "systemDefault",
      "presentation": "form",
      "contractRef": {
        "commandName": "changeOrderStatus",
        "direction": "input",
        "field": "updatedAt"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.kitchenWorkspace.output.changeOrderStatus",
      "name": "changeOrderStatusOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "changeOrderStatus",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.kitchenWorkspace.action.changeOrderStatus.error",
      "name": "changeOrderStatusError",
      "kind": "actionError",
      "actionRef": "changeOrderStatus",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "fetchKitchenQueue",
      "kind": "query",
      "commandRef": "fetchKitchenQueue",
      "routeKey": "cafeFlow.kitchenWorkspace.fetchKitchenQueue",
      "purpose": "Ver fila da cozinha",
      "methodName": "loadFetchKitchenQueue",
      "handlerName": "handleFetchKitchenQueueClick",
      "inputStateKeys": [
        "ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.kitchenWorkspace.data.fetchKitchenQueue"
      ],
      "statusStateKey": "ui.kitchenWorkspace.action.fetchKitchenQueue.status"
    },
    {
      "actionId": "changeOrderStatus",
      "kind": "command",
      "commandRef": "changeOrderStatus",
      "routeKey": "cafeFlow.kitchenWorkspace.changeOrderStatus",
      "purpose": "Atualizar status do pedido",
      "methodName": "changeOrderStatus",
      "handlerName": "handleChangeOrderStatusClick",
      "inputStateKeys": [
        "ui.kitchenWorkspace.input.changeOrderStatus.orderId",
        "ui.kitchenWorkspace.input.changeOrderStatus.status",
        "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason",
        "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.kitchenWorkspace.input.changeOrderStatus.orderId"
      ],
      "outputStateKeys": [
        "ui.kitchenWorkspace.output.changeOrderStatus"
      ],
      "statusStateKey": "ui.kitchenWorkspace.action.changeOrderStatus.status",
      "errorStateKey": "ui.kitchenWorkspace.action.changeOrderStatus.error",
      "feedback": {
        "successMessageKey": "action.changeOrderStatus.success",
        "errorMessageKey": "action.changeOrderStatus.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.kitchenWorkspace.input.changeOrderStatus.orderId",
        "ui.kitchenWorkspace.input.changeOrderStatus.status",
        "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason",
        "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt"
      ],
      "refreshActionIds": [
        "fetchKitchenQueue"
      ]
    },
    {
      "actionId": "set.fetchKitchenQueueDailyShiftId",
      "kind": "stateSetter",
      "stateKey": "ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId",
      "methodName": "setFetchKitchenQueueDailyShiftId",
      "handlerName": "handleFetchKitchenQueueDailyShiftIdChange"
    },
    {
      "actionId": "set.changeOrderStatusOrderId",
      "kind": "stateSetter",
      "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.orderId",
      "methodName": "setChangeOrderStatusOrderId",
      "handlerName": "handleChangeOrderStatusOrderIdChange",
      "prefill": {
        "command": "changeOrderStatus",
        "sourceStateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue",
        "sourceOutputShape": "array",
        "matchField": "orderId",
        "fields": [
          {
            "itemField": "status",
            "targetStateKey": "ui.kitchenWorkspace.input.changeOrderStatus.status"
          }
        ]
      }
    },
    {
      "actionId": "set.changeOrderStatusStatus",
      "kind": "stateSetter",
      "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.status",
      "methodName": "setChangeOrderStatusStatus",
      "handlerName": "handleChangeOrderStatusStatusChange"
    },
    {
      "actionId": "set.changeOrderStatusCancellationReason",
      "kind": "stateSetter",
      "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason",
      "methodName": "setChangeOrderStatusCancellationReason",
      "handlerName": "handleChangeOrderStatusCancellationReasonChange"
    },
    {
      "actionId": "set.changeOrderStatusUpdatedAt",
      "kind": "stateSetter",
      "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt",
      "methodName": "setChangeOrderStatusUpdatedAt",
      "handlerName": "handleChangeOrderStatusUpdatedAtChange"
    }
  ],
  "initialLoads": [],
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
    "section.kitchenWorkspace.kitchenQueueSection.title": "Fila da Cozinha",
    "organism.kitchenWorkspace.fetchKitchenQueue.title": "Ver fila da cozinha",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.title": "Ver fila da cozinha",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.empty": "Nenhum registro encontrado",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label": "Order Id",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderType.label": "Order Type",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.column.tableNumber.label": "Table Number",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.column.customerName.label": "Customer Name",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.column.notes.label": "Notes",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.column.status.label": "Status",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.column.confirmedAt.label": "Confirmed At",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.column.inPreparationAt.label": "In Preparation At",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.column.items.label": "Items",
    "intent.kitchenWorkspace.fetchKitchenQueue.list.filter.dailyShiftId.label": "Daily Shift Id",
    "organism.kitchenWorkspace.changeOrderStatus.title": "Atualizar status do pedido",
    "intent.kitchenWorkspace.changeOrderStatus.form.title": "Atualizar status do pedido",
    "intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus": "Atualizar status do pedido",
    "intent.kitchenWorkspace.changeOrderStatus.form.field.status.label": "Status",
    "intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason.label": "Cancellation Reason",
    "intent.kitchenWorkspace.changeOrderStatus.form.field.updatedAt.label": "Updated At",
    "section.kitchenWorkspace.kitchen-queue-section.title": "Fila da Cozinha"
  },
  "automation": {
    "statePrefix": "ui.kitchenWorkspace",
    "stateKeys": [
      "ui.kitchenWorkspace.status",
      "ui.kitchenWorkspace.action.fetchKitchenQueue.status",
      "ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId",
      "ui.kitchenWorkspace.data.fetchKitchenQueue",
      "ui.kitchenWorkspace.action.changeOrderStatus.status",
      "ui.kitchenWorkspace.input.changeOrderStatus.orderId",
      "ui.kitchenWorkspace.input.changeOrderStatus.status",
      "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason",
      "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt",
      "ui.kitchenWorkspace.output.changeOrderStatus",
      "ui.kitchenWorkspace.action.changeOrderStatus.error"
    ],
    "actionIds": [
      "fetchKitchenQueue",
      "changeOrderStatus",
      "set.fetchKitchenQueueDailyShiftId",
      "set.changeOrderStatusOrderId",
      "set.changeOrderStatusStatus",
      "set.changeOrderStatusCancellationReason",
      "set.changeOrderStatusUpdatedAt"
    ]
  }
};

export const pipeline = [
  {
    "id": "kitchenWorkspace__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/kitchenWorkspace.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "orderEntersKitchenQueueAfterAttendantConfirmation",
      "completedOrdersLeaveKitchenQueue",
      "orderItemsArePrepReference",
      "ordersRequireOpenDailyShift",
      "orderRequiresTableOrTakeout",
      "onlyReadyOrdersCanBeServed",
      "autoStockDeductionOnServe",
      "kitchenStatusProgressesInOrder"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
