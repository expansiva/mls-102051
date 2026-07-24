/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/posWorkspace.defs.ts" enhancement="_blank"/>

export const posWorkspaceController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "posWorkspace",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "posWorkspace",
    "controllerName": "PosWorkspaceController",
    "ownerKind": "workspace",
    "workspaceId": "posWorkspace",
    "actors": [
      "atendente",
      "cozinheiro"
    ],
    "allowedScopes": [
      "cafeFlow:atendente",
      "cafeFlow:cozinheiro"
    ],
    "handlers": [
      {
        "handlerName": "posWorkspaceQueryOpenOrdersHandler",
        "command": "queryOpenOrders",
        "bffId": "queryOpenOrders",
        "route": "cafeFlow.posWorkspace.queryOpenOrders",
        "kind": "query",
        "usecaseRef": "trackOrders",
        "usecaseRefs": [
          "trackOrders"
        ],
        "inputTypeName": "TrackOrdersInput",
        "inputContract": [
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
            "fieldRef": "",
            "type": "number",
            "required": false,
            "source": "userInput",
            "description": "Número da página para paginação da lista de pedidos"
          },
          {
            "inputId": "pageSize",
            "fieldRef": "",
            "type": "number",
            "required": false,
            "source": "userInput",
            "description": "Quantidade de pedidos por página"
          }
        ],
        "projection": {
          "kind": "paginated",
          "arrayFieldName": "orders",
          "itemFields": [
            {
              "name": "orderId",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "orderId"
              ],
              "fromItems": false
            },
            {
              "name": "dailyShiftId",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "dailyShiftId"
              ],
              "fromItems": false
            },
            {
              "name": "orderType",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "orderType"
              ],
              "fromItems": false
            },
            {
              "name": "tableNumber",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "tableNumber"
              ],
              "fromItems": false
            },
            {
              "name": "customerName",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "customerName"
              ],
              "fromItems": false
            },
            {
              "name": "totalAmount",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "totalAmount"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "notes",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "notes"
              ],
              "fromItems": false
            },
            {
              "name": "registeredAt",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "registeredAt"
              ],
              "fromItems": false
            },
            {
              "name": "confirmedAt",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "confirmedAt"
              ],
              "fromItems": false
            },
            {
              "name": "inPreparationAt",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "inPreparationAt"
              ],
              "fromItems": false
            },
            {
              "name": "readyAt",
              "operationId": "trackOrders",
              "path": [
                "orders",
                "$items",
                "readyAt"
              ],
              "fromItems": false
            }
          ],
          "topFields": [
            {
              "name": "total",
              "operationId": "trackOrders",
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
        "handlerName": "posWorkspaceQueryMenuItemsHandler",
        "command": "queryMenuItems",
        "bffId": "queryMenuItems",
        "route": "cafeFlow.posWorkspace.queryMenuItems",
        "kind": "query",
        "usecaseRef": "browseMenuForPos",
        "usecaseRefs": [
          "browseMenuForPos"
        ],
        "inputTypeName": "BrowseMenuForPosInput",
        "inputContract": [
          {
            "inputId": "menuCategoryId",
            "fieldRef": "MenuItem.menuCategoryId",
            "required": false,
            "source": "userInput",
            "description": "Filtro opcional pela categoria do cardápio para restringir os itens exibidos no POS"
          }
        ],
        "projection": {
          "kind": "list",
          "arrayFieldName": null,
          "itemFields": [
            {
              "name": "menuItemId",
              "operationId": "browseMenuForPos",
              "path": [
                "menuItemId"
              ],
              "fromItems": true
            },
            {
              "name": "menuCategoryId",
              "operationId": "browseMenuForPos",
              "path": [
                "menuCategoryId"
              ],
              "fromItems": true
            },
            {
              "name": "name",
              "operationId": "browseMenuForPos",
              "path": [
                "name"
              ],
              "fromItems": true
            },
            {
              "name": "description",
              "operationId": "browseMenuForPos",
              "path": [
                "description"
              ],
              "fromItems": true
            },
            {
              "name": "price",
              "operationId": "browseMenuForPos",
              "path": [
                "price"
              ],
              "fromItems": true
            },
            {
              "name": "status",
              "operationId": "browseMenuForPos",
              "path": [
                "status"
              ],
              "fromItems": true
            },
            {
              "name": "imageUrl",
              "operationId": "browseMenuForPos",
              "path": [
                "imageUrl"
              ],
              "fromItems": true
            },
            {
              "name": "displayOrder",
              "operationId": "browseMenuForPos",
              "path": [
                "displayOrder"
              ],
              "fromItems": true
            }
          ],
          "topFields": []
        },
        "optionalUses": []
      },
      {
        "handlerName": "posWorkspaceCmdCreateOrderHandler",
        "command": "cmdCreateOrder",
        "bffId": "cmdCreateOrder",
        "route": "cafeFlow.posWorkspace.cmdCreateOrder",
        "kind": "command",
        "usecaseRef": "createOrder",
        "usecaseRefs": [
          "createOrder"
        ],
        "inputTypeName": "CreateOrderInput",
        "inputContract": [
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
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "orderId",
              "operationId": "createOrder",
              "path": [
                "orderId"
              ],
              "fromItems": false
            },
            {
              "name": "dailyShiftId",
              "operationId": "createOrder",
              "path": [
                "dailyShiftId"
              ],
              "fromItems": false
            },
            {
              "name": "orderType",
              "operationId": "createOrder",
              "path": [
                "orderType"
              ],
              "fromItems": false
            },
            {
              "name": "tableNumber",
              "operationId": "createOrder",
              "path": [
                "tableNumber"
              ],
              "fromItems": false
            },
            {
              "name": "customerName",
              "operationId": "createOrder",
              "path": [
                "customerName"
              ],
              "fromItems": false
            },
            {
              "name": "totalAmount",
              "operationId": "createOrder",
              "path": [
                "totalAmount"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "createOrder",
              "path": [
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "registeredAt",
              "operationId": "createOrder",
              "path": [
                "registeredAt"
              ],
              "fromItems": false
            },
            {
              "name": "confirmedAt",
              "operationId": "createOrder",
              "path": [
                "confirmedAt"
              ],
              "fromItems": false
            },
            {
              "name": "items",
              "operationId": "createOrder",
              "path": [
                "items"
              ],
              "fromItems": false
            }
          ]
        },
        "optionalUses": []
      },
      {
        "handlerName": "posWorkspaceCmdUpdateOrderStatusHandler",
        "command": "cmdUpdateOrderStatus",
        "bffId": "cmdUpdateOrderStatus",
        "route": "cafeFlow.posWorkspace.cmdUpdateOrderStatus",
        "kind": "command",
        "usecaseRef": "updateOrderStatus",
        "usecaseRefs": [
          "updateOrderStatus"
        ],
        "inputTypeName": "UpdateOrderStatusInput",
        "inputContract": [
          {
            "inputId": "orderId",
            "fieldRef": "Order.orderId",
            "required": true,
            "source": "selectedEntity",
            "description": "Identificador do pedido cujo status será atualizado"
          },
          {
            "inputId": "status",
            "fieldRef": "Order.status",
            "required": true,
            "source": "userInput",
            "description": "Novo status do pedido no ciclo (confirmed, inPreparation, ready, served ou cancelled)"
          },
          {
            "inputId": "cancellationReason",
            "fieldRef": "Order.cancellationReason",
            "required": false,
            "source": "userInput",
            "description": "Motivo do cancelamento quando o novo status é cancelled"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "Order.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora da atualização do registro do pedido"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": []
        },
        "optionalUses": []
      },
      {
        "handlerName": "posWorkspaceCmdRecordBasicPaymentHandler",
        "command": "cmdRecordBasicPayment",
        "bffId": "cmdRecordBasicPayment",
        "route": "cafeFlow.posWorkspace.cmdRecordBasicPayment",
        "kind": "command",
        "usecaseRef": "recordBasicPayment",
        "usecaseRefs": [
          "recordBasicPayment"
        ],
        "inputTypeName": "RecordBasicPaymentInput",
        "inputContract": [
          {
            "inputId": "orderId",
            "fieldRef": "OrderPayment.orderId",
            "required": true,
            "source": "selectedEntity",
            "description": "Pedido ao qual o pagamento básico será vinculado"
          },
          {
            "inputId": "totalAmount",
            "fieldRef": "OrderPayment.totalAmount",
            "required": true,
            "source": "userInput",
            "description": "Valor total do pedido no momento do lançamento do pagamento"
          },
          {
            "inputId": "paymentMethod",
            "fieldRef": "OrderPayment.paymentMethod",
            "required": true,
            "source": "userInput",
            "description": "Forma de pagamento básica utilizada (cash, pix, creditCard, debitCard ou mixed)"
          },
          {
            "inputId": "notes",
            "fieldRef": "OrderPayment.notes",
            "required": false,
            "source": "userInput",
            "description": "Observações livres do fechamento básico, sem conciliação avançada"
          },
          {
            "inputId": "orderPaymentId",
            "fieldRef": "OrderPayment.orderPaymentId",
            "required": true,
            "source": "systemDefault",
            "description": "Identificador único gerado para o registro de pagamento"
          },
          {
            "inputId": "status",
            "fieldRef": "OrderPayment.status",
            "required": true,
            "source": "systemDefault",
            "description": "Status inicial do pagamento básico ao ser registrado"
          },
          {
            "inputId": "paidAt",
            "fieldRef": "OrderPayment.paidAt",
            "required": true,
            "source": "systemDefault",
            "description": "Data e hora em que o pagamento básico foi registrado"
          },
          {
            "inputId": "createdAt",
            "fieldRef": "OrderPayment.createdAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp de criação do registro"
          },
          {
            "inputId": "updatedAt",
            "fieldRef": "OrderPayment.updatedAt",
            "required": true,
            "source": "systemDefault",
            "description": "Timestamp da última atualização do registro"
          }
        ],
        "projection": {
          "kind": "object",
          "arrayFieldName": null,
          "itemFields": [],
          "topFields": [
            {
              "name": "orderPaymentId",
              "operationId": "recordBasicPayment",
              "path": [
                "orderPaymentId"
              ],
              "fromItems": false
            },
            {
              "name": "orderId",
              "operationId": "recordBasicPayment",
              "path": [
                "orderId"
              ],
              "fromItems": false
            },
            {
              "name": "totalAmount",
              "operationId": "recordBasicPayment",
              "path": [
                "totalAmount"
              ],
              "fromItems": false
            },
            {
              "name": "paymentMethod",
              "operationId": "recordBasicPayment",
              "path": [
                "paymentMethod"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "recordBasicPayment",
              "path": [
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "paidAt",
              "operationId": "recordBasicPayment",
              "path": [
                "paidAt"
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
        "key": "cafeFlow.posWorkspace.queryOpenOrders",
        "handlerName": "posWorkspaceQueryOpenOrdersHandler"
      },
      {
        "key": "cafeFlow.posWorkspace.queryMenuItems",
        "handlerName": "posWorkspaceQueryMenuItemsHandler"
      },
      {
        "key": "cafeFlow.posWorkspace.cmdCreateOrder",
        "handlerName": "posWorkspaceCmdCreateOrderHandler"
      },
      {
        "key": "cafeFlow.posWorkspace.cmdUpdateOrderStatus",
        "handlerName": "posWorkspaceCmdUpdateOrderStatusHandler"
      },
      {
        "key": "cafeFlow.posWorkspace.cmdRecordBasicPayment",
        "handlerName": "posWorkspaceCmdRecordBasicPaymentHandler"
      }
    ]
  }
} as const;

export default posWorkspaceController;

export const pipeline = [
  {
    "id": "posWorkspace__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/posWorkspace.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/posWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/trackOrders.d.ts",
      "_102051_/l4/cafeFlow/contracts/posWorkspace.queryOpenOrders.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuForPos.d.ts",
      "_102051_/l4/cafeFlow/contracts/posWorkspace.queryMenuItems.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.d.ts",
      "_102051_/l4/cafeFlow/contracts/posWorkspace.cmdCreateOrder.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.d.ts",
      "_102051_/l4/cafeFlow/contracts/posWorkspace.cmdUpdateOrderStatus.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/recordBasicPayment.d.ts",
      "_102051_/l4/cafeFlow/contracts/posWorkspace.cmdRecordBasicPayment.defs.ts"
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
