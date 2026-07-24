/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiSalesSummary.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const aiSalesSummaryTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowAiSalesSummary',
  tableName: 'ai_sales_summary',
  purpose: 'transacao',
  description:
    'Resumos de vendas gerados por IA. Campos não indexados e coleções embutidas em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'ai_sales_summary_id', postgresType: 'UUID' },
    { name: 'operational_dashboard_id', postgresType: 'UUID' },
    { name: 'model_id', postgresType: 'UUID' },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['ai_sales_summary_id'],
  indexes: [
    {
      name: 'idx_ai_sales_summary_operational_dashboard_id',
      columns: ['operational_dashboard_id'],
    },
    { name: 'idx_ai_sales_summary_model_id', columns: ['model_id'] },
    { name: 'idx_ai_sales_summary_created_at', columns: ['created_at'] },
  ],
  version: 1,
};
