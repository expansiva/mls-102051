/// <mls fileReference="_102051_/l4/cafeFlow/operations/deleteStockItem.defs.ts" enhancement="_blank"/>

export const operationDeleteStockItem = {
  "operationId": "deleteStockItem",
  "title": "Excluir item de estoque",
  "actors": [
    "gerente"
  ],
  "entity": "StockItem",
  "kind": "delete",
  "reads": [
    "StockItem"
  ],
  "writes": [
    "StockItem"
  ],
  "rulesApplied": [],
  "story": {
    "actor": "Gerente",
    "goal": "Remover do cadastro um insumo que não é mais utilizado pela cafeteria",
    "steps": [
      "Seleciona o item de estoque na listagem de controle",
      "Confirma a exclusão do item de estoque",
      "O sistema remove o cadastro do insumo"
    ],
    "outcome": "O item de estoque deixa de existir no cadastro e não aparece mais no controle de estoque"
  },
  "accessPattern": {
    "kind": "commandInput",
    "description": "Formulário de confirmação para excluir o item de estoque selecionado",
    "entity": "StockItem",
    "keyField": "StockItem.stockItemId",
    "pagination": "none",
    "selection": "single",
    "output": [
      "StockItem.stockItemId",
      "StockItem.name"
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
      }
    ]
  },
  "inputs": [
    {
      "inputId": "stockItemId",
      "fieldRef": "StockItem.stockItemId",
      "required": true,
      "source": "selectedEntity",
      "description": "Identificador do item de estoque selecionado para exclusão"
    }
  ],
  "contextResolution": [
    {
      "inputId": "stockItemId",
      "targetRef": "StockItem.stockItemId",
      "source": "selectedEntity",
      "originRef": "StockItem.stockItemId",
      "description": "Resolve o item de estoque atualmente selecionado na listagem de controle de estoque"
    }
  ],
  "acceptanceAssertions": [
    "Após a confirmação, o StockItem identificado por stockItemId deixa de existir no cadastro",
    "O item excluído não aparece mais na listagem de controle de estoque",
    "A operação retorna o stockItemId e o name do item removido"
  ],
  "pageId": "deleteStockItem",
  "commandName": "deleteStockItem",
  "bffName": "cafeFlow.deleteStockItem.deleteStockItem",
  "capability": {
    "capabilityId": "deleteStockItem",
    "title": "Excluir item de estoque",
    "actor": "gerente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationDeleteStockItem;
