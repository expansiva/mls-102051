/// <mls fileReference="_102051_/l4/cafeFlow/operations/queryStockItems.defs.ts" enhancement="_blank"/>

export const operationQueryStockItems = {
  "operationId": "queryStockItems",
  "title": "Listar itens de estoque",
  "actors": [
    "gerente"
  ],
  "entity": "StockItem",
  "kind": "query",
  "reads": [
    "StockItem"
  ],
  "writes": [],
  "rulesApplied": [
    "stockItemLowWhenBelowMinimum"
  ],
  "story": {
    "actor": "gerente",
    "goal": "Consultar a lista de itens de estoque cadastrados, inclusive os que estão abaixo do mínimo, para gerenciar reposição e composição do cardápio.",
    "steps": [
      "O gerente abre a consulta de itens de estoque",
      "O sistema lista os itens com nome, unidade, quantidade atual, estoque mínimo e status",
      "O gerente pode filtrar por status ou apenas itens em estoque baixo",
      "A lista exibida permite identificar o que repor e o que está disponível para vincular ao cardápio"
    ],
    "outcome": "Lista de itens de estoque exibida com indicação dos que estão abaixo do mínimo definido."
  },
  "accessPattern": {
    "kind": "list",
    "description": "Lista paginada de itens de estoque com filtros por status e estoque baixo",
    "entity": "StockItem",
    "keyField": "StockItem.stockItemId",
    "filters": [
      "StockItem.status",
      "StockItem.name"
    ],
    "sort": [
      "StockItem.name"
    ],
    "pagination": "optional",
    "selection": "single",
    "output": [
      "StockItem.stockItemId",
      "StockItem.name",
      "StockItem.unit",
      "StockItem.currentQuantity",
      "StockItem.minimumLevel",
      "StockItem.status",
      "StockItem.notes",
      "StockItem.createdAt",
      "StockItem.updatedAt"
    ]
  },
  "outputShape": {
    "kind": "paginated",
    "fields": [
      {
        "name": "stockItems",
        "type": "array",
        "required": true,
        "item": {
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
              "name": "currentQuantity",
              "type": "number",
              "required": true,
              "fieldRef": "StockItem.currentQuantity"
            },
            {
              "name": "minimumLevel",
              "type": "number",
              "required": true,
              "fieldRef": "StockItem.minimumLevel"
            },
            {
              "name": "status",
              "type": "string",
              "required": true,
              "fieldRef": "StockItem.status"
            },
            {
              "name": "notes",
              "type": "string",
              "required": false,
              "fieldRef": "StockItem.notes"
            },
            {
              "name": "isLowStock",
              "type": "boolean",
              "required": true
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
        }
      },
      {
        "name": "total",
        "type": "number",
        "required": true
      }
    ]
  },
  "inputs": [
    {
      "inputId": "status",
      "fieldRef": "StockItem.status",
      "required": false,
      "source": "userInput",
      "description": "Filtro opcional pela situação do item (active ou inactive)."
    },
    {
      "inputId": "name",
      "fieldRef": "StockItem.name",
      "required": false,
      "source": "userInput",
      "description": "Filtro opcional por nome parcial do ingrediente."
    },
    {
      "inputId": "lowStockOnly",
      "type": "boolean",
      "required": false,
      "source": "userInput",
      "description": "Quando true, retorna apenas itens com quantidade atual abaixo do estoque mínimo."
    },
    {
      "inputId": "page",
      "type": "number",
      "required": false,
      "source": "userInput",
      "description": "Número da página para paginação opcional."
    },
    {
      "inputId": "pageSize",
      "type": "number",
      "required": false,
      "source": "userInput",
      "description": "Quantidade de itens por página."
    }
  ],
  "contextResolution": [],
  "acceptanceAssertions": [
    "A lista retorna itens de estoque com stockItemId, name, unit, currentQuantity, minimumLevel e status.",
    "Quando lowStockOnly é true, somente itens com currentQuantity abaixo de minimumLevel são retornados.",
    "Cada item da lista inclui o indicador isLowStock true quando currentQuantity < minimumLevel e false caso contrário.",
    "Filtro por status restringe o resultado aos itens com o status informado (active ou inactive).",
    "A resposta paginada inclui o total de itens que satisfazem os filtros aplicados.",
    "Itens retornados podem ser usados para reposição, ajuste de quantidade e vínculo na composição do cardápio."
  ],
  "pageId": "queryStockItems",
  "commandName": "queryStockItems",
  "bffName": "cafeFlow.queryStockItems.queryStockItems",
  "capability": {
    "capabilityId": "queryStockItems",
    "title": "Listar itens de estoque",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationQueryStockItems;
