/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.test.ts" enhancement="_blank"/>

// GENERATED — declarative BFF test cases run server-side by the monitor Tests runner (devenv only).
// Data, not a runnable test module: no node:test import, so scripts/run-tests.mjs never captures it.
// Params valued "<seedRef>" are resolved at run time from the harvested output of this
// page's parameterless queries.
export const pageTests = {
  "moduleName": "cafeFlow",
  "page": "posWorkspace",
  "variant": "page11",
  "cases": [
    {
      "id": "queryOpenOrders.ok",
      "routine": "cafeFlow.posWorkspace.queryOpenOrders",
      "params": {
        "dailyShiftId": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "paginated",
        "minItems": 1
      }
    },
    {
      "id": "queryMenuItems.ok",
      "routine": "cafeFlow.posWorkspace.queryMenuItems",
      "params": {},
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    },
    {
      "id": "cmdCreateOrder.ok",
      "routine": "cafeFlow.posWorkspace.cmdCreateOrder",
      "params": {
        "orderType": "<seedRef>",
        "menuItemId": "<seedRef>",
        "quantity": "<seedRef>",
        "dailyShiftId": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdCreateOrder.orderType.required",
      "routine": "cafeFlow.posWorkspace.cmdCreateOrder",
      "params": {
        "menuItemId": "<seedRef>",
        "quantity": "<seedRef>",
        "dailyShiftId": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdCreateOrder.menuItemId.required",
      "routine": "cafeFlow.posWorkspace.cmdCreateOrder",
      "params": {
        "orderType": "<seedRef>",
        "quantity": "<seedRef>",
        "dailyShiftId": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdCreateOrder.quantity.required",
      "routine": "cafeFlow.posWorkspace.cmdCreateOrder",
      "params": {
        "orderType": "<seedRef>",
        "menuItemId": "<seedRef>",
        "dailyShiftId": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdCreateOrder.dailyShiftId.required",
      "routine": "cafeFlow.posWorkspace.cmdCreateOrder",
      "params": {
        "orderType": "<seedRef>",
        "menuItemId": "<seedRef>",
        "quantity": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdUpdateOrderStatus.ok",
      "routine": "cafeFlow.posWorkspace.cmdUpdateOrderStatus",
      "params": {
        "orderId": "<seedRef>",
        "status": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdUpdateOrderStatus.status.required",
      "routine": "cafeFlow.posWorkspace.cmdUpdateOrderStatus",
      "params": {
        "orderId": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdRecordBasicPayment.ok",
      "routine": "cafeFlow.posWorkspace.cmdRecordBasicPayment",
      "params": {
        "orderId": "<seedRef>",
        "totalAmount": "<seedRef>",
        "paymentMethod": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "cmdRecordBasicPayment.totalAmount.required",
      "routine": "cafeFlow.posWorkspace.cmdRecordBasicPayment",
      "params": {
        "orderId": "<seedRef>",
        "paymentMethod": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "cmdRecordBasicPayment.paymentMethod.required",
      "routine": "cafeFlow.posWorkspace.cmdRecordBasicPayment",
      "params": {
        "orderId": "<seedRef>",
        "totalAmount": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    }
  ]
} as const;
