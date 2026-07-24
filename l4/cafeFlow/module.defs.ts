/// <mls fileReference="_102051_/l4/cafeFlow/module.defs.ts" enhancement="_blank"/>

export const cafeFlowModule = {
  "module": {
    "moduleName": "cafeFlow",
    "title": "CafeFlow",
    "purpose": "CafeFlow entrega a operação de uma cafeteria ou lanchonete pequena: registro rápido de pedidos (mesa ou takeout), coordenação da cozinha via status, cardápio e estoque simples alinhados, turno diário com relatório de fechamento e dashboard operacional com apoio de IA para resumo de vendas e sugestões de promoção.",
    "businessDomain": "Food service POS and operations",
    "languages": [
      "pt-BR",
      "en"
    ],
    "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI"
  },
  "designContext": {
    "initialPrompt": "Gere um app profissional chamado CafeFlow para cafeterias e lanchonetes pequenas. Entidades principais: Item do Cardápio (categoria, preço, ingredientes em estoque), Pedido (mesa ou takeout, itens, status), Turno Diário, Item de Estoque. Telas chave: Dashboard (vendas de hoje, itens mais vendidos, estoque baixo), Interface rápida de POS (lançamento de pedido + status cozinha), Gerenciamento de cardápio e estoque, Relatório de fechamento de turno. Funcionalidade LLM: Assistente IA que gera \"resumo de vendas do dia\" ou sugere \"quais itens promover com base nos últimos 7 dias\". Foco: Atendimento rápido de pedidos, coordenação de cozinha e controle simples de estoque para food service. linguagem: en, pt-br",
    "userLanguage": "pt-BR",
    "openDetails": [
      {
        "title": "A UI deve nascer em pt-BR, en, ou ambos via i18n da plataforma?",
        "description": "Define textos iniciais e exemplos do assistente IA."
      },
      {
        "title": "A baixa de estoque ocorre automaticamente ao concluir o pedido ou é manual no turno?",
        "description": "Afeta o fluxo entre pedido, cozinha e item de estoque."
      },
      {
        "title": "O módulo controla forma de pagamento e valores recebidos no pedido?",
        "description": "Define profundidade do POS e do fechamento de turno."
      }
    ],
    "decisions": []
  },
  "ontology": {
    "entities": {
      "MenuItem": {
        "title": "Item do Cardápio",
        "description": "Produto vendável no PDV, com categoria, preço, disponibilidade e vínculo aos ingredientes de estoque para baixa automática.",
        "kind": "mdm",
        "ownership": "moduleOwned",
        "statusEnum": [
          "active",
          "paused"
        ],
        "lifecycleStates": [
          "active",
          "paused"
        ]
      },
      "MenuCategory": {
        "title": "Categoria do Cardápio",
        "description": "Agrupamento estável de itens do cardápio usado para organizar o POS e a consulta rápida.",
        "kind": "mdm",
        "ownership": "moduleOwned",
        "statusEnum": [
          "active",
          "inactive"
        ],
        "lifecycleStates": [
          "active",
          "inactive"
        ]
      },
      "MenuItemIngredient": {
        "title": "Vínculo Item-Ingrediente",
        "description": "Associação entre um item do cardápio e um ingrediente de estoque, com a quantidade consumida por porção para viabilizar a baixa automática.",
        "kind": "supporting",
        "ownership": "moduleOwned"
      },
      "StockItem": {
        "title": "Item de Estoque",
        "description": "Insumo físico controlado pela cafeteria, com unidade de medida, saldo atual e nível mínimo para alerta de estoque baixo.",
        "kind": "mdm",
        "ownership": "moduleOwned"
      },
      "StockConsumption": {
        "title": "Baixa de Estoque",
        "description": "Fato append-only do consumo de ingredientes gerado pela baixa automática ao concluir/servir um pedido. Carrega os dados necessários para auditoria e estorno (referência ao pedido e ao insumo, quantidade debitada, motivo de anulação e marcação de validade).",
        "kind": "event",
        "ownership": "moduleOwned",
        "statusEnum": [
          "posted",
          "voided"
        ],
        "lifecycleStates": [
          "posted",
          "voided"
        ]
      },
      "StockAdjustment": {
        "title": "Ajuste Manual de Estoque",
        "description": "Fato append-only que registra correção manual de saldo de estoque feita por contagem, perda ou divergência, podendo ser compensado por novo ajuste.",
        "kind": "event",
        "ownership": "moduleOwned",
        "statusEnum": [
          "posted",
          "voided"
        ],
        "lifecycleStates": [
          "posted",
          "voided"
        ]
      },
      "Order": {
        "title": "Pedido",
        "description": "Pedido de mesa ou takeout com itens, quantidades, observações, total, forma de pagamento básica e ciclo de status coordenado entre salão e cozinha.",
        "kind": "core",
        "ownership": "moduleOwned",
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
        ]
      },
      "OrderItem": {
        "title": "Item do Pedido",
        "description": "Linha de um pedido com referência ao item do cardápio ativo, quantidade, preço unitário congelado no lançamento, observações do cliente e estado de preparo controlado pela cozinha.",
        "kind": "supporting",
        "ownership": "moduleOwned",
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
      },
      "OrderPayment": {
        "title": "Pagamento Básico do Pedido",
        "description": "Registro simples do total e da forma de pagamento básica associada ao pedido para o fechamento do turno, sem conciliação financeira avançada.",
        "kind": "supporting",
        "ownership": "horizontalOwned",
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
      },
      "DailyShift": {
        "title": "Turno Diário",
        "description": "Turno operacional de um dia que concentra pedidos, vendas e movimentos de estoque, viabilizando o relatório de fechamento e o dashboard operacional.",
        "kind": "core",
        "ownership": "moduleOwned",
        "statusEnum": [
          "open",
          "closed"
        ],
        "lifecycleStates": [
          "open",
          "closed"
        ]
      },
      "ShiftClosingReport": {
        "title": "Relatório de Fechamento de Turno",
        "description": "Visão consolidada do turno encerrado com totais de vendas, itens movimentados, formas de pagamento básicas e sinais de estoque baixo/ruptura.",
        "kind": "metric",
        "ownership": "moduleOwned",
        "lifecycleStates": [
          "generated",
          "viewed",
          "archived"
        ]
      },
      "OperationalDashboard": {
        "title": "Dashboard Operacional",
        "description": "Painel do gerente com vendas de hoje, itens mais vendidos e alertas de estoque baixo, base para decisões durante o turno.",
        "kind": "metric",
        "ownership": "moduleOwned"
      },
      "AiSalesSummary": {
        "title": "Resumo de Vendas do Dia (IA)",
        "description": "Resumo narrativo das vendas do dia gerado pelo assistente de IA via proxy LLM da plataforma, para comunicação rápida à equipe.",
        "kind": "metric",
        "ownership": "moduleOwned",
        "lifecycleStates": [
          "generated",
          "delivered",
          "failed"
        ]
      },
      "AiPromotionSuggestion": {
        "title": "Sugestão de Itens a Promover (IA)",
        "description": "Recomendações geradas pelo assistente de IA com base nos últimos 7 dias para apoiar a decisão do gerente sobre quais itens promover.",
        "kind": "metric",
        "ownership": "moduleOwned",
        "statusEnum": [
          "pending",
          "accepted",
          "rejected",
          "expired"
        ],
        "lifecycleStates": [
          "pending",
          "accepted",
          "rejected",
          "expired"
        ]
      }
    }
  },
  "journey": {
    "defPath": "l4/cafeFlow/siteMap.defs.ts"
  },
  "relationships": [
    {
      "relationshipId": "menuItemBelongsToCategory",
      "fromEntity": "MenuItem",
      "toEntity": "MenuCategory",
      "type": "manyToOne",
      "description": "Cada item do cardápio pertence a uma categoria para organização do POS."
    },
    {
      "relationshipId": "menuItemHasIngredients",
      "fromEntity": "MenuItem",
      "toEntity": "MenuItemIngredient",
      "type": "oneToMany",
      "description": "Um item do cardápio pode ter vários ingredientes vinculados para baixa automática."
    },
    {
      "relationshipId": "menuItemIngredientReferencesStockItem",
      "fromEntity": "MenuItemIngredient",
      "toEntity": "StockItem",
      "type": "manyToOne",
      "description": "Cada vínculo aponta para um ingrediente de estoque e sua quantidade por porção."
    },
    {
      "relationshipId": "orderHasOrderItems",
      "fromEntity": "Order",
      "toEntity": "OrderItem",
      "type": "oneToMany",
      "description": "Um pedido é composto por uma ou mais linhas de itens lançados."
    },
    {
      "relationshipId": "orderItemReferencesMenuItem",
      "fromEntity": "OrderItem",
      "toEntity": "MenuItem",
      "type": "manyToOne",
      "description": "Cada linha do pedido referencia um item do cardápio ativo no momento do lançamento."
    },
    {
      "relationshipId": "orderHasPayment",
      "fromEntity": "Order",
      "toEntity": "OrderPayment",
      "type": "oneToOne",
      "description": "Um pedido pode ter um registro básico de total e forma de pagamento."
    },
    {
      "relationshipId": "orderBelongsToShift",
      "fromEntity": "Order",
      "toEntity": "DailyShift",
      "type": "manyToOne",
      "description": "Todo pedido do dia é vinculado ao turno diário aberto."
    },
    {
      "relationshipId": "orderProducesStockConsumption",
      "fromEntity": "Order",
      "toEntity": "StockConsumption",
      "type": "oneToMany",
      "description": "Ao ser servido/concluído, o pedido gera baixas de estoque dos ingredientes vinculados."
    },
    {
      "relationshipId": "stockConsumptionReferencesStockItem",
      "fromEntity": "StockConsumption",
      "toEntity": "StockItem",
      "type": "manyToOne",
      "description": "Cada baixa de estoque referencia o insumo debitado."
    },
    {
      "relationshipId": "stockAdjustmentReferencesStockItem",
      "fromEntity": "StockAdjustment",
      "toEntity": "StockItem",
      "type": "manyToOne",
      "description": "Cada ajuste manual referencia o insumo cujo saldo foi corrigido."
    },
    {
      "relationshipId": "shiftProducesClosingReport",
      "fromEntity": "DailyShift",
      "toEntity": "ShiftClosingReport",
      "type": "oneToOne",
      "description": "O turno encerrado gera seu relatório de fechamento."
    },
    {
      "relationshipId": "dashboardAggregatesShift",
      "fromEntity": "OperationalDashboard",
      "toEntity": "DailyShift",
      "type": "manyToOne",
      "description": "O dashboard operacional é calculado a partir do turno corrente."
    },
    {
      "relationshipId": "aiSummaryDerivedFromDashboard",
      "fromEntity": "AiSalesSummary",
      "toEntity": "OperationalDashboard",
      "type": "manyToOne",
      "description": "O resumo de vendas do dia é gerado pela IA a partir dos dados do dashboard."
    },
    {
      "relationshipId": "aiPromotionDerivedFromDashboard",
      "fromEntity": "AiPromotionSuggestion",
      "toEntity": "OperationalDashboard",
      "type": "manyToOne",
      "description": "As sugestões de promoção são geradas pela IA a partir do histórico recente do dashboard."
    }
  ],
  "approvedArtifacts": {
    "mdm": [
      {
        "title": "Cardápio (itens e categorias)",
        "reason": "Itens do cardápio e categorias precisam de identidade estável e rara mudança, próprios para o MDM."
      },
      {
        "title": "Itens de estoque (insumos)",
        "reason": "Itens de estoque são referência estável para baixa automática e ajustes."
      }
    ],
    "horizontals": [],
    "plugins": [],
    "agents": [
      {
        "title": "Assistente de IA do módulo",
        "reason": "Gerar o resumo de vendas do dia e sugestões de itens a promover a partir dos dados de vendas existentes."
      },
      {
        "title": "Capacidades de plataforma (auth/RBAC/i18n/multi-tenant/LLM proxy)",
        "reason": "Autenticação, RBAC, multi-tenant, i18n e proxy de LLM são capacidades já fornecidas pela plataforma collab.codes."
      }
    ]
  }
} as const;

export default cafeFlowModule;
