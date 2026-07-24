/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/kitchenWorkspace.defs.ts" enhancement="_blank"/>

export const kitchenWorkspaceController = {
  "schemaVersion": "2026-06-26",
  "artifactType": "httpController",
  "artifactId": "kitchenWorkspace",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbHttpController",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "pageId": "kitchenWorkspace",
    "controllerName": "KitchenWorkspaceController",
    "ownerKind": "workspace",
    "workspaceId": "kitchenWorkspace",
    "actors": [
      "cozinheiro",
      "atendente"
    ],
    "allowedScopes": [
      "cafeFlow:cozinheiro",
      "cafeFlow:atendente"
    ],
    "handlers": [
      {
        "handlerName": "kitchenWorkspaceFetchKitchenQueueHandler",
        "command": "fetchKitchenQueue",
        "bffId": "fetchKitchenQueue",
        "route": "cafeFlow.kitchenWorkspace.fetchKitchenQueue",
        "kind": "query",
        "usecaseRef": "viewKitchenQueue",
        "usecaseRefs": [
          "viewKitchenQueue"
        ],
        "inputTypeName": "ViewKitchenQueueInput",
        "inputContract": [
          {
            "inputId": "dailyShiftId",
            "fieldRef": "Order.dailyShiftId",
            "required": true,
            "source": "activeLifecycleInstance",
            "description": "Turno diário aberto ao qual a fila da cozinha está vinculada"
          }
        ],
        "projection": {
          "kind": "list",
          "arrayFieldName": null,
          "itemFields": [
            {
              "name": "orderId",
              "operationId": "viewKitchenQueue",
              "path": [
                "orderId"
              ],
              "fromItems": true
            },
            {
              "name": "orderType",
              "operationId": "viewKitchenQueue",
              "path": [
                "orderType"
              ],
              "fromItems": true
            },
            {
              "name": "tableNumber",
              "operationId": "viewKitchenQueue",
              "path": [
                "tableNumber"
              ],
              "fromItems": true
            },
            {
              "name": "customerName",
              "operationId": "viewKitchenQueue",
              "path": [
                "customerName"
              ],
              "fromItems": true
            },
            {
              "name": "notes",
              "operationId": "viewKitchenQueue",
              "path": [
                "notes"
              ],
              "fromItems": true
            },
            {
              "name": "status",
              "operationId": "viewKitchenQueue",
              "path": [
                "status"
              ],
              "fromItems": true
            },
            {
              "name": "confirmedAt",
              "operationId": "viewKitchenQueue",
              "path": [
                "confirmedAt"
              ],
              "fromItems": true
            },
            {
              "name": "inPreparationAt",
              "operationId": "viewKitchenQueue",
              "path": [
                "inPreparationAt"
              ],
              "fromItems": true
            },
            {
              "name": "items",
              "operationId": "viewKitchenQueue",
              "path": [
                "items"
              ],
              "fromItems": true
            }
          ],
          "topFields": []
        },
        "optionalUses": []
      },
      {
        "handlerName": "kitchenWorkspaceChangeOrderStatusHandler",
        "command": "changeOrderStatus",
        "bffId": "changeOrderStatus",
        "route": "cafeFlow.kitchenWorkspace.changeOrderStatus",
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
          "topFields": [
            {
              "name": "orderId",
              "operationId": "updateOrderStatus",
              "path": [
                "orderId"
              ],
              "fromItems": false
            },
            {
              "name": "status",
              "operationId": "updateOrderStatus",
              "path": [
                "status"
              ],
              "fromItems": false
            },
            {
              "name": "confirmedAt",
              "operationId": "updateOrderStatus",
              "path": [
                "confirmedAt"
              ],
              "fromItems": false
            },
            {
              "name": "inPreparationAt",
              "operationId": "updateOrderStatus",
              "path": [
                "inPreparationAt"
              ],
              "fromItems": false
            },
            {
              "name": "readyAt",
              "operationId": "updateOrderStatus",
              "path": [
                "readyAt"
              ],
              "fromItems": false
            },
            {
              "name": "servedAt",
              "operationId": "updateOrderStatus",
              "path": [
                "servedAt"
              ],
              "fromItems": false
            },
            {
              "name": "cancelledAt",
              "operationId": "updateOrderStatus",
              "path": [
                "cancelledAt"
              ],
              "fromItems": false
            },
            {
              "name": "cancellationReason",
              "operationId": "updateOrderStatus",
              "path": [
                "cancellationReason"
              ],
              "fromItems": false
            },
            {
              "name": "updatedAt",
              "operationId": "updateOrderStatus",
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
        "key": "cafeFlow.kitchenWorkspace.fetchKitchenQueue",
        "handlerName": "kitchenWorkspaceFetchKitchenQueueHandler"
      },
      {
        "key": "cafeFlow.kitchenWorkspace.changeOrderStatus",
        "handlerName": "kitchenWorkspaceChangeOrderStatusHandler"
      }
    ]
  }
} as const;

export default kitchenWorkspaceController;

export const pipeline = [
  {
    "id": "kitchenWorkspace__httpController",
    "type": "httpController",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/kitchenWorkspace.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/http/controllers/kitchenWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenQueue.d.ts",
      "_102051_/l4/cafeFlow/contracts/kitchenWorkspace.fetchKitchenQueue.defs.ts",
      "_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.d.ts",
      "_102051_/l4/cafeFlow/contracts/kitchenWorkspace.changeOrderStatus.defs.ts"
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
