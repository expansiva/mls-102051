/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/kitchenWorkspace.test.ts" enhancement="_blank"/>

// GENERATED — declarative BFF test cases run server-side by the monitor Tests runner (devenv only).
// Data, not a runnable test module: no node:test import, so scripts/run-tests.mjs never captures it.
// Params valued "<seedRef>" are resolved at run time from the harvested output of this
// page's parameterless queries.
export const pageTests = {
  "moduleName": "cafeFlow",
  "page": "kitchenWorkspace",
  "variant": "page11",
  "cases": [
    {
      "id": "fetchKitchenQueue.ok",
      "routine": "cafeFlow.kitchenWorkspace.fetchKitchenQueue",
      "params": {
        "dailyShiftId": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "changeOrderStatus.ok",
      "routine": "cafeFlow.kitchenWorkspace.changeOrderStatus",
      "params": {
        "orderId": "<seedRef>",
        "status": "<seedRef>",
        "updatedAt": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "changeOrderStatus.status.required",
      "routine": "cafeFlow.kitchenWorkspace.changeOrderStatus",
      "params": {
        "orderId": "<seedRef>",
        "updatedAt": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "changeOrderStatus.updatedAt.required",
      "routine": "cafeFlow.kitchenWorkspace.changeOrderStatus",
      "params": {
        "orderId": "<seedRef>",
        "status": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    }
  ]
} as const;
