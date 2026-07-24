{
  "savedAt": "2026-07-22T21:18:29.312Z",
  "agentName": "agentCbPersistenceTable",
  "stepId": 8,
  "planning": {
    "planId": "cb-gen-table",
    "dependsOn": [
      "cb-gen-port"
    ],
    "executionMode": "sequential",
    "executionHost": "client"
  },
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitPersistenceTables",
      "arguments": {
        "status": "ok",
        "result": {
          "items": [
            {
              "tableId": "DailyShift",
              "tableName": "daily_shift",
              "columns": [
                {
                  "name": "daily_shift_id",
                  "type": "uuid",
                  "nullable": false
                },
                {
                  "name": "status",
                  "type": "text",
                  "nullable": false
                },
                {
                  "name": "opened_by_user_id",
                  "type": "uuid",
                  "nullable": false
                },
                {
                  "name": "closed_by_user_id",
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
                "daily_shift_id"
              ],
              "indexes": [
                {
                  "indexName": "idx_daily_shift_status",
                  "columns": [
                    "status"
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_daily_shift_opened_by_user_id",
                  "columns": [
                    "opened_by_user_id"
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_daily_shift_closed_by_user_id",
                  "columns": [
                    "closed_by_user_id"
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_daily_shift_created_at",
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
            },
            {
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
            },
            {
              "tableId": "ShiftClosingReport",
              "tableName": "shift_closing_report",
              "columns": [
                {
                  "name": "shift_closing_report_id",
                  "type": "uuid",
                  "nullable": false
                },
                {
                  "name": "daily_shift_id",
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
                "shift_closing_report_id"
              ],
              "indexes": [
                {
                  "indexName": "idx_shift_closing_report_daily_shift_id",
                  "columns": [
                    "daily_shift_id"
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_shift_closing_report_created_at",
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
            },
            {
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
                  "nullable": false
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
            },
            {
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
            },
            {
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
            },
            {
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
            },
            {
              "tableId": "StockConsumption",
              "tableName": "stock_consumption",
              "columns": [
                {
                  "name": "stock_consumption_id",
                  "type": "uuid",
                  "nullable": false
                },
                {
                  "name": "order_id",
                  "type": "uuid",
                  "nullable": false
                },
                {
                  "name": "stock_item_id",
                  "type": "uuid",
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
                "stock_consumption_id"
              ],
              "indexes": [
                {
                  "indexName": "idx_stock_consumption_order_id",
                  "columns": [
                    "order_id"
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_stock_consumption_stock_item_id",
                  "columns": [
                    "stock_item_id"
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_stock_consumption_status",
                  "columns": [
                    "status"
                  ],
                  "unique": false
                },
                {
                  "indexName": "idx_stock_consumption_created_at",
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
              },
              "appendOnly": true,
              "purpose": "controle",
              "retentionDays": 365
            }
          ]
        },
        "questions": [],
        "trace": [
          "Derived 6 entity tables + 2 append-only event tables",
          "Indexed fields only as columns; details JSONB enabled for all",
          "snake_case table/column names; PK + FK/status/ordering indexes"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
