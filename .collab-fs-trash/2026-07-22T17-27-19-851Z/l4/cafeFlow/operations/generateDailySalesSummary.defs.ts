/// <mls fileReference="_102051_/l4/cafeFlow/operations/generateDailySalesSummary.defs.ts" enhancement="_blank"/>

export const operationGenerateDailySalesSummary = {
  "operationId": "generateDailySalesSummary",
  "title": "Resumir vendas do dia com IA",
  "actors": [
    "gerente"
  ],
  "entity": "DailySalesSummary",
  "kind": "create",
  "reads": [
    "Shift",
    "Order",
    "OrderItem",
    "MenuItem",
    "ShiftReport"
  ],
  "writes": [
    "DailySalesSummary"
  ],
  "rulesApplied": [
    "aiSummaryUsesCurrentShiftOnly"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Obter um resumo em linguagem natural das vendas do turno atual gerado pelo assistente de IA",
    "steps": [
      "O gerente solicita o resumo de vendas do dia ao assistente de IA",
      "O sistema coleta exclusivamente os dados do turno aberto da unidade",
      "A geração do texto passa pelo proxy LLM da plataforma",
      "O resumo gerado é persistido e exibido ao gerente"
    ],
    "outcome": "Resumo de vendas do dia em português é criado e exibido, destacando total vendido, tipos de pedido e itens de destaque do turno atual"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Comando que gera e persiste o resumo de vendas do turno atual via proxy LLM da plataforma",
    "entity": "DailySalesSummary",
    "keyField": "DailySalesSummary.dailySalesSummaryId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "DailySalesSummary.dailySalesSummaryId",
      "DailySalesSummary.shiftId",
      "DailySalesSummary.summaryText",
      "DailySalesSummary.generatedAt",
      "DailySalesSummary.modelVersion",
      "DailySalesSummary.sourceDataSnapshot"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "dailySalesSummaryId",
        "type": "string",
        "required": true,
        "fieldRef": "DailySalesSummary.dailySalesSummaryId"
      },
      {
        "name": "shiftId",
        "type": "string",
        "required": true,
        "fieldRef": "DailySalesSummary.shiftId"
      },
      {
        "name": "summaryText",
        "type": "string",
        "required": true,
        "fieldRef": "DailySalesSummary.summaryText"
      },
      {
        "name": "generatedAt",
        "type": "string",
        "required": true,
        "fieldRef": "DailySalesSummary.generatedAt"
      },
      {
        "name": "modelVersion",
        "type": "string",
        "required": false,
        "fieldRef": "DailySalesSummary.modelVersion"
      },
      {
        "name": "sourceDataSnapshot",
        "type": "string",
        "required": false,
        "fieldRef": "DailySalesSummary.sourceDataSnapshot"
      },
      {
        "name": "createdAt",
        "type": "string",
        "required": true,
        "fieldRef": "DailySalesSummary.createdAt"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "shiftId",
      "fieldRef": "DailySalesSummary.shiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Turno aberto da unidade cujos dados de vendas alimentam a geração do resumo"
    },
    {
      "inputId": "dailySalesSummaryId",
      "fieldRef": "DailySalesSummary.dailySalesSummaryId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado para o novo resumo de vendas do dia"
    },
    {
      "inputId": "generatedAt",
      "fieldRef": "DailySalesSummary.generatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora em que o resumo foi gerado pelo assistente de IA"
    },
    {
      "inputId": "createdAt",
      "fieldRef": "DailySalesSummary.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora de criação do registro do resumo"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "DailySalesSummary.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora da última atualização do registro do resumo"
    }
  ],
  "contextResolution": [
    {
      "inputId": "shiftId",
      "targetRef": "DailySalesSummary.shiftId",
      "source": "activeLifecycleInstance",
      "originRef": "Shift.shiftId",
      "description": "Resolve o único Shift com status open no contexto da unidade ativa"
    },
    {
      "inputId": "dailySalesSummaryId",
      "targetRef": "DailySalesSummary.dailySalesSummaryId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Gera um UUID para o novo registro de resumo de vendas do dia"
    },
    {
      "inputId": "generatedAt",
      "targetRef": "DailySalesSummary.generatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Timestamp do momento em que o proxy LLM conclui a geração do resumo"
    },
    {
      "inputId": "createdAt",
      "targetRef": "DailySalesSummary.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Timestamp de criação do registro no momento da persistência"
    },
    {
      "inputId": "updatedAt",
      "targetRef": "DailySalesSummary.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Timestamp de atualização inicial igual ao momento da criação"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, existe um DailySalesSummary vinculado ao shiftId do turno aberto com summaryText não vazio em português",
    "O resumo é gerado exclusivamente com dados do turno atual (pedidos, itens e totais do Shift aberto); nenhum dado de turnos anteriores é utilizado",
    "A geração do summaryText passa pelo proxy LLM da plataforma e generatedAt registra o momento da geração",
    "O texto do resumo destaca total vendido, tipos de pedido e itens de destaque do turno",
    "O registro criado possui dailySalesSummaryId, shiftId, summaryText, generatedAt, createdAt e updatedAt preenchidos"
  ],
  "pageId": "generateDailySalesSummary",
  "commandName": "generateDailySalesSummary",
  "bffName": "cafeFlow.generateDailySalesSummary.generateDailySalesSummary",
  "capability": {
    "capabilityId": "generateDailySalesSummary",
    "title": "Resumir vendas do dia com IA",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationGenerateDailySalesSummary;
