/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.defs.ts" enhancement="_blank"/>

export const aiPromotionSuggestionDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "AiPromotionSuggestion",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "AiPromotionSuggestion",
    "title": "Sugestão de Itens a Promover (IA)",
    "fields": [
      {
        "fieldId": "aiPromotionSuggestionId",
        "type": "uuid",
        "required": true,
        "description": "Identificador único da sugestão de promoção gerada pela IA."
      },
      {
        "fieldId": "operationalDashboardId",
        "type": "uuid",
        "required": true,
        "description": "Identificador do dashboard operacional a partir do qual a sugestão foi derivada."
      },
      {
        "fieldId": "menuItemId",
        "type": "uuid",
        "required": true,
        "description": "Identificador do item de menu sugerido para promoção."
      },
      {
        "fieldId": "menuItemName",
        "type": "string",
        "required": true,
        "description": "Nome do item de menu sugerido, capturado no momento da geração para exibição no dashboard."
      },
      {
        "fieldId": "menuCategoryId",
        "type": "uuid",
        "required": false,
        "description": "Identificador da categoria do item sugerido, quando aplicável."
      },
      {
        "fieldId": "reason",
        "type": "text",
        "required": true,
        "description": "Justificativa em linguagem natural explicando por que o item foi sugerido para promoção (ex.: baixo volume de vendas, excesso de estoque)."
      },
      {
        "fieldId": "salesLast7Days",
        "type": "number",
        "required": true,
        "description": "Quantidade de unidades vendidas do item nos últimos 7 dias, base da análise da IA."
      },
      {
        "fieldId": "salesToday",
        "type": "number",
        "required": false,
        "description": "Quantidade de unidades vendidas do item no dia corrente, quando disponível."
      },
      {
        "fieldId": "currentStockLevel",
        "type": "number",
        "required": false,
        "description": "Nível atual de estoque do item no momento da sugestão, em unidades."
      },
      {
        "fieldId": "confidenceScore",
        "type": "number",
        "required": true,
        "description": "Pontuação de confiança da sugestão gerada pela IA, entre 0 e 100."
      },
      {
        "fieldId": "suggestedDiscountPercent",
        "type": "number",
        "required": false,
        "description": "Percentual de desconto sugerido pela IA para a promoção, em valor percentual."
      },
      {
        "fieldId": "status",
        "type": "string",
        "required": true,
        "description": "Estado da sugestão de promoção no fluxo de decisão do gerente.",
        "enum": [
          "pending",
          "accepted",
          "rejected",
          "expired"
        ]
      },
      {
        "fieldId": "reviewedAt",
        "type": "datetime",
        "required": false,
        "description": "Data e hora em que o gerente avaliou a sugestão (aceitação ou rejeição)."
      },
      {
        "fieldId": "reviewedByUserId",
        "type": "uuid",
        "required": false,
        "description": "Identificador do usuário gerente que avaliou a sugestão."
      },
      {
        "fieldId": "reviewNotes",
        "type": "text",
        "required": false,
        "description": "Observações registradas pelo gerente ao aceitar ou rejeitar a sugestão."
      },
      {
        "fieldId": "generatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora em que a sugestão foi gerada pelo assistente de IA."
      },
      {
        "fieldId": "expiresAt",
        "type": "datetime",
        "required": false,
        "description": "Data e hora limite de validade da sugestão antes de expirar automaticamente."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de criação do registro da sugestão."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora da última atualização do registro da sugestão."
      }
    ],
    "valueObjects": [],
    "statusEnum": [
      "pending",
      "accepted",
      "rejected",
      "expired"
    ],
    "invariants": [
      "status lifecycle: pending → accepted | rejected | expired; accepted, rejected and expired are terminal",
      "reviewedAt and reviewedByUserId are required when status is accepted or rejected",
      "reviewedAt and reviewedByUserId must be absent when status is pending or expired",
      "reviewNotes may only be set when status is accepted or rejected",
      "generatedAt must be <= createdAt and <= updatedAt",
      "reviewedAt, when present, must be >= generatedAt and >= createdAt",
      "expiresAt, when present, must be > generatedAt",
      "status may become expired only when expiresAt is set and current time >= expiresAt; a pending suggestion past expiresAt must transition to expired",
      "accepted or rejected suggestions cannot transition to expired",
      "salesLast7Days must be >= 0",
      "salesToday, when present, must be >= 0",
      "currentStockLevel, when present, must be >= 0",
      "confidenceScore must be between 0 and 100 inclusive",
      "suggestedDiscountPercent, when present, must be > 0 and <= 100",
      "updatedAt must be >= createdAt",
      "reason must be non-empty",
      "menuItemName must be non-empty"
    ]
  }
} as const;

export default aiPromotionSuggestionDomainEntity;

export const pipeline = [
  {
    "id": "aiPromotionSuggestion__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
