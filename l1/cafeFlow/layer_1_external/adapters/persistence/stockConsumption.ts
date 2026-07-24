/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockConsumption.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const stockConsumptionTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowStockConsumption',
  tableName: 'stock_consumption',
  purpose: 'controle',
  description:
    'Consumo de estoque. Campos não indexados em details (JSONB). Append-only com retenção.',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'stock_consumption_id', postgresType: 'UUID' },
    { name: 'order_id', postgresType: 'UUID' },
    { name: 'stock_item_id', postgresType: 'UUID' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['stock_consumption_id'],
  indexes: [
    { name: 'idx_stock_consumption_order_id', columns: ['order_id'] },
    { name: 'idx_stock_consumption_stock_item_id', columns: ['stock_item_id'] },
    { name: 'idx_stock_consumption_status', columns: ['status'] },
    { name: 'idx_stock_consumption_created_at', columns: ['created_at'] },
  ],
  retentionDays: 365,
  version: 1,
};
