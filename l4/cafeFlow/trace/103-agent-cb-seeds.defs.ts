{
  "savedAt": "2026-07-25T04:00:12.842Z",
  "agentName": "agentCbSeeds",
  "stepId": 103,
  "planning": {
    "planId": "cb-gen-seeds-w3-r2-1784951968861",
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
          "summary": "Orders across served/in-prep/ready/cancelled on closed and open shifts; stock consumptions for active orders plus one void; posted and voided stock adjustments; dashboards for july1 closed and july7 open shifts.",
          "localTables": [
            {
              "tableId": "Order",
              "rows": [
                {
                  "key": "order-july1-served",
                  "columns": [
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july1"
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
                      "value": 28.5
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
                      "value": "2026-07-01T09:16:00.000Z"
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
                      "value": "2026-07-01T09:35:00.000Z"
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
                      "value": "2026-07-01T09:35:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order-july7-inprep",
                  "columns": [
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july7-open"
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
                      "value": "2026-07-07T10:05:00.000Z"
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
                      "value": 19
                    },
                    {
                      "name": "notes",
                      "value": null
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-07T10:05:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-07T10:06:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-07T10:08:00.000Z"
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
                      "value": "2026-07-07T10:08:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order-july7-ready",
                  "columns": [
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july7-open"
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
                      "value": "2026-07-07T09:40:00.000Z"
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
                      "value": 12
                    },
                    {
                      "name": "notes",
                      "value": "No sugar"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-07T09:40:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-07T09:41:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-07T09:42:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-07T09:50:00.000Z"
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
                      "value": "2026-07-07T09:50:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order-july1-cancelled",
                  "columns": [
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july1"
                      }
                    },
                    {
                      "name": "order_type",
                      "value": "takeout"
                    },
                    {
                      "name": "status",
                      "value": "cancelled"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T11:20:00.000Z"
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
                      "value": 8.5
                    },
                    {
                      "name": "notes",
                      "value": null
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-01T11:20:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-01T11:21:00.000Z"
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
                      "value": "2026-07-01T11:25:00.000Z"
                    },
                    {
                      "name": "cancellationReason",
                      "value": "Customer left before prep"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T11:25:00.000Z"
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
                  "key": "consume-july1-milk",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-july1-served"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.whole-milk"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T09:18:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.2
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-01T09:18:00.000Z"
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
                  "key": "consume-july1-beans",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-july1-served"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.coffee-beans"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T09:18:30.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.018
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-01T09:18:30.000Z"
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
                  "key": "consume-july7-beans",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-july7-inprep"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.coffee-beans"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-07T10:08:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.018
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-07T10:08:00.000Z"
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
                  "key": "consume-july7-void",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-july7-ready"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.white-sugar"
                      }
                    },
                    {
                      "name": "status",
                      "value": "voided"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-07T09:42:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.01
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-07T09:42:00.000Z"
                    },
                    {
                      "name": "voidedAt",
                      "value": "2026-07-07T09:45:00.000Z"
                    },
                    {
                      "name": "voidReason",
                      "value": "Customer requested no sugar"
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
                  "key": "adj-milk-in",
                  "columns": [
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.whole-milk"
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
                        "ref": "local:DailyShift.shift-july1"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T08:10:00.000Z"
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
                      "value": "Morning delivery restock"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    }
                  ],
                  "children": []
                },
                {
                  "key": "adj-bread-loss",
                  "columns": [
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.sourdough-loaf"
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
                        "ref": "local:DailyShift.shift-july1"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T16:40:00.000Z"
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
                      "value": 4
                    },
                    {
                      "name": "notes",
                      "value": "Stale end-of-day loaves"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    }
                  ],
                  "children": []
                },
                {
                  "key": "adj-sugar-voided",
                  "columns": [
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.white-sugar"
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
                        "ref": "actor:gerente.u2"
                      }
                    },
                    {
                      "name": "shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july7-open"
                      }
                    },
                    {
                      "name": "status",
                      "value": "voided"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-07T08:30:00.000Z"
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
                      "value": 1.5
                    },
                    {
                      "name": "resultingBalance",
                      "value": 9.5
                    },
                    {
                      "name": "notes",
                      "value": "Miscount during open; voided after recount"
                    },
                    {
                      "name": "voidedAt",
                      "value": "2026-07-07T09:00:00.000Z"
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
                  "key": "dash-july1",
                  "columns": [
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july1"
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
                      "value": 842.5
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 47
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 112
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
                      "value": 2
                    },
                    {
                      "name": "outOfStockItemsCount",
                      "value": 0
                    },
                    {
                      "name": "lowStockItemIds",
                      "value": "whole-milk,sourdough-loaf"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-01T18:05:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T18:05:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "dash-july7-open",
                  "columns": [
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july7-open"
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
                      "value": "2026-07-07T10:30:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-07T00:00:00.000Z"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 186
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 11
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 24
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 9
                    },
                    {
                      "name": "topSellingItemsCount",
                      "value": 3
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
                      "value": "coffee-beans"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-07T10:30:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-07T10:30:00.000Z"
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
          "Orders: served, inPreparation, ready, cancelled across july1 closed and july7 open shifts",
          "StockConsumption posted for served/in-prep plus voided sugar on ready takeout",
          "StockAdjustment posted in/out and one voided correction with manager actors",
          "Dashboards linked to shift-july1 and shift-july7-open with menu/stock refs from prior waves"
        ]
      }
    },
    "status": "completed",
    "stepId": 7,
    "interaction": null,
    "nextSteps": null
  }
}
