/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/dailyShift.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const dailyShiftTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowDailyShift',
  tableName: 'daily_shift',
  purpose: 'transacao',
  description:
    'Turnos diários. Campos não indexados e coleções embutidas em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'daily_shift_id', postgresType: 'UUID' },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'opened_by_user_id', postgresType: 'UUID' },
    { name: 'closed_by_user_id', postgresType: 'UUID', nullable: true },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['daily_shift_id'],
  indexes: [
    { name: 'idx_daily_shift_status', columns: ['status'] },
    { name: 'idx_daily_shift_opened_by_user_id', columns: ['opened_by_user_id'] },
    { name: 'idx_daily_shift_closed_by_user_id', columns: ['closed_by_user_id'] },
    { name: 'idx_daily_shift_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
