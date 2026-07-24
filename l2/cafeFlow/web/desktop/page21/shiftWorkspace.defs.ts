/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/shiftWorkspace.defs.ts" enhancement="_blank"/>

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
      "id": "section.shiftWorkspace.sec-shift-status",
      "type": "section",
      "sectionName": "Estado do Turno",
      "titleKey": "section.shiftWorkspace.sec-shift-status.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-shift-status-banner",
          "type": "queryResult",
          "organismName": "ShiftStatusBanner",
          "titleKey": "organism.shiftWorkspace.getShiftClosingReport.title",
          "purpose": "Exibe o status atual do turno (aberto, fechado ou sem turno) como âncora visual imediata, permitindo ao gerente saber de relance em que estado a operação se encontra antes de agir.",
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
          "order": 10,
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
    },
    {
      "id": "section.shiftWorkspace.sec-open-shift",
      "type": "section",
      "sectionName": "Abrir Turno",
      "titleKey": "section.shiftWorkspace.sec-open-shift.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org-open-shift-form",
          "type": "commandForm",
          "organismName": "OpenShiftForm",
          "titleKey": "organism.shiftWorkspace.openDailyShiftCmd.title",
          "purpose": "Permite ao gerente abrir o turno diário informando apenas a data operacional (pré-preenchida com hoje) e uma nota opcional; openedByUserId é derivado da sessão e nunca editável.",
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
      "id": "section.shiftWorkspace.sec-close-shift",
      "type": "section",
      "sectionName": "Fechar Turno",
      "titleKey": "section.shiftWorkspace.sec-close-shift.title",
      "mode": "edit",
      "order": 30,
      "organisms": [
        {
          "id": "org-close-shift-panel",
          "type": "commandForm",
          "organismName": "CloseShiftPanel",
          "titleKey": "organism.shiftWorkspace.closeDailyShiftCmd.title",
          "purpose": "Apresenta os totais acumulados do turno aberto e coleta cashTotal e otherPaymentsTotal do gerente para confirmar o fechamento; dailyShiftId, closedByUserId e closedAt são todos derivados do contexto e nunca digitados.",
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
          "id": "org-closing-report-detail",
          "type": "queryResult",
          "organismName": "ShiftClosingReportDetail",
          "titleKey": "organism.shiftWorkspace.getShiftClosingReport.title",
          "purpose": "Exibe o relatório completo de fechamento do turno imediatamente após o fechamento, com totais de vendas, pagamentos, itens mais vendidos e alertas de estoque — sem exigir navegação para outra tela.",
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
              "id": "intent.shiftWorkspace.getShiftClosingReport.list2",
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
  "templateId": "goal_first",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI",
  "pageObjective": {
    "actor": "Gerente de turno (café)",
    "jobToBeDone": "Abrir o turno diário no início do expediente, acompanhar a operação ao longo do dia e fechar o turno ao final, revisando o relatório de fechamento com totais de vendas, pagamentos e alertas de estoque.",
    "primaryDecision": "Abrir ou fechar o turno diário — a ação que habilita ou encerra toda a operação do dia.",
    "decisiveInfo": [
      "shiftDate (data operacional do turno)",
      "status do turno (aberto / fechado)",
      "cashTotal e otherPaymentsTotal (totais de fechamento)",
      "totalSalesAmount, totalOrdersCount, totalItemsSold (resumo do dia)",
      "lowStockSignalsCount, stockoutSignalsCount (alertas de estoque)",
      "topSellingItemsSummary (destaques de vendas)"
    ],
    "usageFrequency": "Diária / operacional — uma abertura e um fechamento por dia, com revisão do relatório imediatamente após o fechamento.",
    "criticalActions": [
      {
        "action": "openDailyShiftCmd",
        "presentation": "primary-button com formulário mínimo (shiftDate pré-preenchida com hoje; openedByUserId derivado da sessão; notes opcional)"
      },
      {
        "action": "closeDailyShiftCmd",
        "presentation": "contextual-transition-actions — botão de fechamento visível apenas quando o turno está aberto; cashTotal e otherPaymentsTotal como únicos inputs reais; confirmação antes de submeter"
      },
      {
        "action": "getShiftClosingReport",
        "presentation": "summary-first — relatório exibido automaticamente após o fechamento, com totais em destaque e detalhes abaixo"
      }
    ],
    "informationHierarchy": [
      "1. Status atual do turno (aberto / sem turno) — âncora visual imediata",
      "2. Formulário de abertura de turno (quando não há turno aberto)",
      "3. Painel de fechamento com totais do dia e inputs de caixa (quando turno está aberto)",
      "4. Relatório de fechamento completo (após fechar o turno)"
    ],
    "successCriteria": "O gerente abre o turno em menos de 10 segundos, fecha informando apenas os totais de caixa e revisa o relatório sem precisar navegar para outra tela.",
    "antiPatterns": [
      "Campo de dailyShiftId como input manual — deve ser derivado do turno ativo",
      "Status do turno como <select> livre — transições devem ser botões contextuais",
      "Formulário de fechamento sempre visível independente do estado do turno",
      "Relatório em página separada — deve aparecer inline após o fechamento",
      "openedByUserId e closedByUserId como inputs editáveis — derivados da sessão",
      "closedAt como input manual — gerado pelo sistema"
    ]
  },
  "layout": {
    "id": "shiftWorkspace-page21-goal-first",
    "type": "page",
    "sections": [
      {
        "id": "section.shiftWorkspace.sec-shift-status",
        "type": "section",
        "sectionName": "Estado do Turno",
        "titleKey": "section.shiftWorkspace.sec-shift-status.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-shift-status-banner",
            "type": "queryResult",
            "organismName": "ShiftStatusBanner",
            "titleKey": "organism.shiftWorkspace.getShiftClosingReport.title",
            "purpose": "Exibe o status atual do turno (aberto, fechado ou sem turno) como âncora visual imediata, permitindo ao gerente saber de relance em que estado a operação se encontra antes de agir.",
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
            "order": 10,
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
            "displayHint": "summary-first"
          }
        ]
      },
      {
        "id": "section.shiftWorkspace.sec-open-shift",
        "type": "section",
        "sectionName": "Abrir Turno",
        "titleKey": "section.shiftWorkspace.sec-open-shift.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org-open-shift-form",
            "type": "commandForm",
            "organismName": "OpenShiftForm",
            "titleKey": "organism.shiftWorkspace.openDailyShiftCmd.title",
            "purpose": "Permite ao gerente abrir o turno diário informando apenas a data operacional (pré-preenchida com hoje) e uma nota opcional; openedByUserId é derivado da sessão e nunca editável.",
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
            "displayHint": "contextual-transition-actions"
          }
        ]
      },
      {
        "id": "section.shiftWorkspace.sec-close-shift",
        "type": "section",
        "sectionName": "Fechar Turno",
        "titleKey": "section.shiftWorkspace.sec-close-shift.title",
        "mode": "edit",
        "order": 30,
        "organisms": [
          {
            "id": "org-close-shift-panel",
            "type": "commandForm",
            "organismName": "CloseShiftPanel",
            "titleKey": "organism.shiftWorkspace.closeDailyShiftCmd.title",
            "purpose": "Apresenta os totais acumulados do turno aberto e coleta cashTotal e otherPaymentsTotal do gerente para confirmar o fechamento; dailyShiftId, closedByUserId e closedAt são todos derivados do contexto e nunca digitados.",
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
            "displayHint": "contextual-transition-actions"
          },
          {
            "id": "org-closing-report-detail",
            "type": "queryResult",
            "organismName": "ShiftClosingReportDetail",
            "titleKey": "organism.shiftWorkspace.getShiftClosingReport.title",
            "purpose": "Exibe o relatório completo de fechamento do turno imediatamente após o fechamento, com totais de vendas, pagamentos, itens mais vendidos e alertas de estoque — sem exigir navegação para outra tela.",
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
                "id": "intent.shiftWorkspace.getShiftClosingReport.list2",
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
            "displayHint": "summary-first"
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
    "id": "shiftWorkspace__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/shiftWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/shiftWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/shiftWorkspace.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "shiftWorkspace__l2_shared"
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
