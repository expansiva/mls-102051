/// <mls fileReference="_102051_/l4/cafeFlow/ontology/OrderCancellation.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityOrderCancellation = {
  "entityId": "OrderCancellation",
  "title": "Cancelamento de Pedido",
  "description": "Registro do cancelamento de um pedido com motivo, mantendo o histórico para o relatório de fechamento e permitindo o estorno dos ingredientes no estoque.",
  "kind": "event",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "orderCancellationId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do registro de cancelamento de pedido."
    },
    {
      "fieldId": "orderId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do pedido cancelado ao qual este registro pertence."
    },
    {
      "fieldId": "shiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do turno em que o cancelamento foi registrado, para composição do relatório de fechamento."
    },
    {
      "fieldId": "reason",
      "type": "string",
      "required": true,
      "description": "Motivo informado para o cancelamento do pedido, preservado para o relatório de turno."
    },
    {
      "fieldId": "cancelledAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que o cancelamento foi registrado."
    },
    {
      "fieldId": "cancelledByUserId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do usuário responsável pelo cancelamento do pedido."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Estado do registro de cancelamento dentro do seu ciclo de vida.",
      "enum": [
        "posted",
        "voided"
      ]
    },
    {
      "fieldId": "voidedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o registro de cancelamento foi anulado, quando aplicável."
    },
    {
      "fieldId": "voidReason",
      "type": "string",
      "required": false,
      "description": "Motivo da anulação do registro de cancelamento, quando aplicável."
    },
    {
      "fieldId": "notes",
      "type": "text",
      "required": false,
      "description": "Observações adicionais sobre o cancelamento, úteis para auditoria e contexto operacional."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro de cancelamento."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro de cancelamento."
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

export default cafeFlowEntityOrderCancellation;
