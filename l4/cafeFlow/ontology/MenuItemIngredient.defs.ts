/// <mls fileReference="_102051_/l4/cafeFlow/ontology/MenuItemIngredient.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityMenuItemIngredient = {
  "entityId": "MenuItemIngredient",
  "title": "Vínculo Item-Ingrediente",
  "description": "Associação entre um item do cardápio e um ingrediente de estoque, com a quantidade consumida por porção para viabilizar a baixa automática.",
  "kind": "supporting",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "menuItemIngredientId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do vínculo entre item de cardápio e ingrediente."
    },
    {
      "fieldId": "menuItemId",
      "type": "uuid",
      "required": true,
      "description": "Item do cardápio ao qual o ingrediente está vinculado."
    },
    {
      "fieldId": "stockItemId",
      "type": "uuid",
      "required": true,
      "description": "Ingrediente de estoque consumido por porção do item do cardápio."
    },
    {
      "fieldId": "quantityPerPortion",
      "type": "number",
      "required": true,
      "description": "Quantidade do ingrediente consumida por porção servida do item."
    },
    {
      "fieldId": "unit",
      "type": "string",
      "required": true,
      "description": "Unidade de medida da quantidade por porção, deve corresponder à unidade do ingrediente no estoque.",
      "enum": [
        "kg",
        "gram",
        "liter",
        "milliliter",
        "unit",
        "portion"
      ]
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do vínculo."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do vínculo."
    }
  ]
} as const;

export default cafeFlowEntityMenuItemIngredient;
