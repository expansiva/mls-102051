{
  "savedAt": "2026-07-25T23:46:35.160Z",
  "agentName": "agentCbSeeds",
  "stepId": 147,
  "planning": {
    "planId": "cb-gen-seeds-w3-r1-1785023146490",
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
          "summary": "Orders across served/in-prep/ready/cancelled on closed and open shifts; stock consumptions for active orders; posted and voided stock adjustments; operational dashboards per shift with low-stock signals.",
          "localTables": [
            {
              "tableId": "Order",
              "rows": [
                {
                  "key": "order-served-01",
                  "columns": [
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
                      "value": "Extra foam"
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
                  "key": "order-prep-06",
                  "columns": [
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
                      "value": "inPreparation"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-06T10:05:00.000Z"
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
                      "value": 18
                    },
                    {
                      "name": "notes",
                      "value": "No sugar"
                    },
                    {
                      "name": "registeredAt",
                      "value": "2026-07-06T10:05:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-06T10:06:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-06T10:08:00.000Z"
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
                      "value": "2026-07-06T10:08:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order-ready-06",
                  "columns": [
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
                      "value": "ready"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-06T11:20:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "tableNumber",
                      "value": "2"
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
                      "value": "2026-07-06T11:20:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-06T11:21:00.000Z"
                    },
                    {
                      "name": "inPreparationAt",
                      "value": "2026-07-06T11:23:00.000Z"
                    },
                    {
                      "name": "readyAt",
                      "value": "2026-07-06T11:40:00.000Z"
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
                      "value": "2026-07-06T11:40:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "order-cancelled-03",
                  "columns": [
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
                      "value": "2026-07-03T14:10:00.000Z"
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
                      "value": "2026-07-03T14:10:00.000Z"
                    },
                    {
                      "name": "confirmedAt",
                      "value": "2026-07-03T14:11:00.000Z"
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
                      "value": "2026-07-03T14:18:00.000Z"
                    },
                    {
                      "name": "cancellationReason",
                      "value": "Customer no-show"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-03T14:18:00.000Z"
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
                        "ref": "local:Order.order-served-01"
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
                        "ref": "local:Order.order-served-01"
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
                  "key": "consume-prep-milk",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-prep-06"
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
                      "value": "2026-07-06T10:08:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.25
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-06T10:08:00.000Z"
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
                  "key": "consume-cancelled-void",
                  "columns": [
                    {
                      "name": "order_id",
                      "value": {
                        "ref": "local:Order.order-cancelled-03"
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
                      "value": "voided"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-03T14:12:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "quantity",
                      "value": 0.03
                    },
                    {
                      "name": "occurredAt",
                      "value": "2026-07-03T14:12:00.000Z"
                    },
                    {
                      "name": "voidedAt",
                      "value": "2026-07-03T14:18:00.000Z"
                    },
                    {
                      "name": "voidReason",
                      "value": "Order cancelled before prep"
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
                  "key": "adj-beans-in",
                  "columns": [
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
                      "value": 5
                    },
                    {
                      "name": "resultingBalance",
                      "value": 12.5
                    },
                    {
                      "name": "notes",
                      "value": "Morning delivery count"
                    },
                    {
                      "name": "voidedAt",
                      "value": null
                    }
                  ],
                  "children": []
                },
                {
                  "key": "adj-milk-loss",
                  "columns": [
                    {
                      "name": "stock_item_id",
                      "value": {
                        "ref": "mdm:StockItem.whole-milk"
                      }
                    },
                    {
                      "name": "direction",
                      "value": "out"
                    },
                    {
                      "name": "reason",
                      "value": "expiration"
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
                      "value": "posted"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-03T16:00:00.000Z"
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
                      "value": "Expired carton discarded"
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
                      "value": "voided"
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-06T09:00:00.000Z"
                    },
                    {
                      "name": "voided_by_user_id",
                      "value": {
                        "ref": "actor:gerente.u2"
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
                      "value": 20
                    },
                    {
                      "name": "notes",
                      "value": "Miscount corrected later"
                    },
                    {
                      "name": "voidedAt",
                      "value": "2026-07-06T09:45:00.000Z"
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
                      "value": "2026-07-01T18:00:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-01"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 420.5
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 28
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 65
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
                      "value": "whole-milk"
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
                      "value": "2026-07-01T18:00:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "dash-july-03",
                  "columns": [
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
                      "value": "2026-07-03T18:30:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-03"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 385
                    },
                    {
                      "name": "todayOrdersCount",
                      "value": 24
                    },
                    {
                      "name": "todayItemsSold",
                      "value": 58
                    },
                    {
                      "name": "topMenuItemQuantity",
                      "value": 15
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
                      "value": "whole-milk,cheddar"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-03T18:30:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-03T18:30:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "dash-july-06",
                  "columns": [
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
                      "value": "2026-07-06T12:00:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "referenceDate",
                      "value": "2026-07-06"
                    },
                    {
                      "name": "todaySalesTotal",
                      "value": 156
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
                      "value": 7
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
                      "value": "sourdough-loaf"
                    },
                    {
                      "name": "hasLowStockAlert",
                      "value": true
                    },
                    {
                      "name": "lastComputedAt",
                      "value": "2026-07-06T12:00:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-06T12:00:00.000Z"
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
          "Wave3: Orders served/inPrep/ready/cancelled on prior shifts",
          "StockConsumption posted for active orders plus voided for cancelled",
          "StockAdjustment in/out/voided with manager actors",
          "OperationalDashboard per shift with top menu and low-stock flags"
        ]
      }
    },
    "status": "completed",
    "stepId": 7,
    "interaction": null,
    "nextSteps": null
  }
}
