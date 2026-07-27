/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/dashboardWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowDashboardWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.js';
import type { GetDashboardOutput, GetAiSalesSummaryOutput, GetAiPromotionSuggestionsOutput } from '/_102051_/l2/cafeFlow/web/shared/dashboardWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--dashboard-workspace-102051')
export class CafeFlowDesktopPage11DashboardWorkspacePage extends CafeFlowDashboardWorkspaceBase {
  render() {
    const dashboard = this.getDashboardData;
    const topSellingItems = dashboard?.topSellingItems ?? [];
    const lowStockAlerts = dashboard?.lowStockAlerts ?? [];
    const aiSummary = this.getAiSalesSummaryData;
    const promoSuggestions: GetAiPromotionSuggestionsOutput[] = this.getAiPromotionSuggestionsData ?? [];

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
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.filter.dailyShiftId.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                  .value=${this.getDashboardDailyShiftId}
                  @input=${(e: Event) => this.handleGetDashboardDailyShiftIdChange(e)}
                />
              </label>
              <button
                type="button"
                class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${this.getDashboardState === 'loading'}
                @click=${(e: Event) => this.handleGetDashboardClick(e)}
              >
                ${this.getDashboardState === 'loading'
                  ? html`<span class="inline-flex items-center gap-2">… ${this.msg['organism.dashboardWorkspace.getDashboard.title']}</span>`
                  : this.msg['organism.dashboardWorkspace.getDashboard.title']}
              </button>
            </div>

            ${this.getDashboardState === 'loading'
              ? html`<div class="animate-pulse space-y-3">
                  <div class="h-20 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div class="h-16 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-16 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-16 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-16 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                  </div>
                </div>`
              : dashboard
                ? html`
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todaySalesTotal.label']}</div>
                        <div class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${dashboard.todaySalesTotal}</div>
                      </div>
                      <div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todayOrdersCount.label']}</div>
                        <div class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${dashboard.todayOrdersCount}</div>
                      </div>
                      <div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.todayItemsSold.label']}</div>
                        <div class="text-xl font-semibold text-[var(--text-strong,#0f172a)]">${dashboard.todayItemsSold}</div>
                      </div>
                      <div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] p-3 ${dashboard.hasLowStockAlert ? 'bg-[var(--status-warning-bg,#fef3c7)]' : 'bg-[var(--surface-alt-bg,#f8fafc)]'}">
                        <div class="text-xs text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.hasLowStockAlert.label']}</div>
                        <div class="text-xl font-semibold ${dashboard.hasLowStockAlert ? 'text-[var(--status-warning-text,#92400e)]' : 'text-[var(--text-strong,#0f172a)]'}">
                          ${dashboard.hasLowStockAlert ? '!' : '—'}
                          <span class="text-sm font-normal ml-1">${dashboard.lowStockItemsCount}/${dashboard.outOfStockItemsCount}</span>
                        </div>
                      </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                      <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.referenceDate.label']}:</span> ${dashboard.referenceDate}</div>
                      <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.dailyShiftId.label']}:</span> ${dashboard.dailyShiftId}</div>
                      <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.lastComputedAt.label']}:</span> ${dashboard.lastComputedAt}</div>
                      <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemId.label']}:</span> ${dashboard.topMenuItemId}</div>
                      <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topMenuItemQuantity.label']}:</span> ${dashboard.topMenuItemQuantity}</div>
                      <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topSellingItemsCount.label']}:</span> ${dashboard.topSellingItemsCount}</div>
                    </div>
                  `
                : html`<p class="text-sm text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}</p>`}
          </section>

          <!-- Top selling items -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.dashboardWorkspace.sec-top-selling.title']}
            </h2>
            ${this.getDashboardState === 'loading'
              ? html`<div class="h-24 rounded animate-pulse bg-[var(--surface-alt-bg,#f1f5f9)]"></div>`
              : topSellingItems.length > 0
                ? html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm border-collapse">
                        <thead>
                          <tr class="border-b border-[var(--border-default,#e2e8f0)] text-left text-[var(--text-muted,#64748b)]">
                            <th class="py-2 pr-3 font-medium">${this.msg['intent.dashboardWorkspace.getDashboard.list.column.topSellingItems.label']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${topSellingItems.map(
                            (item: unknown, index: number) => html`
                              <tr class="border-b border-[var(--border-subtle,#e2e8f0)]">
                                <td class="py-2 pr-3">${typeof item === 'object' && item !== null ? JSON.stringify(item) : String(item ?? index)}</td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `
                : html`<p class="text-sm text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}</p>`}
          </section>

          <!-- Stock alerts -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.dashboardWorkspace.sec-stock-alerts.title']}
            </h2>
            ${this.getDashboardState === 'loading'
              ? html`<div class="h-24 rounded animate-pulse bg-[var(--surface-alt-bg,#f1f5f9)]"></div>`
              : lowStockAlerts.length > 0
                ? html`
                    <ul class="space-y-2">
                      ${lowStockAlerts.map(
                        (alert: unknown, index: number) => html`
                          <li class="rounded border border-[var(--status-warning-bg,#fef3c7)] bg-[var(--status-warning-bg,#fef3c7)] px-3 py-2 text-sm text-[var(--status-warning-text,#92400e)]">
                            ${typeof alert === 'object' && alert !== null ? JSON.stringify(alert) : String(alert ?? index)}
                          </li>
                        `,
                      )}
                    </ul>
                  `
                : html`<p class="text-sm text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getDashboard.list.empty']}</p>`}
          </section>

          <!-- AI Sales Summary -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.dashboardWorkspace.sec-ai-sales-summary.title']}
            </h2>
            <div class="flex flex-wrap items-end gap-3">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.operationalDashboardId.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                  .value=${this.getAiSalesSummaryOperationalDashboardId}
                  @input=${(e: Event) => this.handleGetAiSalesSummaryOperationalDashboardIdChange(e)}
                />
              </label>
              <button
                type="button"
                class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${this.getAiSalesSummaryState === 'loading'}
                @click=${(e: Event) => this.handleGetAiSalesSummaryClick(e)}
              >
                ${this.getAiSalesSummaryState === 'loading'
                  ? html`<span class="inline-flex items-center gap-2">… ${this.msg['organism.dashboardWorkspace.getAiSalesSummary.title']}</span>`
                  : this.msg['organism.dashboardWorkspace.getAiSalesSummary.title']}
              </button>
            </div>
            ${this.getAiSalesSummaryState === 'loading'
              ? html`<div class="h-28 rounded animate-pulse bg-[var(--surface-alt-bg,#f1f5f9)]"></div>`
              : aiSummary
                ? html`
                    <div class="space-y-2 text-sm">
                      <div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 prose max-w-none">
                        <div class="text-xs text-[var(--text-muted,#64748b)] mb-1">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryText.label']}</div>
                        <p class="text-[var(--text-default,#0f172a)] whitespace-pre-wrap">${aiSummary.summaryText}</p>
                      </div>
                      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.summaryDate.label']}:</span> ${aiSummary.summaryDate}</div>
                        <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.periodStart.label']}:</span> ${aiSummary.periodStart}</div>
                        <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.periodEnd.label']}:</span> ${aiSummary.periodEnd}</div>
                        <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.modelId.label']}:</span> ${aiSummary.modelId}</div>
                        <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.promptTokens.label']}:</span> ${aiSummary.promptTokens}</div>
                        <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.completionTokens.label']}:</span> ${aiSummary.completionTokens}</div>
                        <div><span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.column.generatedAt.label']}:</span> ${aiSummary.generatedAt}</div>
                      </div>
                    </div>
                  `
                : html`<p class="text-sm text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiSalesSummary.list.empty']}</p>`}
          </section>

          <!-- AI Promotion Suggestions -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-3">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.dashboardWorkspace.sec-ai-promotion-suggestions.title']}
            </h2>
            <div class="flex flex-wrap items-end gap-3">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.operationalDashboardId.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                  .value=${this.getAiPromotionSuggestionsOperationalDashboardId}
                  @input=${(e: Event) => this.handleGetAiPromotionSuggestionsOperationalDashboardIdChange(e)}
                />
              </label>
              <button
                type="button"
                class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${this.getAiPromotionSuggestionsState === 'loading'}
                @click=${(e: Event) => this.handleGetAiPromotionSuggestionsClick(e)}
              >
                ${this.getAiPromotionSuggestionsState === 'loading'
                  ? html`<span class="inline-flex items-center gap-2">… ${this.msg['organism.dashboardWorkspace.getAiPromotionSuggestions.title']}</span>`
                  : this.msg['organism.dashboardWorkspace.getAiPromotionSuggestions.title']}
              </button>
            </div>
            ${this.getAiPromotionSuggestionsState === 'loading'
              ? html`<div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="h-32 rounded animate-pulse bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                  <div class="h-32 rounded animate-pulse bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                </div>`
              : promoSuggestions.length > 0
                ? html`
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      ${promoSuggestions.map(
                        (item: GetAiPromotionSuggestionsOutput) => html`
                          <article class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-3 space-y-2">
                            <div class="flex items-start justify-between gap-2">
                              <h3 class="font-semibold text-[var(--text-strong,#0f172a)]">${item.menuItemName}</h3>
                              <span class="text-xs rounded px-2 py-0.5 bg-[var(--status-info-bg,#e0f2fe)] text-[var(--status-info-text,#075985)]">${item.status}</span>
                            </div>
                            <p class="text-sm text-[var(--text-default,#0f172a)]">${item.reason}</p>
                            <div class="grid grid-cols-2 gap-1 text-xs text-[var(--text-muted,#64748b)]">
                              <div>${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesLast7Days.label']}: ${item.salesLast7Days}</div>
                              <div>${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.salesToday.label']}: ${item.salesToday}</div>
                              <div>${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.currentStockLevel.label']}: ${item.currentStockLevel}</div>
                              <div>${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.confidenceScore.label']}: ${item.confidenceScore}</div>
                              <div>${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.suggestedDiscountPercent.label']}: ${item.suggestedDiscountPercent}%</div>
                              <div>${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.generatedAt.label']}: ${item.generatedAt}</div>
                              <div>${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.column.expiresAt.label']}: ${item.expiresAt}</div>
                            </div>
                          </article>
                        `,
                      )}
                    </div>
                  `
                : html`<p class="text-sm text-[var(--text-muted,#64748b)]">${this.msg['intent.dashboardWorkspace.getAiPromotionSuggestions.list.empty']}</p>`}
          </section>
        </div>
      </div>
    `;
  }
}
