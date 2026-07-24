{
  "savedAt": "2026-07-22T21:17:17.534Z",
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
              "title": "DailyShift",
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
              "valueObjects": [],
              "invariants": [
                "Um turno deve sempre ter openedByUserId e openedAt definidos no momento da criação.",
                "closedByUserId e closedAt devem ser preenchidos em conjunto (ambos presentes ou ambos nulos).",
                "Quando status = 'open', closedAt e closedByUserId devem ser nulos.",
                "Quando status = 'closed', closedAt e closedByUserId devem estar preenchidos.",
                "closedAt, quando presente, deve ser maior ou igual a openedAt.",
                "totalSalesAmount, quando presente, deve ser igual à soma dos pedidos confirmados vinculados ao turno.",
                "cashTotal + otherPaymentsTotal, quando ambos presentes, deve ser igual a totalSalesAmount.",
                "totalOrders, totalItemsSold, totalSalesAmount, cashTotal e otherPaymentsTotal, quando presentes, devem ser maiores ou iguais a zero.",
                "updatedAt deve ser maior ou igual a createdAt.",
                "Não pode existir mais de um DailyShift aberto (status = 'open') para a mesma shiftDate simultaneamente."
              ],
              "statusEnum": [
                "open",
                "closed"
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
            },
            {
              "entityId": "ShiftClosingReport",
              "title": "ShiftClosingReport",
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
              "valueObjects": [],
              "invariants": [
                "dailyShiftId referenciado deve corresponder a um DailyShift existente e em estado 'closed'.",
                "totalSalesAmount deve ser igual a cashPaymentsAmount + otherPaymentsAmount.",
                "totalOrdersCount deve ser maior ou igual a zero.",
                "totalItemsSold deve ser maior ou igual a zero.",
                "lowStockSignalsCount deve ser maior ou igual a zero.",
                "stockoutSignalsCount deve ser maior ou igual a zero.",
                "totalSalesAmount, cashPaymentsAmount e otherPaymentsAmount devem ser maiores ou iguais a zero.",
                "generatedAt deve ser maior ou igual ao closedAt do DailyShift referenciado.",
                "updatedAt deve ser maior ou igual a createdAt.",
                "Não pode existir mais de um ShiftClosingReport para o mesmo dailyShiftId."
              ],
              "statusEnum": []
            },
            {
              "entityId": "AiPromotionSuggestion",
              "title": "AiPromotionSuggestion",
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
              "valueObjects": [],
              "invariants": [
                "confidenceScore deve estar entre 0 e 100 (inclusive).",
                "suggestedDiscountPercent, quando presente, deve estar entre 0 e 100 (inclusive).",
                "salesLast7Days deve ser maior ou igual a zero.",
                "salesToday, quando presente, deve ser maior ou igual a zero.",
                "currentStockLevel, quando presente, deve ser maior ou igual a zero.",
                "Quando status = 'accepted' ou status = 'rejected', reviewedAt e reviewedByUserId devem estar preenchidos.",
                "Quando status = 'pending', reviewedAt e reviewedByUserId devem ser nulos.",
                "expiresAt, quando presente, deve ser maior que generatedAt.",
                "reviewedAt, quando presente, deve ser maior ou igual a generatedAt.",
                "updatedAt deve ser maior ou igual a createdAt.",
                "reason deve ser um texto não vazio."
              ],
              "statusEnum": [
                "pending",
                "accepted",
                "rejected",
                "expired"
              ]
            },
            {
              "entityId": "AiSalesSummary",
              "title": "AiSalesSummary",
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
              "valueObjects": [],
              "invariants": [
                "periodEnd deve ser maior ou igual a periodStart.",
                "summaryDate deve estar dentro do intervalo [periodStart, periodEnd].",
                "summaryText deve ser um texto não vazio.",
                "promptTokens, quando presente, deve ser maior ou igual a zero.",
                "completionTokens, quando presente, deve ser maior ou igual a zero.",
                "generatedAt, quando presente, deve ser maior ou igual a createdAt.",
                "updatedAt deve ser maior ou igual a createdAt."
              ],
              "statusEnum": []
            },
            {
              "entityId": "OperationalDashboard",
              "title": "OperationalDashboard",
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
              "valueObjects": [],
              "invariants": [
                "todaySalesTotal deve ser maior ou igual a zero.",
                "todayOrdersCount deve ser maior ou igual a zero.",
                "todayItemsSold deve ser maior ou igual a zero.",
                "topSellingItemsCount deve ser maior ou igual a zero.",
                "lowStockItemsCount deve ser maior ou igual a zero.",
                "outOfStockItemsCount deve ser maior ou igual a zero.",
                "topMenuItemQuantity, quando presente, deve ser maior ou igual a zero.",
                "hasLowStockAlert deve ser verdadeiro se e somente se lowStockItemsCount > 0 ou outOfStockItemsCount > 0.",
                "Quando topMenuItemId está preenchido, topMenuItemQuantity também deve estar preenchido.",
                "Quando topMenuItemId é nulo, topMenuItemQuantity deve ser nulo.",
                "lastComputedAt deve ser maior ou igual a createdAt.",
                "updatedAt deve ser maior ou igual a createdAt.",
                "dailyShiftId referenciado deve corresponder a um DailyShift existente."
              ],
              "statusEnum": []
            },
            {
              "entityId": "StockAdjustment",
              "title": "StockAdjustment",
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
                  "description": "Identificador do insumo cujo saldo foi ajustado."
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
              "valueObjects": [],
              "invariants": [],
              "statusEnum": [
                "posted",
                "voided"
              ]
            },
            {
              "entityId": "StockConsumption",
              "title": "StockConsumption",
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
              "valueObjects": [],
              "invariants": [],
              "statusEnum": [
                "posted",
                "voided"
              ]
            }
          ]
        },
        "questions": [],
        "trace": [
          "Produced 8 pure domain entities: 6 aggregate roots (DailyShift, Order, ShiftClosingReport, AiPromotionSuggestion, AiSalesSummary, OperationalDashboard) and 2 append-only event records (StockAdjustment, StockConsumption).",
          "Order aggregate exposes two valueObjects: OrderItem (collection=true, oneToMany) and OrderPayment (collection=false, oneToOne).",
          "Event records (StockAdjustment, StockConsumption) carry no invariants beyond their fields, as instructed.",
          "All fieldIds are camelCase derived from the ontology; entityIds are PascalCase and never reuse the PT titles.",
          "No persistence, SQL, or ctx.data references were introduced."
        ]
      }
    },
    "status": "completed",
    "stepId": 6,
    "interaction": null,
    "nextSteps": null
  }
}
