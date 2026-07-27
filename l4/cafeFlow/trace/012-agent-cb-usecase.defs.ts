{
  "savedAt": "2026-07-24T20:01:47.304Z",
  "agentName": "agentCbUsecase",
  "stepId": 12,
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
                "Resolve updatedAt from ctx.clock.now() (systemDefault); do not accept it from the client",
                "Validate input status is one of: confirmed | inPreparation | ready | served | cancelled; if cancelled, accept optional cancellationReason",
                "Load Order by orderId via Order port; fail if not found",
                "Apply kitchenStatusProgressesInOrder inline: allow only registered→confirmed, confirmed→inPreparation, inPreparation→ready, ready→served, and any non-terminal→cancelled; reject any other transition with rule id kitchenStatusProgressesInOrder",
                "Apply onlyReadyOrdersCanBeServed inline: if target status is served and current status is not ready, reject with rule id onlyReadyOrdersCanBeServed",
                "Apply orderEntersKitchenQueueAfterAttendantConfirmation: on transition to confirmed, set status=confirmed and confirmedAt=now (order becomes visible in active kitchen queue)",
                "On transition to inPreparation set inPreparationAt=now; on ready set readyAt=now",
                "On transition to served set servedAt=now; apply completedOrdersLeaveKitchenQueue so the order leaves the active kitchen queue and does not return",
                "On transition to cancelled set cancelledAt=now and cancellationReason when provided; apply completedOrdersLeaveKitchenQueue so it leaves the active kitchen queue",
                "Set order.updatedAt to the resolved now timestamp",
                "When transitioning to served, apply autoStockDeductionOnServe inside the same transaction: read embedded OrderItems from the Order aggregate; collect distinct menuItemIds; resolve MenuItemIngredient rows for those menu items (recipe links); aggregate required qty = quantityPerPortion * OrderItem.quantity per stockItemId",
                "Bulk-read StockItem MDM via ctx.mdm.collection.getMany({ mdmIds: stockItemIds }) (StockItem is mdmRef — never a port); for each aggregated consumption, reduce StockItem.currentBalance by the consumed qty and ctx.mdm.entity.update each StockItem",
                "For each stock deduction build a StockConsumption audit event (new id from ctx.idGenerator, orderId, stockItemId, quantity, occurredAt=now, status='posted', createdAt=now) and append-only save via StockConsumption port — never update/delete",
                "Save the mutated Order via Order port in the same ctx.data transaction wrapper as StockConsumption appends and after MDM balance updates",
                "Return outputShape fields: orderId, status, confirmedAt, inPreparationAt, readyAt, servedAt, cancelledAt, cancellationReason, updatedAt"
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
          "updateOrderStatus: commandInput on Order; public inputs orderId+status+optional cancellationReason; updatedAt from ctx.clock",
          "ports=Order+StockConsumption (eventWrite audit); StockItem via ctx.mdm; OrderItems embedded on Order",
          "inline rules: kitchen progression, only ready→served, confirm enters queue, serve/cancel leave queue, auto stock deduction+StockConsumption on serve"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
