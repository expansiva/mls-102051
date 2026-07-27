/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuForPos.defs.ts" enhancement="_blank"/>

export const browseMenuForPosUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "browseMenuForPos",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "browseMenuForPos",
    "ports": [],
    "functions": [
      {
        "functionName": "browseMenuForPos",
        "inputTypeName": "BrowseMenuForPosInput",
        "outputTypeName": "BrowseMenuForPosOutput",
        "input": [
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.menuCategoryId"
          }
        ],
        "output": [
          {
            "name": "menuItemId",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "description",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem"
          },
          {
            "name": "price",
            "type": "number",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "imageUrl",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem"
          },
          {
            "name": "displayOrder",
            "type": "number",
            "required": false,
            "ofEntity": "MenuItem"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "onlyActiveMenuItemsCanBeOrdered",
          "menuItemNeedsCategoryAndPrice"
        ],
        "transactional": false,
        "steps": [
          "List MenuItem records via ctx.mdm.collection.listByType({ type: 'MenuItem' }) (MDM-owned; no repository port)",
          "Apply onlyActiveMenuItemsCanBeOrdered inline: keep only items whose status === 'active' (exclude paused so they cannot be ordered on POS)",
          "When menuCategoryId is provided, filter the active set to items whose menuCategoryId matches",
          "Apply menuItemNeedsCategoryAndPrice inline: drop any item missing menuCategoryId or price; if a candidate fails, treat as not orderable (do not return it)",
          "Sort remaining items by displayOrder ascending then name ascending for POS display order",
          "Project each item to { menuItemId, menuCategoryId, name, description, price, status, imageUrl, displayOrder } and return as menuItems"
        ],
        "outputShape": {
          "kind": "list",
          "fields": [
            {
              "name": "menuItemId",
              "type": "string",
              "required": true,
              "fieldRef": "MenuItem.menuItemId"
            },
            {
              "name": "menuCategoryId",
              "type": "string",
              "required": true,
              "fieldRef": "MenuItem.menuCategoryId"
            },
            {
              "name": "name",
              "type": "string",
              "required": true,
              "fieldRef": "MenuItem.name"
            },
            {
              "name": "description",
              "type": "string",
              "required": false,
              "fieldRef": "MenuItem.description"
            },
            {
              "name": "price",
              "type": "number",
              "required": true,
              "fieldRef": "MenuItem.price"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "fieldRef": "MenuItem.status"
            },
            {
              "name": "imageUrl",
              "type": "string",
              "required": false,
              "fieldRef": "MenuItem.imageUrl"
            },
            {
              "name": "displayOrder",
              "type": "number",
              "required": false,
              "fieldRef": "MenuItem.displayOrder"
            }
          ]
        }
      }
    ],
    "rulesApplied": [
      "onlyActiveMenuItemsCanBeOrdered",
      "menuItemNeedsCategoryAndPrice"
    ],
    "mdmRefs": [
      "MenuItem",
      "MenuCategory"
    ]
  }
} as const;

export default browseMenuForPosUsecase;

export const pipeline = [
  {
    "id": "browseMenuForPos__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuForPos.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuForPos.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "onlyActiveMenuItemsCanBeOrdered",
      "menuItemNeedsCategoryAndPrice"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
