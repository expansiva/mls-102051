/// <mls fileReference="_102051_/l5/cafeFlow/todoFrontend.defs.ts" enhancement="_blank"/>

export const cafeFlowTodoFrontend = {
  "schemaVersion": "2026-07-02-layer-todo",
  "moduleName": "cafeFlow",
  "layer": "frontend",
  "updatedAt": "2026-07-27T18:57:49.399Z",
  "owners": [
    {
      "ownerType": "workflow",
      "ownerId": "orderLifecycle",
      "title": "Ciclo de vida do pedido",
      "status": "done",
      "defPath": "l4/cafeFlow/workflows/orderLifecycle.defs.ts",
      "pageId": "orderLifecycle",
      "capabilityId": "orderLifecycle"
    },
    {
      "ownerType": "workflow",
      "ownerId": "dailyShiftLifecycle",
      "title": "Ciclo do turno diário",
      "status": "done",
      "defPath": "l4/cafeFlow/workflows/dailyShiftLifecycle.defs.ts",
      "pageId": "dailyShiftLifecycle",
      "capabilityId": "dailyShiftLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "createOrder",
      "title": "Registrar pedido",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/createOrder.defs.ts",
      "pageId": "orderLifecycle",
      "commandName": "createOrder",
      "bffName": "cafeFlow.orderLifecycle.createOrder",
      "capabilityId": "orderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "updateOrderStatus",
      "title": "Atualizar status do pedido",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/updateOrderStatus.defs.ts",
      "pageId": "orderLifecycle",
      "commandName": "updateOrderStatus",
      "bffName": "cafeFlow.orderLifecycle.updateOrderStatus",
      "capabilityId": "orderLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "recordBasicPayment",
      "title": "Registrar pagamento básico",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/recordBasicPayment.defs.ts",
      "pageId": "recordBasicPayment",
      "commandName": "recordBasicPayment",
      "bffName": "cafeFlow.recordBasicPayment.recordBasicPayment",
      "capabilityId": "recordBasicPayment"
    },
    {
      "ownerType": "operation",
      "ownerId": "browseMenuForPos",
      "title": "Consultar cardápio no POS",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/browseMenuForPos.defs.ts",
      "pageId": "browseMenuForPos",
      "commandName": "browseMenuForPos",
      "bffName": "cafeFlow.browseMenuForPos.browseMenuForPos",
      "capabilityId": "browseMenuForPos"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewKitchenQueue",
      "title": "Ver fila da cozinha",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/viewKitchenQueue.defs.ts",
      "pageId": "viewKitchenQueue",
      "commandName": "viewKitchenQueue",
      "bffName": "cafeFlow.viewKitchenQueue.viewKitchenQueue",
      "capabilityId": "viewKitchenQueue"
    },
    {
      "ownerType": "operation",
      "ownerId": "trackOrders",
      "title": "Acompanhar pedidos abertos",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/trackOrders.defs.ts",
      "pageId": "trackOrders",
      "commandName": "trackOrders",
      "bffName": "cafeFlow.trackOrders.trackOrders",
      "capabilityId": "trackOrders"
    },
    {
      "ownerType": "operation",
      "ownerId": "browseMenuItems",
      "title": "Listar itens do cardápio",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/browseMenuItems.defs.ts",
      "pageId": "browseMenuItems",
      "commandName": "browseMenuItems",
      "bffName": "cafeFlow.browseMenuItems.browseMenuItems",
      "capabilityId": "browseMenuItems"
    },
    {
      "ownerType": "operation",
      "ownerId": "createMenuItem",
      "title": "Criar item do cardápio",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/createMenuItem.defs.ts",
      "pageId": "createMenuItem",
      "commandName": "createMenuItem",
      "bffName": "cafeFlow.createMenuItem.createMenuItem",
      "capabilityId": "createMenuItem"
    },
    {
      "ownerType": "operation",
      "ownerId": "updateMenuItem",
      "title": "Atualizar item do cardápio",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/updateMenuItem.defs.ts",
      "pageId": "updateMenuItem",
      "commandName": "updateMenuItem",
      "bffName": "cafeFlow.updateMenuItem.updateMenuItem",
      "capabilityId": "updateMenuItem"
    },
    {
      "ownerType": "operation",
      "ownerId": "browseStockItems",
      "title": "Listar itens de estoque",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/browseStockItems.defs.ts",
      "pageId": "browseStockItems",
      "commandName": "browseStockItems",
      "bffName": "cafeFlow.browseStockItems.browseStockItems",
      "capabilityId": "browseStockItems"
    },
    {
      "ownerType": "operation",
      "ownerId": "createStockItem",
      "title": "Criar item de estoque",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/createStockItem.defs.ts",
      "pageId": "createStockItem",
      "commandName": "createStockItem",
      "bffName": "cafeFlow.createStockItem.createStockItem",
      "capabilityId": "createStockItem"
    },
    {
      "ownerType": "operation",
      "ownerId": "updateStockItem",
      "title": "Atualizar item de estoque",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/updateStockItem.defs.ts",
      "pageId": "updateStockItem",
      "commandName": "updateStockItem",
      "bffName": "cafeFlow.updateStockItem.updateStockItem",
      "capabilityId": "updateStockItem"
    },
    {
      "ownerType": "operation",
      "ownerId": "deleteStockItem",
      "title": "Excluir item de estoque",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/deleteStockItem.defs.ts",
      "pageId": "deleteStockItem",
      "commandName": "deleteStockItem",
      "bffName": "cafeFlow.deleteStockItem.deleteStockItem",
      "capabilityId": "deleteStockItem"
    },
    {
      "ownerType": "operation",
      "ownerId": "createStockAdjustment",
      "title": "Registrar ajuste manual de estoque",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/createStockAdjustment.defs.ts",
      "pageId": "createStockAdjustment",
      "commandName": "createStockAdjustment",
      "bffName": "cafeFlow.createStockAdjustment.createStockAdjustment",
      "capabilityId": "createStockAdjustment"
    },
    {
      "ownerType": "operation",
      "ownerId": "openDailyShift",
      "title": "Abrir turno diário",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/openDailyShift.defs.ts",
      "pageId": "dailyShiftLifecycle",
      "commandName": "openDailyShift",
      "bffName": "cafeFlow.dailyShiftLifecycle.openDailyShift",
      "capabilityId": "dailyShiftLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "closeDailyShift",
      "title": "Fechar turno diário",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/closeDailyShift.defs.ts",
      "pageId": "dailyShiftLifecycle",
      "commandName": "closeDailyShift",
      "bffName": "cafeFlow.dailyShiftLifecycle.closeDailyShift",
      "capabilityId": "dailyShiftLifecycle"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewShiftClosingReport",
      "title": "Ver relatório de fechamento de turno",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/viewShiftClosingReport.defs.ts",
      "pageId": "viewShiftClosingReport",
      "commandName": "viewShiftClosingReport",
      "bffName": "cafeFlow.viewShiftClosingReport.viewShiftClosingReport",
      "capabilityId": "viewShiftClosingReport"
    },
    {
      "ownerType": "operation",
      "ownerId": "viewOperationalDashboard",
      "title": "Ver dashboard operacional",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/viewOperationalDashboard.defs.ts",
      "pageId": "viewOperationalDashboard",
      "commandName": "viewOperationalDashboard",
      "bffName": "cafeFlow.viewOperationalDashboard.viewOperationalDashboard",
      "capabilityId": "viewOperationalDashboard"
    },
    {
      "ownerType": "operation",
      "ownerId": "generateAiSalesSummary",
      "title": "Gerar resumo de vendas do dia (IA)",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/generateAiSalesSummary.defs.ts",
      "pageId": "generateAiSalesSummary",
      "commandName": "generateAiSalesSummary",
      "bffName": "cafeFlow.generateAiSalesSummary.generateAiSalesSummary",
      "capabilityId": "generateAiSalesSummary"
    },
    {
      "ownerType": "operation",
      "ownerId": "generateAiPromotionSuggestions",
      "title": "Gerar sugestões de itens a promover (IA)",
      "status": "done",
      "defPath": "l4/cafeFlow/operations/generateAiPromotionSuggestions.defs.ts",
      "pageId": "generateAiPromotionSuggestions",
      "commandName": "generateAiPromotionSuggestions",
      "bffName": "cafeFlow.generateAiPromotionSuggestions.generateAiPromotionSuggestions",
      "capabilityId": "generateAiPromotionSuggestions"
    }
  ]
} as const;

export default cafeFlowTodoFrontend;
