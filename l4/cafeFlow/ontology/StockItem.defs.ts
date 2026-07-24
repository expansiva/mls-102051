/// <mls fileReference="_102051_/l4/cafeFlow/ontology/StockItem.defs.ts" enhancement="_blank"/>

export const cafeFlowEntityStockItem = {
  "entityId": "StockItem",
  "title": "Item de Estoque",
  "description": "Insumo físico controlado pela cafeteria, com unidade de medida, saldo atual e nível mínimo para alerta de estoque baixo.",
  "kind": "mdm",
  "ownership": "moduleOwned",
  "fields": [
    {
      "fieldId": "stockItemId",
      "type": "uuid",
      "required": true,
      "description": "Identificador único do item de estoque."
    },
    {
      "fieldId": "name",
      "type": "string",
      "required": true,
      "description": "Nome do insumo físico controlado pela cafeteria."
    },
    {
      "fieldId": "unit",
      "type": "string",
      "required": true,
      "description": "Unidade de medida utilizada para contabilizar o saldo e as movimentações do insumo.",
      "enum": [
        "kg",
        "liter",
        "portion",
        "unit"
      ]
    },
    {
      "fieldId": "currentBalance",
      "type": "number",
      "required": true,
      "description": "Saldo atual disponível do insumo em estoque, atualizado pelas baixas automáticas e ajustes manuais."
    },
    {
      "fieldId": "minimumLevel",
      "type": "number",
      "required": true,
      "description": "Nível mínimo configurado para disparo do alerta de estoque baixo no dashboard e no controle de estoque."
    },
    {
      "fieldId": "description",
      "type": "text",
      "required": false,
      "description": "Descrição complementar do insumo para auxiliar na identificação e uso pela equipe."
    },
    {
      "fieldId": "createdAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora de criação do cadastro do item de estoque."
    },
    {
      "fieldId": "updatedAt",
      "type": "datetime",
      "required": true,
      "description": "Data e hora da última atualização do cadastro do item de estoque."
    }
  ]
} as const;

export default cafeFlowEntityStockItem;
