/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/dashboardWorkspace.defs.ts" enhancement="_blank"/>

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
      "sectionName": "kpiOverview",
      "titleKey": "section.dashboardWorkspace.sec-kpi-overview.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-kpi-summary-cards",
          "type": "queryResult",
          "organismName": "OperationalKpiSummaryCards",
          "titleKey": "organism.dashboardWorkspace.getDashboard.title",
          "purpose": "Exibe os indicadores-chave do turno corrente (total de vendas, pedidos, itens vendidos, alertas de estoque) para que o gerente avalie a saúde da operação de relance.",
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
      "id": "section.dashboardWorkspace.sec-top-selling",
      "type": "section",
      "sectionName": "topSellingItems",
      "titleKey": "section.dashboardWorkspace.sec-top-selling.title",
      "mode": "view",
      "order": 20,
      "organisms": [
        {
          "id": "org-top-selling-list",
          "type": "queryResult",
          "organismName": "TopSellingItemsList",
          "titleKey": "organism.dashboardWorkspace.getDashboard.title",
          "purpose": "Lista os itens mais vendidos do turno em ordem decrescente de quantidade, permitindo ao gerente identificar os produtos de maior saída.",
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
      "id": "section.dashboardWorkspace.sec-stock-alerts",
      "type": "section",
      "sectionName": "stockAlerts",
      "titleKey": "section.dashboardWorkspace.sec-stock-alerts.title",
      "mode": "view",
      "order": 30,
      "organisms": [
        {
          "id": "org-stock-alert-list",
          "type": "queryResult",
          "organismName": "LowStockAlertList",
          "titleKey": "organism.dashboardWorkspace.getDashboard.title",
          "purpose": "Destaca itens com estoque baixo ou em ruptura para que o gerente tome ação imediata antes que impacte o serviço.",
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
      "sectionName": "aiSalesSummary",
      "titleKey": "section.dashboardWorkspace.sec-ai-sales-summary.title",
      "mode": "view",
      "order": 40,
      "organisms": [
        {
          "id": "org-ai-sales-summary-panel",
          "type": "queryResult",
          "organismName": "AiSalesSummaryPanel",
          "titleKey": "organism.dashboardWorkspace.getAiSalesSummary.title",
          "purpose": "Permite ao gerente solicitar e ler o resumo narrativo de vendas do dia gerado pela IA, com botão de geração e exibição do texto resultante.",
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
      "sectionName": "aiPromotionSuggestions",
      "titleKey": "section.dashboardWorkspace.sec-ai-promotion-suggestions.title",
      "mode": "view",
      "order": 50,
      "organisms": [
        {
          "id": "org-ai-promotion-suggestions-board",
          "type": "queryResult",
          "organismName": "AiPromotionSuggestionsBoard",
          "titleKey": "organism.dashboardWorkspace.getAiPromotionSuggestions.title",
          "purpose": "Exibe as sugestões de itens a promover geradas pela IA com justificativa, score de confiança e desconto sugerido, apoiando a decisão do gerente sobre promoções.",
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
  "templateId": "status_overview",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI",
  "layout": {
    "id": "cfe-20260723170708.1000",
    "type": "page",
    "sections": [
      {
        "id": "section.dashboardWorkspace.sec-kpi-overview",
        "type": "section",
        "sectionName": "kpiOverview",
        "titleKey": "section.dashboardWorkspace.sec-kpi-overview.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-kpi-summary-cards",
            "type": "queryResult",
            "organismName": "OperationalKpiSummaryCards",
            "titleKey": "organism.dashboardWorkspace.getDashboard.title",
            "purpose": "Exibe os indicadores-chave do turno corrente (total de vendas, pedidos, itens vendidos, alertas de estoque) para que o gerente avalie a saúde da operação de relance.",
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
        "id": "section.dashboardWorkspace.sec-top-selling",
        "type": "section",
        "sectionName": "topSellingItems",
        "titleKey": "section.dashboardWorkspace.sec-top-selling.title",
        "mode": "view",
        "order": 20,
        "organisms": [
          {
            "id": "org-top-selling-list",
            "type": "queryResult",
            "organismName": "TopSellingItemsList",
            "titleKey": "organism.dashboardWorkspace.getDashboard.title",
            "purpose": "Lista os itens mais vendidos do turno em ordem decrescente de quantidade, permitindo ao gerente identificar os produtos de maior saída.",
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
            "displayHint": "list"
          }
        ]
      },
      {
        "id": "section.dashboardWorkspace.sec-stock-alerts",
        "type": "section",
        "sectionName": "stockAlerts",
        "titleKey": "section.dashboardWorkspace.sec-stock-alerts.title",
        "mode": "view",
        "order": 30,
        "organisms": [
          {
            "id": "org-stock-alert-list",
            "type": "queryResult",
            "organismName": "LowStockAlertList",
            "titleKey": "organism.dashboardWorkspace.getDashboard.title",
            "purpose": "Destaca itens com estoque baixo ou em ruptura para que o gerente tome ação imediata antes que impacte o serviço.",
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
            "displayHint": "list"
          }
        ]
      },
      {
        "id": "section.dashboardWorkspace.sec-ai-sales-summary",
        "type": "section",
        "sectionName": "aiSalesSummary",
        "titleKey": "section.dashboardWorkspace.sec-ai-sales-summary.title",
        "mode": "view",
        "order": 40,
        "organisms": [
          {
            "id": "org-ai-sales-summary-panel",
            "type": "queryResult",
            "organismName": "AiSalesSummaryPanel",
            "titleKey": "organism.dashboardWorkspace.getAiSalesSummary.title",
            "purpose": "Permite ao gerente solicitar e ler o resumo narrativo de vendas do dia gerado pela IA, com botão de geração e exibição do texto resultante.",
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
            "displayHint": "detail"
          }
        ]
      },
      {
        "id": "section.dashboardWorkspace.sec-ai-promotion-suggestions",
        "type": "section",
        "sectionName": "aiPromotionSuggestions",
        "titleKey": "section.dashboardWorkspace.sec-ai-promotion-suggestions.title",
        "mode": "view",
        "order": 50,
        "organisms": [
          {
            "id": "org-ai-promotion-suggestions-board",
            "type": "queryResult",
            "organismName": "AiPromotionSuggestionsBoard",
            "titleKey": "organism.dashboardWorkspace.getAiPromotionSuggestions.title",
            "purpose": "Exibe as sugestões de itens a promover geradas pela IA com justificativa, score de confiança e desconto sugerido, apoiando a decisão do gerente sobre promoções.",
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
    "id": "dashboardWorkspace__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/dashboardWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/dashboardWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "dashboardWorkspace__l2_shared"
    ],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfePage11RenderTs.ts"
    ],
    "visualStyle": {
      "description": "POS-first, high-contrast, touch-friendly, status-driven UI"
    },
    "agent": "agentCfeMaterializeGen"
  }
] as const;
