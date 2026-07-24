/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowPosWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';
import type { QueryMenuItemsOutput } from '/_102051_/l2/cafeFlow/web/shared/posWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--pos-workspace-102051')
export class CafeFlowDesktopPage11PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const openOrdersLoading = this.queryOpenOrdersState === 'loading';
    const openOrdersData = this.queryOpenOrdersData;
    const openOrders = (openOrdersData && Array.isArray((openOrdersData as { orders?: unknown }).orders)
      ? (openOrdersData as { orders: Array<Record<string, unknown>> }).orders
      : []) as Array<Record<string, unknown>>;
    const openOrdersTotal =
      openOrdersData && (openOrdersData as { total?: unknown }).total != null
        ? String((openOrdersData as { total: unknown }).total)
        : '';

    const statusLanes = [
      'registered',
      'confirmed',
      'inPreparation',
      'ready',
      'served',
      'cancelled',
    ] as const;
    const ordersByStatus = statusLanes.map((lane) => ({
      lane,
      items: openOrders.filter((item) => String(item['status'] ?? '') === lane),
    }));
    const unlanedOrders = openOrders.filter(
      (item) => !statusLanes.includes(String(item['status'] ?? '') as (typeof statusLanes)[number]),
    );

    const menuItemsLoading = this.queryMenuItemsState === 'loading';
    const menuItems: QueryMenuItemsOutput[] = Array.isArray(this.queryMenuItemsData)
      ? this.queryMenuItemsData
      : [];

    const createLoading = this.cmdCreateOrderState === 'loading';
    const updateLoading = this.cmdUpdateOrderStatusState === 'loading';
    const paymentLoading = this.cmdRecordBasicPaymentState === 'loading';

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#020617)]">
              Lançar e acompanhar pedidos
            </h1>
            <!-- TODO: missing page title msg key -->
          </header>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#020617)]">
              ${this.msg['section.posWorkspace.openOrdersSection.title']}
            </h2>

            <div class="space-y-3">
              <div class="flex flex-wrap items-end gap-3">
                <label class="flex flex-col gap-1 text-sm min-w-[8rem]">
                  <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.dailyShiftId.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.queryOpenOrdersDailyShiftId}
                    @input=${(event: Event) => this.handleQueryOpenOrdersDailyShiftIdChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm min-w-[8rem]">
                  <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.status.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.queryOpenOrdersStatus}
                    @input=${(event: Event) => this.handleQueryOpenOrdersStatusChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm min-w-[8rem]">
                  <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.orderType.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.queryOpenOrdersOrderType}
                    @input=${(event: Event) => this.handleQueryOpenOrdersOrderTypeChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm min-w-[8rem]">
                  <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.tableNumber.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.queryOpenOrdersTableNumber}
                    @input=${(event: Event) => this.handleQueryOpenOrdersTableNumberChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm min-w-[6rem]">
                  <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.page.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.queryOpenOrdersPage}
                    @input=${(event: Event) => this.handleQueryOpenOrdersPageChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm min-w-[6rem]">
                  <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.pageSize.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.queryOpenOrdersPageSize}
                    @input=${(event: Event) => this.handleQueryOpenOrdersPageSizeChange(event)}
                  />
                </label>
                <button
                  type="button"
                  class="rounded-md px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${openOrdersLoading}
                  @click=${(event: Event) => this.handleQueryOpenOrdersClick(event)}
                >
                  ${openOrdersLoading ? '…' : this.msg['organism.posWorkspace.queryOpenOrders.title']}
                </button>
              </div>

              ${openOrdersTotal
                ? html`
                    <p class="text-sm text-[var(--text-muted,#64748b)]">
                      ${this.msg['intent.posWorkspace.queryOpenOrders.list.column.total.label']}:
                      <span class="font-medium text-[var(--text-default,#0f172a)]">${openOrdersTotal}</span>
                    </p>
                  `
                : null}

              ${openOrdersLoading
                ? html`
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3" aria-busy="true">
                      ${statusLanes.map(
                        () => html`
                          <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f1f5f9)] h-40 animate-pulse"></div>
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
                      <div class="overflow-x-auto">
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 min-w-[48rem]">
                          ${ordersByStatus.map(
                            ({ lane, items }) => html`
                              <div class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-2 space-y-2 min-h-[10rem]">
                                <div class="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted,#64748b)] px-1">
                                  ${lane}
                                </div>
                                ${items.length === 0
                                  ? html`<p class="text-xs text-[var(--text-muted,#64748b)] px-1">—</p>`
                                  : items.map((item) => {
                                      const orderId = String(item['orderId'] ?? item['id'] ?? '');
                                      const tableNumber = item['tableNumber'] != null ? String(item['tableNumber']) : '';
                                      const orderType = item['orderType'] != null ? String(item['orderType']) : '';
                                      const customerName = item['customerName'] != null ? String(item['customerName']) : '';
                                      const selected =
                                        orderId !== '' && this.cmdUpdateOrderStatusOrderId === orderId;
                                      return html`
                                        <button
                                          type="button"
                                          class="w-full text-left rounded-md border px-2 py-2 space-y-1 ${selected
                                            ? 'border-[var(--selected-border,#2563eb)] bg-[var(--selected-bg,#eff6ff)] text-[var(--selected-text,#0f172a)]'
                                            : 'border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)]'}"
                                          @click=${() => {
                                            if (orderId) {
                                              this.setCmdUpdateOrderStatusOrderId(orderId);
                                              this.setCmdRecordBasicPaymentOrderId(orderId);
                                            }
                                          }}
                                        >
                                          <div class="text-sm font-medium truncate">${orderId || '—'}</div>
                                          ${tableNumber
                                            ? html`<div class="text-xs text-[var(--text-muted,#64748b)]">#${tableNumber}</div>`
                                            : null}
                                          ${orderType
                                            ? html`<div class="text-xs text-[var(--text-muted,#64748b)]">${orderType}</div>`
                                            : null}
                                          ${customerName
                                            ? html`<div class="text-xs text-[var(--text-muted,#64748b)] truncate">${customerName}</div>`
                                            : null}
                                        </button>
                                      `;
                                    })}
                              </div>
                            `,
                          )}
                        </div>
                      </div>
                      ${unlanedOrders.length > 0
                        ? html`
                            <div class="mt-3 space-y-2">
                              <div class="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted,#64748b)]">
                                ${this.msg['intent.posWorkspace.queryOpenOrders.list.column.orders.label']}
                              </div>
                              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                                ${unlanedOrders.map((item) => {
                                  const orderId = String(item['orderId'] ?? item['id'] ?? '');
                                  const status = item['status'] != null ? String(item['status']) : '';
                                  return html`
                                    <button
                                      type="button"
                                      class="text-left rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] px-3 py-2"
                                      @click=${() => {
                                        if (orderId) {
                                          this.setCmdUpdateOrderStatusOrderId(orderId);
                                          this.setCmdRecordBasicPaymentOrderId(orderId);
                                        }
                                      }}
                                    >
                                      <div class="text-sm font-medium">${orderId || '—'}</div>
                                      ${status
                                        ? html`<div class="text-xs text-[var(--text-muted,#64748b)]">${status}</div>`
                                        : null}
                                    </button>
                                  `;
                                })}
                              </div>
                            </div>
                          `
                        : null}
                    `}
            </div>

            <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
              <h3 class="text-base font-semibold text-[var(--text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.cmdUpdateOrderStatus.title']}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex flex-col gap-1 text-sm">
                  <span>orderId</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdUpdateOrderStatusOrderId}
                    @input=${(event: Event) => this.handleCmdUpdateOrderStatusOrderIdChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.field.status.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdUpdateOrderStatusStatus}
                    @input=${(event: Event) => this.handleCmdUpdateOrderStatusStatusChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span>${this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdUpdateOrderStatusCancellationReason}
                    @input=${(event: Event) => this.handleCmdUpdateOrderStatusCancellationReasonChange(event)}
                  />
                </label>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  class="rounded-md px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${updateLoading}
                  @click=${(event: Event) => this.handleCmdUpdateOrderStatusClick(event)}
                >
                  ${updateLoading
                    ? '…'
                    : this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.action.cmdUpdateOrderStatus']}
                </button>
              </div>
              ${this.cmdUpdateOrderStatusState === 'success'
                ? html`
                    <div
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm flex items-start justify-between gap-3"
                      role="status"
                    >
                      <span><!-- TODO: missing msg key action.cmdUpdateOrderStatus.success -->Status atualizado com sucesso.</span>
                      <button
                        type="button"
                        class="text-xs underline shrink-0"
                        @click=${() => {
                          /* dismiss visual only via re-query / next action */
                        }}
                      >
                        ×
                      </button>
                    </div>
                  `
                : null}
              ${this.cmdUpdateOrderStatusState === 'error'
                ? html`
                    <div
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm flex items-start justify-between gap-3"
                      role="alert"
                    >
                      <span
                        >${this.cmdUpdateOrderStatusError ||
                        '<!-- TODO: missing msg key action.cmdUpdateOrderStatus.error -->Erro ao atualizar status.'}</span
                      >
                      <button type="button" class="text-xs underline shrink-0">×</button>
                    </div>
                  `
                : null}
            </div>
          </section>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#020617)]">
              ${this.msg['section.posWorkspace.createOrderSection.title']}
            </h2>

            <div class="space-y-3">
              <div class="flex flex-wrap items-end gap-3">
                <label class="flex flex-col gap-1 text-sm min-w-[10rem]">
                  <span>${this.msg['intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.queryMenuItemsMenuCategoryId}
                    @input=${(event: Event) => this.handleQueryMenuItemsMenuCategoryIdChange(event)}
                  />
                </label>
                <button
                  type="button"
                  class="rounded-md px-4 py-2 font-medium bg-[var(--button-secondary-bg,#f1f5f9)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#e2e8f0)] disabled:opacity-60"
                  ?disabled=${menuItemsLoading}
                  @click=${(event: Event) => this.handleQueryMenuItemsClick(event)}
                >
                  ${menuItemsLoading ? '…' : this.msg['organism.posWorkspace.queryMenuItems.title']}
                </button>
              </div>

              ${menuItemsLoading
                ? html`
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" aria-busy="true">
                      ${[0, 1, 2].map(
                        () => html`
                          <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f1f5f9)] h-36 animate-pulse"></div>
                        `,
                      )}
                    </div>
                  `
                : menuItems.length === 0
                  ? html`
                      <p class="text-sm text-[var(--text-muted,#64748b)] py-6 text-center">
                        ${this.msg['intent.posWorkspace.queryMenuItems.list.empty']}
                      </p>
                    `
                  : html`
                      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        ${menuItems.map((item: QueryMenuItemsOutput) => {
                          const row = item as QueryMenuItemsOutput & Record<string, unknown>;
                          const menuItemId = String(row['menuItemId'] ?? '');
                          const name = String(row['name'] ?? menuItemId);
                          const description = row['description'] != null ? String(row['description']) : '';
                          const price = row['price'] != null ? String(row['price']) : '';
                          const status = row['status'] != null ? String(row['status']) : '';
                          const selected = menuItemId !== '' && this.cmdCreateOrderMenuItemId === menuItemId;
                          return html`
                            <button
                              type="button"
                              class="text-left rounded-md border p-3 space-y-2 ${selected
                                ? 'border-[var(--selected-border,#2563eb)] bg-[var(--selected-bg,#eff6ff)]'
                                : 'border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)]'}"
                              @click=${() => {
                                if (menuItemId) this.setCmdCreateOrderMenuItemId(menuItemId);
                              }}
                            >
                              <div
                                class="w-full aspect-[16/9] rounded-md bg-[var(--surface-alt-bg,#f1f5f9)] border border-[var(--border-subtle,#e2e8f0)]"
                                aria-hidden="true"
                              ></div>
                              <div class="text-sm font-semibold text-[var(--text-strong,#020617)]">${name}</div>
                              ${description
                                ? html`<p class="text-xs text-[var(--text-muted,#64748b)] line-clamp-2">${description}</p>`
                                : null}
                              <div class="flex items-center justify-between gap-2 text-xs">
                                ${price
                                  ? html`<span class="font-medium">${this.msg['intent.posWorkspace.queryMenuItems.list.column.price.label']}: ${price}</span>`
                                  : html`<span></span>`}
                                ${status
                                  ? html`<span class="text-[var(--text-muted,#64748b)]">${status}</span>`
                                  : null}
                              </div>
                            </button>
                          `;
                        })}
                      </div>
                    `}
            </div>

            <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
              <h3 class="text-base font-semibold text-[var(--text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.cmdCreateOrder.title']}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.orderType.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderOrderType}
                    @input=${(event: Event) => this.handleCmdCreateOrderOrderTypeChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.tableNumber.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderTableNumber}
                    @input=${(event: Event) => this.handleCmdCreateOrderTableNumberChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.customerName.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderCustomerName}
                    @input=${(event: Event) => this.handleCmdCreateOrderCustomerNameChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.dailyShiftId.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderDailyShiftId}
                    @input=${(event: Event) => this.handleCmdCreateOrderDailyShiftIdChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.menuItemId.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderMenuItemId}
                    @input=${(event: Event) => this.handleCmdCreateOrderMenuItemIdChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.quantity.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderQuantity}
                    @input=${(event: Event) => this.handleCmdCreateOrderQuantityChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.observations.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderObservations}
                    @input=${(event: Event) => this.handleCmdCreateOrderObservationsChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.notes.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdCreateOrderNotes}
                    @input=${(event: Event) => this.handleCmdCreateOrderNotesChange(event)}
                  />
                </label>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  class="rounded-md px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${createLoading}
                  @click=${(event: Event) => this.handleCmdCreateOrderClick(event)}
                >
                  ${createLoading
                    ? '…'
                    : this.msg['intent.posWorkspace.cmdCreateOrder.form.action.cmdCreateOrder']}
                </button>
              </div>
              ${this.cmdCreateOrderState === 'success'
                ? html`
                    <div
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm flex items-start justify-between gap-3"
                      role="status"
                    >
                      <span><!-- TODO: missing msg key action.cmdCreateOrder.success -->Pedido criado com sucesso.</span>
                      <button type="button" class="text-xs underline shrink-0">×</button>
                    </div>
                  `
                : null}
              ${this.cmdCreateOrderState === 'error'
                ? html`
                    <div
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm flex items-start justify-between gap-3"
                      role="alert"
                    >
                      <span
                        >${this.cmdCreateOrderError ||
                        '<!-- TODO: missing msg key action.cmdCreateOrder.error -->Erro ao criar pedido.'}</span
                      >
                      <button type="button" class="text-xs underline shrink-0">×</button>
                    </div>
                  `
                : null}
            </div>
          </section>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#020617)]">
              ${this.msg['section.posWorkspace.paymentSection.title']}
            </h2>

            <div class="rounded-md border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
              <h3 class="text-base font-semibold text-[var(--text-strong,#020617)]">
                ${this.msg['organism.posWorkspace.cmdRecordBasicPayment.title']}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex flex-col gap-1 text-sm">
                  <span>orderId</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdRecordBasicPaymentOrderId}
                    @input=${(event: Event) => this.handleCmdRecordBasicPaymentOrderIdChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdRecordBasicPaymentTotalAmount}
                    @input=${(event: Event) => this.handleCmdRecordBasicPaymentTotalAmountChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.paymentMethod.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdRecordBasicPaymentPaymentMethod}
                    @input=${(event: Event) => this.handleCmdRecordBasicPaymentPaymentMethodChange(event)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span>${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.notes.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.cmdRecordBasicPaymentNotes}
                    @input=${(event: Event) => this.handleCmdRecordBasicPaymentNotesChange(event)}
                  />
                </label>
              </div>
              <div class="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  class="rounded-md px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${paymentLoading}
                  @click=${(event: Event) => this.handleCmdRecordBasicPaymentClick(event)}
                >
                  ${paymentLoading
                    ? '…'
                    : this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.action.cmdRecordBasicPayment']}
                </button>
              </div>
              ${this.cmdRecordBasicPaymentState === 'success'
                ? html`
                    <div
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm flex items-start justify-between gap-3"
                      role="status"
                    >
                      <span><!-- TODO: missing msg key action.cmdRecordBasicPayment.success -->Pagamento registrado com sucesso.</span>
                      <button type="button" class="text-xs underline shrink-0">×</button>
                    </div>
                  `
                : null}
              ${this.cmdRecordBasicPaymentState === 'error'
                ? html`
                    <div
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm flex items-start justify-between gap-3"
                      role="alert"
                    >
                      <span
                        >${this.cmdRecordBasicPaymentError ||
                        '<!-- TODO: missing msg key action.cmdRecordBasicPayment.error -->Erro ao registrar pagamento.'}</span
                      >
                      <button type="button" class="text-xs underline shrink-0">×</button>
                    </div>
                  `
                : null}
            </div>
          </section>
        </div>
      </div>
    `;
  }
}
