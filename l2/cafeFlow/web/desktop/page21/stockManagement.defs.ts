/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "stockManagement",
  "pageName": "Controlar estoque",
  "baseClassName": "CafeFlowStockManagementBase",
  "actor": "gerente",
  "purpose": "Executar Controlar estoque.",
  "capabilities": [
    "browseStockItems",
    "createStockItem",
    "updateStockItem",
    "deleteStockItem",
    "createStockAdjustment"
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
    "workspaceId": "stockManagement",
    "workspaceKind": "operation",
    "actor": "gerente",
    "entity": "StockItem",
    "owners": [
      {
        "kind": "operation",
        "id": "browseStockItems",
        "defPath": "_102051_/l4/cafeFlow/operations/browseStockItems.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createStockItem",
        "defPath": "_102051_/l4/cafeFlow/operations/createStockItem.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateStockItem",
        "defPath": "_102051_/l4/cafeFlow/operations/updateStockItem.defs.ts"
      },
      {
        "kind": "operation",
        "id": "deleteStockItem",
        "defPath": "_102051_/l4/cafeFlow/operations/deleteStockItem.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createStockAdjustment",
        "defPath": "_102051_/l4/cafeFlow/operations/createStockAdjustment.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "browseStockItems",
          "commandName": "browseStockItems",
          "steps": [
            "O gerente acessa o controle de estoque",
            "O sistema lista os insumos com saldo atual, unidade e nível mínimo",
            "Itens com saldo no ou abaixo do mínimo são destacados como estoque baixo",
            "O gerente pode filtrar por nome ou somente itens em estoque baixo"
          ]
        },
        {
          "operationId": "createStockItem",
          "commandName": "createStockItem",
          "steps": [
            "Informar nome, unidade de medida, saldo inicial e nível mínimo do insumo",
            "Opcionalmente informar descrição complementar",
            "Confirmar o cadastro do item de estoque"
          ]
        },
        {
          "operationId": "updateStockItem",
          "commandName": "updateStockItem",
          "steps": [
            "O gerente abre o item de estoque selecionado para edição",
            "O gerente altera nome, unidade de medida, nível mínimo e/ou descrição do insumo",
            "O gerente confirma a atualização do cadastro"
          ]
        },
        {
          "operationId": "deleteStockItem",
          "commandName": "deleteStockItem",
          "steps": [
            "Seleciona o item de estoque na listagem de controle",
            "Confirma a exclusão do item de estoque",
            "O sistema remove o cadastro do insumo"
          ]
        },
        {
          "operationId": "createStockAdjustment",
          "commandName": "createStockAdjustment",
          "steps": [
            "Seleciona o insumo cujo saldo precisa ser corrigido",
            "Informa a quantidade, a direção do ajuste e o motivo",
            "Opcionalmente adiciona observações sobre a divergência",
            "Confirma o registro do ajuste manual"
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "section.stockManagement.sec-stock-overview",
      "type": "section",
      "sectionName": "Visão geral do estoque",
      "titleKey": "section.stockManagement.sec-stock-overview.title",
      "mode": "view",
      "order": 10,
      "organisms": [
        {
          "id": "org-low-stock-summary",
          "type": "queryResult",
          "organismName": "LowStockSummaryBanner",
          "titleKey": "organism.stockManagement.listStockItems.title",
          "purpose": "Exibe o número de insumos com saldo no ou abaixo do nível mínimo, permitindo ao gerente avaliar a criticidade do estoque antes de qualquer ação.",
          "userActions": [
            "listStockItems"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "lowStockMustBeVisible"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.stockManagement.listStockItems.list",
              "intent": "queryList",
              "stateKey": "ui.stockManagement.data.listStockItems",
              "action": "listStockItems",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "section.stockManagement.sec-stock-master-detail",
      "type": "section",
      "sectionName": "Controle de insumos",
      "titleKey": "section.stockManagement.sec-stock-master-detail.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org-stock-filter-toolbar",
          "type": "content",
          "organismName": "StockItemFilterToolbar",
          "titleKey": "organism.stockManagement.inline-row-command10.title",
          "purpose": "Barra de filtros embutida na superfície principal: campo de busca por nome e toggle de estoque baixo, mais botão primário 'Novo insumo' que expande o formulário de cadastro.",
          "userActions": [],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.stockManagement.inline-row-command10.content",
              "intent": "inline-row-command",
              "order": 10
            }
          ]
        },
        {
          "id": "org-stock-item-table",
          "type": "queryResult",
          "organismName": "StockItemTable",
          "titleKey": "organism.stockManagement.listStockItems.title",
          "purpose": "Tabela paginada de insumos mostrando nome, unidade, saldo atual e nível mínimo; linhas com saldo crítico são destacadas visualmente. Seleção de linha abre o painel de detalhe/ação.",
          "userActions": [
            "listStockItems"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "lowStockMustBeVisible"
          ],
          "order": 20,
          "intentionRefs": [
            {
              "id": "intent.stockManagement.listStockItems.list2",
              "intent": "queryList",
              "stateKey": "ui.stockManagement.data.listStockItems",
              "action": "listStockItems",
              "order": 10
            }
          ]
        },
        {
          "id": "org-stock-item-detail-panel",
          "type": "commandForm",
          "organismName": "StockItemDetailPanel",
          "titleKey": "organism.stockManagement.editStockItem.title",
          "purpose": "Painel lateral/contextual ativado pela seleção de linha: exibe dados atuais do insumo e agrupa as ações contextuais — editar cadastro, registrar ajuste de saldo e excluir — sem abrir nova página.",
          "userActions": [
            "editStockItem",
            "removeStockItem",
            "registerStockAdjustment"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "lowStockMustBeVisible",
            "managerManualStockAdjustmentAllowed"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "intent.stockManagement.editStockItem.form",
              "intent": "commandForm",
              "submitAction": "editStockItem",
              "order": 10
            },
            {
              "id": "intent.stockManagement.removeStockItem.form",
              "intent": "commandForm",
              "submitAction": "removeStockItem",
              "order": 10
            },
            {
              "id": "intent.stockManagement.registerStockAdjustment.form",
              "intent": "commandForm",
              "submitAction": "registerStockAdjustment",
              "order": 10
            }
          ]
        }
      ]
    },
    {
      "id": "section.stockManagement.sec-add-stock-item",
      "type": "section",
      "sectionName": "Cadastrar novo insumo",
      "titleKey": "section.stockManagement.sec-add-stock-item.title",
      "mode": "edit",
      "order": 30,
      "organisms": [
        {
          "id": "org-add-stock-item-form",
          "type": "commandForm",
          "organismName": "AddStockItemForm",
          "titleKey": "organism.stockManagement.addStockItem.title",
          "purpose": "Formulário colapsável para cadastro de novo insumo (nome, unidade, saldo inicial e nível mínimo obrigatórios; descrição opcional). Visível apenas quando o gerente aciona 'Novo insumo' na toolbar.",
          "userActions": [
            "addStockItem"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "lowStockMustBeVisible"
          ],
          "order": 10,
          "intentionRefs": [
            {
              "id": "intent.stockManagement.addStockItem.form",
              "intent": "commandForm",
              "submitAction": "addStockItem",
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
    "actor": "Gerente de café",
    "jobToBeDone": "Manter o cadastro de insumos atualizado, identificar rapidamente itens com estoque baixo e registrar ajustes manuais de saldo sem sair da tela de controle.",
    "primaryDecision": "Selecionar um insumo da lista para editar, excluir ou registrar um ajuste de saldo — ou cadastrar um novo insumo.",
    "decisiveInfo": [
      "name",
      "unit",
      "currentBalance",
      "minimumLevel",
      "lowStockOnly (flag de alerta)"
    ],
    "usageFrequency": "Ocasional / back-office — o gerente acessa diariamente para revisar alertas e registrar ajustes pontuais.",
    "criticalActions": [
      {
        "action": "listStockItems",
        "presentation": "primary-surface com filtros embutidos (nameFilter + lowStockOnly toggle)"
      },
      {
        "action": "registerStockAdjustment",
        "presentation": "inline-row-command / painel contextual aberto ao selecionar linha"
      },
      {
        "action": "editStockItem",
        "presentation": "inline-row-command / painel contextual no master-detail"
      },
      {
        "action": "removeStockItem",
        "presentation": "inline-row-command com confirmação destrutiva"
      },
      {
        "action": "addStockItem",
        "presentation": "primary-button na toolbar que abre formulário colapsável"
      }
    ],
    "informationHierarchy": [
      "1. Resumo de alertas: total de itens com estoque baixo (summary-first)",
      "2. Lista filtrável de insumos com saldo atual, unidade e indicador de alerta",
      "3. Painel contextual do item selecionado: editar cadastro ou registrar ajuste",
      "4. Formulário de cadastro de novo insumo (colapsável, acionado por toolbar)"
    ],
    "successCriteria": "O gerente identifica itens críticos em menos de 5 segundos, registra um ajuste de saldo em menos de 3 cliques e cadastra um novo insumo sem navegar para outra página.",
    "antiPatterns": [
      "Formulário de ajuste em página separada",
      "Campo stockItemId como input manual",
      "Status como <select> livre",
      "Seção independente para cada operação CRUD",
      "Timestamps e IDs técnicos expostos como campos editáveis"
    ]
  },
  "layout": {
    "id": "page21-goal-first",
    "type": "page",
    "sections": [
      {
        "id": "section.stockManagement.sec-stock-overview",
        "type": "section",
        "sectionName": "Visão geral do estoque",
        "titleKey": "section.stockManagement.sec-stock-overview.title",
        "mode": "view",
        "order": 10,
        "organisms": [
          {
            "id": "org-low-stock-summary",
            "type": "queryResult",
            "organismName": "LowStockSummaryBanner",
            "titleKey": "organism.stockManagement.listStockItems.title",
            "purpose": "Exibe o número de insumos com saldo no ou abaixo do nível mínimo, permitindo ao gerente avaliar a criticidade do estoque antes de qualquer ação.",
            "userActions": [
              "listStockItems"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "lowStockMustBeVisible"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.stockManagement.listStockItems.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.stockManagement.listStockItems.list.title",
                "source": "bff.listStockItems",
                "binding": "binding.stockManagement.listStockItems",
                "action": "listStockItems",
                "emptyKey": "intent.stockManagement.listStockItems.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.stockManagement.listStockItems.list.column.stockItems",
                    "field": "stockItems",
                    "labelKey": "intent.stockManagement.listStockItems.list.column.stockItems.label",
                    "order": 10,
                    "stateKey": "ui.stockManagement.data.listStockItems"
                  },
                  {
                    "id": "intent.stockManagement.listStockItems.list.column.total",
                    "field": "total",
                    "labelKey": "intent.stockManagement.listStockItems.list.column.total.label",
                    "order": 20,
                    "stateKey": "ui.stockManagement.data.listStockItems"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.stockManagement.listStockItems.list.filter.nameFilter",
                    "field": "nameFilter",
                    "labelKey": "intent.stockManagement.listStockItems.list.filter.nameFilter.label",
                    "order": 10,
                    "stateKey": "ui.stockManagement.input.listStockItems.nameFilter"
                  },
                  {
                    "id": "intent.stockManagement.listStockItems.list.filter.lowStockOnly",
                    "field": "lowStockOnly",
                    "labelKey": "intent.stockManagement.listStockItems.list.filter.lowStockOnly.label",
                    "order": 20,
                    "stateKey": "ui.stockManagement.input.listStockItems.lowStockOnly"
                  },
                  {
                    "id": "intent.stockManagement.listStockItems.list.filter.page",
                    "field": "page",
                    "labelKey": "intent.stockManagement.listStockItems.list.filter.page.label",
                    "order": 30,
                    "stateKey": "ui.stockManagement.input.listStockItems.page"
                  },
                  {
                    "id": "intent.stockManagement.listStockItems.list.filter.pageSize",
                    "field": "pageSize",
                    "labelKey": "intent.stockManagement.listStockItems.list.filter.pageSize.label",
                    "order": 40,
                    "stateKey": "ui.stockManagement.input.listStockItems.pageSize"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.stockManagement.data.listStockItems"
              }
            ],
            "displayHint": "summary-first"
          }
        ]
      },
      {
        "id": "section.stockManagement.sec-stock-master-detail",
        "type": "section",
        "sectionName": "Controle de insumos",
        "titleKey": "section.stockManagement.sec-stock-master-detail.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org-stock-filter-toolbar",
            "type": "content",
            "organismName": "StockItemFilterToolbar",
            "titleKey": "organism.stockManagement.inline-row-command10.title",
            "purpose": "Barra de filtros embutida na superfície principal: campo de busca por nome e toggle de estoque baixo, mais botão primário 'Novo insumo' que expande o formulário de cadastro.",
            "userActions": [],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [],
            "order": 10,
            "intentions": [
              {
                "id": "intent.stockManagement.inline-row-command10.content",
                "intent": "inline-row-command",
                "order": 10,
                "titleKey": "intent.stockManagement.inline-row-command10.content.title",
                "displayHint": "inline-row-command",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": []
              }
            ],
            "displayHint": "inline-row-command"
          },
          {
            "id": "org-stock-item-table",
            "type": "queryResult",
            "organismName": "StockItemTable",
            "titleKey": "organism.stockManagement.listStockItems.title",
            "purpose": "Tabela paginada de insumos mostrando nome, unidade, saldo atual e nível mínimo; linhas com saldo crítico são destacadas visualmente. Seleção de linha abre o painel de detalhe/ação.",
            "userActions": [
              "listStockItems"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "lowStockMustBeVisible"
            ],
            "order": 20,
            "intentions": [
              {
                "id": "intent.stockManagement.listStockItems.list2",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.stockManagement.listStockItems.list.title",
                "source": "bff.listStockItems",
                "binding": "binding.stockManagement.listStockItems",
                "action": "listStockItems",
                "emptyKey": "intent.stockManagement.listStockItems.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.stockManagement.listStockItems.list.column.stockItems",
                    "field": "stockItems",
                    "labelKey": "intent.stockManagement.listStockItems.list.column.stockItems.label",
                    "order": 10,
                    "stateKey": "ui.stockManagement.data.listStockItems"
                  },
                  {
                    "id": "intent.stockManagement.listStockItems.list.column.total",
                    "field": "total",
                    "labelKey": "intent.stockManagement.listStockItems.list.column.total.label",
                    "order": 20,
                    "stateKey": "ui.stockManagement.data.listStockItems"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.stockManagement.listStockItems.list.filter.nameFilter",
                    "field": "nameFilter",
                    "labelKey": "intent.stockManagement.listStockItems.list.filter.nameFilter.label",
                    "order": 10,
                    "stateKey": "ui.stockManagement.input.listStockItems.nameFilter"
                  },
                  {
                    "id": "intent.stockManagement.listStockItems.list.filter.lowStockOnly",
                    "field": "lowStockOnly",
                    "labelKey": "intent.stockManagement.listStockItems.list.filter.lowStockOnly.label",
                    "order": 20,
                    "stateKey": "ui.stockManagement.input.listStockItems.lowStockOnly"
                  },
                  {
                    "id": "intent.stockManagement.listStockItems.list.filter.page",
                    "field": "page",
                    "labelKey": "intent.stockManagement.listStockItems.list.filter.page.label",
                    "order": 30,
                    "stateKey": "ui.stockManagement.input.listStockItems.page"
                  },
                  {
                    "id": "intent.stockManagement.listStockItems.list.filter.pageSize",
                    "field": "pageSize",
                    "labelKey": "intent.stockManagement.listStockItems.list.filter.pageSize.label",
                    "order": 40,
                    "stateKey": "ui.stockManagement.input.listStockItems.pageSize"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.stockManagement.data.listStockItems"
              }
            ],
            "displayHint": "master-detail"
          },
          {
            "id": "org-stock-item-detail-panel",
            "type": "commandForm",
            "organismName": "StockItemDetailPanel",
            "titleKey": "organism.stockManagement.editStockItem.title",
            "purpose": "Painel lateral/contextual ativado pela seleção de linha: exibe dados atuais do insumo e agrupa as ações contextuais — editar cadastro, registrar ajuste de saldo e excluir — sem abrir nova página.",
            "userActions": [
              "editStockItem",
              "removeStockItem",
              "registerStockAdjustment"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "lowStockMustBeVisible",
              "managerManualStockAdjustmentAllowed"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "intent.stockManagement.editStockItem.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.stockManagement.editStockItem.form.title",
                "source": "bff.editStockItem",
                "binding": "binding.stockManagement.editStockItem",
                "submitAction": "editStockItem",
                "fields": [
                  {
                    "id": "intent.stockManagement.editStockItem.form.field.name",
                    "field": "name",
                    "labelKey": "intent.stockManagement.editStockItem.form.field.name.label",
                    "order": 10,
                    "stateKey": "ui.stockManagement.input.editStockItem.name"
                  },
                  {
                    "id": "intent.stockManagement.editStockItem.form.field.unit",
                    "field": "unit",
                    "labelKey": "intent.stockManagement.editStockItem.form.field.unit.label",
                    "order": 20,
                    "stateKey": "ui.stockManagement.input.editStockItem.unit"
                  },
                  {
                    "id": "intent.stockManagement.editStockItem.form.field.minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "intent.stockManagement.editStockItem.form.field.minimumLevel.label",
                    "order": 30,
                    "stateKey": "ui.stockManagement.input.editStockItem.minimumLevel"
                  },
                  {
                    "id": "intent.stockManagement.editStockItem.form.field.description",
                    "field": "description",
                    "labelKey": "intent.stockManagement.editStockItem.form.field.description.label",
                    "order": 40,
                    "stateKey": "ui.stockManagement.input.editStockItem.description"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.stockManagement.editStockItem.form.action.editStockItem",
                    "action": "editStockItem",
                    "labelKey": "intent.stockManagement.editStockItem.form.action.editStockItem",
                    "order": 10,
                    "actionKey": "editStockItem"
                  }
                ]
              },
              {
                "id": "intent.stockManagement.removeStockItem.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.stockManagement.removeStockItem.form.title",
                "source": "bff.removeStockItem",
                "binding": "binding.stockManagement.removeStockItem",
                "submitAction": "removeStockItem",
                "fields": [],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.stockManagement.removeStockItem.form.action.removeStockItem",
                    "action": "removeStockItem",
                    "labelKey": "intent.stockManagement.removeStockItem.form.action.removeStockItem",
                    "order": 10,
                    "actionKey": "removeStockItem"
                  }
                ]
              },
              {
                "id": "intent.stockManagement.registerStockAdjustment.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.stockManagement.registerStockAdjustment.form.title",
                "source": "bff.registerStockAdjustment",
                "binding": "binding.stockManagement.registerStockAdjustment",
                "submitAction": "registerStockAdjustment",
                "fields": [
                  {
                    "id": "intent.stockManagement.registerStockAdjustment.form.field.stockItemId",
                    "field": "stockItemId",
                    "labelKey": "intent.stockManagement.registerStockAdjustment.form.field.stockItemId.label",
                    "order": 10,
                    "stateKey": "ui.stockManagement.input.registerStockAdjustment.stockItemId"
                  },
                  {
                    "id": "intent.stockManagement.registerStockAdjustment.form.field.quantity",
                    "field": "quantity",
                    "labelKey": "intent.stockManagement.registerStockAdjustment.form.field.quantity.label",
                    "order": 20,
                    "stateKey": "ui.stockManagement.input.registerStockAdjustment.quantity"
                  },
                  {
                    "id": "intent.stockManagement.registerStockAdjustment.form.field.direction",
                    "field": "direction",
                    "labelKey": "intent.stockManagement.registerStockAdjustment.form.field.direction.label",
                    "order": 30,
                    "stateKey": "ui.stockManagement.input.registerStockAdjustment.direction"
                  },
                  {
                    "id": "intent.stockManagement.registerStockAdjustment.form.field.reason",
                    "field": "reason",
                    "labelKey": "intent.stockManagement.registerStockAdjustment.form.field.reason.label",
                    "order": 40,
                    "stateKey": "ui.stockManagement.input.registerStockAdjustment.reason"
                  },
                  {
                    "id": "intent.stockManagement.registerStockAdjustment.form.field.notes",
                    "field": "notes",
                    "labelKey": "intent.stockManagement.registerStockAdjustment.form.field.notes.label",
                    "order": 50,
                    "stateKey": "ui.stockManagement.input.registerStockAdjustment.notes"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.stockManagement.registerStockAdjustment.form.action.registerStockAdjustment",
                    "action": "registerStockAdjustment",
                    "labelKey": "intent.stockManagement.registerStockAdjustment.form.action.registerStockAdjustment",
                    "order": 10,
                    "actionKey": "registerStockAdjustment"
                  }
                ]
              }
            ],
            "displayHint": "master-detail"
          }
        ]
      },
      {
        "id": "section.stockManagement.sec-add-stock-item",
        "type": "section",
        "sectionName": "Cadastrar novo insumo",
        "titleKey": "section.stockManagement.sec-add-stock-item.title",
        "mode": "edit",
        "order": 30,
        "organisms": [
          {
            "id": "org-add-stock-item-form",
            "type": "commandForm",
            "organismName": "AddStockItemForm",
            "titleKey": "organism.stockManagement.addStockItem.title",
            "purpose": "Formulário colapsável para cadastro de novo insumo (nome, unidade, saldo inicial e nível mínimo obrigatórios; descrição opcional). Visível apenas quando o gerente aciona 'Novo insumo' na toolbar.",
            "userActions": [
              "addStockItem"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "lowStockMustBeVisible"
            ],
            "order": 10,
            "intentions": [
              {
                "id": "intent.stockManagement.addStockItem.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.stockManagement.addStockItem.form.title",
                "source": "bff.addStockItem",
                "binding": "binding.stockManagement.addStockItem",
                "submitAction": "addStockItem",
                "fields": [
                  {
                    "id": "intent.stockManagement.addStockItem.form.field.name",
                    "field": "name",
                    "labelKey": "intent.stockManagement.addStockItem.form.field.name.label",
                    "order": 10,
                    "stateKey": "ui.stockManagement.input.addStockItem.name"
                  },
                  {
                    "id": "intent.stockManagement.addStockItem.form.field.unit",
                    "field": "unit",
                    "labelKey": "intent.stockManagement.addStockItem.form.field.unit.label",
                    "order": 20,
                    "stateKey": "ui.stockManagement.input.addStockItem.unit"
                  },
                  {
                    "id": "intent.stockManagement.addStockItem.form.field.currentBalance",
                    "field": "currentBalance",
                    "labelKey": "intent.stockManagement.addStockItem.form.field.currentBalance.label",
                    "order": 30,
                    "stateKey": "ui.stockManagement.input.addStockItem.currentBalance"
                  },
                  {
                    "id": "intent.stockManagement.addStockItem.form.field.minimumLevel",
                    "field": "minimumLevel",
                    "labelKey": "intent.stockManagement.addStockItem.form.field.minimumLevel.label",
                    "order": 40,
                    "stateKey": "ui.stockManagement.input.addStockItem.minimumLevel"
                  },
                  {
                    "id": "intent.stockManagement.addStockItem.form.field.description",
                    "field": "description",
                    "labelKey": "intent.stockManagement.addStockItem.form.field.description.label",
                    "order": 50,
                    "stateKey": "ui.stockManagement.input.addStockItem.description"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.stockManagement.addStockItem.form.action.addStockItem",
                    "action": "addStockItem",
                    "labelKey": "intent.stockManagement.addStockItem.form.action.addStockItem",
                    "order": 10,
                    "actionKey": "addStockItem"
                  }
                ]
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
      "id": "binding.stockManagement.listStockItems",
      "source": "bff.listStockItems",
      "command": "listStockItems",
      "description": "Listar itens de estoque",
      "stateKey": "ui.stockManagement.data.listStockItems",
      "inputStateKeys": [
        "ui.stockManagement.input.listStockItems.nameFilter",
        "ui.stockManagement.input.listStockItems.lowStockOnly",
        "ui.stockManagement.input.listStockItems.page",
        "ui.stockManagement.input.listStockItems.pageSize"
      ]
    },
    {
      "id": "binding.stockManagement.addStockItem",
      "source": "bff.addStockItem",
      "command": "addStockItem",
      "description": "Criar item de estoque",
      "stateKey": "ui.stockManagement.output.addStockItem",
      "inputStateKeys": [
        "ui.stockManagement.input.addStockItem.name",
        "ui.stockManagement.input.addStockItem.unit",
        "ui.stockManagement.input.addStockItem.currentBalance",
        "ui.stockManagement.input.addStockItem.minimumLevel",
        "ui.stockManagement.input.addStockItem.description"
      ]
    },
    {
      "id": "binding.stockManagement.editStockItem",
      "source": "bff.editStockItem",
      "command": "editStockItem",
      "description": "Atualizar item de estoque",
      "stateKey": "ui.stockManagement.output.editStockItem",
      "inputStateKeys": [
        "ui.stockManagement.input.editStockItem.stockItemId",
        "ui.stockManagement.input.editStockItem.name",
        "ui.stockManagement.input.editStockItem.unit",
        "ui.stockManagement.input.editStockItem.minimumLevel",
        "ui.stockManagement.input.editStockItem.description"
      ]
    },
    {
      "id": "binding.stockManagement.removeStockItem",
      "source": "bff.removeStockItem",
      "command": "removeStockItem",
      "description": "Excluir item de estoque",
      "stateKey": "ui.stockManagement.output.removeStockItem",
      "inputStateKeys": [
        "ui.stockManagement.input.removeStockItem.stockItemId"
      ]
    },
    {
      "id": "binding.stockManagement.registerStockAdjustment",
      "source": "bff.registerStockAdjustment",
      "command": "registerStockAdjustment",
      "description": "Registrar ajuste manual de estoque",
      "stateKey": "ui.stockManagement.output.registerStockAdjustment",
      "inputStateKeys": [
        "ui.stockManagement.input.registerStockAdjustment.stockItemId",
        "ui.stockManagement.input.registerStockAdjustment.quantity",
        "ui.stockManagement.input.registerStockAdjustment.direction",
        "ui.stockManagement.input.registerStockAdjustment.reason",
        "ui.stockManagement.input.registerStockAdjustment.notes"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "stockManagement__page21__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/stockManagement.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "stockManagement__l2_shared"
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
