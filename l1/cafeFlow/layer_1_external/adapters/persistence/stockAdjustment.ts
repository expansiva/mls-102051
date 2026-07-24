/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/stockAdjustment.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const stockAdjustmentTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowStockAdjustment',
  tableName: 'stock_adjustment',
  purpose: 'controle',
  description:
    'Ajustes de estoque (append-only). Campos não indexados e coleções embutidas em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'stock_adjustment_id', postgresType: 'UUID' },
    { name: 'stock_item_id', postgresType: 'UUID' },
    { name: 'direction', postgresType: 'TEXT' },
    { name: 'reason', postgresType: 'TEXT' },
    { name: 'manager_user_id', postgresType: 'UUID' },
    { name: 'shift_id', postgresType: 'UUID', nullable: true },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'voided_by_user_id', postgresType: 'UUID', nullable: true },
    { name: 'compensating_adjustment_id', postgresType: 'UUID', nullable: true },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['stock_adjustment_id'],
  indexes: [
    { name: 'idx_stock_adjustment_stock_item_id', columns: ['stock_item_id'] },
    { name: 'idx_stock_adjustment_direction', columns: ['direction'] },
    { name: 'idx_stock_adjustment_reason', columns: ['reason'] },
    { name: 'idx_stock_adjustment_manager_user_id', columns: ['manager_user_id'] },
    { name: 'idx_stock_adjustment_shift_id', columns: ['shift_id'] },
    { name: 'idx_stock_adjustment_status', columns: ['status'] },
    { name: 'idx_stock_adjustment_created_at', columns: ['created_at'] },
    { name: 'idx_stock_adjustment_voided_by_user_id', columns: ['voided_by_user_id'] },
    { name: 'idx_stock_adjustment_compensating_adjustment_id', columns: ['compensating_adjustment_id'] },
  ],
  retentionDays: 1825,
  version: 1,
};
