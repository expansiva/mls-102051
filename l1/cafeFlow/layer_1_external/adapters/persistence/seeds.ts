/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/seeds.ts" enhancement="_blank"/>

// Deterministic initial data for cafeFlow. Scenario planned by agentCbSeeds; rows and ids compiled locally.
// TableSeedRows exports are discovered by shape and merged by the persistence registry.

/* <agentCbSeedsPlan>
{
  "version": 1,
  "moduleName": "cafeFlow",
  "language": "en",
  "plan": {
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
  }
}
</agentCbSeedsPlan> */

// <agentCbSeedAssetUrls>
const seedAssetUrls: Record<string, string> = {};
const seedAssetWarnings: string[] = [];
// </agentCbSeedAssetUrls>

function seedAssetUrl(assetId: string): string | null { return seedAssetUrls[assetId] ?? null; }

import type { TableSeedRows } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

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
      "mdmId": "9e584769-9d58-45d6-8c58-44439b5842b0",
      "subtype": "Product",
      "name": "Bakery",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "bakery menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "9e584769-9d58-45d6-8c58-44439b5842b0",
      "createdAt": "2026-07-01T08:05:00.000Z",
      "updatedAt": "2026-07-01T08:05:00.000Z"
    },
    {
      "mdmId": "a7f06567-a6f0-43d4-89f0-688da8f066fa",
      "subtype": "Product",
      "name": "Meals",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "meals menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "a7f06567-a6f0-43d4-89f0-688da8f066fa",
      "createdAt": "2026-07-01T08:10:00.000Z",
      "updatedAt": "2026-07-02T09:00:00.000Z"
    },
    {
      "mdmId": "90661b1d-8f66-498a-8e66-17f78d661664",
      "subtype": "Product",
      "name": "Seasonal Specials",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.MenuCategory",
        "cafeFlow",
        "MenuCategory"
      ],
      "searchVector": "seasonal specials menucategory cafeflow",
      "mergedInto": null,
      "dynamoPk": "90661b1d-8f66-498a-8e66-17f78d661664",
      "createdAt": "2026-07-01T08:15:00.000Z",
      "updatedAt": "2026-07-03T11:30:00.000Z"
    },
    {
      "mdmId": "dc3eec8e-dd3e-4e21-8a3e-e968db3eeafb",
      "subtype": "Product",
      "name": "Coffee Beans",
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
      "createdAt": "2026-07-01T08:20:00.000Z",
      "updatedAt": "2026-07-05T14:00:00.000Z"
    },
    {
      "mdmId": "46b981c9-45b9-4036-84b9-7ea343b97d10",
      "subtype": "Product",
      "name": "Whole Milk",
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
      "createdAt": "2026-07-01T08:25:00.000Z",
      "updatedAt": "2026-07-06T10:15:00.000Z"
    },
    {
      "mdmId": "d9dd865a-dadd-47ed-87dd-8334d8dd84c7",
      "subtype": "Product",
      "name": "Wheat Flour",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "wheat flour stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "d9dd865a-dadd-47ed-87dd-8334d8dd84c7",
      "createdAt": "2026-07-01T08:30:00.000Z",
      "updatedAt": "2026-07-04T16:45:00.000Z"
    },
    {
      "mdmId": "0b7d5850-0c7d-49e3-8d7d-5b760e7d5d09",
      "subtype": "Product",
      "name": "Sugar Packets",
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
      "createdAt": "2026-07-01T08:35:00.000Z",
      "updatedAt": "2026-07-03T12:00:00.000Z"
    },
    {
      "mdmId": "4494a243-4394-40b0-8694-a5694594a3d6",
      "subtype": "Product",
      "name": "Daily Soup Base",
      "status": "Active",
      "docType": null,
      "docId": null,
      "countryCode": "US",
      "tags": [
        "cafeFlow.StockItem",
        "cafeFlow",
        "StockItem"
      ],
      "searchVector": "daily soup base stockitem cafeflow",
      "mergedInto": null,
      "dynamoPk": "4494a243-4394-40b0-8694-a5694594a3d6",
      "createdAt": "2026-07-01T08:40:00.000Z",
      "updatedAt": "2026-07-06T18:20:00.000Z"
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
      "mdmId": "9e584769-9d58-45d6-8c58-44439b5842b0",
      "version": 1,
      "details": {
        "mdmId": "9e584769-9d58-45d6-8c58-44439b5842b0",
        "subtype": "Product",
        "name": "Bakery",
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
          "name": "Bakery",
          "displayOrder": 2,
          "status": "active",
          "createdAt": "2026-07-01T08:05:00.000Z",
          "updatedAt": "2026-07-01T08:05:00.000Z",
          "menuCategoryId": "9e584769-9d58-45d6-8c58-44439b5842b0"
        }
      }
    },
    {
      "mdmId": "a7f06567-a6f0-43d4-89f0-688da8f066fa",
      "version": 1,
      "details": {
        "mdmId": "a7f06567-a6f0-43d4-89f0-688da8f066fa",
        "subtype": "Product",
        "name": "Meals",
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
        "updatedAt": "2026-07-02T09:00:00.000Z",
        "cafeFlow": {
          "name": "Meals",
          "displayOrder": 3,
          "status": "active",
          "createdAt": "2026-07-01T08:10:00.000Z",
          "updatedAt": "2026-07-02T09:00:00.000Z",
          "menuCategoryId": "a7f06567-a6f0-43d4-89f0-688da8f066fa"
        }
      }
    },
    {
      "mdmId": "90661b1d-8f66-498a-8e66-17f78d661664",
      "version": 1,
      "details": {
        "mdmId": "90661b1d-8f66-498a-8e66-17f78d661664",
        "subtype": "Product",
        "name": "Seasonal Specials",
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
        "updatedAt": "2026-07-03T11:30:00.000Z",
        "cafeFlow": {
          "name": "Seasonal Specials",
          "displayOrder": 4,
          "status": "inactive",
          "createdAt": "2026-07-01T08:15:00.000Z",
          "updatedAt": "2026-07-03T11:30:00.000Z",
          "menuCategoryId": "90661b1d-8f66-498a-8e66-17f78d661664"
        }
      }
    },
    {
      "mdmId": "dc3eec8e-dd3e-4e21-8a3e-e968db3eeafb",
      "version": 1,
      "details": {
        "mdmId": "dc3eec8e-dd3e-4e21-8a3e-e968db3eeafb",
        "subtype": "Product",
        "name": "Coffee Beans",
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
        "createdAt": "2026-07-01T08:20:00.000Z",
        "updatedAt": "2026-07-05T14:00:00.000Z",
        "cafeFlow": {
          "name": "Coffee Beans",
          "unit": "kg",
          "currentBalance": 12.5,
          "minimumLevel": 5,
          "description": "Medium roast beans for espresso and filter.",
          "createdAt": "2026-07-01T08:20:00.000Z",
          "updatedAt": "2026-07-05T14:00:00.000Z",
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
        "name": "Whole Milk",
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
        "createdAt": "2026-07-01T08:25:00.000Z",
        "updatedAt": "2026-07-06T10:15:00.000Z",
        "cafeFlow": {
          "name": "Whole Milk",
          "unit": "liter",
          "currentBalance": 2,
          "minimumLevel": 8,
          "description": "Fresh whole milk for drinks and recipes.",
          "createdAt": "2026-07-01T08:25:00.000Z",
          "updatedAt": "2026-07-06T10:15:00.000Z",
          "stockItemId": "46b981c9-45b9-4036-84b9-7ea343b97d10"
        }
      }
    },
    {
      "mdmId": "d9dd865a-dadd-47ed-87dd-8334d8dd84c7",
      "version": 1,
      "details": {
        "mdmId": "d9dd865a-dadd-47ed-87dd-8334d8dd84c7",
        "subtype": "Product",
        "name": "Wheat Flour",
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
        "createdAt": "2026-07-01T08:30:00.000Z",
        "updatedAt": "2026-07-04T16:45:00.000Z",
        "cafeFlow": {
          "name": "Wheat Flour",
          "unit": "kg",
          "currentBalance": 20,
          "minimumLevel": 4,
          "description": "All-purpose flour for bakery items.",
          "createdAt": "2026-07-01T08:30:00.000Z",
          "updatedAt": "2026-07-04T16:45:00.000Z",
          "stockItemId": "d9dd865a-dadd-47ed-87dd-8334d8dd84c7"
        }
      }
    },
    {
      "mdmId": "0b7d5850-0c7d-49e3-8d7d-5b760e7d5d09",
      "version": 1,
      "details": {
        "mdmId": "0b7d5850-0c7d-49e3-8d7d-5b760e7d5d09",
        "subtype": "Product",
        "name": "Sugar Packets",
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
        "createdAt": "2026-07-01T08:35:00.000Z",
        "updatedAt": "2026-07-03T12:00:00.000Z",
        "cafeFlow": {
          "name": "Sugar Packets",
          "unit": "unit",
          "currentBalance": 150,
          "minimumLevel": 50,
          "description": "Single-serve white sugar packets.",
          "createdAt": "2026-07-01T08:35:00.000Z",
          "updatedAt": "2026-07-03T12:00:00.000Z",
          "stockItemId": "0b7d5850-0c7d-49e3-8d7d-5b760e7d5d09"
        }
      }
    },
    {
      "mdmId": "4494a243-4394-40b0-8694-a5694594a3d6",
      "version": 1,
      "details": {
        "mdmId": "4494a243-4394-40b0-8694-a5694594a3d6",
        "subtype": "Product",
        "name": "Daily Soup Base",
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
        "createdAt": "2026-07-01T08:40:00.000Z",
        "updatedAt": "2026-07-06T18:20:00.000Z",
        "cafeFlow": {
          "name": "Daily Soup Base",
          "unit": "portion",
          "currentBalance": 6,
          "minimumLevel": 10,
          "description": "Prepared soup base portions for lunch service.",
          "createdAt": "2026-07-01T08:40:00.000Z",
          "updatedAt": "2026-07-06T18:20:00.000Z",
          "stockItemId": "4494a243-4394-40b0-8694-a5694594a3d6"
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
