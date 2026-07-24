/// <mls fileReference="_102051_/l4/cafeFlow/ontology/OrderItem.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityOrderItem = {
  "entityId": "OrderItem",
  "title": "Item do Pedido",
  "description": "Linha de um pedido com referência ao item do cardápio ativo, quantidade, preço unitário congelado no lançamento, observações do cliente e estado de preparo controlado pela cozinha.",
  "kind": "supporting",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "orderItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da linha do pedido (chave primária)."
    },
    {
      "fieldId": "orderId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do pedido ao qual esta linha pertence."
    },
    {
      "fieldId": "menuItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador do item do cardápio (deve estar ativo) referenciado por esta linha."
    },
    {
      "fieldId": "menuItemName",
      "type": "string",
      "required": true,
      "description": "Nome do item do cardápio congelado no momento do lançamento, preservando a referência de preparo caso o item do cardápio seja alterado depois."
    },
    {
      "fieldId": "quantity",
      "type": "number",
      "required": true,
      "description": "Quantidade do item solicitada nesta linha do pedido."
    },
    {
      "fieldId": "unitPrice",
      "type": "money",
      "required": true,
      "description": "Preço unitário do item congelado no momento do lançamento; é a base do subtotal e do total do pedido."
    },
    {
      "fieldId": "subtotal",
      "type": "money",
      "required": true,
      "description": "Subtotal da linha (quantidade × preço unitário) congelado no lançamento."
    },
    {
      "fieldId": "observations",
      "type": "text",
      "required": false,
      "description": "Observações do cliente que servem como referência de preparo para a cozinha."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Estado de preparo da linha na cozinha, progredindo de forma coerente até a entrega ou cancelamento.",
      "enum": [
        "pending",
        "sentToKitchen",
        "inPreparation",
        "ready",
        "cancelled"
      ]
    },
    {
      "fieldId": "sentToKitchenAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que a linha entrou na fila da cozinha após confirmação do atendente."
    },
    {
      "fieldId": "startedPreparationAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que a cozinha iniciou o preparo da linha."
    },
    {
      "fieldId": "readyAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que a linha ficou pronta para entrega ao cliente."
    },
    {
      "fieldId": "cancelledAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora de cancelamento da linha, quando ocorre após o envio e exige alinhamento com o atendente."
    },
    {
      "fieldId": "cancellationReason",
      "type": "string",
      "required": false,
      "description": "Motivo registrado para o cancelamento da linha após o envio à cozinha."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do registro da linha do pedido."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do registro da linha do pedido."
    }
  ],
  "statusEnum": [
    "pending",
    "sentToKitchen",
    "inPreparation",
    "ready",
    "cancelled"
  ],
  "lifecycleStates": [
    "pending",
    "sentToKitchen",
    "inPreparation",
    "ready",
    "cancelled"
  ]
} as const;

export default cafeFlowEntityOrderItem;
