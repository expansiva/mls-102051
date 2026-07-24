/// <mls fileReference="_102051_/l1/cafeFlow/layer_3_domain/entities/order.defs.ts" enhancement="_blank"/>

export const orderDomainEntity = {
  "schemaVersion": "2026-06-26",
  "artifactType": "domainEntity",
  "artifactId": "Order",
  "moduleName": "cafeFlow",
  "status": "draft",
  "source": {
    "agentName": "agentCbDomainEntity",
    "stepId": 0,
    "planId": ""
  },
  "data": {
    "entityId": "Order",
    "title": "Order",
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
    "valueObjects": [
      {
        "name": "OrderItem",
        "collection": true,
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
        ]
      },
      {
        "name": "OrderPayment",
        "collection": false,
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
        ]
      }
    ],
    "invariants": [
      "Um pedido deve possuir ao menos um OrderItem associado.",
      "totalAmount deve ser igual à soma dos subtotal de todos os OrderItem do pedido.",
      "Quando orderType = 'table', tableNumber deve estar preenchido.",
      "Quando orderType = 'takeout', customerName deve estar preenchido.",
      "Transições de status devem seguir o ciclo: registered → confirmed → inPreparation → ready → served, ou desvio para cancelled a partir de estados não terminais.",
      "servedAt e cancelledAt são mutuamente exclusivos (não podem estar ambos preenchidos).",
      "confirmedAt deve estar preenchido quando status >= 'confirmed'.",
      "inPreparationAt deve estar preenchido quando status >= 'inPreparation'.",
      "readyAt deve estar preenchido quando status >= 'ready'.",
      "servedAt deve estar preenchido quando status = 'served'.",
      "cancelledAt deve estar preenchido quando status = 'cancelled'.",
      "cancellationReason deve estar preenchido quando status = 'cancelled'.",
      "confirmedAt, quando presente, deve ser maior ou igual a registeredAt.",
      "inPreparationAt, quando presente, deve ser maior ou igual a confirmedAt.",
      "readyAt, quando presente, deve ser maior ou igual a inPreparationAt.",
      "servedAt, quando presente, deve ser maior ou igual a readyAt.",
      "updatedAt deve ser maior ou igual a createdAt.",
      "dailyShiftId referenciado deve corresponder a um DailyShift existente e em estado 'open' no momento do registro.",
      "Cada OrderItem deve referenciar um menuItemId ativo no momento do lançamento.",
      "subtotal de cada OrderItem deve ser igual a quantity × unitPrice.",
      "quantity de cada OrderItem deve ser maior que zero."
    ],
    "statusEnum": [
      "registered",
      "confirmed",
      "inPreparation",
      "ready",
      "served",
      "cancelled"
    ]
  }
} as const;

export default orderDomainEntity;

export const pipeline = [
  {
    "id": "order__domainEntity",
    "type": "domainEntity",
    "outputPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/order.ts",
    "defPath": "_102051_/l1/cafeFlow/layer_3_domain/entities/order.defs.ts",
    "dependsFiles": [],
    "dependsOn": [],
    "skills": [
      "_102021_/l2/agentChangeBackend/skills/architecture.md",
      "_102021_/l2/agentChangeBackend/skills/domainEntity.md",
      "_102034_.d.ts"
    ],
    "agent": "agentCbMaterialize"
  }
] as const;
