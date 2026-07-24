/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const stockAdjustmentRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "StockAdjustmentRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "StockAdjustment",
    "className": "StockAdjustmentRepositoryAdapter",
    "portRef": "IStockAdjustmentRepository",
    "tableRef": "stock_adjustment",
    "mdmReads": [],
    "notes": [
      "append-only event adapter: append (insert one row) + read finders; no update/delete",
      "columns: stock_adjustment_id, stock_item_id, direction, reason, manager_user_id, shift_id, status, created_at, voided_by_user_id, compensating_adjustment_id",
      "details JSONB: quantity, resultingBalance, notes, voidedAt",
      "map domain StockAdjustment <-> row via ctx.data.moduleData; no mdmRefs"
    ]
  }
} as const;

export default stockAdjustmentRepositoryAdapter;

export const pipeline = [
  {
    "id": "stockAdjustmentRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/stockAdjustmentRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryAdapter.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
