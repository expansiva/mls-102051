/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/stockManagement.defs.ts" enhancement="_blank"/>

export const stockManagementController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "stockManagement",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "stockManagement",
    "controllerName": "StockManagementController",
    "ownerKind": "workspace",
    "workspaceId": "stockManagement",
    "actors": [
      "gerente"
    ],
    "allowedScopes": [
      "cafeFlow:gerente"
    ],
    "handlers": [
      {
        "handlerName": "stockManagementListStockItemsHandler",
        "command": "listStockItems",
        "bffId": "listStockItems",
        "route": "cafeFlow.stockManagement.listStockItems",
        "kind": "query",
        "usecaseRef": "browseStockItems",
        "usecaseRefs": [
          "browseStockItems"
        ],
        "inputTypeName": "BrowseStockItemsInput",
        "inputContract": [
          {
            "inputId": "nameFilter",
            "fieldRef": "StockItem.name",
            "required": false,
            "source": "userInput",
            "description": "Filtro opcional pelo nome do item de estoque"
          },
          {
            "inputId": "lowStockOnly",
            "fieldRef": "",
            "type": "boolean",
            "required": false,
            "source": "userInput",
            "description": "Quando verdadeiro, retorna apenas itens com saldo atual menor ou igual ao nível mínimo"
          },
          {
            "inputId": "page",
            "fieldRef": "",
            "type": "number",
            "required": false,
            "source": "userInput",
            "description": "Número da página para paginação da lista"
          },
          {
            "inputId": "pageSize",
            "fieldRef": "",
            "type": "number",
            "required": false,
            "source": "userInput",
            "description": "Quantidade de itens retornados por página"
          }
        ],
        "projection": {
          "kind": "paginated",
          "arrayFieldName": "stockItems",
          "itemFields": [
            {
              "name": "stockItemId",
              "operationId": "browseStockItems",
              "path": [
                "stockItems",
                "$items",
                "stockItemId"
              ],
              "fromItems": false
            },
            {
              "name": "name",
              "operationId": "browseStockItems",
              "path": [
                "stockItems",
                "$items",
                "name"
              ],
              "fromItems": false
            },
            {
              "name": "unit",
              "operationId": "browseStockItems",
              "path": [
                "stockItems",
                "$items",
                "unit"
              ],
              "fromItems": false
            },
            {
              "name": "currentBalance",
              "operationId": "browseStockItems",
              "path": [
                "stockItems",
                "$items",
                "currentBalance"
              ],
              "fromItems": false
            },
            {
              "name": "minimumLevel",
              "operationId": "browseStockItems",
              "path": [
                "stockItems",
                "$items",
                "minimumLevel"
              ],
              "fromItems": false
            },
            {
              "name": "isLowStock",
              "operationId": "browseStockItems",
              "path": [
                "stockItems",
                "$items",
                "isLowStock"
              ],
              "fromItems": false
            },
            {
              "name": "description",
              "operationId": "browseStockItems",
              "path": [
                "stockItems",
                "$items",
                "description"
              ],
              "fromItems": false
            },
            {
              "name": "updatedAt",
              "operationId": "browseStockItems",
              "path": [
                "stockItems",
                "$items",
                "updatedAt"
              ],
              "fromItems": false
            }
          ],
          "topFields": [
            {
              "name": "total",
              "operationId": "browseStockItems",
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
        "handlerName": "stockManagementAddStockItemHandler",
        "command": "addStockItem",
        "bffId": "addStockItem",
        "route": "cafeFlow.stockManagement.addStockItem",
        "kind": "command",
        "usecaseRef": "createStockItem",
        "usecaseRefs": [
          "createStockItem"
        ],
        "inputTypeName": "CreateStockItemInput",
        "inputContract": [
          {
            "inputId": "name",
            "fieldRef": "StockItem.name",
            "required": true,
            "source": "userInput",
            "description": "Nome do insumo físico a ser controlado no estoque"
          },
          {
            "inputId": "unit",
            "fieldRef": "StockItem.unit",
            "required": true,
            "source": "userInput",
            "description": "Unidade de medida do insumo (kg, liter, portion ou unit)"
          },
          {
            "inputId": "currentBalance",
            "fieldRef": "StockItem.currentBalance",
            "required": true,
            "source": "userInput",
            "description": "Saldo inicial disponível do insumo no momento do cadastro"
          },
          {
            "inputId": "minimumLevel",
            "fieldRef": "StockItem.minimumLevel",
            "required": true,
            "source": "userInput",
            "description": "Nível mínimo para disparo de alerta de estoque baixo"
          },
          {
            "inputId": "description",
            "fieldRef": "StockItem.description",
            "required": false,
            "source": "userInput",
            "description": "Descrição complementar opcional do insumo"
          },
          {
            "inputId": "stockItemId",
            "fieldRef": "StockItem.stockItemId",
            "required": true,
            "source": "systemDefault",
            "description": "Identificador único gerado automaticamente para o novo item de estoque"
          },
          {
            "inputId": "createdAt",
            "fieldRef": "StockItem.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora de criação preenchidas automaticamente pelo sistema"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "StockItem.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora da última atualização preenchidas automaticamente pelo sistema"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "stockItemId",
              "operationId": "createStockItem",
              "path": [
                "stockItemId"
              ],
              "fromItems": false
            },
            {
              "name": "name",
              "operationId": "createStockItem",
              "path": [
                "name"
              ],
              "fromItems": false
            },
            {
              "name": "unit",
              "operationId": "createStockItem",
              "path": [
                "unit"
              ],
              "fromItems": false
            },
            {
              "name": "currentBalance",
              "operationId": "createStockItem",
              "path": [
                "currentBalance"
              ],
              "fromItems": false
            },
            {
              "name": "minimumLevel",
              "operationId": "createStockItem",
              "path": [
                "minimumLevel"
              ],
              "fromItems": false
            },
            {
              "name": "createdAt",
              "operationId": "createStockItem",
              "path": [
                "createdAt"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "stockManagementEditStockItemHandler",
        "command": "editStockItem",
        "bffId": "editStockItem",
        "route": "cafeFlow.stockManagement.editStockItem",
        "kind": "command",
        "usecaseRef": "updateStockItem",
        "usecaseRefs": [
          "updateStockItem"
        ],
        "inputTypeName": "UpdateStockItemInput",
        "inputContract": [
          {
            "inputId": "stockItemId",
            "fieldRef": "StockItem.stockItemId",
            "required": true,
            "source": "routeParam",
            "description": "Identificador do item de estoque a ser atualizado"
          },
          {
            "inputId": "name",
            "fieldRef": "StockItem.name",
            "required": true,
            "source": "userInput",
            "description": "Nome atualizado do insumo físico controlado pela cafeteria"
          },
          {
            "inputId": "unit",
            "fieldRef": "StockItem.unit",
            "required": true,
            "source": "userInput",
            "description": "Unidade de medida utilizada para contabilizar o saldo e as movimentações do insumo"
          },
          {
            "inputId": "minimumLevel",
            "fieldRef": "StockItem.minimumLevel",
            "required": true,
            "source": "userInput",
            "description": "Nível mínimo configurado para disparo do alerta de estoque baixo"
          },
          {
            "inputId": "description",
            "fieldRef": "StockItem.description",
            "required": false,
            "source": "userInput",
            "description": "Descrição complementar do insumo para identificação pela equipe"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "StockItem.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora em que a atualização do cadastro é registrada"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "stockItemId",
              "operationId": "updateStockItem",
              "path": [
                "stockItemId"
              ],
              "fromItems": false
            },
            {
              "name": "name",
              "operationId": "updateStockItem",
              "path": [
                "name"
              ],
              "fromItems": false
            },
            {
              "name": "unit",
              "operationId": "updateStockItem",
              "path": [
                "unit"
              ],
              "fromItems": false
            },
            {
              "name": "currentBalance",
              "operationId": "updateStockItem",
              "path": [
                "currentBalance"
              ],
              "fromItems": false
            },
            {
              "name": "minimumLevel",
              "operationId": "updateStockItem",
              "path": [
                "minimumLevel"
              ],
              "fromItems": false
            },
            {
              "name": "updatedAt",
              "operationId": "updateStockItem",
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
        "handlerName": "stockManagementRemoveStockItemHandler",
        "command": "removeStockItem",
        "bffId": "removeStockItem",
        "route": "cafeFlow.stockManagement.removeStockItem",
        "kind": "command",
        "usecaseRef": "deleteStockItem",
        "usecaseRefs": [
          "deleteStockItem"
        ],
        "inputTypeName": "DeleteStockItemInput",
        "inputContract": [
          {
            "inputId": "stockItemId",
            "fieldRef": "StockItem.stockItemId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador do item de estoque selecionado para exclusão"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "stockItemId",
              "operationId": "deleteStockItem",
              "path": [
                "stockItemId"
              ],
              "fromItems": false
            },
            {
              "name": "name",
              "operationId": "deleteStockItem",
              "path": [
                "name"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "stockManagementRegisterStockAdjustmentHandler",
        "command": "registerStockAdjustment",
        "bffId": "registerStockAdjustment",
        "route": "cafeFlow.stockManagement.registerStockAdjustment",
        "kind": "command",
        "usecaseRef": "createStockAdjustment",
        "usecaseRefs": [
          "createStockAdjustment"
        ],
        "inputTypeName": "CreateStockAdjustmentInput",
        "inputContract": [
          {
            "inputId": "stockItemId",
            "fieldRef": "StockAdjustment.stockItemId",
            "required": true,
            "source": "userInput",
            "description": "Insumo cujo saldo será ajustado manualmente"
          },
          {
            "inputId": "quantity",
            "fieldRef": "StockAdjustment.quantity",
            "required": true,
            "source": "userInput",
            "description": "Quantidade afetada pelo ajuste, na unidade de medida do insumo"
          },
          {
            "inputId": "direction",
            "fieldRef": "StockAdjustment.direction",
            "required": true,
            "source": "userInput",
            "description": "Direção do ajuste sobre o saldo (entrada, saída ou acerto)"
          },
          {
            "inputId": "reason",
            "fieldRef": "StockAdjustment.reason",
            "required": true,
            "source": "userInput",
            "description": "Motivo do ajuste manual (contagem, perda, vencimento, divergência ou outro)"
          },
          {
            "inputId": "notes",
            "fieldRef": "StockAdjustment.notes",
            "required": false,
            "source": "userInput",
            "description": "Observação livre descrevendo a divergência ou o contexto do ajuste"
          },
          {
            "inputId": "managerUserId",
            "fieldRef": "StockAdjustment.managerUserId",
            "required": true,
            "source": "actorSession",
            "description": "Identificador do gerente autenticado que autoriza o ajuste"
          },
          {
            "inputId": "shiftId",
            "fieldRef": "StockAdjustment.shiftId",
            "required": false,
            "source": "activeLifecycleInstance",
            "description": "Turno aberto ao qual o ajuste fica vinculado, quando houver"
          },
          {
            "inputId": "stockAdjustmentId",
            "fieldRef": "StockAdjustment.stockAdjustmentId",
            "required": true,
            "source": "systemDefault",
            "description": "Identificador único gerado para o novo ajuste"
          },
          {
            "inputId": "createdAt",
            "fieldRef": "StockAdjustment.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora em que o ajuste é registrado"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "stockAdjustmentId",
              "operationId": "createStockAdjustment",
              "path": [
                "stockAdjustmentId"
              ],
              "fromItems": false
            },
            {
              "name": "stockItemId",
              "operationId": "createStockAdjustment",
              "path": [
                "stockItemId"
              ],
              "fromItems": false
            },
            {
              "name": "quantity",
              "operationId": "createStockAdjustment",
              "path": [
                "quantity"
              ],
              "fromItems": false
            },
            {
              "name": "direction",
              "operationId": "createStockAdjustment",
              "path": [
                "direction"
              ],
              "fromItems": false
            },
            {
              "name": "reason",
              "operationId": "createStockAdjustment",
              "path": [
                "reason"
              ],
              "fromItems": false
            },
            {
              "name": "resultingBalance",
              "operationId": "createStockAdjustment",
              "path": [
                "resultingBalance"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "createStockAdjustment",
              "path": [
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "createdAt",
              "operationId": "createStockAdjustment",
              "path": [
                "createdAt"
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
        "key": "cafeFlow.stockManagement.listStockItems",
        "handlerName": "stockManagementListStockItemsHandler"
      },
      {
        "key": "cafeFlow.stockManagement.addStockItem",
        "handlerName": "stockManagementAddStockItemHandler"
      },
      {
        "key": "cafeFlow.stockManagement.editStockItem",
        "handlerName": "stockManagementEditStockItemHandler"
      },
      {
        "key": "cafeFlow.stockManagement.removeStockItem",
        "handlerName": "stockManagementRemoveStockItemHandler"
      },
      {
        "key": "cafeFlow.stockManagement.registerStockAdjustment",
        "handlerName": "stockManagementRegisterStockAdjustmentHandler"
      }
    ]
  }
} as const;

export default stockManagementController;

export const pipeline = [
  {
    "id": "stockManagement__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/stockManagement.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/stockManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/browseStockItems.d.ts",
      "_102051_/l4/cafeFlow/contracts/stockManagement.listStockItems.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/createStockItem.d.ts",
      "_102051_/l4/cafeFlow/contracts/stockManagement.addStockItem.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/updateStockItem.d.ts",
      "_102051_/l4/cafeFlow/contracts/stockManagement.editStockItem.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/deleteStockItem.d.ts",
      "_102051_/l4/cafeFlow/contracts/stockManagement.removeStockItem.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/createStockAdjustment.d.ts",
      "_102051_/l4/cafeFlow/contracts/stockManagement.registerStockAdjustment.defs.ts"
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
