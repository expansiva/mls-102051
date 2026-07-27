{
  "savedAt": "2026-07-24T20:01:25.904Z",
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
                "Resolve the single open DailyShift (status 'open') via the DailyShift port; do not accept dailyShiftId from the client (activeLifecycleInstance).",
                "If no open DailyShift exists, return an empty list (ordersRequireOpenDailyShift) — kitchen queue has no data without an open shift.",
                "Via the Order port, list orders filtered by dailyShiftId = open shift id and status in ['confirmed', 'inPreparation'] (orderEntersKitchenQueueAfterAttendantConfirmation; completedOrdersLeaveKitchenQueue excludes registered/ready/served/cancelled).",
                "Sort the matching orders by confirmedAt ascending to prioritize kitchen flow.",
                "For each order, project orderId, orderType, tableNumber, customerName, notes, status, confirmedAt, inPreparationAt; ensure orderType is table or takeout (orderRequiresTableOrTakeout).",
                "Include embedded OrderItem collection as items with orderItemId, menuItemName, quantity, observations, status as prep reference (orderItemsArePrepReference).",
                "Return the projected list matching outputShape."
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
          "viewKitchenQueue: list query over Order+DailyShift; dailyShiftId from active open DailyShift; filter confirmed|inPreparation; outputShape verbatim; no public input; non-transactional read"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
