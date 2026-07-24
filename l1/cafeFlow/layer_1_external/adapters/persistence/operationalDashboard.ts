/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/operationalDashboard.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const operationalDashboardTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowOperationalDashboard',
  tableName: 'operational_dashboard',
  purpose: 'controle',
  description:
    'Dashboard operacional do turno. Métricas e campos não indexados em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'operational_dashboard_id', postgresType: 'UUID' },
    { name: 'daily_shift_id', postgresType: 'UUID' },
    { name: 'top_menu_item_id', postgresType: 'UUID', nullable: true },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['operational_dashboard_id'],
  indexes: [
    { name: 'idx_operational_dashboard_daily_shift_id', columns: ['daily_shift_id'] },
    { name: 'idx_operational_dashboard_top_menu_item_id', columns: ['top_menu_item_id'] },
    { name: 'idx_operational_dashboard_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
