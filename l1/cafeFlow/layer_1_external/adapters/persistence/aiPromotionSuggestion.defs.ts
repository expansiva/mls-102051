/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestion.defs.ts" enhancement="_blank"/>

export const aiPromotionSuggestionTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "AiPromotionSuggestion",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "AiPromotionSuggestion",
    "tableName": "ai_promotion_suggestion",
    "columns": [
      {
        "name": "ai_promotion_suggestion_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "operational_dashboard_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "menu_item_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "menu_category_id",
        "type": "uuid",
        "nullable": true
      },
      {
        "name": "status",
        "type": "text",
        "nullable": false
      },
      {
        "name": "reviewed_by_user_id",
        "type": "uuid",
        "nullable": true
      },
      {
        "name": "created_at",
        "type": "timestamptz",
        "nullable": false
      }
    ],
    "primaryKey": [
      "ai_promotion_suggestion_id"
    ],
    "indexes": [
      {
        "indexName": "idx_ai_promotion_suggestion_operational_dashboard_id",
        "columns": [
          "operational_dashboard_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_ai_promotion_suggestion_menu_item_id",
        "columns": [
          "menu_item_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_ai_promotion_suggestion_menu_category_id",
        "columns": [
          "menu_category_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_ai_promotion_suggestion_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_ai_promotion_suggestion_reviewed_by_user_id",
        "columns": [
          "reviewed_by_user_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_ai_promotion_suggestion_created_at",
        "columns": [
          "created_at"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "columnName": "details",
      "childCollections": []
    }
  }
} as const;

export default aiPromotionSuggestionTableDefinition;

export const pipeline = [
  {
    "id": "aiPromotionSuggestion__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestion.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestion.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/persistenceTable.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
