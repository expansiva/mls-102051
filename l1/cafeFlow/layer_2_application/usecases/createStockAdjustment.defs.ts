/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createStockAdjustment.defs.ts" enhancement="_blank"/>

export const createStockAdjustmentUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createStockAdjustment",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createStockAdjustment",
    "ports": [
      "DailyShift",
      "StockAdjustment"
    ],
    "functions": [
      {
        "functionName": "createStockAdjustment",
        "inputTypeName": "CreateStockAdjustmentInput",
        "outputTypeName": "CreateStockAdjustmentOutput",
        "input": [
          {
            "name": "stockItemId",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment",
            "fieldRef": "StockAdjustment.stockItemId"
          },
          {
            "name": "quantity",
            "type": "number",
            "required": true,
            "ofEntity": "StockAdjustment",
            "fieldRef": "StockAdjustment.quantity"
          },
          {
            "name": "direction",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment",
            "fieldRef": "StockAdjustment.direction"
          },
          {
            "name": "reason",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment",
            "fieldRef": "StockAdjustment.reason"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "StockAdjustment",
            "fieldRef": "StockAdjustment.notes"
          }
        ],
        "output": [
          {
            "name": "stockAdjustmentId",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "stockItemId",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "quantity",
            "type": "number",
            "required": true,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "direction",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "reason",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "managerUserId",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "shiftId",
            "type": "string",
            "required": false,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "resultingBalance",
            "type": "number",
            "required": true,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "notes",
            "type": "string",
            "required": false,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment"
          },
          {
            "name": "createdAt",
            "type": "string",
            "required": true,
            "ofEntity": "StockAdjustment"
          }
        ],
        "ports": [
          "DailyShift",
          "StockAdjustment"
        ],
        "rulesApplied": [
          "managerManualStockAdjustmentAllowed"
        ],
        "transactional": true,
        "steps": [
          "Resolve managerUserId from ctx.sessionContext.actorId (actorSession)",
          "Generate stockAdjustmentId via ctx.idGenerator and createdAt via ctx.clock.now()",
          "Resolve optional active DailyShift: list via DailyShift port where status is open; if found set shiftId to its dailyShiftId, otherwise leave shiftId unset",
          "Load StockItem by stockItemId via ctx.mdm.entity.get({ mdmId: stockItemId }); fail if not found",
          "Apply managerManualStockAdjustmentAllowed inline: ensure actor is a manager authorized to perform manual stock adjustments; reject with rule id in error details if not",
          "Validate direction is one of in|out|correction and reason is one of count|loss|expiration|divergence|other; quantity must be > 0",
          "Compute resultingBalance from StockItem.currentBalance and direction/quantity (in adds, out subtracts, correction sets/adjusts per domain convention); reject if resultingBalance would be negative for out",
          "Within ctx.data transaction: create StockAdjustment with status posted via StockAdjustment port; update StockItem.currentBalance to resultingBalance via ctx.mdm.entity.update",
          "Return the created StockAdjustment fields matching outputShape"
        ],
        "outputShape": {
          "kind": "object",
          "fields": [
            {
              "name": "stockAdjustmentId",
              "type": "string",
              "required": true,
              "fieldRef": "StockAdjustment.stockAdjustmentId"
            },
            {
              "name": "stockItemId",
              "type": "string",
              "required": true,
              "fieldRef": "StockAdjustment.stockItemId"
            },
            {
              "name": "quantity",
              "type": "number",
              "required": true,
              "fieldRef": "StockAdjustment.quantity"
            },
            {
              "name": "direction",
              "type": "string",
              "required": true,
              "fieldRef": "StockAdjustment.direction"
            },
            {
              "name": "reason",
              "type": "string",
              "required": true,
              "fieldRef": "StockAdjustment.reason"
            },
            {
              "name": "managerUserId",
              "type": "string",
              "required": true,
              "fieldRef": "StockAdjustment.managerUserId"
            },
            {
              "name": "shiftId",
              "type": "string",
              "required": false,
              "fieldRef": "StockAdjustment.shiftId"
            },
            {
              "name": "resultingBalance",
              "type": "number",
              "required": true,
              "fieldRef": "StockAdjustment.resultingBalance"
            },
            {
              "name": "notes",
              "type": "string",
              "required": false,
              "fieldRef": "StockAdjustment.notes"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "fieldRef": "StockAdjustment.status"
            },
            {
              "name": "createdAt",
              "type": "string",
              "required": true,
              "fieldRef": "StockAdjustment.createdAt"
            }
          ]
        }
      }
    ],
    "rulesApplied": [
      "managerManualStockAdjustmentAllowed"
    ],
    "mdmRefs": [
      "StockItem"
    ]
  }
} as const;

export default createStockAdjustmentUsecase;

export const pipeline = [
  {
    "id": "createStockAdjustment__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createStockAdjustment.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createStockAdjustment.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "managerManualStockAdjustmentAllowed"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
