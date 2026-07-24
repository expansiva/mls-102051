/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.defs.ts" enhancement="_blank"/>

export const stockAdjustmentTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "StockAdjustment",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "StockAdjustment",
    "tableName": "stock_adjustment",
    "columns": [
      {
        "name": "stock_adjustment_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "stock_item_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "direction",
        "type": "text",
        "nullable": false
      },
      {
        "name": "reason",
        "type": "text",
        "nullable": false
      },
      {
        "name": "manager_user_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "shift_id",
        "type": "uuid",
        "nullable": true
      },
      {
        "name": "status",
        "type": "text",
        "nullable": false
      },
      {
        "name": "created_at",
        "type": "timestamptz",
        "nullable": false
      },
      {
        "name": "voided_by_user_id",
        "type": "uuid",
        "nullable": true
      },
      {
        "name": "compensating_adjustment_id",
        "type": "uuid",
        "nullable": true
      }
    ],
    "primaryKey": [
      "stock_adjustment_id"
    ],
    "indexes": [
      {
        "indexName": "idx_stock_adjustment_stock_item_id",
        "columns": [
          "stock_item_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_direction",
        "columns": [
          "direction"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_reason",
        "columns": [
          "reason"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_manager_user_id",
        "columns": [
          "manager_user_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_shift_id",
        "columns": [
          "shift_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_created_at",
        "columns": [
          "created_at"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_voided_by_user_id",
        "columns": [
          "voided_by_user_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_stock_adjustment_compensating_adjustment_id",
        "columns": [
          "compensating_adjustment_id"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "columnName": "details",
      "childCollections": []
    },
    "appendOnly": true,
    "purpose": "controle",
    "retentionDays": 1825
  }
} as const;

export default stockAdjustmentTableDefinition;

export const pipeline = [
  {
    "id": "stockAdjustment__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/stockAdjustment.d.ts"
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
