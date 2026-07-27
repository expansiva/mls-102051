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
    "title": "Pedido",
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
    "statusEnum": [
      "registered",
      "confirmed",
      "inPreparation",
      "ready",
      "served",
      "cancelled"
    ],
    "invariants": [
      "status lifecycle (forward-only): registered → confirmed → inPreparation → ready → served; cancelled may occur from registered|confirmed|inPreparation|ready; served and cancelled are terminal",
      "confirmedAt required iff status is confirmed or later (not cancelled from registered); inPreparationAt required iff status is inPreparation or later (non-cancelled path); readyAt required iff status is ready|served; servedAt required iff status is served; cancelledAt and cancellationReason required iff status is cancelled",
      "temporal order on non-cancelled path: registeredAt ≤ confirmedAt ≤ inPreparationAt ≤ readyAt ≤ servedAt; on cancel path: registeredAt ≤ cancelledAt (and ≤ any timestamps already set before cancel)",
      "createdAt ≤ updatedAt; createdAt ≤ registeredAt; updatedAt ≥ each set lifecycle timestamp",
      "orderType=table ⇒ tableNumber required and non-blank; orderType=takeout ⇒ customerName required and non-blank",
      "totalAmount ≥ 0 and totalAmount = sum(items.subtotal) at launch; Order must have at least one OrderItem",
      "OrderItem.quantity > 0; unitPrice ≥ 0; subtotal = quantity × unitPrice and subtotal ≥ 0; menuItemName and unitPrice are frozen at launch",
      "OrderItem status lifecycle: pending → sentToKitchen → inPreparation → ready; cancelled may occur from sentToKitchen|inPreparation|ready; ready and cancelled are terminal for the line",
      "OrderItem timestamps: sentToKitchenAt required iff status is sentToKitchen or later (non-cancelled); startedPreparationAt required iff inPreparation|ready; readyAt required iff ready; cancelledAt and cancellationReason required iff cancelled; pending ≤ sentToKitchenAt ≤ startedPreparationAt ≤ readyAt (or ≤ cancelledAt on cancel path)",
      "Order-level kitchen progression must stay coherent with items: order confirmed before any item sentToKitchen; order inPreparation only when at least one item is inPreparation|ready; order ready only when all non-cancelled items are ready; order served only after ready and all non-cancelled items ready; cancelling order cancels all non-terminal items",
      "OrderPayment is 1:1 with Order; payment.totalAmount = order.totalAmount and ≥ 0",
      "OrderPayment status lifecycle: open → closed | voided; closed and voided are terminal",
      "paidAt required when payment is registered/closed path; closedAt required iff status=closed; voidedAt and voidReason required iff status=voided; createdAt ≤ paidAt ≤ closedAt (closed path) or createdAt ≤ voidedAt (void path)",
      "payment may close only for a served (non-cancelled) order; voided payment cannot transition to closed"
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
