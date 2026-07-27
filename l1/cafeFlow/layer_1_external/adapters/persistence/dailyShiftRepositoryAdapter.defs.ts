/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/dailyShiftRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const dailyShiftRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "DailyShiftRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "DailyShift",
    "className": "DailyShiftRepositoryAdapter",
    "portRef": "IDailyShiftRepository",
    "tableRef": "cafe_flow_daily_shifts",
    "mdmReads": [],
    "notes": [
      "columns: daily_shift_id, status, opened_by_user_id, closed_by_user_id, created_at",
      "details JSONB: shiftDate, openedAt, closedAt, totalOrders, totalSalesAmount, totalItemsSold, cashTotal, otherPaymentsTotal, notes, updatedAt",
      "map domain DailyShift <-> row via ctx.data.moduleData only"
    ]
  }
} as const;

export default dailyShiftRepositoryAdapter;

export const pipeline = [
  {
    "id": "dailyShiftRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/dailyShiftRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/dailyShiftRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/dailyShift.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.d.ts"
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
