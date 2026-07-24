# E5 — Workflows & Operations: cafeFlow

- module: `cafeFlow`
- workflows: 2 / operations: 20
- generatedAt: 2026-07-22T14:49:56.289Z

## Workflows

### orderLifecycle — Ciclo de vida do pedido

- actor: atendente, cozinheiro — trigger: Atendente registra um novo pedido de mesa ou takeout com itens do cardápio.
- states: 6 (registered → confirmed → inPreparation → ready → served → cancelled)
- transitions: 8
- operations: createOrder, updateOrderStatus

### dailyShiftLifecycle — Ciclo do turno diário

- actor: gerente — trigger: Gerente abre o turno diário para iniciar a operação do dia.
- states: 2 (open → closed)
- transitions: 1
- operations: openDailyShift, closeDailyShift

## Operations

| operationId | kind | entity | actor | bffName |
| --- | --- | --- | --- | --- |
| createOrder | create | Order | atendente | `cafeFlow.orderLifecycle.createOrder` |
| updateOrderStatus | update | Order | atendente/cozinheiro | `cafeFlow.orderLifecycle.updateOrderStatus` |
| recordBasicPayment | create | OrderPayment | atendente | `cafeFlow.recordBasicPayment.recordBasicPayment` |
| browseMenuForPos | query | MenuItem | atendente | `cafeFlow.browseMenuForPos.browseMenuForPos` |
| viewKitchenQueue | query | Order | cozinheiro | `cafeFlow.viewKitchenQueue.viewKitchenQueue` |
| trackOrders | query | Order | atendente | `cafeFlow.trackOrders.trackOrders` |
| browseMenuItems | query | MenuItem | gerente | `cafeFlow.browseMenuItems.browseMenuItems` |
| createMenuItem | create | MenuItem | gerente | `cafeFlow.createMenuItem.createMenuItem` |
| updateMenuItem | update | MenuItem | gerente | `cafeFlow.updateMenuItem.updateMenuItem` |
| browseStockItems | query | StockItem | gerente | `cafeFlow.browseStockItems.browseStockItems` |
| createStockItem | create | StockItem | gerente | `cafeFlow.createStockItem.createStockItem` |
| updateStockItem | update | StockItem | gerente | `cafeFlow.updateStockItem.updateStockItem` |
| deleteStockItem | delete | StockItem | gerente | `cafeFlow.deleteStockItem.deleteStockItem` |
| createStockAdjustment | create | StockAdjustment | gerente | `cafeFlow.createStockAdjustment.createStockAdjustment` |
| openDailyShift | create | DailyShift | gerente | `cafeFlow.dailyShiftLifecycle.openDailyShift` |
| closeDailyShift | update | DailyShift | gerente | `cafeFlow.dailyShiftLifecycle.closeDailyShift` |
| viewShiftClosingReport | view | ShiftClosingReport | gerente | `cafeFlow.viewShiftClosingReport.viewShiftClosingReport` |
| viewOperationalDashboard | view | OperationalDashboard | gerente | `cafeFlow.viewOperationalDashboard.viewOperationalDashboard` |
| generateAiSalesSummary | view | AiSalesSummary | gerente | `cafeFlow.generateAiSalesSummary.generateAiSalesSummary` |
| generateAiPromotionSuggestions | view | AiPromotionSuggestion | gerente | `cafeFlow.generateAiPromotionSuggestions.generateAiPromotionSuggestions` |
