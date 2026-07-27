/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.defs.ts" enhancement="_blank"/>

export const dailyShiftRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "DailyShiftRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "DailyShift",
    "interfaceName": "IDailyShiftRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "DailyShift | null",
        "params": [
          "id: DailyShiftId"
        ],
        "description": "Load a daily shift by identity"
      },
      {
        "name": "list",
        "returns": "DailyShift[]",
        "params": [
          "filter: DailyShiftFilter"
        ],
        "description": "List daily shifts matching domain filter"
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "aggregate: DailyShift"
        ],
        "description": "Persist daily shift aggregate"
      },
      {
        "name": "findOpenByDate",
        "returns": "DailyShift | null",
        "params": [
          "date: CalendarDate"
        ],
        "description": "Find open shift for a calendar date"
      },
      {
        "name": "findByPeriod",
        "returns": "DailyShift[]",
        "params": [
          "period: DateRange"
        ],
        "description": "Find shifts within a date range"
      }
    ]
  }
} as const;

export default dailyShiftRepositoryPort;

export const pipeline = [
  {
    "id": "dailyShiftRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/dailyShiftRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/dailyShift.d.ts"
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
