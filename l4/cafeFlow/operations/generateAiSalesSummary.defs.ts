/// <mls fileReference="_102051_/l4/cafeFlow/operations/generateAiSalesSummary.defs.ts" enhancement="_blank"/>

export const operationGenerateAiSalesSummary = {
  "operationId": "generateAiSalesSummary",
  "title": "Gerar resumo de vendas do dia (IA)",
  "actors": [
    "gerente"
  ],
  "entity": "AiSalesSummary",
  "kind": "view",
  "reads": [
    "AiSalesSummary",
    "OperationalDashboard",
    "DailyShift",
    "Order",
    "OrderItem"
  ],
  "writes": [],
  "rulesApplied": [
    "aiSummaryUsesExistingOperationalData"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Obter um resumo narrativo das vendas do dia gerado por IA para comunicar a equipe ou registrar insights rápidos",
    "steps": [
      "O gerente acessa o dashboard operacional do dia",
      "Solicita ao assistente de IA um resumo narrativo das vendas do dia",
      "O sistema reúne exclusivamente os dados de vendas do dia corrente e dos últimos 7 dias já existentes na operação",
      "O proxy LLM da plataforma gera o texto narrativo do resumo com base nesses dados"
    ],
    "outcome": "Resumo do dia gerado com texto narrativo pronto para o gerente comunicar a equipe"
  },
  "accessPattern": {
    "kind": "lookup",
    "description": "Gera ou obtém o resumo narrativo de vendas do dia via assistente de IA a partir do dashboard operacional ativo",
    "entity": "AiSalesSummary",
    "keyField": "AiSalesSummary.operationalDashboardId",
    "filters": [
      "AiSalesSummary.summaryDate"
    ],
    "pagination": "none",
    "selection": "single",
    "output": [
      "AiSalesSummary.aiSalesSummaryId",
      "AiSalesSummary.operationalDashboardId",
      "AiSalesSummary.summaryDate",
      "AiSalesSummary.periodStart",
      "AiSalesSummary.periodEnd",
      "AiSalesSummary.summaryText",
      "AiSalesSummary.modelId",
      "AiSalesSummary.promptTokens",
      "AiSalesSummary.completionTokens",
      "AiSalesSummary.generatedAt"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "aiSalesSummaryId",
        "type": "string",
        "required": true,
        "fieldRef": "AiSalesSummary.aiSalesSummaryId"
      },
      {
        "name": "operationalDashboardId",
        "type": "string",
        "required": true,
        "fieldRef": "AiSalesSummary.operationalDashboardId"
      },
      {
        "name": "summaryDate",
        "type": "string",
        "required": true,
        "fieldRef": "AiSalesSummary.summaryDate"
      },
      {
        "name": "periodStart",
        "type": "string",
        "required": true,
        "fieldRef": "AiSalesSummary.periodStart"
      },
      {
        "name": "periodEnd",
        "type": "string",
        "required": true,
        "fieldRef": "AiSalesSummary.periodEnd"
      },
      {
        "name": "summaryText",
        "type": "string",
        "required": true,
        "fieldRef": "AiSalesSummary.summaryText"
      },
      {
        "name": "modelId",
        "type": "string",
        "required": false,
        "fieldRef": "AiSalesSummary.modelId"
      },
      {
        "name": "promptTokens",
        "type": "number",
        "required": false,
        "fieldRef": "AiSalesSummary.promptTokens"
      },
      {
        "name": "completionTokens",
        "type": "number",
        "required": false,
        "fieldRef": "AiSalesSummary.completionTokens"
      },
      {
        "name": "generatedAt",
        "type": "string",
        "required": false,
        "fieldRef": "AiSalesSummary.generatedAt"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "operationalDashboardId",
      "fieldRef": "OperationalDashboard.operationalDashboardId",
      "required": true,
      "source": "selectedEntity",
      "description": "Dashboard operacional atualmente em contexto, a partir do qual o resumo de vendas será derivado"
    }
  ],
  "contextResolution": [
    {
      "inputId": "operationalDashboardId",
      "targetRef": "AiSalesSummary.operationalDashboardId",
      "source": "selectedEntity",
      "originRef": "OperationalDashboard.operationalDashboardId",
      "description": "Resolve o dashboard operacional selecionado na tela do gerente como origem dos dados agregados do dia"
    },
    {
      "targetRef": "AiSalesSummary.summaryDate",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define a data de referência do resumo a partir da data atual do sistema quando não informada explicitamente"
    },
    {
      "targetRef": "AiSalesSummary.periodEnd",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define o fim do período analisado como a data atual do sistema (normalmente o próprio dia do resumo)"
    },
    {
      "targetRef": "AiSalesSummary.periodStart",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Calcula o início do período como 7 dias antes da data de referência, usando a data atual do sistema como base"
    }
  ],
  "acceptanceAssertions": [
    "Após a solicitação do gerente, um AiSalesSummary é retornado com summaryText narrativo não vazio",
    "O resumo utiliza exclusivamente dados de vendas do dia corrente e dos últimos 7 dias já existentes na operação (OperationalDashboard, DailyShift, Order e OrderItem)",
    "O AiSalesSummary retornado referencia o operationalDashboardId do dashboard operacional em contexto",
    "periodStart corresponde a aproximadamente 7 dias antes de summaryDate e periodEnd corresponde a summaryDate",
    "O resultado da operação corresponde ao resumo do dia gerado, pronto para comunicação à equipe"
  ],
  "pageId": "generateAiSalesSummary",
  "commandName": "generateAiSalesSummary",
  "bffName": "cafeFlow.generateAiSalesSummary.generateAiSalesSummary",
  "capability": {
    "capabilityId": "generateAiSalesSummary",
    "title": "Gerar resumo de vendas do dia (IA)",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationGenerateAiSalesSummary;
