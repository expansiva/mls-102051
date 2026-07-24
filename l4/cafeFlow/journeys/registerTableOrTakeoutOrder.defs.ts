/// <mls fileReference="_102051_/l4/cafeFlow/journeys/registerTableOrTakeoutOrder.defs.ts" enhancement="_blank"/>

export const registerTableOrTakeoutOrderJourney = {
  "journeyId": "registerTableOrTakeoutOrder",
  "actorId": "atendente",
  "title": "Registrar pedido de mesa ou takeout",
  "goal": "Lançar rapidamente um pedido com os itens escolhidos pelo cliente",
  "steps": [
    "Definir canal do pedido",
    "Incluir itens do cardápio",
    "Confirmar e enviar à cozinha",
    "Registrar forma de pagamento"
  ],
  "outcome": "Pedido criado com canal, itens, status inicial e pagamento básico, pronto para preparo.",
  "operationIds": [
    "createOrder",
    "browseMenuForPos",
    "updateOrderStatus",
    "viewKitchenQueue",
    "recordBasicPayment"
  ],
  "workspaceId": "posWorkspace"
} as const;

export default registerTableOrTakeoutOrderJourney;
