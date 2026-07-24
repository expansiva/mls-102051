/// <mls fileReference="_102051_/l4/cafeFlow/operations/adjustStockQuantity.defs.ts" enhancement="_blank"/>

export const operationAdjustStockQuantity = {
  "operationId": "adjustStockQuantity",
  "title": "Repor ou ajustar estoque",
  "actors": [
    "gerente"
  ],
  "entity": "StockAdjustment",
  "kind": "create",
  "reads": [
    "StockItem"
  ],
  "writes": [
    "StockAdjustment",
    "StockItem"
  ],
  "rulesApplied": [
    "stockAdjustmentRequiresReason"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Registrar entrada, saída ou correção manual de quantidade em estoque com motivo auditável",
    "steps": [
      "Seleciona o item de estoque a ajustar",
      "Informa a direção do ajuste (entrada, saída ou correção), a quantidade e o motivo obrigatório",
      "Opcionalmente adiciona observações",
      "Confirma o registro do ajuste"
    ],
    "outcome": "Ajuste manual registrado com status posted, quantidade do item de estoque atualizada e histórico preservado para auditoria"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Formulário de ajuste manual de estoque: item, direção, quantidade, motivo e observações opcionais",
    "entity": "StockAdjustment",
    "keyField": "StockAdjustment.stockAdjustmentId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "StockAdjustment.stockAdjustmentId",
      "StockAdjustment.stockItemId",
      "StockAdjustment.direction",
      "StockAdjustment.quantity",
      "StockAdjustment.reason",
      "StockAdjustment.status",
      "StockAdjustment.occurredAt",
      "StockItem.currentQuantity"
    ]
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
        "name": "direction",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.direction"
      },
      {
        "name": "quantity",
        "type": "number",
        "required": true,
        "fieldRef": "StockAdjustment.quantity"
      },
      {
        "name": "reason",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.reason"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.status"
      },
      {
        "name": "occurredAt",
        "type": "string",
        "required": true,
        "fieldRef": "StockAdjustment.occurredAt"
      },
      {
        "name": "notes",
        "type": "string",
        "required": false,
        "fieldRef": "StockAdjustment.notes"
      },
      {
        "name": "currentQuantity",
        "type": "number",
        "required": true,
        "fieldRef": "StockItem.currentQuantity"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "stockItemId",
      "fieldRef": "StockAdjustment.stockItemId",
      "required": true,
      "source": "userInput",
      "description": "Item de estoque cuja quantidade será ajustada"
    },
    {
      "inputId": "direction",
      "fieldRef": "StockAdjustment.direction",
      "required": true,
      "source": "userInput",
      "description": "Direção do ajuste: entrada (in), saída (out) ou correção (correction)"
    },
    {
      "inputId": "quantity",
      "fieldRef": "StockAdjustment.quantity",
      "required": true,
      "source": "userInput",
      "description": "Quantidade a ajustar na unidade de medida do item"
    },
    {
      "inputId": "reason",
      "fieldRef": "StockAdjustment.reason",
      "required": true,
      "source": "userInput",
      "description": "Motivo obrigatório do ajuste para auditoria"
    },
    {
      "inputId": "notes",
      "fieldRef": "StockAdjustment.notes",
      "required": false,
      "source": "userInput",
      "description": "Observações adicionais opcionais sobre o ajuste"
    },
    {
      "inputId": "stockAdjustmentId",
      "fieldRef": "StockAdjustment.stockAdjustmentId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado para o novo ajuste"
    },
    {
      "inputId": "performedByUserId",
      "fieldRef": "StockAdjustment.performedByUserId",
      "required": true,
      "source": "actorSession",
      "description": "Usuário gerente autenticado que registra o ajuste"
    },
    {
      "inputId": "status",
      "fieldRef": "StockAdjustment.status",
      "required": true,
      "source": "systemDefault",
      "description": "Status inicial do ajuste (posted)"
    },
    {
      "inputId": "occurredAt",
      "fieldRef": "StockAdjustment.occurredAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora em que o ajuste é registrado"
    },
    {
      "inputId": "createdAt",
      "fieldRef": "StockAdjustment.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp de criação do registro"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "StockAdjustment.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Timestamp da última atualização do registro"
    }
  ],
  "contextResolution": [
    {
      "inputId": "stockAdjustmentId",
      "targetRef": "StockAdjustment.stockAdjustmentId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Gera um UUID único para o novo registro de ajuste de estoque"
    },
    {
      "inputId": "performedByUserId",
      "targetRef": "StockAdjustment.performedByUserId",
      "source": "actorSession",
      "originRef": "actorSession.actorId",
      "description": "Obtém o identificador do gerente autenticado na sessão atual"
    },
    {
      "inputId": "status",
      "targetRef": "StockAdjustment.status",
      "source": "systemDefault",
      "originRef": "systemDefault.locale",
      "description": "Define o status inicial do ajuste como posted ao criar o registro"
    },
    {
      "inputId": "occurredAt",
      "targetRef": "StockAdjustment.occurredAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Usa o timestamp atual do servidor como momento em que o ajuste ocorreu"
    },
    {
      "inputId": "createdAt",
      "targetRef": "StockAdjustment.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Usa o timestamp atual do servidor como data de criação"
    },
    {
      "inputId": "updatedAt",
      "targetRef": "StockAdjustment.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Usa o timestamp atual do servidor como data de atualização inicial"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, existe um StockAdjustment com status posted vinculado ao stockItemId informado",
    "A quantidade (currentQuantity) do StockItem é atualizada de acordo com a direção (in soma, out subtrai, correction define) e a quantity informada",
    "O ajuste é rejeitado se reason estiver ausente ou vazio",
    "O campo performedByUserId do ajuste corresponde ao gerente autenticado",
    "O ajuste registra occurredAt com a data/hora do registro e preserva direction, quantity e reason para auditoria"
  ],
  "pageId": "adjustStockQuantity",
  "commandName": "adjustStockQuantity",
  "bffName": "cafeFlow.adjustStockQuantity.adjustStockQuantity",
  "capability": {
    "capabilityId": "adjustStockQuantity",
    "title": "Repor ou ajustar estoque",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationAdjustStockQuantity;
