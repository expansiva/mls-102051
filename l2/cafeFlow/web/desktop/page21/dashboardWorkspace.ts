/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/dashboardWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowDashboardWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.js';
import type {
  GetDashboardOutput,
  GetAiSalesSummaryOutput,
  GetAiPromotionSuggestionsOutput,
} from '/_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.js';

type TopSellingItem = {
  menuItemId?: string;
  menuItemName?: string;
  quantity?: number;
  totalQuantity?: number;
  menuItemQuantity?: number;
};

type LowStockAlertItem = {
  menuItemId?: string;
  menuItemName?: string;
  currentStockLevel?: number;
  minStockLevel?: number;
  status?: string;
  isOutOfStock?: boolean;
};

@customElement('cafe-flow--web--desktop--page21--dashboard-workspace-102051')
export class CafeFlowDesktopPage21DashboardWorkspacePage extends CafeFlowDashboardWorkspaceBase {
  render() {
    const dashboardLoading = this.getDashboardState === 'loading';
    const dashboardError = this.getDashboardState === 'error';
    const dashboardReady = this.getDashboardState === 'success' && this.getDashboardData !== null;
    const dashboard: GetDashboardOutput | null = this.getDashboardData;

    const formatNumber = (value: unknown): string => {
      if (value === null || value === undefined || value === '') return '—';
      const num = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(num)) {
        return new Intl.NumberFormat('pt-BR').format(num);
      }
      return String(value);
    };

    const formatCurrency = (value: unknown): string => {
      if (value === null || value === undefined || value === '') return '—';
      const num = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(num)) {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
      }
      return String(value);
    };

    const formatPercent = (value: unknown): string => {
      if (value === null || value === undefined || value === '') return '—';
      const num = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(num)) {
        return `${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 1 }).format(num)}%`;
      }
      return String(value);
    };

    const formatDateTime = (value: unknown): string => {
      if (value === null || value === undefined || value === '') return '—';
      const raw = String(value);
      const date = new Date(raw);
      if (!Number.isNaN(date.getTime())) {
        return new Intl.DateTimeFormat('pt-BR', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(date);
      }
      return raw;
    };

    const topSellingItems: TopSellingItem[] = Array.isArray(
      (dashboard as { topSellingItems?: unknown } | null)?.topSellingItems,
    )
      ? ((dashboard as { topSellingItems: TopSellingItem[] }).topSellingItems as TopSellingItem[])
      : [];

    const lowStockAlerts: LowStockAlertItem[] = Array.isArray(
      (dashboard as { lowStockAlerts?: unknown } | null)?.lowStockAlerts,
    )
      ? ((dashboard as { lowStockAlerts: LowStockAlertItem[] }).lowStockAlerts as LowStockAlertItem[])
      : [];

    const aiSummary: GetAiSalesSummaryOutput | null = this.getAiSalesSummaryData;
    const aiSummaryLoading = this.getAiSalesSummaryState === 'loading';
    const aiSummaryError = this.getAiSalesSummaryState === 'error';
    const aiSummarySuccess = this.getAiSalesSummaryState === 'success' && aiSummary !== null;

    const promotions: GetAiPromotionSuggestionsOutput[] = Array.isArray(
      this.getAiPromotionSuggestionsData,
    )
      ? this.getAiPromotionSuggestionsData
      : [];
    const promotionsLoading = this.getAiPromotionSuggestionsState === 'loading';
    const promotionsError = this.getAiPromotionSuggestionsState === 'error';
    const promotionsSuccess = this.getAiPromotionSuggestionsState === 'success';

    const aiActionsEnabled = dashboardReady && !dashboardLoading;
    const hasLowStockAlert = Boolean(
      dashboard && (dashboard as { hasLowStockAlert?: boolean }).hasLowStockAlert,
    );

    return html`
      <div class="min-h-full w-full bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)]">
        <div class="mx-auto flex w-full max-w-7xl flex-col gap-6 p-4 md:p-6">
          <!-- KPI overview -->
          <section class="flex flex-col gap-4" aria-labelledby="sec-kpi-overview">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h1
                id="sec-kpi-overview"
                class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]"
              >
                ${this.msg['section.dashboardWorkspace.sec-kpi-overview.title']}
              </h1>
              <button
                type="button"
                class="min-h-12 rounded-lg px-5 py-3 text-base font-medium bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#cbd5e1)] disabled:opacity-60"
                ?disabled=${dashboardLoading}
                @click=${this.handleGetDashboardClick}
              >
                ${dashboardLoading
                  ? 'Carregando…'
                  : this.msg['organism.dashboardWorkspace.getDashboard.title']}
              </button>
            </div>

            ${dashboardLoading
              ? html`
                  <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                    ${[0, 1, 2, 3, 4, 5].map(
                      () => html`
                        <div
                          class="h-28 animate-pulse rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"
                        ></div>
                      `,
                    )}
                  </div>
                `
              : nothing}

            ${dashboardError
              ? html`
                  <div
                    class="rounded-lg border border-[var(--ds-color-status-error-bg,#fecaca)] bg-[var(--ds-color-status-error-bg,#fef2f2)] px-4 py-3 text-[var(--ds-color-status-error-text,#991b1b)]"
                    role="alert"
                  >
                    <!-- TODO: feedback.errorMessageKey not in MessageType -->
                    Não foi possível carregar o dashboard operacional.
                  </div>
                `
              : nothing}

            ${dashboardReady && dashboard
              ? html`
                  <div class="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                    <article
                      class="flex min-h-28 flex-col justify-between rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm"
                    >
                      <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal.label']}
                      </p>
                      <p class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                        ${formatCurrency((dashboard as { todaySalesTotal?: unknown }).todaySalesTotal)}
                      </p>
                    </article>

                    <article
                      class="flex min-h-28 flex-col justify-between rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm"
                    >
                      <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount.label']}
                      </p>
                      <p class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                        ${formatNumber((dashboard as { todayOrdersCount?: unknown }).todayOrdersCount)}
                      </p>
                    </article>

                    <article
                      class="flex min-h-28 flex-col justify-between rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm"
                    >
                      <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold.label']}
                      </p>
                      <p class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                        ${formatNumber((dashboard as { todayItemsSold?: unknown }).todayItemsSold)}
                      </p>
                    </article>

                    <article
                      class="flex min-h-28 flex-col justify-between rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm ${hasLowStockAlert
                        ? 'ring-2 ring-[var(--ds-color-status-warning-text,#b45309)]'
                        : ''}"
                    >
                      <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert.label']}
                      </p>
                      <p
                        class="text-lg font-semibold ${hasLowStockAlert
                          ? 'text-[var(--ds-color-status-warning-text,#b45309)]'
                          : 'text-[var(--ds-color-status-success-text,#166534)]'}"
                      >
                        ${hasLowStockAlert ? 'Alerta ativo' : 'Sem alertas'}
                      </p>
                    </article>

                    <article
                      class="flex min-h-28 flex-col justify-between rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm"
                    >
                      <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount.label']}
                      </p>
                      <p class="text-2xl font-semibold text-[var(--ds-color-status-warning-text,#b45309)]">
                        ${formatNumber((dashboard as { lowStockItemsCount?: unknown }).lowStockItemsCount)}
                      </p>
                    </article>

                    <article
                      class="flex min-h-28 flex-col justify-between rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm"
                    >
                      <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount.label']}
                      </p>
                      <p class="text-2xl font-semibold text-[var(--ds-color-status-error-text,#991b1b)]">
                        ${formatNumber((dashboard as { outOfStockItemsCount?: unknown }).outOfStockItemsCount)}
                      </p>
                    </article>
                  </div>

                  <div
                    class="flex flex-wrap gap-4 text-sm text-[var(--ds-color-text-muted,#64748b)]"
                  >
                    <span>
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.referenceDate.label']}:
                      ${formatDateTime((dashboard as { referenceDate?: unknown }).referenceDate)}
                    </span>
                    <span>
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt.label']}:
                      ${formatDateTime((dashboard as { lastComputedAt?: unknown }).lastComputedAt)}
                    </span>
                    <span>
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label']}:
                      ${formatNumber((dashboard as { topMenuItemQuantity?: unknown }).topMenuItemQuantity)}
                    </span>
                  </div>
                `
              : !dashboardLoading && !dashboardError
                ? html`
                    <div
                      class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] px-4 py-8 text-center text-[var(--ds-color-text-muted,#64748b)]"
                    >
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                    </div>
                  `
                : nothing}
          </section>

          <!-- Stock alerts -->
          <section class="flex flex-col gap-3" aria-labelledby="sec-stock-alerts">
            <h2
              id="sec-stock-alerts"
              class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]"
            >
              ${this.msg['section.dashboardWorkspace.sec-stock-alerts.title']}
            </h2>

            ${dashboardLoading
              ? html`
                  <div
                    class="h-24 animate-pulse rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"
                  ></div>
                `
              : nothing}

            ${dashboardReady
              ? lowStockAlerts.length > 0
                ? html`
                    <ul class="flex flex-col gap-2">
                      ${lowStockAlerts.map((alert: LowStockAlertItem, index: number) => {
                        const outOfStock =
                          alert.isOutOfStock === true ||
                          (typeof alert.currentStockLevel === 'number' && alert.currentStockLevel <= 0) ||
                          (typeof alert.status === 'string' &&
                            alert.status.toLowerCase().includes('out'));
                        return html`
                          <li
                            class="flex min-h-14 flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 ${outOfStock
                              ? 'border-[var(--ds-color-status-error-bg,#fecaca)] bg-[var(--ds-color-status-error-bg,#fef2f2)]'
                              : 'border-[var(--ds-color-status-warning-bg,#fde68a)] bg-[var(--ds-color-status-warning-bg,#fffbeb)]'}"
                          >
                            <div class="flex min-w-0 flex-col gap-0.5">
                              <span
                                class="truncate font-medium ${outOfStock
                                  ? 'text-[var(--ds-color-status-error-text,#991b1b)]'
                                  : 'text-[var(--ds-color-status-warning-text,#b45309)]'}"
                              >
                                ${alert.menuItemName ?? alert.menuItemId ?? `Item ${index + 1}`}
                              </span>
                              ${alert.status
                                ? html`<span class="text-sm text-[var(--ds-color-text-muted,#64748b)]"
                                    >${alert.status}</span
                                  >`
                                : nothing}
                            </div>
                            <div class="flex items-center gap-4 text-sm">
                              ${alert.currentStockLevel !== undefined && alert.currentStockLevel !== null
                                ? html`
                                    <span class="font-semibold">
                                      ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel.label']}:
                                      ${formatNumber(alert.currentStockLevel)}
                                    </span>
                                  `
                                : nothing}
                              <span
                                class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${outOfStock
                                  ? 'bg-[var(--ds-color-status-error-bg,#fecaca)] text-[var(--ds-color-status-error-text,#991b1b)]'
                                  : 'bg-[var(--ds-color-status-warning-bg,#fde68a)] text-[var(--ds-color-status-warning-text,#b45309)]'}"
                              >
                                ${outOfStock ? 'Ruptura' : 'Estoque baixo'}
                              </span>
                            </div>
                          </li>
                        `;
                      })}
                    </ul>
                  `
                : html`
                    <div
                      class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] px-4 py-6 text-[var(--ds-color-text-muted,#64748b)]"
                    >
                      ${hasLowStockAlert
                        ? html`
                            <span>
                              ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount.label']}:
                              ${formatNumber((dashboard as { lowStockItemsCount?: unknown } | null)?.lowStockItemsCount)}
                              ·
                              ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount.label']}:
                              ${formatNumber((dashboard as { outOfStockItemsCount?: unknown } | null)?.outOfStockItemsCount)}
                            </span>
                          `
                        : this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                    </div>
                  `
              : !dashboardLoading
                ? html`
                    <div
                      class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] px-4 py-6 text-[var(--ds-color-text-muted,#64748b)]"
                    >
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                    </div>
                  `
                : nothing}
          </section>

          <!-- Top selling items -->
          <section class="flex flex-col gap-3" aria-labelledby="sec-top-selling">
            <h2
              id="sec-top-selling"
              class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]"
            >
              ${this.msg['section.dashboardWorkspace.sec-top-selling.title']}
            </h2>

            ${dashboardLoading
              ? html`
                  <div
                    class="h-32 animate-pulse rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"
                  ></div>
                `
              : nothing}

            ${dashboardReady
              ? topSellingItems.length > 0
                ? html`
                    <div
                      class="overflow-x-auto rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)]"
                    >
                      <table class="min-w-full text-left text-sm">
                        <thead class="bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] text-[var(--ds-color-text-muted,#64748b)]">
                          <tr>
                            <th class="px-4 py-3 font-medium">#</th>
                            <th class="px-4 py-3 font-medium">
                              ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemName.label']}
                            </th>
                            <th class="px-4 py-3 font-medium">
                              ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${topSellingItems.map((item: TopSellingItem, index: number) => {
                            const qty =
                              item.quantity ?? item.totalQuantity ?? item.menuItemQuantity ?? null;
                            return html`
                              <tr class="border-t border-[var(--ds-color-border-subtle,#e2e8f0)]">
                                <td class="px-4 py-3 text-[var(--ds-color-text-muted,#64748b)]">
                                  ${index + 1}
                                </td>
                                <td class="px-4 py-3 font-medium text-[var(--ds-color-text-strong,#020617)]">
                                  ${item.menuItemName ?? item.menuItemId ?? '—'}
                                </td>
                                <td class="px-4 py-3">${formatNumber(qty)}</td>
                              </tr>
                            `;
                          })}
                        </tbody>
                      </table>
                    </div>
                  `
                : html`
                    <div
                      class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] px-4 py-6 text-[var(--ds-color-text-muted,#64748b)]"
                    >
                      ${dashboard &&
                      (dashboard as { topMenuItemId?: string }).topMenuItemId
                        ? html`
                            <div class="flex flex-col gap-1">
                              <span class="font-medium text-[var(--ds-color-text-strong,#020617)]">
                                ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId.label']}:
                                ${(dashboard as { topMenuItemId?: string }).topMenuItemId}
                              </span>
                              <span>
                                ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label']}:
                                ${formatNumber((dashboard as { topMenuItemQuantity?: unknown }).topMenuItemQuantity)}
                              </span>
                              <span>
                                ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount.label']}:
                                ${formatNumber((dashboard as { topSellingItemsCount?: unknown }).topSellingItemsCount)}
                              </span>
                            </div>
                          `
                        : this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                    </div>
                  `
              : !dashboardLoading
                ? html`
                    <div
                      class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] px-4 py-6 text-[var(--ds-color-text-muted,#64748b)]"
                    >
                      ${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                    </div>
                  `
                : nothing}
          </section>

          <!-- AI sales summary -->
          <section class="flex flex-col gap-3" aria-labelledby="sec-ai-sales-summary">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2
                id="sec-ai-sales-summary"
                class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]"
              >
                ${this.msg['section.dashboardWorkspace.sec-ai-sales-summary.title']}
              </h2>
              <button
                type="button"
                class="min-h-12 rounded-lg px-5 py-3 text-base font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${!aiActionsEnabled || aiSummaryLoading}
                @click=${this.handleGetAiSalesSummaryClick}
              >
                ${aiSummaryLoading
                  ? 'Gerando resumo…'
                  : this.msg['organism.dashboardWorkspace.getAiSalesSummary.title']}
              </button>
            </div>

            ${!aiActionsEnabled
              ? html`
                  <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    <!-- TODO: await dashboard before enabling AI actions -->
                    Carregue o dashboard do turno para gerar o resumo com IA.
                  </p>
                `
              : nothing}

            ${aiSummaryError
              ? html`
                  <div
                    class="rounded-lg border border-[var(--ds-color-status-error-bg,#fecaca)] bg-[var(--ds-color-status-error-bg,#fef2f2)] px-4 py-3 text-[var(--ds-color-status-error-text,#991b1b)]"
                    role="alert"
                  >
                    <!-- TODO: feedback.errorMessageKey not in MessageType -->
                    Não foi possível gerar o resumo de vendas com IA.
                  </div>
                `
              : nothing}

            ${aiSummaryLoading
              ? html`
                  <div
                    class="h-36 animate-pulse rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"
                  ></div>
                `
              : nothing}

            ${aiSummarySuccess && aiSummary
              ? html`
                  <article
                    class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-5 shadow-sm"
                  >
                    <h3 class="mb-2 text-sm font-medium text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryText.label']}
                    </h3>
                    <div
                      class="whitespace-pre-wrap text-base leading-relaxed text-[var(--ds-color-text-default,#0f172a)]"
                    >
                      ${(aiSummary as { summaryText?: string }).summaryText ??
                      this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.empty']}
                    </div>
                    <div
                      class="mt-4 flex flex-wrap gap-4 text-xs text-[var(--ds-color-text-muted,#64748b)]"
                    >
                      <span>
                        ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryDate.label']}:
                        ${formatDateTime((aiSummary as { summaryDate?: unknown }).summaryDate)}
                      </span>
                      <span>
                        ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.generatedAt.label']}:
                        ${formatDateTime((aiSummary as { generatedAt?: unknown }).generatedAt)}
                      </span>
                      <span>
                        ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.periodStart.label']}:
                        ${formatDateTime((aiSummary as { periodStart?: unknown }).periodStart)}
                      </span>
                      <span>
                        ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.periodEnd.label']}:
                        ${formatDateTime((aiSummary as { periodEnd?: unknown }).periodEnd)}
                      </span>
                    </div>
                  </article>
                `
              : !aiSummaryLoading && !aiSummaryError && aiActionsEnabled
                ? html`
                    <div
                      class="rounded-lg border border-dashed border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] px-4 py-8 text-center text-[var(--ds-color-text-muted,#64748b)]"
                    >
                      ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.empty']}
                    </div>
                  `
                : nothing}
          </section>

          <!-- AI promotion suggestions -->
          <section class="flex flex-col gap-3" aria-labelledby="sec-ai-promotions">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2
                id="sec-ai-promotions"
                class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]"
              >
                ${this.msg['section.dashboardWorkspace.sec-ai-promotion-suggestions.title']}
              </h2>
              <button
                type="button"
                class="min-h-12 rounded-lg px-5 py-3 text-base font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${!aiActionsEnabled || promotionsLoading}
                @click=${this.handleGetAiPromotionSuggestionsClick}
              >
                ${promotionsLoading
                  ? 'Gerando sugestões…'
                  : this.msg['organism.dashboardWorkspace.getAiPromotionSuggestions.title']}
              </button>
            </div>

            ${!aiActionsEnabled
              ? html`
                  <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    <!-- TODO: await dashboard before enabling AI actions -->
                    Carregue o dashboard do turno para solicitar sugestões de promoção.
                  </p>
                `
              : nothing}

            ${promotionsError
              ? html`
                  <div
                    class="rounded-lg border border-[var(--ds-color-status-error-bg,#fecaca)] bg-[var(--ds-color-status-error-bg,#fef2f2)] px-4 py-3 text-[var(--ds-color-status-error-text,#991b1b)]"
                    role="alert"
                  >
                    <!-- TODO: feedback.errorMessageKey not in MessageType -->
                    Não foi possível gerar as sugestões de promoção com IA.
                  </div>
                `
              : nothing}

            ${promotionsLoading
              ? html`
                  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    ${[0, 1, 2].map(
                      () => html`
                        <div
                          class="h-44 animate-pulse rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"
                        ></div>
                      `,
                    )}
                  </div>
                `
              : nothing}

            ${promotionsSuccess && promotions.length > 0
              ? html`
                  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    ${promotions.map((promo: GetAiPromotionSuggestionsOutput) => {
                      const row = promo as GetAiPromotionSuggestionsOutput & {
                        menuItemName?: string;
                        reason?: string;
                        confidenceScore?: number;
                        suggestedDiscountPercent?: number;
                        salesLast7Days?: number;
                        salesToday?: number;
                        currentStockLevel?: number;
                        status?: string;
                        generatedAt?: string;
                        expiresAt?: string;
                      };
                      const confidence = row.confidenceScore;
                      const confidenceHigh =
                        typeof confidence === 'number' && confidence >= 0.7;
                      return html`
                        <article
                          class="flex min-h-44 flex-col gap-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm"
                        >
                          <div class="flex items-start justify-between gap-2">
                            <h3 class="text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                              ${row.menuItemName ??
                              this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuItemName.label']}
                            </h3>
                            ${row.status
                              ? html`
                                  <span
                                    class="shrink-0 rounded-full bg-[var(--ds-color-status-info-bg,#dbeafe)] px-2 py-0.5 text-xs font-medium text-[var(--ds-color-status-info-text,#1e40af)]"
                                  >
                                    ${row.status}
                                  </span>
                                `
                              : nothing}
                          </div>

                          <p class="flex-1 text-sm leading-relaxed text-[var(--ds-color-text-default,#0f172a)]">
                            <span class="font-medium text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.reason.label']}:
                            </span>
                            ${row.reason ?? '—'}
                          </p>

                          <div class="grid grid-cols-2 gap-2 text-sm">
                            <div
                              class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] px-3 py-2 ${confidenceHigh
                                ? 'ring-1 ring-[var(--ds-color-status-success-text,#166534)]'
                                : ''}"
                            >
                              <p class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.confidenceScore.label']}
                              </p>
                              <p class="font-semibold text-[var(--ds-color-text-strong,#020617)]">
                                ${typeof confidence === 'number'
                                  ? formatPercent(confidence <= 1 ? confidence * 100 : confidence)
                                  : '—'}
                              </p>
                            </div>
                            <div
                              class="rounded-md bg-[var(--ds-color-selected-bg,#eff6ff)] px-3 py-2"
                            >
                              <p class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.suggestedDiscountPercent.label']}
                              </p>
                              <p class="font-semibold text-[var(--ds-color-selected-text,#1d4ed8)]">
                                ${formatPercent(row.suggestedDiscountPercent)}
                              </p>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] px-3 py-2">
                              <p class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesToday.label']}
                              </p>
                              <p class="font-medium">${formatNumber(row.salesToday)}</p>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] px-3 py-2">
                              <p class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel.label']}
                              </p>
                              <p class="font-medium">${formatNumber(row.currentStockLevel)}</p>
                            </div>
                          </div>

                          <div class="flex flex-wrap gap-3 text-xs text-[var(--ds-color-text-muted,#64748b)]">
                            <span>
                              ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesLast7Days.label']}:
                              ${formatNumber(row.salesLast7Days)}
                            </span>
                            ${row.expiresAt
                              ? html`
                                  <span>
                                    ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.expiresAt.label']}:
                                    ${formatDateTime(row.expiresAt)}
                                  </span>
                                `
                              : nothing}
                          </div>
                        </article>
                      `;
                    })}
                  </div>
                `
              : promotionsSuccess && promotions.length === 0
                ? html`
                    <div
                      class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] px-4 py-8 text-center text-[var(--ds-color-text-muted,#64748b)]"
                    >
                      ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.empty']}
                    </div>
                  `
                : !promotionsLoading && !promotionsError && aiActionsEnabled
                  ? html`
                      <div
                        class="rounded-lg border border-dashed border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] px-4 py-8 text-center text-[var(--ds-color-text-muted,#64748b)]"
                      >
                        ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.empty']}
                      </div>
                    `
                  : nothing}
          </section>
        </div>
      </div>
    `;
  }
}
