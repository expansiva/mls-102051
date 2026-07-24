/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/kitchenWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "kitchenWorkspace",
  "pageName": "Fila da cozinha",
  "baseClassName": "CafeFlowKitchenWorkspaceBase",
  "actor": "cozinheiro",
  "purpose": "Executar Fila da cozinha.",
  "capabilities": [
    "orderLifecycle",
    "viewKitchenQueue"
  ],
  "flowRefs": {
    "experienceFlows": [
      "orderLifecycle"
    ],
    "entityLifecycles": [],
    "taskWorkflows": [
      "orderLifecycle"
    ],
    "automations": []
  },
  "pluginRefs": [],
  "mdmRefs": [],
  "origin": {
    "source": "l4-journey",
    "workspaceId": "kitchenWorkspace",
    "workspaceKind": "workflow",
    "workflowId": "orderLifecycle",
    "actor": "cozinheiro",
    "entity": "Order",
    "owners": [
      {
        "kind": "workflow",
        "id": "orderLifecycle",
        "defPath": "_102051_/l4/cafeFlow/workflows/orderLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "viewKitchenQueue",
        "defPath": "_102051_/l4/cafeFlow/operations/viewKitchenQueue.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateOrderStatus",
        "defPath": "_102051_/l4/cafeFlow/operations/updateOrderStatus.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [
        "O atendente define o canal (mesa ou takeout), inclui itens ativos do cardápio com quantidades e observações e associa o pagamento básico quando aplicável.",
        "O atendente confere o lançamento, confirma o pedido e o envia à fila da cozinha.",
        "O cozinheiro consulta a fila, inicia o preparo e atualiza o status para em preparo.",
        "Ao concluir o preparo, o cozinheiro marca o pedido como pronto para o salão ou balcão.",
        "O atendente avisa o cliente e marca o pedido como servido ou entregue, concluindo o ciclo e disparando a baixa automática de estoque."
      ],
      "operations": [
        {
          "operationId": "viewKitchenQueue",
          "commandName": "viewKitchenQueue",
          "steps": [
            "O cozinheiro abre a fila da cozinha vinculada ao turno diário aberto",
            "O sistema lista apenas pedidos confirmados e em preparo, com itens, quantidades e observações",
            "O cozinheiro visualiza canal (mesa/takeout), mesa ou cliente e observações para ordenar o preparo"
          ]
        },
        {
          "operationId": "updateOrderStatus",
          "commandName": "updateOrderStatus",
          "steps": [
            "Seleciona o pedido na lista ou fila operacional do salão/cozinha",
            "Informa o novo status permitido pela transição (confirmed, inPreparation, ready, served ou cancelled)",
            "Quando o destino for cancelamento, informa o motivo",
            "Confirma a atualização do status"
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "section.kitchenWorkspace.kitchen-queue-section",
      "type": "section",
      "sectionName": "Fila da Cozinha",
      "titleKey": "section.kitchenWorkspace.kitchen-queue-section.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "kitchen-queue-board",
          "type": "queryResult",
          "organismName": "KitchenQueueBoard",
          "titleKey": "organism.kitchenWorkspace.fetchKitchenQueue.title",
          "purpose": "Exibe todos os pedidos confirmados e em preparo do turno ativo agrupados por status (confirmed / inPreparation), mostrando canal, mesa/cliente, itens com quantidades e observações, e tempo de espera; é a superfície principal de trabalho do cozinheiro.",
          "userActions": [
            "fetchKitchenQueue"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "orderEntersKitchenQueueAfterAttendantConfirmation",
            "completedOrdersLeaveKitchenQueue",
            "orderItemsArePrepReference",
            "ordersRequireOpenDailyShift",
            "orderRequiresTableOrTakeout"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.kitchenWorkspace.fetchKitchenQueue.list",
              "intent": "queryList",
              "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue",
              "action": "fetchKitchenQueue",
              "order": 10
            }
          ]
        },
        {
          "id": "order-transition-panel",
          "type": "commandForm",
          "organismName": "OrderTransitionPanel",
          "titleKey": "organism.kitchenWorkspace.changeOrderStatus.title",
          "purpose": "Ao selecionar um pedido no board, exibe as transições de status permitidas como botões de ação contextual (ex: 'Iniciar Preparo', 'Marcar como Pronto', 'Cancelar') e, apenas quando o destino for cancelamento, revela o campo de motivo; confirma a atualização sem navegar para outra tela.",
          "userActions": [
            "changeOrderStatus"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "orderEntersKitchenQueueAfterAttendantConfirmation",
            "onlyReadyOrdersCanBeServed",
            "autoStockDeductionOnServe",
            "completedOrdersLeaveKitchenQueue",
            "kitchenStatusProgressesInOrder"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent.kitchenWorkspace.changeOrderStatus.form",
              "intent": "commandForm",
              "submitAction": "changeOrderStatus",
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
    "actor": "Cozinheiro (kitchen staff)",
    "jobToBeDone": "Visualizar todos os pedidos confirmados e em preparo do turno atual e avançar o status de cada pedido conforme o andamento do preparo, sem sair da fila.",
    "primaryDecision": "Qual pedido avançar agora e para qual status (inPreparation → ready, ou cancelar)?",
    "decisiveInfo": [
      "orderType (mesa/takeout)",
      "tableNumber / customerName",
      "items (nome, quantidade, observações)",
      "status atual do pedido",
      "notes",
      "confirmedAt / inPreparationAt (tempo de espera)"
    ],
    "usageFrequency": "Contínuo durante o turno — o cozinheiro mantém a tela aberta e atualiza pedidos em sequência, com alta frequência e mãos ocupadas.",
    "criticalActions": [
      {
        "action": "changeOrderStatus",
        "presentation": "contextual-transition-actions — um botão por transição válida diretamente no card/linha do pedido selecionado (ex: 'Iniciar Preparo', 'Pronto', 'Cancelar'); nunca um <select> livre"
      },
      {
        "action": "fetchKitchenQueue",
        "presentation": "auto-load ao abrir a página com dailyShiftId derivado do turno ativo; botão de refresh visível para atualização manual"
      }
    ],
    "informationHierarchy": [
      "1. Fila de pedidos agrupada por status (confirmed → inPreparation) com contagem por grupo",
      "2. Card do pedido: canal, mesa/cliente, tempo de espera, itens com quantidades e observações",
      "3. Ações de transição contextual no pedido selecionado (botões de próximo estado válido)",
      "4. Campo de motivo de cancelamento — aparece apenas quando a transição destino é 'cancelled'"
    ],
    "successCriteria": "O cozinheiro consegue ver toda a fila do turno de relance, selecionar um pedido e avançar seu status em no máximo dois toques, sem digitar IDs ou navegar para outra tela.",
    "antiPatterns": [
      "Campo de status como <select> livre sobre todos os valores do enum",
      "Formulário separado de transição em seção própria abaixo da lista",
      "Campo orderId como input manual",
      "Campo dailyShiftId como input manual (deve vir do turno ativo)",
      "Campo updatedAt como input manual (sistema preenche)",
      "Exibir pedidos com status 'registered', 'served' ou 'cancelled' na fila ativa"
    ]
  },
  "layout": {
    "id": "page21",
    "type": "page",
    "sections": [
      {
        "id": "section.kitchenWorkspace.kitchen-queue-section",
        "type": "section",
        "sectionName": "Fila da Cozinha",
        "titleKey": "section.kitchenWorkspace.kitchen-queue-section.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "kitchen-queue-board",
            "type": "queryResult",
            "organismName": "KitchenQueueBoard",
            "titleKey": "organism.kitchenWorkspace.fetchKitchenQueue.title",
            "purpose": "Exibe todos os pedidos confirmados e em preparo do turno ativo agrupados por status (confirmed / inPreparation), mostrando canal, mesa/cliente, itens com quantidades e observações, e tempo de espera; é a superfície principal de trabalho do cozinheiro.",
            "userActions": [
              "fetchKitchenQueue"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "orderEntersKitchenQueueAfterAttendantConfirmation",
              "completedOrdersLeaveKitchenQueue",
              "orderItemsArePrepReference",
              "ordersRequireOpenDailyShift",
              "orderRequiresTableOrTakeout"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.kitchenWorkspace.fetchKitchenQueue.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.title",
                "source": "bff.fetchKitchenQueue",
                "binding": "binding.kitchenWorkspace.fetchKitchenQueue",
                "action": "fetchKitchenQueue",
                "emptyKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId",
                    "field": "orderId",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label",
                    "order": 10,
                    "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
                  },
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderType",
                    "field": "orderType",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderType.label",
                    "order": 20,
                    "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
                  },
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.tableNumber.label",
                    "order": 30,
                    "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
                  },
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.customerName",
                    "field": "customerName",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.customerName.label",
                    "order": 40,
                    "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
                  },
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.notes",
                    "field": "notes",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.notes.label",
                    "order": 50,
                    "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
                  },
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.status",
                    "field": "status",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.status.label",
                    "order": 60,
                    "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
                  },
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.confirmedAt",
                    "field": "confirmedAt",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.confirmedAt.label",
                    "order": 70,
                    "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
                  },
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.inPreparationAt",
                    "field": "inPreparationAt",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.inPreparationAt.label",
                    "order": 80,
                    "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
                  },
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.items",
                    "field": "items",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.column.items.label",
                    "order": 90,
                    "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.kitchenWorkspace.fetchKitchenQueue.list.filter.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.kitchenWorkspace.fetchKitchenQueue.list.filter.dailyShiftId.label",
                    "order": 10,
                    "stateKey": "ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue"
              }
            ],
            "displayHint": "card-board"
          },
          {
            "id": "order-transition-panel",
            "type": "commandForm",
            "organismName": "OrderTransitionPanel",
            "titleKey": "organism.kitchenWorkspace.changeOrderStatus.title",
            "purpose": "Ao selecionar um pedido no board, exibe as transições de status permitidas como botões de ação contextual (ex: 'Iniciar Preparo', 'Marcar como Pronto', 'Cancelar') e, apenas quando o destino for cancelamento, revela o campo de motivo; confirma a atualização sem navegar para outra tela.",
            "userActions": [
              "changeOrderStatus"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "orderEntersKitchenQueueAfterAttendantConfirmation",
              "onlyReadyOrdersCanBeServed",
              "autoStockDeductionOnServe",
              "completedOrdersLeaveKitchenQueue",
              "kitchenStatusProgressesInOrder"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent.kitchenWorkspace.changeOrderStatus.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.kitchenWorkspace.changeOrderStatus.form.title",
                "source": "bff.changeOrderStatus",
                "binding": "binding.kitchenWorkspace.changeOrderStatus",
                "submitAction": "changeOrderStatus",
                "fields": [
                  {
                    "id": "intent.kitchenWorkspace.changeOrderStatus.form.field.status",
                    "field": "status",
                    "labelKey": "intent.kitchenWorkspace.changeOrderStatus.form.field.status.label",
                    "order": 10,
                    "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.status"
                  },
                  {
                    "id": "intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason",
                    "field": "cancellationReason",
                    "labelKey": "intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason.label",
                    "order": 20,
                    "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason"
                  },
                  {
                    "id": "intent.kitchenWorkspace.changeOrderStatus.form.field.updatedAt",
                    "field": "updatedAt",
                    "labelKey": "intent.kitchenWorkspace.changeOrderStatus.form.field.updatedAt.label",
                    "order": 30,
                    "stateKey": "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus",
                    "action": "changeOrderStatus",
                    "labelKey": "intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus",
                    "order": 10,
                    "actionKey": "changeOrderStatus"
                  }
                ]
              }
            ],
            "displayHint": "contextual-transition-actions"
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "binding.kitchenWorkspace.fetchKitchenQueue",
      "source": "bff.fetchKitchenQueue",
      "command": "fetchKitchenQueue",
      "description": "Ver fila da cozinha",
      "stateKey": "ui.kitchenWorkspace.data.fetchKitchenQueue",
      "inputStateKeys": [
        "ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId"
      ]
    },
    {
      "id": "binding.kitchenWorkspace.changeOrderStatus",
      "source": "bff.changeOrderStatus",
      "command": "changeOrderStatus",
      "description": "Atualizar status do pedido",
      "stateKey": "ui.kitchenWorkspace.output.changeOrderStatus",
      "inputStateKeys": [
        "ui.kitchenWorkspace.input.changeOrderStatus.orderId",
        "ui.kitchenWorkspace.input.changeOrderStatus.status",
        "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason",
        "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "kitchenWorkspace__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/kitchenWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/kitchenWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "kitchenWorkspace__l2_shared"
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
