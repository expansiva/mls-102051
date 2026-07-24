/// <mls fileReference="_102051_/l4/cafeFlow/operations/createStockItem.defs.ts" enhancement="_blank"/>

export const operationCreateStockItem = {
  "operationId": "createStockItem",
  "title": "Criar item de estoque",
  "actors": [
    "gerente"
  ],
  "entity": "StockItem",
  "kind": "create",
  "reads": [],
  "writes": [
    "StockItem"
  ],
  "rulesApplied": [
    "lowStockMustBeVisible"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Cadastrar um novo insumo no estoque da cafeteria com saldo inicial e nível mínimo de alerta",
    "steps": [
      "Informar nome, unidade de medida, saldo inicial e nível mínimo do insumo",
      "Opcionalmente informar descrição complementar",
      "Confirmar o cadastro do item de estoque"
    ],
    "outcome": "Item de estoque criado com saldo atualizado e pronto para alertas de estoque baixo"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Formulário de cadastro de novo item de estoque com dados do insumo e saldo inicial",
    "entity": "StockItem",
    "keyField": "StockItem.stockItemId",
    "pagination": "none",
    "selection": "none",
    "output": [
      "StockItem.stockItemId",
      "StockItem.name",
      "StockItem.unit",
      "StockItem.currentBalance",
      "StockItem.minimumLevel",
      "StockItem.description",
      "StockItem.createdAt",
      "StockItem.updatedAt"
    ]
  },
  "outputShape": {
    "kind": "object",
    "fields": [
      {
        "name": "stockItemId",
        "type": "string",
        "required": true,
        "fieldRef": "StockItem.stockItemId"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "fieldRef": "StockItem.name"
      },
      {
        "name": "unit",
        "type": "string",
        "required": true,
        "fieldRef": "StockItem.unit"
      },
      {
        "name": "currentBalance",
        "type": "number",
        "required": true,
        "fieldRef": "StockItem.currentBalance"
      },
      {
        "name": "minimumLevel",
        "type": "number",
        "required": true,
        "fieldRef": "StockItem.minimumLevel"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "fieldRef": "StockItem.description"
      },
      {
        "name": "createdAt",
        "type": "string",
        "required": true,
        "fieldRef": "StockItem.createdAt"
      },
      {
        "name": "updatedAt",
        "type": "string",
        "required": true,
        "fieldRef": "StockItem.updatedAt"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "name",
      "fieldRef": "StockItem.name",
      "required": true,
      "source": "userInput",
      "description": "Nome do insumo físico a ser controlado no estoque"
    },
    {
      "inputId": "unit",
      "fieldRef": "StockItem.unit",
      "required": true,
      "source": "userInput",
      "description": "Unidade de medida do insumo (kg, liter, portion ou unit)"
    },
    {
      "inputId": "currentBalance",
      "fieldRef": "StockItem.currentBalance",
      "required": true,
      "source": "userInput",
      "description": "Saldo inicial disponível do insumo no momento do cadastro"
    },
    {
      "inputId": "minimumLevel",
      "fieldRef": "StockItem.minimumLevel",
      "required": true,
      "source": "userInput",
      "description": "Nível mínimo para disparo de alerta de estoque baixo"
    },
    {
      "inputId": "description",
      "fieldRef": "StockItem.description",
      "required": false,
      "source": "userInput",
      "description": "Descrição complementar opcional do insumo"
    },
    {
      "inputId": "stockItemId",
      "fieldRef": "StockItem.stockItemId",
      "required": true,
      "source": "systemDefault",
      "description": "Identificador único gerado automaticamente para o novo item de estoque"
    },
    {
      "inputId": "createdAt",
      "fieldRef": "StockItem.createdAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora de criação preenchidas automaticamente pelo sistema"
    },
    {
      "inputId": "updatedAt",
      "fieldRef": "StockItem.updatedAt",
      "required": true,
      "source": "systemDefault",
      "description": "Data e hora da última atualização preenchidas automaticamente pelo sistema"
    }
  ],
  "contextResolution": [
    {
      "inputId": "stockItemId",
      "targetRef": "StockItem.stockItemId",
      "source": "systemDefault",
      "originRef": "systemDefault.uuid",
      "description": "Gera um UUID único para o novo item de estoque no momento da criação"
    },
    {
      "inputId": "createdAt",
      "targetRef": "StockItem.createdAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define createdAt com o timestamp atual do servidor no momento da criação"
    },
    {
      "inputId": "updatedAt",
      "targetRef": "StockItem.updatedAt",
      "source": "systemDefault",
      "originRef": "systemDefault.now",
      "description": "Define updatedAt com o timestamp atual do servidor no momento da criação"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, o item de estoque existe com o nome, unidade, saldo inicial e nível mínimo informados",
    "O saldo atual do item criado reflete o valor de currentBalance informado no cadastro",
    "O item criado passa a ser considerado no controle de estoque e nos alertas de estoque baixo quando currentBalance for menor ou igual a minimumLevel",
    "stockItemId, createdAt e updatedAt são preenchidos automaticamente pelo sistema"
  ],
  "pageId": "createStockItem",
  "commandName": "createStockItem",
  "bffName": "cafeFlow.createStockItem.createStockItem",
  "capability": {
    "capabilityId": "createStockItem",
    "title": "Criar item de estoque",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationCreateStockItem;
