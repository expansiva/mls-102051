/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/updateMenuItem.defs.ts" enhancement="_blank"/>

export const updateMenuItemUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "updateMenuItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "updateMenuItem",
    "ports": [],
    "functions": [
      {
        "functionName": "updateMenuItem",
        "inputTypeName": "UpdateMenuItemInput",
        "outputTypeName": "UpdateMenuItemOutput",
        "input": [
          {
            "name": "menuItemId",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.menuItemId"
          },
          {
            "name": "menuCategoryId",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.menuCategoryId"
          },
          {
            "name": "name",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.name"
          },
          {
            "name": "description",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.description"
          },
          {
            "name": "price",
            "type": "number",
            "required": true,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.price"
          },
          {
            "name": "status",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.status"
          },
          {
            "name": "pauseReason",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.pauseReason"
          },
          {
            "name": "imageUrl",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.imageUrl"
          },
          {
            "name": "displayOrder",
            "type": "number",
            "required": false,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.displayOrder"
          },
          {
            "name": "requiresStockLink",
            "type": "boolean",
            "required": true,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.requiresStockLink"
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
            "name": "pausedAt",
            "type": "string",
            "required": false,
            "ofEntity": "MenuItem"
          },
          {
            "name": "pauseReason",
            "type": "string",
            "required": false,
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
          },
          {
            "name": "requiresStockLink",
            "type": "boolean",
            "required": true,
            "ofEntity": "MenuItem"
          },
          {
            "name": "updatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "MenuItem"
          }
        ],
        "ports": [],
        "rulesApplied": [
          "onlyActiveMenuItemsCanBeOrdered",
          "menuItemNeedsCategoryAndPrice"
        ],
        "transactional": true,
        "steps": [
          "Load existing MenuItem by input.menuItemId via ctx.mdm.entity.get({ mdmId: menuItemId }); fail if not found",
          "Validate menuCategoryId is present and price is defined and > 0 (rule menuItemNeedsCategoryAndPrice); include rule id in validation error details when blocked",
          "Verify target MenuCategory exists via ctx.mdm.entity.get({ mdmId: menuCategoryId }) and is usable; fail if missing",
          "Validate status is 'active' or 'paused'; when status is 'paused', item becomes unavailable for new POS orders (rule onlyActiveMenuItemsCanBeOrdered); when status is 'active', item is available again",
          "Resolve updatedAt from ctx.clock.now(); if status is 'paused', set pausedAt to ctx.clock.now() (keep or set pauseReason from input); if status is 'active', clear pausedAt and pauseReason",
          "Persist via ctx.mdm.entity.update with menuItemId and fields: menuCategoryId, name, description, price, status, pausedAt, pauseReason, imageUrl, displayOrder, requiresStockLink, updatedAt",
          "Return the updated MenuItem projection: menuItemId, menuCategoryId, name, description, price, status, pausedAt, pauseReason, imageUrl, displayOrder, requiresStockLink, updatedAt"
        ],
        "outputShape": {
          "kind": "object",
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
              "name": "updatedAt",
              "type": "string",
              "required": true,
              "fieldRef": "MenuItem.updatedAt"
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

export default updateMenuItemUsecase;

export const pipeline = [
  {
    "id": "updateMenuItem__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateMenuItem.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/updateMenuItem.defs.ts",
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
