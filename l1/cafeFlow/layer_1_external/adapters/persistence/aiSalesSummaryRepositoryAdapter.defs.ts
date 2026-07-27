/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummaryRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const aiSalesSummaryRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "AiSalesSummaryRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "AiSalesSummary",
    "className": "AiSalesSummaryRepositoryAdapter",
    "portRef": "IAiSalesSummaryRepository",
    "tableRef": "cafe_flow_ai_sales_summaries",
    "mdmReads": [],
    "notes": [
      "columns: ai_sales_summary_id, operational_dashboard_id, model_id, created_at",
      "details JSONB: summaryDate, periodStart, periodEnd, summaryText, promptTokens, completionTokens, generatedAt, updatedAt",
      "map domain AiSalesSummary <-> row via ctx.data.moduleData only"
    ]
  }
} as const;

export default aiSalesSummaryRepositoryAdapter;

export const pipeline = [
  {
    "id": "aiSalesSummaryRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummaryRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummaryRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/aiSalesSummaryRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummary.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.d.ts"
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
