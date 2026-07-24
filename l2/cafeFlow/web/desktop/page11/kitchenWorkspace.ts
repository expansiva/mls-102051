/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/kitchenWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.js';
import type { FetchKitchenQueueOutput } from '/_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--kitchen-workspace-102051')
export class CafeFlowDesktopPage11KitchenWorkspacePage extends CafeFlowKitchenWorkspaceBase {
  render() {
    const queueRows: FetchKitchenQueueOutput[] = Array.isArray(this.fetchKitchenQueueData)
      ? this.fetchKitchenQueueData
      : [];
    const queueLoading = this.fetchKitchenQueueState === 'loading';
    const queueEmpty = !queueLoading && queueRows.length === 0;
    const changeLoading = this.changeOrderStatusState === 'loading';
    const showChangeSuccess = this.changeOrderStatusState === 'success';
    const showChangeError = this.changeOrderStatusState === 'error';

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.kitchenWorkspace.kitchenQueueSection.title']}
            </h1>
          </header>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-end gap-3 justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                ${this.msg['organism.kitchenWorkspace.fetchKitchenQueue.title']}
              </h2>
              <div class="flex flex-wrap items-end gap-3">
                <label class="flex flex-col gap-1 text-sm min-w-[12rem]">
                  <span class="text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.filter.dailyShiftId.label']}
                  </span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-sm"
                    type="text"
                    .value=${this.fetchKitchenQueueDailyShiftId ?? ''}
                    @input=${(event: Event) => this.handleFetchKitchenQueueDailyShiftIdChange(event)}
                    @change=${(event: Event) => this.handleFetchKitchenQueueDailyShiftIdChange(event)}
                  />
                </label>
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${queueLoading}
                  @click=${(event: Event) => this.handleFetchKitchenQueueClick(event)}
                >
                  ${queueLoading ? '…' : this.msg['organism.kitchenWorkspace.fetchKitchenQueue.title']}
                </button>
              </div>
            </div>

            ${queueLoading
              ? html`
                  <div class="rounded-md border border-dashed border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-4 py-8 text-center text-sm text-[var(--text-muted,#64748b)]">
                    …
                  </div>
                `
              : queueEmpty
                ? html`
                    <div class="rounded-md border border-dashed border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-4 py-8 text-center text-sm text-[var(--text-muted,#64748b)]">
                      ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.empty']}
                    </div>
                  `
                : html`
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                      ${queueRows.map((item: FetchKitchenQueueOutput) => {
                        const orderId = String((item as { orderId?: unknown }).orderId ?? '');
                        const isSelected = orderId !== '' && orderId === (this.changeOrderStatusOrderId ?? '');
                        const rawItems = (item as { items?: unknown }).items;
                        let itemsLabel = '';
                        if (Array.isArray(rawItems)) {
                          itemsLabel = rawItems
                            .map((line: unknown) => {
                              if (line != null && typeof line === 'object') {
                                const row = line as { quantity?: unknown; name?: unknown; productName?: unknown };
                                const qty = row.quantity != null ? String(row.quantity) : '';
                                const name =
                                  row.name != null
                                    ? String(row.name)
                                    : row.productName != null
                                      ? String(row.productName)
                                      : '';
                                return [qty, name].filter((part: string) => part !== '').join('× ');
                              }
                              return String(line ?? '');
                            })
                            .filter((part: string) => part !== '')
                            .join(', ');
                        } else if (rawItems != null) {
                          itemsLabel = String(rawItems);
                        }
                        return html`
                          <button
                            type="button"
                            class="text-left rounded-lg border p-3 space-y-2 transition-shadow ${isSelected
                              ? 'border-[var(--selected-border,#2563eb)] bg-[var(--selected-bg,#eff6ff)] shadow-sm'
                              : 'border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] hover:border-[var(--border-subtle,#cbd5e1)]'}"
                            @click=${() => this.setChangeOrderStatusOrderId(orderId)}
                          >
                            <div class="flex items-start justify-between gap-2">
                              <div class="space-y-0.5 min-w-0">
                                <div class="text-xs uppercase tracking-wide text-[var(--text-muted,#64748b)]">
                                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label']}
                                </div>
                                <div class="font-semibold truncate">${orderId}</div>
                              </div>
                              <span class="shrink-0 rounded-md px-2 py-1 text-xs font-medium bg-[var(--status-neutral-bg,#f1f5f9)] text-[var(--status-neutral-text,#334155)]">
                                ${String((item as { status?: unknown }).status ?? '')}
                              </span>
                            </div>
                            <dl class="grid grid-cols-2 gap-x-3 gap-y-2 text-sm">
                              <div>
                                <dt class="text-xs text-[var(--text-muted,#64748b)]">
                                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderType.label']}
                                </dt>
                                <dd>${String((item as { orderType?: unknown }).orderType ?? '')}</dd>
                              </div>
                              <div>
                                <dt class="text-xs text-[var(--text-muted,#64748b)]">
                                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.tableNumber.label']}
                                </dt>
                                <dd>${String((item as { tableNumber?: unknown }).tableNumber ?? '')}</dd>
                              </div>
                              <div>
                                <dt class="text-xs text-[var(--text-muted,#64748b)]">
                                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.customerName.label']}
                                </dt>
                                <dd>${String((item as { customerName?: unknown }).customerName ?? '')}</dd>
                              </div>
                              <div>
                                <dt class="text-xs text-[var(--text-muted,#64748b)]">
                                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.status.label']}
                                </dt>
                                <dd>${String((item as { status?: unknown }).status ?? '')}</dd>
                              </div>
                              <div>
                                <dt class="text-xs text-[var(--text-muted,#64748b)]">
                                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.confirmedAt.label']}
                                </dt>
                                <dd>${String((item as { confirmedAt?: unknown }).confirmedAt ?? '')}</dd>
                              </div>
                              <div>
                                <dt class="text-xs text-[var(--text-muted,#64748b)]">
                                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.inPreparationAt.label']}
                                </dt>
                                <dd>${String((item as { inPreparationAt?: unknown }).inPreparationAt ?? '')}</dd>
                              </div>
                              <div class="col-span-2">
                                <dt class="text-xs text-[var(--text-muted,#64748b)]">
                                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.notes.label']}
                                </dt>
                                <dd>${String((item as { notes?: unknown }).notes ?? '')}</dd>
                              </div>
                              <div class="col-span-2">
                                <dt class="text-xs text-[var(--text-muted,#64748b)]">
                                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.items.label']}
                                </dt>
                                <dd class="font-medium">${itemsLabel}</dd>
                              </div>
                            </dl>
                          </button>
                        `;
                      })}
                    </div>
                  `}
          </section>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['organism.kitchenWorkspace.changeOrderStatus.title']}
            </h2>

            <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] px-3 py-2 text-sm">
              <span class="text-[var(--text-muted,#64748b)]">
                ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label']}:
              </span>
              <span class="ml-1 font-medium">
                ${this.changeOrderStatusOrderId
                  ? this.changeOrderStatusOrderId
                  : '—'}
              </span>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.status.label']}
                </span>
                <select
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-sm"
                  .value=${this.changeOrderStatusStatus ?? ''}
                  @change=${(event: Event) => this.handleChangeOrderStatusStatusChange(event)}
                >
                  <option value="">—</option>
                  <option value="inPreparation" ?selected=${this.changeOrderStatusStatus === 'inPreparation'}>
                    inPreparation
                  </option>
                  <option value="ready" ?selected=${this.changeOrderStatusStatus === 'ready'}>ready</option>
                  <option value="cancelled" ?selected=${this.changeOrderStatusStatus === 'cancelled'}>
                    cancelled
                  </option>
                </select>
              </label>

              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-sm"
                  type="text"
                  .value=${this.changeOrderStatusCancellationReason ?? ''}
                  @input=${(event: Event) => this.handleChangeOrderStatusCancellationReasonChange(event)}
                  @change=${(event: Event) => this.handleChangeOrderStatusCancellationReasonChange(event)}
                />
              </label>

              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.updatedAt.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-sm"
                  type="text"
                  .value=${this.changeOrderStatusUpdatedAt ?? ''}
                  @input=${(event: Event) => this.handleChangeOrderStatusUpdatedAtChange(event)}
                  @change=${(event: Event) => this.handleChangeOrderStatusUpdatedAtChange(event)}
                />
              </label>
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${changeLoading || !(this.changeOrderStatusOrderId ?? '')}
                @click=${(event: Event) => this.handleChangeOrderStatusClick(event)}
              >
                ${changeLoading
                  ? '…'
                  : this.msg['intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus']}
              </button>
            </div>

            ${showChangeSuccess
              ? html`
                  <div
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] px-3 py-2 text-sm text-[var(--status-success-text,#166534)]"
                    role="status"
                  >
                    <!-- TODO: action.changeOrderStatus.success not in shared MessageType -->
                    Status atualizado com sucesso.
                  </div>
                `
              : ''}
            ${showChangeError
              ? html`
                  <div
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] px-3 py-2 text-sm text-[var(--status-error-text,#991b1b)]"
                    role="alert"
                  >
                    ${this.changeOrderStatusError
                      ? this.changeOrderStatusError
                      : html`<!-- TODO: action.changeOrderStatus.error not in shared MessageType -->Erro ao atualizar status.`}
                  </div>
                `
              : ''}
          </section>
        </div>
      </div>
    `;
  }
}
