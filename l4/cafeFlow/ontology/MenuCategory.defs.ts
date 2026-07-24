/// <mls fileReference="_102051_/l4/cafeFlow/ontology/MenuCategory.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityMenuCategory = {
  "entityId": "MenuCategory",
  "title": "Categoria do Cardápio",
  "description": "Agrupamento estável de itens do cardápio usado para organizar o POS e a consulta rápida.",
  "kind": "mdm",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "menuCategoryId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único da categoria do cardápio."
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Nome exibido da categoria (ex.: Bebidas, Pratos Principais)."
    },
    {
      "fieldId": "displayOrder",
      "type": "number",
      "required": true,
      "description": "Ordem de exibição da categoria no POS para consulta rápida."
    },
    {
      "fieldId": "status",
      "type": "string",
      "required": true,
      "description": "Situação da categoria no cardápio ativo.",
      "enum": [
        "active",
        "inactive"
      ]
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação da categoria."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última alteração da categoria."
    }
  ],
  "statusEnum": [
    "active",
    "inactive"
  ],
  "lifecycleStates": [
    "active",
    "inactive"
  ]
} as const;

export default cafeFlowEntityMenuCategory;
