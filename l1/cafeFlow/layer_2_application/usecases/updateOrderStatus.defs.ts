/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.defs.ts" enhancement="_blank"/>

export const updateOrderStatusUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateOrderStatus",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
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
          "Load Order by input.orderId via Order port (resolveRepository); fail if not found",
          "Validate requested status is one of: confirmed | inPreparation | ready | served | cancelled",
          "Apply kitchenStatusProgressesInOrder inline: allowed forward transitions are registered->confirmed, confirmed->inPreparation, inPreparation->ready; reject any other kitchen progression with validation error including rule id kitchenStatusProgressesInOrder",
          "Apply orderEntersKitchenQueueAfterAttendantConfirmation inline: transition to confirmed only from registered (attendant confirmation); set status=confirmed and confirmedAt=now; order becomes visible in active kitchen queue",
          "Apply onlyReadyOrdersCanBeServed inline: transition to served only when current status is ready; otherwise reject with rule id onlyReadyOrdersCanBeServed",
          "On ready: set status=ready and readyAt=now",
          "On inPreparation: set status=inPreparation and inPreparationAt=now",
          "On cancelled: set status=cancelled, cancelledAt=now, optional cancellationReason from input; order leaves active kitchen queue (completedOrdersLeaveKitchenQueue)",
          "On served: set status=served and servedAt=now; apply completedOrdersLeaveKitchenQueue (order leaves active kitchen queue and must not return)",
          "Apply autoStockDeductionOnServe when transitioning to served: read embedded OrderItems from the Order aggregate; collect distinct menuItemIds; load MenuItemIngredient rows linked to those menu items (recipe quantities); aggregate required qty per stockItemId as quantityPerPortion * OrderItem.quantity; bulk-read StockItems via ctx.mdm.collection.getMany({ mdmIds }); for each stock item deduct currentBalance by consumed qty and ctx.mdm.entity.update; for each consumption build StockConsumption { stockConsumptionId: ctx.idGenerator.next(), orderId, stockItemId, quantity, occurredAt: now, status: 'posted', createdAt: now } and append via StockConsumption port inside the same transaction (eventWrites audit, never update/delete)",
          "Set order.updatedAt = now and save Order via Order port inside ctx.data transaction wrapper together with StockConsumption appends and MDM stock updates",
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
  }
} as const;

export default updateOrderStatusUsecase;

export const pipeline = [
  {
    "id": "updateOrderStatus__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateOrderStatus.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockConsumptionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts",
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
      "onlyReadyOrdersCanBeServed",
      "autoStockDeductionOnServe",
      "completedOrdersLeaveKitchenQueue",
      "kitchenStatusProgressesInOrder"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
