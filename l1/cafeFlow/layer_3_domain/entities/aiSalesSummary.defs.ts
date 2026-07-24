/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.defs.ts" enhancement="_blank"/>

export const aiSalesSummaryDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "AiSalesSummary",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "AiSalesSummary",
    "title": "AiSalesSummary",
    "fields": [
      {
        "fieldId": "aiSalesSummaryId",
        "type": "uuid",
        "required": true,
        "description": "Identificador único do resumo de vendas gerado pela IA."
      },
      {
        "fieldId": "operationalDashboardId",
        "type": "uuid",
        "required": true,
        "description": "Identificador do dashboard operacional do qual o resumo foi derivado."
      },
      {
        "fieldId": "summaryDate",
        "type": "date",
        "required": true,
        "description": "Data de referência do dia ao qual o resumo se refere."
      },
      {
        "fieldId": "periodStart",
        "type": "date",
        "required": true,
        "description": "Data inicial do período considerado para a geração do resumo (normalmente 7 dias antes de summaryDate)."
      },
      {
        "fieldId": "periodEnd",
        "type": "date",
        "required": true,
        "description": "Data final do período considerado para a geração do resumo (normalmente o próprio summaryDate)."
      },
      {
        "fieldId": "summaryText",
        "type": "text",
        "required": true,
        "description": "Texto narrativo do resumo de vendas produzido pelo assistente de IA."
      },
      {
        "fieldId": "modelId",
        "type": "string",
        "required": false,
        "description": "Identificador do modelo LLM utilizado pelo proxy da plataforma para gerar o resumo."
      },
      {
        "fieldId": "promptTokens",
        "type": "number",
        "required": false,
        "description": "Quantidade de tokens consumidos no prompt enviado ao LLM."
      },
      {
        "fieldId": "completionTokens",
        "type": "number",
        "required": false,
        "description": "Quantidade de tokens consumidos na resposta gerada pelo LLM."
      },
      {
        "fieldId": "generatedAt",
        "type": "datetime",
        "required": false,
        "description": "Data e hora em que o resumo foi efetivamente gerado pelo assistente de IA."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de criação do registro do resumo."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora da última atualização do registro do resumo."
      }
    ],
    "valueObjects": [],
    "invariants": [
      "periodEnd deve ser maior ou igual a periodStart.",
      "summaryDate deve estar dentro do intervalo [periodStart, periodEnd].",
      "summaryText deve ser um texto não vazio.",
      "promptTokens, quando presente, deve ser maior ou igual a zero.",
      "completionTokens, quando presente, deve ser maior ou igual a zero.",
      "generatedAt, quando presente, deve ser maior ou igual a createdAt.",
      "updatedAt deve ser maior ou igual a createdAt."
    ],
    "statusEnum": []
  }
} as const;

export default aiSalesSummaryDomainEntity;

export const pipeline = [
  {
    "id": "aiSalesSummary__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/aiSalesSummary.defs.ts",
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
