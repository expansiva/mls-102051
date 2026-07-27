/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.defs.ts" enhancement="_blank"/>

export const createOrderUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createOrder",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createOrder",
    "ports": [
      "Order",
      "DailyShift",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "createOrder",
        "inputTypeName": "CreateOrderInput",
        "outputTypeName": "CreateOrderOutput",
        "input": [
          {
            "name": "orderType",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "fieldRef": "Order.orderType"
          },
          {
            "name": "tableNumber",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "fieldRef": "Order.tableNumber"
          },
          {
            "name": "customerName",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "fieldRef": "Order.customerName"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "Order",
            "fieldRef": "Order.notes"
          },
          {
            "name": "items",
            "type": "array",
            "required": true,
            "item": {
              "fields": [
                {
                  "name": "menuItemId",
                  "type": "string",
                  "required": true,
                  "ofEntity": "OrderItem",
                  "fieldRef": "OrderItem.menuItemId"
                },
                {
                  "name": "quantity",
                  "type": "number",
                  "required": true,
                  "ofEntity": "OrderItem",
                  "fieldRef": "OrderItem.quantity"
                },
                {
                  "name": "observations",
                  "type": "string",
                  "required": false,
                  "ofEntity": "OrderItem",
                  "fieldRef": "OrderItem.observations"
                }
              ]
            }
          }
        ],
        "output": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "dailyShiftId",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "orderType",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "tableNumber",
            "type": "string",
            "required": false,
            "ofEntity": "Order"
          },
          {
            "name": "customerName",
            "type": "string",
            "required": false,
            "ofEntity": "Order"
          },
          {
            "name": "totalAmount",
            "type": "number",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "Order"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "registeredAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "confirmedAt",
            "type": "string",
            "required": true,
            "ofEntity": "Order"
          },
          {
            "name": "items",
            "type": "array",
            "required": true
          }
        ],
        "ports": [
          "Order",
          "DailyShift",
          "StockConsumption"
        ],
        "rulesApplied": [
          "orderRequiresTableOrTakeout",
          "orderEntersKitchenQueueAfterAttendantConfirmation",
          "orderTotalFromPriceAtLaunchTime",
          "ordersRequireOpenDailyShift",
          "orderItemsArePrepReference"
        ],
        "transactional": true,
        "steps": [
          "Resolve the single open DailyShift via DailyShift port (status=open); if none, fail with ordersRequireOpenDailyShift",
          "Validate orderType is table or takeout; when table, require tableNumber (orderRequiresTableOrTakeout)",
          "Require non-empty items[]; collect menuItemIds and bulk-load MenuItem via ctx.mdm.collection.getMany",
          "For each line, capture menuItemName and unitPrice from MenuItem at launch time; compute subtotal=unitPrice*quantity and totalAmount as sum (orderTotalFromPriceAtLaunchTime); items become prep reference (orderItemsArePrepReference)",
          "Generate orderId and each orderItemId via ctx.idGenerator; set registeredAt and confirmedAt via ctx.clock.now()",
          "Inside ctx.data transaction: build Order with status confirmed, embedded OrderItems with status sentToKitchen, dailyShiftId from open shift; save via Order port",
          "Append StockConsumption audit events for each item through StockConsumption port in the same transaction",
          "Return order fields plus items per outputShape (orderEntersKitchenQueueAfterAttendantConfirmation)"
        ],
        "outputShape": {
          "kind": "object",
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
              "required": true,
              "fieldRef": "Order.confirmedAt"
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
                    "name": "menuItemId",
                    "type": "string",
                    "required": true,
                    "fieldRef": "OrderItem.menuItemId"
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
                    "name": "unitPrice",
                    "type": "number",
                    "required": true,
                    "fieldRef": "OrderItem.unitPrice"
                  },
                  {
                    "name": "subtotal",
                    "type": "number",
                    "required": true,
                    "fieldRef": "OrderItem.subtotal"
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
      }
    ],
    "rulesApplied": [
      "orderRequiresTableOrTakeout",
      "orderEntersKitchenQueueAfterAttendantConfirmation",
      "orderTotalFromPriceAtLaunchTime",
      "ordersRequireOpenDailyShift",
      "orderItemsArePrepReference"
    ],
    "mdmRefs": [
      "MenuItem"
    ]
  }
} as const;

export default createOrderUsecase;

export const pipeline = [
  {
    "id": "createOrder__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createOrder.defs.ts",
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
      "orderRequiresTableOrTakeout",
      "orderEntersKitchenQueueAfterAttendantConfirmation",
      "orderTotalFromPriceAtLaunchTime",
      "ordersRequireOpenDailyShift",
      "orderItemsArePrepReference"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
