/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.defs.ts" enhancement="_blank"/>

export const definition = {
  "pageId": "menuManagement",
  "pageName": "Gerenciar cardápio",
  "baseClassName": "CafeFlowMenuManagementBase",
  "actor": "gerente",
  "purpose": "Executar Gerenciar cardápio.",
  "capabilities": [
    "browseMenuItems",
    "createMenuItem",
    "updateMenuItem"
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
    "workspaceId": "menuManagement",
    "workspaceKind": "entityManagement",
    "actor": "gerente",
    "entity": "MenuItem",
    "owners": [
      {
        "kind": "operation",
        "id": "browseMenuItems",
        "defPath": "_102051_/l4/cafeFlow/operations/browseMenuItems.defs.ts"
      },
      {
        "kind": "operation",
        "id": "createMenuItem",
        "defPath": "_102051_/l4/cafeFlow/operations/createMenuItem.defs.ts"
      },
      {
        "kind": "operation",
        "id": "updateMenuItem",
        "defPath": "_102051_/l4/cafeFlow/operations/updateMenuItem.defs.ts"
      }
    ],
    "microUserFlow": {
      "source": "l4/story.steps",
      "workflowSteps": [],
      "operations": [
        {
          "operationId": "browseMenuItems",
          "commandName": "browseMenuItems",
          "steps": [
            "Abrir a listagem de itens do cardápio",
            "Filtrar por categoria e status quando necessário",
            "Revisar nome, preço, categoria, status e ordem de exibição de cada item",
            "Selecionar um item para editar, vincular ingredientes ou alterar disponibilidade"
          ]
        },
        {
          "operationId": "createMenuItem",
          "commandName": "createMenuItem",
          "steps": [
            "O gerente informa nome, categoria, preço e demais dados do item",
            "O sistema valida categoria e preço obrigatórios",
            "O sistema gera o identificador e grava o item com status inicial adequado",
            "O item fica disponível para vínculo de ingredientes e uso no PDV conforme o status"
          ]
        },
        {
          "operationId": "updateMenuItem",
          "commandName": "updateMenuItem",
          "steps": [
            "O gerente abre o item do cardápio já cadastrado",
            "Altera nome, categoria, preço, descrição, imagem, ordem de exibição, vínculo de estoque ou status (ativo/pausado)",
            "Confirma a gravação das alterações"
          ]
        }
      ]
    }
  },
  "pageInputs": [],
  "navigationRefs": [],
  "sections": [
    {
      "id": "section.menuManagement.menuItemList",
      "type": "section",
      "sectionName": "Menu Item List",
      "titleKey": "section.menuManagement.menuItemList.title",
      "mode": "edit",
      "order": 10,
      "organisms": [
        {
          "id": "menuItemFilterBar",
          "type": "queryResult",
          "organismName": "MenuItemFilterBar",
          "titleKey": "organism.menuManagement.listMenuItems.title",
          "purpose": "Allows the manager to filter the menu item table by category, status and name before scanning results.",
          "userActions": [
            "listMenuItems"
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
              "id": "intent.menuManagement.listMenuItems.list",
              "intent": "queryList",
              "stateKey": "ui.menuManagement.data.listMenuItems",
              "action": "listMenuItems",
              "order": 10
            }
          ]
        },
        {
          "id": "menuItemTable",
          "type": "queryResult",
          "organismName": "MenuItemTable",
          "titleKey": "organism.menuManagement.listMenuItems.title",
          "purpose": "Primary surface showing all menu items in a paginated table so the manager can scan name, category, price, status and display order at a glance.",
          "userActions": [
            "listMenuItems"
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
              "id": "intent.menuManagement.listMenuItems.list2",
              "intent": "queryList",
              "stateKey": "ui.menuManagement.data.listMenuItems",
              "action": "listMenuItems",
              "order": 10
            }
          ]
        },
        {
          "id": "menuItemCreateForm",
          "type": "commandForm",
          "organismName": "MenuItemCreateForm",
          "titleKey": "organism.menuManagement.createMenuItemCmd.title",
          "purpose": "Form revealed from the toolbar Add button so the manager can fill in name, category, price and optional details to create a new menu item.",
          "userActions": [
            "createMenuItemCmd"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "menuItemNeedsCategoryAndPrice",
            "onlyActiveMenuItemsCanBeOrdered"
          ],
          "order": 30,
          "intentionRefs": [
            {
              "id": "intent.menuManagement.createMenuItemCmd.form",
              "intent": "commandForm",
              "submitAction": "createMenuItemCmd",
              "order": 10
            }
          ]
        },
        {
          "id": "menuItemEditForm",
          "type": "commandForm",
          "organismName": "MenuItemEditForm",
          "titleKey": "organism.menuManagement.updateMenuItemCmd.title",
          "purpose": "Inline or slide-over form pre-populated from the selected row so the manager can update name, category, price, status, pause reason, image, display order and stock link.",
          "userActions": [
            "updateMenuItemCmd"
          ],
          "requiredEntities": [],
          "readsFields": [],
          "writesFields": [],
          "rulesApplied": [
            "onlyActiveMenuItemsCanBeOrdered",
            "menuItemNeedsCategoryAndPrice"
          ],
          "order": 40,
          "intentionRefs": [
            {
              "id": "intent.menuManagement.updateMenuItemCmd.form",
              "intent": "commandForm",
              "submitAction": "updateMenuItemCmd",
              "order": 10
            }
          ]
        }
      ]
    }
  ],
  "templateId": "tabular_classic",
  "visualStyle": "POS-first, high-contrast, touch-friendly, status-driven UI",
  "layout": {
    "id": "tabular_classic",
    "type": "page",
    "sections": [
      {
        "id": "section.menuManagement.menuItemList",
        "type": "section",
        "sectionName": "Menu Item List",
        "titleKey": "section.menuManagement.menuItemList.title",
        "mode": "edit",
        "order": 10,
        "organisms": [
          {
            "id": "menuItemFilterBar",
            "type": "queryResult",
            "organismName": "MenuItemFilterBar",
            "titleKey": "organism.menuManagement.listMenuItems.title",
            "purpose": "Allows the manager to filter the menu item table by category, status and name before scanning results.",
            "userActions": [
              "listMenuItems"
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
                "id": "intent.menuManagement.listMenuItems.list",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.menuManagement.listMenuItems.list.title",
                "source": "bff.listMenuItems",
                "binding": "binding.menuManagement.listMenuItems",
                "action": "listMenuItems",
                "emptyKey": "intent.menuManagement.listMenuItems.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.menuManagement.listMenuItems.list.column.menuItems",
                    "field": "menuItems",
                    "labelKey": "intent.menuManagement.listMenuItems.list.column.menuItems.label",
                    "order": 10,
                    "stateKey": "ui.menuManagement.data.listMenuItems"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.column.total",
                    "field": "total",
                    "labelKey": "intent.menuManagement.listMenuItems.list.column.total.label",
                    "order": 20,
                    "stateKey": "ui.menuManagement.data.listMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.status",
                    "field": "status",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.status.label",
                    "order": 10,
                    "stateKey": "ui.menuManagement.input.listMenuItems.status"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.menuCategoryId.label",
                    "order": 20,
                    "stateKey": "ui.menuManagement.input.listMenuItems.menuCategoryId"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.name",
                    "field": "name",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.name.label",
                    "order": 30,
                    "stateKey": "ui.menuManagement.input.listMenuItems.name"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.page",
                    "field": "page",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.page.label",
                    "order": 40,
                    "stateKey": "ui.menuManagement.input.listMenuItems.page"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.pageSize",
                    "field": "pageSize",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.pageSize.label",
                    "order": 50,
                    "stateKey": "ui.menuManagement.input.listMenuItems.pageSize"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.menuManagement.data.listMenuItems"
              }
            ],
            "displayHint": "form"
          },
          {
            "id": "menuItemTable",
            "type": "queryResult",
            "organismName": "MenuItemTable",
            "titleKey": "organism.menuManagement.listMenuItems.title",
            "purpose": "Primary surface showing all menu items in a paginated table so the manager can scan name, category, price, status and display order at a glance.",
            "userActions": [
              "listMenuItems"
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
                "id": "intent.menuManagement.listMenuItems.list2",
                "intent": "queryList",
                "order": 10,
                "titleKey": "intent.menuManagement.listMenuItems.list.title",
                "source": "bff.listMenuItems",
                "binding": "binding.menuManagement.listMenuItems",
                "action": "listMenuItems",
                "emptyKey": "intent.menuManagement.listMenuItems.list.empty",
                "fields": [],
                "columns": [
                  {
                    "id": "intent.menuManagement.listMenuItems.list.column.menuItems",
                    "field": "menuItems",
                    "labelKey": "intent.menuManagement.listMenuItems.list.column.menuItems.label",
                    "order": 10,
                    "stateKey": "ui.menuManagement.data.listMenuItems"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.column.total",
                    "field": "total",
                    "labelKey": "intent.menuManagement.listMenuItems.list.column.total.label",
                    "order": 20,
                    "stateKey": "ui.menuManagement.data.listMenuItems"
                  }
                ],
                "filters": [
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.status",
                    "field": "status",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.status.label",
                    "order": 10,
                    "stateKey": "ui.menuManagement.input.listMenuItems.status"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.menuCategoryId.label",
                    "order": 20,
                    "stateKey": "ui.menuManagement.input.listMenuItems.menuCategoryId"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.name",
                    "field": "name",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.name.label",
                    "order": 30,
                    "stateKey": "ui.menuManagement.input.listMenuItems.name"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.page",
                    "field": "page",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.page.label",
                    "order": 40,
                    "stateKey": "ui.menuManagement.input.listMenuItems.page"
                  },
                  {
                    "id": "intent.menuManagement.listMenuItems.list.filter.pageSize",
                    "field": "pageSize",
                    "labelKey": "intent.menuManagement.listMenuItems.list.filter.pageSize.label",
                    "order": 50,
                    "stateKey": "ui.menuManagement.input.listMenuItems.pageSize"
                  }
                ],
                "toolbar": [],
                "rowActions": [],
                "actions": [],
                "stateKey": "ui.menuManagement.data.listMenuItems"
              }
            ],
            "displayHint": "master-detail"
          },
          {
            "id": "menuItemCreateForm",
            "type": "commandForm",
            "organismName": "MenuItemCreateForm",
            "titleKey": "organism.menuManagement.createMenuItemCmd.title",
            "purpose": "Form revealed from the toolbar Add button so the manager can fill in name, category, price and optional details to create a new menu item.",
            "userActions": [
              "createMenuItemCmd"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "menuItemNeedsCategoryAndPrice",
              "onlyActiveMenuItemsCanBeOrdered"
            ],
            "order": 30,
            "intentions": [
              {
                "id": "intent.menuManagement.createMenuItemCmd.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.menuManagement.createMenuItemCmd.form.title",
                "source": "bff.createMenuItemCmd",
                "binding": "binding.menuManagement.createMenuItemCmd",
                "submitAction": "createMenuItemCmd",
                "fields": [
                  {
                    "id": "intent.menuManagement.createMenuItemCmd.form.field.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "intent.menuManagement.createMenuItemCmd.form.field.menuCategoryId.label",
                    "order": 10,
                    "stateKey": "ui.menuManagement.input.createMenuItemCmd.menuCategoryId"
                  },
                  {
                    "id": "intent.menuManagement.createMenuItemCmd.form.field.name",
                    "field": "name",
                    "labelKey": "intent.menuManagement.createMenuItemCmd.form.field.name.label",
                    "order": 20,
                    "stateKey": "ui.menuManagement.input.createMenuItemCmd.name"
                  },
                  {
                    "id": "intent.menuManagement.createMenuItemCmd.form.field.description",
                    "field": "description",
                    "labelKey": "intent.menuManagement.createMenuItemCmd.form.field.description.label",
                    "order": 30,
                    "stateKey": "ui.menuManagement.input.createMenuItemCmd.description"
                  },
                  {
                    "id": "intent.menuManagement.createMenuItemCmd.form.field.price",
                    "field": "price",
                    "labelKey": "intent.menuManagement.createMenuItemCmd.form.field.price.label",
                    "order": 40,
                    "stateKey": "ui.menuManagement.input.createMenuItemCmd.price"
                  },
                  {
                    "id": "intent.menuManagement.createMenuItemCmd.form.field.status",
                    "field": "status",
                    "labelKey": "intent.menuManagement.createMenuItemCmd.form.field.status.label",
                    "order": 50,
                    "stateKey": "ui.menuManagement.input.createMenuItemCmd.status"
                  },
                  {
                    "id": "intent.menuManagement.createMenuItemCmd.form.field.imageUrl",
                    "field": "imageUrl",
                    "labelKey": "intent.menuManagement.createMenuItemCmd.form.field.imageUrl.label",
                    "order": 60,
                    "stateKey": "ui.menuManagement.input.createMenuItemCmd.imageUrl"
                  },
                  {
                    "id": "intent.menuManagement.createMenuItemCmd.form.field.displayOrder",
                    "field": "displayOrder",
                    "labelKey": "intent.menuManagement.createMenuItemCmd.form.field.displayOrder.label",
                    "order": 70,
                    "stateKey": "ui.menuManagement.input.createMenuItemCmd.displayOrder"
                  },
                  {
                    "id": "intent.menuManagement.createMenuItemCmd.form.field.requiresStockLink",
                    "field": "requiresStockLink",
                    "labelKey": "intent.menuManagement.createMenuItemCmd.form.field.requiresStockLink.label",
                    "order": 80,
                    "stateKey": "ui.menuManagement.input.createMenuItemCmd.requiresStockLink"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.menuManagement.createMenuItemCmd.form.action.createMenuItemCmd",
                    "action": "createMenuItemCmd",
                    "labelKey": "intent.menuManagement.createMenuItemCmd.form.action.createMenuItemCmd",
                    "order": 10,
                    "actionKey": "createMenuItemCmd"
                  }
                ]
              }
            ],
            "displayHint": "form"
          },
          {
            "id": "menuItemEditForm",
            "type": "commandForm",
            "organismName": "MenuItemEditForm",
            "titleKey": "organism.menuManagement.updateMenuItemCmd.title",
            "purpose": "Inline or slide-over form pre-populated from the selected row so the manager can update name, category, price, status, pause reason, image, display order and stock link.",
            "userActions": [
              "updateMenuItemCmd"
            ],
            "requiredEntities": [],
            "readsFields": [],
            "writesFields": [],
            "rulesApplied": [
              "onlyActiveMenuItemsCanBeOrdered",
              "menuItemNeedsCategoryAndPrice"
            ],
            "order": 40,
            "intentions": [
              {
                "id": "intent.menuManagement.updateMenuItemCmd.form",
                "intent": "commandForm",
                "order": 10,
                "titleKey": "intent.menuManagement.updateMenuItemCmd.form.title",
                "source": "bff.updateMenuItemCmd",
                "binding": "binding.menuManagement.updateMenuItemCmd",
                "submitAction": "updateMenuItemCmd",
                "fields": [
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId",
                    "field": "menuCategoryId",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label",
                    "order": 10,
                    "stateKey": "ui.menuManagement.input.updateMenuItemCmd.menuCategoryId"
                  },
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.field.name",
                    "field": "name",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.field.name.label",
                    "order": 20,
                    "stateKey": "ui.menuManagement.input.updateMenuItemCmd.name"
                  },
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.field.description",
                    "field": "description",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.field.description.label",
                    "order": 30,
                    "stateKey": "ui.menuManagement.input.updateMenuItemCmd.description"
                  },
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.field.price",
                    "field": "price",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.field.price.label",
                    "order": 40,
                    "stateKey": "ui.menuManagement.input.updateMenuItemCmd.price"
                  },
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.field.status",
                    "field": "status",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.field.status.label",
                    "order": 50,
                    "stateKey": "ui.menuManagement.input.updateMenuItemCmd.status"
                  },
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.field.pauseReason",
                    "field": "pauseReason",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.field.pauseReason.label",
                    "order": 60,
                    "stateKey": "ui.menuManagement.input.updateMenuItemCmd.pauseReason"
                  },
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.field.imageUrl",
                    "field": "imageUrl",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.field.imageUrl.label",
                    "order": 70,
                    "stateKey": "ui.menuManagement.input.updateMenuItemCmd.imageUrl"
                  },
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.field.displayOrder",
                    "field": "displayOrder",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label",
                    "order": 80,
                    "stateKey": "ui.menuManagement.input.updateMenuItemCmd.displayOrder"
                  },
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.field.requiresStockLink",
                    "field": "requiresStockLink",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.field.requiresStockLink.label",
                    "order": 90,
                    "stateKey": "ui.menuManagement.input.updateMenuItemCmd.requiresStockLink"
                  }
                ],
                "columns": [],
                "filters": [],
                "toolbar": [],
                "rowActions": [],
                "actions": [
                  {
                    "id": "intent.menuManagement.updateMenuItemCmd.form.action.updateMenuItemCmd",
                    "action": "updateMenuItemCmd",
                    "labelKey": "intent.menuManagement.updateMenuItemCmd.form.action.updateMenuItemCmd",
                    "order": 10,
                    "actionKey": "updateMenuItemCmd"
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
      "id": "binding.menuManagement.listMenuItems",
      "source": "bff.listMenuItems",
      "command": "listMenuItems",
      "description": "Listar itens do cardápio",
      "stateKey": "ui.menuManagement.data.listMenuItems",
      "inputStateKeys": [
        "ui.menuManagement.input.listMenuItems.status",
        "ui.menuManagement.input.listMenuItems.menuCategoryId",
        "ui.menuManagement.input.listMenuItems.name",
        "ui.menuManagement.input.listMenuItems.page",
        "ui.menuManagement.input.listMenuItems.pageSize"
      ]
    },
    {
      "id": "binding.menuManagement.createMenuItemCmd",
      "source": "bff.createMenuItemCmd",
      "command": "createMenuItemCmd",
      "description": "Criar item do cardápio",
      "stateKey": "ui.menuManagement.output.createMenuItemCmd",
      "inputStateKeys": [
        "ui.menuManagement.input.createMenuItemCmd.menuCategoryId",
        "ui.menuManagement.input.createMenuItemCmd.name",
        "ui.menuManagement.input.createMenuItemCmd.description",
        "ui.menuManagement.input.createMenuItemCmd.price",
        "ui.menuManagement.input.createMenuItemCmd.status",
        "ui.menuManagement.input.createMenuItemCmd.imageUrl",
        "ui.menuManagement.input.createMenuItemCmd.displayOrder",
        "ui.menuManagement.input.createMenuItemCmd.requiresStockLink"
      ]
    },
    {
      "id": "binding.menuManagement.updateMenuItemCmd",
      "source": "bff.updateMenuItemCmd",
      "command": "updateMenuItemCmd",
      "description": "Atualizar item do cardápio",
      "stateKey": "ui.menuManagement.output.updateMenuItemCmd",
      "inputStateKeys": [
        "ui.menuManagement.input.updateMenuItemCmd.menuItemId",
        "ui.menuManagement.input.updateMenuItemCmd.menuCategoryId",
        "ui.menuManagement.input.updateMenuItemCmd.name",
        "ui.menuManagement.input.updateMenuItemCmd.description",
        "ui.menuManagement.input.updateMenuItemCmd.price",
        "ui.menuManagement.input.updateMenuItemCmd.status",
        "ui.menuManagement.input.updateMenuItemCmd.pauseReason",
        "ui.menuManagement.input.updateMenuItemCmd.imageUrl",
        "ui.menuManagement.input.updateMenuItemCmd.displayOrder",
        "ui.menuManagement.input.updateMenuItemCmd.requiresStockLink"
      ]
    }
  ]
};

export const pipeline = [
  {
    "id": "menuManagement__l2_page",
    "type": "l2_page",
    "outputPath": "_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.ts",
    "defPath": "_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.defs.ts",
    "dependsFiles": [
      "_102051_/l2/cafeFlow/web/shared/menuManagement.ts",
      "_102051_/l2/designSystem.ts"
    ],
    "dependsOn": [
      "menuManagement__l2_shared"
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
