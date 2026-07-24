/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/stockManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "stockManagement",
  "pageName": "Controlar estoque",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowStockManagementBase",
  "routePattern": "/cafeFlow/stockManagement/:stockItemId?",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:browseStockItems",
    "operation:createStockItem",
    "operation:updateStockItem",
    "operation:deleteStockItem",
    "operation:createStockAdjustment"
  ],
  "operationIds": [
    "browseStockItems",
    "createStockItem",
    "updateStockItem",
    "deleteStockItem",
    "createStockAdjustment"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "stockManagement",
    "workspaceKind": "operation",
    "actor": "gerente",
    "entity": "StockItem",
    "owners": [
      {
        "kind": "operation",
        "id": "browseStockItems",
        "defPath": "_102051_/l4/cafeFlow/operations/browseStockItems.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createStockItem",
        "defPath": "_102051_/l4/cafeFlow/operations/createStockItem.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateStockItem",
        "defPath": "_102051_/l4/cafeFlow/operations/updateStockItem.defs.ts"
      },
      {
        "kind": "operation",
        "id": "deleteStockItem",
        "defPath": "_102051_/l4/cafeFlow/operations/deleteStockItem.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createStockAdjustment",
        "defPath": "_102051_/l4/cafeFlow/operations/createStockAdjustment.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "browseStockItems",
          "commandName": "browseStockItems",
          "steps": [
            "O gerente acessa o controle de estoque",
            "O sistema lista os insumos com saldo atual, unidade e nível mínimo",
            "Itens com saldo no ou abaixo do mínimo são destacados como estoque baixo",
            "O gerente pode filtrar por nome ou somente itens em estoque baixo"
          ]
        },
        {
          "operationId": "createStockItem",
          "commandName": "createStockItem",
          "steps": [
            "Informar nome, unidade de medida, saldo inicial e nível mínimo do insumo",
            "Opcionalmente informar descrição complementar",
            "Confirmar o cadastro do item de estoque"
          ]
        },
        {
          "operationId": "updateStockItem",
          "commandName": "updateStockItem",
          "steps": [
            "O gerente abre o item de estoque selecionado para edição",
            "O gerente altera nome, unidade de medida, nível mínimo e/ou descrição do insumo",
            "O gerente confirma a atualização do cadastro"
          ]
        },
        {
          "operationId": "deleteStockItem",
          "commandName": "deleteStockItem",
          "steps": [
            "Seleciona o item de estoque na listagem de controle",
            "Confirma a exclusão do item de estoque",
            "O sistema remove o cadastro do insumo"
          ]
        },
        {
          "operationId": "createStockAdjustment",
          "commandName": "createStockAdjustment",
          "steps": [
            "Seleciona o insumo cujo saldo precisa ser corrigido",
            "Informa a quantidade, a direção do ajuste e o motivo",
            "Opcionalmente adiciona observações sobre a divergência",
            "Confirma o registro do ajuste manual"
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/stockManagement.ts",
    "contracts": [
      {
        "commandName": "listStockItems",
        "routeConst": "listStockItemsRoute"
      },
      {
        "commandName": "addStockItem",
        "routeConst": "addStockItemRoute"
      },
      {
        "commandName": "editStockItem",
        "routeConst": "editStockItemRoute"
      },
      {
        "commandName": "removeStockItem",
        "routeConst": "removeStockItemRoute"
      },
      {
        "commandName": "registerStockAdjustment",
        "routeConst": "registerStockAdjustmentRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.defs.ts",
    "layoutId": "cfe-20260723170708.1000"
  },
  "states": [
    {
      "stateKey": "ui.stockManagement.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.action.listStockItems.status",
      "name": "listStockItemsState",
      "kind": "actionStatus",
      "actionRef": "listStockItems",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.stockManagement.input.listStockItems.nameFilter",
      "name": "listStockItemsNameFilter",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "listStockItems",
        "direction": "input",
        "field": "nameFilter"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.listStockItems.lowStockOnly",
      "name": "listStockItemsLowStockOnly",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "listStockItems",
        "direction": "input",
        "field": "lowStockOnly"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.listStockItems.page",
      "name": "listStockItemsPage",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "listStockItems",
        "direction": "input",
        "field": "page"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.listStockItems.pageSize",
      "name": "listStockItemsPageSize",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "listStockItems",
        "direction": "input",
        "field": "pageSize"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.data.listStockItems",
      "name": "listStockItemsData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "listStockItems",
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
      "stateKey": "ui.stockManagement.action.addStockItem.status",
      "name": "addStockItemState",
      "kind": "actionStatus",
      "actionRef": "addStockItem",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.stockManagement.input.addStockItem.name",
      "name": "addStockItemName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "addStockItem",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.addStockItem.unit",
      "name": "addStockItemUnit",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "addStockItem",
        "direction": "input",
        "field": "unit"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.addStockItem.currentBalance",
      "name": "addStockItemCurrentBalance",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "addStockItem",
        "direction": "input",
        "field": "currentBalance"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.addStockItem.minimumLevel",
      "name": "addStockItemMinimumLevel",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "addStockItem",
        "direction": "input",
        "field": "minimumLevel"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.addStockItem.description",
      "name": "addStockItemDescription",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "addStockItem",
        "direction": "input",
        "field": "description"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.output.addStockItem",
      "name": "addStockItemOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "addStockItem",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.stockManagement.action.addStockItem.error",
      "name": "addStockItemError",
      "kind": "actionError",
      "actionRef": "addStockItem",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.action.editStockItem.status",
      "name": "editStockItemState",
      "kind": "actionStatus",
      "actionRef": "editStockItem",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.stockManagement.input.editStockItem.stockItemId",
      "name": "editStockItemStockItemId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "editStockItem",
        "direction": "input",
        "field": "stockItemId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.editStockItem.name",
      "name": "editStockItemName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "editStockItem",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.editStockItem.unit",
      "name": "editStockItemUnit",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "editStockItem",
        "direction": "input",
        "field": "unit"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.editStockItem.minimumLevel",
      "name": "editStockItemMinimumLevel",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "editStockItem",
        "direction": "input",
        "field": "minimumLevel"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.editStockItem.description",
      "name": "editStockItemDescription",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "editStockItem",
        "direction": "input",
        "field": "description"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.output.editStockItem",
      "name": "editStockItemOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "editStockItem",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.stockManagement.action.editStockItem.error",
      "name": "editStockItemError",
      "kind": "actionError",
      "actionRef": "editStockItem",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.action.removeStockItem.status",
      "name": "removeStockItemState",
      "kind": "actionStatus",
      "actionRef": "removeStockItem",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.stockManagement.input.removeStockItem.stockItemId",
      "name": "removeStockItemStockItemId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "removeStockItem",
        "direction": "input",
        "field": "stockItemId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.output.removeStockItem",
      "name": "removeStockItemOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "removeStockItem",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.stockManagement.action.removeStockItem.error",
      "name": "removeStockItemError",
      "kind": "actionError",
      "actionRef": "removeStockItem",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.action.registerStockAdjustment.status",
      "name": "registerStockAdjustmentState",
      "kind": "actionStatus",
      "actionRef": "registerStockAdjustment",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.stockItemId",
      "name": "registerStockAdjustmentStockItemId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "registerStockAdjustment",
        "direction": "input",
        "field": "stockItemId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.quantity",
      "name": "registerStockAdjustmentQuantity",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "registerStockAdjustment",
        "direction": "input",
        "field": "quantity"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.direction",
      "name": "registerStockAdjustmentDirection",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "registerStockAdjustment",
        "direction": "input",
        "field": "direction"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.reason",
      "name": "registerStockAdjustmentReason",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "registerStockAdjustment",
        "direction": "input",
        "field": "reason"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.notes",
      "name": "registerStockAdjustmentNotes",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "registerStockAdjustment",
        "direction": "input",
        "field": "notes"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.stockManagement.output.registerStockAdjustment",
      "name": "registerStockAdjustmentOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "registerStockAdjustment",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.stockManagement.action.registerStockAdjustment.error",
      "name": "registerStockAdjustmentError",
      "kind": "actionError",
      "actionRef": "registerStockAdjustment",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "listStockItems",
      "kind": "query",
      "commandRef": "listStockItems",
      "routeKey": "cafeFlow.stockManagement.listStockItems",
      "purpose": "Listar itens de estoque",
      "methodName": "loadListStockItems",
      "handlerName": "handleListStockItemsClick",
      "inputStateKeys": [
        "ui.stockManagement.input.listStockItems.nameFilter",
        "ui.stockManagement.input.listStockItems.lowStockOnly",
        "ui.stockManagement.input.listStockItems.page",
        "ui.stockManagement.input.listStockItems.pageSize"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.stockManagement.data.listStockItems"
      ],
      "statusStateKey": "ui.stockManagement.action.listStockItems.status"
    },
    {
      "actionId": "addStockItem",
      "kind": "command",
      "commandRef": "addStockItem",
      "routeKey": "cafeFlow.stockManagement.addStockItem",
      "purpose": "Criar item de estoque",
      "methodName": "addStockItem",
      "handlerName": "handleAddStockItemClick",
      "inputStateKeys": [
        "ui.stockManagement.input.addStockItem.name",
        "ui.stockManagement.input.addStockItem.unit",
        "ui.stockManagement.input.addStockItem.currentBalance",
        "ui.stockManagement.input.addStockItem.minimumLevel",
        "ui.stockManagement.input.addStockItem.description"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.stockManagement.output.addStockItem"
      ],
      "statusStateKey": "ui.stockManagement.action.addStockItem.status",
      "errorStateKey": "ui.stockManagement.action.addStockItem.error",
      "feedback": {
        "successMessageKey": "action.addStockItem.success",
        "errorMessageKey": "action.addStockItem.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.stockManagement.input.addStockItem.name",
        "ui.stockManagement.input.addStockItem.unit",
        "ui.stockManagement.input.addStockItem.currentBalance",
        "ui.stockManagement.input.addStockItem.minimumLevel",
        "ui.stockManagement.input.addStockItem.description"
      ],
      "refreshActionIds": [
        "listStockItems"
      ]
    },
    {
      "actionId": "editStockItem",
      "kind": "command",
      "commandRef": "editStockItem",
      "routeKey": "cafeFlow.stockManagement.editStockItem",
      "purpose": "Atualizar item de estoque",
      "methodName": "editStockItem",
      "handlerName": "handleEditStockItemClick",
      "inputStateKeys": [
        "ui.stockManagement.input.editStockItem.stockItemId",
        "ui.stockManagement.input.editStockItem.name",
        "ui.stockManagement.input.editStockItem.unit",
        "ui.stockManagement.input.editStockItem.minimumLevel",
        "ui.stockManagement.input.editStockItem.description"
      ],
      "routeParamInputStateKeys": [
        "ui.stockManagement.input.editStockItem.stockItemId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.stockManagement.output.editStockItem"
      ],
      "statusStateKey": "ui.stockManagement.action.editStockItem.status",
      "errorStateKey": "ui.stockManagement.action.editStockItem.error",
      "feedback": {
        "successMessageKey": "action.editStockItem.success",
        "errorMessageKey": "action.editStockItem.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.stockManagement.input.editStockItem.name",
        "ui.stockManagement.input.editStockItem.unit",
        "ui.stockManagement.input.editStockItem.minimumLevel",
        "ui.stockManagement.input.editStockItem.description"
      ],
      "refreshActionIds": [
        "listStockItems"
      ]
    },
    {
      "actionId": "removeStockItem",
      "kind": "command",
      "commandRef": "removeStockItem",
      "routeKey": "cafeFlow.stockManagement.removeStockItem",
      "purpose": "Excluir item de estoque",
      "methodName": "removeStockItem",
      "handlerName": "handleRemoveStockItemClick",
      "inputStateKeys": [
        "ui.stockManagement.input.removeStockItem.stockItemId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.stockManagement.input.removeStockItem.stockItemId"
      ],
      "outputStateKeys": [
        "ui.stockManagement.output.removeStockItem"
      ],
      "statusStateKey": "ui.stockManagement.action.removeStockItem.status",
      "errorStateKey": "ui.stockManagement.action.removeStockItem.error",
      "feedback": {
        "successMessageKey": "action.removeStockItem.success",
        "errorMessageKey": "action.removeStockItem.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.stockManagement.input.removeStockItem.stockItemId"
      ],
      "refreshActionIds": [
        "listStockItems"
      ]
    },
    {
      "actionId": "registerStockAdjustment",
      "kind": "command",
      "commandRef": "registerStockAdjustment",
      "routeKey": "cafeFlow.stockManagement.registerStockAdjustment",
      "purpose": "Registrar ajuste manual de estoque",
      "methodName": "registerStockAdjustment",
      "handlerName": "handleRegisterStockAdjustmentClick",
      "inputStateKeys": [
        "ui.stockManagement.input.registerStockAdjustment.stockItemId",
        "ui.stockManagement.input.registerStockAdjustment.quantity",
        "ui.stockManagement.input.registerStockAdjustment.direction",
        "ui.stockManagement.input.registerStockAdjustment.reason",
        "ui.stockManagement.input.registerStockAdjustment.notes"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.stockManagement.output.registerStockAdjustment"
      ],
      "statusStateKey": "ui.stockManagement.action.registerStockAdjustment.status",
      "errorStateKey": "ui.stockManagement.action.registerStockAdjustment.error",
      "feedback": {
        "successMessageKey": "action.registerStockAdjustment.success",
        "errorMessageKey": "action.registerStockAdjustment.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.stockManagement.input.registerStockAdjustment.stockItemId",
        "ui.stockManagement.input.registerStockAdjustment.quantity",
        "ui.stockManagement.input.registerStockAdjustment.direction",
        "ui.stockManagement.input.registerStockAdjustment.reason",
        "ui.stockManagement.input.registerStockAdjustment.notes"
      ],
      "refreshActionIds": [
        "listStockItems"
      ]
    },
    {
      "actionId": "set.listStockItemsNameFilter",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.listStockItems.nameFilter",
      "methodName": "setListStockItemsNameFilter",
      "handlerName": "handleListStockItemsNameFilterChange"
    },
    {
      "actionId": "set.listStockItemsLowStockOnly",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.listStockItems.lowStockOnly",
      "methodName": "setListStockItemsLowStockOnly",
      "handlerName": "handleListStockItemsLowStockOnlyChange"
    },
    {
      "actionId": "set.listStockItemsPage",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.listStockItems.page",
      "methodName": "setListStockItemsPage",
      "handlerName": "handleListStockItemsPageChange"
    },
    {
      "actionId": "set.listStockItemsPageSize",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.listStockItems.pageSize",
      "methodName": "setListStockItemsPageSize",
      "handlerName": "handleListStockItemsPageSizeChange"
    },
    {
      "actionId": "set.addStockItemName",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.addStockItem.name",
      "methodName": "setAddStockItemName",
      "handlerName": "handleAddStockItemNameChange"
    },
    {
      "actionId": "set.addStockItemUnit",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.addStockItem.unit",
      "methodName": "setAddStockItemUnit",
      "handlerName": "handleAddStockItemUnitChange"
    },
    {
      "actionId": "set.addStockItemCurrentBalance",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.addStockItem.currentBalance",
      "methodName": "setAddStockItemCurrentBalance",
      "handlerName": "handleAddStockItemCurrentBalanceChange"
    },
    {
      "actionId": "set.addStockItemMinimumLevel",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.addStockItem.minimumLevel",
      "methodName": "setAddStockItemMinimumLevel",
      "handlerName": "handleAddStockItemMinimumLevelChange"
    },
    {
      "actionId": "set.addStockItemDescription",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.addStockItem.description",
      "methodName": "setAddStockItemDescription",
      "handlerName": "handleAddStockItemDescriptionChange"
    },
    {
      "actionId": "set.editStockItemStockItemId",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.editStockItem.stockItemId",
      "methodName": "setEditStockItemStockItemId",
      "handlerName": "handleEditStockItemStockItemIdChange"
    },
    {
      "actionId": "set.editStockItemName",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.editStockItem.name",
      "methodName": "setEditStockItemName",
      "handlerName": "handleEditStockItemNameChange"
    },
    {
      "actionId": "set.editStockItemUnit",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.editStockItem.unit",
      "methodName": "setEditStockItemUnit",
      "handlerName": "handleEditStockItemUnitChange"
    },
    {
      "actionId": "set.editStockItemMinimumLevel",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.editStockItem.minimumLevel",
      "methodName": "setEditStockItemMinimumLevel",
      "handlerName": "handleEditStockItemMinimumLevelChange"
    },
    {
      "actionId": "set.editStockItemDescription",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.editStockItem.description",
      "methodName": "setEditStockItemDescription",
      "handlerName": "handleEditStockItemDescriptionChange"
    },
    {
      "actionId": "set.removeStockItemStockItemId",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.removeStockItem.stockItemId",
      "methodName": "setRemoveStockItemStockItemId",
      "handlerName": "handleRemoveStockItemStockItemIdChange"
    },
    {
      "actionId": "set.registerStockAdjustmentStockItemId",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.stockItemId",
      "methodName": "setRegisterStockAdjustmentStockItemId",
      "handlerName": "handleRegisterStockAdjustmentStockItemIdChange"
    },
    {
      "actionId": "set.registerStockAdjustmentQuantity",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.quantity",
      "methodName": "setRegisterStockAdjustmentQuantity",
      "handlerName": "handleRegisterStockAdjustmentQuantityChange"
    },
    {
      "actionId": "set.registerStockAdjustmentDirection",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.direction",
      "methodName": "setRegisterStockAdjustmentDirection",
      "handlerName": "handleRegisterStockAdjustmentDirectionChange"
    },
    {
      "actionId": "set.registerStockAdjustmentReason",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.reason",
      "methodName": "setRegisterStockAdjustmentReason",
      "handlerName": "handleRegisterStockAdjustmentReasonChange"
    },
    {
      "actionId": "set.registerStockAdjustmentNotes",
      "kind": "stateSetter",
      "stateKey": "ui.stockManagement.input.registerStockAdjustment.notes",
      "methodName": "setRegisterStockAdjustmentNotes",
      "handlerName": "handleRegisterStockAdjustmentNotesChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "listStockItems",
      "stateKey": "ui.stockManagement.data.listStockItems"
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
    "section.stockManagement.sec-stockItemList.title": "Stock Item List",
    "organism.stockManagement.inline-row-command10.title": "Inline row command",
    "intent.stockManagement.inline-row-command10.content.title": "Inline row command",
    "organism.stockManagement.listStockItems.title": "Listar itens de estoque",
    "intent.stockManagement.listStockItems.list.title": "Listar itens de estoque",
    "intent.stockManagement.listStockItems.list.empty": "Nenhum registro encontrado",
    "intent.stockManagement.listStockItems.list.column.stockItems.label": "Stock Items",
    "intent.stockManagement.listStockItems.list.column.total.label": "Total",
    "intent.stockManagement.listStockItems.list.filter.nameFilter.label": "Name Filter",
    "intent.stockManagement.listStockItems.list.filter.lowStockOnly.label": "Low Stock Only",
    "intent.stockManagement.listStockItems.list.filter.page.label": "Page",
    "intent.stockManagement.listStockItems.list.filter.pageSize.label": "Page Size",
    "organism.stockManagement.editStockItem.title": "Atualizar item de estoque",
    "intent.stockManagement.editStockItem.form.title": "Atualizar item de estoque",
    "intent.stockManagement.editStockItem.form.action.editStockItem": "Atualizar item de estoque",
    "intent.stockManagement.editStockItem.form.field.name.label": "Name",
    "intent.stockManagement.editStockItem.form.field.unit.label": "Unit",
    "intent.stockManagement.editStockItem.form.field.minimumLevel.label": "Minimum Level",
    "intent.stockManagement.editStockItem.form.field.description.label": "Description",
    "organism.stockManagement.removeStockItem.title": "Excluir item de estoque",
    "intent.stockManagement.removeStockItem.form.title": "Excluir item de estoque",
    "intent.stockManagement.removeStockItem.form.action.removeStockItem": "Excluir item de estoque",
    "organism.stockManagement.registerStockAdjustment.title": "Registrar ajuste manual de estoque",
    "intent.stockManagement.registerStockAdjustment.form.title": "Registrar ajuste manual de estoque",
    "intent.stockManagement.registerStockAdjustment.form.action.registerStockAdjustment": "Registrar ajuste manual de estoque",
    "intent.stockManagement.registerStockAdjustment.form.field.stockItemId.label": "Stock Item Id",
    "intent.stockManagement.registerStockAdjustment.form.field.quantity.label": "Quantity",
    "intent.stockManagement.registerStockAdjustment.form.field.direction.label": "Direction",
    "intent.stockManagement.registerStockAdjustment.form.field.reason.label": "Reason",
    "intent.stockManagement.registerStockAdjustment.form.field.notes.label": "Notes",
    "section.stockManagement.sec-createStockItem.title": "Add New Stock Item",
    "organism.stockManagement.addStockItem.title": "Criar item de estoque",
    "intent.stockManagement.addStockItem.form.title": "Criar item de estoque",
    "intent.stockManagement.addStockItem.form.action.addStockItem": "Criar item de estoque",
    "intent.stockManagement.addStockItem.form.field.name.label": "Name",
    "intent.stockManagement.addStockItem.form.field.unit.label": "Unit",
    "intent.stockManagement.addStockItem.form.field.currentBalance.label": "Current Balance",
    "intent.stockManagement.addStockItem.form.field.minimumLevel.label": "Minimum Level",
    "intent.stockManagement.addStockItem.form.field.description.label": "Description",
    "section.stockManagement.sec-stock-overview.title": "Visão geral do estoque",
    "section.stockManagement.sec-stock-master-detail.title": "Controle de insumos",
    "section.stockManagement.sec-add-stock-item.title": "Cadastrar novo insumo"
  },
  "automation": {
    "statePrefix": "ui.stockManagement",
    "stateKeys": [
      "ui.stockManagement.status",
      "ui.stockManagement.action.listStockItems.status",
      "ui.stockManagement.input.listStockItems.nameFilter",
      "ui.stockManagement.input.listStockItems.lowStockOnly",
      "ui.stockManagement.input.listStockItems.page",
      "ui.stockManagement.input.listStockItems.pageSize",
      "ui.stockManagement.data.listStockItems",
      "ui.stockManagement.action.addStockItem.status",
      "ui.stockManagement.input.addStockItem.name",
      "ui.stockManagement.input.addStockItem.unit",
      "ui.stockManagement.input.addStockItem.currentBalance",
      "ui.stockManagement.input.addStockItem.minimumLevel",
      "ui.stockManagement.input.addStockItem.description",
      "ui.stockManagement.output.addStockItem",
      "ui.stockManagement.action.addStockItem.error",
      "ui.stockManagement.action.editStockItem.status",
      "ui.stockManagement.input.editStockItem.stockItemId",
      "ui.stockManagement.input.editStockItem.name",
      "ui.stockManagement.input.editStockItem.unit",
      "ui.stockManagement.input.editStockItem.minimumLevel",
      "ui.stockManagement.input.editStockItem.description",
      "ui.stockManagement.output.editStockItem",
      "ui.stockManagement.action.editStockItem.error",
      "ui.stockManagement.action.removeStockItem.status",
      "ui.stockManagement.input.removeStockItem.stockItemId",
      "ui.stockManagement.output.removeStockItem",
      "ui.stockManagement.action.removeStockItem.error",
      "ui.stockManagement.action.registerStockAdjustment.status",
      "ui.stockManagement.input.registerStockAdjustment.stockItemId",
      "ui.stockManagement.input.registerStockAdjustment.quantity",
      "ui.stockManagement.input.registerStockAdjustment.direction",
      "ui.stockManagement.input.registerStockAdjustment.reason",
      "ui.stockManagement.input.registerStockAdjustment.notes",
      "ui.stockManagement.output.registerStockAdjustment",
      "ui.stockManagement.action.registerStockAdjustment.error"
    ],
    "actionIds": [
      "listStockItems",
      "addStockItem",
      "editStockItem",
      "removeStockItem",
      "registerStockAdjustment",
      "set.listStockItemsNameFilter",
      "set.listStockItemsLowStockOnly",
      "set.listStockItemsPage",
      "set.listStockItemsPageSize",
      "set.addStockItemName",
      "set.addStockItemUnit",
      "set.addStockItemCurrentBalance",
      "set.addStockItemMinimumLevel",
      "set.addStockItemDescription",
      "set.editStockItemStockItemId",
      "set.editStockItemName",
      "set.editStockItemUnit",
      "set.editStockItemMinimumLevel",
      "set.editStockItemDescription",
      "set.removeStockItemStockItemId",
      "set.registerStockAdjustmentStockItemId",
      "set.registerStockAdjustmentQuantity",
      "set.registerStockAdjustmentDirection",
      "set.registerStockAdjustmentReason",
      "set.registerStockAdjustmentNotes"
    ]
  }
};

export const pipeline = [
  {
    "id": "stockManagement__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/stockManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/stockManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/stockManagement.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "lowStockMustBeVisible",
      "managerManualStockAdjustmentAllowed"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
