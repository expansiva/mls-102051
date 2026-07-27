{
  "savedAt": "2026-07-26T20:01:28.736Z",
  "agentName": "agentCbSeeds",
  "stepId": 7,
  "planning": {
    "planId": "cb-gen-seeds-w3-r1-1785096027288",
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
          "summary": "Wave 3 seeds 4 orders (registered/inPreparation/ready on open shift, served on closed), stock consumptions for the served order, manager stock adjustments (posted+voided), and dashboards for closed and open shifts with low-stock highlights.",
          "localTables": [
            {
              "tableId": "Order",
              "rows": [
                {
                  "key": "order_july1_served",
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
                      "value": "2026-07-01T11:05:00.000Z"
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
                      "value": "Extra foam on cappuccino"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-01T11:05:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-01T11:07:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-01T11:12:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-01T11:28:00.000Z"
                    },
                    {
                      "name": "servedAt",
                      "value": "2026-07-01T11:35:00.000Z"
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
                      "value": "2026-07-01T11:35:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order_july5_registered",
                  "columns": [
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
                      "value": "registered"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-05T14:10:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "tableNumber",
                      "value": "2"
                    },
                    {
                      "name": "customerName",
                      "value": "Bruno"
                    },
                    {
                      "name": "totalAmount",
                      "value": 12
                    },
                    {
                      "name": "notes",
                      "value": null
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-05T14:10:00.000Z"
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
                      "value": "2026-07-05T14:10:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order_july5_inprep",
                  "columns": [
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
                      "value": "2026-07-05T13:20:00.000Z"
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
                      "value": "No onion on sandwich"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-05T13:20:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-05T13:22:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-05T13:30:00.000Z"
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
                      "value": "2026-07-05T13:30:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order_july5_ready",
                  "columns": [
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
                      "value": "2026-07-05T12:40:00.000Z"
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
                      "value": 18.5
                    },
                    {
                      "name": "notes",
                      "value": "Pickup name Diego"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-05T12:40:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-05T12:42:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-05T12:50:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-05T13:05:00.000Z"
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
                      "value": "2026-07-05T13:05:00.000Z"
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
                  "key": "consume_served_beans",
                  "columns": [
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
                      "value": "2026-07-01T11:35:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.04
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-01T11:35:00.000Z"
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
                  "key": "consume_served_milk",
                  "columns": [
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
                      "value": "2026-07-01T11:35:05.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.2
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-01T11:35:05.000Z"
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
                  "key": "adj_milk_count_in",
                  "columns": [
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.wholeMilk"
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
                        "ref": "local:DailyShift.shift_july5_open"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-05T10:15:00.000Z"
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
                      "value": 28
                    },
                    {
                      "name": "notes",
                      "value": "Morning count restock"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    }
                  ],
                  "children": []
                },
                {
                  "key": "adj_sauce_loss_voided",
                  "columns": [
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
                      "value": "voided"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T16:40:00.000Z"
                    },
                    {
                      "name": "voided_by_user_id",
                      "value": {
                        "ref": "actor:gerente.u1"
                      }
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
                      "value": "Spillage recorded in error"
                    },
                    {
                      "name": "voidedAt",
                      "value": "2026-07-02T17:05:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "adj_sugar_divergence",
                  "columns": [
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.sugarPackets"
                      }
                    },
                    {
                      "name": "direction",
                      "value": "correction"
                    },
                    {
                      "name": "reason",
                      "value": "divergence"
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
                      "value": "2026-07-05T11:00:00.000Z"
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
                      "value": -15
                    },
                    {
                      "name": "resultingBalance",
                      "value": 40
                    },
                    {
                      "name": "notes",
                      "value": "Shelf count lower than system"
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
                      "value": "2026-07-01T20:05:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-01"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 486.5
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 42
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 97
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 28
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
                      "value": "wholeMilk"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-01T20:00:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T20:05:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "dash_july5",
                  "columns": [
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
                      "value": "2026-07-05T14:30:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-05"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 215
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 18
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 41
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 14
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
                      "value": "coffeeBeans,sugarPackets"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-05T14:25:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-05T14:30:00.000Z"
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
          "Wave 3 covers Order, StockConsumption, StockAdjustment, OperationalDashboard only.",
          "Orders: served on closed july1; registered, inPreparation, ready on open july5 — main lifecycle + open work.",
          "StockConsumption only for served order (auto deduction on serve) against coffeeBeans and wholeMilk.",
          "StockAdjustment: posted count-in and divergence by gerente; one voided loss.",
          "Dashboards for july1 closed and july5 open with sales, top item, low-stock flags.",
          "All FKs symbolic; timestamps inside 2026-07-01..08 and ordered by status progression."
        ]
      }
    },
    "status": "completed",
    "stepId": 4,
    "interaction": null,
    "nextSteps": null
  }
}
