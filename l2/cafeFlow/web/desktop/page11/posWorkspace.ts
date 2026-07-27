/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { QueryMenuItemsOutput, QueryOpenOrdersOutput } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';

type OpenOrderRow = NonNullable<QueryOpenOrdersOutput['orders']>[number];

const ORDER_STATUS_LANES = [
  'registered',
  'confirmed',
  'inPreparation',
  'ready',
  'served',
  'cancelled',
] as const;

@customElement('cafe-flow--web--desktop--page11--pos-workspace-102051')
export class CafeFlowDesktopPage11PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const openOrdersLoading = this.queryOpenOrdersState === 'loading';
    const openOrders = this.queryOpenOrdersData?.orders ?? [];
    const openOrdersTotal =
      this.queryOpenOrdersData?.total !== undefined && this.queryOpenOrdersData?.total !== null
        ? this.queryOpenOrdersData.total
        : openOrders.length;

    const menuItemsLoading = this.queryMenuItemsState === 'loading';
    const menuItems: QueryMenuItemsOutput[] = Array.isArray(this.queryMenuItemsData)
      ? this.queryMenuItemsData
      : [];

    const groupOrdersByStatus = (rows: OpenOrderRow[]) => {
      const groups: Record<string, OpenOrderRow[]> = {};
      for (const lane of ORDER_STATUS_LANES) {
        groups[lane] = [];
      }
      for (const row of rows) {
        const status = String((row as { status?: string }).status ?? 'registered');
        if (!groups[status]) {
          groups[status] = [];
        }
        groups[status].push(row);
      }
      return groups;
    };

    const ordersByStatus = groupOrdersByStatus(openOrders as OpenOrderRow[]);

    const selectOrderForStatus = (orderId: string) => {
      this.setCmdUpdateOrderStatusOrderId(orderId);
      this.setCmdRecordBasicPaymentOrderId(orderId);
    };

    const selectMenuItem = (menuItemId: string) => {
      this.setCmdCreateOrderMenuItemId(menuItemId);
    };

    const formatMoney = (value: unknown) => {
      const n = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(n)) {
        return n.toFixed(2);
      }
      return String(value ?? '');
    };

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#020617)]">
              ${this.msg['section.posWorkspace.openOrdersSection.title']}
            </h1>
          </header>

          <!-- Open orders / kanban -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2 class="text-lg font-semibold text-[var(--text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.queryOpenOrders.title']}
              </h2>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${openOrdersLoading}
                @click=${this.handleQueryOpenOrdersClick}
              >
                ${openOrdersLoading ? html`<span class="animate-pulse">…</span>` : nothing}
                ${this.msg['intent.posWorkspace.queryOpenOrders.list.title']}
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.dailyShiftId.label']}</span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.queryOpenOrdersDailyShiftId}
                  @input=${this.handleQueryOpenOrdersDailyShiftIdChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.status.label']}</span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.queryOpenOrdersStatus}
                  @input=${this.handleQueryOpenOrdersStatusChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.orderType.label']}</span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.queryOpenOrdersOrderType}
                  @input=${this.handleQueryOpenOrdersOrderTypeChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.tableNumber.label']}</span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.queryOpenOrdersTableNumber}
                  @input=${this.handleQueryOpenOrdersTableNumberChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.page.label']}</span>
                <input
                  type="number"
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.queryOpenOrdersPage}
                  @input=${this.handleQueryOpenOrdersPageChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.pageSize.label']}</span>
                <input
                  type="number"
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.queryOpenOrdersPageSize}
                  @input=${this.handleQueryOpenOrdersPageSizeChange}
                />
              </label>
            </div>

            <div class="flex flex-wrap items-center gap-3 text-sm text-[var(--text-muted,#64748b)]">
              <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.column.total.label']}: ${openOrdersTotal}</span>
              <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.column.orders.label']}: ${openOrders.length}</span>
            </div>

            ${openOrdersLoading
              ? html`
                  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    ${ORDER_STATUS_LANES.map(
                      () => html`
                        <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f1f5f9)] p-3 min-h-[8rem] animate-pulse"></div>
                      `,
                    )}
                  </div>
                `
              : openOrders.length === 0
                ? html`
                    <p class="text-sm text-[var(--text-muted,#64748b)] py-6 text-center">
                      ${this.msg['intent.posWorkspace.queryOpenOrders.list.empty']}
                    </p>
                  `
                : html`
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 overflow-x-auto">
                      ${ORDER_STATUS_LANES.map((lane) => {
                        const laneOrders = ordersByStatus[lane] ?? [];
                        return html`
                          <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-2 space-y-2 min-w-[10rem]">
                            <div class="flex items-center justify-between gap-2 px-1">
                              <span class="text-xs font-semibold uppercase tracking-wide text-[var(--text-strong,#020617)]">${lane}</span>
                              <span class="text-xs rounded-full px-2 py-0.5 bg-[var(--status-neutral-bg,#e2e8f0)] text-[var(--status-neutral-text,#334155)]">${laneOrders.length}</span>
                            </div>
                            <div class="space-y-2 max-h-[28rem] overflow-y-auto">
                              ${laneOrders.length === 0
                                ? html`<p class="text-xs text-[var(--text-muted,#64748b)] px-1 py-2">—</p>`
                                : laneOrders.map((order: OpenOrderRow) => {
                                    const o = order as OpenOrderRow & {
                                      orderId?: string;
                                      tableNumber?: string | number | null;
                                      orderType?: string | null;
                                      customerName?: string | null;
                                      status?: string | null;
                                    };
                                    const orderId = String(o.orderId ?? '');
                                    const isSelected = orderId !== '' && orderId === this.cmdUpdateOrderStatusOrderId;
                                    return html`
                                      <button
                                        type="button"
                                        class="w-full text-left rounded-md border p-3 space-y-1 transition-shadow ${isSelected
                                          ? 'border-[var(--selected-border,#2563eb)] bg-[var(--selected-bg,#eff6ff)] text-[var(--selected-text,#0f172a)] shadow-sm'
                                          : 'border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] hover:border-[var(--border-default,#cbd5e1)]'}"
                                        @click=${() => selectOrderForStatus(orderId)}
                                      >
                                        <div class="text-sm font-semibold text-[var(--text-strong,#020617)]">#${orderId || '—'}</div>
                                        <div class="text-xs text-[var(--text-muted,#64748b)]">
                                          ${o.orderType ?? ''} ${o.tableNumber != null && o.tableNumber !== '' ? html`· mesa ${o.tableNumber}` : nothing}
                                        </div>
                                        ${o.customerName
                                          ? html`<div class="text-xs text-[var(--text-default,#0f172a)] truncate">${o.customerName}</div>`
                                          : nothing}
                                        <div class="text-xs font-medium text-[var(--status-info-text,#1d4ed8)]">${o.status ?? lane}</div>
                                      </button>
                                    `;
                                  })}
                            </div>
                          </div>
                        `;
                      })}
                    </div>
                  `}

            <!-- Status transition -->
            <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
              <h3 class="text-base font-semibold text-[var(--text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.cmdUpdateOrderStatus.title']}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span class="text-[var(--text-muted,#64748b)]">orderId</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdUpdateOrderStatusOrderId}
                    @input=${this.handleCmdUpdateOrderStatusOrderIdChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.field.status.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdUpdateOrderStatusStatus}
                    @input=${this.handleCmdUpdateOrderStatusStatusChange}
                    placeholder="registered | confirmed | inPreparation | ready | served | cancelled"
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdUpdateOrderStatusCancellationReason}
                    @input=${this.handleCmdUpdateOrderStatusCancellationReasonChange}
                  />
                </label>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${this.cmdUpdateOrderStatusState === 'loading'}
                  @click=${this.handleCmdUpdateOrderStatusClick}
                >
                  ${this.cmdUpdateOrderStatusState === 'loading'
                    ? html`<span class="animate-pulse">…</span>`
                    : nothing}
                  ${this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.action.cmdUpdateOrderStatus']}
                </button>
              </div>
              ${this.cmdUpdateOrderStatusState === 'success'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm flex items-start justify-between gap-3" role="status">
                      <span><!-- TODO: action.cmdUpdateOrderStatus.success -->Status atualizado com sucesso.</span>
                      <button type="button" class="text-xs underline" @click=${() => { this.cmdUpdateOrderStatusState = 'idle'; }}>×</button>
                    </div>
                  `
                : nothing}
              ${this.cmdUpdateOrderStatusState === 'error'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm flex items-start justify-between gap-3" role="alert">
                      <span>${this.cmdUpdateOrderStatusError || '<!-- TODO: action.cmdUpdateOrderStatus.error -->Erro ao atualizar status.'}</span>
                      <button type="button" class="text-xs underline" @click=${() => { this.cmdUpdateOrderStatusState = 'idle'; }}>×</button>
                    </div>
                  `
                : nothing}
            </div>
          </section>

          <!-- Create order -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#020617)]">
              ${this.msg['section.posWorkspace.createOrderSection.title']}
            </h2>

            <!-- Menu showcase -->
            <div class="space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-3">
                <h3 class="text-base font-semibold text-[var(--text-strong,#020617)]">
                  ${this.msg['organism.posWorkspace.queryMenuItems.title']}
                </h3>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium bg-[var(--button-secondary-bg,#f1f5f9)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#cbd5e1)] disabled:opacity-60"
                  ?disabled=${menuItemsLoading}
                  @click=${this.handleQueryMenuItemsClick}
                >
                  ${menuItemsLoading ? html`<span class="animate-pulse">…</span>` : nothing}
                  ${this.msg['intent.posWorkspace.queryMenuItems.list.title']}
                </button>
              </div>

              <label class="flex flex-col gap-1 text-sm max-w-xs">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId.label']}</span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.queryMenuItemsMenuCategoryId}
                  @input=${this.handleQueryMenuItemsMenuCategoryIdChange}
                />
              </label>

              ${menuItemsLoading
                ? html`
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                      ${[0, 1, 2, 3].map(
                        () => html`<div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f1f5f9)] aspect-[4/3] animate-pulse"></div>`,
                      )}
                    </div>
                  `
                : menuItems.length === 0
                  ? html`
                      <p class="text-sm text-[var(--text-muted,#64748b)] py-4 text-center">
                        ${this.msg['intent.posWorkspace.queryMenuItems.list.empty']}
                      </p>
                    `
                  : html`
                      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        ${menuItems.map((item: QueryMenuItemsOutput) => {
                          const row = item as QueryMenuItemsOutput & {
                            menuItemId?: string;
                            name?: string;
                            description?: string | null;
                            price?: number | string;
                            status?: string;
                            imageUrl?: string | null;
                          };
                          const menuItemId = String(row.menuItemId ?? '');
                          const name = String(row.name ?? '');
                          const selected = menuItemId !== '' && menuItemId === this.cmdCreateOrderMenuItemId;
                          return html`
                            <button
                              type="button"
                              class="text-left rounded-md border overflow-hidden flex flex-col ${selected
                                ? 'border-[var(--selected-border,#2563eb)] bg-[var(--selected-bg,#eff6ff)] ring-2 ring-[var(--focus-ring,#93c5fd)]'
                                : 'border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)]'}"
                              @click=${() => selectMenuItem(menuItemId)}
                            >
                              <div class="aspect-[4/3] bg-[var(--surface-alt-bg,#f1f5f9)] overflow-hidden">
                                ${row.imageUrl
                                  ? html`<img
                                      class="w-full h-full object-cover"
                                      src=${row.imageUrl}
                                      alt=${name}
                                      loading="lazy"
                                    />`
                                  : nothing}
                              </div>
                              <div class="p-3 space-y-1 flex-1">
                                <div class="text-sm font-semibold text-[var(--text-strong,#020617)] truncate">${name}</div>
                                ${row.description
                                  ? html`<p class="text-xs text-[var(--text-muted,#64748b)] line-clamp-2">${row.description}</p>`
                                  : nothing}
                                <div class="flex items-center justify-between gap-2 pt-1">
                                  <span class="text-sm font-medium text-[var(--text-default,#0f172a)]">${formatMoney(row.price)}</span>
                                  ${row.status
                                    ? html`<span class="text-xs text-[var(--text-muted,#64748b)]">${row.status}</span>`
                                    : nothing}
                                </div>
                              </div>
                            </button>
                          `;
                        })}
                      </div>
                    `}
            </div>

            <!-- Create order form -->
            <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
              <h3 class="text-base font-semibold text-[var(--text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.cmdCreateOrder.title']}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.orderType.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderOrderType}
                    @input=${this.handleCmdCreateOrderOrderTypeChange}
                    placeholder="table | takeout"
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.tableNumber.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderTableNumber}
                    @input=${this.handleCmdCreateOrderTableNumberChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.customerName.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderCustomerName}
                    @input=${this.handleCmdCreateOrderCustomerNameChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.dailyShiftId.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderDailyShiftId}
                    @input=${this.handleCmdCreateOrderDailyShiftIdChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.notes.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderNotes}
                    @input=${this.handleCmdCreateOrderNotesChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.menuItemId.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderMenuItemId}
                    @input=${this.handleCmdCreateOrderMenuItemIdChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.quantity.label']}</span>
                  <input
                    type="number"
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderQuantity}
                    @input=${this.handleCmdCreateOrderQuantityChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.observations.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderObservations}
                    @input=${this.handleCmdCreateOrderObservationsChange}
                  />
                </label>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-semibold bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${this.cmdCreateOrderState === 'loading'}
                  @click=${this.handleCmdCreateOrderClick}
                >
                  ${this.cmdCreateOrderState === 'loading'
                    ? html`<span class="animate-pulse">…</span>`
                    : nothing}
                  ${this.msg['intent.posWorkspace.cmdCreateOrder.form.action.cmdCreateOrder']}
                </button>
              </div>
              ${this.cmdCreateOrderState === 'success'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm flex items-start justify-between gap-3" role="status">
                      <span><!-- TODO: action.cmdCreateOrder.success -->Pedido registrado com sucesso.</span>
                      <button type="button" class="text-xs underline" @click=${() => { this.cmdCreateOrderState = 'idle'; }}>×</button>
                    </div>
                  `
                : nothing}
              ${this.cmdCreateOrderState === 'error'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm flex items-start justify-between gap-3" role="alert">
                      <span>${this.cmdCreateOrderError || '<!-- TODO: action.cmdCreateOrder.error -->Erro ao registrar pedido.'}</span>
                      <button type="button" class="text-xs underline" @click=${() => { this.cmdCreateOrderState = 'idle'; }}>×</button>
                    </div>
                  `
                : nothing}
            </div>
          </section>

          <!-- Payment -->
          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#020617)]">
              ${this.msg['section.posWorkspace.paymentSection.title']}
            </h2>
            <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
              <h3 class="text-base font-semibold text-[var(--text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.cmdRecordBasicPayment.title']}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span class="text-[var(--text-muted,#64748b)]">orderId</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdRecordBasicPaymentOrderId}
                    @input=${this.handleCmdRecordBasicPaymentOrderIdChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount.label']}</span>
                  <input
                    type="number"
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdRecordBasicPaymentTotalAmount}
                    @input=${this.handleCmdRecordBasicPaymentTotalAmountChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.paymentMethod.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdRecordBasicPaymentPaymentMethod}
                    @input=${this.handleCmdRecordBasicPaymentPaymentMethodChange}
                    placeholder="cash | card | pix"
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.notes.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdRecordBasicPaymentNotes}
                    @input=${this.handleCmdRecordBasicPaymentNotesChange}
                  />
                </label>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-md px-4 py-3 text-sm font-semibold bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${this.cmdRecordBasicPaymentState === 'loading'}
                  @click=${this.handleCmdRecordBasicPaymentClick}
                >
                  ${this.cmdRecordBasicPaymentState === 'loading'
                    ? html`<span class="animate-pulse">…</span>`
                    : nothing}
                  ${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.action.cmdRecordBasicPayment']}
                </button>
              </div>
              ${this.cmdRecordBasicPaymentState === 'success'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm flex items-start justify-between gap-3" role="status">
                      <span><!-- TODO: action.cmdRecordBasicPayment.success -->Pagamento registrado com sucesso.</span>
                      <button type="button" class="text-xs underline" @click=${() => { this.cmdRecordBasicPaymentState = 'idle'; }}>×</button>
                    </div>
                  `
                : nothing}
              ${this.cmdRecordBasicPaymentState === 'error'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm flex items-start justify-between gap-3" role="alert">
                      <span>${this.cmdRecordBasicPaymentError || '<!-- TODO: action.cmdRecordBasicPayment.error -->Erro ao registrar pagamento.'}</span>
                      <button type="button" class="text-xs underline" @click=${() => { this.cmdRecordBasicPaymentState = 'idle'; }}>×</button>
                    </div>
                  `
                : nothing}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
