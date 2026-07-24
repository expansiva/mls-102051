# E3 — Ontology: CafeFlow

- module: `cafeFlow`
- domain: Food service POS and operations
- entities: 14 / relationships: 14
- generatedAt: 2026-07-22T14:46:01.284Z

## Entities

### MenuItem (mdm, moduleOwned) — status: active → paused

Produto vendável no PDV, com categoria, preço, disponibilidade e vínculo aos ingredientes de estoque para baixa automática.

- `menuItemId` (uuid; required) — Identificador único do item do cardápio.
- `menuCategoryId` (uuid; required) — Categoria à qual o item pertence, para organização no PDV.
- `name` (string; required) — Nome do item exibido no cardápio e no PDV.
- `description` (text; optional) — Descrição curta do item para o cliente.
- `price` (money; required) — Preço de venda atual do item no PDV.
- `status` (string; required, enum: active|paused) — Disponibilidade atual do item: active para novos lançamentos, paused para ocultar do PDV.
- `pausedAt` (datetime; optional) — Data e hora em que o item foi pausado, quando aplicável.
- `pauseReason` (string; optional) — Motivo registrado para pausar o item.
- `imageUrl` (string; optional) — Imagem do item exibida no cardápio digital e no PDV.
- `displayOrder` (number; optional) — Ordem de exibição do item dentro de sua categoria.
- `requiresStockLink` (boolean; required) — Indica se o item exige vínculo com ingredientes para permitir baixa automática de estoque.
- `createdAt` (datetime; required) — Data e hora de criação do item do cardápio.
- `updatedAt` (datetime; required) — Data e hora da última atualização do item do cardápio.

### MenuCategory (mdm, moduleOwned) — status: active → inactive

Agrupamento estável de itens do cardápio usado para organizar o POS e a consulta rápida.

- `menuCategoryId` (uuid; required) — Identificador único da categoria do cardápio.
- `name` (string; required) — Nome exibido da categoria (ex.: Bebidas, Pratos Principais).
- `displayOrder` (number; required) — Ordem de exibição da categoria no POS para consulta rápida.
- `status` (string; required, enum: active|inactive) — Situação da categoria no cardápio ativo.
- `createdAt` (datetime; required) — Data e hora de criação da categoria.
- `updatedAt` (datetime; required) — Data e hora da última alteração da categoria.

### MenuItemIngredient (supporting, moduleOwned)

Associação entre um item do cardápio e um ingrediente de estoque, com a quantidade consumida por porção para viabilizar a baixa automática.

- `menuItemIngredientId` (uuid; required) — Identificador único do vínculo entre item de cardápio e ingrediente.
- `menuItemId` (uuid; required) — Item do cardápio ao qual o ingrediente está vinculado.
- `stockItemId` (uuid; required) — Ingrediente de estoque consumido por porção do item do cardápio.
- `quantityPerPortion` (number; required) — Quantidade do ingrediente consumida por porção servida do item.
- `unit` (string; required, enum: kg|gram|liter|milliliter|unit|portion) — Unidade de medida da quantidade por porção, deve corresponder à unidade do ingrediente no estoque.
- `createdAt` (datetime; required) — Data e hora de criação do vínculo.
- `updatedAt` (datetime; required) — Data e hora da última atualização do vínculo.

### StockItem (mdm, moduleOwned)

Insumo físico controlado pela cafeteria, com unidade de medida, saldo atual e nível mínimo para alerta de estoque baixo.

- `stockItemId` (uuid; required) — Identificador único do item de estoque.
- `name` (string; required) — Nome do insumo físico controlado pela cafeteria.
- `unit` (string; required, enum: kg|liter|portion|unit) — Unidade de medida utilizada para contabilizar o saldo e as movimentações do insumo.
- `currentBalance` (number; required) — Saldo atual disponível do insumo em estoque, atualizado pelas baixas automáticas e ajustes manuais.
- `minimumLevel` (number; required) — Nível mínimo configurado para disparo do alerta de estoque baixo no dashboard e no controle de estoque.
- `description` (text; optional) — Descrição complementar do insumo para auxiliar na identificação e uso pela equipe.
- `createdAt` (datetime; required) — Data e hora de criação do cadastro do item de estoque.
- `updatedAt` (datetime; required) — Data e hora da última atualização do cadastro do item de estoque.

### StockConsumption (event, moduleOwned) — status: posted → voided

Fato append-only do consumo de ingredientes gerado pela baixa automática ao concluir/servir um pedido. Carrega os dados necessários para auditoria e estorno (referência ao pedido e ao insumo, quantidade debitada, motivo de anulação e marcação de validade).

- `stockConsumptionId` (uuid; required) — Identificador único da baixa de estoque (chave primária).
- `orderId` (uuid; required) — Pedido que originou a baixa automática de estoque.
- `stockItemId` (uuid; required) — Insumo (StockItem) debitado pela baixa.
- `quantity` (number; required) — Quantidade do insumo debitada, na unidade de medida configurada no cadastro do insumo.
- `occurredAt` (datetime; required) — Data e hora em que a baixa foi registrada.
- `status` (string; required, enum: posted|voided) — Estado da baixa de estoque.
- `voidedAt` (datetime; optional) — Data e hora em que a baixa foi anulada (quando aplicável).
- `voidReason` (text; optional) — Motivo/observação da anulação, usado para correções manuais feitas pelo gerente.
- `createdAt` (datetime; required) — Data e hora de criação do registro.

### StockAdjustment (event, moduleOwned) — status: posted → voided

Fato append-only que registra correção manual de saldo de estoque feita por contagem, perda ou divergência, podendo ser compensado por novo ajuste.

- `stockAdjustmentId` (uuid; required) — Identificador único do ajuste manual de estoque.
- `stockItemId` (uuid; required) — Identificador do insumo cujo saldo foi选修
- `quantity` (number; required) — Quantidade afetada pelo ajuste manual, em unidade de medida do insumo.
- `direction` (string; required, enum: in|out|correction) — Direção do ajuste sobre o saldo (entrada, saída, acerto).
- `reason` (string; required, enum: count|loss|expiration|divergence|other) — Motivo do ajuste manual (contagem, perda, vencimento, divergência, outro).
- `managerUserId` (uuid; required) — Identificador do usuário gerente que autorizou o ajuste.
- `shiftId` (uuid; optional) — Identificador do turno ao qual o ajuste está vinculado.
- `resultingBalance` (number; required) — Saldo do insumo após a aplicação do ajuste, para auditoria.
- `notes` (text; optional) — Observação livre do gerente descrevendo a divergência ou contexto do ajuste.
- `status` (string; required, enum: posted|voided) — Estado do ajuste (registrado ou anulado).
- `createdAt` (datetime; required) — Data e hora em que o ajuste foi registrado.
- `voidedAt` (datetime; optional) — Data e hora em que o ajuste foi anulado.
- `voidedByUserId` (uuid; optional) — Identificador do usuário que anulou o ajuste.
- `compensatingAdjustmentId` (uuid; optional) — Identificador do ajuste de compensação quando este registro foi anulado.

### Order (core, moduleOwned) — status: registered → confirmed → inPreparation → ready → served → cancelled

Pedido de mesa ou takeout com itens, quantidades, observações, total, forma de pagamento básica e ciclo de status coordenado entre salão e cozinha.

- `orderId` (uuid; required) — Identificador único do pedido (chave primária).
- `dailyShiftId` (uuid; required) — Identificador do turno diário ao qual o pedido está vinculado.
- `orderType` (string; required, enum: table|takeout) — Origem do pedido: atendimento em mesa ou takeout (retirada no balcão).
- `tableNumber` (string; optional) — Identificador ou número da mesa quando o pedido é de mesa.
- `customerName` (string; optional) — Nome do cliente para pedidos takeout ou identificação adicional.
- `totalAmount` (money; required) — Total do pedido calculado a partir de preço e quantidade dos itens no momento do lançamento.
- `notes` (text; optional) — Observações gerais do pedido, que servem de referência para o preparo na cozinha.
- `status` (string; required, enum: registered|confirmed|inPreparation|ready|served|cancelled) — Status atual do pedido no ciclo coordenado entre salão e cozinha.
- `registeredAt` (datetime; required) — Data e hora em que o pedido foi registrado pelo atendente.
- `confirmedAt` (datetime; optional) — Data e hora em que o pedido foi confirmado e enviado para a fila da cozinha.
- `inPreparationAt` (datetime; optional) — Data e hora em que a cozinha iniciou o preparo do pedido.
- `readyAt` (datetime; optional) — Data e hora em que o pedido ficou pronto para entrega ao cliente.
- `servedAt` (datetime; optional) — Data e hora em que o pedido foi servido ou entregue ao cliente (estado terminal positivo).
- `cancelledAt` (datetime; optional) — Data e hora em que o pedido foi cancelado (estado terminal negativo).
- `cancellationReason` (text; optional) — Motivo do cancelamento ou observações sobre a anulação do pedido.
- `createdAt` (datetime; required) — Data e hora de criação do registro do pedido.
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro do pedido.

### OrderItem (supporting, moduleOwned) — status: pending → sentToKitchen → inPreparation → ready → cancelled

Linha de um pedido com referência ao item do cardápio ativo, quantidade, preço unitário congelado no lançamento, observações do cliente e estado de preparo controlado pela cozinha.

- `orderItemId` (uuid; required) — Identificador único da linha do pedido (chave primária).
- `orderId` (uuid; required) — Identificador do pedido ao qual esta linha pertence.
- `menuItemId` (uuid; required) — Identificador do item do cardápio (deve estar ativo) referenciado por esta linha.
- `menuItemName` (string; required) — Nome do item do cardápio congelado no momento do lançamento, preservando a referência de preparo caso o item do cardápio seja alterado depois.
- `quantity` (number; required) — Quantidade do item solicitada nesta linha do pedido.
- `unitPrice` (money; required) — Preço unitário do item congelado no momento do lançamento; é a base do subtotal e do total do pedido.
- `subtotal` (money; required) — Subtotal da linha (quantidade × preço unitário) congelado no lançamento.
- `observations` (text; optional) — Observações do cliente que servem como referência de preparo para a cozinha.
- `status` (string; required, enum: pending|sentToKitchen|inPreparation|ready|cancelled) — Estado de preparo da linha na cozinha, progredindo de forma coerente até a entrega ou cancelamento.
- `sentToKitchenAt` (datetime; optional) — Data e hora em que a linha entrou na fila da cozinha após confirmação do atendente.
- `startedPreparationAt` (datetime; optional) — Data e hora em que a cozinha iniciou o preparo da linha.
- `readyAt` (datetime; optional) — Data e hora em que a linha ficou pronta para entrega ao cliente.
- `cancelledAt` (datetime; optional) — Data e hora de cancelamento da linha, quando ocorre após o envio e exige alinhamento com o atendente.
- `cancellationReason` (string; optional) — Motivo registrado para o cancelamento da linha após o envio à cozinha.
- `createdAt` (datetime; required) — Data e hora de criação do registro da linha do pedido.
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro da linha do pedido.

### OrderPayment (supporting, horizontalOwned) — status: open → closed → voided

Registro simples do total e da forma de pagamento básica associada ao pedido para o fechamento do turno, sem conciliação financeira avançada.

- `orderPaymentId` (uuid; required) — Identificador único do registro de pagamento básico do pedido.
- `orderId` (uuid; required) — Identificador do pedido ao qual este pagamento básico está vinculado (relacionamento um-para-um).
- `totalAmount` (money; required) — Valor total do pedido no momento do lançamento, considerando preço e quantidade dos itens.
- `paymentMethod` (string; required, enum: cash|pix|creditCard|debitCard|mixed) — Forma de pagamento básica utilizada no fechamento do pedido.
- `status` (string; required, enum: open|closed|voided) — Situação do registro de pagamento dentro do fluxo de fechamento do turno.
- `paidAt` (datetime; optional) — Data e hora em que o pagamento básico foi registrado para o pedido.
- `closedAt` (datetime; optional) — Data e hora em que o pagamento foi consolidado no fechamento do turno diário.
- `voidedAt` (datetime; optional) — Data e hora em que o registro de pagamento foi anulado.
- `voidReason` (string; optional) — Motivo da anulação do registro de pagamento, quando aplicável.
- `notes` (text; optional) — Observações livres registradas no momento do fechamento, sem conciliação financeira avançada.
- `createdAt` (datetime; required) — Data e hora de criação do registro de pagamento.
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro de pagamento.

### DailyShift (core, moduleOwned) — status: open → closed

Turno operacional de um dia que concentra pedidos, vendas e movimentos de estoque, viabilizando o relatório de fechamento e o dashboard operacional.

- `dailyShiftId` (uuid; required) — Identificador único do turno diário (chave primária).
- `shiftDate` (date; required) — Data operacional do turno (dia de calendário ao qual o turno pertence).
- `status` (string; required, enum: open|closed) — Estado atual do turno: aberto (recebendo pedidos) ou fechado (pronto para relatório de fechamento).
- `openedByUserId` (uuid; required) — Identificador do operador (usuário) que abriu o turno.
- `closedByUserId` (uuid; optional) — Identificador do operador (usuário) que fechou o turno, quando aplicável.
- `openedAt` (datetime; required) — Data e hora de abertura do turno.
- `closedAt` (datetime; optional) — Data e hora de fechamento do turno; preenchido quando o turno é encerrado.
- `totalOrders` (number; optional) — Total de pedidos registrados durante o turno.
- `totalSalesAmount` (money; optional) — Valor total vendido no turno, somando os pedidos confirmados.
- `totalItemsSold` (number; optional) — Quantidade total de itens vendidos no turno.
- `cashTotal` (money; optional) — Total recebido em dinheiro no turno, conforme fechamento básico.
- `otherPaymentsTotal` (money; optional) — Total recebido via outras formas de pagamento (cartão, Pix, etc.) no turno, conforme fechamento básico.
- `notes` (text; optional) — Observações livres registradas na abertura ou no fechamento do turno.
- `createdAt` (datetime; required) — Data e hora de criação do registro do turno.
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro do turno.

### ShiftClosingReport (metric, moduleOwned)

Visão consolidada do turno encerrado com totais de vendas, itens movimentados, formas de pagamento básicas e sinais de estoque baixo/ruptura.

- `shiftClosingReportId` (uuid; required) — Identificador único do relatório de fechamento de turno.
- `dailyShiftId` (uuid; required) — Identificador do turno diário encerrado que originou o relatório.
- `shiftDate` (date; required) — Data de referência do turno encerrado.
- `totalSalesAmount` (money; required) — Total de vendas do turno em moeda.
- `totalOrdersCount` (number; required) — Quantidade total de pedidos realizados no turno.
- `totalItemsSold` (number; required) — Quantidade total de itens vendidos no turno.
- `cashPaymentsAmount` (money; required) — Valor total recebido em dinheiro durante o turno.
- `otherPaymentsAmount` (money; required) — Valor total recebido via outras formas de pagamento básicas durante o turno.
- `topSellingItemsSummary` (text; optional) — Lista dos itens mais vendidos do turno para destaque no relatório.
- `lowStockSignalsCount` (number; required) — Quantidade de itens de estoque que ficaram abaixo do nível mínimo durante o turno.
- `stockoutSignalsCount` (number; required) — Quantidade de itens de estoque que sofreram ruptura (zerados) durante o turno.
- `closingNotes` (text; optional) — Observações e motivos registrados no fechamento do turno.
- `generatedAt` (datetime; required) — Data e hora em que o relatório de fechamento foi gerado.
- `createdAt` (datetime; required) — Data e hora de criação do registro.
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro.

### OperationalDashboard (metric, moduleOwned)

Painel do gerente com vendas de hoje, itens mais vendidos e alertas de estoque baixo, base para decisões durante o turno.

- `operationalDashboardId` (uuid; required) — Identificador único do registro do dashboard operacional.
- `dailyShiftId` (uuid; required) — Identificador do turno diário (DailyShift) a partir do qual o dashboard é calculado.
- `referenceDate` (date; required) — Data de referência (dia) dos indicadores exibidos no dashboard.
- `todaySalesTotal` (money; required) — Total de vendas acumuladas do turno corrente, em moeda local.
- `todayOrdersCount` (number; required) — Quantidade de pedidos concluídos/servidos no turno corrente.
- `todayItemsSold` (number; required) — Quantidade de itens vendidos no turno corrente.
- `topMenuItemId` (uuid; optional) — Identificador do item de cardápio (MenuItem) mais vendido no turno, quando houver.
- `topMenuItemQuantity` (number; optional) — Quantidade vendida do item de cardápio mais vendido no turno.
- `topSellingItemsCount` (number; required) — Quantidade de itens do cardápio classificados como destaque (top vendidos) no turno.
- `lowStockItemsCount` (number; required) — Quantidade de itens de estoque atualmente abaixo do nível mínimo configurado.
- `outOfStockItemsCount` (number; required) — Quantidade de itens de estoque em situação de ruptura (sem saldo).
- `lowStockItemIds` (text; optional) — Lista resumida de identificadores de itens de estoque (StockItem) com alerta de estoque baixo.
- `hasLowStockAlert` (boolean; required) — Indica se há ao menos um alerta ativo de estoque baixo/ruptura no turno.
- `lastComputedAt` (datetime; required) — Momento em que o snapshot/aggregação do dashboard foi calculado pela última vez.
- `createdAt` (datetime; required) — Data e hora de criação do registro do dashboard.
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro do dashboard.

### AiSalesSummary (metric, moduleOwned)

Resumo narrativo das vendas do dia gerado pelo assistente de IA via proxy LLM da plataforma, para comunicação rápida à equipe.

- `aiSalesSummaryId` (uuid; required) — Identificador único do resumo de vendas gerado pela IA.
- `operationalDashboardId` (uuid; required) — Identificador do dashboard operacional do qual o resumo foi derivado.
- `summaryDate` (date; required) — Data de referência do dia ao qual o resumo se refere.
- `periodStart` (date; required) — Data inicial do período considerado para a geração do resumo (normalmente 7 dias antes de summaryDate).
- `periodEnd` (date; required) — Data final do período considerado para a geração do resumo (normalmente o próprio summaryDate).
- `summaryText` (text; required) — Texto narrativo do resumo de vendas produzido pelo assistente de IA.
- `modelId` (string; optional) — Identificador do modelo LLM utilizado pelo proxy da plataforma para gerar o resumo.
- `promptTokens` (number; optional) — Quantidade de tokens consumidos no prompt enviado ao LLM.
- `completionTokens` (number; optional) — Quantidade de tokens consumidos na resposta gerada pelo LLM.
- `generatedAt` (datetime; optional) — Data e hora em que o resumo foi efetivamente gerado pelo assistente de IA.
- `createdAt` (datetime; required) — Data e hora de criação do registro do resumo.
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro do resumo.

### AiPromotionSuggestion (metric, moduleOwned) — status: pending → accepted → rejected → expired

Recomendações geradas pelo assistente de IA com base nos últimos 7 dias para apoiar a decisão do gerente sobre quais itens promover.

- `aiPromotionSuggestionId` (uuid; required) — Identificador único da sugestão de promoção gerada pela IA.
- `operationalDashboardId` (uuid; required) — Identificador do dashboard operacional a partir do qual a sugestão foi derivada.
- `menuItemId` (uuid; required) — Identificador do item de menu sugerido para promoção.
- `menuItemName` (string; required) — Nome do item de menu sugerido, capturado no momento da geração para exibição no dashboard.
- `menuCategoryId` (uuid; optional) — Identificador da categoria do item sugerido, quando aplicável.
- `reason` (text; required) — Justificativa em linguagem natural explicando por que o item foi sugerido para promoção (ex.: baixo volume de vendas, excesso de estoque).
- `salesLast7Days` (number; required) — Quantidade de unidades vendidas do item nos últimos 7 dias, base da análise da IA.
- `salesToday` (number; optional) — Quantidade de unidades vendidas do item no dia corrente, quando disponível.
- `currentStockLevel` (number; optional) — Nível atual de estoque do item no momento da sugestão, em unidades.
- `confidenceScore` (number; required) — Pontuação de confiança da sugestão gerada pela IA, entre 0 e 100.
- `suggestedDiscountPercent` (number; optional) — Percentual de desconto sugerido pela IA para a promoção, em valor percentual.
- `status` (string; required, enum: pending|accepted|rejected|expired) — Estado da sugestão de promoção no fluxo de decisão do gerente.
- `reviewedAt` (datetime; optional) — Data e hora em que o gerente avaliou a sugestão (aceitação ou rejeição).
- `reviewedByUserId` (uuid; optional) — Identificador do usuário gerente que avaliou a sugestão.
- `reviewNotes` (text; optional) — Observações registradas pelo gerente ao aceitar ou rejeitar a sugestão.
- `generatedAt` (datetime; required) — Data e hora em que a sugestão foi gerada pelo assistente de IA.
- `expiresAt` (datetime; optional) — Data e hora limite de validade da sugestão antes de expirar automaticamente.
- `createdAt` (datetime; required) — Data e hora de criação do registro da sugestão.
- `updatedAt` (datetime; required) — Data e hora da última atualização do registro da sugestão.

## Relationships

- `menuItemBelongsToCategory`: MenuItem manyToOne MenuCategory — Cada item do cardápio pertence a uma categoria para organização do POS.
- `menuItemHasIngredients`: MenuItem oneToMany MenuItemIngredient — Um item do cardápio pode ter vários ingredientes vinculados para baixa automática.
- `menuItemIngredientReferencesStockItem`: MenuItemIngredient manyToOne StockItem — Cada vínculo aponta para um ingrediente de estoque e sua quantidade por porção.
- `orderHasOrderItems`: Order oneToMany OrderItem — Um pedido é composto por uma ou mais linhas de itens lançados.
- `orderItemReferencesMenuItem`: OrderItem manyToOne MenuItem — Cada linha do pedido referencia um item do cardápio ativo no momento do lançamento.
- `orderHasPayment`: Order oneToOne OrderPayment — Um pedido pode ter um registro básico de total e forma de pagamento.
- `orderBelongsToShift`: Order manyToOne DailyShift — Todo pedido do dia é vinculado ao turno diário aberto.
- `orderProducesStockConsumption`: Order oneToMany StockConsumption — Ao ser servido/concluído, o pedido gera baixas de estoque dos ingredientes vinculados.
- `stockConsumptionReferencesStockItem`: StockConsumption manyToOne StockItem — Cada baixa de estoque referencia o insumo debitado.
- `stockAdjustmentReferencesStockItem`: StockAdjustment manyToOne StockItem — Cada ajuste manual referencia o insumo cujo saldo foi corrigido.
- `shiftProducesClosingReport`: DailyShift oneToOne ShiftClosingReport — O turno encerrado gera seu relatório de fechamento.
- `dashboardAggregatesShift`: OperationalDashboard manyToOne DailyShift — O dashboard operacional é calculado a partir do turno corrente.
- `aiSummaryDerivedFromDashboard`: AiSalesSummary manyToOne OperationalDashboard — O resumo de vendas do dia é gerado pela IA a partir dos dados do dashboard.
- `aiPromotionDerivedFromDashboard`: AiPromotionSuggestion manyToOne OperationalDashboard — As sugestões de promoção são geradas pela IA a partir do histórico recente do dashboard.
