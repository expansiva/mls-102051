/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/dashboardWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowDashboardWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.js';
import type {
  GetDashboardOutput,
  GetAiSalesSummaryOutput,
  GetAiPromotionSuggestionsOutput,
} from '/_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.js';

type TopSellingItem = NonNullable<GetDashboardOutput['topSellingItems']>[number];
type LowStockAlert = NonNullable<GetDashboardOutput['lowStockAlerts']>[number];

@customElement('cafe-flow--web--desktop--page21--dashboard-workspace-102051')
export class CafeFlowDesktopPage21DashboardWorkspacePage extends CafeFlowDashboardWorkspaceBase {
  render() {
    const dashboard = this.getDashboardData;
    const dashboardLoading = this.getDashboardState === 'loading';
    const dashboardError = this.getDashboardState === 'error';
    const dashboardReady = this.getDashboardState === 'success' && dashboard !== null;

    const topSellingItems: TopSellingItem[] = dashboard?.topSellingItems ?? [];
    const lowStockAlerts: LowStockAlert[] = dashboard?.lowStockAlerts ?? [];

    const aiSummary = this.getAiSalesSummaryData;
    const aiSummaryLoading = this.getAiSalesSummaryState === 'loading';
    const aiSummaryError = this.getAiSalesSummaryState === 'error';
    const aiSummarySuccess = this.getAiSalesSummaryState === 'success' && aiSummary !== null;

    const aiPromotions: GetAiPromotionSuggestionsOutput[] = this.getAiPromotionSuggestionsData ?? [];
    const aiPromotionsLoading = this.getAiPromotionSuggestionsState === 'loading';
    const aiPromotionsError = this.getAiPromotionSuggestionsState === 'error';
    const aiPromotionsSuccess = this.getAiPromotionSuggestionsState === 'success';

    const operationalDashboardId = dashboard?.operationalDashboardId ?? '';

    const formatMoney = (value: unknown): string => {
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      if (value === null || value === undefined || value === '') return '—';
      return String(value);
    };

    const formatNumber = (value: unknown): string => {
      if (typeof value === 'number' && Number.isFinite(value)) {
        return value.toLocaleString();
      }
      if (value === null || value === undefined || value === '') return '—';
      return String(value);
    };

    const formatBool = (value: unknown): string => {
      if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
      if (value === null || value === undefined || value === '') return '—';
      return String(value);
    };

    const readItemField = (item: object, keys: string[]): string => {
      for (const key of keys) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          const raw = (item as Record<string, unknown>)[key];
          if (raw !== null && raw !== undefined && raw !== '') {
            return String(raw);
          }
        }
      }
      return '—';
    };

    const onGenerateAiSalesSummary = (event: Event): void => {
      if (operationalDashboardId) {
        this.setGetAiSalesSummaryOperationalDashboardId(operationalDashboardId);
      }
      this.handleGetAiSalesSummaryClick(event);
    };

    const onGenerateAiPromotions = (event: Event): void => {
      if (operationalDashboardId) {
        this.setGetAiPromotionSuggestionsOperationalDashboardId(operationalDashboardId);
      }
      this.handleGetAiPromotionSuggestionsClick(event);
    };

    return html`
      <div class="min-h-full w-full p-4 md:p-6 space-y-6 bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)]">
        <!-- 1. KPIs do turno (summary-first) -->
        <section class="space-y-3" aria-labelledby="sec-kpi-overview">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h1 id="sec-kpi-overview" class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['section.dashboardWorkspace.sec-kpi-overview.title']}
            </h1>
            <div class="flex flex-wrap items-center gap-2">
              ${dashboard?.referenceDate
                ? html`<span class="inline-flex items-center rounded-md px-3 py-1 text-sm bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] text-[var(--ds-color-text-muted,#64748b)] border border-[var(--ds-color-border-subtle,#e2e8f0)]">
                    ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.referenceDate.label']}: ${dashboard.referenceDate}
                  </span>`
                : null}
              ${dashboard?.lastComputedAt
                ? html`<span class="inline-flex items-center rounded-md px-3 py-1 text-sm bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] text-[var(--ds-color-text-muted,#64748b)] border border-[var(--ds-color-border-subtle,#e2e8f0)]">
                    ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt.label']}: ${dashboard.lastComputedAt}
                  </span>`
                : null}
              <button
                type="button"
                class="min-h-11 px-4 py-2 rounded-lg text-sm font-medium bg-[var(--ds-color-button-secondary-bg,#f8fafc)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#e2e8f0)] disabled:opacity-60"
                ?disabled=${dashboardLoading}
                @click=${(e: Event) => this.handleGetDashboardClick(e)}
              >
                ${dashboardLoading
                  ? 'Carregando…'
                  : this.msg['organism.dashboardWorkspace.getDashboard.title']}
              </button>
            </div>
          </div>

          ${dashboardLoading
            ? html`
                <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3" aria-busy="true">
                  ${[0, 1, 2, 3, 4, 5].map(
                    () => html`
                      <div class="h-24 rounded-lg animate-pulse bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] border border-[var(--ds-color-border-subtle,#e2e8f0)]"></div>
                    `,
                  )}
                </div>
              `
            : null}

          ${dashboardError
            ? html`
                <div class="rounded-lg px-4 py-3 bg-[var(--ds-color-status-error-bg,#fef2f2)] text-[var(--ds-color-status-error-text,#b91c1c)] border border-[var(--ds-color-border-default,#e2e8f0)]" role="alert">
                  <!-- TODO: missing feedback.errorMessageKey for getDashboard -->
                  Não foi possível carregar o dashboard operacional.
                </div>
              `
            : null}

          ${!dashboardLoading && !dashboardReady && !dashboardError
            ? html`
                <div class="rounded-lg px-4 py-6 text-center bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                </div>
              `
            : null}

          ${dashboardReady && dashboard
            ? html`
                <div class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
                  <div class="rounded-lg p-4 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] shadow-sm">
                    <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal.label']}
                    </div>
                    <div class="mt-2 text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                      ${formatMoney(dashboard.todaySalesTotal)}
                    </div>
                  </div>
                  <div class="rounded-lg p-4 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] shadow-sm">
                    <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount.label']}
                    </div>
                    <div class="mt-2 text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                      ${formatNumber(dashboard.todayOrdersCount)}
                    </div>
                  </div>
                  <div class="rounded-lg p-4 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] shadow-sm">
                    <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold.label']}
                    </div>
                    <div class="mt-2 text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                      ${formatNumber(dashboard.todayItemsSold)}
                    </div>
                  </div>
                  <div class="rounded-lg p-4 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] shadow-sm ${dashboard.hasLowStockAlert ? 'ring-2 ring-[var(--ds-color-status-warning-text,#b45309)]' : ''}">
                    <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert.label']}
                    </div>
                    <div class="mt-2 text-2xl font-semibold ${dashboard.hasLowStockAlert ? 'text-[var(--ds-color-status-warning-text,#b45309)]' : 'text-[var(--ds-color-status-success-text,#15803d)]'}">
                      ${formatBool(dashboard.hasLowStockAlert)}
                    </div>
                  </div>
                  <div class="rounded-lg p-4 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] shadow-sm">
                    <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount.label']}
                    </div>
                    <div class="mt-2 text-2xl font-semibold ${Number(dashboard.lowStockItemsCount) > 0 ? 'text-[var(--ds-color-status-warning-text,#b45309)]' : 'text-[var(--ds-color-text-strong,#020617)]'}">
                      ${formatNumber(dashboard.lowStockItemsCount)}
                    </div>
                  </div>
                  <div class="rounded-lg p-4 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] shadow-sm">
                    <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount.label']}
                    </div>
                    <div class="mt-2 text-2xl font-semibold ${Number(dashboard.outOfStockItemsCount) > 0 ? 'text-[var(--ds-color-status-error-text,#b91c1c)]' : 'text-[var(--ds-color-text-strong,#020617)]'}">
                      ${formatNumber(dashboard.outOfStockItemsCount)}
                    </div>
                  </div>
                </div>

                <div class="flex flex-wrap gap-3 text-sm text-[var(--ds-color-text-muted,#64748b)]">
                  <span>
                    ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label']}:
                    <strong class="text-[var(--ds-color-text-default,#0f172a)]">${formatNumber(dashboard.topMenuItemQuantity)}</strong>
                  </span>
                  <span>
                    ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount.label']}:
                    <strong class="text-[var(--ds-color-text-default,#0f172a)]">${formatNumber(dashboard.topSellingItemsCount)}</strong>
                  </span>
                </div>
              `
            : null}
        </section>

        <!-- 2. Alertas de estoque -->
        <section class="space-y-3" aria-labelledby="sec-stock-alerts">
          <h2 id="sec-stock-alerts" class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.dashboardWorkspace.sec-stock-alerts.title']}
          </h2>

          ${dashboardLoading
            ? html`
                <div class="space-y-2" aria-busy="true">
                  ${[0, 1, 2].map(
                    () => html`<div class="h-16 rounded-lg animate-pulse bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] border border-[var(--ds-color-border-subtle,#e2e8f0)]"></div>`,
                  )}
                </div>
              `
            : lowStockAlerts.length === 0
              ? html`
                  <div class="rounded-lg px-4 py-6 text-center bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] text-[var(--ds-color-text-muted,#64748b)]">
                    ${dashboardReady
                      ? html`<span class="text-[var(--ds-color-status-success-text,#15803d)]">Sem alertas de estoque no turno.</span>`
                      : this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                  </div>
                `
              : html`
                  <ul class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 list-none p-0 m-0">
                    ${lowStockAlerts.map((alert: LowStockAlert, index: number) => {
                      const alertObj = alert as object;
                      const name = readItemField(alertObj, ['menuItemName', 'itemName', 'name', 'stockItemName']);
                      const level = readItemField(alertObj, ['currentStockLevel', 'stockLevel', 'quantity', 'availableQuantity']);
                      const status = readItemField(alertObj, ['status', 'alertLevel', 'severity']);
                      const isOut =
                        status.toLowerCase().includes('out') ||
                        status.toLowerCase().includes('ruptura') ||
                        level === '0';
                      return html`
                        <li
                          class="rounded-lg p-4 border shadow-sm bg-[var(--ds-color-surface-bg,#ffffff)] ${isOut
                            ? 'border-[var(--ds-color-status-error-text,#b91c1c)] bg-[var(--ds-color-status-error-bg,#fef2f2)]'
                            : 'border-[var(--ds-color-status-warning-text,#b45309)] bg-[var(--ds-color-status-warning-bg,#fffbeb)]'}"
                        >
                          <div class="flex items-start justify-between gap-2">
                            <div class="font-medium text-[var(--ds-color-text-strong,#020617)]">${name}</div>
                            <span class="text-xs font-semibold uppercase px-2 py-1 rounded-md ${isOut
                              ? 'bg-[var(--ds-color-status-error-bg,#fef2f2)] text-[var(--ds-color-status-error-text,#b91c1c)]'
                              : 'bg-[var(--ds-color-status-warning-bg,#fffbeb)] text-[var(--ds-color-status-warning-text,#b45309)]'}">
                              ${status !== '—' ? status : isOut ? 'Ruptura' : 'Baixo'}
                            </span>
                          </div>
                          <div class="mt-2 text-sm text-[var(--ds-color-text-muted,#64748b)]">
                            ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.lowStockAlerts.label']}
                            · #${index + 1}
                            ${level !== '—'
                              ? html` · ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel.label']}: ${level}`
                              : null}
                          </div>
                        </li>
                      `;
                    })}
                  </ul>
                `}
        </section>

        <!-- 3. Itens mais vendidos -->
        <section class="space-y-3" aria-labelledby="sec-top-selling">
          <h2 id="sec-top-selling" class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.dashboardWorkspace.sec-top-selling.title']}
          </h2>

          ${dashboardLoading
            ? html`
                <div class="rounded-lg overflow-hidden border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)]" aria-busy="true">
                  <div class="h-12 animate-pulse bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                  <div class="h-12 animate-pulse bg-[var(--ds-color-surface-bg,#ffffff)]"></div>
                  <div class="h-12 animate-pulse bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                </div>
              `
            : topSellingItems.length === 0
              ? html`
                  <div class="rounded-lg px-4 py-6 text-center bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] text-[var(--ds-color-text-muted,#64748b)]">
                    ${dashboardReady
                      ? this.msg['intent.dashboardWorkspace.getDashboard.list.column.topSellingItems.label'] + ' — vazio'
                      : this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                  </div>
                `
              : html`
                  <div class="rounded-lg overflow-hidden border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)]">
                    <table class="w-full text-left text-sm">
                      <thead class="bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] text-[var(--ds-color-text-muted,#64748b)]">
                        <tr>
                          <th class="px-4 py-3 font-medium">#</th>
                          <th class="px-4 py-3 font-medium">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topSellingItems.label']}</th>
                          <th class="px-4 py-3 font-medium text-right">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label']}</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${topSellingItems.map((item: TopSellingItem, index: number) => {
                          const itemObj = item as object;
                          const name = readItemField(itemObj, ['menuItemName', 'itemName', 'name', 'topMenuItemId', 'menuItemId']);
                          const qty = readItemField(itemObj, ['quantity', 'topMenuItemQuantity', 'soldQuantity', 'itemsSold']);
                          return html`
                            <tr class="border-t border-[var(--ds-color-border-subtle,#e2e8f0)]">
                              <td class="px-4 py-3 text-[var(--ds-color-text-muted,#64748b)]">${index + 1}</td>
                              <td class="px-4 py-3 font-medium text-[var(--ds-color-text-strong,#020617)]">${name}</td>
                              <td class="px-4 py-3 text-right font-semibold text-[var(--ds-color-text-default,#0f172a)]">${qty}</td>
                            </tr>
                          `;
                        })}
                      </tbody>
                    </table>
                  </div>
                `}
        </section>

        <!-- 4. Resumo de vendas (IA) -->
        <section class="space-y-3" aria-labelledby="sec-ai-sales-summary">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 id="sec-ai-sales-summary" class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['section.dashboardWorkspace.sec-ai-sales-summary.title']}
            </h2>
            <button
              type="button"
              class="min-h-12 px-5 py-3 rounded-lg text-base font-semibold bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
              ?disabled=${aiSummaryLoading || !operationalDashboardId}
              @click=${(e: Event) => onGenerateAiSalesSummary(e)}
            >
              ${aiSummaryLoading
                ? 'Gerando resumo…'
                : this.msg['organism.dashboardWorkspace.getAiSalesSummary.title']}
            </button>
          </div>

          ${aiSummaryLoading
            ? html`
                <div class="rounded-lg p-6 space-y-3 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)]" aria-busy="true">
                  <div class="h-4 w-1/3 rounded animate-pulse bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                  <div class="h-4 w-full rounded animate-pulse bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                  <div class="h-4 w-5/6 rounded animate-pulse bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                  <div class="h-4 w-2/3 rounded animate-pulse bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                </div>
              `
            : null}

          ${aiSummaryError
            ? html`
                <div class="rounded-lg px-4 py-3 bg-[var(--ds-color-status-error-bg,#fef2f2)] text-[var(--ds-color-status-error-text,#b91c1c)] border border-[var(--ds-color-border-default,#e2e8f0)]" role="alert">
                  <!-- TODO: missing feedback.errorMessageKey for getAiSalesSummary -->
                  Não foi possível gerar o resumo de vendas por IA.
                  <button
                    type="button"
                    class="ml-3 underline text-sm"
                    @click=${(e: Event) => onGenerateAiSalesSummary(e)}
                  >
                    Tentar novamente
                  </button>
                </div>
              `
            : null}

          ${aiSummarySuccess && aiSummary
            ? html`
                <div class="rounded-lg p-5 space-y-3 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] shadow-sm">
                  <div class="flex flex-wrap gap-3 text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${aiSummary.summaryDate
                      ? html`<span>${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryDate.label']}: <strong class="text-[var(--ds-color-text-default,#0f172a)]">${aiSummary.summaryDate}</strong></span>`
                      : null}
                    ${aiSummary.periodStart || aiSummary.periodEnd
                      ? html`<span>
                          ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.periodStart.label']}:
                          <strong class="text-[var(--ds-color-text-default,#0f172a)]">${aiSummary.periodStart ?? '—'}</strong>
                          →
                          ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.periodEnd.label']}:
                          <strong class="text-[var(--ds-color-text-default,#0f172a)]">${aiSummary.periodEnd ?? '—'}</strong>
                        </span>`
                      : null}
                    ${aiSummary.generatedAt
                      ? html`<span>${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.generatedAt.label']}: <strong class="text-[var(--ds-color-text-default,#0f172a)]">${aiSummary.generatedAt}</strong></span>`
                      : null}
                  </div>
                  <div class="rounded-md p-4 bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] border border-[var(--ds-color-border-subtle,#e2e8f0)]">
                    <div class="text-xs uppercase tracking-wide mb-2 text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryText.label']}
                    </div>
                    <p class="text-base leading-relaxed whitespace-pre-wrap text-[var(--ds-color-text-default,#0f172a)] m-0">
                      ${aiSummary.summaryText ?? '—'}
                    </p>
                  </div>
                  <div class="text-sm text-[var(--ds-color-status-success-text,#15803d)]" role="status">
                    <!-- TODO: missing feedback.successMessageKey for getAiSalesSummary -->
                    Resumo gerado com sucesso.
                  </div>
                </div>
              `
            : !aiSummaryLoading && !aiSummaryError
              ? html`
                  <div class="rounded-lg px-4 py-6 text-center bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] text-[var(--ds-color-text-muted,#64748b)]">
                    ${!operationalDashboardId
                      ? html`Carregue o dashboard do turno para habilitar o resumo por IA.`
                      : this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.empty']}
                  </div>
                `
              : null}
        </section>

        <!-- 5. Sugestões de promoção (IA) — card-board -->
        <section class="space-y-3" aria-labelledby="sec-ai-promotion-suggestions">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <h2 id="sec-ai-promotion-suggestions" class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['section.dashboardWorkspace.sec-ai-promotion-suggestions.title']}
            </h2>
            <button
              type="button"
              class="min-h-12 px-5 py-3 rounded-lg text-base font-semibold bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
              ?disabled=${aiPromotionsLoading || !operationalDashboardId}
              @click=${(e: Event) => onGenerateAiPromotions(e)}
            >
              ${aiPromotionsLoading
                ? 'Gerando sugestões…'
                : this.msg['organism.dashboardWorkspace.getAiPromotionSuggestions.title']}
            </button>
          </div>

          ${aiPromotionsLoading
            ? html`
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3" aria-busy="true">
                  ${[0, 1, 2].map(
                    () => html`<div class="h-40 rounded-lg animate-pulse bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] border border-[var(--ds-color-border-subtle,#e2e8f0)]"></div>`,
                  )}
                </div>
              `
            : null}

          ${aiPromotionsError
            ? html`
                <div class="rounded-lg px-4 py-3 bg-[var(--ds-color-status-error-bg,#fef2f2)] text-[var(--ds-color-status-error-text,#b91c1c)] border border-[var(--ds-color-border-default,#e2e8f0)]" role="alert">
                  <!-- TODO: missing feedback.errorMessageKey for getAiPromotionSuggestions -->
                  Não foi possível gerar as sugestões de promoção por IA.
                  <button
                    type="button"
                    class="ml-3 underline text-sm"
                    @click=${(e: Event) => onGenerateAiPromotions(e)}
                  >
                    Tentar novamente
                  </button>
                </div>
              `
            : null}

          ${aiPromotionsSuccess && aiPromotions.length === 0
            ? html`
                <div class="rounded-lg px-4 py-6 text-center bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.empty']}
                </div>
              `
            : null}

          ${!aiPromotionsLoading && !aiPromotionsError && aiPromotions.length === 0 && !aiPromotionsSuccess
            ? html`
                <div class="rounded-lg px-4 py-6 text-center bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] text-[var(--ds-color-text-muted,#64748b)]">
                  ${!operationalDashboardId
                    ? html`Carregue o dashboard do turno para habilitar as sugestões por IA.`
                    : this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.empty']}
                </div>
              `
            : null}

          ${aiPromotions.length > 0
            ? html`
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                  ${aiPromotions.map((suggestion: GetAiPromotionSuggestionsOutput) => {
                    const confidence =
                      typeof suggestion.confidenceScore === 'number'
                        ? suggestion.confidenceScore
                        : Number(suggestion.confidenceScore);
                    const confidenceLabel = Number.isFinite(confidence)
                      ? `${Math.round(confidence * (confidence <= 1 ? 100 : 1))}%`
                      : String(suggestion.confidenceScore ?? '—');
                    const discount =
                      suggestion.suggestedDiscountPercent !== null &&
                      suggestion.suggestedDiscountPercent !== undefined
                        ? `${suggestion.suggestedDiscountPercent}%`
                        : '—';
                    const statusValue =
                      suggestion.status !== null && suggestion.status !== undefined && suggestion.status !== ''
                        ? String(suggestion.status)
                        : '—';
                    return html`
                      <article class="rounded-lg p-4 flex flex-col gap-3 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] shadow-sm">
                        <div class="flex items-start justify-between gap-2">
                          <h3 class="text-lg font-semibold m-0 text-[var(--ds-color-text-strong,#020617)]">
                            ${suggestion.menuItemName ?? '—'}
                          </h3>
                          <span class="shrink-0 text-xs font-medium px-2 py-1 rounded-md bg-[var(--ds-color-status-info-bg,#eff6ff)] text-[var(--ds-color-status-info-text,#1d4ed8)]">
                            ${statusValue}
                          </span>
                        </div>
                        <p class="text-sm m-0 leading-relaxed text-[var(--ds-color-text-default,#0f172a)]">
                          <span class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)] block mb-1">
                            ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.reason.label']}
                          </span>
                          ${suggestion.reason ?? '—'}
                        </p>
                        <div class="grid grid-cols-2 gap-2 text-sm mt-auto">
                          <div class="rounded-md px-3 py-2 bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]">
                            <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.confidenceScore.label']}
                            </div>
                            <div class="font-semibold text-[var(--ds-color-text-strong,#020617)]">${confidenceLabel}</div>
                          </div>
                          <div class="rounded-md px-3 py-2 bg-[var(--ds-color-selected-bg,#eff6ff)] border border-[var(--ds-color-selected-border,#93c5fd)]">
                            <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.suggestedDiscountPercent.label']}
                            </div>
                            <div class="font-semibold text-[var(--ds-color-selected-text,#1e40af)]">${discount}</div>
                          </div>
                          <div class="rounded-md px-3 py-2 bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]">
                            <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesToday.label']}
                            </div>
                            <div class="font-semibold text-[var(--ds-color-text-default,#0f172a)]">${formatNumber(suggestion.salesToday)}</div>
                          </div>
                          <div class="rounded-md px-3 py-2 bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]">
                            <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel.label']}
                            </div>
                            <div class="font-semibold text-[var(--ds-color-text-default,#0f172a)]">${formatNumber(suggestion.currentStockLevel)}</div>
                          </div>
                        </div>
                        ${suggestion.generatedAt || suggestion.expiresAt
                          ? html`
                              <div class="text-xs text-[var(--ds-color-text-muted,#64748b)] flex flex-wrap gap-2">
                                ${suggestion.generatedAt
                                  ? html`<span>${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.generatedAt.label']}: ${suggestion.generatedAt}</span>`
                                  : null}
                                ${suggestion.expiresAt
                                  ? html`<span>${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.expiresAt.label']}: ${suggestion.expiresAt}</span>`
                                  : null}
                              </div>
                            `
                          : null}
                      </article>
                    `;
                  })}
                </div>
                ${aiPromotionsSuccess
                  ? html`
                      <div class="text-sm text-[var(--ds-color-status-success-text,#15803d)]" role="status">
                        <!-- TODO: missing feedback.successMessageKey for getAiPromotionSuggestions -->
                        Sugestões geradas com sucesso.
                      </div>
                    `
                  : null}
              `
            : null}
        </section>
      </div>
    `;
  }
}
