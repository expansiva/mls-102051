/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>

// Deterministic initial data for cafeFlow. Scenario planned by agentCbSeeds; rows and ids compiled locally.
// TableSeedRows exports are discovered by shape and merged by the persistence registry.

/* <agentCbSeedsPlan>
{
  "version": 1,
  "moduleName": "cafeFlow",
  "language": "en",
  "plan": {
    "summary": "Wave 3: orders across main kitchen lifecycle on closed/open shifts, auto stock consumptions for served orders, manager stock adjustments, and operational dashboards with sales/low-stock metrics.",
    "localTables": [
      {
        "tableId": "DailyShift",
        "rows": [
          {
            "key": "shift_july1_closed",
            "columns": [
              {
                "name": "daily_shift_id",
                "value": null
              },
              {
                "name": "status",
                "value": "closed"
              },
              {
                "name": "opened_by_user_id",
                "value": {
                  "ref": "actor:atendente.u1"
                }
              },
              {
                "name": "closed_by_user_id",
                "value": {
                  "ref": "actor:gerente.u1"
                }
              },
              {
                "name": "created_at",
                "value": "2026-07-01T07:55:00.000Z"
              }
            ],
            "details": [
              {
                "name": "shiftDate",
                "value": "2026-07-01T00:00:00.000Z"
              },
              {
                "name": "openedAt",
                "value": "2026-07-01T08:00:00.000Z"
              },
              {
                "name": "closedAt",
                "value": "2026-07-01T20:05:00.000Z"
              },
              {
                "name": "totalOrders",
                "value": 42
              },
              {
                "name": "totalSalesAmount",
                "value": 1860.5
              },
              {
                "name": "totalItemsSold",
                "value": 95
              },
              {
                "name": "cashTotal",
                "value": 720
              },
              {
                "name": "otherPaymentsTotal",
                "value": 1140.5
              },
              {
                "name": "notes",
                "value": "Steady weekday traffic"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T20:05:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "shift_july2_closed",
            "columns": [
              {
                "name": "daily_shift_id",
                "value": null
              },
              {
                "name": "status",
                "value": "closed"
              },
              {
                "name": "opened_by_user_id",
                "value": {
                  "ref": "actor:atendente.u2"
                }
              },
              {
                "name": "closed_by_user_id",
                "value": {
                  "ref": "actor:gerente.u1"
                }
              },
              {
                "name": "created_at",
                "value": "2026-07-02T07:50:00.000Z"
              }
            ],
            "details": [
              {
                "name": "shiftDate",
                "value": "2026-07-02T00:00:00.000Z"
              },
              {
                "name": "openedAt",
                "value": "2026-07-02T08:00:00.000Z"
              },
              {
                "name": "closedAt",
                "value": "2026-07-02T20:10:00.000Z"
              },
              {
                "name": "totalOrders",
                "value": 38
              },
              {
                "name": "totalSalesAmount",
                "value": 1645
              },
              {
                "name": "totalItemsSold",
                "value": 88
              },
              {
                "name": "cashTotal",
                "value": 610.5
              },
              {
                "name": "otherPaymentsTotal",
                "value": 1034.5
              },
              {
                "name": "notes",
                "value": "Slightly quieter afternoon"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T20:10:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "shift_july5_open",
            "columns": [
              {
                "name": "daily_shift_id",
                "value": null
              },
              {
                "name": "status",
                "value": "open"
              },
              {
                "name": "opened_by_user_id",
                "value": {
                  "ref": "actor:atendente.u1"
                }
              },
              {
                "name": "closed_by_user_id",
                "value": null
              },
              {
                "name": "created_at",
                "value": "2026-07-05T07:58:00.000Z"
              }
            ],
            "details": [
              {
                "name": "shiftDate",
                "value": "2026-07-05T00:00:00.000Z"
              },
              {
                "name": "openedAt",
                "value": "2026-07-05T08:00:00.000Z"
              },
              {
                "name": "closedAt",
                "value": null
              },
              {
                "name": "totalOrders",
                "value": 12
              },
              {
                "name": "totalSalesAmount",
                "value": 485.75
              },
              {
                "name": "totalItemsSold",
                "value": 27
              },
              {
                "name": "cashTotal",
                "value": 190
              },
              {
                "name": "otherPaymentsTotal",
                "value": 295.75
              },
              {
                "name": "notes",
                "value": "Morning service in progress"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-05T11:30:00.000Z"
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
      },
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
        "tableId": "ShiftClosingReport",
        "rows": [
          {
            "key": "report_july1",
            "columns": [
              {
                "name": "shift_closing_report_id",
                "value": null
              },
              {
                "name": "daily_shift_id",
                "value": {
                  "ref": "local:DailyShift.shift_july1_closed"
                }
              },
              {
                "name": "created_at",
                "value": "2026-07-01T20:06:00.000Z"
              }
            ],
            "details": [
              {
                "name": "shiftDate",
                "value": "2026-07-01T00:00:00.000Z"
              },
              {
                "name": "totalSalesAmount",
                "value": 1860.5
              },
              {
                "name": "totalOrdersCount",
                "value": 42
              },
              {
                "name": "totalItemsSold",
                "value": 95
              },
              {
                "name": "cashPaymentsAmount",
                "value": 720
              },
              {
                "name": "otherPaymentsAmount",
                "value": 1140.5
              },
              {
                "name": "topSellingItemsSummary",
                "value": "Espresso, Cappuccino, Brownie"
              },
              {
                "name": "lowStockSignalsCount",
                "value": 2
              },
              {
                "name": "stockoutSignalsCount",
                "value": 0
              },
              {
                "name": "closingNotes",
                "value": "Milk running low near close"
              },
              {
                "name": "generatedAt",
                "value": "2026-07-01T20:06:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T20:06:00.000Z"
              }
            ],
            "children": []
          },
          {
            "key": "report_july2",
            "columns": [
              {
                "name": "shift_closing_report_id",
                "value": null
              },
              {
                "name": "daily_shift_id",
                "value": {
                  "ref": "local:DailyShift.shift_july2_closed"
                }
              },
              {
                "name": "created_at",
                "value": "2026-07-02T20:11:00.000Z"
              }
            ],
            "details": [
              {
                "name": "shiftDate",
                "value": "2026-07-02T00:00:00.000Z"
              },
              {
                "name": "totalSalesAmount",
                "value": 1645
              },
              {
                "name": "totalOrdersCount",
                "value": 38
              },
              {
                "name": "totalItemsSold",
                "value": 88
              },
              {
                "name": "cashPaymentsAmount",
                "value": 610.5
              },
              {
                "name": "otherPaymentsAmount",
                "value": 1034.5
              },
              {
                "name": "topSellingItemsSummary",
                "value": "Latte, Sourdough sandwich, Cheesecake"
              },
              {
                "name": "lowStockSignalsCount",
                "value": 1
              },
              {
                "name": "stockoutSignalsCount",
                "value": 1
              },
              {
                "name": "closingNotes",
                "value": "Chocolate sauce depleted mid-shift"
              },
              {
                "name": "generatedAt",
                "value": "2026-07-02T20:11:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T20:11:00.000Z"
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
      }
    ],
    "mdmEntities": [
      {
        "entityId": "MenuCategory",
        "rows": [
          {
            "key": "beverages",
            "fields": [
              {
                "name": "name",
                "value": "Beverages"
              },
              {
                "name": "displayOrder",
                "value": 1
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:00:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "food",
            "fields": [
              {
                "name": "name",
                "value": "Food"
              },
              {
                "name": "displayOrder",
                "value": 2
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:05:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:05:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "desserts",
            "fields": [
              {
                "name": "name",
                "value": "Desserts"
              },
              {
                "name": "displayOrder",
                "value": 3
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:10:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T08:10:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "seasonal",
            "fields": [
              {
                "name": "name",
                "value": "Seasonal"
              },
              {
                "name": "displayOrder",
                "value": 4
              },
              {
                "name": "status",
                "value": "inactive"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T08:15:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-03T14:00:00.000Z"
              }
            ],
            "relationships": []
          }
        ]
      },
      {
        "entityId": "MenuItem",
        "rows": [
          {
            "key": "espresso",
            "fields": [
              {
                "name": "name",
                "value": "Espresso"
              },
              {
                "name": "description",
                "value": "Single shot of house espresso"
              },
              {
                "name": "price",
                "value": 8
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "pausedAt",
                "value": null
              },
              {
                "name": "pauseReason",
                "value": null
              },
              {
                "name": "imageUrl",
                "value": {
                  "asset": "MenuItem/espresso",
                  "kind": "image"
                }
              },
              {
                "name": "displayOrder",
                "value": 1
              },
              {
                "name": "requiresStockLink",
                "value": true
              },
              {
                "name": "menuCategoryId",
                "value": {
                  "ref": "mdm:MenuCategory.beverages"
                }
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T06:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T06:00:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "cappuccino",
            "fields": [
              {
                "name": "name",
                "value": "Cappuccino"
              },
              {
                "name": "description",
                "value": "Espresso with steamed milk foam"
              },
              {
                "name": "price",
                "value": 14
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "pausedAt",
                "value": null
              },
              {
                "name": "pauseReason",
                "value": null
              },
              {
                "name": "imageUrl",
                "value": {
                  "asset": "MenuItem/cappuccino",
                  "kind": "image"
                }
              },
              {
                "name": "displayOrder",
                "value": 2
              },
              {
                "name": "requiresStockLink",
                "value": true
              },
              {
                "name": "menuCategoryId",
                "value": {
                  "ref": "mdm:MenuCategory.beverages"
                }
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T06:05:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T06:05:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "sourdoughSandwich",
            "fields": [
              {
                "name": "name",
                "value": "Sourdough sandwich"
              },
              {
                "name": "description",
                "value": "Ham and cheese on fresh sourdough"
              },
              {
                "name": "price",
                "value": 22
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "pausedAt",
                "value": null
              },
              {
                "name": "pauseReason",
                "value": null
              },
              {
                "name": "imageUrl",
                "value": {
                  "asset": "MenuItem/sourdoughSandwich",
                  "kind": "image"
                }
              },
              {
                "name": "displayOrder",
                "value": 1
              },
              {
                "name": "requiresStockLink",
                "value": true
              },
              {
                "name": "menuCategoryId",
                "value": {
                  "ref": "mdm:MenuCategory.food"
                }
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T06:10:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T06:10:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "brownie",
            "fields": [
              {
                "name": "name",
                "value": "Brownie"
              },
              {
                "name": "description",
                "value": "Warm chocolate brownie"
              },
              {
                "name": "price",
                "value": 12
              },
              {
                "name": "status",
                "value": "active"
              },
              {
                "name": "pausedAt",
                "value": null
              },
              {
                "name": "pauseReason",
                "value": null
              },
              {
                "name": "imageUrl",
                "value": {
                  "asset": "MenuItem/brownie",
                  "kind": "image"
                }
              },
              {
                "name": "displayOrder",
                "value": 1
              },
              {
                "name": "requiresStockLink",
                "value": true
              },
              {
                "name": "menuCategoryId",
                "value": {
                  "ref": "mdm:MenuCategory.desserts"
                }
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T06:15:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-01T06:15:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "seasonalLatte",
            "fields": [
              {
                "name": "name",
                "value": "Seasonal latte"
              },
              {
                "name": "description",
                "value": "Limited latte with chocolate sauce"
              },
              {
                "name": "price",
                "value": 16
              },
              {
                "name": "status",
                "value": "paused"
              },
              {
                "name": "pausedAt",
                "value": "2026-07-02T14:00:00.000Z"
              },
              {
                "name": "pauseReason",
                "value": "Chocolate sauce stockout"
              },
              {
                "name": "imageUrl",
                "value": {
                  "asset": "MenuItem/seasonalLatte",
                  "kind": "image"
                }
              },
              {
                "name": "displayOrder",
                "value": 1
              },
              {
                "name": "requiresStockLink",
                "value": true
              },
              {
                "name": "menuCategoryId",
                "value": {
                  "ref": "mdm:MenuCategory.seasonal"
                }
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T06:20:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-02T14:00:00.000Z"
              }
            ],
            "relationships": []
          }
        ]
      },
      {
        "entityId": "StockItem",
        "rows": [
          {
            "key": "coffeeBeans",
            "fields": [
              {
                "name": "name",
                "value": "Coffee beans"
              },
              {
                "name": "unit",
                "value": "kg"
              },
              {
                "name": "currentBalance",
                "value": 12.5
              },
              {
                "name": "minimumLevel",
                "value": 5
              },
              {
                "name": "description",
                "value": "Arabica blend for espresso and filter"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T09:00:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-05T11:30:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "wholeMilk",
            "fields": [
              {
                "name": "name",
                "value": "Whole milk"
              },
              {
                "name": "unit",
                "value": "liter"
              },
              {
                "name": "currentBalance",
                "value": 2
              },
              {
                "name": "minimumLevel",
                "value": 8
              },
              {
                "name": "description",
                "value": "Fresh whole milk for lattes and cappuccinos"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T09:05:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-06T16:00:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "sourdough",
            "fields": [
              {
                "name": "name",
                "value": "Sourdough loaf"
              },
              {
                "name": "unit",
                "value": "unit"
              },
              {
                "name": "currentBalance",
                "value": 18
              },
              {
                "name": "minimumLevel",
                "value": 6
              },
              {
                "name": "description",
                "value": "Daily bakery loaves for sandwiches"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T09:10:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-04T07:45:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "sugarPackets",
            "fields": [
              {
                "name": "name",
                "value": "Sugar packets"
              },
              {
                "name": "unit",
                "value": "portion"
              },
              {
                "name": "currentBalance",
                "value": 40
              },
              {
                "name": "minimumLevel",
                "value": 50
              },
              {
                "name": "description",
                "value": "Single-serve white sugar"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T09:15:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-06T10:20:00.000Z"
              }
            ],
            "relationships": []
          },
          {
            "key": "chocolateSauce",
            "fields": [
              {
                "name": "name",
                "value": "Chocolate sauce"
              },
              {
                "name": "unit",
                "value": "liter"
              },
              {
                "name": "currentBalance",
                "value": 3.2
              },
              {
                "name": "minimumLevel",
                "value": 1.5
              },
              {
                "name": "description",
                "value": "Sauce for mochas and desserts"
              },
              {
                "name": "createdAt",
                "value": "2026-07-01T09:20:00.000Z"
              },
              {
                "name": "updatedAt",
                "value": "2026-07-05T18:00:00.000Z"
              }
            ],
            "relationships": []
          }
        ]
      }
    ]
  }
}
</agentCbSeedsPlan> */

// <agentCbSeedAssetUrls>
const seedAssetUrls: Record<string, string> = {
  "MenuItem/brownie": "/cafeFlow/assets/seed/MenuItem/brownie.webp",
  "MenuItem/butter-croissant": "/cafeFlow/assets/seed/MenuItem/butter-croissant.webp",
  "MenuItem/caesarSalad": "/cafeFlow/assets/seed/MenuItem/caesarSalad.webp",
  "MenuItem/cappuccino": "/cafeFlow/assets/seed/MenuItem/cappuccino.webp",
  "MenuItem/cheese-croissant": "/cafeFlow/assets/seed/MenuItem/cheese-croissant.webp",
  "MenuItem/cheeseSandwich": "/cafeFlow/assets/seed/MenuItem/cheeseSandwich.webp",
  "MenuItem/espresso": "/cafeFlow/assets/seed/MenuItem/espresso.webp",
  "MenuItem/ham-sandwich": "/cafeFlow/assets/seed/MenuItem/ham-sandwich.webp",
  "MenuItem/iced-latte": "/cafeFlow/assets/seed/MenuItem/iced-latte.webp",
  "MenuItem/seasonal-latte": "/cafeFlow/assets/seed/MenuItem/seasonal-latte.webp",
  "MenuItem/seasonalLatte": "/cafeFlow/assets/seed/MenuItem/seasonalLatte.webp",
  "MenuItem/seasonalSpecial": "/cafeFlow/assets/seed/MenuItem/seasonalSpecial.webp",
  "MenuItem/sourdoughSandwich": "/cafeFlow/assets/seed/MenuItem/sourdoughSandwich.webp"
};
const seedAssetWarnings: string[] = [];
// </agentCbSeedAssetUrls>

function seedAssetUrl(assetId: string): string | null { return seedAssetUrls[assetId] ?? null; }

import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const dailyShiftSeeds: TableSeedRows = {
  "seedFor": "cafeFlowDailyShift",
  "rows": [
    {
      "daily_shift_id": "e2af8079-e1af-4ee6-80af-7d53dfaf7bc0",
      "status": "closed",
      "opened_by_user_id": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
      "closed_by_user_id": "92796e03-9179-4c70-8479-712993796f96",
      "created_at": "2026-07-01T07:55:00.000Z"
    },
    {
      "daily_shift_id": "bf23a28a-c023-441d-8d23-9f64be23a0f7",
      "status": "closed",
      "opened_by_user_id": "4faf837a-50af-450d-8daf-80544eaf81e7",
      "closed_by_user_id": "92796e03-9179-4c70-8479-712993796f96",
      "created_at": "2026-07-02T07:50:00.000Z"
    },
    {
      "daily_shift_id": "8f572e25-8e57-4c92-8d57-2aff8c57296c",
      "status": "open",
      "opened_by_user_id": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
      "closed_by_user_id": null,
      "created_at": "2026-07-05T07:58:00.000Z"
    }
  ]
};

export const operationalDashboardSeeds: TableSeedRows = {
  "seedFor": "cafeFlowOperationalDashboard",
  "rows": [
    {
      "operational_dashboard_id": "3cfc904d-3bfc-4eba-8afc-8d2739fc8b94",
      "daily_shift_id": "e2af8079-e1af-4ee6-80af-7d53dfaf7bc0",
      "top_menu_item_id": "2bd5a093-2ad5-4f00-8dd5-a3b92cd5a226",
      "created_at": "2026-07-01T18:05:00.000Z"
    },
    {
      "operational_dashboard_id": "81893751-8089-45be-8f89-342b7e893298",
      "daily_shift_id": "8f572e25-8e57-4c92-8d57-2aff8c57296c",
      "top_menu_item_id": "03e1c348-04e1-44db-85e1-c66e06e1c801",
      "created_at": "2026-07-05T11:15:00.000Z"
    }
  ]
};

export const orderSeeds: TableSeedRows = {
  "seedFor": "cafeFlowOrder",
  "rows": [
    {
      "order_id": "ac13a583-ab13-43f0-8e13-a8a9ad13a716",
      "daily_shift_id": "e2af8079-e1af-4ee6-80af-7d53dfaf7bc0",
      "order_type": "table",
      "status": "served",
      "created_at": "2026-07-01T09:15:00.000Z"
    },
    {
      "order_id": "050c3da2-060c-4f35-830c-3a7c040c3c0f",
      "daily_shift_id": "8f572e25-8e57-4c92-8d57-2aff8c57296c",
      "order_type": "table",
      "status": "inPreparation",
      "created_at": "2026-07-05T10:05:00.000Z"
    },
    {
      "order_id": "6aa561d5-69a5-4042-88a5-5eaf67a55d1c",
      "daily_shift_id": "8f572e25-8e57-4c92-8d57-2aff8c57296c",
      "order_type": "takeout",
      "status": "ready",
      "created_at": "2026-07-05T10:20:00.000Z"
    },
    {
      "order_id": "2502dd4a-2602-4edd-8302-da242402dbb7",
      "daily_shift_id": "8f572e25-8e57-4c92-8d57-2aff8c57296c",
      "order_type": "takeout",
      "status": "registered",
      "created_at": "2026-07-05T11:00:00.000Z"
    }
  ]
};

export const shiftClosingReportSeeds: TableSeedRows = {
  "seedFor": "cafeFlowShiftClosingReport",
  "rows": [
    {
      "shift_closing_report_id": "8a56ce60-8b56-4ff3-8c56-d1868d56d319",
      "daily_shift_id": "e2af8079-e1af-4ee6-80af-7d53dfaf7bc0",
      "created_at": "2026-07-01T20:06:00.000Z"
    },
    {
      "shift_closing_report_id": "2aa97585-29a9-43f2-88a9-725f27a970cc",
      "daily_shift_id": "bf23a28a-c023-441d-8d23-9f64be23a0f7",
      "created_at": "2026-07-02T20:11:00.000Z"
    }
  ]
};

export const stockAdjustmentSeeds: TableSeedRows = {
  "seedFor": "cafeFlowStockAdjustment",
  "rows": [
    {
      "stock_adjustment_id": "7ad7d0fb-79d7-4f68-8cd7-d4217bd7d28e",
      "stock_item_id": "46b981c9-45b9-4036-84b9-7ea343b97d10",
      "direction": "correction",
      "reason": "count",
      "manager_user_id": "92796e03-9179-4c70-8479-712993796f96",
      "shift_id": "8f572e25-8e57-4c92-8d57-2aff8c57296c",
      "status": "posted",
      "created_at": "2026-07-05T08:30:00.000Z",
      "voided_by_user_id": null,
      "compensating_adjustment_id": null
    },
    {
      "stock_adjustment_id": "052ee627-042e-4494-872e-e94d062ee7ba",
      "stock_item_id": "dca03b22-dda0-4cb5-8aa0-37fcdba0398f",
      "direction": "out",
      "reason": "loss",
      "manager_user_id": "92796e03-9179-4c70-8479-712993796f96",
      "shift_id": "e2af8079-e1af-4ee6-80af-7d53dfaf7bc0",
      "status": "posted",
      "created_at": "2026-07-01T16:45:00.000Z",
      "voided_by_user_id": null,
      "compensating_adjustment_id": null
    }
  ]
};

export const stockConsumptionSeeds: TableSeedRows = {
  "seedFor": "cafeFlowStockConsumption",
  "rows": [
    {
      "stock_consumption_id": "fd6c9e00-fe6c-4f93-8f6c-a126006ca2b9",
      "order_id": "ac13a583-ab13-43f0-8e13-a8a9ad13a716",
      "stock_item_id": "dc3eec8e-dd3e-4e21-8a3e-e968db3eeafb",
      "status": "posted",
      "created_at": "2026-07-01T09:32:00.000Z"
    },
    {
      "stock_consumption_id": "70c7c19e-71c7-4331-8ec7-be786fc7c00b",
      "order_id": "ac13a583-ab13-43f0-8e13-a8a9ad13a716",
      "stock_item_id": "46b981c9-45b9-4036-84b9-7ea343b97d10",
      "status": "posted",
      "created_at": "2026-07-01T09:32:05.000Z"
    }
  ]
};

export const mdmEntityIndexSeeds: TableSeedRows = {
  "seedFor": "mdmEntityIndex",
  "rows": [
    {
      "mdmId": "29353d3d-2835-4baa-8735-3a1726353884",
      "subtype": "Product",
      "name": "Beverages",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "beverages menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "29353d3d-2835-4baa-8735-3a1726353884",
      "createdAt": "2026-07-01T08:00:00.000Z",
      "updatedAt": "2026-07-01T08:00:00.000Z"
    },
    {
      "mdmId": "1a92844d-1992-42ba-8892-812717927f94",
      "subtype": "Product",
      "name": "Food",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "food menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "1a92844d-1992-42ba-8892-812717927f94",
      "createdAt": "2026-07-01T08:05:00.000Z",
      "updatedAt": "2026-07-01T08:05:00.000Z"
    },
    {
      "mdmId": "0850ee8a-0950-401d-8650-eb640750ecf7",
      "subtype": "Product",
      "name": "Desserts",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "desserts menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "0850ee8a-0950-401d-8650-eb640750ecf7",
      "createdAt": "2026-07-01T08:10:00.000Z",
      "updatedAt": "2026-07-01T08:10:00.000Z"
    },
    {
      "mdmId": "90661b1d-8f66-498a-8e66-17f78d661664",
      "subtype": "Product",
      "name": "Seasonal",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "seasonal menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "90661b1d-8f66-498a-8e66-17f78d661664",
      "createdAt": "2026-07-01T08:15:00.000Z",
      "updatedAt": "2026-07-03T14:00:00.000Z"
    },
    {
      "mdmId": "03e1c348-04e1-44db-85e1-c66e06e1c801",
      "subtype": "Product",
      "name": "Espresso",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuItem",
        "cafeFlow",
        "MenuItem"
      ],
      "searchVector": "espresso menuitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "03e1c348-04e1-44db-85e1-c66e06e1c801",
      "createdAt": "2026-07-01T06:00:00.000Z",
      "updatedAt": "2026-07-01T06:00:00.000Z"
    },
    {
      "mdmId": "2bd5a093-2ad5-4f00-8dd5-a3b92cd5a226",
      "subtype": "Product",
      "name": "Cappuccino",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuItem",
        "cafeFlow",
        "MenuItem"
      ],
      "searchVector": "cappuccino menuitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "2bd5a093-2ad5-4f00-8dd5-a3b92cd5a226",
      "createdAt": "2026-07-01T06:05:00.000Z",
      "updatedAt": "2026-07-01T06:05:00.000Z"
    },
    {
      "mdmId": "efb0dedd-eeb0-4d4a-8db0-dbb7ecb0da24",
      "subtype": "Product",
      "name": "Sourdough sandwich",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuItem",
        "cafeFlow",
        "MenuItem"
      ],
      "searchVector": "sourdough sandwich menuitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "efb0dedd-eeb0-4d4a-8db0-dbb7ecb0da24",
      "createdAt": "2026-07-01T06:10:00.000Z",
      "updatedAt": "2026-07-01T06:10:00.000Z"
    },
    {
      "mdmId": "04776ea2-0577-4035-8277-6b7c03776d0f",
      "subtype": "Product",
      "name": "Brownie",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuItem",
        "cafeFlow",
        "MenuItem"
      ],
      "searchVector": "brownie menuitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "04776ea2-0577-4035-8277-6b7c03776d0f",
      "createdAt": "2026-07-01T06:15:00.000Z",
      "updatedAt": "2026-07-01T06:15:00.000Z"
    },
    {
      "mdmId": "6043aa16-6143-4ba9-8e43-a6f05f43a883",
      "subtype": "Product",
      "name": "Seasonal latte",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuItem",
        "cafeFlow",
        "MenuItem"
      ],
      "searchVector": "seasonal latte menuitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "6043aa16-6143-4ba9-8e43-a6f05f43a883",
      "createdAt": "2026-07-01T06:20:00.000Z",
      "updatedAt": "2026-07-02T14:00:00.000Z"
    },
    {
      "mdmId": "dc3eec8e-dd3e-4e21-8a3e-e968db3eeafb",
      "subtype": "Product",
      "name": "Coffee beans",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "coffee beans stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "dc3eec8e-dd3e-4e21-8a3e-e968db3eeafb",
      "createdAt": "2026-07-01T09:00:00.000Z",
      "updatedAt": "2026-07-05T11:30:00.000Z"
    },
    {
      "mdmId": "46b981c9-45b9-4036-84b9-7ea343b97d10",
      "subtype": "Product",
      "name": "Whole milk",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "whole milk stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "46b981c9-45b9-4036-84b9-7ea343b97d10",
      "createdAt": "2026-07-01T09:05:00.000Z",
      "updatedAt": "2026-07-06T16:00:00.000Z"
    },
    {
      "mdmId": "b1ed63e1-b0ed-424e-8fed-60bbaeed5f28",
      "subtype": "Product",
      "name": "Sourdough loaf",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "sourdough loaf stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "b1ed63e1-b0ed-424e-8fed-60bbaeed5f28",
      "createdAt": "2026-07-01T09:10:00.000Z",
      "updatedAt": "2026-07-04T07:45:00.000Z"
    },
    {
      "mdmId": "0b7d5850-0c7d-49e3-8d7d-5b760e7d5d09",
      "subtype": "Product",
      "name": "Sugar packets",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "sugar packets stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "0b7d5850-0c7d-49e3-8d7d-5b760e7d5d09",
      "createdAt": "2026-07-01T09:15:00.000Z",
      "updatedAt": "2026-07-06T10:20:00.000Z"
    },
    {
      "mdmId": "dca03b22-dda0-4cb5-8aa0-37fcdba0398f",
      "subtype": "Product",
      "name": "Chocolate sauce",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "chocolate sauce stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "dca03b22-dda0-4cb5-8aa0-37fcdba0398f",
      "createdAt": "2026-07-01T09:20:00.000Z",
      "updatedAt": "2026-07-05T18:00:00.000Z"
    },
    {
      "mdmId": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
      "subtype": "Person",
      "name": "Atendente 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente 1 atendente cafeflow",
      "mergedInto": null,
      "dynamoPk": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "4faf837a-50af-450d-8daf-80544eaf81e7",
      "subtype": "Person",
      "name": "Atendente 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente 2 atendente cafeflow",
      "mergedInto": null,
      "dynamoPk": "4faf837a-50af-450d-8daf-80544eaf81e7",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "363d0001-353c-4e6e-843c-fcdb333cfb48",
      "subtype": "Person",
      "name": "Atendente 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "atendente"
      ],
      "searchVector": "atendente 3 atendente cafeflow",
      "mergedInto": null,
      "dynamoPk": "363d0001-353c-4e6e-843c-fcdb333cfb48",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "f3e1912b-f2e1-4f98-85e1-9451f4e192be",
      "subtype": "Person",
      "name": "Cozinheiro 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "cozinheiro"
      ],
      "searchVector": "cozinheiro 1 cozinheiro cafeflow",
      "mergedInto": null,
      "dynamoPk": "f3e1912b-f2e1-4f98-85e1-9451f4e192be",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "38439c5a-3943-4ded-8643-993437439ac7",
      "subtype": "Person",
      "name": "Cozinheiro 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "cozinheiro"
      ],
      "searchVector": "cozinheiro 2 cozinheiro cafeflow",
      "mergedInto": null,
      "dynamoPk": "38439c5a-3943-4ded-8643-993437439ac7",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "1ed118e1-1dd1-474e-8cd1-15bb1bd11428",
      "subtype": "Person",
      "name": "Cozinheiro 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "cozinheiro"
      ],
      "searchVector": "cozinheiro 3 cozinheiro cafeflow",
      "mergedInto": null,
      "dynamoPk": "1ed118e1-1dd1-474e-8cd1-15bb1bd11428",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "92796e03-9179-4c70-8479-712993796f96",
      "subtype": "Person",
      "name": "Gerente 1",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "gerente"
      ],
      "searchVector": "gerente 1 gerente cafeflow",
      "mergedInto": null,
      "dynamoPk": "92796e03-9179-4c70-8479-712993796f96",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "559d7b32-569d-4cc5-839d-780c549d799f",
      "subtype": "Person",
      "name": "Gerente 2",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "gerente"
      ],
      "searchVector": "gerente 2 gerente cafeflow",
      "mergedInto": null,
      "dynamoPk": "559d7b32-569d-4cc5-839d-780c549d799f",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    },
    {
      "mdmId": "3c2af7b9-3b2a-4626-8a2a-f493392af300",
      "subtype": "Person",
      "name": "Gerente 3",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.Person",
        "cafeFlow",
        "actor",
        "gerente"
      ],
      "searchVector": "gerente 3 gerente cafeflow",
      "mergedInto": null,
      "dynamoPk": "3c2af7b9-3b2a-4626-8a2a-f493392af300",
      "createdAt": "2026-07-01T00:00:00.000Z",
      "updatedAt": "2026-07-01T00:00:00.000Z"
    }
  ]
};

export const mdmDocumentSeeds: TableSeedRows = {
  "seedFor": "mdmDocumentCache",
  "rows": [
    {
      "mdmId": "29353d3d-2835-4baa-8735-3a1726353884",
      "version": 1,
      "details": {
        "mdmId": "29353d3d-2835-4baa-8735-3a1726353884",
        "subtype": "Product",
        "name": "Beverages",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuCategory",
          "cafeFlow",
          "MenuCategory"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:00:00.000Z",
        "updatedAt": "2026-07-01T08:00:00.000Z",
        "cafeFlow": {
          "name": "Beverages",
          "displayOrder": 1,
          "status": "active",
          "createdAt": "2026-07-01T08:00:00.000Z",
          "updatedAt": "2026-07-01T08:00:00.000Z",
          "menuCategoryId": "29353d3d-2835-4baa-8735-3a1726353884"
        }
      }
    },
    {
      "mdmId": "1a92844d-1992-42ba-8892-812717927f94",
      "version": 1,
      "details": {
        "mdmId": "1a92844d-1992-42ba-8892-812717927f94",
        "subtype": "Product",
        "name": "Food",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuCategory",
          "cafeFlow",
          "MenuCategory"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:05:00.000Z",
        "updatedAt": "2026-07-01T08:05:00.000Z",
        "cafeFlow": {
          "name": "Food",
          "displayOrder": 2,
          "status": "active",
          "createdAt": "2026-07-01T08:05:00.000Z",
          "updatedAt": "2026-07-01T08:05:00.000Z",
          "menuCategoryId": "1a92844d-1992-42ba-8892-812717927f94"
        }
      }
    },
    {
      "mdmId": "0850ee8a-0950-401d-8650-eb640750ecf7",
      "version": 1,
      "details": {
        "mdmId": "0850ee8a-0950-401d-8650-eb640750ecf7",
        "subtype": "Product",
        "name": "Desserts",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuCategory",
          "cafeFlow",
          "MenuCategory"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:10:00.000Z",
        "updatedAt": "2026-07-01T08:10:00.000Z",
        "cafeFlow": {
          "name": "Desserts",
          "displayOrder": 3,
          "status": "active",
          "createdAt": "2026-07-01T08:10:00.000Z",
          "updatedAt": "2026-07-01T08:10:00.000Z",
          "menuCategoryId": "0850ee8a-0950-401d-8650-eb640750ecf7"
        }
      }
    },
    {
      "mdmId": "90661b1d-8f66-498a-8e66-17f78d661664",
      "version": 1,
      "details": {
        "mdmId": "90661b1d-8f66-498a-8e66-17f78d661664",
        "subtype": "Product",
        "name": "Seasonal",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuCategory",
          "cafeFlow",
          "MenuCategory"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T08:15:00.000Z",
        "updatedAt": "2026-07-03T14:00:00.000Z",
        "cafeFlow": {
          "name": "Seasonal",
          "displayOrder": 4,
          "status": "inactive",
          "createdAt": "2026-07-01T08:15:00.000Z",
          "updatedAt": "2026-07-03T14:00:00.000Z",
          "menuCategoryId": "90661b1d-8f66-498a-8e66-17f78d661664"
        }
      }
    },
    {
      "mdmId": "03e1c348-04e1-44db-85e1-c66e06e1c801",
      "version": 1,
      "details": {
        "mdmId": "03e1c348-04e1-44db-85e1-c66e06e1c801",
        "subtype": "Product",
        "name": "Espresso",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuItem",
          "cafeFlow",
          "MenuItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T06:00:00.000Z",
        "updatedAt": "2026-07-01T06:00:00.000Z",
        "cafeFlow": {
          "name": "Espresso",
          "description": "Single shot of house espresso",
          "price": 8,
          "status": "active",
          "pausedAt": null,
          "pauseReason": null,
          "imageUrl": seedAssetUrl("MenuItem/espresso"),
          "displayOrder": 1,
          "requiresStockLink": true,
          "menuCategoryId": "29353d3d-2835-4baa-8735-3a1726353884",
          "createdAt": "2026-07-01T06:00:00.000Z",
          "updatedAt": "2026-07-01T06:00:00.000Z",
          "menuItemId": "03e1c348-04e1-44db-85e1-c66e06e1c801"
        }
      }
    },
    {
      "mdmId": "2bd5a093-2ad5-4f00-8dd5-a3b92cd5a226",
      "version": 1,
      "details": {
        "mdmId": "2bd5a093-2ad5-4f00-8dd5-a3b92cd5a226",
        "subtype": "Product",
        "name": "Cappuccino",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuItem",
          "cafeFlow",
          "MenuItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T06:05:00.000Z",
        "updatedAt": "2026-07-01T06:05:00.000Z",
        "cafeFlow": {
          "name": "Cappuccino",
          "description": "Espresso with steamed milk foam",
          "price": 14,
          "status": "active",
          "pausedAt": null,
          "pauseReason": null,
          "imageUrl": seedAssetUrl("MenuItem/cappuccino"),
          "displayOrder": 2,
          "requiresStockLink": true,
          "menuCategoryId": "29353d3d-2835-4baa-8735-3a1726353884",
          "createdAt": "2026-07-01T06:05:00.000Z",
          "updatedAt": "2026-07-01T06:05:00.000Z",
          "menuItemId": "2bd5a093-2ad5-4f00-8dd5-a3b92cd5a226"
        }
      }
    },
    {
      "mdmId": "efb0dedd-eeb0-4d4a-8db0-dbb7ecb0da24",
      "version": 1,
      "details": {
        "mdmId": "efb0dedd-eeb0-4d4a-8db0-dbb7ecb0da24",
        "subtype": "Product",
        "name": "Sourdough sandwich",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuItem",
          "cafeFlow",
          "MenuItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T06:10:00.000Z",
        "updatedAt": "2026-07-01T06:10:00.000Z",
        "cafeFlow": {
          "name": "Sourdough sandwich",
          "description": "Ham and cheese on fresh sourdough",
          "price": 22,
          "status": "active",
          "pausedAt": null,
          "pauseReason": null,
          "imageUrl": seedAssetUrl("MenuItem/sourdoughSandwich"),
          "displayOrder": 1,
          "requiresStockLink": true,
          "menuCategoryId": "1a92844d-1992-42ba-8892-812717927f94",
          "createdAt": "2026-07-01T06:10:00.000Z",
          "updatedAt": "2026-07-01T06:10:00.000Z",
          "menuItemId": "efb0dedd-eeb0-4d4a-8db0-dbb7ecb0da24"
        }
      }
    },
    {
      "mdmId": "04776ea2-0577-4035-8277-6b7c03776d0f",
      "version": 1,
      "details": {
        "mdmId": "04776ea2-0577-4035-8277-6b7c03776d0f",
        "subtype": "Product",
        "name": "Brownie",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuItem",
          "cafeFlow",
          "MenuItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T06:15:00.000Z",
        "updatedAt": "2026-07-01T06:15:00.000Z",
        "cafeFlow": {
          "name": "Brownie",
          "description": "Warm chocolate brownie",
          "price": 12,
          "status": "active",
          "pausedAt": null,
          "pauseReason": null,
          "imageUrl": seedAssetUrl("MenuItem/brownie"),
          "displayOrder": 1,
          "requiresStockLink": true,
          "menuCategoryId": "0850ee8a-0950-401d-8650-eb640750ecf7",
          "createdAt": "2026-07-01T06:15:00.000Z",
          "updatedAt": "2026-07-01T06:15:00.000Z",
          "menuItemId": "04776ea2-0577-4035-8277-6b7c03776d0f"
        }
      }
    },
    {
      "mdmId": "6043aa16-6143-4ba9-8e43-a6f05f43a883",
      "version": 1,
      "details": {
        "mdmId": "6043aa16-6143-4ba9-8e43-a6f05f43a883",
        "subtype": "Product",
        "name": "Seasonal latte",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.MenuItem",
          "cafeFlow",
          "MenuItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T06:20:00.000Z",
        "updatedAt": "2026-07-02T14:00:00.000Z",
        "cafeFlow": {
          "name": "Seasonal latte",
          "description": "Limited latte with chocolate sauce",
          "price": 16,
          "status": "paused",
          "pausedAt": "2026-07-02T14:00:00.000Z",
          "pauseReason": "Chocolate sauce stockout",
          "imageUrl": seedAssetUrl("MenuItem/seasonalLatte"),
          "displayOrder": 1,
          "requiresStockLink": true,
          "menuCategoryId": "90661b1d-8f66-498a-8e66-17f78d661664",
          "createdAt": "2026-07-01T06:20:00.000Z",
          "updatedAt": "2026-07-02T14:00:00.000Z",
          "menuItemId": "6043aa16-6143-4ba9-8e43-a6f05f43a883"
        }
      }
    },
    {
      "mdmId": "dc3eec8e-dd3e-4e21-8a3e-e968db3eeafb",
      "version": 1,
      "details": {
        "mdmId": "dc3eec8e-dd3e-4e21-8a3e-e968db3eeafb",
        "subtype": "Product",
        "name": "Coffee beans",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.StockItem",
          "cafeFlow",
          "StockItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T09:00:00.000Z",
        "updatedAt": "2026-07-05T11:30:00.000Z",
        "cafeFlow": {
          "name": "Coffee beans",
          "unit": "kg",
          "currentBalance": 12.5,
          "minimumLevel": 5,
          "description": "Arabica blend for espresso and filter",
          "createdAt": "2026-07-01T09:00:00.000Z",
          "updatedAt": "2026-07-05T11:30:00.000Z",
          "stockItemId": "dc3eec8e-dd3e-4e21-8a3e-e968db3eeafb"
        }
      }
    },
    {
      "mdmId": "46b981c9-45b9-4036-84b9-7ea343b97d10",
      "version": 1,
      "details": {
        "mdmId": "46b981c9-45b9-4036-84b9-7ea343b97d10",
        "subtype": "Product",
        "name": "Whole milk",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.StockItem",
          "cafeFlow",
          "StockItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T09:05:00.000Z",
        "updatedAt": "2026-07-06T16:00:00.000Z",
        "cafeFlow": {
          "name": "Whole milk",
          "unit": "liter",
          "currentBalance": 2,
          "minimumLevel": 8,
          "description": "Fresh whole milk for lattes and cappuccinos",
          "createdAt": "2026-07-01T09:05:00.000Z",
          "updatedAt": "2026-07-06T16:00:00.000Z",
          "stockItemId": "46b981c9-45b9-4036-84b9-7ea343b97d10"
        }
      }
    },
    {
      "mdmId": "b1ed63e1-b0ed-424e-8fed-60bbaeed5f28",
      "version": 1,
      "details": {
        "mdmId": "b1ed63e1-b0ed-424e-8fed-60bbaeed5f28",
        "subtype": "Product",
        "name": "Sourdough loaf",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.StockItem",
          "cafeFlow",
          "StockItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T09:10:00.000Z",
        "updatedAt": "2026-07-04T07:45:00.000Z",
        "cafeFlow": {
          "name": "Sourdough loaf",
          "unit": "unit",
          "currentBalance": 18,
          "minimumLevel": 6,
          "description": "Daily bakery loaves for sandwiches",
          "createdAt": "2026-07-01T09:10:00.000Z",
          "updatedAt": "2026-07-04T07:45:00.000Z",
          "stockItemId": "b1ed63e1-b0ed-424e-8fed-60bbaeed5f28"
        }
      }
    },
    {
      "mdmId": "0b7d5850-0c7d-49e3-8d7d-5b760e7d5d09",
      "version": 1,
      "details": {
        "mdmId": "0b7d5850-0c7d-49e3-8d7d-5b760e7d5d09",
        "subtype": "Product",
        "name": "Sugar packets",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.StockItem",
          "cafeFlow",
          "StockItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T09:15:00.000Z",
        "updatedAt": "2026-07-06T10:20:00.000Z",
        "cafeFlow": {
          "name": "Sugar packets",
          "unit": "portion",
          "currentBalance": 40,
          "minimumLevel": 50,
          "description": "Single-serve white sugar",
          "createdAt": "2026-07-01T09:15:00.000Z",
          "updatedAt": "2026-07-06T10:20:00.000Z",
          "stockItemId": "0b7d5850-0c7d-49e3-8d7d-5b760e7d5d09"
        }
      }
    },
    {
      "mdmId": "dca03b22-dda0-4cb5-8aa0-37fcdba0398f",
      "version": 1,
      "details": {
        "mdmId": "dca03b22-dda0-4cb5-8aa0-37fcdba0398f",
        "subtype": "Product",
        "name": "Chocolate sauce",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.StockItem",
          "cafeFlow",
          "StockItem"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T09:20:00.000Z",
        "updatedAt": "2026-07-05T18:00:00.000Z",
        "cafeFlow": {
          "name": "Chocolate sauce",
          "unit": "liter",
          "currentBalance": 3.2,
          "minimumLevel": 1.5,
          "description": "Sauce for mochas and desserts",
          "createdAt": "2026-07-01T09:20:00.000Z",
          "updatedAt": "2026-07-05T18:00:00.000Z",
          "stockItemId": "dca03b22-dda0-4cb5-8aa0-37fcdba0398f"
        }
      }
    },
    {
      "mdmId": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
      "version": 1,
      "details": {
        "mdmId": "8c8b764b-8b8b-44b8-8e8b-79718d8b77de",
        "subtype": "Person",
        "name": "Atendente 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "4faf837a-50af-450d-8daf-80544eaf81e7",
      "version": 1,
      "details": {
        "mdmId": "4faf837a-50af-450d-8daf-80544eaf81e7",
        "subtype": "Person",
        "name": "Atendente 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "363d0001-353c-4e6e-843c-fcdb333cfb48",
      "version": 1,
      "details": {
        "mdmId": "363d0001-353c-4e6e-843c-fcdb333cfb48",
        "subtype": "Person",
        "name": "Atendente 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "atendente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "atendente"
      }
    },
    {
      "mdmId": "f3e1912b-f2e1-4f98-85e1-9451f4e192be",
      "version": 1,
      "details": {
        "mdmId": "f3e1912b-f2e1-4f98-85e1-9451f4e192be",
        "subtype": "Person",
        "name": "Cozinheiro 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "cozinheiro"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "cozinheiro"
      }
    },
    {
      "mdmId": "38439c5a-3943-4ded-8643-993437439ac7",
      "version": 1,
      "details": {
        "mdmId": "38439c5a-3943-4ded-8643-993437439ac7",
        "subtype": "Person",
        "name": "Cozinheiro 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "cozinheiro"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "cozinheiro"
      }
    },
    {
      "mdmId": "1ed118e1-1dd1-474e-8cd1-15bb1bd11428",
      "version": 1,
      "details": {
        "mdmId": "1ed118e1-1dd1-474e-8cd1-15bb1bd11428",
        "subtype": "Person",
        "name": "Cozinheiro 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "cozinheiro"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "cozinheiro"
      }
    },
    {
      "mdmId": "92796e03-9179-4c70-8479-712993796f96",
      "version": 1,
      "details": {
        "mdmId": "92796e03-9179-4c70-8479-712993796f96",
        "subtype": "Person",
        "name": "Gerente 1",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "gerente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "gerente"
      }
    },
    {
      "mdmId": "559d7b32-569d-4cc5-839d-780c549d799f",
      "version": 1,
      "details": {
        "mdmId": "559d7b32-569d-4cc5-839d-780c549d799f",
        "subtype": "Person",
        "name": "Gerente 2",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "gerente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "gerente"
      }
    },
    {
      "mdmId": "3c2af7b9-3b2a-4626-8a2a-f493392af300",
      "version": 1,
      "details": {
        "mdmId": "3c2af7b9-3b2a-4626-8a2a-f493392af300",
        "subtype": "Person",
        "name": "Gerente 3",
        "status": "Active",
        "docType": null,
        "docId": null,
        "countryCode": "US",
        "tags": [
          "cafeFlow.Person",
          "cafeFlow",
          "actor",
          "gerente"
        ],
        "aliases": [],
        "contacts": [],
        "relationshipRefs": {},
        "addresses": [],
        "mergedInto": null,
        "createdAt": "2026-07-01T00:00:00.000Z",
        "updatedAt": "2026-07-01T00:00:00.000Z",
        "actorId": "gerente"
      }
    }
  ]
};
