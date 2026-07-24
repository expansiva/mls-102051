/// <mls fileReference="_102051_/l4/cafeFlow/operations/generatePromotionSuggestions.defs.ts" enhancement="_blank"/>

export const operationGeneratePromotionSuggestions = {
  "operationId": "generatePromotionSuggestions",
  "title": "Sugerir itens a promover com IA",
  "actors": [
    "gerente"
  ],
  "entity": "PromotionSuggestion",
  "kind": "create",
  "reads": [
    "PromotionSuggestion",
    "MenuItem",
    "Order",
    "OrderItem",
    "Shift",
    "ShiftReport",
    "StockItem"
  ],
  "writes": [
    "PromotionSuggestion"
  ],
  "rulesApplied": [
    "promotionSuggestionsLast7DaysOnly"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Obter sugestões de itens do cardápio a promover com base na análise dos últimos 7 dias de operação",
    "steps": [
      "O gerente solicita ao assistente de IA sugestões de itens a promover",
      "O sistema analisa os últimos 7 dias de operação no contexto da unidade e do turno aberto",
      "A IA identifica itens candidatos a promoção e gera a justificativa",
      "O sistema persiste a sugestão com decisão pendente para avaliação do gerente"
    ],
    "outcome": "Uma sugestão de promoção é criada com os itens candidatos e o motivo, aguardando decisão do gerente"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Comando para gerar, via IA, sugestões de itens a promover com base nos últimos 7 dias de operação",
    "entity": "PromotionSuggestion",
    "keyField": "PromotionSuggestion.promotionSuggestionId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "PromotionSuggestion.promotionSuggestionId",
      "PromotionSuggestion.shiftId",
      "PromotionSuggestion.generatedAt",
      "PromotionSuggestion.analysisWindowDays",
      "PromotionSuggestion.menuItemIds",
      "PromotionSuggestion.reason",
      "PromotionSuggestion.managerDecision",
      "PromotionSuggestion.createdAt"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "promotionSuggestionId",
        "type": "string",
        "required": true,
        "fieldRef": "PromotionSuggestion.promotionSuggestionId"
      },
      {
        "name": "shiftId",
        "type": "string",
        "required": true,
        "fieldRef": "PromotionSuggestion.shiftId"
      },
      {
        "name": "generatedAt",
        "type": "string",
        "required": true,
        "fieldRef": "PromotionSuggestion.generatedAt"
      },
      {
        "name": "analysisWindowDays",
        "type": "number",
        "required": true,
        "fieldRef": "PromotionSuggestion.analysisWindowDays"
      },
      {
        "name": "menuItemIds",
        "type": "array",
        "required": true,
        "fieldRef": "PromotionSuggestion.menuItemIds",
        "item": {
          "fields": [
            {
              "name": "menuItemId",
              "type": "string",
              "required": true,
              "fieldRef": "MenuItem.menuItemId"
            }
          ]
        }
      },
      {
        "name": "reason",
        "type": "string",
        "required": false,
        "fieldRef": "PromotionSuggestion.reason"
      },
      {
        "name": "managerDecision",
        "type": "string",
        "required": true,
        "fieldRef": "PromotionSuggestion.managerDecision"
      },
      {
        "name": "createdAt",
        "type": "string",
        "required": true,
        "fieldRef": "PromotionSuggestion.createdAt"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "shiftId",
      "fieldRef": "PromotionSuggestion.shiftId",
      "required": true,
      "source": "activeLifecycleInstance",
      "description": "Turno aberto da unidade que delimita o contexto operacional da sugestão"
    }
  ],
  "contextResolution": [
    {
      "inputId": "shiftId",
      "targetRef": "PromotionSuggestion.shiftId",
      "source": "activeLifecycleInstance",
      "originRef": "Shift.shiftId",
      "description": "Resolve o único turno com status open da unidade ativa do gerente"
    },
    {
      "targetRef": "PromotionSuggestion.promotionSuggestionId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Gera um UUID único para o registro da sugestão de promoção"
    },
    {
      "targetRef": "PromotionSuggestion.generatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define o timestamp do momento em que a IA gera a sugestão"
    },
    {
      "targetRef": "PromotionSuggestion.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define o timestamp de criação do registro da sugestão"
    },
    {
      "targetRef": "PromotionSuggestion.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define o timestamp da última atualização do registro da sugestão"
    }
  ],
  "acceptanceAssertions": [
    "Após a solicitação, existe um registro PromotionSuggestion vinculado ao turno aberto com analysisWindowDays igual a 7",
    "A sugestão é criada com managerDecision igual a pending e sem decidedAt preenchido",
    "A sugestão contém menuItemIds de itens do cardápio candidatos e um reason gerado pela IA",
    "A análise considera apenas os últimos 7 dias de operação do contexto da unidade",
    "A IA não cria promoções automaticamente; apenas persiste a sugestão para decisão do gerente",
    "A lista de sugestões de promoção fica disponível para o gerente ler e avaliar"
  ],
  "pageId": "generatePromotionSuggestions",
  "commandName": "generatePromotionSuggestions",
  "bffName": "cafeFlow.generatePromotionSuggestions.generatePromotionSuggestions",
  "capability": {
    "capabilityId": "generatePromotionSuggestions",
    "title": "Sugerir itens a promover com IA",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationGeneratePromotionSuggestions;
