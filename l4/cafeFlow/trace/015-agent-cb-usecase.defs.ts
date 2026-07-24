{
  "savedAt": "2026-07-22T21:20:10.762Z",
  "agentName": "agentCbUsecase",
  "stepId": 15,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitUsecase",
      "arguments": {
        "status": "ok",
        "result": {
          "usecaseId": "updateOrderStatus",
          "ports": [
            "Order",
            "StockConsumption"
          ],
          "functions": [
            {
              "functionName": "updateOrderStatus",
              "inputTypeName": "UpdateOrderStatusInput",
              "outputTypeName": "UpdateOrderStatusOutput",
              "input": [
                {
                  "name": "orderId",
                  "type": "string",
                  "required": true,
                  "ofEntity": "Order",
                  "fieldRef": "Order.orderId"
                },
                {
                  "name": "status",
                  "type": "string",
                  "required": true,
                  "ofEntity": "Order",
                  "fieldRef": "Order.status"
                },
                {
                  "name": "cancellationReason",
                  "type": "string",
                  "required": false,
                  "ofEntity": "Order",
                  "fieldRef": "Order.cancellationReason"
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
                  "name": "readyAt",
                  "type": "string",
                  "required": false,
                  "ofEntity": "Order"
                },
                {
                  "name": "servedAt",
                  "type": "string",
                  "required": false,
                  "ofEntity": "Order"
                },
                {
                  "name": "cancelledAt",
                  "type": "string",
                  "required": false,
                  "ofEntity": "Order"
                },
                {
                  "name": "cancellationReason",
                  "type": "string",
                  "required": false,
                  "ofEntity": "Order"
                },
                {
                  "name": "updatedAt",
                  "type": "string",
                  "required": true,
                  "ofEntity": "Order"
                }
              ],
              "ports": [
                "Order",
                "StockConsumption"
              ],
              "rulesApplied": [
                "orderEntersKitchenQueueAfterAttendantConfirmation",
                "onlyReadyOrdersCanBeServed",
                "autoStockDeductionOnServe",
                "completedOrdersLeaveKitchenQueue",
                "kitchenStatusProgressesInOrder"
              ],
              "transactional": true,
              "steps": [
                "Resolve updatedAt from ctx.clock.now() (systemDefault); do not accept it from client",
                "Load Order by orderId via Order port; fail if not found",
                "Validate requested status is one of: confirmed | inPreparation | ready | served | cancelled",
                "Apply kitchenStatusProgressesInOrder inline: allow only registered→confirmed, confirmed→inPreparation, inPreparation→ready, ready→served, and any non-terminal→cancelled; reject any other transition with rule id kitchenStatusProgressesInOrder",
                "Apply onlyReadyOrdersCanBeServed inline: if target status is served, current status must be ready; otherwise reject with rule id onlyReadyOrdersCanBeServed",
                "Set status-specific timestamp from ctx.clock.now(): confirmed→confirmedAt, inPreparation→inPreparationAt, ready→readyAt, served→servedAt, cancelled→cancelledAt; set cancellationReason when cancelling (optional)",
                "Apply orderEntersKitchenQueueAfterAttendantConfirmation: on transition to confirmed, order becomes visible in active kitchen queue",
                "Apply completedOrdersLeaveKitchenQueue: on transition to served or cancelled, order leaves active kitchen queue and must not re-enter",
                "When target status is served, apply autoStockDeductionOnServe inside the same transaction: read OrderItems embedded on the Order; collect distinct menuItemIds; resolve MenuItemIngredient rows for those menu items (recipe links); aggregate required quantity per stockItemId as quantityPerPortion * OrderItem.quantity; bulk-load StockItems via ctx.mdm.collection.getMany; for each stockItem reduce currentBalance by the aggregated qty and ctx.mdm.entity.update; for each deduction create a StockConsumption (new id via ctx.idGenerator, orderId, stockItemId, quantity, occurredAt=now, status=posted, createdAt=now) and append via StockConsumption port (audit eventWrite, append-only)",
                "Set order.updatedAt = resolved now; save Order via Order port in the same ctx.data transaction as StockConsumption appends and MDM stock updates",
                "Return orderId, status, confirmedAt, inPreparationAt, readyAt, servedAt, cancelledAt, cancellationReason, updatedAt"
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
                    "name": "readyAt",
                    "type": "string",
                    "required": false,
                    "fieldRef": "Order.readyAt"
                  },
                  {
                    "name": "servedAt",
                    "type": "string",
                    "required": false,
                    "fieldRef": "Order.servedAt"
                  },
                  {
                    "name": "cancelledAt",
                    "type": "string",
                    "required": false,
                    "fieldRef": "Order.cancelledAt"
                  },
                  {
                    "name": "cancellationReason",
                    "type": "string",
                    "required": false,
                    "fieldRef": "Order.cancellationReason"
                  },
                  {
                    "name": "updatedAt",
                    "type": "string",
                    "required": true,
                    "fieldRef": "Order.updatedAt"
                  }
                ]
              }
            }
          ],
          "rulesApplied": [
            "orderEntersKitchenQueueAfterAttendantConfirmation",
            "onlyReadyOrdersCanBeServed",
            "autoStockDeductionOnServe",
            "completedOrdersLeaveKitchenQueue",
            "kitchenStatusProgressesInOrder"
          ],
          "mdmRefs": [
            "StockItem"
          ]
        },
        "questions": [],
        "trace": [
          "updateOrderStatus commandInput on Order",
          "public inputs: orderId, status, cancellationReason",
          "updatedAt from ctx.clock",
          "ports Order+StockConsumption for aggregate+audit event",
          "StockItem via ctx.mdm; rules applied inline"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
