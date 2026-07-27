{
  "savedAt": "2026-07-25T23:47:24.378Z",
  "agentName": "agentCbSeeds",
  "stepId": 148,
  "planning": {
    "planId": "cb-gen-seeds-w3-r2-1785023195163",
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
          "summary": "Orders across served/cancelled/in-prep/ready on closed and open shifts; stock consumptions for prepared orders; posted and voided stock adjustments; operational dashboards per shift with sales and low-stock metrics.",
          "localTables": [
            {
              "tableId": "Order",
              "rows": [
                {
                  "key": "order-table-served",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july-01"
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
                  "key": "order-takeout-cancelled",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july-03"
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
                      "value": "2026-07-03T11:05:00.000Z"
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
                      "value": 12
                    },
                    {
                      "name": "notes",
                      "value": null
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-03T11:05:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-03T11:06:00.000Z"
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
                      "value": "2026-07-03T11:12:00.000Z"
                    },
                    {
                      "name": "cancellationReason",
                      "value": "Customer left before pickup"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-03T11:12:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order-table-inprep",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july-06"
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
                      "value": "2026-07-06T10:20:00.000Z"
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
                      "value": "2026-07-06T10:20:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-06T10:21:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-06T10:25:00.000Z"
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
                      "value": "2026-07-06T10:25:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order-takeout-ready",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july-06"
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
                      "value": "2026-07-06T09:40:00.000Z"
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
                      "value": "For pickup"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-06T09:40:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-06T09:41:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-06T09:45:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-06T09:55:00.000Z"
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
                      "value": "2026-07-06T09:55:00.000Z"
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
                  "key": "consume-served-milk",
                  "columns": [
                    {
                      "name": "stock_consumption_id",
                      "value": null
                    },
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
                  "key": "consume-served-beans",
                  "columns": [
                    {
                      "name": "stock_consumption_id",
                      "value": null
                    },
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
                  "key": "consume-ready-beans",
                  "columns": [
                    {
                      "name": "stock_consumption_id",
                      "value": null
                    },
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
                      "value": "2026-07-06T09:45:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.018
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-06T09:45:00.000Z"
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
                  "key": "consume-inprep-bread",
                  "columns": [
                    {
                      "name": "stock_consumption_id",
                      "value": null
                    },
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-table-inprep"
                      }
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.sourdough-loaf"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-06T10:25:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.15
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-06T10:25:00.000Z"
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
                  "key": "adj-milk-count",
                  "columns": [
                    {
                      "name": "stock_adjustment_id",
                      "value": null
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.whole-milk"
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
                        "ref": "local:DailyShift.shift-july-01"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-01T16:30:00.000Z"
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
                      "value": "End-of-shift physical count"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    }
                  ],
                  "children": []
                },
                {
                  "key": "adj-sugar-loss-voided",
                  "columns": [
                    {
                      "name": "stock_adjustment_id",
                      "value": null
                    },
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
                        "ref": "actor:gerente.u2"
                      }
                    },
                    {
                      "name": "shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july-03"
                      }
                    },
                    {
                      "name": "status",
                      "value": "voided"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-03T14:10:00.000Z"
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
                      "value": 9
                    },
                    {
                      "name": "notes",
                      "value": "Spillage reported then reversed"
                    },
                    {
                      "name": "voidedAt",
                      "value": "2026-07-03T14:40:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "adj-beans-in",
                  "columns": [
                    {
                      "name": "stock_adjustment_id",
                      "value": null
                    },
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.coffee-beans"
                      }
                    },
                    {
                      "name": "direction",
                      "value": "in"
                    },
                    {
                      "name": "reason",
                      "value": "other"
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
                        "ref": "local:DailyShift.shift-july-06"
                      }
                    },
                    {
                      "name": "status",
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-06T08:15:00.000Z"
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
                      "value": 22
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
                }
              ]
            },
            {
              "tableId": "OperationalDashboard",
              "rows": [
                {
                  "key": "dash-july-01",
                  "columns": [
                    {
                      "name": "operational_dashboard_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july-01"
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
                      "value": "2026-07-01T17:05:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-01T00:00:00.000Z"
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
                      "value": 95
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
                      "value": "whole-milk"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-01T17:00:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T17:05:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "dash-july-03",
                  "columns": [
                    {
                      "name": "operational_dashboard_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july-03"
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
                      "value": "2026-07-03T17:10:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-03T00:00:00.000Z"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 512
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 48
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 110
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 32
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
                      "value": "white-sugar,cheddar"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-03T17:05:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-03T17:10:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "dash-july-06",
                  "columns": [
                    {
                      "name": "operational_dashboard_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shift-july-06"
                      }
                    },
                    {
                      "name": "top_menu_item_id",
                      "value": {
                        "ref": "mdm:MenuItem.iced-latte"
                      }
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-06T10:30:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-06T00:00:00.000Z"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 156.5
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 14
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 31
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
                      "value": 1
                    },
                    {
                      "name": "outOfStockItemsCount",
                      "value": 0
                    },
                    {
                      "name": "lowStockItemIds",
                      "value": "cheddar"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-06T10:30:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-06T10:30:00.000Z"
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
          "Fixed referenceDate to full ISO-8601 UTC on all OperationalDashboard rows",
          "Orders: served, cancelled, inPreparation, ready across closed and open shifts",
          "StockConsumption linked to prepared orders; StockAdjustment posted and voided",
          "Dashboards one per prior DailyShift with sales and low-stock metrics"
        ]
      }
    },
    "status": "completed",
    "stepId": 7,
    "interaction": null,
    "nextSteps": null
  }
}
