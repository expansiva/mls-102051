/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/recordBasicPayment.defs.ts" enhancement="_blank"/>

export const recordBasicPaymentUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "recordBasicPayment",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "recordBasicPayment",
    "ports": [
      "Order",
      "StockConsumption"
    ],
    "functions": [
      {
        "functionName": "recordBasicPayment",
        "inputTypeName": "RecordBasicPaymentInput",
        "outputTypeName": "RecordBasicPaymentOutput",
        "input": [
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "Order",
            "fieldRef": "OrderPayment.orderId"
          },
          {
            "name": "totalAmount",
            "type": "number",
            "required": true,
            "fieldRef": "OrderPayment.totalAmount"
          },
          {
            "name": "paymentMethod",
            "type": "string",
            "required": true,
            "fieldRef": "OrderPayment.paymentMethod"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "fieldRef": "OrderPayment.notes"
          }
        ],
        "output": [
          {
            "name": "orderPaymentId",
            "type": "string",
            "required": true,
            "ofEntity": "OrderPayment"
          },
          {
            "name": "orderId",
            "type": "string",
            "required": true,
            "ofEntity": "OrderPayment"
          },
          {
            "name": "totalAmount",
            "type": "number",
            "required": true,
            "ofEntity": "OrderPayment"
          },
          {
            "name": "paymentMethod",
            "type": "string",
            "required": true,
            "ofEntity": "OrderPayment"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "OrderPayment"
          },
          {
            "name": "paidAt",
            "type": "string",
            "required": false,
            "ofEntity": "OrderPayment"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "OrderPayment"
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "OrderPayment"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "OrderPayment"
          }
        ],
        "ports": [
          "Order",
          "StockConsumption"
        ],
        "rulesApplied": [
          "shiftClosingRecordsBasicTotalsAndPayments"
        ],
        "transactional": true,
        "steps": [
          "Resolve orderId from selectedEntity input; generate orderPaymentId via ctx.idGenerator and paidAt/createdAt/updatedAt via ctx.clock; set status to 'open' (systemDefault)",
          "Validate paymentMethod is one of cash|pix|creditCard|debitCard|mixed; validate totalAmount > 0; on violation raise validation error with rule id shiftClosingRecordsBasicTotalsAndPayments",
          "Begin transaction via ctx.data",
          "Load parent Order by orderId through Order port (resolveRepository); fail if not found",
          "Ensure one-to-one: reject if Order already has an embedded OrderPayment that is not voided (rule shiftClosingRecordsBasicTotalsAndPayments)",
          "Create OrderPayment { orderPaymentId, orderId, totalAmount, paymentMethod, status: 'open', paidAt, notes, createdAt, updatedAt } and embed it on the Order aggregate payment collection",
          "Save parent Order through Order port",
          "Build persisted StockConsumption audit event for the payment recording on Order and append it through StockConsumption port inside the same transaction (append-only)",
          "Commit transaction and return the created OrderPayment fields per outputShape"
        ],
        "outputShape": {
          "kind": "object",
          "fields": [
            {
              "name": "orderPaymentId",
              "type": "string",
              "required": true,
              "fieldRef": "OrderPayment.orderPaymentId"
            },
            {
              "name": "orderId",
              "type": "string",
              "required": true,
              "fieldRef": "OrderPayment.orderId"
            },
            {
              "name": "totalAmount",
              "type": "number",
              "required": true,
              "fieldRef": "OrderPayment.totalAmount"
            },
            {
              "name": "paymentMethod",
              "type": "string",
              "required": true,
              "fieldRef": "OrderPayment.paymentMethod"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "fieldRef": "OrderPayment.status"
            },
            {
              "name": "paidAt",
              "type": "string",
              "required": false,
              "fieldRef": "OrderPayment.paidAt"
            },
            {
              "name": "notes",
              "type": "string",
              "required": false,
              "fieldRef": "OrderPayment.notes"
            },
            {
              "name": "createdAt",
              "type": "string",
              "required": true,
              "fieldRef": "OrderPayment.createdAt"
            },
            {
              "name": "updatedAt",
              "type": "string",
              "required": true,
              "fieldRef": "OrderPayment.updatedAt"
            }
          ]
        }
      }
    ],
    "rulesApplied": [
      "shiftClosingRecordsBasicTotalsAndPayments"
    ],
    "mdmRefs": []
  }
} as const;

export default recordBasicPaymentUsecase;

export const pipeline = [
  {
    "id": "recordBasicPayment__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/recordBasicPayment.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/recordBasicPayment.defs.ts",
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
      "shiftClosingRecordsBasicTotalsAndPayments"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
