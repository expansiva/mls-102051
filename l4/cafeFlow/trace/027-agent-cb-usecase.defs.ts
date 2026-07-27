{
  "savedAt": "2026-07-25T23:28:41.026Z",
  "agentName": "agentCbUsecase",
  "stepId": 27,
  "planning": null,
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitUsecase",
      "arguments": {
        "status": "ok",
        "result": {
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
                "Apply menuItemNeedsCategoryAndPrice inline: require non-empty menuCategoryId and price > 0; on violation raise validation error with rule id menuItemNeedsCategoryAndPrice",
                "Validate menuCategoryId exists via ctx.mdm.entity.get({ mdmId: menuCategoryId }); fail if category missing",
                "Resolve now = ctx.clock.now(); set updatedAt = now",
                "Apply status transition for onlyActiveMenuItemsCanBeOrdered: if status === 'paused', set pausedAt = now (keep pauseReason from input); if status === 'active', clear pausedAt and pauseReason so item is orderable again; reject status values outside active|paused with rule id onlyActiveMenuItemsCanBeOrdered",
                "Persist via ctx.mdm.entity.update with menuItemId and fields: menuCategoryId, name, description, price, status, pausedAt, pauseReason, imageUrl, displayOrder, requiresStockLink, updatedAt (module-specific fields under details.cafeFlow as applicable)",
                "Return the updated MenuItem projection matching outputShape: menuItemId, menuCategoryId, name, description, price, status, pausedAt, pauseReason, imageUrl, displayOrder, requiresStockLink, updatedAt"
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
        },
        "questions": [],
        "trace": [
          "MDM-owned MenuItem/MenuCategory: no repository ports; mutate via ctx.mdm.entity",
          "Public inputs = routeParam menuItemId + userInput writable fields; pausedAt/updatedAt from ctx.clock",
          "output[] mirrors outputShape top-level fields",
          "Rules menuItemNeedsCategoryAndPrice and onlyActiveMenuItemsCanBeOrdered applied inline"
        ]
      }
    },
    "status": "completed",
    "stepId": 12,
    "interaction": null,
    "nextSteps": null
  }
}
