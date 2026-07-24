/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/registerRepositories.ts" enhancement="_blank"/>

// Composition root — generated deterministically by agentCbRegister; do not edit by hand.
// The 102034 moduleRegistry imports this file through the persistenceModules[].tableDefsDir
// config link before loading the module controllers, so usecases can resolveRepository().
import { registerRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import { createAiPromotionSuggestionRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestionRepositoryAdapter.js';
import { createAiSalesSummaryRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummaryRepositoryAdapter.js';
import { createDailyShiftRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/dailyShiftRepositoryAdapter.js';
import { createOperationalDashboardRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboardRepositoryAdapter.js';
import { createOrderRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/orderRepositoryAdapter.js';
import { createShiftClosingReportRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/shiftClosingReportRepositoryAdapter.js';
import { createStockAdjustmentRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustmentRepositoryAdapter.js';
import { createStockConsumptionRepositoryAdapter } from '/_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumptionRepositoryAdapter.js';

registerRepository('AiPromotionSuggestion', createAiPromotionSuggestionRepositoryAdapter);
registerRepository('AiSalesSummary', createAiSalesSummaryRepositoryAdapter);
registerRepository('DailyShift', createDailyShiftRepositoryAdapter);
registerRepository('OperationalDashboard', createOperationalDashboardRepositoryAdapter);
registerRepository('Order', createOrderRepositoryAdapter);
registerRepository('ShiftClosingReport', createShiftClosingReportRepositoryAdapter);
registerRepository('StockAdjustment', createStockAdjustmentRepositoryAdapter);
registerRepository('StockConsumption', createStockConsumptionRepositoryAdapter);
