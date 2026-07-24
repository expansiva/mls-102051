/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/kitchenWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.js';
import type { FetchKitchenQueueOutput } from '/_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.js';

type KitchenQueueItem = {
  name?: string;
  productName?: string;
  quantity?: number;
  notes?: string;
  observations?: string;
};

type KitchenQueueOrder = FetchKitchenQueueOutput & {
  orderId?: string;
  orderType?: string;
  tableNumber?: string | number;
  customerName?: string;
  notes?: string;
  status?: string;
  confirmedAt?: string;
  inPreparationAt?: string;
  items?: KitchenQueueItem[];
};

@customElement('cafe-flow--web--desktop--page21--kitchen-workspace-102051')
export class CafeFlowDesktopPage21KitchenWorkspacePage extends CafeFlowKitchenWorkspaceBase {
  render() {
    const queueRaw: FetchKitchenQueueOutput[] = Array.isArray(this.fetchKitchenQueueData)
      ? this.fetchKitchenQueueData
      : [];
    const queue: KitchenQueueOrder[] = queueRaw.map(
      (row: FetchKitchenQueueOutput): KitchenQueueOrder => row as KitchenQueueOrder,
    );

    const activeQueue = queue.filter((order: KitchenQueueOrder) => {
      const status = String(order.status ?? '');
      return status === 'confirmed' || status === 'inPreparation';
    });

    const confirmedOrders = activeQueue.filter(
      (order: KitchenQueueOrder) => String(order.status ?? '') === 'confirmed',
    );
    const inPreparationOrders = activeQueue.filter(
      (order: KitchenQueueOrder) => String(order.status ?? '') === 'inPreparation',
    );

    const selectedId = String(this.changeOrderStatusOrderId ?? '');
    const selectedOrder: KitchenQueueOrder | undefined = activeQueue.find(
      (order: KitchenQueueOrder) => String(order.orderId ?? '') === selectedId,
    );

    const isQueueLoading = this.fetchKitchenQueueState === 'loading';
    const isTransitionLoading = this.changeOrderStatusState === 'loading';

    const waitingLabel = (order: KitchenQueueOrder): string => {
      const raw = order.inPreparationAt || order.confirmedAt || '';
      if (!raw) return '—';
      const ts = Date.parse(String(raw));
      if (Number.isNaN(ts)) return String(raw);
      const mins = Math.max(0, Math.floor((Date.now() - ts) / 60000));
      return `${mins} min`;
    };

    const channelLabel = (order: KitchenQueueOrder): string => {
      const t = String(order.orderType ?? '');
      if (t === 'table' || t === 'mesa') {
        return order.tableNumber != null && String(order.tableNumber) !== ''
          ? `Mesa ${order.tableNumber}`
          : 'Mesa';
      }
      if (t === 'takeout' || t === 'balcao' || t === 'counter') {
        return order.customerName ? String(order.customerName) : 'Takeout';
      }
      if (order.tableNumber != null && String(order.tableNumber) !== '') {
        return `Mesa ${order.tableNumber}`;
      }
      if (order.customerName) return String(order.customerName);
      return t || '—';
    };

    const allowedTransitions = (
      status: string,
    ): Array<{ next: string; label: string }> => {
      if (status === 'confirmed') {
        return [
          { next: 'inPreparation', label: 'Iniciar Preparo' /* TODO: msg key */ },
          { next: 'cancelled', label: 'Cancelar' /* TODO: msg key */ },
        ];
      }
      if (status === 'inPreparation') {
        return [
          { next: 'ready', label: 'Pronto' /* TODO: msg key */ },
          { next: 'cancelled', label: 'Cancelar' /* TODO: msg key */ },
        ];
      }
      return [];
    };

    const selectOrder = (order: KitchenQueueOrder): void => {
      const id = String(order.orderId ?? '');
      this.setChangeOrderStatusOrderId(id);
      this.setChangeOrderStatusStatus('');
      this.setChangeOrderStatusCancellationReason('');
      this.setChangeOrderStatusUpdatedAt('');
    };

    const runTransition = (order: KitchenQueueOrder, nextStatus: string): void => {
      const id = String(order.orderId ?? '');
      this.setChangeOrderStatusOrderId(id);
      this.setChangeOrderStatusStatus(nextStatus);
      this.setChangeOrderStatusUpdatedAt(new Date().toISOString());
      if (nextStatus !== 'cancelled') {
        this.setChangeOrderStatusCancellationReason('');
        this.handleChangeOrderStatusClick();
      }
    };

    const confirmCancel = (): void => {
      if (!selectedOrder) return;
      this.setChangeOrderStatusOrderId(String(selectedOrder.orderId ?? ''));
      this.setChangeOrderStatusStatus('cancelled');
      this.setChangeOrderStatusUpdatedAt(new Date().toISOString());
      this.handleChangeOrderStatusClick();
    };

    const renderItems = (order: KitchenQueueOrder) => {
      const items: KitchenQueueItem[] = Array.isArray(order.items) ? order.items : [];
      if (items.length === 0) {
        return html`<p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">—</p>`;
      }
      return html`
        <ul class="mt-2 space-y-1">
          ${items.map((item: KitchenQueueItem) => {
            const name = item.name || item.productName || '—';
            const qty = item.quantity != null ? item.quantity : 1;
            const note = item.notes || item.observations || '';
            return html`
              <li class="text-sm text-[var(--ds-color-text,#0f172a)]">
                <span class="font-semibold">${qty}×</span> ${name}
                ${note
                  ? html`<span class="block text-xs text-[var(--ds-color-text-muted,#64748b)]"
                      >${note}</span
                    >`
                  : nothing}
              </li>
            `;
          })}
        </ul>
      `;
    };

    const renderCard = (order: KitchenQueueOrder) => {
      const id = String(order.orderId ?? '');
      const isSelected = id !== '' && id === selectedId;
      const status = String(order.status ?? '');
      return html`
        <button
          type="button"
          class="w-full text-left rounded-lg border p-4 min-h-[7rem] transition-shadow
            ${isSelected
            ? 'border-[var(--ds-color-selected-border,#2563eb)] bg-[var(--ds-color-selected-bg,#eff6ff)] text-[var(--ds-color-selected-text,#0f172a)] shadow-md'
            : 'border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] text-[var(--ds-color-text,#0f172a)] hover:border-[var(--ds-color-border-default-hover,#cbd5e1)]'}"
          @click=${() => selectOrder(order)}
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <p class="text-base font-bold truncate">${channelLabel(order)}</p>
              <p class="text-xs text-[var(--ds-color-text-muted,#64748b)] mt-0.5">
                ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label']}:
                ${id || '—'}
              </p>
            </div>
            <div class="flex flex-col items-end gap-1 shrink-0">
              <span
                class="inline-flex px-2 py-1 rounded-md text-xs font-semibold
                ${status === 'inPreparation'
                  ? 'bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)]'
                  : 'bg-[var(--ds-color-status-info-bg,#dbeafe)] text-[var(--ds-color-status-info-text,#1e40af)]'}"
              >
                ${status || '—'}
              </span>
              <span class="text-xs font-medium text-[var(--ds-color-text-muted,#64748b)]"
                >${waitingLabel(order)}</span
              >
            </div>
          </div>
          ${order.notes
            ? html`<p class="mt-2 text-sm text-[var(--ds-color-text-muted,#64748b)] truncate">
                ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.notes.label']}:
                ${order.notes}
              </p>`
            : nothing}
          <div class="mt-2 border-t border-[var(--ds-color-border-subtle,#f1f5f9)] pt-2">
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
              ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.items.label']}
            </p>
            ${renderItems(order)}
          </div>
        </button>
      `;
    };

    const renderLane = (title: string, orders: KitchenQueueOrder[], tone: 'info' | 'warning') => html`
      <div class="flex flex-col gap-3 min-h-[12rem]">
        <div class="flex items-center justify-between gap-2">
          <h3
            class="text-sm font-bold uppercase tracking-wide
            ${tone === 'warning'
              ? 'text-[var(--ds-color-status-warning-text,#92400e)]'
              : 'text-[var(--ds-color-status-info-text,#1e40af)]'}"
          >
            ${title}
          </h3>
          <span
            class="inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-md text-sm font-bold
            ${tone === 'warning'
              ? 'bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)]'
              : 'bg-[var(--ds-color-status-info-bg,#dbeafe)] text-[var(--ds-color-status-info-text,#1e40af)]'}"
          >
            ${orders.length}
          </span>
        </div>
        ${orders.length === 0
          ? html`<p class="text-sm text-[var(--ds-color-text-muted,#64748b)] py-6 text-center">
              ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.empty']}
            </p>`
          : html`<div class="flex flex-col gap-3">
              ${orders.map((order: KitchenQueueOrder) => renderCard(order))}
            </div>`}
      </div>
    `;

    const transitions = selectedOrder
      ? allowedTransitions(String(selectedOrder.status ?? ''))
      : [];
    const cancelling = this.changeOrderStatusStatus === 'cancelled';

    return html`
      <div
        class="min-h-screen bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text,#0f172a)] p-4 md:p-6"
      >
        <div class="max-w-7xl mx-auto flex flex-col gap-4">
          <header class="flex flex-wrap items-center justify-between gap-3">
            <h1 class="text-2xl font-bold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['section.kitchenWorkspace.kitchen-queue-section.title']}
            </h1>
            <button
              type="button"
              class="min-h-12 px-5 rounded-lg text-base font-semibold
                bg-[var(--ds-color-button-secondary-bg,#f1f5f9)]
                text-[var(--ds-color-button-secondary-text,#0f172a)]
                border border-[var(--ds-color-button-secondary-border,#cbd5e1)]
                disabled:opacity-60"
              ?disabled=${isQueueLoading}
              @click=${(e: Event) => this.handleFetchKitchenQueueClick(e)}
            >
              ${isQueueLoading
                ? '…' /* TODO: loading label */
                : this.msg['organism.kitchenWorkspace.fetchKitchenQueue.title']}
            </button>
          </header>

          ${this.changeOrderStatusState === 'success'
            ? html`<div
                class="rounded-lg px-4 py-3 bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]"
                role="status"
              >
                OK <!-- TODO: action.changeOrderStatus.success msg key -->
              </div>`
            : nothing}
          ${this.changeOrderStatusState === 'error'
            ? html`<div
                class="rounded-lg px-4 py-3 bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]"
                role="alert"
              >
                ${this.changeOrderStatusError ||
                'Error' /* TODO: action.changeOrderStatus.error msg key */}
              </div>`
            : nothing}

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <section
              class="lg:col-span-2 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4"
              aria-label=${this.msg['organism.kitchenWorkspace.fetchKitchenQueue.title']}
            >
              <div class="flex items-center justify-between gap-2 mb-4">
                <h2 class="text-lg font-bold">
                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.title']}
                </h2>
                <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                  ${activeQueue.length}
                </span>
              </div>

              ${isQueueLoading
                ? html`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
                    <div class="h-40 rounded-lg bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-40 rounded-lg bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-40 rounded-lg bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-40 rounded-lg bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                  </div>`
                : activeQueue.length === 0
                  ? html`<p class="text-sm text-[var(--ds-color-text-muted,#64748b)] py-10 text-center">
                      ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.empty']}
                    </p>`
                  : html`<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                      ${renderLane('confirmed', confirmedOrders, 'info')}
                      ${renderLane('inPreparation', inPreparationOrders, 'warning')}
                    </div>`}
            </section>

            <aside
              class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 flex flex-col gap-4"
              aria-label=${this.msg['organism.kitchenWorkspace.changeOrderStatus.title']}
            >
              <h2 class="text-lg font-bold">
                ${this.msg['organism.kitchenWorkspace.changeOrderStatus.title']}
              </h2>

              ${!selectedOrder
                ? html`<p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.title']}
                  </p>`
                : html`
                    <div
                      class="rounded-lg border border-[var(--ds-color-border-subtle,#f1f5f9)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3"
                    >
                      <p class="text-base font-bold">${channelLabel(selectedOrder)}</p>
                      <p class="text-xs text-[var(--ds-color-text-muted,#64748b)] mt-1">
                        ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.status.label']}:
                        ${selectedOrder.status ?? '—'}
                      </p>
                      <p class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.confirmedAt.label']}:
                        ${selectedOrder.confirmedAt ?? '—'}
                      </p>
                      ${selectedOrder.inPreparationAt
                        ? html`<p class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                            ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.inPreparationAt.label']}:
                            ${selectedOrder.inPreparationAt}
                          </p>`
                        : nothing}
                      <div class="mt-2">
                        ${renderItems(selectedOrder)}
                      </div>
                    </div>

                    <div class="flex flex-col gap-2">
                      <p class="text-xs font-semibold uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.status.label']}
                      </p>
                      ${transitions.map((t: { next: string; label: string }) => {
                        const isCancel = t.next === 'cancelled';
                        const isActiveCancel = isCancel && cancelling;
                        return html`
                          <button
                            type="button"
                            class="min-h-12 w-full px-4 rounded-lg text-base font-semibold disabled:opacity-60
                              ${isCancel
                                ? 'bg-[var(--ds-color-button-danger-bg,#dc2626)] text-[var(--ds-color-button-danger-text,#ffffff)]'
                                : 'bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)]'}
                              ${isActiveCancel ? 'ring-2 ring-[var(--ds-color-focus-ring,#93c5fd)]' : ''}"
                            ?disabled=${isTransitionLoading}
                            @click=${() => {
                              if (selectedOrder) runTransition(selectedOrder, t.next);
                            }}
                          >
                            ${isTransitionLoading && this.changeOrderStatusStatus === t.next
                              ? '…'
                              : t.label}
                          </button>
                        `;
                      })}
                    </div>

                    ${cancelling
                      ? html`<div class="flex flex-col gap-2">
                          <label
                            class="text-sm font-medium text-[var(--ds-color-text,#0f172a)]"
                            for="kitchen-cancel-reason"
                          >
                            ${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason.label']}
                          </label>
                          <textarea
                            id="kitchen-cancel-reason"
                            class="min-h-20 w-full rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-base text-[var(--ds-color-text,#0f172a)]"
                            .value=${this.changeOrderStatusCancellationReason ?? ''}
                            @input=${(e: Event) =>
                              this.handleChangeOrderStatusCancellationReasonChange(e)}
                          ></textarea>
                          <button
                            type="button"
                            class="min-h-12 w-full px-4 rounded-lg text-base font-semibold
                              bg-[var(--ds-color-button-danger-bg,#dc2626)]
                              text-[var(--ds-color-button-danger-text,#ffffff)]
                              disabled:opacity-60"
                            ?disabled=${isTransitionLoading ||
                            !(this.changeOrderStatusCancellationReason ?? '').trim()}
                            @click=${() => confirmCancel()}
                          >
                            ${isTransitionLoading
                              ? '…'
                              : this.msg[
                                  'intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus'
                                ]}
                          </button>
                        </div>`
                      : nothing}
                  `}
            </aside>
          </div>
        </div>
      </div>
    `;
  }
}
