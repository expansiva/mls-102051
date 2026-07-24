/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import type {
  GetDashboardInput,
  GetDashboardOutput,
  GetAiSalesSummaryInput,
  GetAiSalesSummaryOutput,
  GetAiPromotionSuggestionsInput,
  GetAiPromotionSuggestionsOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/dashboardWorkspace.js';
import {
  getDashboardRoute,
  getAiSalesSummaryRoute,
  getAiPromotionSuggestionsRoute,
} from '/_102051_/l2/cafeFlow/web/contracts/dashboardWorkspace.js';

export type {
  GetDashboardInput,
  GetDashboardOutput,
  GetAiSalesSummaryInput,
  GetAiSalesSummaryOutput,
  GetAiPromotionSuggestionsInput,
  GetAiPromotionSuggestionsOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/dashboardWorkspace.js';

/// **collab_i18n_start**
const message_pt = {
  "section.dashboardWorkspace.sec-kpi-overview.title": "Indicadores do Turno",
  "organism.dashboardWorkspace.getDashboard.title": "Ver dashboard operacional",
  "intent.dashboardWorkspace.getDashboard.list.title": "Ver dashboard operacional",
  "intent.dashboardWorkspace.getDashboard.list.empty": "Nenhum registro encontrado",
  "intent.dashboardWorkspace.getDashboard.list.column.operationalDashboardId.label": "Operational Dashboard Id",
  "intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId.label": "Daily Shift Id",
  "intent.dashboardWorkspace.getDashboard.list.column.referenceDate.label": "Reference Date",
  "intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal.label": "Today Sales Total",
  "intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount.label": "Today Orders Count",
  "intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold.label": "Today Items Sold",
  "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId.label": "Top Menu Item Id",
  "intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label": "Top Menu Item Quantity",
  "intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount.label": "Top Selling Items Count",
  "intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount.label": "Low Stock Items Count",
  "intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount.label": "Out Of Stock Items Count",
  "intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert.label": "Has Low Stock Alert",
  "intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt.label": "Last Computed At",
  "intent.dashboardWorkspace.getDashboard.list.column.topSellingItems.label": "Top Selling Items",
  "intent.dashboardWorkspace.getDashboard.list.column.lowStockAlerts.label": "Low Stock Alerts",
  "intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId.label": "Daily Shift Id",
  "section.dashboardWorkspace.sec-top-selling.title": "Itens Mais Vendidos",
  "section.dashboardWorkspace.sec-stock-alerts.title": "Alertas de Estoque",
  "section.dashboardWorkspace.sec-ai-sales-summary.title": "Resumo de Vendas (IA)",
  "organism.dashboardWorkspace.getAiSalesSummary.title": "Gerar resumo de vendas do dia (IA)",
  "intent.dashboardWorkspace.getAiSalesSummary.list.title": "Gerar resumo de vendas do dia (IA)",
  "intent.dashboardWorkspace.getAiSalesSummary.list.empty": "Nenhum registro encontrado",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.aiSalesSummaryId.label": "Ai Sales Summary Id",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.operationalDashboardId.label": "Operational Dashboard Id",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryDate.label": "Summary Date",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.periodStart.label": "Period Start",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.periodEnd.label": "Period End",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryText.label": "Summary Text",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.modelId.label": "Model Id",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.promptTokens.label": "Prompt Tokens",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.completionTokens.label": "Completion Tokens",
  "intent.dashboardWorkspace.getAiSalesSummary.list.column.generatedAt.label": "Generated At",
  "section.dashboardWorkspace.sec-ai-promotion-suggestions.title": "Sugestões de Promoção (IA)",
  "organism.dashboardWorkspace.getAiPromotionSuggestions.title": "Gerar sugestões de itens a promover (IA)",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.title": "Gerar sugestões de itens a promover (IA)",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.empty": "Nenhum registro encontrado",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.aiPromotionSuggestionId.label": "Ai Promotion Suggestion Id",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.operationalDashboardId.label": "Operational Dashboard Id",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemId.label": "Menu Item Id",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemName.label": "Menu Item Name",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuCategoryId.label": "Menu Category Id",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.reason.label": "Reason",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesLast7Days.label": "Sales Last7 Days",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesToday.label": "Sales Today",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel.label": "Current Stock Level",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.confidenceScore.label": "Confidence Score",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.suggestedDiscountPercent.label": "Suggested Discount Percent",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.status.label": "Status",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.generatedAt.label": "Generated At",
  "intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.expiresAt.label": "Expires At"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

const SUBSCRIBED_STATE_KEYS: string[] = [
  'ui.dashboardWorkspace.status',
  'ui.dashboardWorkspace.action.getDashboard.status',
  'ui.dashboardWorkspace.input.getDashboard.dailyShiftId',
  'ui.dashboardWorkspace.data.getDashboard',
  'ui.dashboardWorkspace.action.getAiSalesSummary.status',
  'ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId',
  'ui.dashboardWorkspace.data.getAiSalesSummary',
  'ui.dashboardWorkspace.action.getAiPromotionSuggestions.status',
  'ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId',
  'ui.dashboardWorkspace.data.getAiPromotionSuggestions',
];

export class CafeFlowDashboardWorkspaceBase extends CollabLitElement {
  /** state status — pageStatus */
  @property() status: string = '';

  /** state getDashboardState — actionStatus, values: idle|loading|success|error */
  @property() getDashboardState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state getDashboardDailyShiftId — input */
  @property() getDashboardDailyShiftId: string = '';

  /** state getDashboardData — queryResult, outputShape: object */
  @property() getDashboardData: GetDashboardOutput | null = null;

  /** state getAiSalesSummaryState — actionStatus, values: idle|loading|success|error */
  @property() getAiSalesSummaryState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state getAiSalesSummaryOperationalDashboardId — input */
  @property() getAiSalesSummaryOperationalDashboardId: string = '';

  /** state getAiSalesSummaryData — queryResult, outputShape: object */
  @property() getAiSalesSummaryData: GetAiSalesSummaryOutput | null = null;

  /** state getAiPromotionSuggestionsState — actionStatus, values: idle|loading|success|error */
  @property() getAiPromotionSuggestionsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  /** state getAiPromotionSuggestionsOperationalDashboardId — input */
  @property() getAiPromotionSuggestionsOperationalDashboardId: string = '';

  /** state getAiPromotionSuggestionsData — queryResult, outputShape: array */
  @property() getAiPromotionSuggestionsData: GetAiPromotionSuggestionsOutput[] = [];

  /** i18n catalog — MessageType keys are the CLOSED msg vocabulary for page renders */
  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.status = (getState('ui.dashboardWorkspace.status') as string | undefined) ?? '';
    this.getDashboardState = (getState('ui.dashboardWorkspace.action.getDashboard.status') as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
    this.getDashboardDailyShiftId = (getState('ui.dashboardWorkspace.input.getDashboard.dailyShiftId') as string | undefined) ?? '';
    this.getDashboardData = (getState('ui.dashboardWorkspace.data.getDashboard') as GetDashboardOutput | null | undefined) ?? null;
    this.getAiSalesSummaryState = (getState('ui.dashboardWorkspace.action.getAiSalesSummary.status') as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
    this.getAiSalesSummaryOperationalDashboardId = (getState('ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId') as string | undefined) ?? '';
    this.getAiSalesSummaryData = (getState('ui.dashboardWorkspace.data.getAiSalesSummary') as GetAiSalesSummaryOutput | null | undefined) ?? null;
    this.getAiPromotionSuggestionsState = (getState('ui.dashboardWorkspace.action.getAiPromotionSuggestions.status') as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
    this.getAiPromotionSuggestionsOperationalDashboardId = (getState('ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId') as string | undefined) ?? '';
    const promotionData = getState('ui.dashboardWorkspace.data.getAiPromotionSuggestions') as GetAiPromotionSuggestionsOutput[] | undefined;
    this.getAiPromotionSuggestionsData = promotionData ?? [];
    subscribe(SUBSCRIBED_STATE_KEYS, this);
  }

  disconnectedCallback(): void {
    unsubscribe(SUBSCRIBED_STATE_KEYS, this);
    super.disconnectedCallback();
  }

  /** handleIcaStateChange — collabState notify contract */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.dashboardWorkspace.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.dashboardWorkspace.action.getDashboard.status':
        this.getDashboardState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.dashboardWorkspace.input.getDashboard.dailyShiftId':
        this.getDashboardDailyShiftId = (value as string) ?? '';
        break;
      case 'ui.dashboardWorkspace.data.getDashboard':
        this.getDashboardData = (value as GetDashboardOutput | null) ?? null;
        break;
      case 'ui.dashboardWorkspace.action.getAiSalesSummary.status':
        this.getAiSalesSummaryState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId':
        this.getAiSalesSummaryOperationalDashboardId = (value as string) ?? '';
        break;
      case 'ui.dashboardWorkspace.data.getAiSalesSummary':
        this.getAiSalesSummaryData = (value as GetAiSalesSummaryOutput | null) ?? null;
        break;
      case 'ui.dashboardWorkspace.action.getAiPromotionSuggestions.status':
        this.getAiPromotionSuggestionsState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId':
        this.getAiPromotionSuggestionsOperationalDashboardId = (value as string) ?? '';
        break;
      case 'ui.dashboardWorkspace.data.getAiPromotionSuggestions':
        this.getAiPromotionSuggestionsData = (value as GetAiPromotionSuggestionsOutput[]) ?? [];
        break;
      default:
        break;
    }
    this.requestUpdate();
  }

  /** action getDashboard (query) — route cafeFlow.dashboardWorkspace.getDashboard; inputs: dailyShiftId; writes ui.dashboardWorkspace.data.getDashboard; status ui.dashboardWorkspace.action.getDashboard.status */
  async loadGetDashboard(): Promise<void> {
    this.getDashboardState = 'loading';
    setState('ui.dashboardWorkspace.action.getDashboard.status', 'loading');
    const params: GetDashboardInput = {
      dailyShiftId: this.getDashboardDailyShiftId,
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<GetDashboardOutput>(getDashboardRoute, params, options);
    if (response.ok) {
      const data = response.data ?? null;
      this.getDashboardData = data;
      setState('ui.dashboardWorkspace.data.getDashboard', data);
      this.getDashboardState = 'success';
      setState('ui.dashboardWorkspace.action.getDashboard.status', 'success');
    } else {
      console.error('getDashboard failed', response.error);
      this.getDashboardState = 'error';
      setState('ui.dashboardWorkspace.action.getDashboard.status', 'error');
    }
  }

  /** handler for action getDashboard — bind UI events here */
  handleGetDashboardClick(_event?: Event): void {
    void this.loadGetDashboard();
  }

  /** action getAiSalesSummary (query) — route cafeFlow.dashboardWorkspace.getAiSalesSummary; inputs: operationalDashboardId; writes ui.dashboardWorkspace.data.getAiSalesSummary; status ui.dashboardWorkspace.action.getAiSalesSummary.status */
  async loadGetAiSalesSummary(): Promise<void> {
    this.getAiSalesSummaryState = 'loading';
    setState('ui.dashboardWorkspace.action.getAiSalesSummary.status', 'loading');
    const params: GetAiSalesSummaryInput = {
      operationalDashboardId: this.getAiSalesSummaryOperationalDashboardId,
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<GetAiSalesSummaryOutput>(getAiSalesSummaryRoute, params, options);
    if (response.ok) {
      const data = response.data ?? null;
      this.getAiSalesSummaryData = data;
      setState('ui.dashboardWorkspace.data.getAiSalesSummary', data);
      this.getAiSalesSummaryState = 'success';
      setState('ui.dashboardWorkspace.action.getAiSalesSummary.status', 'success');
    } else {
      console.error('getAiSalesSummary failed', response.error);
      this.getAiSalesSummaryState = 'error';
      setState('ui.dashboardWorkspace.action.getAiSalesSummary.status', 'error');
    }
  }

  /** handler for action getAiSalesSummary — bind UI events here */
  handleGetAiSalesSummaryClick(_event?: Event): void {
    void this.loadGetAiSalesSummary();
  }

  /** action getAiPromotionSuggestions (query) — route cafeFlow.dashboardWorkspace.getAiPromotionSuggestions; inputs: operationalDashboardId; writes ui.dashboardWorkspace.data.getAiPromotionSuggestions; status ui.dashboardWorkspace.action.getAiPromotionSuggestions.status */
  async loadGetAiPromotionSuggestions(): Promise<void> {
    this.getAiPromotionSuggestionsState = 'loading';
    setState('ui.dashboardWorkspace.action.getAiPromotionSuggestions.status', 'loading');
    const params: GetAiPromotionSuggestionsInput = {
      operationalDashboardId: this.getAiPromotionSuggestionsOperationalDashboardId,
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<GetAiPromotionSuggestionsOutput[]>(getAiPromotionSuggestionsRoute, params, options);
    if (response.ok) {
      const data = response.data ?? [];
      this.getAiPromotionSuggestionsData = data;
      setState('ui.dashboardWorkspace.data.getAiPromotionSuggestions', data);
      this.getAiPromotionSuggestionsState = 'success';
      setState('ui.dashboardWorkspace.action.getAiPromotionSuggestions.status', 'success');
    } else {
      console.error('getAiPromotionSuggestions failed', response.error);
      this.getAiPromotionSuggestionsState = 'error';
      setState('ui.dashboardWorkspace.action.getAiPromotionSuggestions.status', 'error');
    }
  }

  /** handler for action getAiPromotionSuggestions — bind UI events here */
  handleGetAiPromotionSuggestionsClick(_event?: Event): void {
    void this.loadGetAiPromotionSuggestions();
  }

  /** setter for state ui.dashboardWorkspace.input.getDashboard.dailyShiftId */
  setGetDashboardDailyShiftId(value: string): void {
    this.getDashboardDailyShiftId = value;
    setState('ui.dashboardWorkspace.input.getDashboard.dailyShiftId', value);
    this.requestUpdate();
  }

  /** handler for action set.getDashboardDailyShiftId — bind UI events here */
  handleGetDashboardDailyShiftIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setGetDashboardDailyShiftId(value);
  }

  /** setter for state ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId */
  setGetAiSalesSummaryOperationalDashboardId(value: string): void {
    this.getAiSalesSummaryOperationalDashboardId = value;
    setState('ui.dashboardWorkspace.input.getAiSalesSummary.operationalDashboardId', value);
    this.requestUpdate();
  }

  /** handler for action set.getAiSalesSummaryOperationalDashboardId — bind UI events here */
  handleGetAiSalesSummaryOperationalDashboardIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setGetAiSalesSummaryOperationalDashboardId(value);
  }

  /** setter for state ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId */
  setGetAiPromotionSuggestionsOperationalDashboardId(value: string): void {
    this.getAiPromotionSuggestionsOperationalDashboardId = value;
    setState('ui.dashboardWorkspace.input.getAiPromotionSuggestions.operationalDashboardId', value);
    this.requestUpdate();
  }

  /** handler for action set.getAiPromotionSuggestionsOperationalDashboardId — bind UI events here */
  handleGetAiPromotionSuggestionsOperationalDashboardIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setGetAiPromotionSuggestionsOperationalDashboardId(value);
  }
}
