/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/ports/aiPromotionSuggestionRepository.defs.ts" enhancement="_blank"/>

export const aiPromotionSuggestionRepositoryPort = {
  "schemaVersion": "2026-06-26",
  "artifactType": "repositoryPort",
  "artifactId": "AiPromotionSuggestionRepository",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbRepositoryPort",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "AiPromotionSuggestion",
    "interfaceName": "IAiPromotionSuggestionRepository",
    "methods": [
      {
        "name": "getById",
        "returns": "AiPromotionSuggestion | null",
        "params": [
          "id: AiPromotionSuggestionId"
        ],
        "description": "Load an AI promotion suggestion by identity"
      },
      {
        "name": "list",
        "returns": "AiPromotionSuggestion[]",
        "params": [
          "filter: AiPromotionSuggestionFilter"
        ],
        "description": "List AI promotion suggestions matching domain filter"
      },
      {
        "name": "save",
        "returns": "void",
        "params": [
          "aggregate: AiPromotionSuggestion"
        ],
        "description": "Persist AI promotion suggestion aggregate"
      },
      {
        "name": "findActiveByPeriod",
        "returns": "AiPromotionSuggestion[]",
        "params": [
          "period: DateRange"
        ],
        "description": "Find active suggestions for a period"
      },
      {
        "name": "findPendingReview",
        "returns": "AiPromotionSuggestion[]",
        "params": [],
        "description": "Find suggestions awaiting human review"
      }
    ]
  }
} as const;

export default aiPromotionSuggestionRepositoryPort;

export const pipeline = [
  {
    "id": "aiPromotionSuggestionRepository__repositoryPort",
    "type": "repositoryPort",
    "outputPath": "_102051_/l1/cafeFlow/layer_2_application/ports/aiPromotionSuggestionRepository.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_2_application/ports/aiPromotionSuggestionRepository.defs.ts",
    "dependsFiles": [
      "_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.d.ts"
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
