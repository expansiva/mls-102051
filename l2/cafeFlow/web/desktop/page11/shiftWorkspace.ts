/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/shiftWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/shiftWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--shift-workspace-102051')
export class CafeFlowDesktopPage11ShiftWorkspacePage extends CafeFlowShiftWorkspaceBase {
  render() {
    const report = this.getShiftClosingReportData;
    const openLoading = this.openDailyShiftCmdState === 'loading';
    const closeLoading = this.closeDailyShiftCmdState === 'loading';
    const reportLoading = this.getShiftClosingReportState === 'loading';

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.shiftWorkspace.openShiftSection.title']}
            </h1>
          </header>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-medium text-[var(--text-strong,#0f172a)]">
              ${this.msg['organism.shiftWorkspace.openDailyShiftCmd.title']}
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.shiftDate.label']}</span>
                <input
                  type="date"
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.openDailyShiftCmdShiftDate}
                  ?disabled=${openLoading}
                  @input=${(event: Event) => this.handleOpenDailyShiftCmdShiftDateChange(event)}
                />
              </label>

              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.openedByUserId.label']}</span>
                <input
                  type="text"
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f1f5f9)] px-3 py-2"
                  .value=${this.openDailyShiftCmdOpenedByUserId}
                  readonly
                />
              </label>

              <label class="flex flex-col gap-1 text-sm md:col-span-2">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.notes.label']}</span>
                <textarea
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 min-h-[80px]"
                  .value=${this.openDailyShiftCmdNotes}
                  ?disabled=${openLoading}
                  @input=${(event: Event) => this.handleOpenDailyShiftCmdNotesChange(event)}
                ></textarea>
              </label>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-md px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${openLoading}
                @click=${(event: Event) => this.handleOpenDailyShiftCmdClick(event)}
              >
                ${openLoading
                  ? html`<span class="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"></span>`
                  : null}
                ${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.action.openDailyShiftCmd']}
              </button>
            </div>

            ${this.openDailyShiftCmdState === 'success'
              ? html`
                  <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm" role="status">
                    <!-- TODO: action.openDailyShiftCmd.success -->
                    Turno aberto com sucesso.
                  </div>
                `
              : null}
            ${this.openDailyShiftCmdState === 'error'
              ? html`
                  <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm" role="alert">
                    ${this.openDailyShiftCmdError || '<!-- TODO: action.openDailyShiftCmd.error -->Erro ao abrir turno.'}
                  </div>
                `
              : null}
          </section>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-medium text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.shiftWorkspace.closeShiftSection.title']}
            </h2>

            <div class="space-y-4">
              <h3 class="text-base font-medium text-[var(--text-strong,#0f172a)]">
                ${this.msg['organism.shiftWorkspace.closeDailyShiftCmd.title']}
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId.label']}</span>
                  <input
                    type="text"
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f1f5f9)] px-3 py-2"
                    .value=${this.closeDailyShiftCmdDailyShiftId}
                    readonly
                  />
                </label>

                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.cashTotal.label']}</span>
                  <input
                    type="text"
                    inputmode="decimal"
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.closeDailyShiftCmdCashTotal}
                    ?disabled=${closeLoading}
                    @input=${(event: Event) => this.handleCloseDailyShiftCmdCashTotalChange(event)}
                  />
                </label>

                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.otherPaymentsTotal.label']}</span>
                  <input
                    type="text"
                    inputmode="decimal"
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.closeDailyShiftCmdOtherPaymentsTotal}
                    ?disabled=${closeLoading}
                    @input=${(event: Event) => this.handleCloseDailyShiftCmdOtherPaymentsTotalChange(event)}
                  />
                </label>

                <label class="flex flex-col gap-1 text-sm md:col-span-2">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.notes.label']}</span>
                  <textarea
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 min-h-[80px]"
                    .value=${this.closeDailyShiftCmdNotes}
                    ?disabled=${closeLoading}
                    @input=${(event: Event) => this.handleCloseDailyShiftCmdNotesChange(event)}
                  ></textarea>
                </label>

                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedByUserId.label']}</span>
                  <input
                    type="text"
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f1f5f9)] px-3 py-2"
                    .value=${this.closeDailyShiftCmdClosedByUserId}
                    readonly
                  />
                </label>

                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedAt.label']}</span>
                  <input
                    type="text"
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f1f5f9)] px-3 py-2"
                    .value=${this.closeDailyShiftCmdClosedAt}
                    readonly
                  />
                </label>
              </div>

              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-md px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${closeLoading}
                  @click=${(event: Event) => this.handleCloseDailyShiftCmdClick(event)}
                >
                  ${closeLoading
                    ? html`<span class="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"></span>`
                    : null}
                  ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.action.closeDailyShiftCmd']}
                </button>
              </div>

              ${this.closeDailyShiftCmdState === 'success'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm" role="status">
                      <!-- TODO: action.closeDailyShiftCmd.success -->
                      Turno fechado com sucesso.
                    </div>
                  `
                : null}
              ${this.closeDailyShiftCmdState === 'error'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm" role="alert">
                      ${this.closeDailyShiftCmdError || '<!-- TODO: action.closeDailyShiftCmd.error -->Erro ao fechar turno.'}
                    </div>
                  `
                : null}
            </div>

            <div class="border-t border-[var(--border-subtle,#e2e8f0)] pt-4 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="text-base font-medium text-[var(--text-strong,#0f172a)]">
                  ${this.msg['organism.shiftWorkspace.getShiftClosingReport.title']}
                </h3>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-md px-3 py-2 border border-[var(--button-secondary-border,#cbd5e1)] bg-[var(--button-secondary-bg,#ffffff)] text-[var(--button-secondary-text,#0f172a)] disabled:opacity-60"
                  ?disabled=${reportLoading}
                  @click=${(event: Event) => this.handleGetShiftClosingReportClick(event)}
                >
                  ${reportLoading
                    ? html`<span class="inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin"></span>`
                    : null}
                  ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.title']}
                </button>
              </div>

              ${reportLoading
                ? html`
                    <div class="animate-pulse space-y-2">
                      <div class="h-4 rounded bg-[var(--surface-alt-bg,#f1f5f9)] w-1/3"></div>
                      <div class="h-4 rounded bg-[var(--surface-alt-bg,#f1f5f9)] w-2/3"></div>
                      <div class="h-4 rounded bg-[var(--surface-alt-bg,#f1f5f9)] w-1/2"></div>
                    </div>
                  `
                : report
                  ? html`
                      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.shiftClosingReportId ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.dailyShiftId.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.dailyShiftId ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.shiftDate ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.totalSalesAmount ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.totalOrdersCount ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.totalItemsSold ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.cashPaymentsAmount ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.otherPaymentsAmount ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2 sm:col-span-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.topSellingItemsSummary.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.topSellingItemsSummary ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.lowStockSignalsCount.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.lowStockSignalsCount ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.stockoutSignalsCount.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.stockoutSignalsCount ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2 sm:col-span-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.closingNotes.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.closingNotes ?? ''}</dd>
                        </div>
                        <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2">
                          <dt class="text-[var(--text-muted,#64748b)]">${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.generatedAt.label']}</dt>
                          <dd class="font-medium text-[var(--text-strong,#0f172a)]">${report.generatedAt ?? ''}</dd>
                        </div>
                      </dl>
                    `
                  : html`
                      <p class="text-sm text-[var(--text-muted,#64748b)]">
                        ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.empty']}
                      </p>
                    `}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
