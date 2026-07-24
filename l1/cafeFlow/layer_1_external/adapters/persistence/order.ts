/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/order.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const orderTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowOrder',
  tableName: 'order',
  purpose: 'transacao',
  description: 'Pedidos. Itens e campos não indexados em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'order_id', postgresType: 'UUID' },
    { name: 'daily_shift_id', postgresType: 'UUID' },
    { name: 'order_type', postgresType: 'TEXT' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['order_id'],
  indexes: [
    { name: 'idx_order_daily_shift_id', columns: ['daily_shift_id'] },
    { name: 'idx_order_order_type', columns: ['order_type'] },
    { name: 'idx_order_status', columns: ['status'] },
    { name: 'idx_order_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
