/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestionRepositoryAdapter.defs.ts" enhancement="_blank"/>

export const aiPromotionSuggestionRepositoryAdapter = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryAdapter",
  "artifactId": "AiPromotionSuggestionRepositoryAdapter",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryAdapter",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "AiPromotionSuggestion",
    "className": "AiPromotionSuggestionRepositoryAdapter",
    "portRef": "IAiPromotionSuggestionRepository",
    "tableRef": "ai_promotion_suggestion",
    "mdmReads": [],
    "notes": [
      "columns: ai_promotion_suggestion_id, operational_dashboard_id, menu_item_id, menu_category_id, status, reviewed_by_user_id, created_at",
      "details JSONB: menuItemName, reason, salesLast7Days, salesToday, currentStockLevel, confidenceScore, suggestedDiscountPercent, reviewedAt, reviewNotes, generatedAt, expiresAt, updatedAt",
      "map domain AiPromotionSuggestion <-> row via ctx.data.moduleData; menuItemId/menuCategoryId stored as local FK columns (not mdm entity.get loops); no mdmRefs"
    ]
  }
} as const;

export default aiPromotionSuggestionRepositoryAdapter;

export const pipeline = [
  {
    "id": "aiPromotionSuggestionRepositoryAdapter__repositoryAdapter",
    "type": "repositoryAdapter",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestionRepositoryAdapter.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestionRepositoryAdapter.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/aiPromotionSuggestionRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestion.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.d.ts"
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
