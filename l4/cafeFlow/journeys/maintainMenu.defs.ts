/// <mls fileReference="_102051_/l4/cafeFlow/journeys/maintainMenu.defs.ts" enhancement="_blank"/>

export const maintainMenuJourney = {
  "journeyId": "maintainMenu",
  "actorId": "gerente",
  "title": "Cadastrar e manter o cardápio",
  "goal": "Manter itens do cardápio com categoria, preço e vínculo aos ingredientes",
  "steps": [
    "Criar ou editar item",
    "Vincular ingredientes de estoque",
    "Ativar ou pausar item"
  ],
  "outcome": "Cardápio atualizado, com preços e vínculos de estoque coerentes para o POS e a cozinha.",
  "operationIds": [
    "browseMenuItems",
    "createMenuItem",
    "updateMenuItem"
  ],
  "workspaceId": "menuManagement"
} as const;

export default maintainMenuJourney;
