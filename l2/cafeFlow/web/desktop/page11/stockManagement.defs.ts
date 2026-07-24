/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.defs.ts" enhancement="_blank"/>

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
      "id": "section.stockManagement.sec-stockItemList",
      "type": "section",
      "sectionName": "Stock Item List",
      "titleKey": "section.stockManagement.sec-stockItemList.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "org-stockItemFilter",
          "type": "content",
          "organismName": "StockItemFilterBar",
          "titleKey": "organism.stockManagement.inline-row-command10.title",
          "purpose": "Allows the manager to filter the stock list by item name or toggle to show only low-stock items, so the most critical items surface immediately.",
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
          "id": "org-stockItemBoard",
          "type": "queryResult",
          "organismName": "StockItemBoard",
          "titleKey": "organism.stockManagement.listStockItems.title",
          "purpose": "Displays the paginated list of stock items with current balance, unit and minimum level, highlighting low-stock items so the manager can quickly identify what needs attention.",
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
              "id": "intent.stockManagement.listStockItems.list",
              "intent": "queryList",
              "stateKey": "ui.stockManagement.data.listStockItems",
              "action": "listStockItems",
              "order": 10
            }
          ]
        },
        {
          "id": "org-stockItemRowActions",
          "type": "commandForm",
          "organismName": "StockItemRowActions",
          "titleKey": "organism.stockManagement.editStockItem.title",
          "purpose": "Surfaces per-row edit, remove and stock-adjustment commands so the manager can act on a selected item without leaving the list.",
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
      "id": "section.stockManagement.sec-createStockItem",
      "type": "section",
      "sectionName": "Add New Stock Item",
      "titleKey": "section.stockManagement.sec-createStockItem.title",
      "mode": "edit",
      "order": 20,
      "organisms": [
        {
          "id": "org-addStockItemForm",
          "type": "commandForm",
          "organismName": "AddStockItemForm",
          "titleKey": "organism.stockManagement.addStockItem.title",
          "purpose": "Lets the manager register a new stock item by entering name, unit, initial balance, minimum level and optional description, then confirm creation.",
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
  "templateId": "pos_workspace",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI",
  "layout": {
    "id": "cfe-20260723170708.1000",
    "type": "page",
    "sections": [
      {
        "id": "section.stockManagement.sec-stockItemList",
        "type": "section",
        "sectionName": "Stock Item List",
        "titleKey": "section.stockManagement.sec-stockItemList.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "org-stockItemFilter",
            "type": "content",
            "organismName": "StockItemFilterBar",
            "titleKey": "organism.stockManagement.inline-row-command10.title",
            "purpose": "Allows the manager to filter the stock list by item name or toggle to show only low-stock items, so the most critical items surface immediately.",
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
            "id": "org-stockItemBoard",
            "type": "queryResult",
            "organismName": "StockItemBoard",
            "titleKey": "organism.stockManagement.listStockItems.title",
            "purpose": "Displays the paginated list of stock items with current balance, unit and minimum level, highlighting low-stock items so the manager can quickly identify what needs attention.",
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
            "displayHint": "master-detail"
          },
          {
            "id": "org-stockItemRowActions",
            "type": "commandForm",
            "organismName": "StockItemRowActions",
            "titleKey": "organism.stockManagement.editStockItem.title",
            "purpose": "Surfaces per-row edit, remove and stock-adjustment commands so the manager can act on a selected item without leaving the list.",
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
            "displayHint": "contextual-transition-actions"
          }
        ]
      },
      {
        "id": "section.stockManagement.sec-createStockItem",
        "type": "section",
        "sectionName": "Add New Stock Item",
        "titleKey": "section.stockManagement.sec-createStockItem.title",
        "mode": "edit",
        "order": 20,
        "organisms": [
          {
            "id": "org-addStockItemForm",
            "type": "commandForm",
            "organismName": "AddStockItemForm",
            "titleKey": "organism.stockManagement.addStockItem.title",
            "purpose": "Lets the manager register a new stock item by entering name, unit, initial balance, minimum level and optional description, then confirm creation.",
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
            "displayHint": "form"
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
    "id": "stockManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/stockManagement.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "stockManagement__l2_shared"
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
