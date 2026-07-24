# E4 — Actors, rules and external refs: cafeFlow

- module: `cafeFlow`
- actors: 3 / rules: 18
- generatedAt: 2026-07-22T14:46:42.415Z

## Actors

| actorId | roleScope | title | description |
| --- | --- | --- | --- |
| `atendente` | `cafeFlow:atendente` | Atendente | Registra pedidos no PDV (mesa ou takeout), confirma o envio à cozinha, acompanha o status dos pedidos e marca como servidos/entregues os pedidos prontos. |
| `cozinheiro` | `cafeFlow:cozinheiro` | Cozinheiro | Recebe os pedidos confirmados na fila da cozinha, consulta itens e observações, e atualiza o status de preparo (recebido → em preparo → pronto). |
| `gerente` | `cafeFlow:gerente` | Gerente | Mantém cardápio e itens de estoque, ajusta manualmente o estoque, abre e fecha o turno diário, gera o relatório de fechamento e acompanha o dashboard operacional. |

## Rules

### `orderRequiresTableOrTakeout` (domain) — Pedido deve ser mesa ou takeout

Todo pedido registrado deve ser classificado como mesa (table) ou takeout; nenhum pedido pode existir sem essa definição.

- appliesTo: `Order`
- absorbs journey rules:
  - "Todo pedido deve ser mesa ou takeout."

### `onlyActiveMenuItemsCanBeOrdered` (domain) — Somente itens ativos do cardápio podem ser lançados no pedido

Somente itens do cardápio com status ativo podem ser lançados em um pedido; itens pausados ficam indisponíveis no POS.

- appliesTo: `OrderItem`, `MenuItem`
- absorbs journey rules:
  - "Somente itens ativos do cardápio podem ser lançados."
  - "Itens pausados não devem aparecer para novos lançamentos no POS."

### `orderEntersKitchenQueueAfterAttendantConfirmation` (application) — Pedido entra na fila da cozinha só após confirmação do atendente

Um pedido só entra na fila ativa da cozinha após confirmação explícita do atendente; pedidos não confirmados não são visíveis à cozinha.

- appliesTo: `Order`
- absorbs journey rules:
  - "O pedido só entra na fila da cozinha após confirmação do atendente."
  - "A cozinha só atua em pedidos enviados/confirmados."

### `orderTotalFromPriceAtLaunchTime` (domain) — Total do pedido usa preço e quantidade no momento do lançamento

O total do pedido é calculado a partir do preço de cardápio e da quantidade de cada item no instante do lançamento; alterações posteriores no cardápio não recalculam pedidos já registrados.

- appliesTo: `Order`, `OrderItem`
- absorbs journey rules:
  - "O total do pedido reflete preço e quantidade dos itens no momento do lançamento."

### `onlyReadyOrdersCanBeServed` (application) — Somente pedidos prontos podem ser marcados como servidos

Somente pedidos com status pronto podem ser marcados como servidos/entregues pelo atendente; não é permitido servir pedidos em outros estados.

- appliesTo: `Order`
- absorbs journey rules:
  - "Somente pedidos prontos podem ser marcados como servidos/entregues pelo atendente."

### `autoStockDeductionOnServe` (domain) — Baixa automática de estoque ao concluir/servir o pedido

Ao concluir/servir o pedido, é gerada automaticamente a baixa de estoque dos ingredientes vinculados aos seus itens, nas quantidades definidas no vínculo item-ingrediente.

- appliesTo: `Order`, `StockConsumption`, `MenuItemIngredient`
- absorbs journey rules:
  - "A baixa automática de estoque ocorre ao concluir/servir o pedido."
  - "Baixa automática ocorre ao concluir/servir pedidos com ingredientes vinculados."
  - "Vínculo com ingredientes é necessário para baixa automática ao concluir o pedido."

### `completedOrdersLeaveKitchenQueue` (application) — Pedidos concluídos não voltam à fila ativa da cozinha

Pedidos já concluídos/servidos são removidos da fila ativa da cozinha e não voltam a ela.

- appliesTo: `Order`
- absorbs journey rules:
  - "Pedidos já concluídos não voltam para a fila ativa da cozinha."

### `kitchenStatusProgressesInOrder` (application) — Status de preparo progride de forma coerente

O status de preparo da cozinha deve progredir em ordem coerente (recebido → em preparo → pronto); transições fora dessa ordem não são permitidas.

- appliesTo: `Order`
- absorbs journey rules:
  - "O status de preparo deve progredir de forma coerente (ex.: recebido → em preparo → pronto)."

### `orderItemsArePrepReference` (application) — Itens e observações do pedido são referência de preparo

Itens e observações registrados no pedido confirmado são a referência para o preparo; qualquer alteração após o envio à cozinha exige alinhamento com o atendente.

- appliesTo: `Order`, `OrderItem`
- absorbs journey rules:
  - "Itens e observações do pedido são a referência de preparo; alterações depois do envio exigem alinhamento com o atendente."

### `menuItemNeedsCategoryAndPrice` (domain) — Item de cardápio requer categoria e preço para ser vendido

Um item do cardápio só pode ser vendido se estiver vinculado a uma categoria e possuir preço definido; itens sem categoria ou sem preço não ficam disponíveis para venda.

- appliesTo: `MenuItem`
- absorbs journey rules:
  - "Item precisa de categoria e preço para ser vendido."

### `managerManualStockAdjustmentAllowed` (application) — Gerente pode ajustar manualmente o estoque para corrigir divergências

O gerente pode registrar ajustes manuais de estoque para corrigir divergências; ajustes exigem referência a um item de estoque e ficam registrados como evento.

- appliesTo: `StockAdjustment`, `StockItem`
- absorbs journey rules:
  - "Ajuste manual é permitido ao gerente para corrigir divergências."

### `lowStockMustBeVisible` (domain) — Estoque baixo deve ser visível no dashboard e no controle de estoque

Itens de estoque que atingirem nível baixo devem ficar destacados tanto no controle de estoque quanto no dashboard operacional.

- appliesTo: `StockItem`, `OperationalDashboard`
- absorbs journey rules:
  - "Estoque baixo deve ser visível no dashboard e no controle de estoque."

### `ordersRequireOpenDailyShift` (application) — Pedidos do dia exigem turno diário aberto

Toda operação de pedido do dia deve estar vinculada a um turno diário que esteja aberto; não é permitido criar pedidos sem turno aberto no momento.

- appliesTo: `Order`, `DailyShift`
- absorbs journey rules:
  - "A operação de pedidos do dia deve estar vinculada a um turno diário aberto."

### `shiftClosingReportContents` (domain) — Relatório de fechamento resume vendas, destaques e estoque baixo

O relatório de fechamento resume as vendas do turno, destaca os itens mais vendidos e sinaliza itens com estoque baixo ou em ruptura.

- appliesTo: `ShiftClosingReport`, `DailyShift`
- absorbs journey rules:
  - "O relatório de fechamento resume vendas do turno, destaques de itens e sinais de estoque baixo/ruptura."

### `shiftClosingRecordsBasicTotalsAndPayments` (application) — Fechamento registra totais e formas de pagamento básicas

O fechamento de turno registra totais e formas de pagamento básicas, sem cálculos contábeis avançados.

- appliesTo: `ShiftClosingReport`, `OrderPayment`
- absorbs journey rules:
  - "Fechamento registra totais e formas de pagamento básicas, sem contabilidade avançada."

### `aiSummaryUsesExistingOperationalData` (application) — IA usa dados de vendas já existentes (hoje e últimos 7 dias)

O assistente de IA gera o resumo de vendas do dia utilizando exclusivamente dados de vendas do dia corrente e dos últimos 7 dias já existentes na operação.

- appliesTo: `AiSalesSummary`, `OperationalDashboard`
- absorbs journey rules:
  - "O assistente de IA usa dados de vendas do dia e dos últimos 7 dias já existentes na operação."

### `aiPromotionSuggestionsAreDecisionSupport` (application) — Sugestões de promoção são apoio à decisão, sem campanhas automáticas

As sugestões de promoção geradas pela IA são apenas apoio à decisão do gerente e não disparam campanhas automatizadas.

- appliesTo: `AiPromotionSuggestion`
- absorbs journey rules:
  - "Sugestões de promoção são apoio à decisão; não disparam campanhas automatizadas."

### `dashboardHighlightsCoreMetrics` (domain) — Dashboard destaca vendas de hoje, mais vendidos e estoque baixo

O dashboard operacional deve destacar, no mínimo: vendas do dia corrente, itens mais vendidos e itens com estoque baixo.

- appliesTo: `OperationalDashboard`
- absorbs journey rules:
  - "Dashboard destaca vendas de hoje, mais vendidos e estoque baixo."

## External refs

### mdm

- **Cardápio (itens e categorias)** — Itens do cardápio e categorias precisam de identidade estável e rara mudança, próprios para o MDM.
- **Itens de estoque (insumos)** — Itens de estoque são referência estável para baixa automática e ajustes.

### horizontals

(none)

### plugins

(none)

### agents

- **Assistente de IA do módulo** — Gerar o resumo de vendas do dia e sugestões de itens a promover a partir dos dados de vendas existentes.
- **Capacidades de plataforma (auth/RBAC/i18n/multi-tenant/LLM proxy)** — Autenticação, RBAC, multi-tenant, i18n e proxy de LLM são capacidades já fornecidas pela plataforma collab.codes.
