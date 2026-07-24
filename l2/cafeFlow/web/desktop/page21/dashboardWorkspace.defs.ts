/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/dashboardWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "dashboardWorkspace",
  "pageName": "Dashboard operacional e IA",
  "baseClassName": "CafeFlowDashboardWorkspaceBase",
  "actor": "gerente",
  "purpose": "Executar Dashboard operacional e IA.",
  "capabilities": [
    "viewOperationalDashboard",
    "generateAiSalesSummary",
    "generateAiPromotionSuggestions"
  ],
  "flowRefs": {
    "experienceFlows": [],
    "entityLifecycles": [],
    "taskWorkflows": [],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "dashboardWorkspace",
    "workspaceKind": "operation",
    "actor": "gerente",
    "entity": "OperationalDashboard",
    "owners": [
      {
        "kind": "operation",
        "id": "viewOperationalDashboard",
        "defPath": "_102051_/l4/cafeFlow/operations/viewOperationalDashboard.defs.ts"
      },
      {
        "kind": "operation",
        "id": "generateAiSalesSummary",
        "defPath": "_102051_/l4/cafeFlow/operations/generateAiSalesSummary.defs.ts"
      },
      {
        "kind": "operation",
        "id": "generateAiPromotionSuggestions",
        "defPath": "_102051_/l4/cafeFlow/operations/generateAiPromotionSuggestions.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "viewOperationalDashboard",
          "commandName": "viewOperationalDashboard",
          "steps": [
            "Abrir o dashboard operacional do turno corrente",
            "Visualizar totais de vendas, pedidos e itens vendidos do dia",
            "Conferir os itens de cardápio mais vendidos no turno",
            "Identificar alertas de estoque baixo e ruptura destacados no painel"
          ]
        },
        {
          "operationId": "generateAiSalesSummary",
          "commandName": "generateAiSalesSummary",
          "steps": [
            "O gerente acessa o dashboard operacional do dia",
            "Solicita ao assistente de IA um resumo narrativo das vendas do dia",
            "O sistema reúne exclusivamente os dados de vendas do dia corrente e dos últimos 7 dias já existentes na operação",
            "O proxy LLM da plataforma gera o texto narrativo do resumo com base nesses dados"
          ]
        },
        {
          "operationId": "generateAiPromotionSuggestions",
          "commandName": "generateAiPromotionSuggestions",
          "steps": [
            "O gerente solicita sugestões de promoção a partir do dashboard operacional em exibição",
            "O sistema consulta vendas dos últimos 7 dias, itens de cardápio e níveis de estoque vinculados ao dashboard",
            "A IA gera e devolve sugestões com justificativa, confiança e desconto sugerido para apoio à decisão"
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "section.dashboardWorkspace.sec-kpi-overview",
      "type": "section",
      "sectionName": "Indicadores do Turno",
      "titleKey": "section.dashboardWorkspace.sec-kpi-overview.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-kpi-summary-cards",
          "type": "queryResult",
          "organismName": "ShiftKpiSummaryCards",
          "titleKey": "organism.dashboardWorkspace.getDashboard.title",
          "purpose": "Exibe os indicadores-chave do turno corrente (total de vendas, pedidos, itens vendidos, alertas de estoque) em cards de leitura rápida, carregados automaticamente a partir do turno ativo.",
          "userActions": [
            "getDashboard"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "lowStockMustBeVisible",
            "dashboardHighlightsCoreMetrics"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.dashboardWorkspace.getDashboard.list",
              "intent": "queryList",
              "stateKey": "ui.dashboardWorkspace.data.getDashboard",
              "action": "getDashboard",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "section.dashboardWorkspace.sec-stock-alerts",
      "type": "section",
      "sectionName": "Alertas de Estoque",
      "titleKey": "section.dashboardWorkspace.sec-stock-alerts.title",
      "mode": "view",
      "order": 20,
      "organisms": [
        {
          "id": "org-stock-alerts-list",
          "type": "queryResult",
          "organismName": "StockAlertsPanel",
          "titleKey": "organism.dashboardWorkspace.getDashboard.title",
          "purpose": "Lista os itens com estoque baixo ou em ruptura (slice lowStockAlerts do getDashboard) para que o gerente identifique exceções críticas e tome ação imediata.",
          "userActions": [
            "getDashboard"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "lowStockMustBeVisible",
            "dashboardHighlightsCoreMetrics"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.dashboardWorkspace.getDashboard.list2",
              "intent": "queryList",
              "stateKey": "ui.dashboardWorkspace.data.getDashboard",
              "action": "getDashboard",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "section.dashboardWorkspace.sec-top-selling",
      "type": "section",
      "sectionName": "Itens Mais Vendidos",
      "titleKey": "section.dashboardWorkspace.sec-top-selling.title",
      "mode": "view",
      "order": 30,
      "organisms": [
        {
          "id": "org-top-selling-list",
          "type": "queryResult",
          "organismName": "TopSellingItemsList",
          "titleKey": "organism.dashboardWorkspace.getDashboard.title",
          "purpose": "Exibe o ranking dos itens mais vendidos no turno (slice topSellingItems do getDashboard) em ordem decrescente de quantidade, permitindo ao gerente avaliar o desempenho do cardápio.",
          "userActions": [
            "getDashboard"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "lowStockMustBeVisible",
            "dashboardHighlightsCoreMetrics"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.dashboardWorkspace.getDashboard.list3",
              "intent": "queryList",
              "stateKey": "ui.dashboardWorkspace.data.getDashboard",
              "action": "getDashboard",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "section.dashboardWorkspace.sec-ai-sales-summary",
      "type": "section",
      "sectionName": "Resumo de Vendas (IA)",
      "titleKey": "section.dashboardWorkspace.sec-ai-sales-summary.title",
      "mode": "view",
      "order": 40,
      "organisms": [
        {
          "id": "org-ai-sales-summary-panel",
          "type": "queryResult",
          "organismName": "AiSalesSummaryPanel",
          "titleKey": "organism.dashboardWorkspace.getAiSalesSummary.title",
          "purpose": "Permite ao gerente solicitar e ler o resumo narrativo de vendas do dia gerado pela IA, exibindo o texto gerado (summaryText) com metadados de período e data de geração.",
          "userActions": [
            "getAiSalesSummary"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "aiSummaryUsesExistingOperationalData"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.dashboardWorkspace.getAiSalesSummary.list",
              "intent": "queryList",
              "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary",
              "action": "getAiSalesSummary",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "section.dashboardWorkspace.sec-ai-promotion-suggestions",
      "type": "section",
      "sectionName": "Sugestões de Promoção (IA)",
      "titleKey": "section.dashboardWorkspace.sec-ai-promotion-suggestions.title",
      "mode": "view",
      "order": 50,
      "organisms": [
        {
          "id": "org-ai-promotion-suggestions-panel",
          "type": "queryResult",
          "organismName": "AiPromotionSuggestionsPanel",
          "titleKey": "organism.dashboardWorkspace.getAiPromotionSuggestions.title",
          "purpose": "Permite ao gerente solicitar e revisar as sugestões de itens a promover geradas pela IA, exibindo menuItemName, reason, confidenceScore e suggestedDiscountPercent para apoio à decisão.",
          "userActions": [
            "getAiPromotionSuggestions"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "aiPromotionSuggestionsAreDecisionSupport"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list",
              "intent": "queryList",
              "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions",
              "action": "getAiPromotionSuggestions",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "templateId": "goal_first",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI",
  "pageObjective": {
    "actor": "Gerente de operações do café",
    "jobToBeDone": "Acompanhar em tempo real os indicadores do turno corrente, identificar alertas de estoque e obter insights gerados por IA (resumo de vendas e sugestões de promoção) para tomar decisões operacionais rápidas.",
    "primaryDecision": "O gerente decide se a operação do turno está saudável e quais ações imediatas tomar com base nos KPIs, alertas de estoque e recomendações da IA.",
    "decisiveInfo": [
      "todaySalesTotal",
      "todayOrdersCount",
      "todayItemsSold",
      "hasLowStockAlert",
      "lowStockItemsCount",
      "outOfStockItemsCount",
      "topSellingItems",
      "lowStockAlerts",
      "summaryText",
      "menuItemName",
      "reason",
      "confidenceScore",
      "suggestedDiscountPercent"
    ],
    "usageFrequency": "Contínuo durante o turno operacional; o gerente consulta o dashboard várias vezes ao dia para monitorar a operação.",
    "criticalActions": [
      {
        "action": "Carregar dashboard do turno corrente",
        "presentation": "summary-first — KPIs exibidos automaticamente ao abrir a página, sem interação manual"
      },
      {
        "action": "Gerar resumo de vendas por IA",
        "presentation": "primary-button contextual ao painel de IA de vendas, acionado pelo gerente quando desejar o resumo narrativo"
      },
      {
        "action": "Gerar sugestões de promoção por IA",
        "presentation": "primary-button contextual ao painel de sugestões, acionado pelo gerente para obter recomendações de itens a promover"
      }
    ],
    "informationHierarchy": [
      "1. KPIs do turno (vendas totais, pedidos, itens vendidos) — visão imediata ao abrir",
      "2. Alertas de estoque baixo/ruptura — exceções que exigem ação imediata",
      "3. Itens mais vendidos — contexto de desempenho do cardápio",
      "4. Resumo narrativo de vendas gerado por IA — insight qualitativo sob demanda",
      "5. Sugestões de promoção geradas por IA — recomendações táticas sob demanda"
    ],
    "successCriteria": "O gerente visualiza todos os indicadores críticos do turno em menos de 5 segundos, identifica alertas de estoque sem precisar navegar para outra tela, e obtém insights de IA com um único clique sem sair do dashboard.",
    "antiPatterns": [
      "Exigir que o gerente digite manualmente o dailyShiftId ou operationalDashboardId",
      "Exibir status como <select> editável",
      "Separar KPIs em páginas distintas ou abas que exijam navegação",
      "Mostrar formulários CRUD como experiência primária",
      "Exibir tokens de IA (promptTokens, completionTokens, modelId) como informação principal"
    ]
  },
  "layout": {
    "id": "goal_first_page21_dashboardWorkspace",
    "type": "page",
    "sections": [
      {
        "id": "section.dashboardWorkspace.sec-kpi-overview",
        "type": "section",
        "sectionName": "Indicadores do Turno",
        "titleKey": "section.dashboardWorkspace.sec-kpi-overview.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-kpi-summary-cards",
            "type": "queryResult",
            "organismName": "ShiftKpiSummaryCards",
            "titleKey": "organism.dashboardWorkspace.getDashboard.title",
            "purpose": "Exibe os indicadores-chave do turno corrente (total de vendas, pedidos, itens vendidos, alertas de estoque) em cards de leitura rápida, carregados automaticamente a partir do turno ativo.",
            "userActions": [
              "getDashboard"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "lowStockMustBeVisible",
              "dashboardHighlightsCoreMetrics"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.dashboardWorkspace.getDashboard.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.dashboardWorkspace.getDashboard.list.title",
                "source": "bff.getDashboard",
                "binding": "binding.dashboardWorkspace.getDashboard",
                "action": "getDashboard",
                "emptyKey": "intent.dashboardWorkspace.getDashboard.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.operationalDashboardId",
                    "field": "operationalDashboardId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.operationalDashboardId.label",
                    "order": 10,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId.label",
                    "order": 20,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.referenceDate",
                    "field": "referenceDate",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.referenceDate.label",
                    "order": 30,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal",
                    "field": "todaySalesTotal",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal.label",
                    "order": 40,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount",
                    "field": "todayOrdersCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount.label",
                    "order": 50,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold",
                    "field": "todayItemsSold",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold.label",
                    "order": 60,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId",
                    "field": "topMenuItemId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId.label",
                    "order": 70,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity",
                    "field": "topMenuItemQuantity",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label",
                    "order": 80,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount",
                    "field": "topSellingItemsCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount.label",
                    "order": 90,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount",
                    "field": "lowStockItemsCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount.label",
                    "order": 100,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount",
                    "field": "outOfStockItemsCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount.label",
                    "order": 110,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert",
                    "field": "hasLowStockAlert",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert.label",
                    "order": 120,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt",
                    "field": "lastComputedAt",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt.label",
                    "order": 130,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItems",
                    "field": "topSellingItems",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItems.label",
                    "order": 140,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.lowStockAlerts",
                    "field": "lowStockAlerts",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.lowStockAlerts.label",
                    "order": 150,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId.label",
                    "order": 10,
                    "stateKey": "ui.dashboardWorkspace.input.getDashboard.dailyShiftId"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.dashboardWorkspace.data.getDashboard"
              }
            ],
            "displayHint": "summary-first"
          }
        ]
      },
      {
        "id": "section.dashboardWorkspace.sec-stock-alerts",
        "type": "section",
        "sectionName": "Alertas de Estoque",
        "titleKey": "section.dashboardWorkspace.sec-stock-alerts.title",
        "mode": "view",
        "order": 20,
        "organisms": [
          {
            "id": "org-stock-alerts-list",
            "type": "queryResult",
            "organismName": "StockAlertsPanel",
            "titleKey": "organism.dashboardWorkspace.getDashboard.title",
            "purpose": "Lista os itens com estoque baixo ou em ruptura (slice lowStockAlerts do getDashboard) para que o gerente identifique exceções críticas e tome ação imediata.",
            "userActions": [
              "getDashboard"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "lowStockMustBeVisible",
              "dashboardHighlightsCoreMetrics"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.dashboardWorkspace.getDashboard.list2",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.dashboardWorkspace.getDashboard.list.title",
                "source": "bff.getDashboard",
                "binding": "binding.dashboardWorkspace.getDashboard",
                "action": "getDashboard",
                "emptyKey": "intent.dashboardWorkspace.getDashboard.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.operationalDashboardId",
                    "field": "operationalDashboardId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.operationalDashboardId.label",
                    "order": 10,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId.label",
                    "order": 20,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.referenceDate",
                    "field": "referenceDate",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.referenceDate.label",
                    "order": 30,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal",
                    "field": "todaySalesTotal",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal.label",
                    "order": 40,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount",
                    "field": "todayOrdersCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount.label",
                    "order": 50,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold",
                    "field": "todayItemsSold",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold.label",
                    "order": 60,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId",
                    "field": "topMenuItemId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId.label",
                    "order": 70,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity",
                    "field": "topMenuItemQuantity",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label",
                    "order": 80,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount",
                    "field": "topSellingItemsCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount.label",
                    "order": 90,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount",
                    "field": "lowStockItemsCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount.label",
                    "order": 100,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount",
                    "field": "outOfStockItemsCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount.label",
                    "order": 110,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert",
                    "field": "hasLowStockAlert",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert.label",
                    "order": 120,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt",
                    "field": "lastComputedAt",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt.label",
                    "order": 130,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItems",
                    "field": "topSellingItems",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItems.label",
                    "order": 140,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.lowStockAlerts",
                    "field": "lowStockAlerts",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.lowStockAlerts.label",
                    "order": 150,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId.label",
                    "order": 10,
                    "stateKey": "ui.dashboardWorkspace.input.getDashboard.dailyShiftId"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.dashboardWorkspace.data.getDashboard"
              }
            ],
            "displayHint": "summary-first"
          }
        ]
      },
      {
        "id": "section.dashboardWorkspace.sec-top-selling",
        "type": "section",
        "sectionName": "Itens Mais Vendidos",
        "titleKey": "section.dashboardWorkspace.sec-top-selling.title",
        "mode": "view",
        "order": 30,
        "organisms": [
          {
            "id": "org-top-selling-list",
            "type": "queryResult",
            "organismName": "TopSellingItemsList",
            "titleKey": "organism.dashboardWorkspace.getDashboard.title",
            "purpose": "Exibe o ranking dos itens mais vendidos no turno (slice topSellingItems do getDashboard) em ordem decrescente de quantidade, permitindo ao gerente avaliar o desempenho do cardápio.",
            "userActions": [
              "getDashboard"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "lowStockMustBeVisible",
              "dashboardHighlightsCoreMetrics"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.dashboardWorkspace.getDashboard.list3",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.dashboardWorkspace.getDashboard.list.title",
                "source": "bff.getDashboard",
                "binding": "binding.dashboardWorkspace.getDashboard",
                "action": "getDashboard",
                "emptyKey": "intent.dashboardWorkspace.getDashboard.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.operationalDashboardId",
                    "field": "operationalDashboardId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.operationalDashboardId.label",
                    "order": 10,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId.label",
                    "order": 20,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.referenceDate",
                    "field": "referenceDate",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.referenceDate.label",
                    "order": 30,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal",
                    "field": "todaySalesTotal",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal.label",
                    "order": 40,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount",
                    "field": "todayOrdersCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount.label",
                    "order": 50,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold",
                    "field": "todayItemsSold",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold.label",
                    "order": 60,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId",
                    "field": "topMenuItemId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId.label",
                    "order": 70,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity",
                    "field": "topMenuItemQuantity",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label",
                    "order": 80,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount",
                    "field": "topSellingItemsCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount.label",
                    "order": 90,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount",
                    "field": "lowStockItemsCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount.label",
                    "order": 100,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount",
                    "field": "outOfStockItemsCount",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount.label",
                    "order": 110,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert",
                    "field": "hasLowStockAlert",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert.label",
                    "order": 120,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt",
                    "field": "lastComputedAt",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt.label",
                    "order": 130,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItems",
                    "field": "topSellingItems",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.topSellingItems.label",
                    "order": 140,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.column.lowStockAlerts",
                    "field": "lowStockAlerts",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.column.lowStockAlerts.label",
                    "order": 150,
                    "stateKey": "ui.dashboardWorkspace.data.getDashboard"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId.label",
                    "order": 10,
                    "stateKey": "ui.dashboardWorkspace.input.getDashboard.dailyShiftId"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.dashboardWorkspace.data.getDashboard"
              }
            ],
            "displayHint": "inline-row-command"
          }
        ]
      },
      {
        "id": "section.dashboardWorkspace.sec-ai-sales-summary",
        "type": "section",
        "sectionName": "Resumo de Vendas (IA)",
        "titleKey": "section.dashboardWorkspace.sec-ai-sales-summary.title",
        "mode": "view",
        "order": 40,
        "organisms": [
          {
            "id": "org-ai-sales-summary-panel",
            "type": "queryResult",
            "organismName": "AiSalesSummaryPanel",
            "titleKey": "organism.dashboardWorkspace.getAiSalesSummary.title",
            "purpose": "Permite ao gerente solicitar e ler o resumo narrativo de vendas do dia gerado pela IA, exibindo o texto gerado (summaryText) com metadados de período e data de geração.",
            "userActions": [
              "getAiSalesSummary"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "aiSummaryUsesExistingOperationalData"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.dashboardWorkspace.getAiSalesSummary.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.dashboardWorkspace.getAiSalesSummary.list.title",
                "source": "bff.getAiSalesSummary",
                "binding": "binding.dashboardWorkspace.getAiSalesSummary",
                "action": "getAiSalesSummary",
                "emptyKey": "intent.dashboardWorkspace.getAiSalesSummary.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.aiSalesSummaryId",
                    "field": "aiSalesSummaryId",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.aiSalesSummaryId.label",
                    "order": 10,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.operationalDashboardId",
                    "field": "operationalDashboardId",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.operationalDashboardId.label",
                    "order": 20,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryDate",
                    "field": "summaryDate",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryDate.label",
                    "order": 30,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.periodStart",
                    "field": "periodStart",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.periodStart.label",
                    "order": 40,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.periodEnd",
                    "field": "periodEnd",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.periodEnd.label",
                    "order": 50,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryText",
                    "field": "summaryText",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryText.label",
                    "order": 60,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.modelId",
                    "field": "modelId",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.modelId.label",
                    "order": 70,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.promptTokens",
                    "field": "promptTokens",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.promptTokens.label",
                    "order": 80,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.completionTokens",
                    "field": "completionTokens",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.completionTokens.label",
                    "order": 90,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiSalesSummary.list.column.generatedAt",
                    "field": "generatedAt",
                    "labelKey": "intent.dashboardWorkspace.getAiSalesSummary.list.column.generatedAt.label",
                    "order": 100,
                    "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary"
              }
            ],
            "displayHint": "summary-first"
          }
        ]
      },
      {
        "id": "section.dashboardWorkspace.sec-ai-promotion-suggestions",
        "type": "section",
        "sectionName": "Sugestões de Promoção (IA)",
        "titleKey": "section.dashboardWorkspace.sec-ai-promotion-suggestions.title",
        "mode": "view",
        "order": 50,
        "organisms": [
          {
            "id": "org-ai-promotion-suggestions-panel",
            "type": "queryResult",
            "organismName": "AiPromotionSuggestionsPanel",
            "titleKey": "organism.dashboardWorkspace.getAiPromotionSuggestions.title",
            "purpose": "Permite ao gerente solicitar e revisar as sugestões de itens a promover geradas pela IA, exibindo menuItemName, reason, confidenceScore e suggestedDiscountPercent para apoio à decisão.",
            "userActions": [
              "getAiPromotionSuggestions"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "aiPromotionSuggestionsAreDecisionSupport"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.title",
                "source": "bff.getAiPromotionSuggestions",
                "binding": "binding.dashboardWorkspace.getAiPromotionSuggestions",
                "action": "getAiPromotionSuggestions",
                "emptyKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.aiPromotionSuggestionId",
                    "field": "aiPromotionSuggestionId",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.aiPromotionSuggestionId.label",
                    "order": 10,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.operationalDashboardId",
                    "field": "operationalDashboardId",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.operationalDashboardId.label",
                    "order": 20,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemId",
                    "field": "menuItemId",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemId.label",
                    "order": 30,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemName",
                    "field": "menuItemName",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemName.label",
                    "order": 40,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuCategoryId.label",
                    "order": 50,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.reason",
                    "field": "reason",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.reason.label",
                    "order": 60,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesLast7Days",
                    "field": "salesLast7Days",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesLast7Days.label",
                    "order": 70,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesToday",
                    "field": "salesToday",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesToday.label",
                    "order": 80,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel",
                    "field": "currentStockLevel",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel.label",
                    "order": 90,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.confidenceScore",
                    "field": "confidenceScore",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.confidenceScore.label",
                    "order": 100,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.suggestedDiscountPercent",
                    "field": "suggestedDiscountPercent",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.suggestedDiscountPercent.label",
                    "order": 110,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.status",
                    "field": "status",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.status.label",
                    "order": 120,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.generatedAt",
                    "field": "generatedAt",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.generatedAt.label",
                    "order": 130,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  },
                  {
                    "id": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.expiresAt",
                    "field": "expiresAt",
                    "labelKey": "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.expiresAt.label",
                    "order": 140,
                    "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
              }
            ],
            "displayHint": "card-board"
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "binding.dashboardWorkspace.getDashboard",
      "source": "bff.getDashboard",
      "command": "getDashboard",
      "description": "Ver dashboard operacional",
      "stateKey": "ui.dashboardWorkspace.data.getDashboard",
      "inputStateKeys": [
        "ui.dashboardWorkspace.input.getDashboard.dailyShiftId"
      ]
    },
    {
      "id": "binding.dashboardWorkspace.getAiSalesSummary",
      "source": "bff.getAiSalesSummary",
      "command": "getAiSalesSummary",
      "description": "Gerar resumo de vendas do dia (IA)",
      "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary",
      "inputStateKeys": [
        "ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId"
      ]
    },
    {
      "id": "binding.dashboardWorkspace.getAiPromotionSuggestions",
      "source": "bff.getAiPromotionSuggestions",
      "command": "getAiPromotionSuggestions",
      "description": "Gerar sugestões de itens a promover (IA)",
      "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions",
      "inputStateKeys": [
        "ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "dashboardWorkspace__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/dashboardWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/dashboardWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "dashboardWorkspace__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage21RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
