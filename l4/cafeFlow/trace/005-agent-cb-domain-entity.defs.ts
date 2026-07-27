{
  "savedAt": "2026-07-24T19:57:52.728Z",
  "agentName": "agentCbDomainEntity",
  "stepId": 5,
  "planning": {
    "planId": "cb-gen-domain",
    "dependsOn": [
      "cb-lock"
    ],
    "executionMode": "sequential",
    "executionHost": "client"
  },
  "status": "waiting_after_prompt",
  "payload": {
    "type": "flexible",
    "result": {
      "toolName": "submitDomainEntities",
      "arguments": {
        "status": "ok",
        "result": {
          "items": [
            {
              "entityId": "DailyShift",
              "title": "Daily Shift",
              "fields": [
                {
                  "fieldId": "dailyShiftId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do turno diário (chave primária)."
                },
                {
                  "fieldId": "shiftDate",
                  "type": "date",
                  "required": true,
                  "description": "Data operacional do turno (dia de calendário ao qual o turno pertence)."
                },
                {
                  "fieldId": "status",
                  "type": "string",
                  "required": true,
                  "description": "Estado atual do turno: aberto (recebendo pedidos) ou fechado (pronto para relatório de fechamento).",
                  "enum": [
                    "open",
                    "closed"
                  ]
                },
                {
                  "fieldId": "openedByUserId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador do operador (usuário) que abriu o turno."
                },
                {
                  "fieldId": "closedByUserId",
                  "type": "uuid",
                  "required": false,
                  "description": "Identificador do operador (usuário) que fechou o turno, quando aplicável."
                },
                {
                  "fieldId": "openedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de abertura do turno."
                },
                {
                  "fieldId": "closedAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora de fechamento do turno; preenchido quando o turno é encerrado."
                },
                {
                  "fieldId": "totalOrders",
                  "type": "number",
                  "required": false,
                  "description": "Total de pedidos registrados durante o turno."
                },
                {
                  "fieldId": "totalSalesAmount",
                  "type": "money",
                  "required": false,
                  "description": "Valor total vendido no turno, somando os pedidos confirmados."
                },
                {
                  "fieldId": "totalItemsSold",
                  "type": "number",
                  "required": false,
                  "description": "Quantidade total de itens vendidos no turno."
                },
                {
                  "fieldId": "cashTotal",
                  "type": "money",
                  "required": false,
                  "description": "Total recebido em dinheiro no turno, conforme fechamento básico."
                },
                {
                  "fieldId": "otherPaymentsTotal",
                  "type": "money",
                  "required": false,
                  "description": "Total recebido via outras formas de pagamento (cartão, Pix, etc.) no turno, conforme fechamento básico."
                },
                {
                  "fieldId": "notes",
                  "type": "text",
                  "required": false,
                  "description": "Observações livres registradas na abertura ou no fechamento do turno."
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de criação do registro do turno."
                },
                {
                  "fieldId": "updatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora da última atualização do registro do turno."
                }
              ],
              "statusEnum": [
                "open",
                "closed"
              ],
              "invariants": [
                "dailyShiftId é único no agregado e nunca reutilizado.",
                "shiftDate é obrigatório e deve ser uma data válida de calendário.",
                "Quando status = \"open\", openedAt e openedByUserId são obrigatórios e closedAt/closedByUserId devem ser nulos.",
                "Quando status = \"closed\", closedAt e closedByUserId passam a ser obrigatórios; openedAt e openedByUserId permanecem imutáveis.",
                "openedAt deve ser menor ou igual a closedAt quando o turno está fechado.",
                "totalOrders, totalItemsSold, totalSalesAmount, cashTotal e otherPaymentsTotal, quando presentes, devem ser maiores ou iguais a zero.",
                "cashTotal + otherPaymentsTotal = totalSalesAmount (quando todos presentes).",
                "Transição de status só é permitida de \"open\" para \"closed\"; após \"closed\" o turno é imutável (apenas leitura para auditoria).",
                "createdAt deve ser menor ou igual a updatedAt, e updatedAt deve ser maior ou igual a createdAt em qualquer alteração."
              ]
            },
            {
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
              "statusEnum": [
                "registered",
                "confirmed",
                "inPreparation",
                "ready",
                "served",
                "cancelled"
              ],
              "invariants": [
                "orderId é único no agregado.",
                "dailyShiftId é obrigatório e deve referenciar um DailyShift existente.",
                "orderType é obrigatório; se orderType = \"table\", tableNumber é obrigatório; se orderType = \"takeout\", customerName é recomendado.",
                "totalAmount é obrigatório e deve ser maior ou igual a zero.",
                "registeredAt é obrigatório e marca o início do ciclo de vida do pedido.",
                "Transições de status permitidas: registered → confirmed → inPreparation → ready → served; a partir de qualquer estado (exceto terminais) é possível ir para cancelled.",
                "\"served\" e \"cancelled\" são estados terminais: depois de atingidos, status, totalAmount e itens não podem mais ser alterados.",
                "Quando status = \"confirmed\", confirmedAt é obrigatório; quando status = \"inPreparation\", inPreparationAt é obrigatório; quando status = \"ready\", readyAt é obrigatório; quando status = \"served\", servedAt é obrigatório.",
                "Quando status = \"cancelled\", cancelledAt e cancellationReason são obrigatórios.",
                "A linha do tempo registeredAt ≤ confirmedAt ≤ inPreparationAt ≤ readyAt ≤ servedAt deve ser monotônica.",
                "Cada Order deve conter ao menos um OrderItem para existir.",
                "Para cada OrderItem: subtotal = quantity × unitPrice, ambos devem ser maiores que zero; menuItemId deve referenciar um MenuItem ativo no momento do lançamento.",
                "Order.totalAmount = soma de OrderItem.subtotal de todos os itens do pedido.",
                "Se OrderItem.status = \"cancelled\", então cancelledAt e cancellationReason são obrigatórios e o item não conta para o totalAmount.",
                "Order pode ter no máximo um OrderPayment (relação um-para-um); OrderPayment.totalAmount deve ser igual a Order.totalAmount no momento do fechamento.",
                "OrderPayment.status = \"closed\" exige closedAt; OrderPayment.status = \"voided\" exige voidedAt e voidReason.",
                "createdAt ≤ updatedAt, e updatedAt avança a cada transição de status."
              ]
            },
            {
              "entityId": "ShiftClosingReport",
              "title": "Shift Closing Report",
              "fields": [
                {
                  "fieldId": "shiftClosingReportId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do relatório de fechamento de turno."
                },
                {
                  "fieldId": "dailyShiftId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador do turno diário encerrado que originou o relatório."
                },
                {
                  "fieldId": "shiftDate",
                  "type": "date",
                  "required": true,
                  "description": "Data de referência do turno encerrado."
                },
                {
                  "fieldId": "totalSalesAmount",
                  "type": "money",
                  "required": true,
                  "description": "Total de vendas do turno em moeda."
                },
                {
                  "fieldId": "totalOrdersCount",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade total de pedidos realizados no turno."
                },
                {
                  "fieldId": "totalItemsSold",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade total de itens vendidos no turno."
                },
                {
                  "fieldId": "cashPaymentsAmount",
                  "type": "money",
                  "required": true,
                  "description": "Valor total recebido em dinheiro durante o turno."
                },
                {
                  "fieldId": "otherPaymentsAmount",
                  "type": "money",
                  "required": true,
                  "description": "Valor total recebido via outras formas de pagamento básicas durante o turno."
                },
                {
                  "fieldId": "topSellingItemsSummary",
                  "type": "text",
                  "required": false,
                  "description": "Lista dos itens mais vendidos do turno para destaque no relatório."
                },
                {
                  "fieldId": "lowStockSignalsCount",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade de itens de estoque que ficaram abaixo do nível mínimo durante o turno."
                },
                {
                  "fieldId": "stockoutSignalsCount",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade de itens de estoque que sofreram ruptura (zerados) durante o turno."
                },
                {
                  "fieldId": "closingNotes",
                  "type": "text",
                  "required": false,
                  "description": "Observações e motivos registrados no fechamento do turno."
                },
                {
                  "fieldId": "generatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora em que o relatório de fechamento foi gerado."
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de criação do registro."
                },
                {
                  "fieldId": "updatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora da última atualização do registro."
                }
              ],
              "invariants": [
                "shiftClosingReportId é único no agregado.",
                "dailyShiftId é obrigatório e deve referenciar um DailyShift com status = \"closed\".",
                "shiftDate deve coincidir com DailyShift.shiftDate do turno referenciado.",
                "Existe no máximo um ShiftClosingReport por DailyShift (relação um-para-um).",
                "totalSalesAmount, cashPaymentsAmount e otherPaymentsAmount devem ser maiores ou iguais a zero.",
                "totalSalesAmount = cashPaymentsAmount + otherPaymentsAmount.",
                "totalOrdersCount e totalItemsSold devem ser maiores ou iguais a zero.",
                "lowStockSignalsCount e stockoutSignalsCount devem ser maiores ou iguais a zero.",
                "generatedAt é obrigatório e representa o instante de fechamento do relatório.",
                "Uma vez gerado, o relatório é somente leitura (campos financeiros e contagens são imutáveis); apenas closingNotes pode ser ajustado em reedições controladas, com atualização de updatedAt.",
                "createdAt ≤ updatedAt, e updatedAt ≥ generatedAt."
              ]
            },
            {
              "entityId": "AiPromotionSuggestion",
              "title": "AI Promotion Suggestion",
              "fields": [
                {
                  "fieldId": "aiPromotionSuggestionId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único da sugestão de promoção gerada pela IA."
                },
                {
                  "fieldId": "operationalDashboardId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador do dashboard operacional a partir do qual a sugestão foi derivada."
                },
                {
                  "fieldId": "menuItemId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador do item de menu sugerido para promoção."
                },
                {
                  "fieldId": "menuItemName",
                  "type": "string",
                  "required": true,
                  "description": "Nome do item de menu sugerido, capturado no momento da geração para exibição no dashboard."
                },
                {
                  "fieldId": "menuCategoryId",
                  "type": "uuid",
                  "required": false,
                  "description": "Identificador da categoria do item sugerido, quando aplicável."
                },
                {
                  "fieldId": "reason",
                  "type": "text",
                  "required": true,
                  "description": "Justificativa em linguagem natural explicando por que o item foi sugerido para promoção (ex.: baixo volume de vendas, excesso de estoque)."
                },
                {
                  "fieldId": "salesLast7Days",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade de unidades vendidas do item nos últimos 7 dias, base da análise da IA."
                },
                {
                  "fieldId": "salesToday",
                  "type": "number",
                  "required": false,
                  "description": "Quantidade de unidades vendidas do item no dia corrente, quando disponível."
                },
                {
                  "fieldId": "currentStockLevel",
                  "type": "number",
                  "required": false,
                  "description": "Nível atual de estoque do item no momento da sugestão, em unidades."
                },
                {
                  "fieldId": "confidenceScore",
                  "type": "number",
                  "required": true,
                  "description": "Pontuação de confiança da sugestão gerada pela IA, entre 0 e 100."
                },
                {
                  "fieldId": "suggestedDiscountPercent",
                  "type": "number",
                  "required": false,
                  "description": "Percentual de desconto sugerido pela IA para a promoção, em valor percentual."
                },
                {
                  "fieldId": "status",
                  "type": "string",
                  "required": true,
                  "description": "Estado da sugestão de promoção no fluxo de decisão do gerente.",
                  "enum": [
                    "pending",
                    "accepted",
                    "rejected",
                    "expired"
                  ]
                },
                {
                  "fieldId": "reviewedAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora em que o gerente avaliou a sugestão (aceitação ou rejeição)."
                },
                {
                  "fieldId": "reviewedByUserId",
                  "type": "uuid",
                  "required": false,
                  "description": "Identificador do usuário gerente que avaliou a sugestão."
                },
                {
                  "fieldId": "reviewNotes",
                  "type": "text",
                  "required": false,
                  "description": "Observações registradas pelo gerente ao aceitar ou rejeitar a sugestão."
                },
                {
                  "fieldId": "generatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora em que a sugestão foi gerada pelo assistente de IA."
                },
                {
                  "fieldId": "expiresAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora limite de validade da sugestão antes de expirar automaticamente."
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de criação do registro da sugestão."
                },
                {
                  "fieldId": "updatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora da última atualização do registro da sugestão."
                }
              ],
              "statusEnum": [
                "pending",
                "accepted",
                "rejected",
                "expired"
              ],
              "invariants": [
                "aiPromotionSuggestionId é único no agregado.",
                "operationalDashboardId é obrigatório e deve referenciar um OperationalDashboard existente.",
                "menuItemId é obrigatório e deve referenciar um item de menu válido.",
                "menuItemName é obrigatório e deve ser uma cópia do nome do item no momento da geração (preserva contexto histórico).",
                "reason é obrigatório e não pode ser vazio.",
                "salesLast7Days deve ser maior ou igual a zero.",
                "salesToday e currentStockLevel, quando presentes, devem ser maiores ou iguais a zero.",
                "confidenceScore deve estar no intervalo [0, 100].",
                "suggestedDiscountPercent, quando presente, deve estar no intervalo [0, 100].",
                "generatedAt é obrigatório; expiresAt, quando presente, deve ser estritamente maior que generatedAt.",
                "Quando status passa de \"pending\" para \"accepted\" ou \"rejected\", reviewedAt e reviewedByUserId passam a ser obrigatórios.",
                "\"accepted\", \"rejected\" e \"expired\" são estados terminais: nenhuma transição adicional é permitida a partir deles.",
                "createdAt ≤ updatedAt, e updatedAt avança quando o status é alterado."
              ]
            },
            {
              "entityId": "AiSalesSummary",
              "title": "AI Sales Summary",
              "fields": [
                {
                  "fieldId": "aiSalesSummaryId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do resumo de vendas gerado pela IA."
                },
                {
                  "fieldId": "operationalDashboardId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador do dashboard operacional do qual o resumo foi derivado."
                },
                {
                  "fieldId": "summaryDate",
                  "type": "date",
                  "required": true,
                  "description": "Data de referência do dia ao qual o resumo se refere."
                },
                {
                  "fieldId": "periodStart",
                  "type": "date",
                  "required": true,
                  "description": "Data inicial do período considerado para a geração do resumo (normalmente 7 dias antes de summaryDate)."
                },
                {
                  "fieldId": "periodEnd",
                  "type": "date",
                  "required": true,
                  "description": "Data final do período considerado para a geração do resumo (normalmente o próprio summaryDate)."
                },
                {
                  "fieldId": "summaryText",
                  "type": "text",
                  "required": true,
                  "description": "Texto narrativo do resumo de vendas produzido pelo assistente de IA."
                },
                {
                  "fieldId": "modelId",
                  "type": "string",
                  "required": false,
                  "description": "Identificador do modelo LLM utilizado pelo proxy da plataforma para gerar o resumo."
                },
                {
                  "fieldId": "promptTokens",
                  "type": "number",
                  "required": false,
                  "description": "Quantidade de tokens consumidos no prompt enviado ao LLM."
                },
                {
                  "fieldId": "completionTokens",
                  "type": "number",
                  "required": false,
                  "description": "Quantidade de tokens consumidos na resposta gerada pelo LLM."
                },
                {
                  "fieldId": "generatedAt",
                  "type": "datetime",
                  "required": false,
                  "description": "Data e hora em que o resumo foi efetivamente gerado pelo assistente de IA."
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de criação do registro do resumo."
                },
                {
                  "fieldId": "updatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora da última atualização do registro do resumo."
                }
              ],
              "invariants": [
                "aiSalesSummaryId é único no agregado.",
                "operationalDashboardId é obrigatório e deve referenciar um OperationalDashboard existente.",
                "summaryDate é obrigatório e identifica o dia do resumo.",
                "periodStart deve ser menor ou igual a periodEnd, e periodEnd deve ser menor ou igual a summaryDate.",
                "summaryText é obrigatório e não pode ser vazio.",
                "promptTokens e completionTokens, quando presentes, devem ser maiores ou iguais a zero.",
                "createdAt ≤ updatedAt, e generatedAt, quando presente, deve estar entre createdAt e updatedAt.",
                "Uma vez gerado, o registro é imutável (audit trail da geração de IA); somente metadata técnico (updatedAt) pode refletir regenerações controladas."
              ]
            },
            {
              "entityId": "OperationalDashboard",
              "title": "Operational Dashboard",
              "fields": [
                {
                  "fieldId": "operationalDashboardId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador único do registro do dashboard operacional."
                },
                {
                  "fieldId": "dailyShiftId",
                  "type": "uuid",
                  "required": true,
                  "description": "Identificador do turno diário (DailyShift) a partir do qual o dashboard é calculado."
                },
                {
                  "fieldId": "referenceDate",
                  "type": "date",
                  "required": true,
                  "description": "Data de referência (dia) dos indicadores exibidos no dashboard."
                },
                {
                  "fieldId": "todaySalesTotal",
                  "type": "money",
                  "required": true,
                  "description": "Total de vendas acumuladas do turno corrente, em moeda local."
                },
                {
                  "fieldId": "todayOrdersCount",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade de pedidos concluídos/servidos no turno corrente."
                },
                {
                  "fieldId": "todayItemsSold",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade de itens vendidos no turno corrente."
                },
                {
                  "fieldId": "topMenuItemId",
                  "type": "uuid",
                  "required": false,
                  "description": "Identificador do item de cardápio (MenuItem) mais vendido no turno, quando houver."
                },
                {
                  "fieldId": "topMenuItemQuantity",
                  "type": "number",
                  "required": false,
                  "description": "Quantidade vendida do item de cardápio mais vendido no turno."
                },
                {
                  "fieldId": "topSellingItemsCount",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade de itens do cardápio classificados como destaque (top vendidos) no turno."
                },
                {
                  "fieldId": "lowStockItemsCount",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade de itens de estoque atualmente abaixo do nível mínimo configurado."
                },
                {
                  "fieldId": "outOfStockItemsCount",
                  "type": "number",
                  "required": true,
                  "description": "Quantidade de itens de estoque em situação de ruptura (sem saldo)."
                },
                {
                  "fieldId": "lowStockItemIds",
                  "type": "text",
                  "required": false,
                  "description": "Lista resumida de identificadores de itens de estoque (StockItem) com alerta de estoque baixo."
                },
                {
                  "fieldId": "hasLowStockAlert",
                  "type": "boolean",
                  "required": true,
                  "description": "Indica se há ao menos um alerta ativo de estoque baixo/ruptura no turno."
                },
                {
                  "fieldId": "lastComputedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Momento em que o snapshot/aggregação do dashboard foi calculado pela última vez."
                },
                {
                  "fieldId": "createdAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora de criação do registro do dashboard."
                },
                {
                  "fieldId": "updatedAt",
                  "type": "datetime",
                  "required": true,
                  "description": "Data e hora da última atualização do registro do dashboard."
                }
              ],
              "invariants": [
                "operationalDashboardId é único no agregado.",
                "dailyShiftId é obrigatório e deve referenciar um DailyShift existente.",
                "referenceDate deve coincidir com DailyShift.shiftDate do turno referenciado.",
                "todaySalesTotal, todayOrdersCount, todayItemsSold, topSellingItemsCount, lowStockItemsCount e outOfStockItemsCount devem ser maiores ou iguais a zero.",
                "topMenuItemQuantity, quando presente, deve ser maior que zero; topMenuItemId, quando presente, deve referenciar um MenuItem válido.",
                "hasLowStockAlert deve ser true se e somente se (lowStockItemsCount > 0 OR outOfStockItemsCount > 0).",
                "lowStockItemIds, quando presente, deve listar identificadores coerentes com lowStockItemsCount.",
                "lastComputedAt é obrigatório e deve ser maior ou igual a createdAt; updatedAt deve ser maior ou igual a lastComputedAt.",
                "O dashboard é uma projeção derivada: seus contadores são recalculáveis a partir do DailyShift e dos agregados relacionados, sem efeito colateral."
              ]
            },
            {
              "entityId": "StockAdjustment",
              "title": "Stock Adjustment",
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
                  "description": "Identificador do insumo cujo saldo foi afetado."
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
              "invariants": []
            },
            {
              "entityId": "StockConsumption",
              "title": "Stock Consumption",
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
              "invariants": []
            }
          ]
        },
        "questions": [],
        "trace": [
          "Mapped 6 aggregate roots to pure domain entities: DailyShift, Order, ShiftClosingReport, AiPromotionSuggestion, AiSalesSummary, OperationalDashboard.",
          "Embedded OrderItem and OrderPayment within Order as valueObjects; OrderItem is one-to-many (collection=true) and OrderPayment is one-to-one (collection=false).",
          "Defined business invariants for each aggregate root covering uniqueness, required references, monetary/non-negative arithmetic, status transitions, and chronological consistency of timestamps.",
          "Mapped 2 append-only event records: StockAdjustment (no eventOwner) and StockConsumption (eventOwner=Order); events carry no invariants beyond their fields.",
          "Preserved all fieldIds in camelCase, types, enums and Portuguese descriptions directly from the ontology.",
          "No persistence concerns, no ctx.data references and no SQL included in the output."
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
