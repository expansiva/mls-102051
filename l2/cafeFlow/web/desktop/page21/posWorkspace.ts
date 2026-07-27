/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
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
  createdAt?: string;
};

type StatusLane = { id: string; label: string };

@customElement('cafe-flow--web--desktop--page21--pos-workspace-102051')
export class CafeFlowDesktopPage21PosWorkspacePage extends CafeFlowPosWorkspaceBase {
  render() {
    const openOrdersRaw = this.queryOpenOrdersData as { orders?: OpenOrderRow[]; total?: number } | null;
    const orders: OpenOrderRow[] = Array.isArray(openOrdersRaw?.orders) ? openOrdersRaw!.orders! : [];
    const ordersTotal = typeof openOrdersRaw?.total === 'number' ? openOrdersRaw!.total! : orders.length;
    const menuItems: QueryMenuItemsOutput[] = Array.isArray(this.queryMenuItemsData) ? this.queryMenuItemsData : [];

    const selectedOrderId = this.cmdUpdateOrderStatusOrderId || this.cmdRecordBasicPaymentOrderId || '';
    const selectedOrder: OpenOrderRow | undefined = orders.find((o: OpenOrderRow) => (o.orderId ?? '') === selectedOrderId);

    const statusLanes: StatusLane[] = [
      { id: 'registered', label: 'Registrado' },
      { id: 'confirmed', label: 'Confirmado' },
      { id: 'inPreparation', label: 'Em preparo' },
      { id: 'ready', label: 'Pronto' },
    ];

    const nextTransitions = (status: string): { status: string; label: string; danger?: boolean }[] => {
      const current = (status || '').trim();
      if (current === 'registered') {
        return [
          { status: 'confirmed', label: 'Confirmar' },
          { status: 'cancelled', label: 'Cancelar', danger: true },
        ];
      }
      if (current === 'confirmed') {
        return [
          { status: 'inPreparation', label: 'Iniciar preparo' },
          { status: 'cancelled', label: 'Cancelar', danger: true },
        ];
      }
      if (current === 'inPreparation') {
        return [
          { status: 'ready', label: 'Marcar pronto' },
          { status: 'cancelled', label: 'Cancelar', danger: true },
        ];
      }
      if (current === 'ready') {
        return [
          { status: 'served', label: 'Servir' },
          { status: 'cancelled', label: 'Cancelar', danger: true },
        ];
      }
      return [];
    };

    const formatMoney = (value: string | number | undefined): string => {
      if (value === undefined || value === null || value === '') return '—';
      const n = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(n)) {
        return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
      }
      return String(value);
    };

    const orderLabel = (order: OpenOrderRow): string => {
      if (order.orderType === 'takeout' || order.orderType === 'Takeout') {
        return order.customerName ? `Takeout · ${order.customerName}` : 'Takeout';
      }
      if (order.tableNumber !== undefined && order.tableNumber !== null && `${order.tableNumber}` !== '') {
        return `Mesa ${order.tableNumber}`;
      }
      return order.customerName || order.orderId || 'Pedido';
    };

    const categoryIds: string[] = [];
    for (const item of menuItems) {
      const row = item as QueryMenuItemsOutput & { menuCategoryId?: string };
      const cat = row.menuCategoryId ? String(row.menuCategoryId) : '';
      if (cat && !categoryIds.includes(cat)) categoryIds.push(cat);
    }

    const selectOrder = (order: OpenOrderRow): void => {
      const id = order.orderId ?? '';
      this.setCmdUpdateOrderStatusOrderId(id);
      this.setCmdRecordBasicPaymentOrderId(id);
      if (order.totalAmount !== undefined && order.totalAmount !== null && `${order.totalAmount}` !== '') {
        this.setCmdRecordBasicPaymentTotalAmount(String(order.totalAmount));
      }
    };

    const runStatusTransition = (orderId: string, status: string): void => {
      this.setCmdUpdateOrderStatusOrderId(orderId);
      this.setCmdUpdateOrderStatusStatus(status);
      this.handleCmdUpdateOrderStatusClick();
    };

    const pickMenuItem = (item: QueryMenuItemsOutput & { menuItemId?: string; name?: string }): void => {
      const id = item.menuItemId ? String(item.menuItemId) : '';
      this.setCmdCreateOrderMenuItemId(id);
      if (!this.cmdCreateOrderQuantity) {
        this.setCmdCreateOrderQuantity('1');
      }
    };

    const openOrdersLoading = this.queryOpenOrdersState === 'loading';
    const menuLoading = this.queryMenuItemsState === 'loading';
    const createLoading = this.cmdCreateOrderState === 'loading';
    const statusLoading = this.cmdUpdateOrderStatusState === 'loading';
    const paymentLoading = this.cmdRecordBasicPaymentState === 'loading';

    const canCreate = Boolean(this.cmdCreateOrderMenuItemId) && Boolean(this.cmdCreateOrderOrderType) && !createLoading;

    return html`
      <div class="min-h-screen bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)] p-4 md:p-6 space-y-6">
        <header class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 class="text-2xl font-bold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['section.posWorkspace.sec-open-orders.title']}
            </h1>
            <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
              ${this.msg['organism.posWorkspace.queryOpenOrders.title']}
            </p>
          </div>
          <div class="flex flex-wrap gap-2 items-center">
            <div class="rounded-lg px-4 py-2 bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-default,#e2e8f0)] shadow-sm">
              <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.posWorkspace.queryOpenOrders.list.column.total.label']}
              </div>
              <div class="text-xl font-semibold">${ordersTotal}</div>
            </div>
            <button
              type="button"
              class="min-h-12 px-5 rounded-lg font-semibold bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#cbd5e1)]"
              ?disabled=${openOrdersLoading}
              @click=${(e: Event) => this.handleQueryOpenOrdersClick(e)}
            >
              ${openOrdersLoading ? 'Atualizando…' : this.msg['intent.posWorkspace.queryOpenOrders.list.title']}
            </button>
          </div>
        </header>

        <section class="space-y-3" aria-label=${this.msg['section.posWorkspace.sec-open-orders.title']}>
          <div class="flex flex-wrap gap-2 items-end rounded-lg bg-[var(--ds-color-surface-bg,#ffffff)] border border-[var(--ds-color-border-subtle,#e2e8f0)] p-3">
            <label class="flex flex-col gap-1 text-xs font-medium min-w-[8rem]">
              <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.status.label']}</span>
              <select
                class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                .value=${this.queryOpenOrdersStatus}
                @change=${(e: Event) => this.handleQueryOpenOrdersStatusChange(e)}
              >
                <option value="">Todos</option>
                <option value="registered">registered</option>
                <option value="confirmed">confirmed</option>
                <option value="inPreparation">inPreparation</option>
                <option value="ready">ready</option>
              </select>
            </label>
            <label class="flex flex-col gap-1 text-xs font-medium min-w-[8rem]">
              <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.orderType.label']}</span>
              <select
                class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                .value=${this.queryOpenOrdersOrderType}
                @change=${(e: Event) => this.handleQueryOpenOrdersOrderTypeChange(e)}
              >
                <option value="">Todos</option>
                <option value="table">Mesa</option>
                <option value="takeout">Takeout</option>
              </select>
            </label>
            <label class="flex flex-col gap-1 text-xs font-medium min-w-[8rem]">
              <span>${this.msg['intent.posWorkspace.queryOpenOrders.list.filter.tableNumber.label']}</span>
              <input
                type="text"
                class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                .value=${this.queryOpenOrdersTableNumber}
                @change=${(e: Event) => this.handleQueryOpenOrdersTableNumberChange(e)}
              />
            </label>
            <button
              type="button"
              class="min-h-11 px-4 rounded-md font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)]"
              ?disabled=${openOrdersLoading}
              @click=${(e: Event) => this.handleQueryOpenOrdersClick(e)}
            >
              Filtrar
            </button>
          </div>

          ${openOrdersLoading
            ? html`
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                  ${[0, 1, 2, 3].map(
                    (_n: number) => html`
                      <div class="h-40 rounded-lg bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] animate-pulse border border-[var(--ds-color-border-subtle,#e2e8f0)]"></div>
                    `,
                  )}
                </div>
              `
            : orders.length === 0
              ? html`
                  <div class="rounded-lg border border-dashed border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-8 text-center text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.posWorkspace.queryOpenOrders.list.empty']}
                  </div>
                `
              : html`
                  <div class="grid grid-cols-1 xl:grid-cols-3 gap-4">
                    <div class="xl:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      ${statusLanes.map((lane: StatusLane) => {
                        const laneOrders = orders.filter((o: OpenOrderRow) => (o.status || '') === lane.id);
                        return html`
                          <div class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] min-h-[12rem] flex flex-col">
                            <div class="px-3 py-2 border-b border-[var(--ds-color-border-subtle,#e2e8f0)] flex items-center justify-between">
                              <span class="text-sm font-semibold">${lane.label}</span>
                              <span class="text-xs rounded-full px-2 py-0.5 bg-[var(--ds-color-status-neutral-bg,#e2e8f0)] text-[var(--ds-color-status-neutral-text,#334155)]">${laneOrders.length}</span>
                            </div>
                            <div class="p-2 space-y-2 flex-1 overflow-y-auto max-h-[28rem]">
                              ${laneOrders.length === 0
                                ? html`<p class="text-xs text-[var(--ds-color-text-muted,#64748b)] px-1 py-2">—</p>`
                                : laneOrders.map((order: OpenOrderRow) => {
                                    const oid = order.orderId ?? '';
                                    const isSelected = oid !== '' && oid === selectedOrderId;
                                    return html`
                                      <button
                                        type="button"
                                        class="w-full text-left rounded-lg border p-3 min-h-16 transition shadow-sm ${isSelected
                                          ? 'bg-[var(--ds-color-selected-bg,#dbeafe)] border-[var(--ds-color-selected-border,#2563eb)] text-[var(--ds-color-selected-text,#0f172a)]'
                                          : 'bg-[var(--ds-color-surface-bg,#ffffff)] border-[var(--ds-color-border-default,#e2e8f0)]'}"
                                        @click=${() => selectOrder(order)}
                                      >
                                        <div class="font-semibold text-sm">${orderLabel(order)}</div>
                                        <div class="text-xs text-[var(--ds-color-text-muted,#64748b)] mt-1 flex justify-between gap-2">
                                          <span>${order.status || '—'}</span>
                                          <span class="font-medium text-[var(--ds-color-text-default,#0f172a)]">${formatMoney(order.totalAmount)}</span>
                                        </div>
                                      </button>
                                    `;
                                  })}
                            </div>
                          </div>
                        `;
                      })}
                    </div>

                    <aside class="space-y-4">
                      <div class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 space-y-3">
                        <h2 class="text-base font-semibold text-[var(--ds-color-text-strong,#020617)]">
                          ${this.msg['organism.posWorkspace.cmdUpdateOrderStatus.title']}
                        </h2>
                        ${selectedOrder
                          ? html`
                              <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] p-3 text-sm space-y-1">
                                <div class="font-semibold">${orderLabel(selectedOrder)}</div>
                                <div class="text-[var(--ds-color-text-muted,#64748b)]">Status: ${selectedOrder.status || '—'}</div>
                                <div>${formatMoney(selectedOrder.totalAmount)}</div>
                              </div>
                              <div class="flex flex-col gap-2">
                                ${nextTransitions(selectedOrder.status || '').map(
                                  (t: { status: string; label: string; danger?: boolean }) => html`
                                    <button
                                      type="button"
                                      class="min-h-12 w-full rounded-lg px-4 font-semibold ${t.danger
                                        ? 'bg-[var(--ds-color-button-danger-bg,#dc2626)] text-[var(--ds-color-button-danger-text,#ffffff)]'
                                        : 'bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)]'}"
                                      ?disabled=${statusLoading || !selectedOrder.orderId}
                                      @click=${() => runStatusTransition(selectedOrder.orderId || '', t.status)}
                                    >
                                      ${statusLoading ? 'Atualizando…' : t.label}
                                    </button>
                                  `,
                                )}
                              </div>
                              ${this.cmdUpdateOrderStatusStatus === 'cancelled' || (selectedOrder.status || '') === 'cancelled'
                                ? html`
                                    <label class="flex flex-col gap-1 text-xs font-medium">
                                      <span>${this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason.label']}</span>
                                      <input
                                        type="text"
                                        class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                                        .value=${this.cmdUpdateOrderStatusCancellationReason}
                                        @change=${(e: Event) => this.handleCmdUpdateOrderStatusCancellationReasonChange(e)}
                                      />
                                    </label>
                                  `
                                : this.cmdUpdateOrderStatusStatus === 'cancelled' || nextTransitions(selectedOrder.status || '').some((t: { status: string }) => t.status === 'cancelled')
                                  ? html`
                                      <label class="flex flex-col gap-1 text-xs font-medium">
                                        <span>${this.msg['intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason.label']}</span>
                                        <input
                                          type="text"
                                          class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                                          .value=${this.cmdUpdateOrderStatusCancellationReason}
                                          @change=${(e: Event) => this.handleCmdUpdateOrderStatusCancellationReasonChange(e)}
                                        />
                                      </label>
                                    `
                                  : nothing}
                            `
                          : html`
                              <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                                Selecione um pedido na fila para ver as transições permitidas.
                              </p>
                            `}
                        ${this.cmdUpdateOrderStatusState === 'success'
                          ? html`
                              <div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]">
                                Status atualizado com sucesso.
                              </div>
                            `
                          : this.cmdUpdateOrderStatusState === 'error'
                            ? html`
                                <div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]">
                                  ${this.cmdUpdateOrderStatusError || 'Falha ao atualizar status.'}
                                </div>
                              `
                            : nothing}
                      </div>

                      <div class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 space-y-3">
                        <h2 class="text-base font-semibold text-[var(--ds-color-text-strong,#020617)]">
                          ${this.msg['section.posWorkspace.sec-payment.title']}
                        </h2>
                        <p class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['organism.posWorkspace.cmdRecordBasicPayment.title']}
                        </p>
                        ${selectedOrder
                          ? html`
                              <div class="rounded-md bg-[var(--ds-color-status-info-bg,#e0f2fe)] text-[var(--ds-color-status-info-text,#075985)] px-3 py-3">
                                <div class="text-xs uppercase tracking-wide opacity-80">
                                  ${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount.label']}
                                </div>
                                <div class="text-2xl font-bold">${formatMoney(selectedOrder.totalAmount ?? this.cmdRecordBasicPaymentTotalAmount)}</div>
                              </div>
                              <label class="flex flex-col gap-1 text-xs font-medium">
                                <span>${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount.label']}</span>
                                <input
                                  type="text"
                                  inputmode="decimal"
                                  class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                                  .value=${this.cmdRecordBasicPaymentTotalAmount}
                                  @change=${(e: Event) => this.handleCmdRecordBasicPaymentTotalAmountChange(e)}
                                />
                              </label>
                              <label class="flex flex-col gap-1 text-xs font-medium">
                                <span>${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.paymentMethod.label']}</span>
                                <select
                                  class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                                  .value=${this.cmdRecordBasicPaymentPaymentMethod}
                                  @change=${(e: Event) => this.handleCmdRecordBasicPaymentPaymentMethodChange(e)}
                                >
                                  <option value="">Selecione</option>
                                  <option value="cash">Dinheiro</option>
                                  <option value="credit">Crédito</option>
                                  <option value="debit">Débito</option>
                                  <option value="pix">Pix</option>
                                </select>
                              </label>
                              <label class="flex flex-col gap-1 text-xs font-medium">
                                <span>${this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.field.notes.label']}</span>
                                <input
                                  type="text"
                                  class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                                  .value=${this.cmdRecordBasicPaymentNotes}
                                  @change=${(e: Event) => this.handleCmdRecordBasicPaymentNotesChange(e)}
                                />
                              </label>
                              <button
                                type="button"
                                class="min-h-12 w-full rounded-lg font-semibold bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)]"
                                ?disabled=${paymentLoading || !this.cmdRecordBasicPaymentPaymentMethod}
                                @click=${(e: Event) => this.handleCmdRecordBasicPaymentClick(e)}
                              >
                                ${paymentLoading
                                  ? 'Registrando…'
                                  : this.msg['intent.posWorkspace.cmdRecordBasicPayment.form.action.cmdRecordBasicPayment']}
                              </button>
                            `
                          : html`
                              <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                                Selecione um pedido totalizado para registrar o pagamento.
                              </p>
                            `}
                        ${this.cmdRecordBasicPaymentState === 'success'
                          ? html`
                              <div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]">
                                Pagamento registrado com sucesso.
                              </div>
                            `
                          : this.cmdRecordBasicPaymentState === 'error'
                            ? html`
                                <div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]">
                                  ${this.cmdRecordBasicPaymentError || 'Falha ao registrar pagamento.'}
                                </div>
                              `
                            : nothing}
                      </div>
                    </aside>
                  </div>
                `}
        </section>

        <section class="space-y-4" aria-label=${this.msg['section.posWorkspace.sec-create-order.title']}>
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h2 class="text-xl font-bold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['section.posWorkspace.sec-create-order.title']}
            </h2>
            <button
              type="button"
              class="min-h-11 px-4 rounded-lg font-medium bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#cbd5e1)] self-start"
              ?disabled=${menuLoading}
              @click=${(e: Event) => this.handleQueryMenuItemsClick(e)}
            >
              ${menuLoading ? 'Carregando cardápio…' : this.msg['organism.posWorkspace.queryMenuItems.title']}
            </button>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="min-h-10 px-4 rounded-full text-sm font-medium border ${!this.queryMenuItemsMenuCategoryId
                ? 'bg-[var(--ds-color-selected-bg,#dbeafe)] border-[var(--ds-color-selected-border,#2563eb)] text-[var(--ds-color-selected-text,#0f172a)]'
                : 'bg-[var(--ds-color-surface-bg,#ffffff)] border-[var(--ds-color-border-default,#e2e8f0)]'}"
              @click=${() => {
                this.setQueryMenuItemsMenuCategoryId('');
                this.handleQueryMenuItemsClick();
              }}
            >
              Todas
            </button>
            ${categoryIds.map(
              (catId: string) => html`
                <button
                  type="button"
                  class="min-h-10 px-4 rounded-full text-sm font-medium border ${this.queryMenuItemsMenuCategoryId === catId
                    ? 'bg-[var(--ds-color-selected-bg,#dbeafe)] border-[var(--ds-color-selected-border,#2563eb)] text-[var(--ds-color-selected-text,#0f172a)]'
                    : 'bg-[var(--ds-color-surface-bg,#ffffff)] border-[var(--ds-color-border-default,#e2e8f0)]'}"
                  @click=${() => {
                    this.setQueryMenuItemsMenuCategoryId(catId);
                    this.handleQueryMenuItemsClick();
                  }}
                >
                  ${catId}
                </button>
              `,
            )}
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div class="lg:col-span-2 space-y-3">
              <h3 class="text-sm font-semibold text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.posWorkspace.queryMenuItems.list.title']}
              </h3>
              ${menuLoading
                ? html`
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                      ${[0, 1, 2, 3, 4, 5].map(
                        (_n: number) => html`
                          <div class="h-40 rounded-lg bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] animate-pulse"></div>
                        `,
                      )}
                    </div>
                  `
                : menuItems.length === 0
                  ? html`
                      <div class="rounded-lg border border-dashed border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-8 text-center text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.posWorkspace.queryMenuItems.list.empty']}
                      </div>
                    `
                  : html`
                      <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                        ${menuItems.map((raw: QueryMenuItemsOutput) => {
                          const item = raw as QueryMenuItemsOutput & {
                            menuItemId?: string;
                            name?: string;
                            description?: string;
                            price?: string | number;
                            status?: string;
                            imageUrl?: string;
                          };
                          const id = item.menuItemId ? String(item.menuItemId) : '';
                          const selected = id !== '' && id === this.cmdCreateOrderMenuItemId;
                          const name = item.name ? String(item.name) : id || 'Item';
                          const imageUrl = item.imageUrl ? String(item.imageUrl) : '';
                          return html`
                            <button
                              type="button"
                              class="text-left rounded-lg border overflow-hidden min-h-[10rem] flex flex-col ${selected
                                ? 'border-[var(--ds-color-selected-border,#2563eb)] bg-[var(--ds-color-selected-bg,#dbeafe)]'
                                : 'border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)]'}"
                              @click=${() => pickMenuItem(item)}
                            >
                              ${imageUrl
                                ? html`
                                    <img
                                      src=${imageUrl}
                                      alt=${name}
                                      loading="lazy"
                                      class="w-full h-24 object-cover bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"
                                    />
                                  `
                                : html`<div class="w-full h-24 bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>`}
                              <div class="p-3 flex-1 flex flex-col gap-1">
                                <div class="font-semibold text-sm leading-tight">${name}</div>
                                ${item.description
                                  ? html`<p class="text-xs text-[var(--ds-color-text-muted,#64748b)] line-clamp-2">${item.description}</p>`
                                  : nothing}
                                <div class="mt-auto pt-1 flex items-center justify-between gap-2">
                                  <span class="text-sm font-bold">${formatMoney(item.price)}</span>
                                  ${item.status
                                    ? html`<span class="text-[10px] uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">${item.status}</span>`
                                    : nothing}
                                </div>
                              </div>
                            </button>
                          `;
                        })}
                      </div>
                    `}
            </div>

            <div class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 space-y-3 h-fit sticky top-4">
              <h3 class="text-base font-semibold">
                ${this.msg['organism.posWorkspace.cmdCreateOrder.title']}
              </h3>
              <label class="flex flex-col gap-1 text-xs font-medium">
                <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.orderType.label']}</span>
                <select
                  class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                  .value=${this.cmdCreateOrderOrderType}
                  @change=${(e: Event) => this.handleCmdCreateOrderOrderTypeChange(e)}
                >
                  <option value="">Selecione</option>
                  <option value="table">Mesa</option>
                  <option value="takeout">Takeout</option>
                </select>
              </label>
              ${this.cmdCreateOrderOrderType === 'takeout'
                ? html`
                    <label class="flex flex-col gap-1 text-xs font-medium">
                      <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.customerName.label']}</span>
                      <input
                        type="text"
                        class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                        .value=${this.cmdCreateOrderCustomerName}
                        @change=${(e: Event) => this.handleCmdCreateOrderCustomerNameChange(e)}
                      />
                    </label>
                  `
                : html`
                    <label class="flex flex-col gap-1 text-xs font-medium">
                      <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.tableNumber.label']}</span>
                      <input
                        type="text"
                        class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                        .value=${this.cmdCreateOrderTableNumber}
                        @change=${(e: Event) => this.handleCmdCreateOrderTableNumberChange(e)}
                      />
                    </label>
                  `}
              <label class="flex flex-col gap-1 text-xs font-medium">
                <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.notes.label']}</span>
                <input
                  type="text"
                  class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                  .value=${this.cmdCreateOrderNotes}
                  @change=${(e: Event) => this.handleCmdCreateOrderNotesChange(e)}
                />
              </label>
              <div class="rounded-md bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] p-3 text-sm space-y-1">
                <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.menuItemId.label']}
                </div>
                <div class="font-semibold">
                  ${this.cmdCreateOrderMenuItemId
                    ? this.cmdCreateOrderMenuItemId
                    : html`<span class="text-[var(--ds-color-text-muted,#64748b)] font-normal">Toque em um item do cardápio</span>`}
                </div>
              </div>
              <label class="flex flex-col gap-1 text-xs font-medium">
                <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.quantity.label']}</span>
                <input
                  type="number"
                  min="1"
                  class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                  .value=${this.cmdCreateOrderQuantity}
                  @change=${(e: Event) => this.handleCmdCreateOrderQuantityChange(e)}
                />
              </label>
              <label class="flex flex-col gap-1 text-xs font-medium">
                <span>${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.observations.label']}</span>
                <input
                  type="text"
                  class="min-h-11 rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 text-sm"
                  .value=${this.cmdCreateOrderObservations}
                  @change=${(e: Event) => this.handleCmdCreateOrderObservationsChange(e)}
                />
              </label>
              ${this.cmdCreateOrderDailyShiftId
                ? html`
                    <div class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.posWorkspace.cmdCreateOrder.form.field.dailyShiftId.label']}:
                      <span class="font-medium text-[var(--ds-color-text-default,#0f172a)]">${this.cmdCreateOrderDailyShiftId}</span>
                    </div>
                  `
                : nothing}
              <button
                type="button"
                class="min-h-12 w-full rounded-lg font-semibold bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-50"
                ?disabled=${!canCreate}
                @click=${(e: Event) => this.handleCmdCreateOrderClick(e)}
              >
                ${createLoading
                  ? 'Enviando…'
                  : this.msg['intent.posWorkspace.cmdCreateOrder.form.action.cmdCreateOrder']}
              </button>
              ${this.cmdCreateOrderState === 'success'
                ? html`
                    <div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]">
                      Pedido lançado com sucesso.
                    </div>
                  `
                : this.cmdCreateOrderState === 'error'
                  ? html`
                      <div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]">
                        ${this.cmdCreateOrderError || 'Falha ao lançar pedido.'}
                      </div>
                    `
                  : nothing}
            </div>
          </div>
        </section>
      </div>
    `;
  }
}
