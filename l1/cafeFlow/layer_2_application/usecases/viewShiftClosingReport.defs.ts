/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.defs.ts" enhancement="_blank"/>

export const viewShiftClosingReportUsecase = {
  "schemaVersion": "2026-06-26",
  "artifactType": "usecase",
  "artifactId": "viewShiftClosingReport",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbUsecase",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "usecaseId": "viewShiftClosingReport",
    "ports": [
      "ShiftClosingReport"
    ],
    "functions": [
      {
        "functionName": "viewShiftClosingReport",
        "inputTypeName": "ViewShiftClosingReportInput",
        "outputTypeName": "ViewShiftClosingReportOutput",
        "input": [
          {
            "name": "shiftClosingReportId",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport",
            "fieldRef": "ShiftClosingReport.shiftClosingReportId"
          }
        ],
        "output": [
          {
            "name": "shiftClosingReportId",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "dailyShiftId",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "shiftDate",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "totalSalesAmount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "totalOrdersCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "totalItemsSold",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "cashPaymentsAmount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "otherPaymentsAmount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "topSellingItemsSummary",
            "type": "string",
            "required": false,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "lowStockSignalsCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "stockoutSignalsCount",
            "type": "number",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "closingNotes",
            "type": "string",
            "required": false,
            "ofEntity": "ShiftClosingReport"
          },
          {
            "name": "generatedAt",
            "type": "string",
            "required": true,
            "ofEntity": "ShiftClosingReport"
          }
        ],
        "ports": [
          "ShiftClosingReport"
        ],
        "rulesApplied": [
          "shiftClosingReportContents",
          "shiftClosingRecordsBasicTotalsAndPayments"
        ],
        "transactional": false,
        "steps": [
          "resolve ShiftClosingReport port via resolveRepository",
          "load ShiftClosingReport by input.shiftClosingReportId",
          "if not found, fail validation with shiftClosingReportContents detail",
          "apply shiftClosingReportContents: ensure report exposes identity (shiftClosingReportId, dailyShiftId), shiftDate, totals (totalSalesAmount, totalOrdersCount, totalItemsSold), payment breakdown (cashPaymentsAmount, otherPaymentsAmount), optional topSellingItemsSummary, stock signal counts (lowStockSignalsCount, stockoutSignalsCount), optional closingNotes and generatedAt",
          "apply shiftClosingRecordsBasicTotalsAndPayments: present cash and other payment amounts as basic totals without advanced reconciliation",
          "map entity fields to outputShape and return the report projection"
        ],
        "outputShape": {
          "kind": "object",
          "fields": [
            {
              "name": "shiftClosingReportId",
              "type": "string",
              "required": true,
              "fieldRef": "ShiftClosingReport.shiftClosingReportId"
            },
            {
              "name": "dailyShiftId",
              "type": "string",
              "required": true,
              "fieldRef": "ShiftClosingReport.dailyShiftId"
            },
            {
              "name": "shiftDate",
              "type": "string",
              "required": true,
              "fieldRef": "ShiftClosingReport.shiftDate"
            },
            {
              "name": "totalSalesAmount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.totalSalesAmount"
            },
            {
              "name": "totalOrdersCount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.totalOrdersCount"
            },
            {
              "name": "totalItemsSold",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.totalItemsSold"
            },
            {
              "name": "cashPaymentsAmount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.cashPaymentsAmount"
            },
            {
              "name": "otherPaymentsAmount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.otherPaymentsAmount"
            },
            {
              "name": "topSellingItemsSummary",
              "type": "string",
              "required": false,
              "fieldRef": "ShiftClosingReport.topSellingItemsSummary"
            },
            {
              "name": "lowStockSignalsCount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.lowStockSignalsCount"
            },
            {
              "name": "stockoutSignalsCount",
              "type": "number",
              "required": true,
              "fieldRef": "ShiftClosingReport.stockoutSignalsCount"
            },
            {
              "name": "closingNotes",
              "type": "string",
              "required": false,
              "fieldRef": "ShiftClosingReport.closingNotes"
            },
            {
              "name": "generatedAt",
              "type": "string",
              "required": true,
              "fieldRef": "ShiftClosingReport.generatedAt"
            }
          ]
        }
      }
    ],
    "rulesApplied": [
      "shiftClosingReportContents",
      "shiftClosingRecordsBasicTotalsAndPayments"
    ],
    "mdmRefs": []
  }
} as const;

export default viewShiftClosingReportUsecase;

export const pipeline = [
  {
    "id": "viewShiftClosingReport__applicationUsecase",
    "type": "applicationUsecase",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/usecases/viewShiftClosingReport.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.d.ts",
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/applicationUsecase.md",
      "_102034_.d.ts"
    ],
    "rulesApplied": [
      "shiftClosingReportContents",
      "shiftClosingRecordsBasicTotalsAndPayments"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
