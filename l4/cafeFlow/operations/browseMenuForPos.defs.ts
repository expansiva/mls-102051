/// <mls fileReference="_102051_/l4/cafeFlow/operations/browseMenuForPos.defs.ts" enhancement="_blank"/>

export const operationBrowseMenuForPos = {
  "operationId": "browseMenuForPos",
  "title": "Consultar cardápio no POS",
  "actors": [
    "atendente"
  ],
  "entity": "MenuItem",
  "kind": "query",
  "reads": [
    "MenuItem",
    "MenuCategory"
  ],
  "writes": [],
  "rulesApplied": [
    "onlyActiveMenuItemsCanBeOrdered",
    "menuItemNeedsCategoryAndPrice"
  ],
  "story": {
    "actor": "atendente",
    "goal": "Consultar os itens disponíveis do cardápio no POS para montar o pedido com precisão",
    "steps": [
      "O atendente abre o cardápio no POS durante o lançamento do pedido",
      "O sistema lista somente itens ativos que possuem categoria e preço definidos",
      "O atendente filtra opcionalmente por categoria e visualiza nome, preço, descrição e imagem",
      "O atendente seleciona os itens desejados para compor o pedido"
    ],
    "outcome": "Cardápio com itens disponíveis exibido no POS, pronto para seleção e composição do pedido"
  },
  "accessPattern": {
    "kind": "list",
    "description": "Lista os itens ativos do cardápio para seleção no POS, com filtro opcional por categoria e ordenação de exibição",
    "entity": "MenuItem",
    "keyField": "MenuItem.menuItemId",
    "filters": [
      "MenuItem.menuCategoryId",
      "MenuItem.status"
    ],
    "sort": [
      "MenuItem.displayOrder",
      "MenuItem.name"
    ],
    "pagination": "none",
    "selection": "multiple",
    "output": [
      "MenuItem.menuItemId",
      "MenuItem.menuCategoryId",
      "MenuItem.name",
      "MenuItem.description",
      "MenuItem.price",
      "MenuItem.status",
      "MenuItem.imageUrl",
      "MenuItem.displayOrder"
    ]
  },
  "outputShape": {
    "kind": "list",
    "fields": [
      {
        "name": "menuItemId",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.menuItemId"
      },
      {
        "name": "menuCategoryId",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.menuCategoryId"
      },
      {
        "name": "name",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.name"
      },
      {
        "name": "description",
        "type": "string",
        "required": false,
        "fieldRef": "MenuItem.description"
      },
      {
        "name": "price",
        "type": "number",
        "required": true,
        "fieldRef": "MenuItem.price"
      },
      {
        "name": "status",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.status"
      },
      {
        "name": "imageUrl",
        "type": "string",
        "required": false,
        "fieldRef": "MenuItem.imageUrl"
      },
      {
        "name": "displayOrder",
        "type": "number",
        "required": false,
        "fieldRef": "MenuItem.displayOrder"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "menuCategoryId",
      "fieldRef": "MenuItem.menuCategoryId",
      "required": false,
      "source": "userInput",
      "description": "Filtro opcional pela categoria do cardápio para restringir os itens exibidos no POS"
    }
  ],
  "contextResolution": [],
  "acceptanceAssertions": [
    "Somente itens do cardápio com status active são retornados na listagem do POS",
    "Itens com status paused não aparecem para novos lançamentos no POS",
    "Cada item retornado possui menuCategoryId e price definidos e utilizáveis na venda",
    "Os itens retornados incluem menuItemId, name, price, menuCategoryId e demais dados de exibição necessários à seleção no pedido",
    "Quando informado, o filtro menuCategoryId restringe a listagem aos itens da categoria correspondente",
    "A listagem é ordenada por displayOrder e name para organização no POS"
  ],
  "pageId": "browseMenuForPos",
  "commandName": "browseMenuForPos",
  "bffName": "cafeFlow.browseMenuForPos.browseMenuForPos",
  "capability": {
    "capabilityId": "browseMenuForPos",
    "title": "Consultar cardápio no POS",
    "actor": "atendente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationBrowseMenuForPos;
