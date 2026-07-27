/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.defs.ts" enhancement="_blank"/>

export const shiftClosingReportRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "ShiftClosingReportRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "ShiftClosingReport",
    "interfaceName": "IShiftClosingReportRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "ShiftClosingReport | null",
        "params": [
          "id: ShiftClosingReportId"
        ],
        "description": "Load a shift closing report by identity"
      },
      {
        "name": "list",
        "returns": "ShiftClosingReport[]",
        "params": [
          "filter: ShiftClosingReportFilter"
        ],
        "description": "List closing reports matching domain filter"
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "aggregate: ShiftClosingReport"
        ],
        "description": "Persist shift closing report aggregate"
      },
      {
        "name": "findByDailyShiftId",
        "returns": "ShiftClosingReport | null",
        "params": [
          "dailyShiftId: DailyShiftId"
        ],
        "description": "Find closing report for a daily shift"
      },
      {
        "name": "findByPeriod",
        "returns": "ShiftClosingReport[]",
        "params": [
          "period: DateRange"
        ],
        "description": "Find closing reports within a date range"
      }
    ]
  }
} as const;

export default shiftClosingReportRepositoryPort;

export const pipeline = [
  {
    "id": "shiftClosingReportRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/shiftClosingReportRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/shiftClosingReport.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/repositoryPort.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
