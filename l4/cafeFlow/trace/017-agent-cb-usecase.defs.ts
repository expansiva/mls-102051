{
  "savedAt": "2026-07-22T21:20:17.610Z",
  "agentName": "agentCbUsecase",
  "stepId": 17,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitUsecase",
      "arguments": {
        "status": "ok",
        "result": {
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
                "Resolve the single open DailyShift via DailyShift port (status === 'open'); this supplies dailyShiftId from activeLifecycleInstance — never accept it as public input",
                "If no open DailyShift exists, apply ordersRequireOpenDailyShift and return an empty kitchen queue (no missing-input error)",
                "Via Order port, list orders where dailyShiftId equals the open shift id and status is in ['confirmed', 'inPreparation'] (orderEntersKitchenQueueAfterAttendantConfirmation: exclude registered; completedOrdersLeaveKitchenQueue: exclude ready, served, cancelled)",
                "Sort the matched orders by confirmedAt ascending to prioritize kitchen flow",
                "For each order, project embedded OrderItems as prep reference (orderItemsArePrepReference): orderItemId, menuItemName, quantity, observations, status",
                "Map each order to the canonical output shape: orderId, orderType, tableNumber, customerName, notes, status, confirmedAt, inPreparationAt, items (orderRequiresTableOrTakeout is reflected by orderType/tableNumber already on the aggregate)",
                "Return the ordered list of kitchen-queue projections"
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
        },
        "questions": [],
        "trace": [
          "viewKitchenQueue: list query over Order+DailyShift ports; dailyShiftId from activeLifecycleInstance; outputShape pinned; rules applied inline; no public inputs; non-transactional read"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
