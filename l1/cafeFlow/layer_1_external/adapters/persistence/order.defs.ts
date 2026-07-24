/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.defs.ts" enhancement="_blank"/>

export const orderTableDefinition = {
  "schemaVersion": "2026-06-26",
  "artifactType": "table",
  "artifactId": "Order",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbPersistenceTable",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "tableId": "Order",
    "tableName": "order",
    "columns": [
      {
        "name": "order_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "daily_shift_id",
        "type": "uuid",
        "nullable": false
      },
      {
        "name": "order_type",
        "type": "text",
        "nullable": false
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
      }
    ],
    "primaryKey": [
      "order_id"
    ],
    "indexes": [
      {
        "indexName": "idx_order_daily_shift_id",
        "columns": [
          "daily_shift_id"
        ],
        "unique": false
      },
      {
        "indexName": "idx_order_order_type",
        "columns": [
          "order_type"
        ],
        "unique": false
      },
      {
        "indexName": "idx_order_status",
        "columns": [
          "status"
        ],
        "unique": false
      },
      {
        "indexName": "idx_order_created_at",
        "columns": [
          "created_at"
        ],
        "unique": false
      }
    ],
    "detailsColumn": {
      "enabled": true,
      "columnName": "details",
      "childCollections": [
        "OrderItem",
        "OrderPayment"
      ]
    }
  }
} as const;

export default orderTableDefinition;

export const pipeline = [
  {
    "id": "order__persistenceTable",
    "type": "persistenceTable",
    "outputPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/order.d.ts"
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
