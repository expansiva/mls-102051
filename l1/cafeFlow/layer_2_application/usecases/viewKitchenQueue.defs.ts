/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenQueue.defs.ts" enhancement="_blank"/>

export const viewKitchenQueueUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewKitchenQueue",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewKitchenQueue",
    "ports": [
      "Order",
      "DailyShift",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "viewKitchenQueue",
        "inputTypeName": "ViewKitchenQueueInput",
        "outputTypeName": "ViewKitchenQueueOutput",
        "input": [],
        "output": [
          {
            "name": "orderId",
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
            "name": "confirmedAt",
            "type": "string",
            "required": false,
            "ofEntity": "Order"
          },
          {
            "name": "inPreparationAt",
            "type": "string",
            "required": false,
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
          "DailyShift"
        ],
        "rulesApplied": [
          "orderEntersKitchenQueueAfterAttendantConfirmation",
          "completedOrdersLeaveKitchenQueue",
          "orderItemsArePrepReference",
          "ordersRequireOpenDailyShift",
          "orderRequiresTableOrTakeout"
        ],
        "transactional": false,
        "steps": [
          "Resolve the single open DailyShift (status=open) via DailyShift port; if none is open, return empty list per ordersRequireOpenDailyShift (do not require dailyShiftId from client)",
          "Via Order port, list orders filtered by dailyShiftId of the open shift and status in [confirmed, inPreparation] (orderEntersKitchenQueueAfterAttendantConfirmation; exclude registered; completedOrdersLeaveKitchenQueue excludes ready/served/cancelled)",
          "Sort orders by confirmedAt ascending to prioritize kitchen flow",
          "For each order, project embedded OrderItem collection as prep reference (orderItemId, menuItemName, quantity, observations, status) — orderItemsArePrepReference",
          "Map each order to output shape: orderId, orderType, tableNumber, customerName, notes, status, confirmedAt, inPreparationAt, items (orderRequiresTableOrTakeout is already enforced at order creation; surface tableNumber/customerName as stored)",
          "Return the projected kitchen queue list"
        ],
        "outputShape": {
          "kind": "list",
          "fields": [
            {
              "name": "orderId",
              "type": "string",
              "required": true,
              "fieldRef": "Order.orderId"
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
      }
    ],
    "rulesApplied": [
      "orderEntersKitchenQueueAfterAttendantConfirmation",
      "completedOrdersLeaveKitchenQueue",
      "orderItemsArePrepReference",
      "ordersRequireOpenDailyShift",
      "orderRequiresTableOrTakeout"
    ],
    "mdmRefs": []
  }
} as const;

export default viewKitchenQueueUsecase;

export const pipeline = [
  {
    "id": "viewKitchenQueue__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenQueue.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewKitchenQueue.defs.ts",
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
      "orderEntersKitchenQueueAfterAttendantConfirmation",
      "completedOrdersLeaveKitchenQueue",
      "orderItemsArePrepReference",
      "ordersRequireOpenDailyShift",
      "orderRequiresTableOrTakeout"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
