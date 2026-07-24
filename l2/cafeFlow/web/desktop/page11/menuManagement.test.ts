/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.test.ts" enhancement="_blank"/>

// GENERATED — declarative BFF test cases run server-side by the monitor Tests runner (devenv only).
// Data, not a runnable test module: no node:test import, so scripts/run-tests.mjs never captures it.
// Params valued "<seedRef>" are resolved at run time from the harvested output of this
// page's parameterless queries.
export const pageTests = {
  "moduleName": "cafeFlow",
  "page": "menuManagement",
  "variant": "page11",
  "cases": [
    {
      "id": "listMenuItems.ok",
      "routine": "cafeFlow.menuManagement.listMenuItems",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "paginated",
        "minItems": 1
      }
    },
    {
      "id": "createMenuItemCmd.ok",
      "routine": "cafeFlow.menuManagement.createMenuItemCmd",
      "params": {
        "menuCategoryId": "<seedRef>",
        "name": "<seedRef>",
        "price": "<seedRef>",
        "requiresStockLink": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "createMenuItemCmd.menuCategoryId.required",
      "routine": "cafeFlow.menuManagement.createMenuItemCmd",
      "params": {
        "name": "<seedRef>",
        "price": "<seedRef>",
        "requiresStockLink": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "createMenuItemCmd.name.required",
      "routine": "cafeFlow.menuManagement.createMenuItemCmd",
      "params": {
        "menuCategoryId": "<seedRef>",
        "price": "<seedRef>",
        "requiresStockLink": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "createMenuItemCmd.price.required",
      "routine": "cafeFlow.menuManagement.createMenuItemCmd",
      "params": {
        "menuCategoryId": "<seedRef>",
        "name": "<seedRef>",
        "requiresStockLink": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "createMenuItemCmd.requiresStockLink.required",
      "routine": "cafeFlow.menuManagement.createMenuItemCmd",
      "params": {
        "menuCategoryId": "<seedRef>",
        "name": "<seedRef>",
        "price": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "updateMenuItemCmd.ok",
      "routine": "cafeFlow.menuManagement.updateMenuItemCmd",
      "params": {
        "menuItemId": "<seedRef>",
        "menuCategoryId": "<seedRef>",
        "name": "<seedRef>",
        "price": "<seedRef>",
        "status": "<seedRef>",
        "requiresStockLink": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "updateMenuItemCmd.menuCategoryId.required",
      "routine": "cafeFlow.menuManagement.updateMenuItemCmd",
      "params": {
        "menuItemId": "<seedRef>",
        "name": "<seedRef>",
        "price": "<seedRef>",
        "status": "<seedRef>",
        "requiresStockLink": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "updateMenuItemCmd.name.required",
      "routine": "cafeFlow.menuManagement.updateMenuItemCmd",
      "params": {
        "menuItemId": "<seedRef>",
        "menuCategoryId": "<seedRef>",
        "price": "<seedRef>",
        "status": "<seedRef>",
        "requiresStockLink": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "updateMenuItemCmd.price.required",
      "routine": "cafeFlow.menuManagement.updateMenuItemCmd",
      "params": {
        "menuItemId": "<seedRef>",
        "menuCategoryId": "<seedRef>",
        "name": "<seedRef>",
        "status": "<seedRef>",
        "requiresStockLink": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "updateMenuItemCmd.status.required",
      "routine": "cafeFlow.menuManagement.updateMenuItemCmd",
      "params": {
        "menuItemId": "<seedRef>",
        "menuCategoryId": "<seedRef>",
        "name": "<seedRef>",
        "price": "<seedRef>",
        "requiresStockLink": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "updateMenuItemCmd.requiresStockLink.required",
      "routine": "cafeFlow.menuManagement.updateMenuItemCmd",
      "params": {
        "menuItemId": "<seedRef>",
        "menuCategoryId": "<seedRef>",
        "name": "<seedRef>",
        "price": "<seedRef>",
        "status": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    }
  ]
} as const;
