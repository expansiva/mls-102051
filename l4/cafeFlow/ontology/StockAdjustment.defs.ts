/// <mls fileReference="_102051_/l4/cafeFlow/ontology/StockAdjustment.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityStockAdjustment = {
  "entityId": "StockAdjustment",
  "title": "Ajuste Manual de Estoque",
  "description": "Fato append-only que registra correção manual de saldo de estoque feita por contagem, perda ou divergência, podendo ser compensado por novo ajuste.",
  "kind": "event",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "stockAdjustmentId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do ajuste manual de estoque."
    },
    {
      "fieldId": "stockItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do insumo"
    },
    {
      "fieldId": "quantity",
      "type": "number",
      "required": true,
      "description": "Quantidade afetada pelo ajuste manual, em unidade de medida do insumo."
    },
    {
      "fieldId": "direction",
      "type": "string",
      "required": true,
      "description": "Direção do ajuste sobre o saldo (entrada, saída, acerto).",
      "enum": [
        "in",
        "out",
        "correction"
      ]
    },
    {
      "fieldId": "reason",
      "type": "string",
      "required": true,
      "description": "Motivo do ajuste manual (contagem, perda, vencimento, divergência, outro).",
      "enum": [
        "count",
        "loss",
        "expiration",
        "divergence",
        "other"
      ]
    },
    {
      "fieldId": "managerUserId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do usuário gerente que autorizou o ajuste."
    },
    {
      "fieldId": "shiftId",
      "type": "uuid",
      "required": false,
      "description": "Identificador do turno ao qual o ajuste está vinculado."
    },
    {
      "fieldId": "resultingBalance",
      "type": "number",
      "required": true,
      "description": "Saldo do insumo após a aplicação do ajuste, para auditoria."
    },
    {
      "fieldId": "notes",
      "type": "text",
      "required": false,
      "description": "Observação livre do gerente descrevendo a divergência ou contexto do ajuste."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Estado do ajuste (registrado ou anulado).",
      "enum": [
        "posted",
        "voided"
      ]
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que o ajuste foi registrado."
    },
    {
      "fieldId": "voidedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o ajuste foi anulado."
    },
    {
      "fieldId": "voidedByUserId",
      "type": "uuid",
      "required": false,
      "description": "Identificador do usuário que anulou o ajuste."
    },
    {
      "fieldId": "compensatingAdjustmentId",
      "type": "uuid",
      "required": false,
      "description": "Identificador do ajuste de compensação quando este registro foi anulado."
    }
  ],
  "statusEnum": [
    "posted",
    "voided"
  ],
  "lifecycleStates": [
    "posted",
    "voided"
  ],
  "eventPolicy": {
    "purpose": "audit",
    "retentionDays": 1825
  }
} as const;

export default cafeFlowEntityStockAdjustment;
