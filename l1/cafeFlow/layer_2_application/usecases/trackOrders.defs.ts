/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/trackOrders.defs.ts" enhancement="_blank"/>

export const trackOrdersUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "trackOrders",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "trackOrders",
    "ports": [
      "Order",
      "DailyShift",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "trackOrders",
        "inputTypeName": "TrackOrdersInput",
        "outputTypeName": "TrackOrdersOutput",
        "input": [
          {
            "name": "status",
            "type": "string",
            "required": false,
            "description": "Filtro opcional por status do pedido (ex.: ready para localizar o que já pode ser servido)",
            "fieldRef": "Order.status"
          },
          {
            "name": "orderType",
            "type": "string",
            "required": false,
            "description": "Filtro opcional por origem do pedido: mesa (table) ou takeout",
            "fieldRef": "Order.orderType"
          },
          {
            "name": "tableNumber",
            "type": "string",
            "required": false,
            "description": "Filtro opcional pelo número ou identificador da mesa",
            "fieldRef": "Order.tableNumber"
          },
          {
            "name": "page",
            "type": "number",
            "required": false,
            "description": "Número da página para paginação da lista de pedidos"
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": false,
            "description": "Quantidade de pedidos por página"
          }
        ],
        "output": [
          {
            "name": "orders",
            "type": "array",
            "required": true
          },
          {
            "name": "total",
            "type": "number",
            "required": true
          }
        ],
        "ports": [
          "Order",
          "DailyShift"
        ],
        "rulesApplied": [
          "ordersRequireOpenDailyShift",
          "orderRequiresTableOrTakeout",
          "onlyReadyOrdersCanBeServed",
          "completedOrdersLeaveKitchenQueue"
        ],
        "transactional": false,
        "steps": [
          "Resolve the active lifecycle DailyShift via DailyShift port: list/find where status equals 'open'; take its dailyShiftId. If none is open, apply ordersRequireOpenDailyShift and return empty orders with total 0 (or the documented validation error).",
          "Load Orders through the Order port filtered by dailyShiftId equal to the open shift id.",
          "Apply completedOrdersLeaveKitchenQueue inline: exclude orders whose status is 'served' or 'cancelled' from the default open-orders list.",
          "Apply optional user filters when provided: status (Order.status), orderType (Order.orderType), tableNumber (Order.tableNumber).",
          "Sort remaining orders by Order.registeredAt ascending.",
          "Apply optional pagination (page, pageSize) and compute total as the count of orders matching filters before page slice.",
          "Map each Order aggregate to the output shape: order fields plus embedded OrderItem collection as items (orderItemId, menuItemName, quantity, observations, status).",
          "Return { orders, total }."
        ],
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
        }
      }
    ],
    "rulesApplied": [
      "ordersRequireOpenDailyShift",
      "orderRequiresTableOrTakeout",
      "onlyReadyOrdersCanBeServed",
      "completedOrdersLeaveKitchenQueue"
    ],
    "mdmRefs": []
  }
} as const;

export default trackOrdersUsecase;

export const pipeline = [
  {
    "id": "trackOrders__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/trackOrders.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/trackOrders.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockConsumption.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "ordersRequireOpenDailyShift",
      "orderRequiresTableOrTakeout",
      "onlyReadyOrdersCanBeServed",
      "completedOrdersLeaveKitchenQueue"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
