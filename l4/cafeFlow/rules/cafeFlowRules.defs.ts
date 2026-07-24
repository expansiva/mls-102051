/// <mls fileReference="_102051_/l4/cafeFlow/rules/cafeFlowRules.defs.ts" enhancement="_blank"/>

export const cafeFlowRules = {
  "ruleSetId": "cafeFlowRules",
  "rules": [
    {
      "ruleId": "orderRequiresTableOrTakeout",
      "title": "Pedido deve ser mesa ou takeout",
      "description": "Todo pedido registrado deve ser classificado como mesa (table) ou takeout; nenhum pedido pode existir sem essa definição.",
      "appliesTo": [
        "Order"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "onlyActiveMenuItemsCanBeOrdered",
      "title": "Somente itens ativos do cardápio podem ser lançados no pedido",
      "description": "Somente itens do cardápio com status ativo podem ser lançados em um pedido; itens pausados ficam indisponíveis no POS.",
      "appliesTo": [
        "OrderItem",
        "MenuItem"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "orderEntersKitchenQueueAfterAttendantConfirmation",
      "title": "Pedido entra na fila da cozinha só após confirmação do atendente",
      "description": "Um pedido só entra na fila ativa da cozinha após confirmação explícita do atendente; pedidos não confirmados não são visíveis à cozinha.",
      "appliesTo": [
        "Order"
      ],
      "layer": "application"
    },
    {
      "ruleId": "orderTotalFromPriceAtLaunchTime",
      "title": "Total do pedido usa preço e quantidade no momento do lançamento",
      "description": "O total do pedido é calculado a partir do preço de cardápio e da quantidade de cada item no instante do lançamento; alterações posteriores no cardápio não recalculam pedidos já registrados.",
      "appliesTo": [
        "Order",
        "OrderItem"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "onlyReadyOrdersCanBeServed",
      "title": "Somente pedidos prontos podem ser marcados como servidos",
      "description": "Somente pedidos com status pronto podem ser marcados como servidos/entregues pelo atendente; não é permitido servir pedidos em outros estados.",
      "appliesTo": [
        "Order"
      ],
      "layer": "application"
    },
    {
      "ruleId": "autoStockDeductionOnServe",
      "title": "Baixa automática de estoque ao concluir/servir o pedido",
      "description": "Ao concluir/servir o pedido, é gerada automaticamente a baixa de estoque dos ingredientes vinculados aos seus itens, nas quantidades definidas no vínculo item-ingrediente.",
      "appliesTo": [
        "Order",
        "StockConsumption",
        "MenuItemIngredient"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "completedOrdersLeaveKitchenQueue",
      "title": "Pedidos concluídos não voltam à fila ativa da cozinha",
      "description": "Pedidos já concluídos/servidos são removidos da fila ativa da cozinha e não voltam a ela.",
      "appliesTo": [
        "Order"
      ],
      "layer": "application"
    },
    {
      "ruleId": "kitchenStatusProgressesInOrder",
      "title": "Status de preparo progride de forma coerente",
      "description": "O status de preparo da cozinha deve progredir em ordem coerente (recebido → em preparo → pronto); transições fora dessa ordem não são permitidas.",
      "appliesTo": [
        "Order"
      ],
      "layer": "application"
    },
    {
      "ruleId": "orderItemsArePrepReference",
      "title": "Itens e observações do pedido são referência de preparo",
      "description": "Itens e observações registrados no pedido confirmado são a referência para o preparo; qualquer alteração após o envio à cozinha exige alinhamento com o atendente.",
      "appliesTo": [
        "Order",
        "OrderItem"
      ],
      "layer": "application"
    },
    {
      "ruleId": "menuItemNeedsCategoryAndPrice",
      "title": "Item de cardápio requer categoria e preço para ser vendido",
      "description": "Um item do cardápio só pode ser vendido se estiver vinculado a uma categoria e possuir preço definido; itens sem categoria ou sem preço não ficam disponíveis para venda.",
      "appliesTo": [
        "MenuItem"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "managerManualStockAdjustmentAllowed",
      "title": "Gerente pode ajustar manualmente o estoque para corrigir divergências",
      "description": "O gerente pode registrar ajustes manuais de estoque para corrigir divergências; ajustes exigem referência a um item de estoque e ficam registrados como evento.",
      "appliesTo": [
        "StockAdjustment",
        "StockItem"
      ],
      "layer": "application"
    },
    {
      "ruleId": "lowStockMustBeVisible",
      "title": "Estoque baixo deve ser visível no dashboard e no controle de estoque",
      "description": "Itens de estoque que atingirem nível baixo devem ficar destacados tanto no controle de estoque quanto no dashboard operacional.",
      "appliesTo": [
        "StockItem",
        "OperationalDashboard"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "ordersRequireOpenDailyShift",
      "title": "Pedidos do dia exigem turno diário aberto",
      "description": "Toda operação de pedido do dia deve estar vinculada a um turno diário que esteja aberto; não é permitido criar pedidos sem turno aberto no momento.",
      "appliesTo": [
        "Order",
        "DailyShift"
      ],
      "layer": "application"
    },
    {
      "ruleId": "shiftClosingReportContents",
      "title": "Relatório de fechamento resume vendas, destaques e estoque baixo",
      "description": "O relatório de fechamento resume as vendas do turno, destaca os itens mais vendidos e sinaliza itens com estoque baixo ou em ruptura.",
      "appliesTo": [
        "ShiftClosingReport",
        "DailyShift"
      ],
      "layer": "domain"
    },
    {
      "ruleId": "shiftClosingRecordsBasicTotalsAndPayments",
      "title": "Fechamento registra totais e formas de pagamento básicas",
      "description": "O fechamento de turno registra totais e formas de pagamento básicas, sem cálculos contábeis avançados.",
      "appliesTo": [
        "ShiftClosingReport",
        "OrderPayment"
      ],
      "layer": "application"
    },
    {
      "ruleId": "aiSummaryUsesExistingOperationalData",
      "title": "IA usa dados de vendas já existentes (hoje e últimos 7 dias)",
      "description": "O assistente de IA gera o resumo de vendas do dia utilizando exclusivamente dados de vendas do dia corrente e dos últimos 7 dias já existentes na operação.",
      "appliesTo": [
        "AiSalesSummary",
        "OperationalDashboard"
      ],
      "layer": "application"
    },
    {
      "ruleId": "aiPromotionSuggestionsAreDecisionSupport",
      "title": "Sugestões de promoção são apoio à decisão, sem campanhas automáticas",
      "description": "As sugestões de promoção geradas pela IA são apenas apoio à decisão do gerente e não disparam campanhas automatizadas.",
      "appliesTo": [
        "AiPromotionSuggestion"
      ],
      "layer": "application"
    },
    {
      "ruleId": "dashboardHighlightsCoreMetrics",
      "title": "Dashboard destaca vendas de hoje, mais vendidos e estoque baixo",
      "description": "O dashboard operacional deve destacar, no mínimo: vendas do dia corrente, itens mais vendidos e itens com estoque baixo.",
      "appliesTo": [
        "OperationalDashboard"
      ],
      "layer": "domain"
    }
  ]
} as const;

export default cafeFlowRules;
