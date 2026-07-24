/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/shiftWorkspace.test.ts" enhancement="_blank"/>

// GENERATED — declarative BFF test cases run server-side by the monitor Tests runner (devenv only).
// Data, not a runnable test module: no node:test import, so scripts/run-tests.mjs never captures it.
// Params valued "<seedRef>" are resolved at run time from the harvested output of this
// page's parameterless queries.
export const pageTests = {
  "moduleName": "cafeFlow",
  "page": "shiftWorkspace",
  "variant": "page11",
  "cases": [
    {
      "id": "openDailyShiftCmd.ok",
      "routine": "cafeFlow.shiftWorkspace.openDailyShiftCmd",
      "params": {
        "shiftDate": "<seedRef>",
        "openedByUserId": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "openDailyShiftCmd.shiftDate.required",
      "routine": "cafeFlow.shiftWorkspace.openDailyShiftCmd",
      "params": {
        "openedByUserId": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "openDailyShiftCmd.openedByUserId.required",
      "routine": "cafeFlow.shiftWorkspace.openDailyShiftCmd",
      "params": {
        "shiftDate": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "closeDailyShiftCmd.ok",
      "routine": "cafeFlow.shiftWorkspace.closeDailyShiftCmd",
      "params": {
        "dailyShiftId": "<seedRef>",
        "closedByUserId": "<seedRef>",
        "closedAt": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      },
      "mutating": true
    },
    {
      "id": "closeDailyShiftCmd.dailyShiftId.required",
      "routine": "cafeFlow.shiftWorkspace.closeDailyShiftCmd",
      "params": {
        "closedByUserId": "<seedRef>",
        "closedAt": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "closeDailyShiftCmd.closedByUserId.required",
      "routine": "cafeFlow.shiftWorkspace.closeDailyShiftCmd",
      "params": {
        "dailyShiftId": "<seedRef>",
        "closedAt": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "closeDailyShiftCmd.closedAt.required",
      "routine": "cafeFlow.shiftWorkspace.closeDailyShiftCmd",
      "params": {
        "dailyShiftId": "<seedRef>",
        "closedByUserId": "<seedRef>"
      },
      "expect": {
        "ok": false,
        "errorCode": "VALIDATION_ERROR"
      }
    },
    {
      "id": "getShiftClosingReport.ok",
      "routine": "cafeFlow.shiftWorkspace.getShiftClosingReport",
      "params": {
        "shiftClosingReportId": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      }
    }
  ]
} as const;
