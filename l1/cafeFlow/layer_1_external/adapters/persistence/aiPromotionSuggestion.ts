/// <mls fileReference="_102051_/l1/cafeFlow/layer_1_external/adapters/persistence/aiPromotionSuggestion.ts" enhancement="_blank"/>
import type { TableDefinition } from '/_102034_/l1/server/layer_1_external/persistence/contracts.js';

export const aiPromotionSuggestionTableDef: TableDefinition = {
  moduleId: 'cafeFlow',
  repositoryName: 'cafeFlowAiPromotionSuggestion',
  tableName: 'ai_promotion_suggestion',
  purpose: 'transacao',
  description:
    'Sugestões de promoção geradas por IA. Campos não indexados em details (JSONB).',
  backupHot: false,
  storageProfile: 'postgres',
  writeMode: 'sync',
  columns: [
    { name: 'ai_promotion_suggestion_id', postgresType: 'UUID' },
    { name: 'operational_dashboard_id', postgresType: 'UUID' },
    { name: 'menu_item_id', postgresType: 'UUID' },
    { name: 'menu_category_id', postgresType: 'UUID', nullable: true },
    { name: 'status', postgresType: 'TEXT' },
    { name: 'reviewed_by_user_id', postgresType: 'UUID', nullable: true },
    { name: 'created_at', postgresType: 'TIMESTAMPTZ', defaultSql: 'NOW()' },
    { name: 'details', postgresType: 'JSONB', nullable: true },
  ],
  primaryKey: ['ai_promotion_suggestion_id'],
  indexes: [
    {
      name: 'idx_ai_promotion_suggestion_operational_dashboard_id',
      columns: ['operational_dashboard_id'],
    },
    {
      name: 'idx_ai_promotion_suggestion_menu_item_id',
      columns: ['menu_item_id'],
    },
    {
      name: 'idx_ai_promotion_suggestion_menu_category_id',
      columns: ['menu_category_id'],
    },
    {
      name: 'idx_ai_promotion_suggestion_status',
      columns: ['status'],
    },
    {
      name: 'idx_ai_promotion_suggestion_reviewed_by_user_id',
      columns: ['reviewed_by_user_id'],
    },
    {
      name: 'idx_ai_promotion_suggestion_created_at',
      columns: ['created_at'],
    },
  ],
  version: 1,
};
