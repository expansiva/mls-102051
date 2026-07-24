{
  "savedAt": "2026-07-22T15:06:22.654Z",
  "agentName": "agentCbSeeds",
  "stepId": 90,
  "planning": {
    "planId": "cb-gen-seeds-w2-r2-1784732735170",
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
          "summary": "Wave 2 seeds active/paused menu items under prior categories, closed daily shifts with closing reports, and one open shift in progress.",
          "localTables": [
            {
              "tableId": "DailyShift",
              "rows": [
                {
                  "key": "shiftJul02",
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
                      "value": "2026-07-02T07:45:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "shiftDate",
                      "value": "2026-07-02T00:00:00.000Z"
                    },
                    {
                      "name": "openedByUserId",
                      "value": {
                        "ref": "actor:atendente.u1"
                      }
                    },
                    {
                      "name": "closedByUserId",
                      "value": {
                        "ref": "actor:gerente.u1"
                      }
                    },
                    {
                      "name": "openedAt",
                      "value": "2026-07-02T08:00:00.000Z"
                    },
                    {
                      "name": "closedAt",
                      "value": "2026-07-02T20:05:00.000Z"
                    },
                    {
                      "name": "totalOrders",
                      "value": 28
                    },
                    {
                      "name": "totalSalesAmount",
                      "value": 1450.5
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 62
                    },
                    {
                      "name": "cashTotal",
                      "value": 520
                    },
                    {
                      "name": "otherPaymentsTotal",
                      "value": 930.5
                    },
                    {
                      "name": "notes",
                      "value": "Steady weekday lunch and afternoon coffee rush."
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-02T20:05:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "shiftJul05",
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
                        "ref": "actor:gerente.u2"
                      }
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-05T07:50:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "shiftDate",
                      "value": "2026-07-05T00:00:00.000Z"
                    },
                    {
                      "name": "openedByUserId",
                      "value": {
                        "ref": "actor:atendente.u2"
                      }
                    },
                    {
                      "name": "closedByUserId",
                      "value": {
                        "ref": "actor:gerente.u2"
                      }
                    },
                    {
                      "name": "openedAt",
                      "value": "2026-07-05T08:00:00.000Z"
                    },
                    {
                      "name": "closedAt",
                      "value": "2026-07-05T19:45:00.000Z"
                    },
                    {
                      "name": "totalOrders",
                      "value": 35
                    },
                    {
                      "name": "totalSalesAmount",
                      "value": 1890.75
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 81
                    },
                    {
                      "name": "cashTotal",
                      "value": 640.25
                    },
                    {
                      "name": "otherPaymentsTotal",
                      "value": 1250.5
                    },
                    {
                      "name": "notes",
                      "value": "Busy weekend brunch; milk stock watched closely."
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-05T19:45:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "shiftJul07Open",
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
                      "value": "2026-07-07T07:40:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "shiftDate",
                      "value": "2026-07-07T00:00:00.000Z"
                    },
                    {
                      "name": "openedByUserId",
                      "value": {
                        "ref": "actor:atendente.u1"
                      }
                    },
                    {
                      "name": "closedByUserId",
                      "value": null
                    },
                    {
                      "name": "openedAt",
                      "value": "2026-07-07T08:00:00.000Z"
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
                      "value": 486
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 27
                    },
                    {
                      "name": "cashTotal",
                      "value": 150
                    },
                    {
                      "name": "otherPaymentsTotal",
                      "value": 336
                    },
                    {
                      "name": "notes",
                      "value": "Current open shift for live POS orders."
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-07T12:30:00.000Z"
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
                  "key": "closeJul02",
                  "columns": [
                    {
                      "name": "shift_closing_report_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shiftJul02"
                      }
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T20:06:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "dailyShiftId",
                      "value": {
                        "ref": "local:DailyShift.shiftJul02"
                      }
                    },
                    {
                      "name": "shiftDate",
                      "value": "2026-07-02T00:00:00.000Z"
                    },
                    {
                      "name": "totalSalesAmount",
                      "value": 1450.5
                    },
                    {
                      "name": "totalOrdersCount",
                      "value": 28
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 62
                    },
                    {
                      "name": "cashPaymentsAmount",
                      "value": 520
                    },
                    {
                      "name": "otherPaymentsAmount",
                      "value": 930.5
                    },
                    {
                      "name": "topSellingItemsSummary",
                      "value": "Espresso, Cheese sandwich, Cappuccino"
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
                      "value": "Balanced cash drawer; low milk and bread flagged."
                    },
                    {
                      "name": "generatedAt",
                      "value": "2026-07-02T20:06:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-02T20:06:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "closeJul05",
                  "columns": [
                    {
                      "name": "shift_closing_report_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shiftJul05"
                      }
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-05T19:46:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "dailyShiftId",
                      "value": {
                        "ref": "local:DailyShift.shiftJul05"
                      }
                    },
                    {
                      "name": "shiftDate",
                      "value": "2026-07-05T00:00:00.000Z"
                    },
                    {
                      "name": "totalSalesAmount",
                      "value": 1890.75
                    },
                    {
                      "name": "totalOrdersCount",
                      "value": 35
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 81
                    },
                    {
                      "name": "cashPaymentsAmount",
                      "value": 640.25
                    },
                    {
                      "name": "otherPaymentsAmount",
                      "value": 1250.5
                    },
                    {
                      "name": "topSellingItemsSummary",
                      "value": "Cappuccino, Lunch plate, Brownie"
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
                      "value": "Strong card volume; sandwich bread hit stockout mid-shift."
                    },
                    {
                      "name": "generatedAt",
                      "value": "2026-07-05T19:46:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-05T19:46:00.000Z"
                    }
                  ],
                  "children": []
                }
              ]
            }
          ],
          "mdmEntities": [
            {
              "entityId": "MenuItem",
              "rows": [
                {
                  "key": "espresso",
                  "fields": [
                    {
                      "name": "menuCategoryId",
                      "value": {
                        "ref": "mdm:MenuCategory.beverages"
                      }
                    },
                    {
                      "name": "name",
                      "value": "Espresso"
                    },
                    {
                      "name": "description",
                      "value": "Single shot of house espresso."
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
                      "name": "createdAt",
                      "value": "2026-07-01T10:00:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T10:00:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "cappuccino",
                  "fields": [
                    {
                      "name": "menuCategoryId",
                      "value": {
                        "ref": "mdm:MenuCategory.beverages"
                      }
                    },
                    {
                      "name": "name",
                      "value": "Cappuccino"
                    },
                    {
                      "name": "description",
                      "value": "Espresso with steamed milk and foam."
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
                      "name": "createdAt",
                      "value": "2026-07-01T10:05:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T10:05:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "cheeseSandwich",
                  "fields": [
                    {
                      "name": "menuCategoryId",
                      "value": {
                        "ref": "mdm:MenuCategory.snacks"
                      }
                    },
                    {
                      "name": "name",
                      "value": "Cheese sandwich"
                    },
                    {
                      "name": "description",
                      "value": "Toasted sandwich with mozzarella."
                    },
                    {
                      "name": "price",
                      "value": 18
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
                        "asset": "MenuItem/cheeseSandwich",
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
                      "name": "createdAt",
                      "value": "2026-07-01T10:10:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T10:10:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "brownie",
                  "fields": [
                    {
                      "name": "menuCategoryId",
                      "value": {
                        "ref": "mdm:MenuCategory.desserts"
                      }
                    },
                    {
                      "name": "name",
                      "value": "Chocolate brownie"
                    },
                    {
                      "name": "description",
                      "value": "Warm chocolate brownie square."
                    },
                    {
                      "name": "price",
                      "value": 12
                    },
                    {
                      "name": "status",
                      "value": "paused"
                    },
                    {
                      "name": "pausedAt",
                      "value": "2026-07-06T09:00:00.000Z"
                    },
                    {
                      "name": "pauseReason",
                      "value": "Oven maintenance; dessert line paused."
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
                      "value": false
                    },
                    {
                      "name": "createdAt",
                      "value": "2026-07-01T10:15:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-06T09:00:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "lunchPlate",
                  "fields": [
                    {
                      "name": "menuCategoryId",
                      "value": {
                        "ref": "mdm:MenuCategory.meals"
                      }
                    },
                    {
                      "name": "name",
                      "value": "Lunch plate"
                    },
                    {
                      "name": "description",
                      "value": "Daily hot meal with side salad."
                    },
                    {
                      "name": "price",
                      "value": 32
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
                        "asset": "MenuItem/lunchPlate",
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
                      "name": "createdAt",
                      "value": "2026-07-01T10:20:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T10:20:00.000Z"
                    }
                  ],
                  "relationships": []
                }
              ]
            }
          ]
        },
        "questions": [],
        "trace": [
          "Fixed shiftDate to full ISO-8601 UTC datetimes within window",
          "Open shift closed_by_user_id and closedByUserId set to null",
          "Closed shifts link actors and one-to-one closing reports with sales totals",
          "MenuItems 3-5 with category refs, prices, active and paused states"
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
