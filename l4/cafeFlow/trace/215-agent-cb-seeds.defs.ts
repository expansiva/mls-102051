{
  "savedAt": "2026-07-24T23:54:04.483Z",
  "agentName": "agentCbSeeds",
  "stepId": 215,
  "planning": {
    "planId": "cb-gen-seeds-w3-r1-1784937175261",
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
          "summary": "Wave 3 seeds 4 orders across main kitchen lifecycle (served on closed shifts, in-prep and ready on open shift), stock consumptions for served orders, two manager stock adjustments, and operational dashboards for open and prior closed shifts with low-stock highlights.",
          "localTables": [
            {
              "tableId": "Order",
              "rows": [
                {
                  "key": "ord_j1_table_served",
                  "columns": [
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
                      "value": "2026-07-01T08:15:00.000Z"
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
                      "value": "Extra foam"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-01T08:15:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-01T08:17:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-01T08:20:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-01T08:35:00.000Z"
                    },
                    {
                      "name": "servedAt",
                      "value": "2026-07-01T08:42:00.000Z"
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
                      "value": "2026-07-01T08:42:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "ord_j2_takeout_served",
                  "columns": [
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july2_closed"
                      }
                    },
                    {
                      "name": "order_type",
                      "value": "takeout"
                    },
                    {
                      "name": "status",
                      "value": "served"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T09:05:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "tableNumber",
                      "value": null
                    },
                    {
                      "name": "customerName",
                      "value": "Bruno"
                    },
                    {
                      "name": "totalAmount",
                      "value": 19
                    },
                    {
                      "name": "notes",
                      "value": null
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-02T09:05:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-02T09:06:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-02T09:10:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-02T09:25:00.000Z"
                    },
                    {
                      "name": "servedAt",
                      "value": "2026-07-02T09:30:00.000Z"
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
                      "value": "2026-07-02T09:30:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "ord_j3_table_inprep",
                  "columns": [
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
                      "value": "2026-07-03T10:12:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "tableNumber",
                      "value": "7"
                    },
                    {
                      "name": "customerName",
                      "value": "Carla"
                    },
                    {
                      "name": "totalAmount",
                      "value": 34
                    },
                    {
                      "name": "notes",
                      "value": "No onion"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-03T10:12:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-03T10:14:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-03T10:18:00.000Z"
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
                      "value": "2026-07-03T10:18:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "ord_j3_takeout_ready",
                  "columns": [
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
                      "value": "2026-07-03T11:00:00.000Z"
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
                      "value": 12.5
                    },
                    {
                      "name": "notes",
                      "value": "For pickup"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-03T11:00:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-03T11:01:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-03T11:05:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-03T11:20:00.000Z"
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
                      "value": "2026-07-03T11:20:00.000Z"
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
                  "key": "cons_j1_beans",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.ord_j1_table_served"
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
                      "value": "2026-07-01T08:42:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.04
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-01T08:42:00.000Z"
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
                  "key": "cons_j1_milk",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.ord_j1_table_served"
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
                      "value": "2026-07-01T08:42:05.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.2
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-01T08:42:05.000Z"
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
                  "key": "cons_j2_ham",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.ord_j2_takeout_served"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.ham_portion"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T09:30:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 1
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-02T09:30:00.000Z"
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
                  "key": "adj_flour_count_in",
                  "columns": [
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.wheat_flour"
                      }
                    },
                    {
                      "name": "direction",
                      "value": "in"
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
                      "value": "2026-07-03T09:30:00.000Z"
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
                      "value": 5
                    },
                    {
                      "name": "resultingBalance",
                      "value": 28
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
                  "key": "adj_sugar_loss_out",
                  "columns": [
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
                      "value": 38
                    },
                    {
                      "name": "notes",
                      "value": "Damaged box discarded"
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
                      "value": "2026-07-03"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 46.5
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 2
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 4
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 2
                    },
                    {
                      "name": "topSellingItemsCount",
                      "value": 3
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
                      "value": "whole_milk,sugar_packets"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-03T11:30:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-03T11:30:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "dash_july2_closed",
                  "columns": [
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift_july2_closed"
                      }
                    },
                    {
                      "name": "top_menu_item_id",
                      "value": {
                        "ref": "mdm:MenuItem.ham_sandwich"
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
                      "value": "2026-07-02"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 19
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
                      "value": 1
                    },
                    {
                      "name": "outOfStockItemsCount",
                      "value": 0
                    },
                    {
                      "name": "lowStockItemIds",
                      "value": "sugar_packets"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
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
          "Wave 3 covers Order, StockConsumption, StockAdjustment, OperationalDashboard only",
          "Orders: 2 served on closed shifts, inPreparation + ready on open shift_july3",
          "StockConsumption only for served orders per autoStockDeductionOnServe",
          "StockAdjustment by gerente actors with posted status",
          "Dashboards for open and closed shifts with low-stock metrics"
        ]
      }
    },
    "status": "completed",
    "stepId": 7,
    "interaction": null,
    "nextSteps": null
  }
}
