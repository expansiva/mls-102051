/// <mls fileReference="_102051_/l4/cafeFlow/operations/createStockAdjustment.defs.ts" enhancement="_blank"/>

export const operationCreateStockAdjustment = {
  "operationId": "createStockAdjustment",
  "title": "Registrar ajuste manual de estoque",
  "actors": [
    "gerente"
  ],
  "entity": "StockAdjustment",
  "kind": "create",
  "reads": [
    "StockItem",
    "DailyShift"
  ],
  "writes": [
    "StockAdjustment",
    "StockItem"
  ],
  "rulesApplied": [
    "managerManualStockAdjustmentAllowed"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Corrigir o saldo de um insumo quando há perda, contagem ou divergência em relação à baixa automática",
    "steps": [
      "Seleciona o insumo cujo saldo precisa ser corrigido",
      "Informa a quantidade, a direção do ajuste e o motivo",
      "Opcionalmente adiciona observações sobre a divergência",
      "Confirma o registro do ajuste manual"
    ],
    "outcome": "O ajuste fica registrado como evento com status posted e o saldo do insumo é atualizado para o valor resultante"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Formulário de comando para o gerente registrar um ajuste manual de estoque sobre um insumo",
    "entity": "StockAdjustment",
    "keyField": "StockAdjustment.stockAdjustmentId",
    "pagination": "none",
    "selection": "none",
    "output": []
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "stockAdjustmentId",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.stockAdjustmentId"
      },
      {
        "name": "stockItemId",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.stockItemId"
      },
      {
        "name": "quantity",
        "type": "number",
        "required": true,
        "fieldRef": "StockAdjustment.quantity"
      },
      {
        "name": "direction",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.direction"
      },
      {
        "name": "reason",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.reason"
      },
      {
        "name": "managerUserId",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.managerUserId"
      },
      {
        "name": "shiftId",
        "type": "string",
        "required": false,
        "fieldRef": "StockAdjustment.shiftId"
      },
      {
        "name": "resultingBalance",
        "type": "number",
        "required": true,
        "fieldRef": "StockAdjustment.resultingBalance"
      },
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "fieldRef": "StockAdjustment.notes"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.status"
      },
      {
        "name": "createdAt",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.createdAt"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "stockItemId",
      "fieldRef": "StockAdjustment.stockItemId",
      "required": true,
      "source": "userInput",
      "description": "Insumo cujo saldo será ajustado manualmente"
    },
    {
      "inputId": "quantity",
      "fieldRef": "StockAdjustment.quantity",
      "required": true,
      "source": "userInput",
      "description": "Quantidade afetada pelo ajuste, na unidade de medida do insumo"
    },
    {
      "inputId": "direction",
      "fieldRef": "StockAdjustment.direction",
      "required": true,
      "source": "userInput",
      "description": "Direção do ajuste sobre o saldo (entrada, saída ou acerto)"
    },
    {
      "inputId": "reason",
      "fieldRef": "StockAdjustment.reason",
      "required": true,
      "source": "userInput",
      "description": "Motivo do ajuste manual (contagem, perda, vencimento, divergência ou outro)"
    },
    {
      "inputId": "notes",
      "fieldRef": "StockAdjustment.notes",
      "required": false,
      "source": "userInput",
      "description": "Observação livre descrevendo a divergência ou o contexto do ajuste"
    },
    {
      "inputId": "managerUserId",
      "fieldRef": "StockAdjustment.managerUserId",
      "required": true,
      "source": "actorSession",
      "description": "Identificador do gerente autenticado que autoriza o ajuste"
    },
    {
      "inputId": "shiftId",
      "fieldRef": "StockAdjustment.shiftId",
      "required": false,
      "source": "activeLifecycleInstance",
      "description": "Turno aberto ao qual o ajuste fica vinculado, quando houver"
    },
    {
      "inputId": "stockAdjustmentId",
      "fieldRef": "StockAdjustment.stockAdjustmentId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado para o novo ajuste"
    },
    {
      "inputId": "createdAt",
      "fieldRef": "StockAdjustment.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora em que o ajuste é registrado"
    }
  ],
  "contextResolution": [
    {
      "inputId": "managerUserId",
      "targetRef": "StockAdjustment.managerUserId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "Resolve o gerente autenticado a partir da sessão do ator logado"
    },
    {
      "inputId": "shiftId",
      "targetRef": "StockAdjustment.shiftId",
      "source": "activeLifecycleInstance",
      "originRef": "DailyShift.dailyShiftId",
      "description": "Resolve o único DailyShift com status open no contexto operacional atual, quando existir"
    },
    {
      "inputId": "stockAdjustmentId",
      "targetRef": "StockAdjustment.stockAdjustmentId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Gera um UUID para identificar o novo registro de ajuste"
    },
    {
      "inputId": "createdAt",
      "targetRef": "StockAdjustment.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Obtém o timestamp atual do servidor no momento do registro"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação existe um StockAdjustment com status posted referenciando o stockItemId informado",
    "O StockItem.currentBalance é atualizado para o resultingBalance calculado a partir da quantidade e da direção do ajuste",
    "O ajuste registra direction, reason e managerUserId do gerente autenticado como evento de auditoria",
    "Quando há turno aberto, o ajuste fica vinculado ao dailyShiftId desse turno via shiftId"
  ],
  "pageId": "createStockAdjustment",
  "commandName": "createStockAdjustment",
  "bffName": "cafeFlow.createStockAdjustment.createStockAdjustment",
  "capability": {
    "capabilityId": "createStockAdjustment",
    "title": "Registrar ajuste manual de estoque",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCreateStockAdjustment;
