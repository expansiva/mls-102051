/// <mls fileReference="_102051_/l4/cafeFlow/journeys/processKitchenQueue.defs.ts" enhancement="_blank"/>

export const processKitchenQueueJourney = {
  "journeyId": "processKitchenQueue",
  "actorId": "cozinheiro",
  "title": "Processar fila da cozinha",
  "goal": "Preparar os pedidos na ordem da fila e manter o status atualizado",
  "steps": [
    "Ver fila de pedidos",
    "Iniciar preparo",
    "Sinalizar pronto",
    "Tratar observações e urgências"
  ],
  "outcome": "Pedidos da fila preparados com status claros para o salão/balcão.",
  "operationIds": [
    "viewKitchenQueue",
    "updateOrderStatus"
  ],
  "workspaceId": "posWorkspace"
} as const;

export default processKitchenQueueJourney;
