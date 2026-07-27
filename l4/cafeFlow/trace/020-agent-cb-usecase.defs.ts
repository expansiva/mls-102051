{
  "savedAt": "2026-07-25T23:28:54.481Z",
  "agentName": "agentCbUsecase",
  "stepId": 20,
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
        },
        "questions": [],
        "trace": [
          "viewKitchenQueue: list query on Order via Order+DailyShift ports; dailyShiftId from activeLifecycleInstance (open DailyShift); outputShape fields verbatim; no public input; rules applied inline; query non-transactional; no eventWrites on read"
        ]
      }
    },
    "status": "completed",
    "stepId": 7,
    "interaction": null,
    "nextSteps": null
  }
}
