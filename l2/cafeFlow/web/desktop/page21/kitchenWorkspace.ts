/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/kitchenWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  CafeFlowKitchenWorkspaceBase,
  type FetchKitchenQueueOutput,
} from '/_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.js';

type KitchenItemView = {
  name?: string;
  itemName?: string;
  quantity?: number;
  notes?: string;
  observations?: string;
};

@customElement('cafe-flow--web--desktop--page21--kitchen-workspace-102051')
export class CafeFlowDesktopPage21KitchenWorkspacePage extends CafeFlowKitchenWorkspaceBase {
  render() {
    const orders: FetchKitchenQueueOutput[] = Array.isArray(this.fetchKitchenQueueData)
      ? this.fetchKitchenQueueData
      : [];

    const isActiveStatus = (status: string): boolean =>
      status === 'confirmed' || status === 'inPreparation';

    const activeOrders = orders.filter((order: FetchKitchenQueueOutput) =>
      isActiveStatus(String(order.status ?? '')),
    );

    const confirmedOrders = activeOrders.filter(
      (order: FetchKitchenQueueOutput) => String(order.status) === 'confirmed',
    );
    const inPreparationOrders = activeOrders.filter(
      (order: FetchKitchenQueueOutput) => String(order.status) === 'inPreparation',
    );

    const selectedOrder =
      activeOrders.find(
        (order: FetchKitchenQueueOutput) =>
          String(order.orderId) === String(this.changeOrderStatusOrderId),
      ) ?? null;

    const isQueueLoading = this.fetchKitchenQueueState === 'loading';
    const isTransitionLoading = this.changeOrderStatusState === 'loading';

    const readUpdatedAt = (order: FetchKitchenQueueOutput): string => {
      const rec = order as FetchKitchenQueueOutput & { updatedAt?: string };
      return typeof rec.updatedAt === 'string' ? rec.updatedAt : '';
    };

    const asItems = (value: unknown): KitchenItemView[] => {
      if (!Array.isArray(value)) return [];
      return value as KitchenItemView[];
    };

    const formatWhen = (value: unknown): string => {
      if (value == null || value === '') return '';
      const raw = String(value);
      const date = new Date(raw);
      if (Number.isNaN(date.getTime())) return raw;
      return date.toLocaleString();
    };

    const waitingLabel = (order: FetchKitchenQueueOutput): string => {
      const anchor =
        String(order.status) === 'inPreparation' && order.inPreparationAt
          ? order.inPreparationAt
          : order.confirmedAt;
      return formatWhen(anchor);
    };

    const identityLabel = (order: FetchKitchenQueueOutput): string => {
      const channel = String(order.orderType ?? '');
      if (channel === 'table' || order.tableNumber != null && String(order.tableNumber) !== '') {
        return `${channel}${order.tableNumber != null ? ` · #${String(order.tableNumber)}` : ''}`;
      }
      if (order.customerName) return `${channel} · ${String(order.customerName)}`;
      return channel || String(order.orderId ?? '');
    };

    const selectOrder = (order: FetchKitchenQueueOutput): void => {
      this.setChangeOrderStatusOrderId(String(order.orderId ?? ''));
      this.setChangeOrderStatusUpdatedAt(readUpdatedAt(order));
      if (this.changeOrderStatusStatus === 'cancelled') {
        // keep cancel draft when re-selecting
      } else {
        this.setChangeOrderStatusStatus('');
        this.setChangeOrderStatusCancellationReason('');
      }
    };

    const runTransition = (order: FetchKitchenQueueOutput, nextStatus: string): void => {
      this.setChangeOrderStatusOrderId(String(order.orderId ?? ''));
      this.setChangeOrderStatusUpdatedAt(readUpdatedAt(order));
      this.setChangeOrderStatusStatus(nextStatus);
      if (nextStatus === 'cancelled') {
        return;
      }
      this.setChangeOrderStatusCancellationReason('');
      this.handleChangeOrderStatusClick();
    };

    const allowedTransitions = (status: string): string[] => {
      if (status === 'confirmed') return ['inPreparation', 'cancelled'];
      if (status === 'inPreparation') return ['ready', 'cancelled'];
      return [];
    };

    const transitionLabel = (nextStatus: string): string => {
      if (nextStatus === 'inPreparation') return 'Iniciar preparo'; // TODO: i18n key absent in MessageType
      if (nextStatus === 'ready') return 'Marcar como pronto'; // TODO: i18n key absent in MessageType
      if (nextStatus === 'cancelled') return 'Cancelar'; // TODO: i18n key absent in MessageType
      return nextStatus;
    };

    const renderItems = (order: FetchKitchenQueueOutput) => {
      const items = asItems(order.items);
      if (items.length === 0) {
        return nothing;
      }
      return html`
        <ul class="mt-2 space-y-1 text-sm text-[var(--ds-color-text,#0f172a)]">
          ${items.map((item: KitchenItemView) => {
            const label = item.name ?? item.itemName ?? '';
            const qty = item.quantity != null ? String(item.quantity) : '';
            const note = item.notes ?? item.observations ?? '';
            return html`
              <li class="flex flex-wrap gap-x-2 gap-y-0.5">
                <span class="font-semibold">${qty ? `${qty}× ` : ''}${label}</span>
                ${note
                  ? html`<span class="text-[var(--ds-color-text-muted,#64748b)]">— ${note}</span>`
                  : nothing}
              </li>
            `;
          })}
        </ul>
      `;
    };

    const renderTransitionButtons = (order: FetchKitchenQueueOutput) => {
      const transitions = allowedTransitions(String(order.status ?? ''));
      if (transitions.length === 0) return nothing;
      return html`
        <div class="mt-3 flex flex-wrap gap-2">
          ${transitions.map((next: string) => {
            const isCancel = next === 'cancelled';
            const isDanger = isCancel;
            return html`
              <button
                type="button"
                class="min-h-12 min-w-[8rem] rounded-lg px-4 py-3 text-base font-semibold shadow-sm
                  ${isDanger
                    ? 'bg-[var(--ds-color-button-danger-bg,#dc2626)] text-[var(--ds-color-button-danger-text,#ffffff)]'
                    : 'bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)]'}
                  disabled:opacity-60"
                ?disabled=${isTransitionLoading}
                @click=${(event: Event) => {
                  event.stopPropagation();
                  runTransition(order, next);
                }}
              >
                ${isTransitionLoading
                  ? '…'
                  : transitionLabel(next)}
              </button>
            `;
          })}
        </div>
      `;
    };

    const renderOrderCard = (order: FetchKitchenQueueOutput) => {
      const id = String(order.orderId ?? '');
      const selected = id !== '' && id === String(this.changeOrderStatusOrderId);
      return html`
        <article
          class="cursor-pointer rounded-lg border p-4 shadow-sm transition
            ${selected
              ? 'border-[var(--ds-color-selected-border,#2563eb)] bg-[var(--ds-color-selected-bg,#eff6ff)] text-[var(--ds-color-selected-text,#0f172a)]'
              : 'border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-surface,#ffffff)] text-[var(--ds-color-text,#0f172a)]'}"
          @click=${() => selectOrder(order)}
        >
          <div class="flex items-start justify-between gap-2">
            <div>
              <p class="text-lg font-bold text-[var(--ds-color-text-strong,#020617)]">
                ${identityLabel(order)}
              </p>
              <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label']}:
                ${id}
              </p>
            </div>
            <span
              class="rounded-md px-2 py-1 text-xs font-semibold uppercase
                ${String(order.status) === 'inPreparation'
                  ? 'bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)]'
                  : 'bg-[var(--ds-color-status-info-bg,#dbeafe)] text-[var(--ds-color-status-info-text,#1e40af)]'}"
            >
              ${String(order.status ?? '')}
            </span>
          </div>

          <p class="mt-2 text-sm text-[var(--ds-color-text-muted,#64748b)]">
            ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.confirmedAt.label']}:
            ${waitingLabel(order)}
          </p>

          ${order.notes
            ? html`
                <p class="mt-1 text-sm italic text-[var(--ds-color-text,#0f172a)]">
                  ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.notes.label']}:
                  ${String(order.notes)}
                </p>
              `
            : nothing}

          <div class="mt-2">
            <p class="text-xs font-semibold uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
              ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.items.label']}
            </p>
            ${renderItems(order)}
          </div>

          ${renderTransitionButtons(order)}
        </article>
      `;
    };

    const renderLane = (laneStatus: string, laneOrders: FetchKitchenQueueOutput[]) => html`
      <div class="flex min-h-[12rem] flex-col gap-3 rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
        <header class="flex items-center justify-between gap-2">
          <h3 class="text-base font-bold uppercase tracking-wide text-[var(--ds-color-text-strong,#020617)]">
            ${laneStatus}
          </h3>
          <span
            class="rounded-full bg-[var(--ds-color-status-neutral-bg,#f1f5f9)] px-2 py-0.5 text-sm font-semibold text-[var(--ds-color-status-neutral-text,#334155)]"
          >
            ${laneOrders.length}
          </span>
        </header>
        ${laneOrders.length === 0
          ? html`
              <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.empty']}
              </p>
            `
          : html`
              <div class="flex flex-col gap-3">
                ${laneOrders.map((order: FetchKitchenQueueOutput) => renderOrderCard(order))}
              </div>
            `}
      </div>
    `;

    const showCancelReason =
      selectedOrder != null && this.changeOrderStatusStatus === 'cancelled';

    return html`
      <div class="min-h-full bg-[var(--ds-color-page-bg,#f8fafc)] p-4 text-[var(--ds-color-text,#0f172a)] md:p-6">
        <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h1 class="text-2xl font-bold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.kitchenWorkspace.sec-kitchen-queue.title']}
          </h1>
          <button
            type="button"
            class="min-h-12 rounded-lg bg-[var(--ds-color-button-secondary-bg,#ffffff)] px-5 py-3 text-base font-semibold text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#e2e8f0)] shadow-sm disabled:opacity-60"
            ?disabled=${isQueueLoading}
            @click=${(event: Event) => this.handleFetchKitchenQueueClick(event)}
          >
            ${isQueueLoading
              ? '…'
              : this.msg['organism.kitchenWorkspace.fetchKitchenQueue.title']}
          </button>
        </div>

        ${this.changeOrderStatusState === 'success'
          ? html`
              <div
                class="mb-4 rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-status-success-bg,#dcfce7)] px-4 py-3 text-[var(--ds-color-status-success-text,#166534)]"
                role="status"
              >
                <!-- TODO: action.changeOrderStatus.success not in MessageType -->
                Status atualizado com sucesso.
              </div>
            `
          : nothing}
        ${this.changeOrderStatusState === 'error'
          ? html`
              <div
                class="mb-4 rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-status-error-bg,#fee2e2)] px-4 py-3 text-[var(--ds-color-status-error-text,#991b1b)]"
                role="alert"
              >
                ${this.changeOrderStatusError ||
                this.msg['intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus']}
              </div>
            `
          : nothing}

        <section class="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div class="lg:col-span-2">
            <h2 class="mb-3 text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.title']}
            </h2>

            ${isQueueLoading
              ? html`
                  <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div class="h-40 animate-pulse rounded-lg bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-40 animate-pulse rounded-lg bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                  </div>
                `
              : activeOrders.length === 0
                ? html`
                    <p class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-surface,#ffffff)] p-6 text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.empty']}
                    </p>
                  `
                : html`
                    <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                      ${renderLane('confirmed', confirmedOrders)}
                      ${renderLane('inPreparation', inPreparationOrders)}
                    </div>
                  `}
          </div>

          <aside
            class="rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-surface,#ffffff)] p-4 shadow-sm"
          >
            <h2 class="text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['organism.kitchenWorkspace.changeOrderStatus.title']}
            </h2>

            ${selectedOrder == null
              ? html`
                  <p class="mt-3 text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.title']}
                  </p>
                `
              : html`
                  <div class="mt-3 space-y-2">
                    <p class="text-xl font-bold text-[var(--ds-color-text-strong,#020617)]">
                      ${identityLabel(selectedOrder)}
                    </p>
                    <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.status.label']}:
                      ${String(selectedOrder.status ?? '')}
                    </p>
                    <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                      ${waitingLabel(selectedOrder)}
                    </p>
                    ${selectedOrder.notes
                      ? html`
                          <p class="text-sm italic">
                            ${String(selectedOrder.notes)}
                          </p>
                        `
                      : nothing}
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.items.label']}
                      </p>
                      ${renderItems(selectedOrder)}
                    </div>

                    ${renderTransitionButtons(selectedOrder)}

                    ${showCancelReason
                      ? html`
                          <div class="mt-4 space-y-3 border-t border-[var(--ds-color-border-subtle,#e2e8f0)] pt-3">
                            <label class="block text-sm font-medium text-[var(--ds-color-text,#0f172a)]">
                              ${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason.label']}
                              <textarea
                                class="mt-1 min-h-20 w-full rounded-lg border border-[var(--ds-color-border,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] p-3 text-base text-[var(--ds-color-text,#0f172a)]"
                                .value=${this.changeOrderStatusCancellationReason ?? ''}
                                @input=${(event: Event) =>
                                  this.handleChangeOrderStatusCancellationReasonChange(event)}
                              ></textarea>
                            </label>
                            <button
                              type="button"
                              class="min-h-12 w-full rounded-lg bg-[var(--ds-color-button-danger-bg,#dc2626)] px-4 py-3 text-base font-semibold text-[var(--ds-color-button-danger-text,#ffffff)] disabled:opacity-60"
                              ?disabled=${isTransitionLoading ||
                              !(this.changeOrderStatusCancellationReason ?? '').trim()}
                              @click=${(event: Event) => this.handleChangeOrderStatusClick(event)}
                            >
                              ${isTransitionLoading
                                ? '…'
                                : this.msg['intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus']}
                            </button>
                          </div>
                        `
                      : nothing}
                  </div>
                `}
          </aside>
        </section>
      </div>
    `;
  }
}
