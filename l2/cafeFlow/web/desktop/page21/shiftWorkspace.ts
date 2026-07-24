/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/shiftWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/shiftWorkspace.js';

@customElement('cafe-flow--web--desktop--page21--shift-workspace-102051')
export class CafeFlowDesktopPage21ShiftWorkspacePage extends CafeFlowShiftWorkspaceBase {
  render() {
    const report = this.getShiftClosingReportData;
    const openOutput = this.openDailyShiftCmdOutput;
    const closeOutput = this.closeDailyShiftCmdOutput;
    const openLoading = this.openDailyShiftCmdState === 'loading';
    const closeLoading = this.closeDailyShiftCmdState === 'loading';
    const reportLoading = this.getShiftClosingReportState === 'loading';
    const openSuccess = this.openDailyShiftCmdState === 'success' && openOutput != null;
    const closeSuccess = this.closeDailyShiftCmdState === 'success' && closeOutput != null;
    const isShiftOpen = openSuccess && !closeSuccess;
    const showOpenForm = !isShiftOpen && !closeSuccess;
    const showClosePanel = isShiftOpen;
    const showReport = report != null || closeSuccess || reportLoading;

    const formatMoney = (value: unknown): string => {
      if (value == null || value === '') return '—';
      const num = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(num)) {
        return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      return String(value);
    };

    const formatValue = (value: unknown): string => {
      if (value == null || value === '') return '—';
      return String(value);
    };

    const statusLabel = isShiftOpen
      ? 'Aberto'
      : closeSuccess || report != null
        ? 'Fechado'
        : 'Sem turno';
    const statusTone = isShiftOpen
      ? 'bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]'
      : closeSuccess || report != null
        ? 'bg-[var(--ds-color-status-neutral-bg,#f1f5f9)] text-[var(--ds-color-status-neutral-text,#334155)]'
        : 'bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)]';

    return html`
      <div class="min-h-full bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)] p-4 md:p-6 space-y-6">
        <header class="space-y-2">
          <h1 class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.shiftWorkspace.sec-shift-status.title']}
          </h1>
          <div class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-base font-medium ${statusTone}">
            <span class="inline-block h-2.5 w-2.5 rounded-full bg-current"></span>
            <span>${statusLabel}</span>
          </div>
        </header>

        ${showOpenForm
          ? html`
              <section class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 md:p-6 space-y-4 shadow-sm">
                <div class="space-y-1">
                  <h2 class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                    ${this.msg['section.shiftWorkspace.sec-open-shift.title']}
                  </h2>
                  <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['organism.shiftWorkspace.openDailyShiftCmd.title']}
                  </p>
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                  <label class="flex flex-col gap-1.5">
                    <span class="text-sm font-medium">${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.shiftDate.label']}</span>
                    <input
                      type="date"
                      class="min-h-12 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                      .value=${this.openDailyShiftCmdShiftDate ?? ''}
                      ?disabled=${openLoading}
                      @change=${(event: Event) => this.handleOpenDailyShiftCmdShiftDateChange(event)}
                    />
                  </label>

                  <div class="flex flex-col gap-1.5">
                    <span class="text-sm font-medium">${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.openedByUserId.label']}</span>
                    <div class="min-h-12 flex items-center rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] px-3 py-2 text-sm text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.openDailyShiftCmdOpenedByUserId || '—'}
                    </div>
                  </div>

                  <label class="flex flex-col gap-1.5 md:col-span-2">
                    <span class="text-sm font-medium">${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.notes.label']}</span>
                    <textarea
                      class="min-h-24 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                      .value=${this.openDailyShiftCmdNotes ?? ''}
                      ?disabled=${openLoading}
                      @change=${(event: Event) => this.handleOpenDailyShiftCmdNotesChange(event)}
                    ></textarea>
                  </label>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    class="min-h-12 rounded-lg px-5 py-3 text-base font-semibold bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                    ?disabled=${openLoading}
                    @click=${(event: Event) => this.handleOpenDailyShiftCmdClick(event)}
                  >
                    ${openLoading
                      ? '…'
                      : this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.action.openDailyShiftCmd']}
                  </button>
                </div>

                ${this.openDailyShiftCmdState === 'success'
                  ? html`<div class="rounded-lg px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]">
                      <!-- TODO: action.openDailyShiftCmd.success -->
                      Turno aberto com sucesso.
                    </div>`
                  : nothing}
                ${this.openDailyShiftCmdState === 'error'
                  ? html`<div class="rounded-lg px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]">
                      ${this.openDailyShiftCmdError || '<!-- TODO: action.openDailyShiftCmd.error -->Erro ao abrir turno.'}
                    </div>`
                  : nothing}
              </section>
            `
          : nothing}

        ${showClosePanel
          ? html`
              <section class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 md:p-6 space-y-4 shadow-sm">
                <div class="space-y-1">
                  <h2 class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                    ${this.msg['section.shiftWorkspace.sec-close-shift.title']}
                  </h2>
                  <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['organism.shiftWorkspace.closeDailyShiftCmd.title']}
                  </p>
                </div>

                <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                    <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId.label']}
                    </div>
                    <div class="mt-1 text-base font-medium">${this.closeDailyShiftCmdDailyShiftId || '—'}</div>
                  </div>
                </div>

                <div class="grid gap-4 md:grid-cols-2">
                  <label class="flex flex-col gap-1.5">
                    <span class="text-sm font-medium">${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.cashTotal.label']}</span>
                    <input
                      type="number"
                      inputmode="decimal"
                      step="0.01"
                      class="min-h-12 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                      .value=${this.closeDailyShiftCmdCashTotal ?? ''}
                      ?disabled=${closeLoading}
                      @change=${(event: Event) => this.handleCloseDailyShiftCmdCashTotalChange(event)}
                    />
                  </label>

                  <label class="flex flex-col gap-1.5">
                    <span class="text-sm font-medium">${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.otherPaymentsTotal.label']}</span>
                    <input
                      type="number"
                      inputmode="decimal"
                      step="0.01"
                      class="min-h-12 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                      .value=${this.closeDailyShiftCmdOtherPaymentsTotal ?? ''}
                      ?disabled=${closeLoading}
                      @change=${(event: Event) => this.handleCloseDailyShiftCmdOtherPaymentsTotalChange(event)}
                    />
                  </label>

                  <label class="flex flex-col gap-1.5 md:col-span-2">
                    <span class="text-sm font-medium">${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.notes.label']}</span>
                    <textarea
                      class="min-h-24 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                      .value=${this.closeDailyShiftCmdNotes ?? ''}
                      ?disabled=${closeLoading}
                      @change=${(event: Event) => this.handleCloseDailyShiftCmdNotesChange(event)}
                    ></textarea>
                  </label>
                </div>

                <div class="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    class="min-h-12 rounded-lg px-5 py-3 text-base font-semibold bg-[var(--ds-color-button-danger-bg,#dc2626)] text-[var(--ds-color-button-danger-text,#ffffff)] disabled:opacity-60"
                    ?disabled=${closeLoading}
                    @click=${(event: Event) => this.handleCloseDailyShiftCmdClick(event)}
                  >
                    ${closeLoading
                      ? '…'
                      : this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.action.closeDailyShiftCmd']}
                  </button>
                </div>

                ${this.closeDailyShiftCmdState === 'success'
                  ? html`<div class="rounded-lg px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]">
                      <!-- TODO: action.closeDailyShiftCmd.success -->
                      Turno fechado com sucesso.
                    </div>`
                  : nothing}
                ${this.closeDailyShiftCmdState === 'error'
                  ? html`<div class="rounded-lg px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]">
                      ${this.closeDailyShiftCmdError || '<!-- TODO: action.closeDailyShiftCmd.error -->Erro ao fechar turno.'}
                    </div>`
                  : nothing}
              </section>
            `
          : nothing}

        ${showReport
          ? html`
              <section class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 md:p-6 space-y-4 shadow-sm">
                <div class="space-y-1">
                  <h2 class="text-xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                    ${this.msg['organism.shiftWorkspace.getShiftClosingReport.title']}
                  </h2>
                  <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.title']}
                  </p>
                </div>

                ${reportLoading
                  ? html`
                      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                        ${[0, 1, 2, 3].map(
                          () => html`
                            <div class="h-20 animate-pulse rounded-lg bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                          `,
                        )}
                      </div>
                    `
                  : report == null
                    ? html`
                        <div class="rounded-lg border border-dashed border-[var(--ds-color-border-default,#e2e8f0)] px-4 py-8 text-center text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.empty']}
                        </div>
                      `
                    : html`
                        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount.label']}
                            </div>
                            <div class="mt-1 text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                              ${formatMoney(report.totalSalesAmount)}
                            </div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount.label']}
                            </div>
                            <div class="mt-1 text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                              ${formatValue(report.totalOrdersCount)}
                            </div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold.label']}
                            </div>
                            <div class="mt-1 text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                              ${formatValue(report.totalItemsSold)}
                            </div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate.label']}
                            </div>
                            <div class="mt-1 text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
                              ${formatValue(report.shiftDate)}
                            </div>
                          </div>
                        </div>

                        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount.label']}
                            </div>
                            <div class="mt-1 text-lg font-medium">${formatMoney(report.cashPaymentsAmount)}</div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount.label']}
                            </div>
                            <div class="mt-1 text-lg font-medium">${formatMoney(report.otherPaymentsAmount)}</div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.topSellingItemsSummary.label']}
                            </div>
                            <div class="mt-1 text-sm">${formatValue(report.topSellingItemsSummary)}</div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.lowStockSignalsCount.label']}
                            </div>
                            <div class="mt-1 text-lg font-medium text-[var(--ds-color-status-warning-text,#92400e)]">
                              ${formatValue(report.lowStockSignalsCount)}
                            </div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.stockoutSignalsCount.label']}
                            </div>
                            <div class="mt-1 text-lg font-medium text-[var(--ds-color-status-error-text,#991b1b)]">
                              ${formatValue(report.stockoutSignalsCount)}
                            </div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.generatedAt.label']}
                            </div>
                            <div class="mt-1 text-sm">${formatValue(report.generatedAt)}</div>
                          </div>
                        </div>

                        <div class="grid gap-3 md:grid-cols-2">
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId.label']}
                            </div>
                            <div class="mt-1 text-sm break-all">${formatValue(report.shiftClosingReportId)}</div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] p-4">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.dailyShiftId.label']}
                            </div>
                            <div class="mt-1 text-sm break-all">${formatValue(report.dailyShiftId)}</div>
                          </div>
                          <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] p-4 md:col-span-2">
                            <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.closingNotes.label']}
                            </div>
                            <div class="mt-1 text-sm whitespace-pre-wrap">${formatValue(report.closingNotes)}</div>
                          </div>
                        </div>
                      `}
              </section>
            `
          : nothing}
      </div>
    `;
  }
}

function nothing() {
  return html``;
}
