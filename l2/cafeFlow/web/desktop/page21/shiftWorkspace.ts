/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/shiftWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/shiftWorkspace.js';

@customElement('cafe-flow--web--desktop--page21--shift-workspace-102051')
export class CafeFlowDesktopPage21ShiftWorkspacePage extends CafeFlowShiftWorkspaceBase {
  render() {
    const openOutput = this.openDailyShiftCmdOutput;
    const closeOutput = this.closeDailyShiftCmdOutput;
    const report = this.getShiftClosingReportData;
    const shiftIsOpen = openOutput != null && closeOutput == null;
    const shiftIsClosed = closeOutput != null || report != null;
    const showOpenForm = !shiftIsOpen;
    const showClosePanel = shiftIsOpen;
    const openLoading = this.openDailyShiftCmdState === 'loading';
    const closeLoading = this.closeDailyShiftCmdState === 'loading';
    const reportLoading = this.getShiftClosingReportState === 'loading';

    const formatMoney = (value: unknown): string => {
      if (value == null || value === '') return '—';
      const n = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(n)) {
        return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      }
      return String(value);
    };

    const formatValue = (value: unknown): string => {
      if (value == null || value === '') return '—';
      return String(value);
    };

    const openShiftId =
      openOutput != null && typeof (openOutput as { dailyShiftId?: unknown }).dailyShiftId === 'string'
        ? (openOutput as { dailyShiftId: string }).dailyShiftId
        : this.closeDailyShiftCmdDailyShiftId;

    const reportShiftDate =
      report != null && 'shiftDate' in report ? formatValue((report as { shiftDate?: unknown }).shiftDate) : '';

    return html`
      <div class="min-h-full p-4 md:p-6 bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)]">
        <header class="mb-6">
          <h1 class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.shiftWorkspace.sec-shift-status.title']}
          </h1>
        </header>

        <!-- 1. Status banner — anchors the page -->
        <section
          class="mb-6 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm"
          aria-label=${this.msg['section.shiftWorkspace.sec-shift-status.title']}
        >
          <div class="flex flex-wrap items-center gap-3">
            ${shiftIsOpen
              ? html`
                  <span
                    class="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-semibold bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]"
                  >
                    open
                  </span>
                  ${openShiftId
                    ? html`
                        <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId.label']}:
                          <span class="font-medium text-[var(--ds-color-text-default,#0f172a)]">${openShiftId}</span>
                        </span>
                      `
                    : nothing}
                `
              : shiftIsClosed
                ? html`
                    <span
                      class="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-semibold bg-[var(--ds-color-status-neutral-bg,#f1f5f9)] text-[var(--ds-color-status-neutral-text,#334155)]"
                    >
                      closed
                    </span>
                    ${reportShiftDate
                      ? html`
                          <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate.label']}:
                            <span class="font-medium text-[var(--ds-color-text-default,#0f172a)]">${reportShiftDate}</span>
                          </span>
                        `
                      : nothing}
                  `
                : html`
                    <span
                      class="inline-flex items-center rounded-md px-3 py-1.5 text-sm font-semibold bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)]"
                    >
                      —
                    </span>
                    <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.empty']}
                    </span>
                  `}
          </div>

          ${report != null
            ? html`
                <div class="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                    <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount.label']}
                    </div>
                    <div class="mt-1 text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                      ${formatMoney((report as { totalSalesAmount?: unknown }).totalSalesAmount)}
                    </div>
                  </div>
                  <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                    <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount.label']}
                    </div>
                    <div class="mt-1 text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                      ${formatValue((report as { totalOrdersCount?: unknown }).totalOrdersCount)}
                    </div>
                  </div>
                  <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                    <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold.label']}
                    </div>
                    <div class="mt-1 text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                      ${formatValue((report as { totalItemsSold?: unknown }).totalItemsSold)}
                    </div>
                  </div>
                  <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                    <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount.label']}
                    </div>
                    <div class="mt-1 text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                      ${formatMoney((report as { cashPaymentsAmount?: unknown }).cashPaymentsAmount)}
                    </div>
                  </div>
                  <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                    <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount.label']}
                    </div>
                    <div class="mt-1 text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                      ${formatMoney((report as { otherPaymentsAmount?: unknown }).otherPaymentsAmount)}
                    </div>
                  </div>
                </div>
              `
            : nothing}
        </section>

        <div class="grid grid-cols-1 gap-6 ${shiftIsOpen || shiftIsClosed ? 'lg:grid-cols-2' : ''}">
          <!-- 2. Open shift — only when no active open shift -->
          ${showOpenForm
            ? html`
                <section
                  class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 md:p-6 shadow-sm"
                  aria-label=${this.msg['section.shiftWorkspace.sec-open-shift.title']}
                >
                  <h2 class="mb-4 text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                    ${this.msg['organism.shiftWorkspace.openDailyShiftCmd.title']}
                  </h2>
                  <p class="mb-4 text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.title']}
                  </p>

                  <div class="flex flex-col gap-4">
                    <label class="flex flex-col gap-1.5">
                      <span class="text-sm font-medium">
                        ${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.shiftDate.label']}
                      </span>
                      <input
                        type="date"
                        class="min-h-12 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                        .value=${this.openDailyShiftCmdShiftDate}
                        ?disabled=${openLoading}
                        @change=${this.handleOpenDailyShiftCmdShiftDateChange}
                      />
                    </label>

                    <label class="flex flex-col gap-1.5">
                      <span class="text-sm font-medium">
                        ${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.notes.label']}
                      </span>
                      <textarea
                        class="min-h-20 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                        .value=${this.openDailyShiftCmdNotes}
                        ?disabled=${openLoading}
                        @change=${this.handleOpenDailyShiftCmdNotesChange}
                      ></textarea>
                    </label>

                    <button
                      type="button"
                      class="min-h-12 rounded-md px-5 py-3 text-base font-semibold bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                      ?disabled=${openLoading}
                      @click=${this.handleOpenDailyShiftCmdClick}
                    >
                      ${openLoading
                        ? '…'
                        : this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.action.openDailyShiftCmd']}
                    </button>

                    ${this.openDailyShiftCmdState === 'success'
                      ? html`
                          <div
                            class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]"
                            role="status"
                          >
                            ${this.msg['action.openDailyShiftCmd.success']}
                          </div>
                        `
                      : nothing}
                    ${this.openDailyShiftCmdState === 'error'
                      ? html`
                          <div
                            class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]"
                            role="alert"
                          >
                            ${this.openDailyShiftCmdError || this.msg['action.openDailyShiftCmd.error']}
                          </div>
                        `
                      : nothing}
                  </div>
                </section>
              `
            : nothing}

          <!-- 3. Close shift — contextual when shift is open -->
          ${showClosePanel
            ? html`
                <section
                  class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 md:p-6 shadow-sm"
                  aria-label=${this.msg['section.shiftWorkspace.sec-close-shift.title']}
                >
                  <h2 class="mb-4 text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                    ${this.msg['organism.shiftWorkspace.closeDailyShiftCmd.title']}
                  </h2>
                  <p class="mb-4 text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.title']}
                  </p>

                  ${openShiftId
                    ? html`
                        <div
                          class="mb-4 rounded-md border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] px-3 py-2 text-sm"
                        >
                          <span class="text-[var(--ds-color-text-muted,#64748b)]">
                            ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId.label']}:
                          </span>
                          <span class="ml-1 font-medium">${openShiftId}</span>
                        </div>
                      `
                    : nothing}

                  <div class="flex flex-col gap-4">
                    <label class="flex flex-col gap-1.5">
                      <span class="text-sm font-medium">
                        ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.cashTotal.label']}
                      </span>
                      <input
                        type="number"
                        inputmode="decimal"
                        step="0.01"
                        class="min-h-12 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                        .value=${this.closeDailyShiftCmdCashTotal}
                        ?disabled=${closeLoading}
                        @change=${this.handleCloseDailyShiftCmdCashTotalChange}
                      />
                    </label>

                    <label class="flex flex-col gap-1.5">
                      <span class="text-sm font-medium">
                        ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.otherPaymentsTotal.label']}
                      </span>
                      <input
                        type="number"
                        inputmode="decimal"
                        step="0.01"
                        class="min-h-12 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                        .value=${this.closeDailyShiftCmdOtherPaymentsTotal}
                        ?disabled=${closeLoading}
                        @change=${this.handleCloseDailyShiftCmdOtherPaymentsTotalChange}
                      />
                    </label>

                    <label class="flex flex-col gap-1.5">
                      <span class="text-sm font-medium">
                        ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.notes.label']}
                      </span>
                      <textarea
                        class="min-h-20 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base"
                        .value=${this.closeDailyShiftCmdNotes}
                        ?disabled=${closeLoading}
                        @change=${this.handleCloseDailyShiftCmdNotesChange}
                      ></textarea>
                    </label>

                    <button
                      type="button"
                      class="min-h-12 rounded-md px-5 py-3 text-base font-semibold bg-[var(--ds-color-button-danger-bg,#dc2626)] text-[var(--ds-color-button-danger-text,#ffffff)] disabled:opacity-60"
                      ?disabled=${closeLoading}
                      @click=${this.handleCloseDailyShiftCmdClick}
                    >
                      ${closeLoading
                        ? '…'
                        : this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.action.closeDailyShiftCmd']}
                    </button>

                    ${this.closeDailyShiftCmdState === 'success'
                      ? html`
                          <div
                            class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]"
                            role="status"
                          >
                            ${this.msg['action.closeDailyShiftCmd.success']}
                          </div>
                        `
                      : nothing}
                    ${this.closeDailyShiftCmdState === 'error'
                      ? html`
                          <div
                            class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]"
                            role="alert"
                          >
                            ${this.closeDailyShiftCmdError || this.msg['action.closeDailyShiftCmd.error']}
                          </div>
                        `
                      : nothing}
                  </div>
                </section>
              `
            : nothing}

          <!-- 4. Closing report detail — summary-first / master-detail -->
          ${shiftIsClosed || reportLoading
            ? html`
                <section
                  class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 md:p-6 shadow-sm ${showOpenForm && !shiftIsClosed ? '' : ''}"
                  aria-label=${this.msg['organism.shiftWorkspace.getShiftClosingReport.title']}
                >
                  <div class="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <h2 class="text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                      ${this.msg['organism.shiftWorkspace.getShiftClosingReport.title']}
                    </h2>
                    <button
                      type="button"
                      class="min-h-10 rounded-md border border-[var(--ds-color-button-secondary-border,#e2e8f0)] bg-[var(--ds-color-button-secondary-bg,#ffffff)] px-4 py-2 text-sm font-medium text-[var(--ds-color-button-secondary-text,#0f172a)] disabled:opacity-60"
                      ?disabled=${reportLoading}
                      @click=${this.handleGetShiftClosingReportClick}
                    >
                      ${reportLoading ? '…' : this.msg['intent.shiftWorkspace.getShiftClosingReport.list.title']}
                    </button>
                  </div>

                  ${reportLoading
                    ? html`
                        <div class="animate-pulse space-y-3" aria-busy="true">
                          <div class="h-4 w-1/3 rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                          <div class="h-16 rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                          <div class="h-16 rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                        </div>
                      `
                    : report != null
                      ? html`
                          <dl class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate.label']}
                              </dt>
                              <dd class="mt-1 font-medium">
                                ${formatValue((report as { shiftDate?: unknown }).shiftDate)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.dailyShiftId.label']}
                              </dt>
                              <dd class="mt-1 font-medium">
                                ${formatValue((report as { dailyShiftId?: unknown }).dailyShiftId)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount.label']}
                              </dt>
                              <dd class="mt-1 text-lg font-semibold">
                                ${formatMoney((report as { totalSalesAmount?: unknown }).totalSalesAmount)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount.label']}
                              </dt>
                              <dd class="mt-1 text-lg font-semibold">
                                ${formatValue((report as { totalOrdersCount?: unknown }).totalOrdersCount)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold.label']}
                              </dt>
                              <dd class="mt-1 text-lg font-semibold">
                                ${formatValue((report as { totalItemsSold?: unknown }).totalItemsSold)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount.label']}
                              </dt>
                              <dd class="mt-1 font-medium">
                                ${formatMoney((report as { cashPaymentsAmount?: unknown }).cashPaymentsAmount)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount.label']}
                              </dt>
                              <dd class="mt-1 font-medium">
                                ${formatMoney((report as { otherPaymentsAmount?: unknown }).otherPaymentsAmount)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3 sm:col-span-2">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.topSellingItemsSummary.label']}
                              </dt>
                              <dd class="mt-1 font-medium whitespace-pre-wrap">
                                ${formatValue((report as { topSellingItemsSummary?: unknown }).topSellingItemsSummary)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-status-warning-bg,#fef3c7)] p-3">
                              <dt class="text-xs text-[var(--ds-color-status-warning-text,#92400e)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.lowStockSignalsCount.label']}
                              </dt>
                              <dd class="mt-1 text-lg font-semibold text-[var(--ds-color-status-warning-text,#92400e)]">
                                ${formatValue((report as { lowStockSignalsCount?: unknown }).lowStockSignalsCount)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-status-error-bg,#fee2e2)] p-3">
                              <dt class="text-xs text-[var(--ds-color-status-error-text,#991b1b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.stockoutSignalsCount.label']}
                              </dt>
                              <dd class="mt-1 text-lg font-semibold text-[var(--ds-color-status-error-text,#991b1b)]">
                                ${formatValue((report as { stockoutSignalsCount?: unknown }).stockoutSignalsCount)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3 sm:col-span-2">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.closingNotes.label']}
                              </dt>
                              <dd class="mt-1 font-medium whitespace-pre-wrap">
                                ${formatValue((report as { closingNotes?: unknown }).closingNotes)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.generatedAt.label']}
                              </dt>
                              <dd class="mt-1 font-medium">
                                ${formatValue((report as { generatedAt?: unknown }).generatedAt)}
                              </dd>
                            </div>
                            <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
                              <dt class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId.label']}
                              </dt>
                              <dd class="mt-1 font-medium break-all">
                                ${formatValue((report as { shiftClosingReportId?: unknown }).shiftClosingReportId)}
                              </dd>
                            </div>
                          </dl>
                        `
                      : html`
                          <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.empty']}
                          </p>
                        `}
                </section>
              `
            : nothing}
        </div>
      </div>
    `;
  }
}
