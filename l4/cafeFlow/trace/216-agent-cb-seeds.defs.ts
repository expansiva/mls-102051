{
  "savedAt": "2026-07-24T23:54:49.578Z",
  "agentName": "agentCbSeeds",
  "stepId": 216,
  "planning": {
    "planId": "cb-gen-seeds-w3-r2-1784937244486",
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
          "summary": "Wave 3: orders across main kitchen lifecycle on open/closed shifts, stock consumptions for served orders, manager stock adjustments, and operational dashboards with core metrics.",
          "localTables": [
            {
              "tableId": "Order",
              "rows": [
                {
                  "key": "order_july2_served",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july2_closed"
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
                      "value": "2026-07-02T10:15:00.000Z"
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
                      "value": 28.5
                    },
                    {
                      "name": "notes",
                      "value": "No sugar on cappuccino"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-02T10:15:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-02T10:16:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-02T10:18:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-02T10:28:00.000Z"
                    },
                    {
                      "name": "servedAt",
                      "value": "2026-07-02T10:35:00.000Z"
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
                      "value": "2026-07-02T10:35:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order_july3_in_prep",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july3_open"
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
                      "value": "2026-07-03T09:20:00.000Z"
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
                      "value": 42
                    },
                    {
                      "name": "notes",
                      "value": "Extra ham"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-03T09:20:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-03T09:21:30.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-03T09:25:00.000Z"
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
                      "value": "2026-07-03T09:25:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order_july3_ready",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july3_open"
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
                      "value": "2026-07-03T08:40:00.000Z"
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
                      "value": 15.5
                    },
                    {
                      "name": "notes",
                      "value": null
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-03T08:40:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-03T08:41:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-03T08:45:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-03T08:55:00.000Z"
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
                      "value": "2026-07-03T08:55:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order_july3_registered",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july3_open"
                      }
                    },
                    {
                      "name": "order_type",
                      "value": "table"
                    },
                    {
                      "name": "status",
                      "value": "registered"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-03T11:05:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "tableNumber",
                      "value": "2"
                    },
                    {
                      "name": "customerName",
                      "value": "Diego"
                    },
                    {
                      "name": "totalAmount",
                      "value": 19
                    },
                    {
                      "name": "notes",
                      "value": "Waiting confirmation"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-03T11:05:00.000Z"
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
                      "value": "2026-07-03T11:05:00.000Z"
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
                  "key": "consume_july2_milk",
                  "columns": [
                    {
                      "name": "stock_consumption_id",
                      "value": null
                    },
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order_july2_served"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.whole_milk"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T10:35:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.2
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-02T10:35:00.000Z"
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
                  "key": "consume_july2_beans",
                  "columns": [
                    {
                      "name": "stock_consumption_id",
                      "value": null
                    },
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order_july2_served"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.coffee_beans"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T10:35:05.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.018
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-02T10:35:05.000Z"
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
                        "ref": "mdm:StockItem.whole_milk"
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
                        "ref": "local:DailyShift.shift_july3_open"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-03T07:30:00.000Z"
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
                      "value": 18
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
                  "key": "adj_sugar_loss",
                  "columns": [
                    {
                      "name": "stock_adjustment_id",
                      "value": null
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.sugar_packets"
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
                        "ref": "actor:gerente.u2"
                      }
                    },
                    {
                      "name": "shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july2_closed"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T16:45:00.000Z"
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
                      "value": 12
                    },
                    {
                      "name": "resultingBalance",
                      "value": 88
                    },
                    {
                      "name": "notes",
                      "value": "Damaged packet box"
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
                  "key": "dash_july3_open",
                  "columns": [
                    {
                      "name": "operational_dashboard_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july3_open"
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
                      "value": "2026-07-03T08:00:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-03T00:00:00.000Z"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 57.5
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 3
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 5
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 3
                    },
                    {
                      "name": "topSellingItemsCount",
                      "value": 2
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
                      "value": "whole_milk"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-03T11:10:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-03T11:10:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "dash_july2_closed",
                  "columns": [
                    {
                      "name": "operational_dashboard_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july2_closed"
                      }
                    },
                    {
                      "name": "top_menu_item_id",
                      "value": {
                        "ref": "mdm:MenuItem.croissant"
                      }
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T08:00:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-02T00:00:00.000Z"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 28.5
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 1
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 2
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 1
                    },
                    {
                      "name": "topSellingItemsCount",
                      "value": 1
                    },
                    {
                      "name": "lowStockItemsCount",
                      "value": 0
                    },
                    {
                      "name": "outOfStockItemsCount",
                      "value": 0
                    },
                    {
                      "name": "lowStockItemIds",
                      "value": null
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": false
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-02T18:00:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-02T18:00:00.000Z"
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
          "Fixed referenceDate to full ISO 8601 UTC on both OperationalDashboard rows",
          "Orders cover served, inPreparation, ready, registered on open/closed shifts",
          "StockConsumption only for served order per auto-deduction rule",
          "StockAdjustment manager events with actor refs",
          "Dashboards highlight sales, top items, low stock"
        ]
      }
    },
    "status": "completed",
    "stepId": 7,
    "interaction": null,
    "nextSteps": null
  }
}
