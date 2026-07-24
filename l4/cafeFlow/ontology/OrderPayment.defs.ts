/// <mls fileReference="_102051_/l4/cafeFlow/ontology/OrderPayment.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityOrderPayment = {
  "entityId": "OrderPayment",
  "title": "Pagamento Básico do Pedido",
  "description": "Registro simples do total e da forma de pagamento básica associada ao pedido para o fechamento do turno, sem conciliação financeira avançada.",
  "kind": "supporting",
  "ownership": "horizontalOwned",
  "fields": [
    {
      "fieldId": "orderPaymentId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do registro de pagamento básico do pedido."
    },
    {
      "fieldId": "orderId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do pedido ao qual este pagamento básico está vinculado (relacionamento um-para-um)."
    },
    {
      "fieldId": "totalAmount",
      "type": "money",
      "required": true,
      "description": "Valor total do pedido no momento do lançamento, considerando preço e quantidade dos itens."
    },
    {
      "fieldId": "paymentMethod",
      "type": "string",
      "required": true,
      "description": "Forma de pagamento básica utilizada no fechamento do pedido.",
      "enum": [
        "cash",
        "pix",
        "creditCard",
        "debitCard",
        "mixed"
      ]
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Situação do registro de pagamento dentro do fluxo de fechamento do turno.",
      "enum": [
        "open",
        "closed",
        "voided"
      ]
    },
    {
      "fieldId": "paidAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o pagamento básico foi registrado para o pedido."
    },
    {
      "fieldId": "closedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o pagamento foi consolidado no fechamento do turno diário."
    },
    {
      "fieldId": "voidedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o registro de pagamento foi anulado."
    },
    {
      "fieldId": "voidReason",
      "type": "string",
      "required": false,
      "description": "Motivo da anulação do registro de pagamento, quando aplicável."
    },
    {
      "fieldId": "notes",
      "type": "text",
      "required": false,
      "description": "Observações livres registradas no momento do fechamento, sem conciliação financeira avançada."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro de pagamento."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro de pagamento."
    }
  ],
  "statusEnum": [
    "open",
    "closed",
    "voided"
  ],
  "lifecycleStates": [
    "open",
    "closed",
    "voided"
  ]
} as const;

export default cafeFlowEntityOrderPayment;
