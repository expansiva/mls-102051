/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/aiSalesSummaryRepository.defs.ts" enhancement="_blank"/>

export const aiSalesSummaryRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "AiSalesSummaryRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "AiSalesSummary",
    "interfaceName": "IAiSalesSummaryRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "AiSalesSummary | null",
        "params": [
          "id: AiSalesSummaryId"
        ],
        "description": "Load an AI sales summary by identity"
      },
      {
        "name": "list",
        "returns": "AiSalesSummary[]",
        "params": [
          "filter: AiSalesSummaryFilter"
        ],
        "description": "List AI sales summaries matching domain filter"
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "aggregate: AiSalesSummary"
        ],
        "description": "Persist AI sales summary aggregate"
      },
      {
        "name": "findByPeriod",
        "returns": "AiSalesSummary | null",
        "params": [
          "period: DateRange"
        ],
        "description": "Find sales summary for a period"
      },
      {
        "name": "findLatest",
        "returns": "AiSalesSummary | null",
        "params": [],
        "description": "Find the most recent sales summary"
      }
    ]
  }
} as const;

export default aiSalesSummaryRepositoryPort;

export const pipeline = [
  {
    "id": "aiSalesSummaryRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/aiSalesSummaryRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/aiSalesSummaryRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.d.ts"
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
