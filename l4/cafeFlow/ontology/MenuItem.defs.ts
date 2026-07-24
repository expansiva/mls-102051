/// <mls fileReference="_102051_/l4/cafeFlow/ontology/MenuItem.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityMenuItem = {
  "entityId": "MenuItem",
  "title": "Item do Cardápio",
  "description": "Produto vendável no PDV, com categoria, preço, disponibilidade e vínculo aos ingredientes de estoque para baixa automática.",
  "kind": "mdm",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "menuItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do item do cardápio."
    },
    {
      "fieldId": "menuCategoryId",
      "type": "uuid",
      "required": true,
      "description": "Categoria à qual o item pertence, para organização no PDV."
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Nome do item exibido no cardápio e no PDV."
    },
    {
      "fieldId": "description",
      "type": "text",
      "required": false,
      "description": "Descrição curta do item para o cliente."
    },
    {
      "fieldId": "price",
      "type": "money",
      "required": true,
      "description": "Preço de venda atual do item no PDV."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Disponibilidade atual do item: active para novos lançamentos, paused para ocultar do PDV.",
      "enum": [
        "active",
        "paused"
      ]
    },
    {
      "fieldId": "pausedAt",
      "type": "datetime",
      "required": false,
      "description": "Data e hora em que o item foi pausado, quando aplicável."
    },
    {
      "fieldId": "pauseReason",
      "type": "string",
      "required": false,
      "description": "Motivo registrado para pausar o item."
    },
    {
      "fieldId": "imageUrl",
      "type": "string",
      "required": false,
      "description": "Imagem do item exibida no cardápio digital e no PDV."
    },
    {
      "fieldId": "displayOrder",
      "type": "number",
      "required": false,
      "description": "Ordem de exibição do item dentro de sua categoria."
    },
    {
      "fieldId": "requiresStockLink",
      "type": "boolean",
      "required": true,
      "description": "Indica se o item exige vínculo com ingredientes para permitir baixa automática de estoque."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do item do cardápio."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do item do cardápio."
    }
  ],
  "statusEnum": [
    "active",
    "paused"
  ],
  "lifecycleStates": [
    "active",
    "paused"
  ]
} as const;

export default cafeFlowEntityMenuItem;
