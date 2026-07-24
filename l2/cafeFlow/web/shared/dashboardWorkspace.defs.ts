/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "dashboardWorkspace",
  "pageName": "Dashboard operacional e IA",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowDashboardWorkspaceBase",
  "routePattern": "/cafeFlow/dashboardWorkspace",
  "sourceKind": "operation",
  "ownerIds": [
    "operation:viewOperationalDashboard",
    "operation:generateAiSalesSummary",
    "operation:generateAiPromotionSuggestions"
  ],
  "operationIds": [
    "viewOperationalDashboard",
    "generateAiSalesSummary",
    "generateAiPromotionSuggestions"
  ],
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
  "contractRef": {
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/dashboardWorkspace.ts",
    "contracts": [
      {
        "commandName": "getDashboard",
        "routeConst": "getDashboardRoute"
      },
      {
        "commandName": "getAiSalesSummary",
        "routeConst": "getAiSalesSummaryRoute"
      },
      {
        "commandName": "getAiPromotionSuggestions",
        "routeConst": "getAiPromotionSuggestionsRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/dashboardWorkspace.defs.ts",
    "layoutId": "cfe-20260723170708.1000"
  },
  "states": [
    {
      "stateKey": "ui.dashboardWorkspace.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.dashboardWorkspace.action.getDashboard.status",
      "name": "getDashboardState",
      "kind": "actionStatus",
      "actionRef": "getDashboard",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.dashboardWorkspace.input.getDashboard.dailyShiftId",
      "name": "getDashboardDailyShiftId",
      "kind": "input",
      "source": "activeLifecycleInstance",
      "presentation": "form",
      "contractRef": {
        "commandName": "getDashboard",
        "direction": "input",
        "field": "dailyShiftId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.dashboardWorkspace.data.getDashboard",
      "name": "getDashboardData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "getDashboard",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    },
    {
      "stateKey": "ui.dashboardWorkspace.action.getAiSalesSummary.status",
      "name": "getAiSalesSummaryState",
      "kind": "actionStatus",
      "actionRef": "getAiSalesSummary",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId",
      "name": "getAiSalesSummaryOperationalDashboardId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "getAiSalesSummary",
        "direction": "input",
        "field": "operationalDashboardId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.dashboardWorkspace.data.getAiSalesSummary",
      "name": "getAiSalesSummaryData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "getAiSalesSummary",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    },
    {
      "stateKey": "ui.dashboardWorkspace.action.getAiPromotionSuggestions.status",
      "name": "getAiPromotionSuggestionsState",
      "kind": "actionStatus",
      "actionRef": "getAiPromotionSuggestions",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId",
      "name": "getAiPromotionSuggestionsOperationalDashboardId",
      "kind": "input",
      "source": "selectedEntity",
      "presentation": "selection",
      "contractRef": {
        "commandName": "getAiPromotionSuggestions",
        "direction": "input",
        "field": "operationalDashboardId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.dashboardWorkspace.data.getAiPromotionSuggestions",
      "name": "getAiPromotionSuggestionsData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "getAiPromotionSuggestions",
        "direction": "output"
      },
      "outputShape": "array",
      "collection": true,
      "defaultValue": []
    }
  ],
  "actions": [
    {
      "actionId": "getDashboard",
      "kind": "query",
      "commandRef": "getDashboard",
      "routeKey": "cafeFlow.dashboardWorkspace.getDashboard",
      "purpose": "Ver dashboard operacional",
      "methodName": "loadGetDashboard",
      "handlerName": "handleGetDashboardClick",
      "inputStateKeys": [
        "ui.dashboardWorkspace.input.getDashboard.dailyShiftId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.dashboardWorkspace.data.getDashboard"
      ],
      "statusStateKey": "ui.dashboardWorkspace.action.getDashboard.status"
    },
    {
      "actionId": "getAiSalesSummary",
      "kind": "query",
      "commandRef": "getAiSalesSummary",
      "routeKey": "cafeFlow.dashboardWorkspace.getAiSalesSummary",
      "purpose": "Gerar resumo de vendas do dia (IA)",
      "methodName": "loadGetAiSalesSummary",
      "handlerName": "handleGetAiSalesSummaryClick",
      "inputStateKeys": [
        "ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId"
      ],
      "outputStateKeys": [
        "ui.dashboardWorkspace.data.getAiSalesSummary"
      ],
      "statusStateKey": "ui.dashboardWorkspace.action.getAiSalesSummary.status"
    },
    {
      "actionId": "getAiPromotionSuggestions",
      "kind": "query",
      "commandRef": "getAiPromotionSuggestions",
      "routeKey": "cafeFlow.dashboardWorkspace.getAiPromotionSuggestions",
      "purpose": "Gerar sugestões de itens a promover (IA)",
      "methodName": "loadGetAiPromotionSuggestions",
      "handlerName": "handleGetAiPromotionSuggestionsClick",
      "inputStateKeys": [
        "ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [
        "ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId"
      ],
      "outputStateKeys": [
        "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
      ],
      "statusStateKey": "ui.dashboardWorkspace.action.getAiPromotionSuggestions.status"
    },
    {
      "actionId": "set.getDashboardDailyShiftId",
      "kind": "stateSetter",
      "stateKey": "ui.dashboardWorkspace.input.getDashboard.dailyShiftId",
      "methodName": "setGetDashboardDailyShiftId",
      "handlerName": "handleGetDashboardDailyShiftIdChange"
    },
    {
      "actionId": "set.getAiSalesSummaryOperationalDashboardId",
      "kind": "stateSetter",
      "stateKey": "ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId",
      "methodName": "setGetAiSalesSummaryOperationalDashboardId",
      "handlerName": "handleGetAiSalesSummaryOperationalDashboardIdChange"
    },
    {
      "actionId": "set.getAiPromotionSuggestionsOperationalDashboardId",
      "kind": "stateSetter",
      "stateKey": "ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId",
      "methodName": "setGetAiPromotionSuggestionsOperationalDashboardId",
      "handlerName": "handleGetAiPromotionSuggestionsOperationalDashboardIdChange"
    }
  ],
  "initialLoads": [],
  "businessContextRefs": [],
  "navigationRefs": [],
  "i18nMeta": {
    "defaultLocale": "pt",
    "activeLocales": [
      "pt",
      "en"
    ]
  },
  "i18n": {
    "section.dashboardWorkspace.sec-kpi-overview.title": "Indicadores do Turno",
    "organism.dashboardWorkspace.getDashboard.title": "Ver dashboard operacional",
    "intent.dashboardWorkspace.getDashboard.list.title": "Ver dashboard operacional",
    "intent.dashboardWorkspace.getDashboard.list.empty": "Nenhum registro encontrado",
    "intent.dashboardWorkspace.getDashboard.list.column.operationalDashboardId.label": "Operational Dashboard Id",
    "intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId.label": "Daily Shift Id",
    "intent.dashboardWorkspace.getDashboard.list.column.referenceDate.label": "Reference Date",
    "intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal.label": "Today Sales Total",
    "intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount.label": "Today Orders Count",
    "intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold.label": "Today Items Sold",
    "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId.label": "Top Menu Item Id",
    "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label": "Top Menu Item Quantity",
    "intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount.label": "Top Selling Items Count",
    "intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount.label": "Low Stock Items Count",
    "intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount.label": "Out Of Stock Items Count",
    "intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert.label": "Has Low Stock Alert",
    "intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt.label": "Last Computed At",
    "intent.dashboardWorkspace.getDashboard.list.column.topSellingItems.label": "Top Selling Items",
    "intent.dashboardWorkspace.getDashboard.list.column.lowStockAlerts.label": "Low Stock Alerts",
    "intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId.label": "Daily Shift Id",
    "section.dashboardWorkspace.sec-top-selling.title": "Itens Mais Vendidos",
    "section.dashboardWorkspace.sec-stock-alerts.title": "Alertas de Estoque",
    "section.dashboardWorkspace.sec-ai-sales-summary.title": "Resumo de Vendas (IA)",
    "organism.dashboardWorkspace.getAiSalesSummary.title": "Gerar resumo de vendas do dia (IA)",
    "intent.dashboardWorkspace.getAiSalesSummary.list.title": "Gerar resumo de vendas do dia (IA)",
    "intent.dashboardWorkspace.getAiSalesSummary.list.empty": "Nenhum registro encontrado",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.aiSalesSummaryId.label": "Ai Sales Summary Id",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.operationalDashboardId.label": "Operational Dashboard Id",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryDate.label": "Summary Date",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.periodStart.label": "Period Start",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.periodEnd.label": "Period End",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryText.label": "Summary Text",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.modelId.label": "Model Id",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.promptTokens.label": "Prompt Tokens",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.completionTokens.label": "Completion Tokens",
    "intent.dashboardWorkspace.getAiSalesSummary.list.column.generatedAt.label": "Generated At",
    "section.dashboardWorkspace.sec-ai-promotion-suggestions.title": "Sugestões de Promoção (IA)",
    "organism.dashboardWorkspace.getAiPromotionSuggestions.title": "Gerar sugestões de itens a promover (IA)",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.title": "Gerar sugestões de itens a promover (IA)",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.empty": "Nenhum registro encontrado",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.aiPromotionSuggestionId.label": "Ai Promotion Suggestion Id",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.operationalDashboardId.label": "Operational Dashboard Id",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemId.label": "Menu Item Id",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemName.label": "Menu Item Name",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuCategoryId.label": "Menu Category Id",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.reason.label": "Reason",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesLast7Days.label": "Sales Last7 Days",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesToday.label": "Sales Today",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel.label": "Current Stock Level",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.confidenceScore.label": "Confidence Score",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.suggestedDiscountPercent.label": "Suggested Discount Percent",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.status.label": "Status",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.generatedAt.label": "Generated At",
    "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.expiresAt.label": "Expires At"
  },
  "automation": {
    "statePrefix": "ui.dashboardWorkspace",
    "stateKeys": [
      "ui.dashboardWorkspace.status",
      "ui.dashboardWorkspace.action.getDashboard.status",
      "ui.dashboardWorkspace.input.getDashboard.dailyShiftId",
      "ui.dashboardWorkspace.data.getDashboard",
      "ui.dashboardWorkspace.action.getAiSalesSummary.status",
      "ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId",
      "ui.dashboardWorkspace.data.getAiSalesSummary",
      "ui.dashboardWorkspace.action.getAiPromotionSuggestions.status",
      "ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId",
      "ui.dashboardWorkspace.data.getAiPromotionSuggestions"
    ],
    "actionIds": [
      "getDashboard",
      "getAiSalesSummary",
      "getAiPromotionSuggestions",
      "set.getDashboardDailyShiftId",
      "set.getAiSalesSummaryOperationalDashboardId",
      "set.getAiPromotionSuggestionsOperationalDashboardId"
    ]
  }
};

export const pipeline = [
  {
    "id": "dashboardWorkspace__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/dashboardWorkspace.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "lowStockMustBeVisible",
      "dashboardHighlightsCoreMetrics",
      "aiSummaryUsesExistingOperationalData",
      "aiPromotionSuggestionsAreDecisionSupport"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
