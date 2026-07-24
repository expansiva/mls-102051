/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/dashboardWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowDashboardWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.js';
import type {
  GetAiPromotionSuggestionsOutput,
} from '/_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--dashboard-workspace-102051')
export class CafeFlowDesktopPage11DashboardWorkspacePage extends CafeFlowDashboardWorkspaceBase {
  render() {
    const dashboard = this.getDashboardData;
    const topSellingItems = dashboard?.topSellingItems ?? [];
    const lowStockAlerts = dashboard?.lowStockAlerts ?? [];
    const aiSummary = this.getAiSalesSummaryData;
    const promotionSuggestions: GetAiPromotionSuggestionsOutput[] =
      this.getAiPromotionSuggestionsData ?? [];

    const dashboardLoading = this.getDashboardState === 'loading';
    const aiSummaryLoading = this.getAiSalesSummaryState === 'loading';
    const promotionsLoading = this.getAiPromotionSuggestionsState === 'loading';

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.dashboardWorkspace.sec-kpi-overview.title']}
            </h1>
          </header>

          <!-- KPI Overview -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4">
            <div class="flex flex-wrap items-end gap-3">
              <label class="flex flex-col gap-1 text-sm min-w-[12rem]">
                <span class="text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                  .value=${this.getDashboardDailyShiftId ?? ''}
                  @input=${(event: Event) => this.handleGetDashboardDailyShiftIdChange(event)}
                />
              </label>
              <button
                type="button"
                class="rounded-md px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${dashboardLoading}
                @click=${(event: Event) => this.handleGetDashboardClick(event)}
              >
                ${dashboardLoading
                  ? '…'
                  : this.msg['organism.dashboardWorkspace.getDashboard.title']}
              </button>
            </div>

            ${dashboardLoading
              ? html`<div class="animate-pulse h-24 rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div>`
              : !dashboard
                ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                  </p>`
                : html`
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal.label']}
                        </div>
                        <div class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                          ${dashboard.todaySalesTotal ?? '—'}
                        </div>
                      </div>
                      <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount.label']}
                        </div>
                        <div class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                          ${dashboard.todayOrdersCount ?? '—'}
                        </div>
                      </div>
                      <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold.label']}
                        </div>
                        <div class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                          ${dashboard.todayItemsSold ?? '—'}
                        </div>
                      </div>
                      <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.lowStockItemsCount.label']}
                        </div>
                        <div class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                          ${dashboard.lowStockItemsCount ?? '—'}
                        </div>
                      </div>
                      <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.outOfStockItemsCount.label']}
                        </div>
                        <div class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                          ${dashboard.outOfStockItemsCount ?? '—'}
                        </div>
                      </div>
                      <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount.label']}
                        </div>
                        <div class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                          ${dashboard.topSellingItemsCount ?? '—'}
                        </div>
                      </div>
                      <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId.label']}
                        </div>
                        <div class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                          ${dashboard.topMenuItemId ?? '—'}
                        </div>
                      </div>
                      <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label']}
                        </div>
                        <div class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                          ${dashboard.topMenuItemQuantity ?? '—'}
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[var(--text-muted,#64748b)]">
                      <div>
                        <span class="font-medium text-[var(--text-default,#0f172a)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.referenceDate.label']}:
                        </span>
                        ${dashboard.referenceDate ?? '—'}
                      </div>
                      <div>
                        <span class="font-medium text-[var(--text-default,#0f172a)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId.label']}:
                        </span>
                        ${dashboard.dailyShiftId ?? '—'}
                      </div>
                      <div>
                        <span class="font-medium text-[var(--text-default,#0f172a)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt.label']}:
                        </span>
                        ${dashboard.lastComputedAt ?? '—'}
                      </div>
                      <div>
                        <span class="font-medium text-[var(--text-default,#0f172a)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert.label']}:
                        </span>
                        ${dashboard.hasLowStockAlert ?? '—'}
                      </div>
                      <div>
                        <span class="font-medium text-[var(--text-default,#0f172a)]">
                          ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.operationalDashboardId.label']}:
                        </span>
                        ${dashboard.operationalDashboardId ?? '—'}
                      </div>
                    </div>
                  `}

            ${this.getDashboardState === 'error'
              ? html`<div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fef2f2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm">
                  error
                </div>`
              : this.getDashboardState === 'success'
                ? html`<div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#f0fdf4)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm">
                    ok
                  </div>`
                : null}
          </section>

          <!-- Top selling items -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.dashboardWorkspace.sec-top-selling.title']}
            </h2>
            ${dashboardLoading
              ? html`<div class="animate-pulse h-20 rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div>`
              : topSellingItems.length === 0
                ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                  </p>`
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm border-collapse">
                        <thead>
                          <tr class="border-b border-[var(--border-default,#e2e8f0)] text-left text-[var(--text-muted,#64748b)]">
                            <th class="py-2 pr-3 font-medium">
                              ${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topSellingItems.label']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${topSellingItems.map(
                            (item: unknown, index: number) => html`
                              <tr class="border-b border-[var(--border-subtle,#e2e8f0)]">
                                <td class="py-2 pr-3 text-[var(--text-default,#0f172a)]">
                                  ${typeof item === 'object' && item !== null
                                    ? JSON.stringify(item)
                                    : String(item ?? index)}
                                </td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}
          </section>

          <!-- Stock alerts -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.dashboardWorkspace.sec-stock-alerts.title']}
            </h2>
            ${dashboardLoading
              ? html`<div class="animate-pulse h-20 rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div>`
              : lowStockAlerts.length === 0
                ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}
                  </p>`
                : html`
                    <ul class="space-y-2">
                      ${lowStockAlerts.map(
                        (item: unknown, index: number) => html`
                          <li
                            class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-warning-bg,#fffbeb)] text-[var(--status-warning-text,#92400e)] px-3 py-2 text-sm"
                          >
                            ${typeof item === 'object' && item !== null
                              ? JSON.stringify(item)
                              : String(item ?? index)}
                          </li>
                        `,
                      )}
                    </ul>
                  `}
          </section>

          <!-- AI Sales Summary -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.dashboardWorkspace.sec-ai-sales-summary.title']}
            </h2>
            <div class="flex flex-wrap items-end gap-3">
              <label class="flex flex-col gap-1 text-sm min-w-[12rem] flex-1">
                <span class="text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.operationalDashboardId.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                  .value=${this.getAiSalesSummaryOperationalDashboardId ?? ''}
                  @input=${(event: Event) => this.handleGetAiSalesSummaryOperationalDashboardIdChange(event)}
                />
              </label>
              <button
                type="button"
                class="rounded-md px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${aiSummaryLoading}
                @click=${(event: Event) => this.handleGetAiSalesSummaryClick(event)}
              >
                ${aiSummaryLoading
                  ? '…'
                  : this.msg['organism.dashboardWorkspace.getAiSalesSummary.title']}
              </button>
            </div>

            ${aiSummaryLoading
              ? html`<div class="animate-pulse h-28 rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div>`
              : !aiSummary
                ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.empty']}
                  </p>`
                : html`
                    <div class="space-y-2 text-sm">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-[var(--text-muted,#64748b)]">
                        <div>
                          <span class="font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryDate.label']}:
                          </span>
                          ${aiSummary.summaryDate ?? '—'}
                        </div>
                        <div>
                          <span class="font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.generatedAt.label']}:
                          </span>
                          ${aiSummary.generatedAt ?? '—'}
                        </div>
                        <div>
                          <span class="font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.periodStart.label']}:
                          </span>
                          ${aiSummary.periodStart ?? '—'}
                        </div>
                        <div>
                          <span class="font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.periodEnd.label']}:
                          </span>
                          ${aiSummary.periodEnd ?? '—'}
                        </div>
                        <div>
                          <span class="font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.modelId.label']}:
                          </span>
                          ${aiSummary.modelId ?? '—'}
                        </div>
                        <div>
                          <span class="font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.aiSalesSummaryId.label']}:
                          </span>
                          ${aiSummary.aiSalesSummaryId ?? '—'}
                        </div>
                      </div>
                      <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs font-medium text-[var(--text-muted,#64748b)] mb-1">
                          ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryText.label']}
                        </div>
                        <p class="whitespace-pre-wrap text-[var(--text-default,#0f172a)]">
                          ${aiSummary.summaryText ?? '—'}
                        </p>
                      </div>
                      <div class="flex flex-wrap gap-4 text-xs text-[var(--text-muted,#64748b)]">
                        <span>
                          ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.promptTokens.label']}:
                          ${aiSummary.promptTokens ?? '—'}
                        </span>
                        <span>
                          ${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.completionTokens.label']}:
                          ${aiSummary.completionTokens ?? '—'}
                        </span>
                      </div>
                    </div>
                  `}

            ${this.getAiSalesSummaryState === 'error'
              ? html`<div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fef2f2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm">
                  error
                </div>`
              : this.getAiSalesSummaryState === 'success'
                ? html`<div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#f0fdf4)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm">
                    ok
                  </div>`
                : null}
          </section>

          <!-- AI Promotion Suggestions -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.dashboardWorkspace.sec-ai-promotion-suggestions.title']}
            </h2>
            <div class="flex flex-wrap items-end gap-3">
              <label class="flex flex-col gap-1 text-sm min-w-[12rem] flex-1">
                <span class="text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.operationalDashboardId.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                  .value=${this.getAiPromotionSuggestionsOperationalDashboardId ?? ''}
                  @input=${(event: Event) =>
                    this.handleGetAiPromotionSuggestionsOperationalDashboardIdChange(event)}
                />
              </label>
              <button
                type="button"
                class="rounded-md px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${promotionsLoading}
                @click=${(event: Event) => this.handleGetAiPromotionSuggestionsClick(event)}
              >
                ${promotionsLoading
                  ? '…'
                  : this.msg['organism.dashboardWorkspace.getAiPromotionSuggestions.title']}
              </button>
            </div>

            ${promotionsLoading
              ? html`<div class="animate-pulse h-28 rounded-md bg-[var(--surface-alt-bg,#f1f5f9)]"></div>`
              : promotionSuggestions.length === 0
                ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.empty']}
                  </p>`
                : html`
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      ${promotionSuggestions.map(
                        (item: GetAiPromotionSuggestionsOutput) => html`
                          <article
                            class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3 space-y-2 text-sm"
                          >
                            <div class="flex items-start justify-between gap-2">
                              <h3 class="font-semibold text-[var(--text-strong,#0f172a)]">
                                ${item.menuItemName ?? item.menuItemId ?? '—'}
                              </h3>
                              <span
                                class="shrink-0 rounded px-2 py-0.5 text-xs bg-[var(--status-info-bg,#eff6ff)] text-[var(--status-info-text,#1e40af)]"
                              >
                                ${item.status ?? '—'}
                              </span>
                            </div>
                            <p class="text-[var(--text-default,#0f172a)]">${item.reason ?? '—'}</p>
                            <div class="grid grid-cols-2 gap-1 text-xs text-[var(--text-muted,#64748b)]">
                              <div>
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.confidenceScore.label']}:
                                <span class="text-[var(--text-default,#0f172a)]">${item.confidenceScore ?? '—'}</span>
                              </div>
                              <div>
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.suggestedDiscountPercent.label']}:
                                <span class="text-[var(--text-default,#0f172a)]">${item.suggestedDiscountPercent ?? '—'}</span>
                              </div>
                              <div>
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesLast7Days.label']}:
                                <span class="text-[var(--text-default,#0f172a)]">${item.salesLast7Days ?? '—'}</span>
                              </div>
                              <div>
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesToday.label']}:
                                <span class="text-[var(--text-default,#0f172a)]">${item.salesToday ?? '—'}</span>
                              </div>
                              <div>
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel.label']}:
                                <span class="text-[var(--text-default,#0f172a)]">${item.currentStockLevel ?? '—'}</span>
                              </div>
                              <div>
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.menuCategoryId.label']}:
                                <span class="text-[var(--text-default,#0f172a)]">${item.menuCategoryId ?? '—'}</span>
                              </div>
                              <div>
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.generatedAt.label']}:
                                <span class="text-[var(--text-default,#0f172a)]">${item.generatedAt ?? '—'}</span>
                              </div>
                              <div>
                                ${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.expiresAt.label']}:
                                <span class="text-[var(--text-default,#0f172a)]">${item.expiresAt ?? '—'}</span>
                              </div>
                            </div>
                          </article>
                        `,
                      )}
                    </div>
                  `}

            ${this.getAiPromotionSuggestionsState === 'error'
              ? html`<div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fef2f2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm">
                  error
                </div>`
              : this.getAiPromotionSuggestionsState === 'success'
                ? html`<div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#f0fdf4)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm">
                    ok
                  </div>`
                : null}
          </section>
        </div>
      </div>
    `;
  }
}
