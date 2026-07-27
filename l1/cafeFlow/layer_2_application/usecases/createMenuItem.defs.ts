/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/createMenuItem.defs.ts" enhancement="_blank"/>

export const createMenuItemUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "createMenuItem",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "createMenuItem",
    "ports": [],
    "functions": [
      {
        "functionName": "createMenuItem",
        "inputTypeName": "CreateMenuItemInput",
        "outputTypeName": "CreateMenuItemOutput",
        "input": [
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
            "required": false,
            "ofEntity": "MenuItem",
            "fieldRef": "MenuItem.status"
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
            "name": "createdAt",
            "type": "string",
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
          "menuItemNeedsCategoryAndPrice",
          "onlyActiveMenuItemsCanBeOrdered"
        ],
        "transactional": true,
        "steps": [
          "Generate menuItemId via ctx.idGenerator and createdAt/updatedAt via ctx.clock.now()",
          "Apply menuItemNeedsCategoryAndPrice: reject when menuCategoryId is missing/blank or price is missing/not a finite number > 0; include rule id in validation error details",
          "Resolve status: if omitted, default to 'active'; if provided, allow only 'active' or 'paused' (onlyActiveMenuItemsCanBeOrdered — paused items are not orderable at POS)",
          "Validate menuCategoryId references an existing MenuCategory via ctx.mdm.entity.get({ mdmId: menuCategoryId }); reject if not found",
          "Persist the new MenuItem via ctx.mdm.entity.create with menuItemId, menuCategoryId, name, description, price, status, imageUrl, displayOrder, requiresStockLink, createdAt, updatedAt (module-specific fields under details when applicable)",
          "Return the created MenuItem projection matching outputShape"
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
      }
    ],
    "rulesApplied": [
      "menuItemNeedsCategoryAndPrice",
      "onlyActiveMenuItemsCanBeOrdered"
    ],
    "mdmRefs": [
      "MenuItem",
      "MenuCategory"
    ]
  }
} as const;

export default createMenuItemUsecase;

export const pipeline = [
  {
    "id": "createMenuItem__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createMenuItem.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/createMenuItem.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "menuItemNeedsCategoryAndPrice",
      "onlyActiveMenuItemsCanBeOrdered"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
