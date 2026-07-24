/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/menuManagement.defs.ts" enhancement="_blank"/>

export const menuManagementController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "menuManagement",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "menuManagement",
    "controllerName": "MenuManagementController",
    "ownerKind": "workspace",
    "workspaceId": "menuManagement",
    "actors": [
      "gerente"
    ],
    "allowedScopes": [
      "cafeFlow:gerente"
    ],
    "handlers": [
      {
        "handlerName": "menuManagementListMenuItemsHandler",
        "command": "listMenuItems",
        "bffId": "listMenuItems",
        "route": "cafeFlow.menuManagement.listMenuItems",
        "kind": "query",
        "usecaseRef": "browseMenuItems",
        "usecaseRefs": [
          "browseMenuItems"
        ],
        "inputTypeName": "BrowseMenuItemsInput",
        "inputContract": [
          {
            "inputId": "status",
            "fieldRef": "MenuItem.status",
            "required": false,
            "source": "userInput",
            "description": "Filtro opcional pelo status do item (active ou paused)"
          },
          {
            "inputId": "menuCategoryId",
            "fieldRef": "MenuItem.menuCategoryId",
            "required": false,
            "source": "userInput",
            "description": "Filtro opcional pela categoria do item"
          },
          {
            "inputId": "name",
            "fieldRef": "MenuItem.name",
            "required": false,
            "source": "userInput",
            "description": "Filtro opcional por trecho do nome do item"
          },
          {
            "inputId": "page",
            "fieldRef": "",
            "type": "number",
            "required": false,
            "source": "userInput",
            "description": "Número da página para paginação opcional"
          },
          {
            "inputId": "pageSize",
            "fieldRef": "",
            "type": "number",
            "required": false,
            "source": "userInput",
            "description": "Quantidade de itens por página"
          }
        ],
        "projection": {
          "kind": "paginated",
          "arrayFieldName": "menuItems",
          "itemFields": [
            {
              "name": "menuItemId",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "menuItemId"
              ],
              "fromItems": false
            },
            {
              "name": "menuCategoryId",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "menuCategoryId"
              ],
              "fromItems": false
            },
            {
              "name": "categoryName",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "categoryName"
              ],
              "fromItems": false
            },
            {
              "name": "name",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "name"
              ],
              "fromItems": false
            },
            {
              "name": "description",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "description"
              ],
              "fromItems": false
            },
            {
              "name": "price",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "price"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "pausedAt",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "pausedAt"
              ],
              "fromItems": false
            },
            {
              "name": "pauseReason",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "pauseReason"
              ],
              "fromItems": false
            },
            {
              "name": "imageUrl",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "imageUrl"
              ],
              "fromItems": false
            },
            {
              "name": "displayOrder",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "displayOrder"
              ],
              "fromItems": false
            },
            {
              "name": "requiresStockLink",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "requiresStockLink"
              ],
              "fromItems": false
            },
            {
              "name": "createdAt",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "createdAt"
              ],
              "fromItems": false
            },
            {
              "name": "updatedAt",
              "operationId": "browseMenuItems",
              "path": [
                "menuItems",
                "$items",
                "updatedAt"
              ],
              "fromItems": false
            }
          ],
          "topFields": [
            {
              "name": "total",
              "operationId": "browseMenuItems",
              "path": [
                "total"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "menuManagementCreateMenuItemCmdHandler",
        "command": "createMenuItemCmd",
        "bffId": "createMenuItemCmd",
        "route": "cafeFlow.menuManagement.createMenuItemCmd",
        "kind": "command",
        "usecaseRef": "createMenuItem",
        "usecaseRefs": [
          "createMenuItem"
        ],
        "inputTypeName": "CreateMenuItemInput",
        "inputContract": [
          {
            "inputId": "menuCategoryId",
            "fieldRef": "MenuItem.menuCategoryId",
            "required": true,
            "source": "userInput",
            "description": "Categoria à qual o novo item do cardápio pertence"
          },
          {
            "inputId": "name",
            "fieldRef": "MenuItem.name",
            "required": true,
            "source": "userInput",
            "description": "Nome do item exibido no cardápio e no PDV"
          },
          {
            "inputId": "description",
            "fieldRef": "MenuItem.description",
            "required": false,
            "source": "userInput",
            "description": "Descrição curta opcional do item para o cliente"
          },
          {
            "inputId": "price",
            "fieldRef": "MenuItem.price",
            "required": true,
            "source": "userInput",
            "description": "Preço de venda atual do item no PDV"
          },
          {
            "inputId": "status",
            "fieldRef": "MenuItem.status",
            "required": false,
            "source": "userInput",
            "description": "Disponibilidade inicial do item (active ou paused); se omitido, assume active"
          },
          {
            "inputId": "imageUrl",
            "fieldRef": "MenuItem.imageUrl",
            "required": false,
            "source": "userInput",
            "description": "URL opcional da imagem do item no cardápio digital e no PDV"
          },
          {
            "inputId": "displayOrder",
            "fieldRef": "MenuItem.displayOrder",
            "required": false,
            "source": "userInput",
            "description": "Ordem de exibição opcional do item dentro da categoria"
          },
          {
            "inputId": "requiresStockLink",
            "fieldRef": "MenuItem.requiresStockLink",
            "required": true,
            "source": "userInput",
            "description": "Indica se o item exige vínculo com ingredientes para baixa automática de estoque"
          },
          {
            "inputId": "menuItemId",
            "fieldRef": "MenuItem.menuItemId",
            "required": true,
            "source": "systemDefault",
            "description": "Identificador único gerado automaticamente para o novo item"
          },
          {
            "inputId": "createdAt",
            "fieldRef": "MenuItem.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora de criação preenchidas pelo sistema"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "MenuItem.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora da última atualização preenchidas pelo sistema na criação"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "menuItemId",
              "operationId": "createMenuItem",
              "path": [
                "menuItemId"
              ],
              "fromItems": false
            },
            {
              "name": "menuCategoryId",
              "operationId": "createMenuItem",
              "path": [
                "menuCategoryId"
              ],
              "fromItems": false
            },
            {
              "name": "name",
              "operationId": "createMenuItem",
              "path": [
                "name"
              ],
              "fromItems": false
            },
            {
              "name": "description",
              "operationId": "createMenuItem",
              "path": [
                "description"
              ],
              "fromItems": false
            },
            {
              "name": "price",
              "operationId": "createMenuItem",
              "path": [
                "price"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "createMenuItem",
              "path": [
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "imageUrl",
              "operationId": "createMenuItem",
              "path": [
                "imageUrl"
              ],
              "fromItems": false
            },
            {
              "name": "displayOrder",
              "operationId": "createMenuItem",
              "path": [
                "displayOrder"
              ],
              "fromItems": false
            },
            {
              "name": "requiresStockLink",
              "operationId": "createMenuItem",
              "path": [
                "requiresStockLink"
              ],
              "fromItems": false
            },
            {
              "name": "createdAt",
              "operationId": "createMenuItem",
              "path": [
                "createdAt"
              ],
              "fromItems": false
            },
            {
              "name": "updatedAt",
              "operationId": "createMenuItem",
              "path": [
                "updatedAt"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "menuManagementUpdateMenuItemCmdHandler",
        "command": "updateMenuItemCmd",
        "bffId": "updateMenuItemCmd",
        "route": "cafeFlow.menuManagement.updateMenuItemCmd",
        "kind": "command",
        "usecaseRef": "updateMenuItem",
        "usecaseRefs": [
          "updateMenuItem"
        ],
        "inputTypeName": "UpdateMenuItemInput",
        "inputContract": [
          {
            "inputId": "menuItemId",
            "fieldRef": "MenuItem.menuItemId",
            "required": true,
            "source": "routeParam",
            "description": "Identificador do item do cardápio a ser atualizado"
          },
          {
            "inputId": "menuCategoryId",
            "fieldRef": "MenuItem.menuCategoryId",
            "required": true,
            "source": "userInput",
            "description": "Categoria à qual o item passa a pertencer"
          },
          {
            "inputId": "name",
            "fieldRef": "MenuItem.name",
            "required": true,
            "source": "userInput",
            "description": "Nome do item exibido no cardápio e no PDV"
          },
          {
            "inputId": "description",
            "fieldRef": "MenuItem.description",
            "required": false,
            "source": "userInput",
            "description": "Descrição curta do item para o cliente"
          },
          {
            "inputId": "price",
            "fieldRef": "MenuItem.price",
            "required": true,
            "source": "userInput",
            "description": "Preço de venda atual do item no PDV"
          },
          {
            "inputId": "status",
            "fieldRef": "MenuItem.status",
            "required": true,
            "source": "userInput",
            "description": "Disponibilidade do item: active ou paused"
          },
          {
            "inputId": "pauseReason",
            "fieldRef": "MenuItem.pauseReason",
            "required": false,
            "source": "userInput",
            "description": "Motivo registrado ao pausar o item"
          },
          {
            "inputId": "imageUrl",
            "fieldRef": "MenuItem.imageUrl",
            "required": false,
            "source": "userInput",
            "description": "URL da imagem do item no cardápio digital e no PDV"
          },
          {
            "inputId": "displayOrder",
            "fieldRef": "MenuItem.displayOrder",
            "required": false,
            "source": "userInput",
            "description": "Ordem de exibição do item dentro da categoria"
          },
          {
            "inputId": "requiresStockLink",
            "fieldRef": "MenuItem.requiresStockLink",
            "required": true,
            "source": "userInput",
            "description": "Indica se o item exige vínculo com ingredientes para baixa automática"
          },
          {
            "inputId": "pausedAt",
            "fieldRef": "MenuItem.pausedAt",
            "required": false,
            "source": "systemDefault",
            "description": "Data/hora em que o item foi pausado, quando o status muda para paused"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "MenuItem.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora da gravação da atualização"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "menuItemId",
              "operationId": "updateMenuItem",
              "path": [
                "menuItemId"
              ],
              "fromItems": false
            },
            {
              "name": "menuCategoryId",
              "operationId": "updateMenuItem",
              "path": [
                "menuCategoryId"
              ],
              "fromItems": false
            },
            {
              "name": "name",
              "operationId": "updateMenuItem",
              "path": [
                "name"
              ],
              "fromItems": false
            },
            {
              "name": "description",
              "operationId": "updateMenuItem",
              "path": [
                "description"
              ],
              "fromItems": false
            },
            {
              "name": "price",
              "operationId": "updateMenuItem",
              "path": [
                "price"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "updateMenuItem",
              "path": [
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "pausedAt",
              "operationId": "updateMenuItem",
              "path": [
                "pausedAt"
              ],
              "fromItems": false
            },
            {
              "name": "pauseReason",
              "operationId": "updateMenuItem",
              "path": [
                "pauseReason"
              ],
              "fromItems": false
            },
            {
              "name": "imageUrl",
              "operationId": "updateMenuItem",
              "path": [
                "imageUrl"
              ],
              "fromItems": false
            },
            {
              "name": "displayOrder",
              "operationId": "updateMenuItem",
              "path": [
                "displayOrder"
              ],
              "fromItems": false
            },
            {
              "name": "requiresStockLink",
              "operationId": "updateMenuItem",
              "path": [
                "requiresStockLink"
              ],
              "fromItems": false
            },
            {
              "name": "updatedAt",
              "operationId": "updateMenuItem",
              "path": [
                "updatedAt"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      }
    ],
    "routes": [
      {
        "key": "cafeFlow.menuManagement.listMenuItems",
        "handlerName": "menuManagementListMenuItemsHandler"
      },
      {
        "key": "cafeFlow.menuManagement.createMenuItemCmd",
        "handlerName": "menuManagementCreateMenuItemCmdHandler"
      },
      {
        "key": "cafeFlow.menuManagement.updateMenuItemCmd",
        "handlerName": "menuManagementUpdateMenuItemCmdHandler"
      }
    ]
  }
} as const;

export default menuManagementController;

export const pipeline = [
  {
    "id": "menuManagement__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/menuManagement.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/menuManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.d.ts",
      "_102051_/l4/cafeFlow/contracts/menuManagement.listMenuItems.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/createMenuItem.d.ts",
      "_102051_/l4/cafeFlow/contracts/menuManagement.createMenuItemCmd.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/updateMenuItem.d.ts",
      "_102051_/l4/cafeFlow/contracts/menuManagement.updateMenuItemCmd.defs.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/httpController.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
