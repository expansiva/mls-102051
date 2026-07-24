/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/shiftWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "shiftWorkspace",
  "pageName": "Turno diário",
  "moduleName": "cafeFlow",
  "baseClassName": "CafeFlowShiftWorkspaceBase",
  "routePattern": "/cafeFlow/shiftWorkspace/:shiftClosingReportId?",
  "sourceKind": "workflow",
  "ownerIds": [
    "workflow:dailyShiftLifecycle",
    "operation:openDailyShift",
    "operation:closeDailyShift",
    "operation:viewShiftClosingReport"
  ],
  "operationIds": [
    "openDailyShift",
    "closeDailyShift",
    "viewShiftClosingReport"
  ],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "shiftWorkspace",
    "workspaceKind": "workflow",
    "workflowId": "dailyShiftLifecycle",
    "actor": "gerente",
    "entity": "DailyShift",
    "owners": [
      {
        "kind": "workflow",
        "id": "dailyShiftLifecycle",
        "defPath": "_102051_/l4/cafeFlow/workflows/dailyShiftLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "openDailyShift",
        "defPath": "_102051_/l4/cafeFlow/operations/openDailyShift.defs.ts"
      },
      {
        "kind": "operation",
        "id": "closeDailyShift",
        "defPath": "_102051_/l4/cafeFlow/operations/closeDailyShift.defs.ts"
      },
      {
        "kind": "operation",
        "id": "viewShiftClosingReport",
        "defPath": "_102051_/l4/cafeFlow/operations/viewShiftClosingReport.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "O gerente abre o turno diário para agrupar pedidos, vendas e movimentos daquele dia.",
        "Ao longo do dia, acompanha pedidos e estoque dentro do turno aberto.",
        "No encerramento, fecha o turno e revisa o relatório com vendas, itens e indícios de ruptura.",
        "Confere totais de pedidos e formas de pagamento básicas registradas no fechamento."
      ],
      "operations": [
        {
          "operationId": "openDailyShift",
          "commandName": "openDailyShift",
          "steps": [
            "Gerente solicita a abertura do turno diário",
            "Sistema valida que não há outro turno aberto",
            "Sistema cria o turno com status aberto, data operacional, responsável e horários de abertura",
            "Turno fica disponível para receber pedidos do dia"
          ]
        },
        {
          "operationId": "closeDailyShift",
          "commandName": "closeDailyShift",
          "steps": [
            "Identificar o turno diário aberto em andamento",
            "Conferir totais de pedidos, vendas e formas de pagamento básicas calculados no turno",
            "Informar opcionalmente totais de dinheiro/outros pagamentos e observações de fechamento",
            "Confirmar o fechamento do turno",
            "Sistema grava o turno como fechado, preenche totais e gera o relatório de fechamento"
          ]
        },
        {
          "operationId": "viewShiftClosingReport",
          "commandName": "viewShiftClosingReport",
          "steps": [
            "Abrir o relatório de fechamento do turno selecionado",
            "Conferir totais de vendas, pedidos e itens vendidos",
            "Conferir valores em dinheiro e demais formas de pagamento básicas",
            "Revisar destaques de itens mais vendidos e contagens de estoque baixo/ruptura",
            "Ler observações registradas no fechamento"
          ]
        }
      ]
    }
  },
  "contractRef": {
    "tsPath": "_102051_/l2/cafeFlow/web/contracts/shiftWorkspace.ts",
    "contracts": [
      {
        "commandName": "openDailyShiftCmd",
        "routeConst": "openDailyShiftCmdRoute"
      },
      {
        "commandName": "closeDailyShiftCmd",
        "routeConst": "closeDailyShiftCmdRoute"
      },
      {
        "commandName": "getShiftClosingReport",
        "routeConst": "getShiftClosingReportRoute"
      }
    ]
  },
  "layoutRef": {
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/shiftWorkspace.defs.ts",
    "layoutId": "cfe-20260723170708.1000"
  },
  "states": [
    {
      "stateKey": "ui.shiftWorkspace.status",
      "name": "status",
      "kind": "pageStatus",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.action.openDailyShiftCmd.status",
      "name": "openDailyShiftCmdState",
      "kind": "actionStatus",
      "actionRef": "openDailyShiftCmd",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate",
      "name": "openDailyShiftCmdShiftDate",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "openDailyShiftCmd",
        "direction": "input",
        "field": "shiftDate"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId",
      "name": "openDailyShiftCmdOpenedByUserId",
      "kind": "input",
      "source": "actorSession",
      "presentation": "form",
      "contractRef": {
        "commandName": "openDailyShiftCmd",
        "direction": "input",
        "field": "openedByUserId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.input.openDailyShiftCmd.notes",
      "name": "openDailyShiftCmdNotes",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "openDailyShiftCmd",
        "direction": "input",
        "field": "notes"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.output.openDailyShiftCmd",
      "name": "openDailyShiftCmdOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "openDailyShiftCmd",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.shiftWorkspace.action.openDailyShiftCmd.error",
      "name": "openDailyShiftCmdError",
      "kind": "actionError",
      "actionRef": "openDailyShiftCmd",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.action.closeDailyShiftCmd.status",
      "name": "closeDailyShiftCmdState",
      "kind": "actionStatus",
      "actionRef": "closeDailyShiftCmd",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId",
      "name": "closeDailyShiftCmdDailyShiftId",
      "kind": "input",
      "source": "activeLifecycleInstance",
      "presentation": "form",
      "contractRef": {
        "commandName": "closeDailyShiftCmd",
        "direction": "input",
        "field": "dailyShiftId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal",
      "name": "closeDailyShiftCmdCashTotal",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "closeDailyShiftCmd",
        "direction": "input",
        "field": "cashTotal"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal",
      "name": "closeDailyShiftCmdOtherPaymentsTotal",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "closeDailyShiftCmd",
        "direction": "input",
        "field": "otherPaymentsTotal"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.notes",
      "name": "closeDailyShiftCmdNotes",
      "kind": "input",
      "source": "userInput",
      "presentation": "form",
      "contractRef": {
        "commandName": "closeDailyShiftCmd",
        "direction": "input",
        "field": "notes"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId",
      "name": "closeDailyShiftCmdClosedByUserId",
      "kind": "input",
      "source": "actorSession",
      "presentation": "form",
      "contractRef": {
        "commandName": "closeDailyShiftCmd",
        "direction": "input",
        "field": "closedByUserId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt",
      "name": "closeDailyShiftCmdClosedAt",
      "kind": "input",
      "source": "systemDefault",
      "presentation": "form",
      "contractRef": {
        "commandName": "closeDailyShiftCmd",
        "direction": "input",
        "field": "closedAt"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.output.closeDailyShiftCmd",
      "name": "closeDailyShiftCmdOutput",
      "kind": "commandOutput",
      "contractRef": {
        "commandName": "closeDailyShiftCmd",
        "direction": "output"
      },
      "defaultValue": null
    },
    {
      "stateKey": "ui.shiftWorkspace.action.closeDailyShiftCmd.error",
      "name": "closeDailyShiftCmdError",
      "kind": "actionError",
      "actionRef": "closeDailyShiftCmd",
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.action.getShiftClosingReport.status",
      "name": "getShiftClosingReportState",
      "kind": "actionStatus",
      "actionRef": "getShiftClosingReport",
      "valueSet": [
        "idle",
        "loading",
        "success",
        "error"
      ],
      "defaultValue": "idle"
    },
    {
      "stateKey": "ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId",
      "name": "getShiftClosingReportShiftClosingReportId",
      "kind": "input",
      "source": "routeParam",
      "presentation": "route",
      "contractRef": {
        "commandName": "getShiftClosingReport",
        "direction": "input",
        "field": "shiftClosingReportId"
      },
      "defaultValue": ""
    },
    {
      "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport",
      "name": "getShiftClosingReportData",
      "kind": "queryResult",
      "contractRef": {
        "commandName": "getShiftClosingReport",
        "direction": "output"
      },
      "outputShape": "object",
      "collection": false,
      "defaultValue": null
    }
  ],
  "actions": [
    {
      "actionId": "openDailyShiftCmd",
      "kind": "command",
      "commandRef": "openDailyShiftCmd",
      "routeKey": "cafeFlow.shiftWorkspace.openDailyShiftCmd",
      "purpose": "Abrir turno diário",
      "methodName": "openDailyShiftCmd",
      "handlerName": "handleOpenDailyShiftCmdClick",
      "inputStateKeys": [
        "ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate",
        "ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId",
        "ui.shiftWorkspace.input.openDailyShiftCmd.notes"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.shiftWorkspace.output.openDailyShiftCmd"
      ],
      "statusStateKey": "ui.shiftWorkspace.action.openDailyShiftCmd.status",
      "errorStateKey": "ui.shiftWorkspace.action.openDailyShiftCmd.error",
      "feedback": {
        "successMessageKey": "action.openDailyShiftCmd.success",
        "errorMessageKey": "action.openDailyShiftCmd.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate",
        "ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId",
        "ui.shiftWorkspace.input.openDailyShiftCmd.notes"
      ],
      "refreshActionIds": [
        "getShiftClosingReport"
      ]
    },
    {
      "actionId": "closeDailyShiftCmd",
      "kind": "command",
      "commandRef": "closeDailyShiftCmd",
      "routeKey": "cafeFlow.shiftWorkspace.closeDailyShiftCmd",
      "purpose": "Fechar turno diário",
      "methodName": "closeDailyShiftCmd",
      "handlerName": "handleCloseDailyShiftCmdClick",
      "inputStateKeys": [
        "ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.notes",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt"
      ],
      "routeParamInputStateKeys": [],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.shiftWorkspace.output.closeDailyShiftCmd"
      ],
      "statusStateKey": "ui.shiftWorkspace.action.closeDailyShiftCmd.status",
      "errorStateKey": "ui.shiftWorkspace.action.closeDailyShiftCmd.error",
      "feedback": {
        "successMessageKey": "action.closeDailyShiftCmd.success",
        "errorMessageKey": "action.closeDailyShiftCmd.error",
        "dismissible": true
      },
      "clearInputStateKeys": [
        "ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.notes",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt"
      ],
      "refreshActionIds": [
        "getShiftClosingReport"
      ]
    },
    {
      "actionId": "getShiftClosingReport",
      "kind": "query",
      "commandRef": "getShiftClosingReport",
      "routeKey": "cafeFlow.shiftWorkspace.getShiftClosingReport",
      "purpose": "Ver relatório de fechamento de turno",
      "methodName": "loadGetShiftClosingReport",
      "handlerName": "handleGetShiftClosingReportClick",
      "inputStateKeys": [
        "ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId"
      ],
      "routeParamInputStateKeys": [
        "ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId"
      ],
      "selectedEntityInputStateKeys": [],
      "outputStateKeys": [
        "ui.shiftWorkspace.data.getShiftClosingReport"
      ],
      "statusStateKey": "ui.shiftWorkspace.action.getShiftClosingReport.status"
    },
    {
      "actionId": "set.openDailyShiftCmdShiftDate",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate",
      "methodName": "setOpenDailyShiftCmdShiftDate",
      "handlerName": "handleOpenDailyShiftCmdShiftDateChange"
    },
    {
      "actionId": "set.openDailyShiftCmdOpenedByUserId",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId",
      "methodName": "setOpenDailyShiftCmdOpenedByUserId",
      "handlerName": "handleOpenDailyShiftCmdOpenedByUserIdChange"
    },
    {
      "actionId": "set.openDailyShiftCmdNotes",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.openDailyShiftCmd.notes",
      "methodName": "setOpenDailyShiftCmdNotes",
      "handlerName": "handleOpenDailyShiftCmdNotesChange"
    },
    {
      "actionId": "set.closeDailyShiftCmdDailyShiftId",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId",
      "methodName": "setCloseDailyShiftCmdDailyShiftId",
      "handlerName": "handleCloseDailyShiftCmdDailyShiftIdChange"
    },
    {
      "actionId": "set.closeDailyShiftCmdCashTotal",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal",
      "methodName": "setCloseDailyShiftCmdCashTotal",
      "handlerName": "handleCloseDailyShiftCmdCashTotalChange"
    },
    {
      "actionId": "set.closeDailyShiftCmdOtherPaymentsTotal",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal",
      "methodName": "setCloseDailyShiftCmdOtherPaymentsTotal",
      "handlerName": "handleCloseDailyShiftCmdOtherPaymentsTotalChange"
    },
    {
      "actionId": "set.closeDailyShiftCmdNotes",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.notes",
      "methodName": "setCloseDailyShiftCmdNotes",
      "handlerName": "handleCloseDailyShiftCmdNotesChange"
    },
    {
      "actionId": "set.closeDailyShiftCmdClosedByUserId",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId",
      "methodName": "setCloseDailyShiftCmdClosedByUserId",
      "handlerName": "handleCloseDailyShiftCmdClosedByUserIdChange"
    },
    {
      "actionId": "set.closeDailyShiftCmdClosedAt",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt",
      "methodName": "setCloseDailyShiftCmdClosedAt",
      "handlerName": "handleCloseDailyShiftCmdClosedAtChange"
    },
    {
      "actionId": "set.getShiftClosingReportShiftClosingReportId",
      "kind": "stateSetter",
      "stateKey": "ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId",
      "methodName": "setGetShiftClosingReportShiftClosingReportId",
      "handlerName": "handleGetShiftClosingReportShiftClosingReportIdChange"
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
    "section.shiftWorkspace.openShiftSection.title": "Abrir Turno",
    "organism.shiftWorkspace.openDailyShiftCmd.title": "Abrir turno diário",
    "intent.shiftWorkspace.openDailyShiftCmd.form.title": "Abrir turno diário",
    "intent.shiftWorkspace.openDailyShiftCmd.form.action.openDailyShiftCmd": "Abrir turno diário",
    "intent.shiftWorkspace.openDailyShiftCmd.form.field.shiftDate.label": "Shift Date",
    "intent.shiftWorkspace.openDailyShiftCmd.form.field.openedByUserId.label": "Opened By User Id",
    "intent.shiftWorkspace.openDailyShiftCmd.form.field.notes.label": "Notes",
    "section.shiftWorkspace.closeShiftSection.title": "Fechar Turno e Relatório",
    "organism.shiftWorkspace.closeDailyShiftCmd.title": "Fechar turno diário",
    "intent.shiftWorkspace.closeDailyShiftCmd.form.title": "Fechar turno diário",
    "intent.shiftWorkspace.closeDailyShiftCmd.form.action.closeDailyShiftCmd": "Fechar turno diário",
    "intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId.label": "Daily Shift Id",
    "intent.shiftWorkspace.closeDailyShiftCmd.form.field.cashTotal.label": "Cash Total",
    "intent.shiftWorkspace.closeDailyShiftCmd.form.field.otherPaymentsTotal.label": "Other Payments Total",
    "intent.shiftWorkspace.closeDailyShiftCmd.form.field.notes.label": "Notes",
    "intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedByUserId.label": "Closed By User Id",
    "intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedAt.label": "Closed At",
    "organism.shiftWorkspace.getShiftClosingReport.title": "Ver relatório de fechamento de turno",
    "intent.shiftWorkspace.getShiftClosingReport.list.title": "Ver relatório de fechamento de turno",
    "intent.shiftWorkspace.getShiftClosingReport.list.empty": "Nenhum registro encontrado",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId.label": "Shift Closing Report Id",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.dailyShiftId.label": "Daily Shift Id",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate.label": "Shift Date",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount.label": "Total Sales Amount",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount.label": "Total Orders Count",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold.label": "Total Items Sold",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount.label": "Cash Payments Amount",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount.label": "Other Payments Amount",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.topSellingItemsSummary.label": "Top Selling Items Summary",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.lowStockSignalsCount.label": "Low Stock Signals Count",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.stockoutSignalsCount.label": "Stockout Signals Count",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.closingNotes.label": "Closing Notes",
    "intent.shiftWorkspace.getShiftClosingReport.list.column.generatedAt.label": "Generated At",
    "section.shiftWorkspace.sec-shift-status.title": "Estado do Turno",
    "section.shiftWorkspace.sec-open-shift.title": "Abrir Turno",
    "section.shiftWorkspace.sec-close-shift.title": "Fechar Turno"
  },
  "automation": {
    "statePrefix": "ui.shiftWorkspace",
    "stateKeys": [
      "ui.shiftWorkspace.status",
      "ui.shiftWorkspace.action.openDailyShiftCmd.status",
      "ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate",
      "ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId",
      "ui.shiftWorkspace.input.openDailyShiftCmd.notes",
      "ui.shiftWorkspace.output.openDailyShiftCmd",
      "ui.shiftWorkspace.action.openDailyShiftCmd.error",
      "ui.shiftWorkspace.action.closeDailyShiftCmd.status",
      "ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId",
      "ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal",
      "ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal",
      "ui.shiftWorkspace.input.closeDailyShiftCmd.notes",
      "ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId",
      "ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt",
      "ui.shiftWorkspace.output.closeDailyShiftCmd",
      "ui.shiftWorkspace.action.closeDailyShiftCmd.error",
      "ui.shiftWorkspace.action.getShiftClosingReport.status",
      "ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId",
      "ui.shiftWorkspace.data.getShiftClosingReport"
    ],
    "actionIds": [
      "openDailyShiftCmd",
      "closeDailyShiftCmd",
      "getShiftClosingReport",
      "set.openDailyShiftCmdShiftDate",
      "set.openDailyShiftCmdOpenedByUserId",
      "set.openDailyShiftCmdNotes",
      "set.closeDailyShiftCmdDailyShiftId",
      "set.closeDailyShiftCmdCashTotal",
      "set.closeDailyShiftCmdOtherPaymentsTotal",
      "set.closeDailyShiftCmdNotes",
      "set.closeDailyShiftCmdClosedByUserId",
      "set.closeDailyShiftCmdClosedAt",
      "set.getShiftClosingReportShiftClosingReportId"
    ]
  }
};

export const pipeline = [
  {
    "id": "shiftWorkspace__l2_shared",
    "type": "l2_shared",
    "outputPath": "_102051_/l2/cafeFlow/web/shared/shiftWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/shared/shiftWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/contracts/shiftWorkspace.ts",
      "_102029_.d.ts"
    ],
    "dependsOn": [],
    "skills": [
      "_102020_/l2/agentChangeFrontend/skills/genCfeSharedTs.ts"
    ],
    "rulesApplied": [
      "ordersRequireOpenDailyShift",
      "shiftClosingReportContents",
      "shiftClosingRecordsBasicTotalsAndPayments"
    ],
    "agent": "agentCfeMaterializeGen"
  }
] as const;
