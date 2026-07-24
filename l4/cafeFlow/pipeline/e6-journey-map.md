# E6 — Journey map: cafeFlow

- module: `cafeFlow`
- workspaces: 6 / landings: 3 / edges: 7
- generatedAt: 2026-07-22T14:51:56.279Z
- Consolidated navigation map derived from workflows/operations stories (view, not source).

## Workspaces by actor

### atendente

- `posWorkspace` (workflow, Order) — workflow `orderLifecycle`: Lançar e acompanhar pedidos — Atendente lança pedidos de mesa ou takeout, consulta o cardápio no POS, acompanha pedidos abertos e registra o pagamento básico.
  - bffCall `queryOpenOrders` [query] uses trackOrders `cafeFlow.posWorkspace.queryOpenOrders`
  - bffCall `queryMenuItems` [query] uses browseMenuForPos `cafeFlow.posWorkspace.queryMenuItems`
  - bffCall `cmdCreateOrder` [command] uses createOrder `cafeFlow.posWorkspace.cmdCreateOrder`
  - bffCall `cmdUpdateOrderStatus` [command] uses updateOrderStatus `cafeFlow.posWorkspace.cmdUpdateOrderStatus`
  - bffCall `cmdRecordBasicPayment` [command] uses recordBasicPayment `cafeFlow.posWorkspace.cmdRecordBasicPayment`
  - section `openOrdersSection` — Atendente e cozinheiro visualizam todos os pedidos abertos do turno, filtram por status ou tipo e acompanham o andamento em tempo real.
    - [filterControl] `queryOpenOrders`
    - [primarySurface] `queryOpenOrders`
    - [contextualAction] `cmdUpdateOrderStatus`
  - section `createOrderSection` — Atendente lança um novo pedido de mesa ou takeout, consulta o cardápio no POS para selecionar itens e confirma o envio à cozinha.
    - [filterControl] `queryMenuItems`
    - [primarySurface] `cmdCreateOrder`
    - [showcase] `queryMenuItems`
  - section `paymentSection` — Atendente seleciona o pedido totalizado, escolhe a forma de pagamento e registra o fechamento básico.
    - [primarySurface] `cmdRecordBasicPayment`
- `kitchenWorkspace` (workflow, Order) — workflow `orderLifecycle`: Fila da cozinha — Cozinheiro visualiza a fila de pedidos do turno e atualiza o status de preparo de cada item.
  - bffCall `fetchKitchenQueue` [query] uses viewKitchenQueue `cafeFlow.kitchenWorkspace.fetchKitchenQueue`
  - bffCall `changeOrderStatus` [command] uses updateOrderStatus `cafeFlow.kitchenWorkspace.changeOrderStatus`
  - section `kitchenQueueSection` — Cozinheiro visualiza todos os pedidos confirmados e em preparo do turno atual e atualiza o status de cada um conforme o andamento do preparo.
    - [primarySurface] `fetchKitchenQueue`
    - [contextualAction] `changeOrderStatus`

### cozinheiro

- `posWorkspace` (workflow, Order) — workflow `orderLifecycle`: Lançar e acompanhar pedidos — Atendente lança pedidos de mesa ou takeout, consulta o cardápio no POS, acompanha pedidos abertos e registra o pagamento básico.
  - bffCall `queryOpenOrders` [query] uses trackOrders `cafeFlow.posWorkspace.queryOpenOrders`
  - bffCall `queryMenuItems` [query] uses browseMenuForPos `cafeFlow.posWorkspace.queryMenuItems`
  - bffCall `cmdCreateOrder` [command] uses createOrder `cafeFlow.posWorkspace.cmdCreateOrder`
  - bffCall `cmdUpdateOrderStatus` [command] uses updateOrderStatus `cafeFlow.posWorkspace.cmdUpdateOrderStatus`
  - bffCall `cmdRecordBasicPayment` [command] uses recordBasicPayment `cafeFlow.posWorkspace.cmdRecordBasicPayment`
  - section `openOrdersSection` — Atendente e cozinheiro visualizam todos os pedidos abertos do turno, filtram por status ou tipo e acompanham o andamento em tempo real.
    - [filterControl] `queryOpenOrders`
    - [primarySurface] `queryOpenOrders`
    - [contextualAction] `cmdUpdateOrderStatus`
  - section `createOrderSection` — Atendente lança um novo pedido de mesa ou takeout, consulta o cardápio no POS para selecionar itens e confirma o envio à cozinha.
    - [filterControl] `queryMenuItems`
    - [primarySurface] `cmdCreateOrder`
    - [showcase] `queryMenuItems`
  - section `paymentSection` — Atendente seleciona o pedido totalizado, escolhe a forma de pagamento e registra o fechamento básico.
    - [primarySurface] `cmdRecordBasicPayment`
- `kitchenWorkspace` (workflow, Order) — workflow `orderLifecycle`: Fila da cozinha — Cozinheiro visualiza a fila de pedidos do turno e atualiza o status de preparo de cada item.
  - bffCall `fetchKitchenQueue` [query] uses viewKitchenQueue `cafeFlow.kitchenWorkspace.fetchKitchenQueue`
  - bffCall `changeOrderStatus` [command] uses updateOrderStatus `cafeFlow.kitchenWorkspace.changeOrderStatus`
  - section `kitchenQueueSection` — Cozinheiro visualiza todos os pedidos confirmados e em preparo do turno atual e atualiza o status de cada um conforme o andamento do preparo.
    - [primarySurface] `fetchKitchenQueue`
    - [contextualAction] `changeOrderStatus`

### gerente

- `menuManagement` (entityManagement, MenuItem): Gerenciar cardápio — Gerente cadastra, edita e vincula ingredientes de estoque aos itens do cardápio.
  - bffCall `listMenuItems` [query] uses browseMenuItems `cafeFlow.menuManagement.listMenuItems`
  - bffCall `createMenuItemCmd` [command] uses createMenuItem `cafeFlow.menuManagement.createMenuItemCmd`
  - bffCall `updateMenuItemCmd` [command] uses updateMenuItem `cafeFlow.menuManagement.updateMenuItemCmd`
  - section `menuItemList` — Gerente visualiza, filtra e navega pelos itens do cardápio cadastrados
    - [filterControl] `listMenuItems`
    - [primarySurface] `listMenuItems`
    - [contextualAction] `updateMenuItemCmd`
  - section `createMenuItemSection` — Gerente preenche o formulário para cadastrar um novo item no cardápio
    - [primarySurface] `createMenuItemCmd`
- `stockManagement` (operation, StockItem): Controlar estoque — Gerente mantém o cadastro de insumos, revisa alertas de estoque baixo e registra ajustes manuais de saldo.
  - bffCall `listStockItems` [query] uses browseStockItems `cafeFlow.stockManagement.listStockItems`
  - bffCall `addStockItem` [command] uses createStockItem `cafeFlow.stockManagement.addStockItem`
  - bffCall `editStockItem` [command] uses updateStockItem `cafeFlow.stockManagement.editStockItem`
  - bffCall `removeStockItem` [command] uses deleteStockItem `cafeFlow.stockManagement.removeStockItem`
  - bffCall `registerStockAdjustment` [command] uses createStockAdjustment `cafeFlow.stockManagement.registerStockAdjustment`
  - section `stockItemList` — Gerente visualiza e filtra a lista de insumos, identificando itens com estoque baixo
    - [filterControl] `listStockItems`
    - [primarySurface] `listStockItems`
    - [contextualAction] `editStockItem`
    - [contextualAction] `removeStockItem`
    - [contextualAction] `registerStockAdjustment`
  - section `createStockItemSection` — Gerente cadastra um novo insumo informando nome, unidade, saldo inicial e nível mínimo
    - [primarySurface] `addStockItem`
- `shiftWorkspace` (workflow, DailyShift) — workflow `dailyShiftLifecycle`: Turno diário — Gerente abre o turno do dia, acompanha a operação e fecha o turno gerando o relatório de fechamento.
  - bffCall `openDailyShiftCmd` [command] uses openDailyShift `cafeFlow.shiftWorkspace.openDailyShiftCmd`
  - bffCall `closeDailyShiftCmd` [command] uses closeDailyShift `cafeFlow.shiftWorkspace.closeDailyShiftCmd`
  - bffCall `getShiftClosingReport` [query] uses viewShiftClosingReport `cafeFlow.shiftWorkspace.getShiftClosingReport`
  - section `openShiftSection` — Gerente preenche os dados e abre o turno do dia
    - [primarySurface] `openDailyShiftCmd`
  - section `closeShiftSection` — Gerente informa os totais de fechamento e confirma o encerramento do turno
    - [primarySurface] `closeDailyShiftCmd`
    - [detailPanel] `getShiftClosingReport`
- `dashboardWorkspace` (operation, OperationalDashboard): Dashboard operacional e IA — Gerente acompanha indicadores do turno corrente, consulta o resumo de vendas gerado por IA e obtém sugestões de itens a promover.
  - bffCall `getDashboard` [query] uses viewOperationalDashboard `cafeFlow.dashboardWorkspace.getDashboard`
  - bffCall `getAiSalesSummary` [query] uses generateAiSalesSummary `cafeFlow.dashboardWorkspace.getAiSalesSummary`
  - bffCall `getAiPromotionSuggestions` [query] uses generateAiPromotionSuggestions `cafeFlow.dashboardWorkspace.getAiPromotionSuggestions`
  - section `kpiOverview` — Gerente visualiza os indicadores-chave do turno corrente: total de vendas, pedidos, itens vendidos e alertas de estoque.
    - [primarySurface] `getDashboard`
  - section `topSellingItems` — Gerente confere os itens mais vendidos do turno em ordem de quantidade.
    - [primarySurface] `getDashboard` slice `topSellingItems`
  - section `stockAlerts` — Gerente identifica itens com estoque baixo ou em ruptura para tomar ação imediata.
    - [primarySurface] `getDashboard` slice `lowStockAlerts`
  - section `aiSalesSummary` — Gerente solicita e lê o resumo narrativo de vendas do dia gerado pela IA.
    - [primarySurface] `getAiSalesSummary`
  - section `aiPromotionSuggestions` — Gerente consulta as sugestões de itens a promover geradas pela IA, com justificativa, confiança e desconto sugerido.
    - [primarySurface] `getAiPromotionSuggestions`

## Landings

- atendente → `posWorkspace` — O atendente começa o dia lançando pedidos no POS.
- cozinheiro → `kitchenWorkspace` — O cozinheiro abre diretamente a fila da cozinha do turno em andamento.
- gerente → `dashboardWorkspace` — O gerente começa pelo dashboard operacional para ter visão geral do turno corrente.

## Navigation edges (advisory)

- `posWorkspace` → `kitchenWorkspace` via `updateOrderStatus` — Pedido confirmado no POS aparece na fila da cozinha para preparo.
- `kitchenWorkspace` → `posWorkspace` via `updateOrderStatus` — Cozinheiro sinaliza pedido pronto; atendente vê status atualizado na lista de pedidos abertos.
- `shiftWorkspace` → `dashboardWorkspace` via `openDailyShift` — Após abrir o turno, gerente acessa o dashboard operacional para monitorar o dia.
- `dashboardWorkspace` → `shiftWorkspace` via `closeDailyShift` — Do dashboard, gerente navega para fechar o turno e gerar o relatório.
- `dashboardWorkspace` → `menuManagement` — Gerente age sobre insights de IA atualizando itens do cardápio.
- `dashboardWorkspace` → `stockManagement` — Gerente age sobre alertas de estoque baixo exibidos no dashboard.
- `menuManagement` → `stockManagement` via `updateMenuItem` — Ao vincular ingredientes ao item do cardápio, gerente navega para o controle de estoque.
