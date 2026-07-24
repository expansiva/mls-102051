/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/dashboardWorkspace.test.ts" enhancement="_blank"/>

// GENERATED — declarative BFF test cases run server-side by the monitor Tests runner (devenv only).
// Data, not a runnable test module: no node:test import, so scripts/run-tests.mjs never captures it.
// Params valued "<seedRef>" are resolved at run time from the harvested output of this
// page's parameterless queries.
export const pageTests = {
  "moduleName": "cafeFlow",
  "page": "dashboardWorkspace",
  "variant": "page11",
  "cases": [
    {
      "id": "getDashboard.ok",
      "routine": "cafeFlow.dashboardWorkspace.getDashboard",
      "params": {
        "dailyShiftId": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      }
    },
    {
      "id": "getAiSalesSummary.ok",
      "routine": "cafeFlow.dashboardWorkspace.getAiSalesSummary",
      "params": {
        "operationalDashboardId": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "object"
      }
    },
    {
      "id": "getAiPromotionSuggestions.ok",
      "routine": "cafeFlow.dashboardWorkspace.getAiPromotionSuggestions",
      "params": {
        "operationalDashboardId": "<seedRef>"
      },
      "expect": {
        "ok": true,
        "shape": "array",
        "minItems": 1
      }
    }
  ]
} as const;
