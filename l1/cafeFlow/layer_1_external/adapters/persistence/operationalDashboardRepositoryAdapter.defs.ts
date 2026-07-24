/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboardRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const operationalDashboardRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "OperationalDashboardRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "OperationalDashboard",
    "className": "OperationalDashboardRepositoryAdapter",
    "portRef": "IOperationalDashboardRepository",
    "tableRef": "operational_dashboard",
    "mdmReads": [],
    "notes": [
      "columns: operational_dashboard_id, daily_shift_id, top_menu_item_id, created_at",
      "details JSONB: referenceDate, todaySalesTotal, todayOrdersCount, todayItemsSold, topMenuItemQuantity, topSellingItemsCount, lowStockItemsCount, outOfStockItemsCount, lowStockItemIds, hasLowStockAlert, lastComputedAt, updatedAt",
      "map domain OperationalDashboard <-> row via ctx.data.moduleData; no mdmRefs"
    ]
  }
} as const;

export default operationalDashboardRepositoryAdapter;

export const pipeline = [
  {
    "id": "operationalDashboardRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboardRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboardRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboard.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.d.ts"
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
