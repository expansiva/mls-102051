/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/menuManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "menuManagement",
  "pageName": "Gerenciar cardápio",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowMenuManagementBase",
  "routePattern": "/cafeFlow/menuManagement/:menuItemId?",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:browseMenuItems",
    "operation:createMenuItem",
    "operation:updateMenuItem"
  ],
  "operationIds": [
    "browseMenuItems",
    "createMenuItem",
    "updateMenuItem"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "menuManagement",
    "workspaceKind": "entityManagement",
    "actor": "gerente",
    "entity": "MenuItem",
    "owners": [
      {
        "kind": "operation",
        "id": "browseMenuItems",
        "defPath": "_102051_/l4/cafeFlow/operations/browseMenuItems.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createMenuItem",
        "defPath": "_102051_/l4/cafeFlow/operations/createMenuItem.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateMenuItem",
        "defPath": "_102051_/l4/cafeFlow/operations/updateMenuItem.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "browseMenuItems",
          "commandName": "browseMenuItems",
          "steps": [
            "Abrir a listagem de itens do cardápio",
            "Filtrar por categoria e status quando necessário",
            "Revisar nome, preço, categoria, status e ordem de exibição de cada item",
            "Selecionar um item para editar, vincular ingredientes ou alterar disponibilidade"
          ]
        },
        {
          "operationId": "createMenuItem",
          "commandName": "createMenuItem",
          "steps": [
            "O gerente informa nome, categoria, preço e demais dados do item",
            "O sistema valida categoria e preço obrigatórios",
            "O sistema gera o identificador e grava o item com status inicial adequado",
            "O item fica disponível para vínculo de ingredientes e uso no PDV conforme o status"
          ]
        },
        {
          "operationId": "updateMenuItem",
          "commandName": "updateMenuItem",
          "steps": [
            "O gerente abre o item do cardápio já cadastrado",
            "Altera nome, categoria, preço, descrição, imagem, ordem de exibição, vínculo de estoque ou status (ativo/pausado)",
            "Confirma a gravação das alterações"
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/menuManagement.ts",
    "contracts": [
      {
        "commandName": "listMenuItems",
        "routeConst": "listMenuItemsRoute"
      },
      {
        "commandName": "createMenuItemCmd",
        "routeConst": "createMenuItemCmdRoute"
      },
      {
        "commandName": "updateMenuItemCmd",
        "routeConst": "updateMenuItemCmdRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.defs.ts",
    "layoutId": "tabular_classic"
  },
  "states": [
    {
      "stateKey": "ui.menuManagement.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.action.listMenuItems.status",
      "name": "listMenuItemsState",
      "kind": "actionStatus",
      "actionRef": "listMenuItems",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.menuManagement.input.listMenuItems.status",
      "name": "listMenuItemsStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "listMenuItems",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.listMenuItems.menuCategoryId",
      "name": "listMenuItemsMenuCategoryId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "listMenuItems",
        "direction": "input",
        "field": "menuCategoryId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.listMenuItems.name",
      "name": "listMenuItemsName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "listMenuItems",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.listMenuItems.page",
      "name": "listMenuItemsPage",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "listMenuItems",
        "direction": "input",
        "field": "page"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.listMenuItems.pageSize",
      "name": "listMenuItemsPageSize",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "listMenuItems",
        "direction": "input",
        "field": "pageSize"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.data.listMenuItems",
      "name": "listMenuItemsData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "listMenuItems",
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
      "stateKey": "ui.menuManagement.action.createMenuItemCmd.status",
      "name": "createMenuItemCmdState",
      "kind": "actionStatus",
      "actionRef": "createMenuItemCmd",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.menuCategoryId",
      "name": "createMenuItemCmdMenuCategoryId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMenuItemCmd",
        "direction": "input",
        "field": "menuCategoryId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.name",
      "name": "createMenuItemCmdName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMenuItemCmd",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.description",
      "name": "createMenuItemCmdDescription",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMenuItemCmd",
        "direction": "input",
        "field": "description"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.price",
      "name": "createMenuItemCmdPrice",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMenuItemCmd",
        "direction": "input",
        "field": "price"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.status",
      "name": "createMenuItemCmdStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMenuItemCmd",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.imageUrl",
      "name": "createMenuItemCmdImageUrl",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMenuItemCmd",
        "direction": "input",
        "field": "imageUrl"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.displayOrder",
      "name": "createMenuItemCmdDisplayOrder",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMenuItemCmd",
        "direction": "input",
        "field": "displayOrder"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.requiresStockLink",
      "name": "createMenuItemCmdRequiresStockLink",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "createMenuItemCmd",
        "direction": "input",
        "field": "requiresStockLink"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.output.createMenuItemCmd",
      "name": "createMenuItemCmdOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "createMenuItemCmd",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.menuManagement.action.createMenuItemCmd.error",
      "name": "createMenuItemCmdError",
      "kind": "actionError",
      "actionRef": "createMenuItemCmd",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.action.updateMenuItemCmd.status",
      "name": "updateMenuItemCmdState",
      "kind": "actionStatus",
      "actionRef": "updateMenuItemCmd",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.menuItemId",
      "name": "updateMenuItemCmdMenuItemId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "menuItemId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.menuCategoryId",
      "name": "updateMenuItemCmdMenuCategoryId",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "menuCategoryId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.name",
      "name": "updateMenuItemCmdName",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "name"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.description",
      "name": "updateMenuItemCmdDescription",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "description"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.price",
      "name": "updateMenuItemCmdPrice",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "price"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.status",
      "name": "updateMenuItemCmdStatus",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "status"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.pauseReason",
      "name": "updateMenuItemCmdPauseReason",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "pauseReason"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.imageUrl",
      "name": "updateMenuItemCmdImageUrl",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "imageUrl"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.displayOrder",
      "name": "updateMenuItemCmdDisplayOrder",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "displayOrder"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.requiresStockLink",
      "name": "updateMenuItemCmdRequiresStockLink",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "input",
        "field": "requiresStockLink"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.menuManagement.output.updateMenuItemCmd",
      "name": "updateMenuItemCmdOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "updateMenuItemCmd",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.menuManagement.action.updateMenuItemCmd.error",
      "name": "updateMenuItemCmdError",
      "kind": "actionError",
      "actionRef": "updateMenuItemCmd",
      "defaultValue": ""
    }
  ],
  "actions": [
    {
      "actionId": "listMenuItems",
      "kind": "query",
      "commandRef": "listMenuItems",
      "routeKey": "cafeFlow.menuManagement.listMenuItems",
      "purpose": "Listar itens do cardápio",
      "methodName": "loadListMenuItems",
      "handlerName": "handleListMenuItemsClick",
      "inputStateKeys": [
        "ui.menuManagement.input.listMenuItems.status",
        "ui.menuManagement.input.listMenuItems.menuCategoryId",
        "ui.menuManagement.input.listMenuItems.name",
        "ui.menuManagement.input.listMenuItems.page",
        "ui.menuManagement.input.listMenuItems.pageSize"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.menuManagement.data.listMenuItems"
      ],
      "statusStateKey": "ui.menuManagement.action.listMenuItems.status"
    },
    {
      "actionId": "createMenuItemCmd",
      "kind": "command",
      "commandRef": "createMenuItemCmd",
      "routeKey": "cafeFlow.menuManagement.createMenuItemCmd",
      "purpose": "Criar item do cardápio",
      "methodName": "createMenuItemCmd",
      "handlerName": "handleCreateMenuItemCmdClick",
      "inputStateKeys": [
        "ui.menuManagement.input.createMenuItemCmd.menuCategoryId",
        "ui.menuManagement.input.createMenuItemCmd.name",
        "ui.menuManagement.input.createMenuItemCmd.description",
        "ui.menuManagement.input.createMenuItemCmd.price",
        "ui.menuManagement.input.createMenuItemCmd.status",
        "ui.menuManagement.input.createMenuItemCmd.imageUrl",
        "ui.menuManagement.input.createMenuItemCmd.displayOrder",
        "ui.menuManagement.input.createMenuItemCmd.requiresStockLink"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.menuManagement.output.createMenuItemCmd"
      ],
      "statusStateKey": "ui.menuManagement.action.createMenuItemCmd.status",
      "errorStateKey": "ui.menuManagement.action.createMenuItemCmd.error",
      "feedback": {
        "successMessageKey": "action.createMenuItemCmd.success",
        "errorMessageKey": "action.createMenuItemCmd.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.menuManagement.input.createMenuItemCmd.menuCategoryId",
        "ui.menuManagement.input.createMenuItemCmd.name",
        "ui.menuManagement.input.createMenuItemCmd.description",
        "ui.menuManagement.input.createMenuItemCmd.price",
        "ui.menuManagement.input.createMenuItemCmd.status",
        "ui.menuManagement.input.createMenuItemCmd.imageUrl",
        "ui.menuManagement.input.createMenuItemCmd.displayOrder",
        "ui.menuManagement.input.createMenuItemCmd.requiresStockLink"
      ],
      "refreshActionIds": [
        "listMenuItems"
      ]
    },
    {
      "actionId": "updateMenuItemCmd",
      "kind": "command",
      "commandRef": "updateMenuItemCmd",
      "routeKey": "cafeFlow.menuManagement.updateMenuItemCmd",
      "purpose": "Atualizar item do cardápio",
      "methodName": "updateMenuItemCmd",
      "handlerName": "handleUpdateMenuItemCmdClick",
      "inputStateKeys": [
        "ui.menuManagement.input.updateMenuItemCmd.menuItemId",
        "ui.menuManagement.input.updateMenuItemCmd.menuCategoryId",
        "ui.menuManagement.input.updateMenuItemCmd.name",
        "ui.menuManagement.input.updateMenuItemCmd.description",
        "ui.menuManagement.input.updateMenuItemCmd.price",
        "ui.menuManagement.input.updateMenuItemCmd.status",
        "ui.menuManagement.input.updateMenuItemCmd.pauseReason",
        "ui.menuManagement.input.updateMenuItemCmd.imageUrl",
        "ui.menuManagement.input.updateMenuItemCmd.displayOrder",
        "ui.menuManagement.input.updateMenuItemCmd.requiresStockLink"
      ],
      "routeParamInputStateKeys": [
        "ui.menuManagement.input.updateMenuItemCmd.menuItemId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.menuManagement.output.updateMenuItemCmd"
      ],
      "statusStateKey": "ui.menuManagement.action.updateMenuItemCmd.status",
      "errorStateKey": "ui.menuManagement.action.updateMenuItemCmd.error",
      "feedback": {
        "successMessageKey": "action.updateMenuItemCmd.success",
        "errorMessageKey": "action.updateMenuItemCmd.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.menuManagement.input.updateMenuItemCmd.menuCategoryId",
        "ui.menuManagement.input.updateMenuItemCmd.name",
        "ui.menuManagement.input.updateMenuItemCmd.description",
        "ui.menuManagement.input.updateMenuItemCmd.price",
        "ui.menuManagement.input.updateMenuItemCmd.status",
        "ui.menuManagement.input.updateMenuItemCmd.pauseReason",
        "ui.menuManagement.input.updateMenuItemCmd.imageUrl",
        "ui.menuManagement.input.updateMenuItemCmd.displayOrder",
        "ui.menuManagement.input.updateMenuItemCmd.requiresStockLink"
      ],
      "refreshActionIds": [
        "listMenuItems"
      ]
    },
    {
      "actionId": "set.listMenuItemsStatus",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.listMenuItems.status",
      "methodName": "setListMenuItemsStatus",
      "handlerName": "handleListMenuItemsStatusChange"
    },
    {
      "actionId": "set.listMenuItemsMenuCategoryId",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.listMenuItems.menuCategoryId",
      "methodName": "setListMenuItemsMenuCategoryId",
      "handlerName": "handleListMenuItemsMenuCategoryIdChange"
    },
    {
      "actionId": "set.listMenuItemsName",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.listMenuItems.name",
      "methodName": "setListMenuItemsName",
      "handlerName": "handleListMenuItemsNameChange"
    },
    {
      "actionId": "set.listMenuItemsPage",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.listMenuItems.page",
      "methodName": "setListMenuItemsPage",
      "handlerName": "handleListMenuItemsPageChange"
    },
    {
      "actionId": "set.listMenuItemsPageSize",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.listMenuItems.pageSize",
      "methodName": "setListMenuItemsPageSize",
      "handlerName": "handleListMenuItemsPageSizeChange"
    },
    {
      "actionId": "set.createMenuItemCmdMenuCategoryId",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.menuCategoryId",
      "methodName": "setCreateMenuItemCmdMenuCategoryId",
      "handlerName": "handleCreateMenuItemCmdMenuCategoryIdChange"
    },
    {
      "actionId": "set.createMenuItemCmdName",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.name",
      "methodName": "setCreateMenuItemCmdName",
      "handlerName": "handleCreateMenuItemCmdNameChange"
    },
    {
      "actionId": "set.createMenuItemCmdDescription",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.description",
      "methodName": "setCreateMenuItemCmdDescription",
      "handlerName": "handleCreateMenuItemCmdDescriptionChange"
    },
    {
      "actionId": "set.createMenuItemCmdPrice",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.price",
      "methodName": "setCreateMenuItemCmdPrice",
      "handlerName": "handleCreateMenuItemCmdPriceChange"
    },
    {
      "actionId": "set.createMenuItemCmdStatus",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.status",
      "methodName": "setCreateMenuItemCmdStatus",
      "handlerName": "handleCreateMenuItemCmdStatusChange"
    },
    {
      "actionId": "set.createMenuItemCmdImageUrl",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.imageUrl",
      "methodName": "setCreateMenuItemCmdImageUrl",
      "handlerName": "handleCreateMenuItemCmdImageUrlChange"
    },
    {
      "actionId": "set.createMenuItemCmdDisplayOrder",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.displayOrder",
      "methodName": "setCreateMenuItemCmdDisplayOrder",
      "handlerName": "handleCreateMenuItemCmdDisplayOrderChange"
    },
    {
      "actionId": "set.createMenuItemCmdRequiresStockLink",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.createMenuItemCmd.requiresStockLink",
      "methodName": "setCreateMenuItemCmdRequiresStockLink",
      "handlerName": "handleCreateMenuItemCmdRequiresStockLinkChange"
    },
    {
      "actionId": "set.updateMenuItemCmdMenuItemId",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.menuItemId",
      "methodName": "setUpdateMenuItemCmdMenuItemId",
      "handlerName": "handleUpdateMenuItemCmdMenuItemIdChange"
    },
    {
      "actionId": "set.updateMenuItemCmdMenuCategoryId",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.menuCategoryId",
      "methodName": "setUpdateMenuItemCmdMenuCategoryId",
      "handlerName": "handleUpdateMenuItemCmdMenuCategoryIdChange"
    },
    {
      "actionId": "set.updateMenuItemCmdName",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.name",
      "methodName": "setUpdateMenuItemCmdName",
      "handlerName": "handleUpdateMenuItemCmdNameChange"
    },
    {
      "actionId": "set.updateMenuItemCmdDescription",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.description",
      "methodName": "setUpdateMenuItemCmdDescription",
      "handlerName": "handleUpdateMenuItemCmdDescriptionChange"
    },
    {
      "actionId": "set.updateMenuItemCmdPrice",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.price",
      "methodName": "setUpdateMenuItemCmdPrice",
      "handlerName": "handleUpdateMenuItemCmdPriceChange"
    },
    {
      "actionId": "set.updateMenuItemCmdStatus",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.status",
      "methodName": "setUpdateMenuItemCmdStatus",
      "handlerName": "handleUpdateMenuItemCmdStatusChange"
    },
    {
      "actionId": "set.updateMenuItemCmdPauseReason",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.pauseReason",
      "methodName": "setUpdateMenuItemCmdPauseReason",
      "handlerName": "handleUpdateMenuItemCmdPauseReasonChange"
    },
    {
      "actionId": "set.updateMenuItemCmdImageUrl",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.imageUrl",
      "methodName": "setUpdateMenuItemCmdImageUrl",
      "handlerName": "handleUpdateMenuItemCmdImageUrlChange"
    },
    {
      "actionId": "set.updateMenuItemCmdDisplayOrder",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.displayOrder",
      "methodName": "setUpdateMenuItemCmdDisplayOrder",
      "handlerName": "handleUpdateMenuItemCmdDisplayOrderChange"
    },
    {
      "actionId": "set.updateMenuItemCmdRequiresStockLink",
      "kind": "stateSetter",
      "stateKey": "ui.menuManagement.input.updateMenuItemCmd.requiresStockLink",
      "methodName": "setUpdateMenuItemCmdRequiresStockLink",
      "handlerName": "handleUpdateMenuItemCmdRequiresStockLinkChange"
    }
  ],
  "initialLoads": [
    {
      "actionId": "listMenuItems",
      "stateKey": "ui.menuManagement.data.listMenuItems"
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
    "section.menuManagement.menuItemList.title": "Menu Item List",
    "organism.menuManagement.listMenuItems.title": "Listar itens do cardápio",
    "intent.menuManagement.listMenuItems.list.title": "Listar itens do cardápio",
    "intent.menuManagement.listMenuItems.list.empty": "Nenhum registro encontrado",
    "intent.menuManagement.listMenuItems.list.column.menuItems.label": "Menu Items",
    "intent.menuManagement.listMenuItems.list.column.total.label": "Total",
    "intent.menuManagement.listMenuItems.list.filter.status.label": "Status",
    "intent.menuManagement.listMenuItems.list.filter.menuCategoryId.label": "Menu Category Id",
    "intent.menuManagement.listMenuItems.list.filter.name.label": "Name",
    "intent.menuManagement.listMenuItems.list.filter.page.label": "Page",
    "intent.menuManagement.listMenuItems.list.filter.pageSize.label": "Page Size",
    "organism.menuManagement.updateMenuItemCmd.title": "Atualizar item do cardápio",
    "intent.menuManagement.updateMenuItemCmd.form.title": "Atualizar item do cardápio",
    "intent.menuManagement.updateMenuItemCmd.form.action.updateMenuItemCmd": "Atualizar item do cardápio",
    "intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label": "Menu Category Id",
    "intent.menuManagement.updateMenuItemCmd.form.field.name.label": "Name",
    "intent.menuManagement.updateMenuItemCmd.form.field.description.label": "Description",
    "intent.menuManagement.updateMenuItemCmd.form.field.price.label": "Price",
    "intent.menuManagement.updateMenuItemCmd.form.field.status.label": "Status",
    "intent.menuManagement.updateMenuItemCmd.form.field.pauseReason.label": "Pause Reason",
    "intent.menuManagement.updateMenuItemCmd.form.field.imageUrl.label": "Image Url",
    "intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label": "Display Order",
    "intent.menuManagement.updateMenuItemCmd.form.field.requiresStockLink.label": "Requires Stock Link",
    "section.menuManagement.createMenuItemSection.title": "Create Menu Item",
    "organism.menuManagement.createMenuItemCmd.title": "Criar item do cardápio",
    "intent.menuManagement.createMenuItemCmd.form.title": "Criar item do cardápio",
    "intent.menuManagement.createMenuItemCmd.form.action.createMenuItemCmd": "Criar item do cardápio",
    "intent.menuManagement.createMenuItemCmd.form.field.menuCategoryId.label": "Menu Category Id",
    "intent.menuManagement.createMenuItemCmd.form.field.name.label": "Name",
    "intent.menuManagement.createMenuItemCmd.form.field.description.label": "Description",
    "intent.menuManagement.createMenuItemCmd.form.field.price.label": "Price",
    "intent.menuManagement.createMenuItemCmd.form.field.status.label": "Status",
    "intent.menuManagement.createMenuItemCmd.form.field.imageUrl.label": "Image Url",
    "intent.menuManagement.createMenuItemCmd.form.field.displayOrder.label": "Display Order",
    "intent.menuManagement.createMenuItemCmd.form.field.requiresStockLink.label": "Requires Stock Link",
    "section.menuManagement.sec-menu-item-list.title": "Lista de Itens do Cardápio",
    "section.menuManagement.sec-create-menu-item.title": "Criar Novo Item"
  },
  "automation": {
    "statePrefix": "ui.menuManagement",
    "stateKeys": [
      "ui.menuManagement.status",
      "ui.menuManagement.action.listMenuItems.status",
      "ui.menuManagement.input.listMenuItems.status",
      "ui.menuManagement.input.listMenuItems.menuCategoryId",
      "ui.menuManagement.input.listMenuItems.name",
      "ui.menuManagement.input.listMenuItems.page",
      "ui.menuManagement.input.listMenuItems.pageSize",
      "ui.menuManagement.data.listMenuItems",
      "ui.menuManagement.action.createMenuItemCmd.status",
      "ui.menuManagement.input.createMenuItemCmd.menuCategoryId",
      "ui.menuManagement.input.createMenuItemCmd.name",
      "ui.menuManagement.input.createMenuItemCmd.description",
      "ui.menuManagement.input.createMenuItemCmd.price",
      "ui.menuManagement.input.createMenuItemCmd.status",
      "ui.menuManagement.input.createMenuItemCmd.imageUrl",
      "ui.menuManagement.input.createMenuItemCmd.displayOrder",
      "ui.menuManagement.input.createMenuItemCmd.requiresStockLink",
      "ui.menuManagement.output.createMenuItemCmd",
      "ui.menuManagement.action.createMenuItemCmd.error",
      "ui.menuManagement.action.updateMenuItemCmd.status",
      "ui.menuManagement.input.updateMenuItemCmd.menuItemId",
      "ui.menuManagement.input.updateMenuItemCmd.menuCategoryId",
      "ui.menuManagement.input.updateMenuItemCmd.name",
      "ui.menuManagement.input.updateMenuItemCmd.description",
      "ui.menuManagement.input.updateMenuItemCmd.price",
      "ui.menuManagement.input.updateMenuItemCmd.status",
      "ui.menuManagement.input.updateMenuItemCmd.pauseReason",
      "ui.menuManagement.input.updateMenuItemCmd.imageUrl",
      "ui.menuManagement.input.updateMenuItemCmd.displayOrder",
      "ui.menuManagement.input.updateMenuItemCmd.requiresStockLink",
      "ui.menuManagement.output.updateMenuItemCmd",
      "ui.menuManagement.action.updateMenuItemCmd.error"
    ],
    "actionIds": [
      "listMenuItems",
      "createMenuItemCmd",
      "updateMenuItemCmd",
      "set.listMenuItemsStatus",
      "set.listMenuItemsMenuCategoryId",
      "set.listMenuItemsName",
      "set.listMenuItemsPage",
      "set.listMenuItemsPageSize",
      "set.createMenuItemCmdMenuCategoryId",
      "set.createMenuItemCmdName",
      "set.createMenuItemCmdDescription",
      "set.createMenuItemCmdPrice",
      "set.createMenuItemCmdStatus",
      "set.createMenuItemCmdImageUrl",
      "set.createMenuItemCmdDisplayOrder",
      "set.createMenuItemCmdRequiresStockLink",
      "set.updateMenuItemCmdMenuItemId",
      "set.updateMenuItemCmdMenuCategoryId",
      "set.updateMenuItemCmdName",
      "set.updateMenuItemCmdDescription",
      "set.updateMenuItemCmdPrice",
      "set.updateMenuItemCmdStatus",
      "set.updateMenuItemCmdPauseReason",
      "set.updateMenuItemCmdImageUrl",
      "set.updateMenuItemCmdDisplayOrder",
      "set.updateMenuItemCmdRequiresStockLink"
    ]
  }
};

export const pipeline = [
  {
    "id": "menuManagement__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/menuManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/menuManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/menuManagement.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "onlyActiveMenuItemsCanBeOrdered",
      "menuItemNeedsCategoryAndPrice"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
