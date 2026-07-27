{
  "savedAt": "2026-07-26T20:02:18.639Z",
  "agentName": "agentCbSeeds",
  "stepId": 8,
  "planning": {
    "planId": "cb-gen-seeds-w3-r2-1785096088740",
    "dependsOn": [],
    "executionMode": "sequential",
    "executionHost": "client"
  },
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitSeedScenario",
      "arguments": {
        "status": "ok",
        "result": {
          "summary": "Wave 3: orders across main kitchen lifecycle on closed/open shifts, auto stock consumptions for served orders, manager stock adjustments, and operational dashboards with sales/low-stock metrics.",
          "localTables": [
            {
              "tableId": "Order",
              "rows": [
                {
                  "key": "order_july1_served",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july1_closed"
                      }
                    },
                    {
                      "name": "order_type",
                      "value": "table"
                    },
                    {
                      "name": "status",
                      "value": "served"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T09:15:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "tableNumber",
                      "value": "4"
                    },
                    {
                      "name": "customerName",
                      "value": "Ana"
                    },
                    {
                      "name": "totalAmount",
                      "value": 42.5
                    },
                    {
                      "name": "notes",
                      "value": "Extra foam on cappuccino"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-01T09:15:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-01T09:16:30.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-01T09:18:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-01T09:28:00.000Z"
                    },
                    {
                      "name": "servedAt",
                      "value": "2026-07-01T09:32:00.000Z"
                    },
                    {
                      "name": "cancelledAt",
                      "value": null
                    },
                    {
                      "name": "cancellationReason",
                      "value": null
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T09:32:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order_july5_inprep",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july5_open"
                      }
                    },
                    {
                      "name": "order_type",
                      "value": "table"
                    },
                    {
                      "name": "status",
                      "value": "inPreparation"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-05T10:05:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "tableNumber",
                      "value": "7"
                    },
                    {
                      "name": "customerName",
                      "value": "Bruno"
                    },
                    {
                      "name": "totalAmount",
                      "value": 28
                    },
                    {
                      "name": "notes",
                      "value": "No onion on sandwich"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-05T10:05:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-05T10:06:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-05T10:08:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": null
                    },
                    {
                      "name": "servedAt",
                      "value": null
                    },
                    {
                      "name": "cancelledAt",
                      "value": null
                    },
                    {
                      "name": "cancellationReason",
                      "value": null
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-05T10:08:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order_july5_ready",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july5_open"
                      }
                    },
                    {
                      "name": "order_type",
                      "value": "takeout"
                    },
                    {
                      "name": "status",
                      "value": "ready"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-05T10:20:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "tableNumber",
                      "value": null
                    },
                    {
                      "name": "customerName",
                      "value": "Carla"
                    },
                    {
                      "name": "totalAmount",
                      "value": 18.5
                    },
                    {
                      "name": "notes",
                      "value": null
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-05T10:20:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-05T10:21:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-05T10:22:30.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-05T10:35:00.000Z"
                    },
                    {
                      "name": "servedAt",
                      "value": null
                    },
                    {
                      "name": "cancelledAt",
                      "value": null
                    },
                    {
                      "name": "cancellationReason",
                      "value": null
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-05T10:35:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order_july5_registered",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july5_open"
                      }
                    },
                    {
                      "name": "order_type",
                      "value": "takeout"
                    },
                    {
                      "name": "status",
                      "value": "registered"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-05T11:00:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "tableNumber",
                      "value": null
                    },
                    {
                      "name": "customerName",
                      "value": "Diego"
                    },
                    {
                      "name": "totalAmount",
                      "value": 12
                    },
                    {
                      "name": "notes",
                      "value": "Waiting payment confirm"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-05T11:00:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": null
                    },
                    {
                      "name": "inPreparationAt",
                      "value": null
                    },
                    {
                      "name": "readyAt",
                      "value": null
                    },
                    {
                      "name": "servedAt",
                      "value": null
                    },
                    {
                      "name": "cancelledAt",
                      "value": null
                    },
                    {
                      "name": "cancellationReason",
                      "value": null
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-05T11:00:00.000Z"
                    }
                  ],
                  "children": []
                }
              ]
            },
            {
              "tableId": "StockConsumption",
              "rows": [
                {
                  "key": "consume_july1_beans",
                  "columns": [
                    {
                      "name": "stock_consumption_id",
                      "value": null
                    },
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order_july1_served"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.coffeeBeans"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T09:32:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.04
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-01T09:32:00.000Z"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    },
                    {
                      "name": "voidReason",
                      "value": null
                    }
                  ],
                  "children": []
                },
                {
                  "key": "consume_july1_milk",
                  "columns": [
                    {
                      "name": "stock_consumption_id",
                      "value": null
                    },
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order_july1_served"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.wholeMilk"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T09:32:05.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.2
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-01T09:32:05.000Z"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    },
                    {
                      "name": "voidReason",
                      "value": null
                    }
                  ],
                  "children": []
                }
              ]
            },
            {
              "tableId": "StockAdjustment",
              "rows": [
                {
                  "key": "adj_milk_count",
                  "columns": [
                    {
                      "name": "stock_adjustment_id",
                      "value": null
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.wholeMilk"
                      }
                    },
                    {
                      "name": "direction",
                      "value": "correction"
                    },
                    {
                      "name": "reason",
                      "value": "count"
                    },
                    {
                      "name": "manager_user_id",
                      "value": {
                        "ref": "actor:gerente.u1"
                      }
                    },
                    {
                      "name": "shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july5_open"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-05T08:30:00.000Z"
                    },
                    {
                      "name": "voided_by_user_id",
                      "value": null
                    },
                    {
                      "name": "compensating_adjustment_id",
                      "value": null
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 2
                    },
                    {
                      "name": "resultingBalance",
                      "value": 8
                    },
                    {
                      "name": "notes",
                      "value": "Morning count correction"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    }
                  ],
                  "children": []
                },
                {
                  "key": "adj_sauce_loss",
                  "columns": [
                    {
                      "name": "stock_adjustment_id",
                      "value": null
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.chocolateSauce"
                      }
                    },
                    {
                      "name": "direction",
                      "value": "out"
                    },
                    {
                      "name": "reason",
                      "value": "loss"
                    },
                    {
                      "name": "manager_user_id",
                      "value": {
                        "ref": "actor:gerente.u1"
                      }
                    },
                    {
                      "name": "shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july1_closed"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T16:45:00.000Z"
                    },
                    {
                      "name": "voided_by_user_id",
                      "value": null
                    },
                    {
                      "name": "compensating_adjustment_id",
                      "value": null
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 1
                    },
                    {
                      "name": "resultingBalance",
                      "value": 3
                    },
                    {
                      "name": "notes",
                      "value": "Spilled bottle during close"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    }
                  ],
                  "children": []
                }
              ]
            },
            {
              "tableId": "OperationalDashboard",
              "rows": [
                {
                  "key": "dash_july1",
                  "columns": [
                    {
                      "name": "operational_dashboard_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july1_closed"
                      }
                    },
                    {
                      "name": "top_menu_item_id",
                      "value": {
                        "ref": "mdm:MenuItem.cappuccino"
                      }
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T18:05:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-01T00:00:00.000Z"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 865.4
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 48
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 112
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 31
                    },
                    {
                      "name": "topSellingItemsCount",
                      "value": 5
                    },
                    {
                      "name": "lowStockItemsCount",
                      "value": 1
                    },
                    {
                      "name": "outOfStockItemsCount",
                      "value": 0
                    },
                    {
                      "name": "lowStockItemIds",
                      "value": "chocolateSauce"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-01T18:00:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T18:05:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "dash_july5",
                  "columns": [
                    {
                      "name": "operational_dashboard_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july5_open"
                      }
                    },
                    {
                      "name": "top_menu_item_id",
                      "value": {
                        "ref": "mdm:MenuItem.espresso"
                      }
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-05T11:15:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-05T00:00:00.000Z"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 214
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 12
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 27
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 9
                    },
                    {
                      "name": "topSellingItemsCount",
                      "value": 4
                    },
                    {
                      "name": "lowStockItemsCount",
                      "value": 2
                    },
                    {
                      "name": "outOfStockItemsCount",
                      "value": 0
                    },
                    {
                      "name": "lowStockItemIds",
                      "value": "wholeMilk,sugarPackets"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-05T11:10:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-05T11:15:00.000Z"
                    }
                  ],
                  "children": []
                }
              ]
            }
          ],
          "mdmEntities": []
        },
        "questions": [],
        "trace": [
          "Repaired referenceDate to full ISO-8601 UTC on both dashboards.",
          "Orders: served (closed shift), inPreparation/ready/registered on open shift.",
          "StockConsumption only for served order ingredients.",
          "StockAdjustment manager count/loss events.",
          "Dashboards highlight sales, top item, low stock."
        ]
      }
    },
    "status": "completed",
    "stepId": 4,
    "interaction": null,
    "nextSteps": null
  }
}
