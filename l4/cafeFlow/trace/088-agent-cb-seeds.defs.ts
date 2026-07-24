{
  "savedAt": "2026-07-22T19:31:29.460Z",
  "agentName": "agentCbSeeds",
  "stepId": 88,
  "planning": {
    "planId": "cb-gen-seeds",
    "dependsOn": [
      "cb-validate-before-seeds"
    ],
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
          "summary": "Wave 2 seeds active/paused menu items under prior categories, two closed daily shifts with closing reports, and one open shift for ongoing orders.",
          "localTables": [
            {
              "tableId": "DailyShift",
              "rows": [
                {
                  "key": "shiftJuly2Closed",
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
                      "value": "2026-07-02T11:00:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "shiftDate",
                      "value": "2026-07-02"
                    },
                    {
                      "name": "openedAt",
                      "value": "2026-07-02T11:05:00.000Z"
                    },
                    {
                      "name": "closedAt",
                      "value": "2026-07-02T22:15:00.000Z"
                    },
                    {
                      "name": "totalOrders",
                      "value": 28
                    },
                    {
                      "name": "totalSalesAmount",
                      "value": 642.5
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 51
                    },
                    {
                      "name": "cashTotal",
                      "value": 210
                    },
                    {
                      "name": "otherPaymentsTotal",
                      "value": 432.5
                    },
                    {
                      "name": "notes",
                      "value": "Steady lunch rush; no incidents."
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-02T22:15:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "shiftJuly3Closed",
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
                      "value": "2026-07-03T11:00:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "shiftDate",
                      "value": "2026-07-03"
                    },
                    {
                      "name": "openedAt",
                      "value": "2026-07-03T11:10:00.000Z"
                    },
                    {
                      "name": "closedAt",
                      "value": "2026-07-03T21:45:00.000Z"
                    },
                    {
                      "name": "totalOrders",
                      "value": 34
                    },
                    {
                      "name": "totalSalesAmount",
                      "value": 798
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 63
                    },
                    {
                      "name": "cashTotal",
                      "value": 255
                    },
                    {
                      "name": "otherPaymentsTotal",
                      "value": 543
                    },
                    {
                      "name": "notes",
                      "value": "Higher dessert demand in afternoon."
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-03T21:45:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "shiftJuly6Open",
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
                      "value": "2026-07-06T11:00:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "shiftDate",
                      "value": "2026-07-06"
                    },
                    {
                      "name": "openedAt",
                      "value": "2026-07-06T11:02:00.000Z"
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
                      "value": 276.5
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 22
                    },
                    {
                      "name": "cashTotal",
                      "value": 95
                    },
                    {
                      "name": "otherPaymentsTotal",
                      "value": 181.5
                    },
                    {
                      "name": "notes",
                      "value": "Current open shift for POS orders."
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-06T15:30:00.000Z"
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
                  "key": "reportJuly2",
                  "columns": [
                    {
                      "name": "shift_closing_report_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shiftJuly2Closed"
                      }
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-02T22:16:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "dailyShiftId",
                      "value": {
                        "ref": "local:DailyShift.shiftJuly2Closed"
                      }
                    },
                    {
                      "name": "shiftDate",
                      "value": "2026-07-02"
                    },
                    {
                      "name": "totalSalesAmount",
                      "value": 642.5
                    },
                    {
                      "name": "totalOrdersCount",
                      "value": 28
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 51
                    },
                    {
                      "name": "cashPaymentsAmount",
                      "value": 210
                    },
                    {
                      "name": "otherPaymentsAmount",
                      "value": 432.5
                    },
                    {
                      "name": "topSellingItemsSummary",
                      "value": "Espresso x18, Cheese sandwich x12, Cappuccino x9"
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
                      "value": "Cash drawer balanced; milk running low."
                    },
                    {
                      "name": "generatedAt",
                      "value": "2026-07-02T22:16:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-02T22:16:00.000Z"
                    }
                  ],
                  "children": []
                },
                {
                  "key": "reportJuly3",
                  "columns": [
                    {
                      "name": "shift_closing_report_id",
                      "value": null
                    },
                    {
                      "name": "daily_shift_id",
                      "value": {
                        "ref": "local:DailyShift.shiftJuly3Closed"
                      }
                    },
                    {
                      "name": "created_at",
                      "value": "2026-07-03T21:46:00.000Z"
                    }
                  ],
                  "details": [
                    {
                      "name": "dailyShiftId",
                      "value": {
                        "ref": "local:DailyShift.shiftJuly3Closed"
                      }
                    },
                    {
                      "name": "shiftDate",
                      "value": "2026-07-03"
                    },
                    {
                      "name": "totalSalesAmount",
                      "value": 798
                    },
                    {
                      "name": "totalOrdersCount",
                      "value": 34
                    },
                    {
                      "name": "totalItemsSold",
                      "value": 63
                    },
                    {
                      "name": "cashPaymentsAmount",
                      "value": 255
                    },
                    {
                      "name": "otherPaymentsAmount",
                      "value": 543
                    },
                    {
                      "name": "topSellingItemsSummary",
                      "value": "Brownie x15, Espresso x14, Cappuccino x11"
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
                      "value": "Bread stockout mid-afternoon; desserts strong."
                    },
                    {
                      "name": "generatedAt",
                      "value": "2026-07-03T21:46:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-03T21:46:00.000Z"
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
                      "name": "name",
                      "value": "Espresso"
                    },
                    {
                      "name": "description",
                      "value": "Single shot of house espresso."
                    },
                    {
                      "name": "price",
                      "value": 8.5
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
                  "key": "cappuccino",
                  "fields": [
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
                  "key": "cheeseSandwich",
                  "fields": [
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
                      "name": "menuCategoryId",
                      "value": {
                        "ref": "mdm:MenuCategory.snacks"
                      }
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
                  "key": "brownie",
                  "fields": [
                    {
                      "name": "name",
                      "value": "Chocolate brownie"
                    },
                    {
                      "name": "description",
                      "value": "Warm cocoa brownie square."
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
                      "name": "menuCategoryId",
                      "value": {
                        "ref": "mdm:MenuCategory.desserts"
                      }
                    },
                    {
                      "name": "createdAt",
                      "value": "2026-07-01T08:15:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-01T08:15:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "dailySoup",
                  "fields": [
                    {
                      "name": "name",
                      "value": "Daily soup"
                    },
                    {
                      "name": "description",
                      "value": "Chef's soup of the day."
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
                      "value": "2026-07-05T09:00:00.000Z"
                    },
                    {
                      "name": "pauseReason",
                      "value": "Ingredient shortage until restock."
                    },
                    {
                      "name": "imageUrl",
                      "value": null
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
                        "ref": "mdm:MenuCategory.meals"
                      }
                    },
                    {
                      "name": "createdAt",
                      "value": "2026-07-01T08:20:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-05T09:00:00.000Z"
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
          "Wave 2: MenuItem catalog with category+price, mostly active plus one paused; DailyShift open+closed lifecycle; ShiftClosingReport only for closed shifts with sales/payment/stock signals."
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
