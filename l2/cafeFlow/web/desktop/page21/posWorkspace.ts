/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { QueryMenuItemsOutput } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';

type OpenOrderRow = {
  orderId?: string;
  status?: string;
  orderType?: string;
  tableNumber?: string | number;
  customerName?: string;
  totalAmount?: string | number;
  notes?: string;
  registeredAt?: string;
  createdAt?: string;
};

const ORDER_STATUS_LANES: ReadonlyArray<string> = [
  'registered',
  'confirmed',
  'inPreparation',
  'ready',
];

const ORDER_TRANSITIONS: Record<string, ReadonlyArray<string>> = {
  registered: ['confirmed', 'cancelled'],
  confirmed: ['inPreparation', 'cancelled'],
  inPreparation: ['ready', 'cancelled'],
  ready: ['served', 'cancelled'],
};

@customElement('cafe-flow--web--desktop--page21--pos-workspace-102051')
export class CafeFlowDesktopPage21PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const openOrdersLoading = this.queryOpenOrdersState === 'loading';
    const menuLoading = this.queryMenuItemsState === 'loading';
    const createLoading = this.cmdCreateOrderState === 'loading';
    const updateLoading = this.cmdUpdateOrderStatusState === 'loading';
    const paymentLoading = this.cmdRecordBasicPaymentState === 'loading';

    const openOrdersRaw = this.queryOpenOrdersData as
      | { orders?: OpenOrderRow[]; total?: number }
      | null
      | undefined;
    const openOrders: OpenOrderRow[] = Array.isArray(openOrdersRaw?.orders)
      ? openOrdersRaw!.orders!
      : [];
    const openOrdersTotal =
      typeof openOrdersRaw?.total === 'number' ? openOrdersRaw.total : openOrders.length;

    const selectedOrderId = this.cmdUpdateOrderStatusOrderId || this.cmdRecordBasicPaymentOrderId;
    const selectedOrder: OpenOrderRow | undefined = openOrders.find(
      (o: OpenOrderRow) => String(o.orderId ?? '') === selectedOrderId,
    );

    const menuItems: QueryMenuItemsOutput[] = Array.isArray(this.queryMenuItemsData)
      ? this.queryMenuItemsData
      : [];

    const ordersByStatus: Record<string, OpenOrderRow[]> = {
      registered: [],
      confirmed: [],
      inPreparation: [],
      ready: [],
      other: [],
    };
    for (const order of openOrders) {
      const status = String(order.status ?? '');
      if (status in ordersByStatus && status !== 'other') {
        ordersByStatus[status].push(order);
      } else if (status !== 'served' && status !== 'cancelled' && status !== 'completed') {
        ordersByStatus.other.push(order);
      }
    }

    const allowedTransitions: ReadonlyArray<string> = selectedOrder
      ? ORDER_TRANSITIONS[String(selectedOrder.status ?? '')] ?? []
      : [];

    const formatMoney = (value: unknown): string => {
      const n = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(n)) {
        return n.toFixed(2);
      }
      return value == null || value === '' ? '—' : String(value);
    };

    const selectOrder = (order: OpenOrderRow): void => {
      const id = String(order.orderId ?? '');
      if (!id) return;
      this.setCmdUpdateOrderStatusOrderId(id);
      this.setCmdRecordBasicPaymentOrderId(id);
      if (order.totalAmount != null && order.totalAmount !== '') {
        this.setCmdRecordBasicPaymentTotalAmount(String(order.totalAmount));
      }
    };

    const runStatusTransition = (orderId: string, nextStatus: string): void => {
      this.setCmdUpdateOrderStatusOrderId(orderId);
      this.setCmdUpdateOrderStatusStatus(nextStatus);
      this.setCmdRecordBasicPaymentOrderId(orderId);
      void this.cmdUpdateOrderStatus();
    };

    const selectMenuItem = (item: QueryMenuItemsOutput): void => {
      const raw = item as QueryMenuItemsOutput & { menuItemId?: string };
      const id = String(raw.menuItemId ?? '');
      if (id) {
        this.setCmdCreateOrderMenuItemId(id);
      }
    };

    return html`
      <div class="min-h-screen p-4 md:p-6 bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)]">
        <header class="mb-6">
          <h1 class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.posWorkspace.sec-open-orders.title']}
          </h1>
        </header>

        <!-- 1. Open orders: summary + filters + card-board + contextual transitions -->
        <section class="mb-8" aria-label="${this.msg['section.posWorkspace.sec-open-orders.title']}">
          <div class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 mb-4">
            <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 class="text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.queryOpenOrders.title']}
              </h2>
              <div class="flex flex-wrap gap-3">
                <div class="rounded-lg px-4 py-3 min-w-[7rem] bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]">
                  <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.queryOpenOrders.list.column.total.label']}
                  </div>
                  <div class="text-xl font-semibold">${openOrdersLoading ? '…' : openOrdersTotal}</div>
                </div>
                <div class="rounded-lg px-4 py-3 min-w-[7rem] bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]">
                  <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.queryOpenOrders.list.column.orders.label']}
                  </div>
                  <div class="text-xl font-semibold">${openOrdersLoading ? '…' : openOrders.length}</div>
                </div>
              </div>
            </div>

            <!-- Filters linked to the board -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.status.label']}
                </span>
                <input
                  class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                  .value=${this.queryOpenOrdersStatus}
                  @change=${(e: Event) => this.handleQueryOpenOrdersStatusChange(e)}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.orderType.label']}
                </span>
                <input
                  class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                  .value=${this.queryOpenOrdersOrderType}
                  @change=${(e: Event) => this.handleQueryOpenOrdersOrderTypeChange(e)}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.tableNumber.label']}
                </span>
                <input
                  class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                  .value=${this.queryOpenOrdersTableNumber}
                  @change=${(e: Event) => this.handleQueryOpenOrdersTableNumberChange(e)}
                />
              </label>
              <div class="flex items-end">
                <button
                  type="button"
                  class="w-full min-h-12 px-4 rounded-lg font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${openOrdersLoading}
                  @click=${(e: Event) => this.handleQueryOpenOrdersClick(e)}
                >
                  ${openOrdersLoading
                    ? '…'
                    : this.msg['intent.posWorkspace.queryOpenOrders.list.title']}
                </button>
              </div>
            </div>

            ${openOrdersLoading
              ? html`
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    ${[0, 1, 2, 3].map(
                      () => html`
                        <div
                          class="h-28 rounded-lg animate-pulse bg-[var(--ds-color-surface-alt-bg,#e2e8f0)]"
                        ></div>
                      `,
                    )}
                  </div>
                `
              : openOrders.length === 0
                ? html`
                    <p class="py-8 text-center text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.posWorkspace.queryOpenOrders.list.empty']}
                    </p>
                  `
                : html`
                    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                      ${ORDER_STATUS_LANES.map((lane: string) => {
                        const laneOrders = ordersByStatus[lane] ?? [];
                        return html`
                          <div
                            class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-2 min-h-[12rem]"
                          >
                            <div
                              class="px-2 py-2 mb-2 text-sm font-semibold uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]"
                            >
                              ${lane}
                              <span class="ml-1 font-normal">(${laneOrders.length})</span>
                            </div>
                            <div class="flex flex-col gap-2">
                              ${laneOrders.map((order: OpenOrderRow) => {
                                const oid = String(order.orderId ?? '');
                                const isSelected = oid !== '' && oid === selectedOrderId;
                                return html`
                                  <button
                                    type="button"
                                    class="text-left rounded-lg border p-3 min-h-16 transition
                                      ${isSelected
                                        ? 'border-[var(--ds-color-selected-border,#2563eb)] bg-[var(--ds-color-selected-bg,#dbeafe)] text-[var(--ds-color-selected-text,#0f172a)]'
                                        : 'border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)]'}"
                                    @click=${() => selectOrder(order)}
                                  >
                                    <div class="flex items-start justify-between gap-2">
                                      <span class="font-semibold">
                                        ${order.orderType === 'takeout' || order.orderType === 'Takeout'
                                          ? (order.customerName ?? 'takeout')
                                          : `Mesa ${order.tableNumber ?? '—'}`}
                                      </span>
                                      <span
                                        class="text-xs px-2 py-0.5 rounded-lg bg-[var(--ds-color-status-info-bg,#e0f2fe)] text-[var(--ds-color-status-info-text,#0c4a6e)]"
                                      >
                                        ${order.status ?? ''}
                                      </span>
                                    </div>
                                    <div class="mt-1 text-sm text-[var(--ds-color-text-muted,#64748b)]">
                                      ${order.orderType ?? ''}
                                      ${order.totalAmount != null
                                        ? html` · ${formatMoney(order.totalAmount)}`
                                        : ''}
                                    </div>
                                  </button>
                                `;
                              })}
                            </div>
                          </div>
                        `;
                      })}
                    </div>
                  `}

            <!-- Contextual transition actions for selected order -->
            <div
              class="mt-4 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4"
            >
              <h3 class="text-base font-semibold mb-3 text-[var(--ds-color-text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.cmdUpdateOrderStatus.title']}
              </h3>
              ${!selectedOrder
                ? html`
                    <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.title']}
                    </p>
                  `
                : html`
                    <div class="mb-3 text-sm">
                      <span class="font-medium">
                        ${selectedOrder.orderType === 'takeout' || selectedOrder.orderType === 'Takeout'
                          ? (selectedOrder.customerName ?? 'takeout')
                          : `Mesa ${selectedOrder.tableNumber ?? '—'}`}
                      </span>
                      <span
                        class="ml-2 px-2 py-0.5 rounded-lg text-xs bg-[var(--ds-color-status-neutral-bg,#f1f5f9)] text-[var(--ds-color-status-neutral-text,#334155)]"
                      >
                        ${selectedOrder.status ?? ''}
                      </span>
                    </div>
                    <div class="flex flex-wrap gap-2 mb-3">
                      ${allowedTransitions.length === 0
                        ? html`
                            <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                              <!-- TODO: no i18n key for empty transitions -->
                              —
                            </span>
                          `
                        : allowedTransitions.map((next: string) => {
                            const isCancel = next === 'cancelled';
                            return html`
                              <button
                                type="button"
                                class="min-h-12 px-4 rounded-lg font-medium disabled:opacity-60
                                  ${isCancel
                                    ? 'bg-[var(--ds-color-button-danger-bg,#dc2626)] text-[var(--ds-color-button-danger-text,#ffffff)]'
                                    : 'bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)]'}"
                                ?disabled=${updateLoading || !selectedOrder.orderId}
                                @click=${() =>
                                  runStatusTransition(String(selectedOrder.orderId ?? ''), next)}
                              >
                                ${updateLoading
                                  ? '…'
                                  : next}
                              </button>
                            `;
                          })}
                    </div>
                    ${allowedTransitions.includes('cancelled')
                      ? html`
                          <label class="flex flex-col gap-1 text-sm max-w-md">
                            <span class="text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason.label']}
                            </span>
                            <input
                              class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                              .value=${this.cmdUpdateOrderStatusCancellationReason}
                              @change=${(e: Event) =>
                                this.handleCmdUpdateOrderStatusCancellationReasonChange(e)}
                            />
                          </label>
                        `
                      : ''}
                  `}

              ${this.cmdUpdateOrderStatusState === 'success'
                ? html`
                    <div
                      class="mt-3 px-3 py-2 rounded-lg text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#14532d)]"
                      role="status"
                    >
                      <!-- TODO: action.cmdUpdateOrderStatus.success not in MessageType -->
                      OK
                    </div>
                  `
                : ''}
              ${this.cmdUpdateOrderStatusState === 'error'
                ? html`
                    <div
                      class="mt-3 px-3 py-2 rounded-lg text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#7f1d1d)]"
                      role="alert"
                    >
                      ${this.cmdUpdateOrderStatusError || 'Error'}
                    </div>
                  `
                : ''}
            </div>
          </div>
        </section>

        <!-- 2. Create order: menu filter + showcase + composition panel (master-detail) -->
        <section class="mb-8" aria-label="${this.msg['section.posWorkspace.sec-create-order.title']}">
          <h2 class="text-xl font-semibold mb-4 text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.posWorkspace.sec-create-order.title']}
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="lg:col-span-2 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4">
              <div class="flex flex-wrap items-end gap-3 mb-4">
                <label class="flex flex-col gap-1 text-sm flex-1 min-w-[12rem]">
                  <span class="text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId.label']}
                  </span>
                  <input
                    class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                    .value=${this.queryMenuItemsMenuCategoryId}
                    @change=${(e: Event) => this.handleQueryMenuItemsMenuCategoryIdChange(e)}
                  />
                </label>
                <button
                  type="button"
                  class="min-h-12 px-4 rounded-lg font-medium bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#cbd5e1)] disabled:opacity-60"
                  ?disabled=${menuLoading}
                  @click=${(e: Event) => this.handleQueryMenuItemsClick(e)}
                >
                  ${menuLoading ? '…' : this.msg['organism.posWorkspace.queryMenuItems.title']}
                </button>
              </div>

              <h3 class="text-base font-semibold mb-3">
                ${this.msg['intent.posWorkspace.queryMenuItems.list.title']}
              </h3>

              ${menuLoading
                ? html`
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                      ${[0, 1, 2, 3, 4, 5].map(
                        () => html`
                          <div
                            class="h-32 rounded-lg animate-pulse bg-[var(--ds-color-surface-alt-bg,#e2e8f0)]"
                          ></div>
                        `,
                      )}
                    </div>
                  `
                : menuItems.length === 0
                  ? html`
                      <p class="py-6 text-center text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.posWorkspace.queryMenuItems.list.empty']}
                      </p>
                    `
                  : html`
                      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        ${menuItems.map((item: QueryMenuItemsOutput) => {
                          const row = item as QueryMenuItemsOutput & {
                            menuItemId?: string;
                            name?: string;
                            description?: string;
                            price?: string | number;
                            status?: string;
                          };
                          const itemId = String(row.menuItemId ?? '');
                          const isSelected = itemId !== '' && itemId === this.cmdCreateOrderMenuItemId;
                          return html`
                            <button
                              type="button"
                              class="text-left rounded-lg border p-3 min-h-24 flex flex-col gap-1
                                ${isSelected
                                  ? 'border-[var(--ds-color-selected-border,#2563eb)] bg-[var(--ds-color-selected-bg,#dbeafe)]'
                                  : 'border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)]'}"
                              @click=${() => selectMenuItem(item)}
                            >
                              <div
                                class="h-16 rounded-lg mb-1 bg-[var(--ds-color-surface-alt-bg,#e2e8f0)]"
                                aria-hidden="true"
                              ></div>
                              <div class="font-semibold text-sm">
                                ${row.name ?? itemId}
                              </div>
                              <div class="text-xs text-[var(--ds-color-text-muted,#64748b)] line-clamp-2">
                                ${row.description ?? ''}
                              </div>
                              <div class="mt-auto flex items-center justify-between gap-2 pt-1">
                                <span class="font-medium">
                                  ${this.msg['intent.posWorkspace.queryMenuItems.list.column.price.label']}:
                                  ${formatMoney(row.price)}
                                </span>
                                ${row.status
                                  ? html`
                                      <span class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                                        ${row.status}
                                      </span>
                                    `
                                  : ''}
                              </div>
                            </button>
                          `;
                        })}
                      </div>
                    `}
            </div>

            <div class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4">
              <h3 class="text-base font-semibold mb-3 text-[var(--ds-color-text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.cmdCreateOrder.title']}
              </h3>
              <div class="flex flex-col gap-3">
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.orderType.label']}
                  </span>
                  <input
                    class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                    .value=${this.cmdCreateOrderOrderType}
                    @change=${(e: Event) => this.handleCmdCreateOrderOrderTypeChange(e)}
                    placeholder="table | takeout"
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.tableNumber.label']}
                  </span>
                  <input
                    class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                    .value=${this.cmdCreateOrderTableNumber}
                    @change=${(e: Event) => this.handleCmdCreateOrderTableNumberChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.customerName.label']}
                  </span>
                  <input
                    class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                    .value=${this.cmdCreateOrderCustomerName}
                    @change=${(e: Event) => this.handleCmdCreateOrderCustomerNameChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.notes.label']}
                  </span>
                  <input
                    class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                    .value=${this.cmdCreateOrderNotes}
                    @change=${(e: Event) => this.handleCmdCreateOrderNotesChange(e)}
                  />
                </label>
                <div class="rounded-lg px-3 py-2 text-sm bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]">
                  <span class="text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.menuItemId.label']}:
                  </span>
                  <span class="font-medium ml-1">
                    ${this.cmdCreateOrderMenuItemId || '—'}
                  </span>
                </div>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.quantity.label']}
                  </span>
                  <input
                    type="number"
                    min="1"
                    class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                    .value=${this.cmdCreateOrderQuantity}
                    @change=${(e: Event) => this.handleCmdCreateOrderQuantityChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.observations.label']}
                  </span>
                  <input
                    class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                    .value=${this.cmdCreateOrderObservations}
                    @change=${(e: Event) => this.handleCmdCreateOrderObservationsChange(e)}
                  />
                </label>

                <button
                  type="button"
                  class="mt-2 min-h-12 px-4 rounded-lg font-semibold bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${createLoading || !this.cmdCreateOrderMenuItemId}
                  @click=${(e: Event) => this.handleCmdCreateOrderClick(e)}
                >
                  ${createLoading
                    ? '…'
                    : this.msg['intent.posWorkspace.cmdCreateOrder.form.action.cmdCreateOrder']}
                </button>

                ${this.cmdCreateOrderState === 'success'
                  ? html`
                      <div
                        class="px-3 py-2 rounded-lg text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#14532d)]"
                        role="status"
                      >
                        <!-- TODO: action.cmdCreateOrder.success not in MessageType -->
                        OK
                      </div>
                    `
                  : ''}
                ${this.cmdCreateOrderState === 'error'
                  ? html`
                      <div
                        class="px-3 py-2 rounded-lg text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#7f1d1d)]"
                        role="alert"
                      >
                        ${this.cmdCreateOrderError || 'Error'}
                      </div>
                    `
                  : ''}
              </div>
            </div>
          </div>
        </section>

        <!-- 3. Basic payment panel (inline / side panel for selected order) -->
        <section class="mb-6" aria-label="${this.msg['section.posWorkspace.sec-payment.title']}">
          <div class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4">
            <h2 class="text-lg font-semibold mb-3 text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['section.posWorkspace.sec-payment.title']}
            </h2>
            <p class="text-sm mb-4 text-[var(--ds-color-text-muted,#64748b)]">
              ${this.msg['organism.posWorkspace.cmdRecordBasicPayment.title']}
              ${selectedOrder
                ? html`
                    <span class="ml-2 font-medium text-[var(--ds-color-text-default,#0f172a)]">
                      ·
                      ${selectedOrder.orderType === 'takeout' || selectedOrder.orderType === 'Takeout'
                        ? (selectedOrder.customerName ?? 'takeout')
                        : `Mesa ${selectedOrder.tableNumber ?? '—'}`}
                    </span>
                  `
                : ''}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount.label']}
                </span>
                <input
                  class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                  .value=${this.cmdRecordBasicPaymentTotalAmount}
                  @change=${(e: Event) => this.handleCmdRecordBasicPaymentTotalAmountChange(e)}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.paymentMethod.label']}
                </span>
                <input
                  class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                  .value=${this.cmdRecordBasicPaymentPaymentMethod}
                  @change=${(e: Event) => this.handleCmdRecordBasicPaymentPaymentMethodChange(e)}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.notes.label']}
                </span>
                <input
                  class="min-h-12 px-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)]"
                  .value=${this.cmdRecordBasicPaymentNotes}
                  @change=${(e: Event) => this.handleCmdRecordBasicPaymentNotesChange(e)}
                />
              </label>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="min-h-12 px-5 rounded-lg font-semibold bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${paymentLoading || !this.cmdRecordBasicPaymentOrderId}
                @click=${(e: Event) => this.handleCmdRecordBasicPaymentClick(e)}
              >
                ${paymentLoading
                  ? '…'
                  : this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.action.cmdRecordBasicPayment']}
              </button>
              ${!this.cmdRecordBasicPaymentOrderId
                ? html`
                    <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.title']}
                    </span>
                  `
                : ''}
            </div>

            ${this.cmdRecordBasicPaymentState === 'success'
              ? html`
                  <div
                    class="mt-3 px-3 py-2 rounded-lg text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#14532d)]"
                    role="status"
                  >
                    <!-- TODO: action.cmdRecordBasicPayment.success not in MessageType -->
                    OK
                  </div>
                `
              : ''}
            ${this.cmdRecordBasicPaymentState === 'error'
              ? html`
                  <div
                    class="mt-3 px-3 py-2 rounded-lg text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#7f1d1d)]"
                    role="alert"
                  >
                    ${this.cmdRecordBasicPaymentError || 'Error'}
                  </div>
                `
              : ''}
          </div>
        </section>
      </div>
    `;
  }
}
