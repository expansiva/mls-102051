/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.defs.ts" enhancement="_blank"/>

export const browseMenuItemsUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "browseMenuItems",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "browseMenuItems",
    "ports": [],
    "functions": [
      {
        "functionName": "browseMenuItems",
        "inputTypeName": "BrowseMenuItemsInput",
        "outputTypeName": "BrowseMenuItemsOutput",
        "input": [
          {
            "name": "status",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.status"
          },
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.menuCategoryId"
          },
          {
            "name": "name",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.name"
          },
          {
            "name": "page",
            "type": "number",
            "required": false
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": false
          }
        ],
        "output": [
          {
            "name": "menuItems",
            "type": "array",
            "required": true
          },
          {
            "name": "total",
            "type": "number",
            "required": true
          }
        ],
        "ports": [],
        "rulesApplied": [
          "onlyActiveMenuItemsCanBeOrdered",
          "menuItemNeedsCategoryAndPrice"
        ],
        "transactional": false,
        "steps": [
          "list MenuItem records via ctx.mdm.collection.listByType({ type: 'MenuItem' })",
          "apply optional filters inline: status (active|paused), menuCategoryId equality, name substring match (case-insensitive)",
          "inline rule menuItemNeedsCategoryAndPrice: keep only items that have a non-empty menuCategoryId and a defined numeric price; exclude incomplete rows and include rule id in any validation detail if blocked",
          "sort by displayOrder ascending then name ascending",
          "compute total as the filtered collection length for pagination metadata",
          "apply optional page/pageSize slice (defaults when omitted: page 1, reasonable pageSize)",
          "collect distinct menuCategoryId values from the page; bulk-load categories via ctx.mdm.collection.getMany({ mdmIds }) — never get inside a loop",
          "map each MenuItem to the output row, joining categoryName from the loaded MenuCategory; paused items remain visible for managerial browse (onlyActiveMenuItemsCanBeOrdered is informational here — POS order flows enforce active-only, this list does not hide paused)",
          "return { menuItems, total }"
        ],
        "outputShape": {
          "kind": "paginated",
          "fields": [
            {
              "name": "menuItems",
              "type": "array",
              "required": true,
              "item": {
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
                    "name": "categoryName",
                    "type": "string",
                    "required": true,
                    "fieldRef": "MenuCategory.name"
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
                    "name": "pausedAt",
                    "type": "string",
                    "required": false,
                    "fieldRef": "MenuItem.pausedAt"
                  },
                  {
                    "name": "pauseReason",
                    "type": "string",
                    "required": false,
                    "fieldRef": "MenuItem.pauseReason"
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
                  },
                  {
                    "name": "requiresStockLink",
                    "type": "boolean",
                    "required": true,
                    "fieldRef": "MenuItem.requiresStockLink"
                  },
                  {
                    "name": "createdAt",
                    "type": "string",
                    "required": true,
                    "fieldRef": "MenuItem.createdAt"
                  },
                  {
                    "name": "updatedAt",
                    "type": "string",
                    "required": true,
                    "fieldRef": "MenuItem.updatedAt"
                  }
                ]
              }
            },
            {
              "name": "total",
              "type": "number",
              "required": true
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

export default browseMenuItemsUsecase;

export const pipeline = [
  {
    "id": "browseMenuItems__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/browseMenuItems.defs.ts",
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
