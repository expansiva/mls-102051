{
  "savedAt": "2026-07-25T03:59:28.858Z",
  "agentName": "agentCbSeeds",
  "stepId": 102,
  "planning": {
    "planId": "cb-gen-seeds-w3-r1-1784951923650",
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
          "summary": "Orders across main lifecycle states on closed and open shifts, stock consumptions for prepared orders, manager stock adjustments, and operational dashboards for closed and open shifts.",
          "localTables": [
            {
              "tableId": "Order",
              "rows": [
                {
                  "key": "order-table-served",
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
                      "value": "No sugar on cappuccino"
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
                  "key": "order-takeout-ready",
                  "columns": [
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july2"
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
                      "value": "2026-07-02T11:05:00.000Z"
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
                      "value": 15
                    },
                    {
                      "name": "notes",
                      "value": "Extra napkin"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-02T11:05:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-02T11:06:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-02T11:08:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-02T11:18:00.000Z"
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
                      "value": "2026-07-02T11:18:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order-in-prep",
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
                      "value": "2026-07-07T10:20:00.000Z"
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
                      "value": 22
                    },
                    {
                      "name": "notes",
                      "value": null
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-07T10:20:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-07T10:21:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-07T10:23:00.000Z"
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
                      "value": "2026-07-07T10:23:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order-cancelled",
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
                      "value": "2026-07-01T14:40:00.000Z"
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
                      "value": "Customer left"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-01T14:40:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-01T14:41:00.000Z"
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
                      "value": "2026-07-01T14:50:00.000Z"
                    },
                    {
                      "name": "cancellationReason",
                      "value": "Customer cancelled before prep"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T14:50:00.000Z"
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
                  "key": "consume-served-beans",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-table-served"
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
                      "value": "2026-07-01T09:18:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.04
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
                  "key": "consume-served-milk",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-table-served"
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
                      "value": "2026-07-01T09:18:30.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.2
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
                  "key": "consume-ready-beans",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-takeout-ready"
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
                      "value": "2026-07-02T11:08:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.03
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-02T11:08:00.000Z"
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
                  "key": "consume-prep-milk",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-in-prep"
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
                      "value": "2026-07-07T10:23:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.15
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-07T10:23:00.000Z"
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
                      "value": "2026-07-01T08:30:00.000Z"
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
                      "value": 20
                    },
                    {
                      "name": "resultingBalance",
                      "value": 45
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
                  "key": "adj-sugar-loss",
                  "columns": [
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.white-sugar"
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
                        "ref": "local:DailyShift.shift-july2"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T16:00:00.000Z"
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
                      "value": "Spilled bag"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    }
                  ],
                  "children": []
                },
                {
                  "key": "adj-beans-voided",
                  "columns": [
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.coffee-beans"
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
                      "value": "2026-07-07T09:00:00.000Z"
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
                      "value": 12
                    },
                    {
                      "name": "notes",
                      "value": "Miscount corrected later"
                    },
                    {
                      "name": "voidedAt",
                      "value": "2026-07-07T09:45:00.000Z"
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
                      "value": "2026-07-01"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 486.5
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 32
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 71
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 18
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
                      "value": "white-sugar"
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
                      "value": "2026-07-07"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 94
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 6
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 11
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 4
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
                      "value": "whole-milk,white-sugar"
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
          "Wave3: 4 orders (served/ready/inPreparation/cancelled), consumptions for prepared orders, 3 stock adjustments incl voided, 2 dashboards for closed+open shifts"
        ]
      }
    },
    "status": "completed",
    "stepId": 7,
    "interaction": null,
    "nextSteps": null
  }
}
