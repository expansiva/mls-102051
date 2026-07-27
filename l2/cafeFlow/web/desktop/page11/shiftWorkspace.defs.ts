/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/shiftWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "shiftWorkspace",
  "pageName": "Turno diário",
  "baseClassName": "CafeFlowShiftWorkspaceBase",
  "actor": "gerente",
  "purpose": "Executar Turno diário.",
  "capabilities": [
    "dailyShiftLifecycle",
    "viewShiftClosingReport"
  ],
  "flowRefs": {
    "experienceFlows": [
      "dailyShiftLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "dailyShiftLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
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
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "section.shiftWorkspace.openShiftSection",
      "type": "section",
      "sectionName": "Abrir Turno",
      "titleKey": "section.shiftWorkspace.openShiftSection.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "openShiftForm",
          "type": "commandForm",
          "organismName": "OpenShiftForm",
          "titleKey": "organism.shiftWorkspace.openDailyShiftCmd.title",
          "purpose": "Permite ao gerente informar a data do turno e observações opcionais para abrir o turno diário; o responsável é derivado da sessão e não requer entrada manual.",
          "userActions": [
            "openDailyShiftCmd"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "ordersRequireOpenDailyShift"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.shiftWorkspace.openDailyShiftCmd.form",
              "intent": "commandForm",
              "submitAction": "openDailyShiftCmd",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "section.shiftWorkspace.closeShiftSection",
      "type": "section",
      "sectionName": "Fechar Turno e Relatório",
      "titleKey": "section.shiftWorkspace.closeShiftSection.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "closeShiftForm",
          "type": "commandForm",
          "organismName": "CloseShiftForm",
          "titleKey": "organism.shiftWorkspace.closeDailyShiftCmd.title",
          "purpose": "Exibe o turno aberto atual e permite ao gerente informar os totais de caixa e outros pagamentos para confirmar o encerramento do turno; dailyShiftId, closedByUserId e closedAt são derivados do contexto e da sessão.",
          "userActions": [
            "closeDailyShiftCmd"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "ordersRequireOpenDailyShift",
            "shiftClosingReportContents"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.shiftWorkspace.closeDailyShiftCmd.form",
              "intent": "commandForm",
              "submitAction": "closeDailyShiftCmd",
              "order": 10
            }
          ]
        },
        {
          "id": "shiftClosingReportPanel",
          "type": "queryResult",
          "organismName": "ShiftClosingReportPanel",
          "titleKey": "organism.shiftWorkspace.getShiftClosingReport.title",
          "purpose": "Exibe o relatório de fechamento do turno após o encerramento, com totais de vendas, pedidos, itens vendidos, formas de pagamento, itens mais vendidos e sinais de ruptura de estoque.",
          "userActions": [
            "getShiftClosingReport"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "shiftClosingReportContents",
            "shiftClosingRecordsBasicTotalsAndPayments"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent.shiftWorkspace.getShiftClosingReport.list",
              "intent": "queryList",
              "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport",
              "action": "getShiftClosingReport",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "templateId": "mobile_cards",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI",
  "layout": {
    "id": "cfe-20260727184832.1000",
    "type": "page",
    "sections": [
      {
        "id": "section.shiftWorkspace.openShiftSection",
        "type": "section",
        "sectionName": "Abrir Turno",
        "titleKey": "section.shiftWorkspace.openShiftSection.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "openShiftForm",
            "type": "commandForm",
            "organismName": "OpenShiftForm",
            "titleKey": "organism.shiftWorkspace.openDailyShiftCmd.title",
            "purpose": "Permite ao gerente informar a data do turno e observações opcionais para abrir o turno diário; o responsável é derivado da sessão e não requer entrada manual.",
            "userActions": [
              "openDailyShiftCmd"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "ordersRequireOpenDailyShift"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.shiftWorkspace.openDailyShiftCmd.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.shiftWorkspace.openDailyShiftCmd.form.title",
                "source": "bff.openDailyShiftCmd",
                "binding": "binding.shiftWorkspace.openDailyShiftCmd",
                "submitAction": "openDailyShiftCmd",
                "fields": [
                  {
                    "id": "intent.shiftWorkspace.openDailyShiftCmd.form.field.shiftDate",
                    "field": "shiftDate",
                    "labelKey": "intent.shiftWorkspace.openDailyShiftCmd.form.field.shiftDate.label",
                    "order": 10,
                    "stateKey": "ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate"
                  },
                  {
                    "id": "intent.shiftWorkspace.openDailyShiftCmd.form.field.openedByUserId",
                    "field": "openedByUserId",
                    "labelKey": "intent.shiftWorkspace.openDailyShiftCmd.form.field.openedByUserId.label",
                    "order": 20,
                    "stateKey": "ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId"
                  },
                  {
                    "id": "intent.shiftWorkspace.openDailyShiftCmd.form.field.notes",
                    "field": "notes",
                    "labelKey": "intent.shiftWorkspace.openDailyShiftCmd.form.field.notes.label",
                    "order": 30,
                    "stateKey": "ui.shiftWorkspace.input.openDailyShiftCmd.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.shiftWorkspace.openDailyShiftCmd.form.action.openDailyShiftCmd",
                    "action": "openDailyShiftCmd",
                    "labelKey": "intent.shiftWorkspace.openDailyShiftCmd.form.action.openDailyShiftCmd",
                    "order": 10,
                    "actionKey": "openDailyShiftCmd"
                  }
                ]
              }
            ],
            "displayHint": "form"
          }
        ]
      },
      {
        "id": "section.shiftWorkspace.closeShiftSection",
        "type": "section",
        "sectionName": "Fechar Turno e Relatório",
        "titleKey": "section.shiftWorkspace.closeShiftSection.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "closeShiftForm",
            "type": "commandForm",
            "organismName": "CloseShiftForm",
            "titleKey": "organism.shiftWorkspace.closeDailyShiftCmd.title",
            "purpose": "Exibe o turno aberto atual e permite ao gerente informar os totais de caixa e outros pagamentos para confirmar o encerramento do turno; dailyShiftId, closedByUserId e closedAt são derivados do contexto e da sessão.",
            "userActions": [
              "closeDailyShiftCmd"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "ordersRequireOpenDailyShift",
              "shiftClosingReportContents"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.shiftWorkspace.closeDailyShiftCmd.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.shiftWorkspace.closeDailyShiftCmd.form.title",
                "source": "bff.closeDailyShiftCmd",
                "binding": "binding.shiftWorkspace.closeDailyShiftCmd",
                "submitAction": "closeDailyShiftCmd",
                "fields": [
                  {
                    "id": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId.label",
                    "order": 10,
                    "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId"
                  },
                  {
                    "id": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.cashTotal",
                    "field": "cashTotal",
                    "labelKey": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.cashTotal.label",
                    "order": 20,
                    "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal"
                  },
                  {
                    "id": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.otherPaymentsTotal",
                    "field": "otherPaymentsTotal",
                    "labelKey": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.otherPaymentsTotal.label",
                    "order": 30,
                    "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal"
                  },
                  {
                    "id": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.notes",
                    "field": "notes",
                    "labelKey": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.notes.label",
                    "order": 40,
                    "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.notes"
                  },
                  {
                    "id": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedByUserId",
                    "field": "closedByUserId",
                    "labelKey": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedByUserId.label",
                    "order": 50,
                    "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId"
                  },
                  {
                    "id": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedAt",
                    "field": "closedAt",
                    "labelKey": "intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedAt.label",
                    "order": 60,
                    "stateKey": "ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.shiftWorkspace.closeDailyShiftCmd.form.action.closeDailyShiftCmd",
                    "action": "closeDailyShiftCmd",
                    "labelKey": "intent.shiftWorkspace.closeDailyShiftCmd.form.action.closeDailyShiftCmd",
                    "order": 10,
                    "actionKey": "closeDailyShiftCmd"
                  }
                ]
              }
            ],
            "displayHint": "form"
          },
          {
            "id": "shiftClosingReportPanel",
            "type": "queryResult",
            "organismName": "ShiftClosingReportPanel",
            "titleKey": "organism.shiftWorkspace.getShiftClosingReport.title",
            "purpose": "Exibe o relatório de fechamento do turno após o encerramento, com totais de vendas, pedidos, itens vendidos, formas de pagamento, itens mais vendidos e sinais de ruptura de estoque.",
            "userActions": [
              "getShiftClosingReport"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "shiftClosingReportContents",
              "shiftClosingRecordsBasicTotalsAndPayments"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent.shiftWorkspace.getShiftClosingReport.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.shiftWorkspace.getShiftClosingReport.list.title",
                "source": "bff.getShiftClosingReport",
                "binding": "binding.shiftWorkspace.getShiftClosingReport",
                "action": "getShiftClosingReport",
                "emptyKey": "intent.shiftWorkspace.getShiftClosingReport.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId",
                    "field": "shiftClosingReportId",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId.label",
                    "order": 10,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.dailyShiftId.label",
                    "order": 20,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate",
                    "field": "shiftDate",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate.label",
                    "order": 30,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount",
                    "field": "totalSalesAmount",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount.label",
                    "order": 40,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount",
                    "field": "totalOrdersCount",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount.label",
                    "order": 50,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold",
                    "field": "totalItemsSold",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold.label",
                    "order": 60,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount",
                    "field": "cashPaymentsAmount",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount.label",
                    "order": 70,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount",
                    "field": "otherPaymentsAmount",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount.label",
                    "order": 80,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.topSellingItemsSummary",
                    "field": "topSellingItemsSummary",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.topSellingItemsSummary.label",
                    "order": 90,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.lowStockSignalsCount",
                    "field": "lowStockSignalsCount",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.lowStockSignalsCount.label",
                    "order": 100,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.stockoutSignalsCount",
                    "field": "stockoutSignalsCount",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.stockoutSignalsCount.label",
                    "order": 110,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.closingNotes",
                    "field": "closingNotes",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.closingNotes.label",
                    "order": 120,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  },
                  {
                    "id": "intent.shiftWorkspace.getShiftClosingReport.list.column.generatedAt",
                    "field": "generatedAt",
                    "labelKey": "intent.shiftWorkspace.getShiftClosingReport.list.column.generatedAt.label",
                    "order": 130,
                    "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
                  }
                ],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport"
              }
            ],
            "displayHint": "detail"
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "binding.shiftWorkspace.openDailyShiftCmd",
      "source": "bff.openDailyShiftCmd",
      "command": "openDailyShiftCmd",
      "description": "Abrir turno diário",
      "stateKey": "ui.shiftWorkspace.output.openDailyShiftCmd",
      "inputStateKeys": [
        "ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate",
        "ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId",
        "ui.shiftWorkspace.input.openDailyShiftCmd.notes"
      ]
    },
    {
      "id": "binding.shiftWorkspace.closeDailyShiftCmd",
      "source": "bff.closeDailyShiftCmd",
      "command": "closeDailyShiftCmd",
      "description": "Fechar turno diário",
      "stateKey": "ui.shiftWorkspace.output.closeDailyShiftCmd",
      "inputStateKeys": [
        "ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.notes",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId",
        "ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt"
      ]
    },
    {
      "id": "binding.shiftWorkspace.getShiftClosingReport",
      "source": "bff.getShiftClosingReport",
      "command": "getShiftClosingReport",
      "description": "Ver relatório de fechamento de turno",
      "stateKey": "ui.shiftWorkspace.data.getShiftClosingReport",
      "inputStateKeys": [
        "ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "shiftWorkspace__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/shiftWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/shiftWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/shiftWorkspace.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "shiftWorkspace__l2_shared"
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
