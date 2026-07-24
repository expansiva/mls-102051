/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboard.defs.ts" enhancement="_blank"/>

export const operationalDashboardTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "OperationalDashboard",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "OperationalDashboard",
    "tableName": "operational_dashboard",
    "columns": [
      {
        "name": "operational_dashboard_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "daily_shift_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "top_menu_item_id",
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
      "operational_dashboard_id"
    ],
    "indexes": [
      {
        "indexName": "idx_operational_dashboard_daily_shift_id",
        "columns": [
          "daily_shift_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_operational_dashboard_top_menu_item_id",
        "columns": [
          "top_menu_item_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_operational_dashboard_created_at",
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

export default operationalDashboardTableDefinition;

export const pipeline = [
  {
    "id": "operationalDashboard__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboard.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboard.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.d.ts"
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
