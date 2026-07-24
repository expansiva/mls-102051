/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.defs.ts" enhancement="_blank"/>

export const operationalDashboardRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "OperationalDashboardRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "OperationalDashboard",
    "interfaceName": "IOperationalDashboardRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "OperationalDashboard | null",
        "params": [
          "id: OperationalDashboardId"
        ],
        "description": "Load an operational dashboard by identity"
      },
      {
        "name": "list",
        "returns": "OperationalDashboard[]",
        "params": [
          "filter: OperationalDashboardFilter"
        ],
        "description": "List operational dashboards matching domain filter"
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "aggregate: OperationalDashboard"
        ],
        "description": "Persist operational dashboard aggregate"
      },
      {
        "name": "findCurrent",
        "returns": "OperationalDashboard | null",
        "params": [],
        "description": "Find the current operational dashboard snapshot"
      },
      {
        "name": "findByDailyShiftId",
        "returns": "OperationalDashboard | null",
        "params": [
          "dailyShiftId: DailyShiftId"
        ],
        "description": "Find dashboard snapshot for a daily shift"
      }
    ]
  }
} as const;

export default operationalDashboardRepositoryPort;

export const pipeline = [
  {
    "id": "operationalDashboardRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/operationalDashboard.d.ts"
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
