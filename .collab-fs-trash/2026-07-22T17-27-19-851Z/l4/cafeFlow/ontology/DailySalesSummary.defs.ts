/// <mls fileReference="_102051_/l4/cafeFlow/ontology/DailySalesSummary.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityDailySalesSummary = {
  "entityId": "DailySalesSummary",
  "title": "Resumo de Vendas do Dia (IA)",
  "description": "Resumo em linguagem natural das vendas do turno atual, gerado pelo assistente de IA via proxy LLM da plataforma, exibido para o gerente.",
  "kind": "metric",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "dailySalesSummaryId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do resumo de vendas do dia gerado pela IA."
    },
    {
      "fieldId": "shiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do turno ativo que originou os dados utilizados na geração do resumo."
    },
    {
      "fieldId": "summaryText",
      "type": "text",
      "required": true,
      "description": "Texto em linguagem natural com o resumo das vendas do turno, produzido pelo proxy LLM da plataforma."
    },
    {
      "fieldId": "generatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que o resumo foi gerado pelo assistente de IA."
    },
    {
      "fieldId": "modelVersion",
      "type": "string",
      "required": false,
      "description": "Versão do modelo de IA utilizado pelo proxy LLM da plataforma para gerar o resumo."
    },
    {
      "fieldId": "sourceDataSnapshot",
      "type": "text",
      "required": false,
      "description": "Identificador ou hash do snapshot dos dados do turno utilizados como entrada para a geração do resumo."
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
  ]
} as const;

export default cafeFlowEntityDailySalesSummary;
