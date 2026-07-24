/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "posWorkspace",
  "pageName": "Lançar e acompanhar pedidos",
  "baseClassName": "CafeFlowPosWorkspaceBase",
  "actor": "atendente",
  "purpose": "Executar Lançar e acompanhar pedidos.",
  "capabilities": [
    "orderLifecycle",
    "trackOrders",
    "browseMenuForPos",
    "recordBasicPayment"
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
    "workspaceId": "posWorkspace",
    "workspaceKind": "workflow",
    "workflowId": "orderLifecycle",
    "actor": "atendente",
    "entity": "Order",
    "owners": [
      {
        "kind": "workflow",
        "id": "orderLifecycle",
        "defPath": "_102051_/l4/cafeFlow/workflows/orderLifecycle.defs.ts"
      },
      {
        "kind": "operation",
        "id": "trackOrders",
        "defPath": "_102051_/l4/cafeFlow/operations/trackOrders.defs.ts"
      },
      {
        "kind": "operation",
        "id": "browseMenuForPos",
        "defPath": "_102051_/l4/cafeFlow/operations/browseMenuForPos.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createOrder",
        "defPath": "_102051_/l4/cafeFlow/operations/createOrder.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateOrderStatus",
        "defPath": "_102051_/l4/cafeFlow/operations/updateOrderStatus.defs.ts"
      },
      {
        "kind": "operation",
        "id": "recordBasicPayment",
        "defPath": "_102051_/l4/cafeFlow/operations/recordBasicPayment.defs.ts"
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
          "operationId": "trackOrders",
          "commandName": "trackOrders",
          "steps": [
            "Abrir a lista de pedidos abertos do turno diário em andamento",
            "Visualizar tipo (mesa ou takeout), identificação, status e horários de cada pedido",
            "Identificar pedidos com status pronto para avisar o cliente e preparar a entrega",
            "Consultar detalhes e itens quando precisar esclarecer o andamento"
          ]
        },
        {
          "operationId": "browseMenuForPos",
          "commandName": "browseMenuForPos",
          "steps": [
            "O atendente abre o cardápio no POS durante o lançamento do pedido",
            "O sistema lista somente itens ativos que possuem categoria e preço definidos",
            "O atendente filtra opcionalmente por categoria e visualiza nome, preço, descrição e imagem",
            "O atendente seleciona os itens desejados para compor o pedido"
          ]
        },
        {
          "operationId": "createOrder",
          "commandName": "createOrder",
          "steps": [
            "Indica se o pedido é de mesa ou takeout e informa o número da mesa ou o nome do cliente",
            "Seleciona itens disponíveis do cardápio com quantidades e observações do cliente",
            "Confere o total calculado no lançamento e confirma o envio à cozinha"
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
        },
        {
          "operationId": "recordBasicPayment",
          "commandName": "recordBasicPayment",
          "steps": [
            "Seleciona o pedido em atendimento já totalizado",
            "Informa ou confirma o valor total do pedido",
            "Escolhe a forma de pagamento básica (dinheiro, pix, crédito, débito ou misto)",
            "Opcionalmente registra observações do fechamento",
            "Confirma o lançamento do pagamento básico"
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "section.posWorkspace.sec-open-orders",
      "type": "section",
      "sectionName": "Pedidos Abertos do Turno",
      "titleKey": "section.posWorkspace.sec-open-orders.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-open-orders-filters",
          "type": "queryResult",
          "organismName": "OpenOrdersFilterBar",
          "titleKey": "organism.posWorkspace.queryOpenOrders.title",
          "purpose": "Filtros rápidos de status, tipo de pedido e número de mesa vinculados à consulta de pedidos abertos, permitindo ao atendente e cozinheiro refinar a fila sem sair da tela.",
          "userActions": [
            "queryOpenOrders"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "ordersRequireOpenDailyShift",
            "orderRequiresTableOrTakeout",
            "onlyReadyOrdersCanBeServed",
            "completedOrdersLeaveKitchenQueue"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.posWorkspace.queryOpenOrders.list",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.queryOpenOrders",
              "action": "queryOpenOrders",
              "order": 10
            }
          ]
        },
        {
          "id": "org-open-orders-board",
          "type": "queryResult",
          "organismName": "OpenOrdersBoard",
          "titleKey": "organism.posWorkspace.queryOpenOrders.title",
          "purpose": "Exibe todos os pedidos abertos do turno agrupados por status em lanes (registered, confirmed, inPreparation, ready), permitindo ao atendente e cozinheiro identificar gargalos e selecionar um pedido para agir.",
          "userActions": [
            "queryOpenOrders"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "ordersRequireOpenDailyShift",
            "orderRequiresTableOrTakeout",
            "onlyReadyOrdersCanBeServed",
            "completedOrdersLeaveKitchenQueue"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent.posWorkspace.queryOpenOrders.list2",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.queryOpenOrders",
              "action": "queryOpenOrders",
              "order": 10
            }
          ]
        },
        {
          "id": "org-order-status-actions",
          "type": "commandForm",
          "organismName": "OrderStatusTransitionPanel",
          "titleKey": "organism.posWorkspace.cmdUpdateOrderStatus.title",
          "purpose": "Exibe as transições de status permitidas para o pedido selecionado como botões de ação explícitos (ex: Confirmar, Iniciar Preparo, Pronto, Servido, Cancelar), nunca como select livre.",
          "userActions": [
            "cmdUpdateOrderStatus"
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
          "order": 30,
          "intentionRefs": [
            {
              "id": "intent.posWorkspace.cmdUpdateOrderStatus.form",
              "intent": "commandForm",
              "submitAction": "cmdUpdateOrderStatus",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "section.posWorkspace.sec-create-order",
      "type": "section",
      "sectionName": "Lançar Novo Pedido",
      "titleKey": "section.posWorkspace.sec-create-order.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org-menu-category-filter",
          "type": "queryResult",
          "organismName": "MenuCategoryFilterBar",
          "titleKey": "organism.posWorkspace.queryMenuItems.title",
          "purpose": "Filtro de categoria do cardápio que refina a grade de itens exibida ao atendente durante o lançamento do pedido, acelerando a seleção.",
          "userActions": [
            "queryMenuItems"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "onlyActiveMenuItemsCanBeOrdered",
            "menuItemNeedsCategoryAndPrice"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.posWorkspace.queryMenuItems.list",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.queryMenuItems",
              "action": "queryMenuItems",
              "order": 10
            }
          ]
        },
        {
          "id": "org-menu-items-showcase",
          "type": "queryResult",
          "organismName": "MenuItemsShowcase",
          "titleKey": "organism.posWorkspace.queryMenuItems.title",
          "purpose": "Grade visual de itens ativos do cardápio com nome, preço, descrição e imagem, permitindo ao atendente selecionar itens para compor o pedido por toque/clique.",
          "userActions": [
            "queryMenuItems"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "onlyActiveMenuItemsCanBeOrdered",
            "menuItemNeedsCategoryAndPrice"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent.posWorkspace.queryMenuItems.list2",
              "intent": "queryList",
              "stateKey": "ui.posWorkspace.data.queryMenuItems",
              "action": "queryMenuItems",
              "order": 10
            }
          ]
        },
        {
          "id": "org-create-order-form",
          "type": "commandForm",
          "organismName": "CreateOrderPanel",
          "titleKey": "organism.posWorkspace.cmdCreateOrder.title",
          "purpose": "Painel de composição do pedido onde o atendente define o canal (mesa ou takeout), informa mesa/cliente, revisa os itens selecionados e confirma o envio à cozinha.",
          "userActions": [
            "cmdCreateOrder"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "orderRequiresTableOrTakeout",
            "orderEntersKitchenQueueAfterAttendantConfirmation",
            "orderTotalFromPriceAtLaunchTime",
            "ordersRequireOpenDailyShift",
            "orderItemsArePrepReference"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "intent.posWorkspace.cmdCreateOrder.form",
              "intent": "commandForm",
              "submitAction": "cmdCreateOrder",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "section.posWorkspace.sec-payment",
      "type": "section",
      "sectionName": "Registrar Pagamento",
      "titleKey": "section.posWorkspace.sec-payment.title",
      "mode": "edit",
      "order": 30,
      "organisms": [
        {
          "id": "org-payment-panel",
          "type": "commandForm",
          "organismName": "BasicPaymentPanel",
          "titleKey": "organism.posWorkspace.cmdRecordBasicPayment.title",
          "purpose": "Painel de fechamento de pagamento ativado ao selecionar um pedido totalizado, onde o atendente confirma o valor, escolhe a forma de pagamento e registra o fechamento básico.",
          "userActions": [
            "cmdRecordBasicPayment"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "shiftClosingRecordsBasicTotalsAndPayments"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.posWorkspace.cmdRecordBasicPayment.form",
              "intent": "commandForm",
              "submitAction": "cmdRecordBasicPayment",
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
    "actor": "Atendente de café (e cozinheiro para acompanhamento de fila)",
    "jobToBeDone": "Lançar novos pedidos de mesa ou takeout, acompanhar o andamento dos pedidos abertos do turno, atualizar status ao longo do ciclo de vida e registrar o pagamento básico ao fechar o atendimento.",
    "primaryDecision": "Criar um novo pedido selecionando itens do cardápio e confirmando o envio à cozinha.",
    "decisiveInfo": [
      "orderType (mesa ou takeout)",
      "tableNumber / customerName",
      "menuItemId + quantity + observations (itens do cardápio ativo)",
      "status atual do pedido (para transições contextuais)",
      "totalAmount + paymentMethod (para fechamento)"
    ],
    "usageFrequency": "Contínuo / mãos ocupadas — o atendente usa o POS durante todo o turno, com alta frequência de lançamentos e transições rápidas.",
    "criticalActions": [
      {
        "action": "cmdCreateOrder",
        "presentation": "primary-button dentro do painel de composição do pedido, após seleção de itens do cardápio"
      },
      {
        "action": "cmdUpdateOrderStatus",
        "presentation": "contextual-transition-actions — um botão por transição válida exibido no card/linha do pedido selecionado"
      },
      {
        "action": "cmdRecordBasicPayment",
        "presentation": "inline-row-command ou painel lateral ativado ao selecionar pedido pronto para pagamento"
      }
    ],
    "informationHierarchy": [
      "1. Lista de pedidos abertos do turno (status, tipo, mesa/cliente, horário) — visão operacional imediata",
      "2. Filtros de pedidos (status, tipo, mesa) — refinamento rápido da fila",
      "3. Ações de transição de status contextuais ao pedido selecionado",
      "4. Painel de criação de novo pedido com cardápio navegável por categoria",
      "5. Painel de registro de pagamento básico para pedido selecionado"
    ],
    "successCriteria": "O atendente consegue lançar um pedido completo, acompanhar a fila e registrar pagamento sem sair da tela, sem digitar IDs e sem ambiguidade sobre o estado atual de cada pedido.",
    "antiPatterns": [
      "Campo de status como <select> livre sobre todos os valores do enum",
      "Campo orderId digitado manualmente",
      "Formulário de criação de pedido separado em página diferente",
      "Exibir campos de sistema (dailyShiftId, registeredAt, createdAt) como inputs editáveis",
      "Seção de filtros isolada sem vínculo visual com a lista que filtra",
      "Persuasão ou urgência artificial em tela operacional"
    ]
  },
  "layout": {
    "id": "page21-goal-first",
    "type": "page",
    "sections": [
      {
        "id": "section.posWorkspace.sec-open-orders",
        "type": "section",
        "sectionName": "Pedidos Abertos do Turno",
        "titleKey": "section.posWorkspace.sec-open-orders.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-open-orders-filters",
            "type": "queryResult",
            "organismName": "OpenOrdersFilterBar",
            "titleKey": "organism.posWorkspace.queryOpenOrders.title",
            "purpose": "Filtros rápidos de status, tipo de pedido e número de mesa vinculados à consulta de pedidos abertos, permitindo ao atendente e cozinheiro refinar a fila sem sair da tela.",
            "userActions": [
              "queryOpenOrders"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "ordersRequireOpenDailyShift",
              "orderRequiresTableOrTakeout",
              "onlyReadyOrdersCanBeServed",
              "completedOrdersLeaveKitchenQueue"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.posWorkspace.queryOpenOrders.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.posWorkspace.queryOpenOrders.list.title",
                "source": "bff.queryOpenOrders",
                "binding": "binding.posWorkspace.queryOpenOrders",
                "action": "queryOpenOrders",
                "emptyKey": "intent.posWorkspace.queryOpenOrders.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.column.orders",
                    "field": "orders",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.column.orders.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.data.queryOpenOrders"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.column.total",
                    "field": "total",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.column.total.label",
                    "order": 20,
                    "stateKey": "ui.posWorkspace.data.queryOpenOrders"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.dailyShiftId.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.dailyShiftId"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.status",
                    "field": "status",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.status.label",
                    "order": 20,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.status"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.orderType",
                    "field": "orderType",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.orderType.label",
                    "order": 30,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.orderType"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.tableNumber.label",
                    "order": 40,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.tableNumber"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.page",
                    "field": "page",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.page.label",
                    "order": 50,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.page"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.pageSize",
                    "field": "pageSize",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.pageSize.label",
                    "order": 60,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.pageSize"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.posWorkspace.data.queryOpenOrders"
              }
            ],
            "displayHint": "summary-first"
          },
          {
            "id": "org-open-orders-board",
            "type": "queryResult",
            "organismName": "OpenOrdersBoard",
            "titleKey": "organism.posWorkspace.queryOpenOrders.title",
            "purpose": "Exibe todos os pedidos abertos do turno agrupados por status em lanes (registered, confirmed, inPreparation, ready), permitindo ao atendente e cozinheiro identificar gargalos e selecionar um pedido para agir.",
            "userActions": [
              "queryOpenOrders"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "ordersRequireOpenDailyShift",
              "orderRequiresTableOrTakeout",
              "onlyReadyOrdersCanBeServed",
              "completedOrdersLeaveKitchenQueue"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent.posWorkspace.queryOpenOrders.list2",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.posWorkspace.queryOpenOrders.list.title",
                "source": "bff.queryOpenOrders",
                "binding": "binding.posWorkspace.queryOpenOrders",
                "action": "queryOpenOrders",
                "emptyKey": "intent.posWorkspace.queryOpenOrders.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.column.orders",
                    "field": "orders",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.column.orders.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.data.queryOpenOrders"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.column.total",
                    "field": "total",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.column.total.label",
                    "order": 20,
                    "stateKey": "ui.posWorkspace.data.queryOpenOrders"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.dailyShiftId.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.dailyShiftId"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.status",
                    "field": "status",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.status.label",
                    "order": 20,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.status"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.orderType",
                    "field": "orderType",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.orderType.label",
                    "order": 30,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.orderType"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.tableNumber.label",
                    "order": 40,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.tableNumber"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.page",
                    "field": "page",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.page.label",
                    "order": 50,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.page"
                  },
                  {
                    "id": "intent.posWorkspace.queryOpenOrders.list.filter.pageSize",
                    "field": "pageSize",
                    "labelKey": "intent.posWorkspace.queryOpenOrders.list.filter.pageSize.label",
                    "order": 60,
                    "stateKey": "ui.posWorkspace.input.queryOpenOrders.pageSize"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.posWorkspace.data.queryOpenOrders"
              }
            ],
            "displayHint": "card-board"
          },
          {
            "id": "org-order-status-actions",
            "type": "commandForm",
            "organismName": "OrderStatusTransitionPanel",
            "titleKey": "organism.posWorkspace.cmdUpdateOrderStatus.title",
            "purpose": "Exibe as transições de status permitidas para o pedido selecionado como botões de ação explícitos (ex: Confirmar, Iniciar Preparo, Pronto, Servido, Cancelar), nunca como select livre.",
            "userActions": [
              "cmdUpdateOrderStatus"
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
            "order": 30,
            "intentions": [
              {
                "id": "intent.posWorkspace.cmdUpdateOrderStatus.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.posWorkspace.cmdUpdateOrderStatus.form.title",
                "source": "bff.cmdUpdateOrderStatus",
                "binding": "binding.posWorkspace.cmdUpdateOrderStatus",
                "submitAction": "cmdUpdateOrderStatus",
                "fields": [
                  {
                    "id": "intent.posWorkspace.cmdUpdateOrderStatus.form.field.status",
                    "field": "status",
                    "labelKey": "intent.posWorkspace.cmdUpdateOrderStatus.form.field.status.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.input.cmdUpdateOrderStatus.status"
                  },
                  {
                    "id": "intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason",
                    "field": "cancellationReason",
                    "labelKey": "intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason.label",
                    "order": 20,
                    "stateKey": "ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.posWorkspace.cmdUpdateOrderStatus.form.action.cmdUpdateOrderStatus",
                    "action": "cmdUpdateOrderStatus",
                    "labelKey": "intent.posWorkspace.cmdUpdateOrderStatus.form.action.cmdUpdateOrderStatus",
                    "order": 10,
                    "actionKey": "cmdUpdateOrderStatus"
                  }
                ]
              }
            ],
            "displayHint": "contextual-transition-actions"
          }
        ]
      },
      {
        "id": "section.posWorkspace.sec-create-order",
        "type": "section",
        "sectionName": "Lançar Novo Pedido",
        "titleKey": "section.posWorkspace.sec-create-order.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org-menu-category-filter",
            "type": "queryResult",
            "organismName": "MenuCategoryFilterBar",
            "titleKey": "organism.posWorkspace.queryMenuItems.title",
            "purpose": "Filtro de categoria do cardápio que refina a grade de itens exibida ao atendente durante o lançamento do pedido, acelerando a seleção.",
            "userActions": [
              "queryMenuItems"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "onlyActiveMenuItemsCanBeOrdered",
              "menuItemNeedsCategoryAndPrice"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.posWorkspace.queryMenuItems.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.posWorkspace.queryMenuItems.list.title",
                "source": "bff.queryMenuItems",
                "binding": "binding.posWorkspace.queryMenuItems",
                "action": "queryMenuItems",
                "emptyKey": "intent.posWorkspace.queryMenuItems.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.menuItemId",
                    "field": "menuItemId",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.menuItemId.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.menuCategoryId.label",
                    "order": 20,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.name",
                    "field": "name",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.name.label",
                    "order": 30,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.description",
                    "field": "description",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.description.label",
                    "order": 40,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.price",
                    "field": "price",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.price.label",
                    "order": 50,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.status",
                    "field": "status",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.status.label",
                    "order": 60,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.imageUrl",
                    "field": "imageUrl",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.imageUrl.label",
                    "order": 70,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.displayOrder",
                    "field": "displayOrder",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.displayOrder.label",
                    "order": 80,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.input.queryMenuItems.menuCategoryId"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.posWorkspace.data.queryMenuItems"
              }
            ],
            "displayHint": "summary-first"
          },
          {
            "id": "org-menu-items-showcase",
            "type": "queryResult",
            "organismName": "MenuItemsShowcase",
            "titleKey": "organism.posWorkspace.queryMenuItems.title",
            "purpose": "Grade visual de itens ativos do cardápio com nome, preço, descrição e imagem, permitindo ao atendente selecionar itens para compor o pedido por toque/clique.",
            "userActions": [
              "queryMenuItems"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "onlyActiveMenuItemsCanBeOrdered",
              "menuItemNeedsCategoryAndPrice"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent.posWorkspace.queryMenuItems.list2",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.posWorkspace.queryMenuItems.list.title",
                "source": "bff.queryMenuItems",
                "binding": "binding.posWorkspace.queryMenuItems",
                "action": "queryMenuItems",
                "emptyKey": "intent.posWorkspace.queryMenuItems.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.menuItemId",
                    "field": "menuItemId",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.menuItemId.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.menuCategoryId.label",
                    "order": 20,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.name",
                    "field": "name",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.name.label",
                    "order": 30,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.description",
                    "field": "description",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.description.label",
                    "order": 40,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.price",
                    "field": "price",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.price.label",
                    "order": 50,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.status",
                    "field": "status",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.status.label",
                    "order": 60,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.imageUrl",
                    "field": "imageUrl",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.imageUrl.label",
                    "order": 70,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  },
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.column.displayOrder",
                    "field": "displayOrder",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.column.displayOrder.label",
                    "order": 80,
                    "stateKey": "ui.posWorkspace.data.queryMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.input.queryMenuItems.menuCategoryId"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.posWorkspace.data.queryMenuItems"
              }
            ],
            "displayHint": "card-board"
          },
          {
            "id": "org-create-order-form",
            "type": "commandForm",
            "organismName": "CreateOrderPanel",
            "titleKey": "organism.posWorkspace.cmdCreateOrder.title",
            "purpose": "Painel de composição do pedido onde o atendente define o canal (mesa ou takeout), informa mesa/cliente, revisa os itens selecionados e confirma o envio à cozinha.",
            "userActions": [
              "cmdCreateOrder"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "orderRequiresTableOrTakeout",
              "orderEntersKitchenQueueAfterAttendantConfirmation",
              "orderTotalFromPriceAtLaunchTime",
              "ordersRequireOpenDailyShift",
              "orderItemsArePrepReference"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "intent.posWorkspace.cmdCreateOrder.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.posWorkspace.cmdCreateOrder.form.title",
                "source": "bff.cmdCreateOrder",
                "binding": "binding.posWorkspace.cmdCreateOrder",
                "submitAction": "cmdCreateOrder",
                "fields": [
                  {
                    "id": "intent.posWorkspace.cmdCreateOrder.form.field.orderType",
                    "field": "orderType",
                    "labelKey": "intent.posWorkspace.cmdCreateOrder.form.field.orderType.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.input.cmdCreateOrder.orderType"
                  },
                  {
                    "id": "intent.posWorkspace.cmdCreateOrder.form.field.tableNumber",
                    "field": "tableNumber",
                    "labelKey": "intent.posWorkspace.cmdCreateOrder.form.field.tableNumber.label",
                    "order": 20,
                    "stateKey": "ui.posWorkspace.input.cmdCreateOrder.tableNumber"
                  },
                  {
                    "id": "intent.posWorkspace.cmdCreateOrder.form.field.customerName",
                    "field": "customerName",
                    "labelKey": "intent.posWorkspace.cmdCreateOrder.form.field.customerName.label",
                    "order": 30,
                    "stateKey": "ui.posWorkspace.input.cmdCreateOrder.customerName"
                  },
                  {
                    "id": "intent.posWorkspace.cmdCreateOrder.form.field.notes",
                    "field": "notes",
                    "labelKey": "intent.posWorkspace.cmdCreateOrder.form.field.notes.label",
                    "order": 40,
                    "stateKey": "ui.posWorkspace.input.cmdCreateOrder.notes"
                  },
                  {
                    "id": "intent.posWorkspace.cmdCreateOrder.form.field.menuItemId",
                    "field": "menuItemId",
                    "labelKey": "intent.posWorkspace.cmdCreateOrder.form.field.menuItemId.label",
                    "order": 50,
                    "stateKey": "ui.posWorkspace.input.cmdCreateOrder.menuItemId"
                  },
                  {
                    "id": "intent.posWorkspace.cmdCreateOrder.form.field.quantity",
                    "field": "quantity",
                    "labelKey": "intent.posWorkspace.cmdCreateOrder.form.field.quantity.label",
                    "order": 60,
                    "stateKey": "ui.posWorkspace.input.cmdCreateOrder.quantity"
                  },
                  {
                    "id": "intent.posWorkspace.cmdCreateOrder.form.field.observations",
                    "field": "observations",
                    "labelKey": "intent.posWorkspace.cmdCreateOrder.form.field.observations.label",
                    "order": 70,
                    "stateKey": "ui.posWorkspace.input.cmdCreateOrder.observations"
                  },
                  {
                    "id": "intent.posWorkspace.cmdCreateOrder.form.field.dailyShiftId",
                    "field": "dailyShiftId",
                    "labelKey": "intent.posWorkspace.cmdCreateOrder.form.field.dailyShiftId.label",
                    "order": 80,
                    "stateKey": "ui.posWorkspace.input.cmdCreateOrder.dailyShiftId"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.posWorkspace.cmdCreateOrder.form.action.cmdCreateOrder",
                    "action": "cmdCreateOrder",
                    "labelKey": "intent.posWorkspace.cmdCreateOrder.form.action.cmdCreateOrder",
                    "order": 10,
                    "actionKey": "cmdCreateOrder"
                  }
                ]
              }
            ],
            "displayHint": "master-detail"
          }
        ]
      },
      {
        "id": "section.posWorkspace.sec-payment",
        "type": "section",
        "sectionName": "Registrar Pagamento",
        "titleKey": "section.posWorkspace.sec-payment.title",
        "mode": "edit",
        "order": 30,
        "organisms": [
          {
            "id": "org-payment-panel",
            "type": "commandForm",
            "organismName": "BasicPaymentPanel",
            "titleKey": "organism.posWorkspace.cmdRecordBasicPayment.title",
            "purpose": "Painel de fechamento de pagamento ativado ao selecionar um pedido totalizado, onde o atendente confirma o valor, escolhe a forma de pagamento e registra o fechamento básico.",
            "userActions": [
              "cmdRecordBasicPayment"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "shiftClosingRecordsBasicTotalsAndPayments"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.posWorkspace.cmdRecordBasicPayment.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.posWorkspace.cmdRecordBasicPayment.form.title",
                "source": "bff.cmdRecordBasicPayment",
                "binding": "binding.posWorkspace.cmdRecordBasicPayment",
                "submitAction": "cmdRecordBasicPayment",
                "fields": [
                  {
                    "id": "intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount",
                    "field": "totalAmount",
                    "labelKey": "intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount.label",
                    "order": 10,
                    "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount"
                  },
                  {
                    "id": "intent.posWorkspace.cmdRecordBasicPayment.form.field.paymentMethod",
                    "field": "paymentMethod",
                    "labelKey": "intent.posWorkspace.cmdRecordBasicPayment.form.field.paymentMethod.label",
                    "order": 20,
                    "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod"
                  },
                  {
                    "id": "intent.posWorkspace.cmdRecordBasicPayment.form.field.notes",
                    "field": "notes",
                    "labelKey": "intent.posWorkspace.cmdRecordBasicPayment.form.field.notes.label",
                    "order": 30,
                    "stateKey": "ui.posWorkspace.input.cmdRecordBasicPayment.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.posWorkspace.cmdRecordBasicPayment.form.action.cmdRecordBasicPayment",
                    "action": "cmdRecordBasicPayment",
                    "labelKey": "intent.posWorkspace.cmdRecordBasicPayment.form.action.cmdRecordBasicPayment",
                    "order": 10,
                    "actionKey": "cmdRecordBasicPayment"
                  }
                ]
              }
            ],
            "displayHint": "inline-row-command"
          }
        ]
      }
    ]
  },
  "dataBindings": [
    {
      "id": "binding.posWorkspace.queryOpenOrders",
      "source": "bff.queryOpenOrders",
      "command": "queryOpenOrders",
      "description": "Acompanhar pedidos abertos",
      "stateKey": "ui.posWorkspace.data.queryOpenOrders",
      "inputStateKeys": [
        "ui.posWorkspace.input.queryOpenOrders.dailyShiftId",
        "ui.posWorkspace.input.queryOpenOrders.status",
        "ui.posWorkspace.input.queryOpenOrders.orderType",
        "ui.posWorkspace.input.queryOpenOrders.tableNumber",
        "ui.posWorkspace.input.queryOpenOrders.page",
        "ui.posWorkspace.input.queryOpenOrders.pageSize"
      ]
    },
    {
      "id": "binding.posWorkspace.queryMenuItems",
      "source": "bff.queryMenuItems",
      "command": "queryMenuItems",
      "description": "Consultar cardápio no POS",
      "stateKey": "ui.posWorkspace.data.queryMenuItems",
      "inputStateKeys": [
        "ui.posWorkspace.input.queryMenuItems.menuCategoryId"
      ]
    },
    {
      "id": "binding.posWorkspace.cmdCreateOrder",
      "source": "bff.cmdCreateOrder",
      "command": "cmdCreateOrder",
      "description": "Registrar pedido",
      "stateKey": "ui.posWorkspace.output.cmdCreateOrder",
      "inputStateKeys": [
        "ui.posWorkspace.input.cmdCreateOrder.orderType",
        "ui.posWorkspace.input.cmdCreateOrder.tableNumber",
        "ui.posWorkspace.input.cmdCreateOrder.customerName",
        "ui.posWorkspace.input.cmdCreateOrder.notes",
        "ui.posWorkspace.input.cmdCreateOrder.menuItemId",
        "ui.posWorkspace.input.cmdCreateOrder.quantity",
        "ui.posWorkspace.input.cmdCreateOrder.observations",
        "ui.posWorkspace.input.cmdCreateOrder.dailyShiftId"
      ]
    },
    {
      "id": "binding.posWorkspace.cmdUpdateOrderStatus",
      "source": "bff.cmdUpdateOrderStatus",
      "command": "cmdUpdateOrderStatus",
      "description": "Atualizar status do pedido",
      "stateKey": "ui.posWorkspace.output.cmdUpdateOrderStatus",
      "inputStateKeys": [
        "ui.posWorkspace.input.cmdUpdateOrderStatus.orderId",
        "ui.posWorkspace.input.cmdUpdateOrderStatus.status",
        "ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason"
      ]
    },
    {
      "id": "binding.posWorkspace.cmdRecordBasicPayment",
      "source": "bff.cmdRecordBasicPayment",
      "command": "cmdRecordBasicPayment",
      "description": "Registrar pagamento básico",
      "stateKey": "ui.posWorkspace.output.cmdRecordBasicPayment",
      "inputStateKeys": [
        "ui.posWorkspace.input.cmdRecordBasicPayment.orderId",
        "ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount",
        "ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod",
        "ui.posWorkspace.input.cmdRecordBasicPayment.notes"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "posWorkspace__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/posWorkspace.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "posWorkspace__l2_shared"
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
