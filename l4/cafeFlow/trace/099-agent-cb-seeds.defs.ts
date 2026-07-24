{
  "savedAt": "2026-07-22T21:29:09.656Z",
  "agentName": "agentCbSeeds",
  "stepId": 99,
  "planning": {
    "planId": "cb-gen-seeds",
    "dependsOn": [
      "cb-validate-all-g1"
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
          "summary": "Wave 1 seeds cafe menu categories and stock catalog items, including one low-stock item for dashboard visibility.",
          "localTables": [],
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
                  "key": "bakery",
                  "fields": [
                    {
                      "name": "name",
                      "value": "Bakery"
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
                  "key": "meals",
                  "fields": [
                    {
                      "name": "name",
                      "value": "Meals"
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
                      "value": "2026-07-02T09:00:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "seasonal",
                  "fields": [
                    {
                      "name": "name",
                      "value": "Seasonal Specials"
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
                      "value": "2026-07-03T11:30:00.000Z"
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
                      "value": "Coffee Beans"
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
                      "value": "Medium roast beans for espresso and filter."
                    },
                    {
                      "name": "createdAt",
                      "value": "2026-07-01T08:20:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-05T14:00:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "wholeMilk",
                  "fields": [
                    {
                      "name": "name",
                      "value": "Whole Milk"
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
                      "value": "Fresh whole milk for drinks and recipes."
                    },
                    {
                      "name": "createdAt",
                      "value": "2026-07-01T08:25:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-06T10:15:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "wheatFlour",
                  "fields": [
                    {
                      "name": "name",
                      "value": "Wheat Flour"
                    },
                    {
                      "name": "unit",
                      "value": "kg"
                    },
                    {
                      "name": "currentBalance",
                      "value": 20
                    },
                    {
                      "name": "minimumLevel",
                      "value": 4
                    },
                    {
                      "name": "description",
                      "value": "All-purpose flour for bakery items."
                    },
                    {
                      "name": "createdAt",
                      "value": "2026-07-01T08:30:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-04T16:45:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "sugarPackets",
                  "fields": [
                    {
                      "name": "name",
                      "value": "Sugar Packets"
                    },
                    {
                      "name": "unit",
                      "value": "unit"
                    },
                    {
                      "name": "currentBalance",
                      "value": 150
                    },
                    {
                      "name": "minimumLevel",
                      "value": 50
                    },
                    {
                      "name": "description",
                      "value": "Single-serve white sugar packets."
                    },
                    {
                      "name": "createdAt",
                      "value": "2026-07-01T08:35:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-03T12:00:00.000Z"
                    }
                  ],
                  "relationships": []
                },
                {
                  "key": "soupPortion",
                  "fields": [
                    {
                      "name": "name",
                      "value": "Daily Soup Base"
                    },
                    {
                      "name": "unit",
                      "value": "portion"
                    },
                    {
                      "name": "currentBalance",
                      "value": 6
                    },
                    {
                      "name": "minimumLevel",
                      "value": 10
                    },
                    {
                      "name": "description",
                      "value": "Prepared soup base portions for lunch service."
                    },
                    {
                      "name": "createdAt",
                      "value": "2026-07-01T08:40:00.000Z"
                    },
                    {
                      "name": "updatedAt",
                      "value": "2026-07-06T18:20:00.000Z"
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
          "Wave 1 limited to MenuCategory and StockItem per planning wave.",
          "4 menu categories with active/inactive and display order.",
          "5 stock items with mixed units; wholeMilk and soupPortion below minimum for lowStockMustBeVisible.",
          "No local tables in this wave; StockAdjustment rule deferred to later wave."
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
