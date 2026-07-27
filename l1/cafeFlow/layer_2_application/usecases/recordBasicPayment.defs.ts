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
          "resolve orderRepository and stockConsumptionRepository via resolveRepository",
          "validate paymentMethod is one of cash|pix|creditCard|debitCard|mixed; on failure raise validation error with rule id shiftClosingRecordsBasicTotalsAndPayments",
          "validate totalAmount is a positive money value; on failure raise validation error with rule id shiftClosingRecordsBasicTotalsAndPayments",
          "generate orderPaymentId via ctx.idGenerator and timestamps paidAt/createdAt/updatedAt via ctx.clock",
          "set status to open (systemDefault)",
          "inside ctx.data.transaction: load Order by orderId through Order port; fail if not found",
          "ensure Order has no existing non-voided OrderPayment (one-to-one); if one exists raise validation error with rule id shiftClosingRecordsBasicTotalsAndPayments",
          "append embedded OrderPayment {orderPaymentId, orderId, totalAmount, paymentMethod, status: open, paidAt, notes, createdAt, updatedAt} on the Order aggregate",
          "save parent Order through Order port",
          "build and append persisted StockConsumption audit event through StockConsumption port inside the same transaction (purpose audit, owner Order)",
          "return the created OrderPayment fields per outputShape"
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
