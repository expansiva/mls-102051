{
  "savedAt": "2026-07-25T23:24:57.903Z",
  "agentName": "agentCbDomainEntity",
  "stepId": 8,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitDomainEntities",
      "arguments": {
        "status": "ok",
        "result": {
          "items": [
            {
              "entityId": "Order",
              "invariants": [
                "status lifecycle (forward-only): registered → confirmed → inPreparation → ready → served; cancelled may occur from registered|confirmed|inPreparation|ready; served and cancelled are terminal",
                "confirmedAt required iff status is confirmed or later (not cancelled from registered); inPreparationAt required iff status is inPreparation or later (non-cancelled path); readyAt required iff status is ready|served; servedAt required iff status is served; cancelledAt and cancellationReason required iff status is cancelled",
                "temporal order on non-cancelled path: registeredAt ≤ confirmedAt ≤ inPreparationAt ≤ readyAt ≤ servedAt; on cancel path: registeredAt ≤ cancelledAt (and ≤ any timestamps already set before cancel)",
                "createdAt ≤ updatedAt; createdAt ≤ registeredAt; updatedAt ≥ each set lifecycle timestamp",
                "orderType=table ⇒ tableNumber required and non-blank; orderType=takeout ⇒ customerName required and non-blank",
                "totalAmount ≥ 0 and totalAmount = sum(items.subtotal) at launch; Order must have at least one OrderItem",
                "OrderItem.quantity > 0; unitPrice ≥ 0; subtotal = quantity × unitPrice and subtotal ≥ 0; menuItemName and unitPrice are frozen at launch",
                "OrderItem status lifecycle: pending → sentToKitchen → inPreparation → ready; cancelled may occur from sentToKitchen|inPreparation|ready; ready and cancelled are terminal for the line",
                "OrderItem timestamps: sentToKitchenAt required iff status is sentToKitchen or later (non-cancelled); startedPreparationAt required iff inPreparation|ready; readyAt required iff ready; cancelledAt and cancellationReason required iff cancelled; pending ≤ sentToKitchenAt ≤ startedPreparationAt ≤ readyAt (or ≤ cancelledAt on cancel path)",
                "Order-level kitchen progression must stay coherent with items: order confirmed before any item sentToKitchen; order inPreparation only when at least one item is inPreparation|ready; order ready only when all non-cancelled items are ready; order served only after ready and all non-cancelled items ready; cancelling order cancels all non-terminal items",
                "OrderPayment is 1:1 with Order; payment.totalAmount = order.totalAmount and ≥ 0",
                "OrderPayment status lifecycle: open → closed | voided; closed and voided are terminal",
                "paidAt required when payment is registered/closed path; closedAt required iff status=closed; voidedAt and voidReason required iff status=voided; createdAt ≤ paidAt ≤ closedAt (closed path) or createdAt ≤ voidedAt (void path)",
                "payment may close only for a served (non-cancelled) order; voided payment cannot transition to closed"
              ]
            }
          ]
        },
        "questions": [],
        "trace": [
          "Derived Order/OrderItem/OrderPayment invariants from field descriptions: lifecycle enums, required-when timestamps and reasons, orderType conditional fields, money/qty consistency, and cross-entity kitchen/payment coherence."
        ]
      }
    },
    "status": "completed",
    "stepId": 20,
    "interaction": null,
    "nextSteps": null
  }
}
