/// <mls fileReference="_102051_/l4/cafeFlow/operations/browseActiveMenuItems.defs.ts" enhancement="_blank"/>

export const operationBrowseActiveMenuItems = {
  "operationId": "browseActiveMenuItems",
  "title": "Consultar cardápio no POS",
  "actors": [
    "atendente"
  ],
  "entity": "MenuItem",
  "kind": "query",
  "reads": [
    "MenuItem"
  ],
  "writes": [],
  "rulesApplied": [
    "menuItemMustBeActiveToOrder"
  ],
  "story": {
    "actor": "Atendente",
    "goal": "Consultar o cardápio ativo no POS para selecionar itens ao montar o pedido",
    "steps": [
      "Abrir a interface rápida de cardápio no POS",
      "Visualizar os itens ativos com categoria e preço",
      "Filtrar ou navegar por categoria conforme a decisão do cliente",
      "Selecionar os itens desejados para adicionar ao pedido"
    ],
    "outcome": "Lista de itens ativos do cardápio exibida com nome, categoria e preço, pronta para seleção no pedido"
  },
  "accessPattern": {
    "kind": "list",
    "description": "Lista rápida dos itens ativos do cardápio para seleção no POS",
    "entity": "MenuItem",
    "keyField": "MenuItem.menuItemId",
    "filters": [
      "MenuItem.status",
      "MenuItem.category"
    ],
    "sort": [
      "MenuItem.category",
      "MenuItem.name"
    ],
    "pagination": "none",
    "selection": "multiple",
    "output": [
      "MenuItem.menuItemId",
      "MenuItem.name",
      "MenuItem.category",
      "MenuItem.price",
      "MenuItem.status",
      "MenuItem.description"
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
        "name": "name",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.name"
      },
      {
        "name": "category",
        "type": "string",
        "required": true,
        "fieldRef": "MenuItem.category"
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
        "name": "description",
        "type": "string",
        "required": false,
        "fieldRef": "MenuItem.description"
      }
    ]
  },
  "inputs": [
    {
      "inputId": "status",
      "fieldRef": "MenuItem.status",
      "required": true,
      "source": "systemDefault",
      "description": "Filtro fixo para retornar apenas itens ativos do cardápio"
    },
    {
      "inputId": "category",
      "fieldRef": "MenuItem.category",
      "required": false,
      "source": "userInput",
      "description": "Filtro opcional por categoria do cardápio para facilitar a busca no POS"
    }
  ],
  "contextResolution": [
    {
      "inputId": "status",
      "targetRef": "MenuItem.status",
      "source": "systemDefault",
      "originRef": "systemDefault.locale",
      "description": "Backend força status=active para que apenas itens ativos apareçam na seleção do POS"
    }
  ],
  "acceptanceAssertions": [
    "Apenas itens do cardápio com status active são retornados na listagem do POS",
    "Itens inativos não aparecem para seleção no POS",
    "Cada item retornado inclui menuItemId, name, category e price para conferência pelo atendente",
    "O atendente pode filtrar opcionalmente por category ao consultar o cardápio",
    "Os preços exibidos são os preços atuais de venda dos itens ativos"
  ],
  "pageId": "browseActiveMenuItems",
  "commandName": "browseActiveMenuItems",
  "bffName": "cafeFlow.browseActiveMenuItems.browseActiveMenuItems",
  "capability": {
    "capabilityId": "browseActiveMenuItems",
    "title": "Consultar cardápio no POS",
    "actor": "atendente",
    "priority": "now"
  },
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default operationBrowseActiveMenuItems;
