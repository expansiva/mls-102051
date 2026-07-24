/// <mls fileReference="_102051_/l4/cafeFlow/ontology/Order.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityOrder = {
  "entityId": "Order",
  "title": "Pedido",
  "description": "Pedido de mesa ou takeout com itens, quantidades, observações, total, forma de pagamento básica e ciclo de status coordenado entre salão e cozinha.",
  "kind": "core",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "orderId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do pedido (chave primária)."
    },
    {
      "fieldId": "dailyShiftId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do turno diário ao qual o pedido está vinculado."
    },
    {
      "fieldId": "orderType",
      "type": "string",
      "required": true,
      "description": "Origem do pedido: atendimento em mesa ou takeout (retirada no balcão).",
      "enum": [
        "table",
        "takeout"
      ]
    },
    {
      "fieldId": "tableNumber",
      "type": "string",
      "required": false,
      "description": "Identificador ou número da mesa quando o pedido é de mesa."
    },
    {
      "fieldId": "customerName",
      "type": "string",
      "required": false,
      "description": "Nome do cliente para pedidos takeout ou identificação adicional."
    },
    {
      "fieldId": "totalAmount",
      "type": "money",
      "required": true,
      "description": "Total do pedido calculado a partir de preço e quantidade dos itens no momento do lançamento."
    },
    {
      "fieldId": "notes",
      "type": "text",
      "required": false,
      "description": "Observações gerais do pedido, que servem de referência para o preparo na cozinha."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Status atual do pedido no ciclo coordenado entre salão e cozinha.",
      "enum": [
        "registered",
        "confirmed",
        "inPreparation",
        "ready",
        "served",
        "cancelled"
      ]
    },
    {
      "fieldId": "registeredAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora em que o pedido foi registrado pelo atendente."
    },
    {
      "fieldId": "confirmedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o pedido foi confirmado e enviado para a fila da cozinha."
    },
    {
      "fieldId": "inPreparationAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que a cozinha iniciou o preparo do pedido."
    },
    {
      "fieldId": "readyAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o pedido ficou pronto para entrega ao cliente."
    },
    {
      "fieldId": "servedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o pedido foi servido ou entregue ao cliente (estado terminal positivo)."
    },
    {
      "fieldId": "cancelledAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o pedido foi cancelado (estado terminal negativo)."
    },
    {
      "fieldId": "cancellationReason",
      "type": "text",
      "required": false,
      "description": "Motivo do cancelamento ou observações sobre a anulação do pedido."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro do pedido."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro do pedido."
    }
  ],
  "statusEnum": [
    "registered",
    "confirmed",
    "inPreparation",
    "ready",
    "served",
    "cancelled"
  ],
  "lifecycleStates": [
    "registered",
    "confirmed",
    "inPreparation",
    "ready",
    "served",
    "cancelled"
  ],
  "rulesApplied": [
    "[]"
  ]
} as const;

export default cafeFlowEntityOrder;
