/// <mls fileReference="_102051_/l4/cafeFlow/workflows/orderLifecycle.defs.ts" enhancement="_blank"/>

export const workflowOrderLifecycle = {
  "workflowId": "orderLifecycle",
  "title": "Ciclo de vida do pedido",
  "executionMode": "sequential",
  "trigger": "Atendente registra um novo pedido de mesa ou takeout com itens do cardápio.",
  "actors": [
    "atendente",
    "cozinheiro"
  ],
  "states": [
    "registered",
    "confirmed",
    "inPreparation",
    "ready",
    "served",
    "cancelled"
  ],
  "transitions": [
    {
      "from": "registered",
      "to": "confirmed",
      "on": "updateOrderStatus",
      "by": "atendente",
      "guard": "Pedido só entra na fila da cozinha após confirmação explícita do atendente"
    },
    {
      "from": "confirmed",
      "to": "inPreparation",
      "on": "updateOrderStatus",
      "by": "cozinheiro",
      "guard": "Cozinha só atua em pedidos confirmados/enviados"
    },
    {
      "from": "inPreparation",
      "to": "ready",
      "on": "updateOrderStatus",
      "by": "cozinheiro",
      "guard": "Status de preparo progride de forma coerente até pronto"
    },
    {
      "from": "ready",
      "to": "served",
      "on": "updateOrderStatus",
      "by": "atendente",
      "guard": "Somente pedidos prontos podem ser marcados como servidos/entregues"
    },
    {
      "from": "registered",
      "to": "cancelled",
      "on": "updateOrderStatus",
      "by": "atendente"
    },
    {
      "from": "confirmed",
      "to": "cancelled",
      "on": "updateOrderStatus",
      "by": "atendente"
    },
    {
      "from": "inPreparation",
      "to": "cancelled",
      "on": "updateOrderStatus",
      "by": "atendente"
    },
    {
      "from": "ready",
      "to": "cancelled",
      "on": "updateOrderStatus",
      "by": "atendente"
    }
  ],
  "operationIds": [
    "createOrder",
    "updateOrderStatus"
  ],
  "entities": [
    "Order",
    "OrderItem",
    "OrderPayment",
    "StockConsumption",
    "DailyShift",
    "MenuItemIngredient"
  ],
  "rulesApplied": [
    "orderRequiresTableOrTakeout",
    "orderEntersKitchenQueueAfterAttendantConfirmation",
    "orderTotalFromPriceAtLaunchTime",
    "onlyReadyOrdersCanBeServed",
    "autoStockDeductionOnServe",
    "completedOrdersLeaveKitchenQueue",
    "kitchenStatusProgressesInOrder",
    "orderItemsArePrepReference",
    "ordersRequireOpenDailyShift"
  ],
  "story": {
    "actor": "Atendente",
    "goal": "Registrar o pedido e acompanhá-lo com a cozinha até servir ou entregar ao cliente",
    "steps": [
      "O atendente define o canal (mesa ou takeout), inclui itens ativos do cardápio com quantidades e observações e associa o pagamento básico quando aplicável.",
      "O atendente confere o lançamento, confirma o pedido e o envia à fila da cozinha.",
      "O cozinheiro consulta a fila, inicia o preparo e atualiza o status para em preparo.",
      "Ao concluir o preparo, o cozinheiro marca o pedido como pronto para o salão ou balcão.",
      "O atendente avisa o cliente e marca o pedido como servido ou entregue, concluindo o ciclo e disparando a baixa automática de estoque."
    ],
    "outcome": "Pedido finalizado como servido/entregue, fora da fila ativa da cozinha e com estoque dos ingredientes vinculados atualizado."
  },
  "pageId": "orderLifecycle",
  "capabilities": [
    {
      "capabilityId": "orderLifecycle",
      "title": "Ciclo de vida do pedido",
      "actor": "atendente",
      "priority": "now"
    }
  ],
  "statusFrontend": "toCreate",
  "statusBackend": "toCreate"
} as const;

export default workflowOrderLifecycle;
