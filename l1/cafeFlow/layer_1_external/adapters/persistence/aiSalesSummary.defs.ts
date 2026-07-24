/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummary.defs.ts" enhancement="_blank"/>

export const aiSalesSummaryTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "AiSalesSummary",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "AiSalesSummary",
    "tableName": "ai_sales_summary",
    "columns": [
      {
        "name": "ai_sales_summary_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "operational_dashboard_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "model_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "created_at",
        "type": "timestamptz",
        "nullable": false
      }
    ],
    "primaryKey": [
      "ai_sales_summary_id"
    ],
    "indexes": [
      {
        "indexName": "idx_ai_sales_summary_operational_dashboard_id",
        "columns": [
          "operational_dashboard_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_ai_sales_summary_model_id",
        "columns": [
          "model_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_ai_sales_summary_created_at",
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

export default aiSalesSummaryTableDefinition;

export const pipeline = [
  {
    "id": "aiSalesSummary__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummary.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummary.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.d.ts"
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
