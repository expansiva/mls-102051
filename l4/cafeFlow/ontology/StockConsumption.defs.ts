/// <mls fileReference="_102051_/l4/cafeFlow/ontology/StockConsumption.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityStockConsumption = {
  "entityId": "StockConsumption",
  "title": "Baixa de Estoque",
  "description": "Fato append-only do consumo de ingredientes gerado pela baixa automática ao concluir/servir um pedido. Carrega os dados necessários para auditoria e estorno (referência ao pedido e ao insumo, quantidade debitada, motivo de anulação e marcação de validade).",
  "kind": "event",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "stockConsumptionId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da baixa de estoque (chave primária)."
    },
    {
      "fieldId": "orderId",
      "type": "uuid",
      "required": true,
      "description": "Pedido que originou a baixa automática de estoque."
    },
    {
      "fieldId": "stockItemId",
      "type": "uuid",
      "required": true,
      "description": "Insumo (StockItem) debitado pela baixa."
    },
    {
      "fieldId": "quantity",
      "type": "number",
      "required": true,
      "description": "Quantidade do insumo debitada, na unidade de medida configurada no cadastro do insumo."
    },
    {
      "fieldId": "occurredAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que a baixa foi registrada."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Estado da baixa de estoque.",
      "enum": [
        "posted",
        "voided"
      ]
    },
    {
      "fieldId": "voidedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que a baixa foi anulada (quando aplicável)."
    },
    {
      "fieldId": "voidReason",
      "type": "text",
      "required": false,
      "description": "Motivo/observação da anulação, usado para correções manuais feitas pelo gerente."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro."
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
    "retentionDays": 365
  }
} as const;

export default cafeFlowEntityStockConsumption;
