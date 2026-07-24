/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.test.ts" enhancement="_blank"/>

// GENERATED — declarative BFF test cases run server-side by the monitor Tests runner (devenv only).
// Data, not a runnable test module: no node:test import, so scripts/run-tests.mjs never captures it.
// Params valued "<seedRef>" are resolved at run time from the harvested output of this
// page's parameterless queries.
export const pageTests = {
  "moduleName": "cafeFlow",
  "page": "stockManagement",
  "variant": "page11",
  "cases": [
    {
      "id": "listStockItems.ok",
      "routine": "cafeFlow.stockManagement.listStockItems",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "paginated",
        "minItems": 1
      }
    },
    {
      "id": "addStockItem.ok",
      "routine": "cafeFlow.stockManagement.addStockItem",
      "params": {
        "name": "<seedRef>",
        "unit": "<seedRef>",
        "currentBalance": "<seedRef>",
        "minimumLevel": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "addStockItem.name.required",
      "routine": "cafeFlow.stockManagement.addStockItem",
      "params": {
        "unit": "<seedRef>",
        "currentBalance": "<seedRef>",
        "minimumLevel": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "addStockItem.unit.required",
      "routine": "cafeFlow.stockManagement.addStockItem",
      "params": {
        "name": "<seedRef>",
        "currentBalance": "<seedRef>",
        "minimumLevel": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "addStockItem.currentBalance.required",
      "routine": "cafeFlow.stockManagement.addStockItem",
      "params": {
        "name": "<seedRef>",
        "unit": "<seedRef>",
        "minimumLevel": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "addStockItem.minimumLevel.required",
      "routine": "cafeFlow.stockManagement.addStockItem",
      "params": {
        "name": "<seedRef>",
        "unit": "<seedRef>",
        "currentBalance": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "editStockItem.ok",
      "routine": "cafeFlow.stockManagement.editStockItem",
      "params": {
        "stockItemId": "<seedRef>",
        "name": "<seedRef>",
        "unit": "<seedRef>",
        "minimumLevel": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "editStockItem.name.required",
      "routine": "cafeFlow.stockManagement.editStockItem",
      "params": {
        "stockItemId": "<seedRef>",
        "unit": "<seedRef>",
        "minimumLevel": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "editStockItem.unit.required",
      "routine": "cafeFlow.stockManagement.editStockItem",
      "params": {
        "stockItemId": "<seedRef>",
        "name": "<seedRef>",
        "minimumLevel": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "editStockItem.minimumLevel.required",
      "routine": "cafeFlow.stockManagement.editStockItem",
      "params": {
        "stockItemId": "<seedRef>",
        "name": "<seedRef>",
        "unit": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "removeStockItem.ok",
      "routine": "cafeFlow.stockManagement.removeStockItem",
      "params": {
        "stockItemId": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "registerStockAdjustment.ok",
      "routine": "cafeFlow.stockManagement.registerStockAdjustment",
      "params": {
        "stockItemId": "<seedRef>",
        "quantity": "<seedRef>",
        "direction": "<seedRef>",
        "reason": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "registerStockAdjustment.stockItemId.required",
      "routine": "cafeFlow.stockManagement.registerStockAdjustment",
      "params": {
        "quantity": "<seedRef>",
        "direction": "<seedRef>",
        "reason": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "registerStockAdjustment.quantity.required",
      "routine": "cafeFlow.stockManagement.registerStockAdjustment",
      "params": {
        "stockItemId": "<seedRef>",
        "direction": "<seedRef>",
        "reason": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "registerStockAdjustment.direction.required",
      "routine": "cafeFlow.stockManagement.registerStockAdjustment",
      "params": {
        "stockItemId": "<seedRef>",
        "quantity": "<seedRef>",
        "reason": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "registerStockAdjustment.reason.required",
      "routine": "cafeFlow.stockManagement.registerStockAdjustment",
      "params": {
        "stockItemId": "<seedRef>",
        "quantity": "<seedRef>",
        "direction": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    }
  ]
} as const;
