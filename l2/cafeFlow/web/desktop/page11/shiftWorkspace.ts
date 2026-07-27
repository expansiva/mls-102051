/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/shiftWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowShiftWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/shiftWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--shift-workspace-102051')
export class CafeFlowDesktopPage11ShiftWorkspacePage extends CafeFlowShiftWorkspaceBase {
  render() {
    const renderOpenShiftSection = () => html`
      <section class="bg-[var(--surface-bg,#ffffff)] rounded-lg border border-[var(--border-default,#e2e8f0)] p-6 space-y-4 shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,0.05))]">
        <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
          ${this.msg['section.shiftWorkspace.openShiftSection.title']}
        </h2>

        <div class="space-y-4">
          <h3 class="text-base font-medium text-[var(--text-default,#0f172a)]">
            ${this.msg['organism.shiftWorkspace.openDailyShiftCmd.title']}
          </h3>

          <form class="space-y-4" @submit=${(e: Event) => e.preventDefault()}>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.shiftDate.label']}
              </label>
              <input
                type="date"
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                .value=${this.openDailyShiftCmdShiftDate}
                @input=${this.handleOpenDailyShiftCmdShiftDateChange}
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.openedByUserId.label']}
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                .value=${this.openDailyShiftCmdOpenedByUserId}
                @input=${this.handleOpenDailyShiftCmdOpenedByUserIdChange}
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.field.notes.label']}
              </label>
              <textarea
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                rows="3"
                .value=${this.openDailyShiftCmdNotes}
                @input=${this.handleOpenDailyShiftCmdNotesChange}
              ></textarea>
            </div>

            <div class="flex items-center gap-3">
              <button
                type="button"
                class="px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] rounded-md font-medium hover:opacity-90 disabled:opacity-50"
                ?disabled=${this.openDailyShiftCmdState === 'loading'}
                @click=${this.handleOpenDailyShiftCmdClick}
              >
                ${this.openDailyShiftCmdState === 'loading'
                  ? html`<span>${/* TODO: loading msg key not in shared MessageType */ 'Carregando...'}</span>`
                  : this.msg['intent.shiftWorkspace.openDailyShiftCmd.form.action.openDailyShiftCmd']}
              </button>
            </div>

            ${this.openDailyShiftCmdState === 'success'
              ? html`
                  <div class="p-3 bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] rounded-md">
                    ${this.msg['action.openDailyShiftCmd.success']}
                  </div>
                `
              : nothing}
            ${this.openDailyShiftCmdState === 'error'
              ? html`
                  <div class="p-3 bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] rounded-md">
                    ${this.openDailyShiftCmdError || this.msg['action.openDailyShiftCmd.error']}
                  </div>
                `
              : nothing}
          </form>
        </div>
      </section>
    `;

    const renderCloseShiftSection = () => html`
      <section class="bg-[var(--surface-bg,#ffffff)] rounded-lg border border-[var(--border-default,#e2e8f0)] p-6 space-y-4 shadow-[var(--shadow-small,0_1px_2px_rgba(0,0,0,0.05))]">
        <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
          ${this.msg['section.shiftWorkspace.closeShiftSection.title']}
        </h2>

        <div class="space-y-4">
          <h3 class="text-base font-medium text-[var(--text-default,#0f172a)]">
            ${this.msg['organism.shiftWorkspace.closeDailyShiftCmd.title']}
          </h3>

          <form class="space-y-4" @submit=${(e: Event) => e.preventDefault()}>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId.label']}
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                .value=${this.closeDailyShiftCmdDailyShiftId}
                @input=${this.handleCloseDailyShiftCmdDailyShiftIdChange}
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.cashTotal.label']}
              </label>
              <input
                type="number"
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                .value=${this.closeDailyShiftCmdCashTotal}
                @input=${this.handleCloseDailyShiftCmdCashTotalChange}
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.otherPaymentsTotal.label']}
              </label>
              <input
                type="number"
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                .value=${this.closeDailyShiftCmdOtherPaymentsTotal}
                @input=${this.handleCloseDailyShiftCmdOtherPaymentsTotalChange}
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.notes.label']}
              </label>
              <textarea
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                rows="3"
                .value=${this.closeDailyShiftCmdNotes}
                @input=${this.handleCloseDailyShiftCmdNotesChange}
              ></textarea>
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedByUserId.label']}
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                .value=${this.closeDailyShiftCmdClosedByUserId}
                @input=${this.handleCloseDailyShiftCmdClosedByUserIdChange}
              />
            </div>

            <div class="space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedAt.label']}
              </label>
              <input
                type="datetime-local"
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                .value=${this.closeDailyShiftCmdClosedAt}
                @input=${this.handleCloseDailyShiftCmdClosedAtChange}
              />
            </div>

            <div class="flex items-center gap-3">
              <button
                type="button"
                class="px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] rounded-md font-medium hover:opacity-90 disabled:opacity-50"
                ?disabled=${this.closeDailyShiftCmdState === 'loading'}
                @click=${this.handleCloseDailyShiftCmdClick}
              >
                ${this.closeDailyShiftCmdState === 'loading'
                  ? html`<span>${/* TODO: loading msg key not in shared MessageType */ 'Carregando...'}</span>`
                  : this.msg['intent.shiftWorkspace.closeDailyShiftCmd.form.action.closeDailyShiftCmd']}
              </button>
            </div>

            ${this.closeDailyShiftCmdState === 'success'
              ? html`
                  <div class="p-3 bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] rounded-md">
                    ${this.msg['action.closeDailyShiftCmd.success']}
                  </div>
                `
              : nothing}
            ${this.closeDailyShiftCmdState === 'error'
              ? html`
                  <div class="p-3 bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] rounded-md">
                    ${this.closeDailyShiftCmdError || this.msg['action.closeDailyShiftCmd.error']}
                  </div>
                `
              : nothing}
          </form>
        </div>

        <div class="space-y-4 border-t border-[var(--border-subtle,#e2e8f0)] pt-4">
          <h3 class="text-base font-medium text-[var(--text-default,#0f172a)]">
            ${this.msg['organism.shiftWorkspace.getShiftClosingReport.title']}
          </h3>

          <div class="flex items-end gap-3">
            <div class="flex-1 space-y-1">
              <label class="block text-sm font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId.label']}
              </label>
              <input
                type="text"
                class="w-full px-3 py-2 bg-[var(--input-bg,#ffffff)] border border-[var(--border-default,#e2e8f0)] rounded-md text-[var(--text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring,#3b82f6)]"
                .value=${this.getShiftClosingReportShiftClosingReportId}
                @input=${this.handleGetShiftClosingReportShiftClosingReportIdChange}
              />
            </div>
            <button
              type="button"
              class="px-4 py-2 bg-[var(--button-secondary-bg,#f1f5f9)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#e2e8f0)] rounded-md font-medium hover:opacity-90 disabled:opacity-50"
              ?disabled=${this.getShiftClosingReportState === 'loading'}
              @click=${this.handleGetShiftClosingReportClick}
            >
              ${this.getShiftClosingReportState === 'loading'
                ? html`<span>${/* TODO: loading msg key not in shared MessageType */ 'Carregando...'}</span>`
                : this.msg['intent.shiftWorkspace.getShiftClosingReport.list.title']}
            </button>
          </div>

          ${this.getShiftClosingReportState === 'loading'
            ? html`
                <div class="p-4 bg-[var(--surface-alt-bg,#f8fafc)] border border-[var(--border-subtle,#e2e8f0)] rounded-md text-[var(--text-muted,#64748b)] text-center">
                  ${/* TODO: loading msg key not in shared MessageType */ 'Carregando relatório...'}
                </div>
              `
            : this.getShiftClosingReportData
              ? html`
                  <div class="overflow-x-auto">
                    <table class="w-full text-sm">
                      <tbody class="divide-y divide-[var(--border-subtle,#e2e8f0)]">
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.shiftClosingReportId}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.dailyShiftId.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.dailyShiftId}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.shiftDate}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.totalSalesAmount}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.totalOrdersCount}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.totalItemsSold}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.cashPaymentsAmount}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.otherPaymentsAmount}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.topSellingItemsSummary.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.topSellingItemsSummary}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.lowStockSignalsCount.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.lowStockSignalsCount}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.stockoutSignalsCount.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.stockoutSignalsCount}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.closingNotes.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.closingNotes}
                          </td>
                        </tr>
                        <tr>
                          <td class="py-2 pr-4 font-medium text-[var(--text-default,#0f172a)]">
                            ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.column.generatedAt.label']}
                          </td>
                          <td class="py-2 text-[var(--text-default,#0f172a)]">
                            ${this.getShiftClosingReportData.generatedAt}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                `
              : html`
                  <div class="p-4 bg-[var(--surface-alt-bg,#f8fafc)] border border-[var(--border-subtle,#e2e8f0)] rounded-md text-[var(--text-muted,#64748b)] text-center">
                    ${this.msg['intent.shiftWorkspace.getShiftClosingReport.list.empty']}
                  </div>
                `}
        </div>
      </section>
    `;

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-2">
            <h1 class="text-2xl font-bold text-[var(--text-strong,#0f172a)]">
              ${/* TODO: page title msg key not in shared MessageType */ 'Turno diário'}
            </h1>
            ${this.status
              ? html`
                  <div class="inline-flex items-center px-3 py-1 bg-[var(--status-info-bg,#dbeafe)] text-[var(--status-info-text,#1e40af)] rounded-full text-sm">
                    ${this.status}
                  </div>
                `
              : nothing}
          </header>

          ${renderOpenShiftSection()} ${renderCloseShiftSection()}
        </div>
      </div>
    `;
  }
}
