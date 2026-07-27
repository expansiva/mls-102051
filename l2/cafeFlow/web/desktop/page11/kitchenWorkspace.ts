/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/kitchenWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowKitchenWorkspaceBase } from '/_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.js';
import type { FetchKitchenQueueOutput } from '/_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.js';

@customElement('cafe-flow--web--desktop--page11--kitchen-workspace-102051')
export class CafeFlowDesktopPage11KitchenWorkspacePage extends CafeFlowKitchenWorkspaceBase {
  render() {
    const queue: FetchKitchenQueueOutput[] = Array.isArray(this.fetchKitchenQueueData)
      ? this.fetchKitchenQueueData
      : [];
    const isQueueLoading = this.fetchKitchenQueueState === 'loading';
    const isChangeLoading = this.changeOrderStatusState === 'loading';

    const formatItems = (raw: unknown): string => {
      if (raw == null) return '';
      if (!Array.isArray(raw)) return String(raw);
      return raw
        .map((line: unknown) => {
          if (line == null) return '';
          if (typeof line !== 'object') return String(line);
          const row = line as {
            name?: unknown;
            menuItemName?: unknown;
            itemName?: unknown;
            quantity?: unknown;
            qty?: unknown;
            notes?: unknown;
          };
          const name = String(row.name ?? row.menuItemName ?? row.itemName ?? '');
          const qty = row.quantity ?? row.qty;
          const notes = row.notes != null && String(row.notes) !== '' ? ` (${String(row.notes)})` : '';
          if (qty != null && name) return `${String(qty)}× ${name}${notes}`;
          if (name) return `${name}${notes}`;
          return JSON.stringify(line);
        })
        .filter((s: string) => s.length > 0)
        .join(', ');
    };

    const statusLanes: { key: string; label: string; items: FetchKitchenQueueOutput[] }[] = [
      {
        key: 'confirmed',
        label: 'confirmed',
        items: queue.filter((o: FetchKitchenQueueOutput) => String((o as { status?: unknown }).status ?? '') === 'confirmed'),
      },
      {
        key: 'inPreparation',
        label: 'inPreparation',
        items: queue.filter(
          (o: FetchKitchenQueueOutput) => String((o as { status?: unknown }).status ?? '') === 'inPreparation',
        ),
      },
      {
        key: 'ready',
        label: 'ready',
        items: queue.filter((o: FetchKitchenQueueOutput) => String((o as { status?: unknown }).status ?? '') === 'ready'),
      },
    ];
    const otherItems = queue.filter((o: FetchKitchenQueueOutput) => {
      const s = String((o as { status?: unknown }).status ?? '');
      return s !== 'confirmed' && s !== 'inPreparation' && s !== 'ready';
    });
    if (otherItems.length > 0) {
      statusLanes.push({ key: 'other', label: 'other', items: otherItems });
    }

    const renderOrderCard = (item: FetchKitchenQueueOutput) => {
      const orderId = String((item as { orderId?: unknown }).orderId ?? '');
      const orderType = String((item as { orderType?: unknown }).orderType ?? '');
      const tableNumber = (item as { tableNumber?: unknown }).tableNumber;
      const customerName = String((item as { customerName?: unknown }).customerName ?? '');
      const notes = String((item as { notes?: unknown }).notes ?? '');
      const status = String((item as { status?: unknown }).status ?? '');
      const confirmedAt = String((item as { confirmedAt?: unknown }).confirmedAt ?? '');
      const inPreparationAt = String((item as { inPreparationAt?: unknown }).inPreparationAt ?? '');
      const itemsLabel = formatItems((item as { items?: unknown }).items);
      const selected = this.changeOrderStatusOrderId !== '' && this.changeOrderStatusOrderId === orderId;

      return html`
        <button
          type="button"
          class="text-left w-full rounded-lg border p-3 space-y-2 shadow-sm transition-shadow ${selected
            ? 'border-[var(--selected-border,#2563eb)] bg-[var(--selected-bg,#eff6ff)] text-[var(--selected-text,#0f172a)] ring-2 ring-[var(--focus-ring,#2563eb)]'
            : 'border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] text-[var(--text-default,#0f172a)]'}"
          @click=${() => {
            this.setChangeOrderStatusOrderId(orderId);
          }}
        >
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <div class="text-sm font-semibold truncate">
                ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label']}: ${orderId || '—'}
              </div>
              <div class="text-xs text-[var(--text-muted,#64748b)]">
                ${orderType || '—'}
                ${tableNumber != null && String(tableNumber) !== ''
                  ? html` · ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.tableNumber.label']}:
                      ${String(tableNumber)}`
                  : nothing}
                ${customerName
                  ? html` · ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.customerName.label']}:
                      ${customerName}`
                  : nothing}
              </div>
            </div>
            <span
              class="shrink-0 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-[var(--status-neutral-bg,#f1f5f9)] text-[var(--status-neutral-text,#334155)]"
            >
              ${status || '—'}
            </span>
          </div>
          ${itemsLabel
            ? html`
                <div class="text-sm">
                  <span class="font-medium"
                    >${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.items.label']}:</span
                  >
                  ${itemsLabel}
                </div>
              `
            : nothing}
          ${notes
            ? html`
                <div class="text-xs text-[var(--text-muted,#64748b)]">
                  <span class="font-medium"
                    >${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.notes.label']}:</span
                  >
                  ${notes}
                </div>
              `
            : nothing}
          <div class="flex flex-wrap gap-x-3 gap-y-1 text-xs text-[var(--text-muted,#64748b)]">
            ${confirmedAt
              ? html`<span
                  >${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.confirmedAt.label']}:
                  ${confirmedAt}</span
                >`
              : nothing}
            ${inPreparationAt
              ? html`<span
                  >${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.inPreparationAt.label']}:
                  ${inPreparationAt}</span
                >`
              : nothing}
          </div>
        </button>
      `;
    };

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.kitchenWorkspace.kitchenQueueSection.title']}
            </h1>
          </header>

          <section
            class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm"
          >
            <div class="flex flex-col sm:flex-row sm:items-end gap-3 justify-between">
              <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                ${this.msg['organism.kitchenWorkspace.fetchKitchenQueue.title']}
              </h2>
              <div class="flex flex-col sm:flex-row gap-2 sm:items-end">
                <label class="flex flex-col gap-1 text-sm min-w-[12rem]">
                  <span class="text-[var(--text-muted,#64748b)]"
                    >${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.filter.dailyShiftId.label']}</span
                  >
                  <input
                    type="text"
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                    .value=${this.fetchKitchenQueueDailyShiftId ?? ''}
                    @input=${(event: Event) => this.handleFetchKitchenQueueDailyShiftIdChange(event)}
                    @change=${(event: Event) => this.handleFetchKitchenQueueDailyShiftIdChange(event)}
                  />
                </label>
                <button
                  type="button"
                  class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${isQueueLoading}
                  @click=${(event: Event) => this.handleFetchKitchenQueueClick(event)}
                >
                  ${isQueueLoading
                    ? html`<span class="inline-flex items-center gap-2"
                        ><span
                          class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                          aria-hidden="true"
                        ></span
                        >…</span
                      >`
                    : this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.title']}
                </button>
              </div>
            </div>

            ${isQueueLoading
              ? html`
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-3" aria-busy="true">
                    ${[0, 1, 2].map(
                      (_n: number) => html`
                        <div
                          class="h-28 rounded-lg bg-[var(--surface-alt-bg,#f1f5f9)] border border-[var(--border-subtle,#e2e8f0)] animate-pulse"
                        ></div>
                      `,
                    )}
                  </div>
                `
              : queue.length === 0
                ? html`
                    <p class="text-sm text-[var(--text-muted,#64748b)] py-6 text-center">
                      ${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.empty']}
                    </p>
                  `
                : html`
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                      ${statusLanes.map(
                        (lane: { key: string; label: string; items: FetchKitchenQueueOutput[] }) => html`
                          <div
                            class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-2 space-y-2 min-h-[8rem]"
                          >
                            <div
                              class="sticky top-0 z-10 flex items-center justify-between px-1 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted,#64748b)]"
                            >
                              <span>${lane.label}</span>
                              <span
                                class="inline-flex min-w-[1.5rem] justify-center rounded-md bg-[var(--status-neutral-bg,#e2e8f0)] px-1.5 py-0.5 text-[var(--status-neutral-text,#334155)]"
                                >${lane.items.length}</span
                              >
                            </div>
                            <div class="space-y-2">
                              ${lane.items.length === 0
                                ? html`<p class="text-xs text-[var(--text-muted,#64748b)] px-1 py-2">—</p>`
                                : lane.items.map((item: FetchKitchenQueueOutput) => renderOrderCard(item))}
                            </div>
                          </div>
                        `,
                      )}
                    </div>
                  `}
          </section>

          <section
            class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm"
          >
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['organism.kitchenWorkspace.changeOrderStatus.title']}
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                <span class="text-[var(--text-muted,#64748b)]"
                  >${this.msg['intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label']}</span
                >
                <input
                  type="text"
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                  .value=${this.changeOrderStatusOrderId ?? ''}
                  @input=${(event: Event) => this.handleChangeOrderStatusOrderIdChange(event)}
                  @change=${(event: Event) => this.handleChangeOrderStatusOrderIdChange(event)}
                />
              </label>

              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]"
                  >${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.status.label']}</span
                >
                <select
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                  .value=${this.changeOrderStatusStatus ?? ''}
                  @change=${(event: Event) => this.handleChangeOrderStatusStatusChange(event)}
                >
                  <option value=""></option>
                  <option value="inPreparation" ?selected=${this.changeOrderStatusStatus === 'inPreparation'}>
                    inPreparation
                  </option>
                  <option value="ready" ?selected=${this.changeOrderStatusStatus === 'ready'}>ready</option>
                  <option value="cancelled" ?selected=${this.changeOrderStatusStatus === 'cancelled'}>cancelled</option>
                </select>
              </label>

              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]"
                  >${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.updatedAt.label']}</span
                >
                <input
                  type="text"
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                  .value=${this.changeOrderStatusUpdatedAt ?? ''}
                  @input=${(event: Event) => this.handleChangeOrderStatusUpdatedAtChange(event)}
                  @change=${(event: Event) => this.handleChangeOrderStatusUpdatedAtChange(event)}
                />
              </label>

              ${this.changeOrderStatusStatus === 'cancelled'
                ? html`
                    <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                      <span class="text-[var(--text-muted,#64748b)]"
                        >${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason.label']}</span
                      >
                      <input
                        type="text"
                        class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                        .value=${this.changeOrderStatusCancellationReason ?? ''}
                        @input=${(event: Event) => this.handleChangeOrderStatusCancellationReasonChange(event)}
                        @change=${(event: Event) => this.handleChangeOrderStatusCancellationReasonChange(event)}
                      />
                    </label>
                  `
                : html`
                    <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                      <span class="text-[var(--text-muted,#64748b)]"
                        >${this.msg['intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason.label']}</span
                      >
                      <input
                        type="text"
                        class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 text-[var(--text-default,#0f172a)]"
                        .value=${this.changeOrderStatusCancellationReason ?? ''}
                        @input=${(event: Event) => this.handleChangeOrderStatusCancellationReasonChange(event)}
                        @change=${(event: Event) => this.handleChangeOrderStatusCancellationReasonChange(event)}
                      />
                    </label>
                  `}
            </div>

            <div class="flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${isChangeLoading}
                @click=${(event: Event) => this.handleChangeOrderStatusClick(event)}
              >
                ${isChangeLoading
                  ? html`<span class="inline-flex items-center gap-2"
                      ><span
                        class="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                        aria-hidden="true"
                      ></span
                      >…</span
                    >`
                  : this.msg['intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus']}
              </button>
            </div>

            ${this.changeOrderStatusState === 'success'
              ? html`
                  <div
                    class="flex items-start justify-between gap-3 rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] px-3 py-2 text-sm text-[var(--status-success-text,#166534)]"
                    role="status"
                  >
                    <span><!-- TODO: action.changeOrderStatus.success msg key not in shared MessageType -->Status atualizado com sucesso.</span>
                    <button
                      type="button"
                      class="shrink-0 text-xs font-medium underline"
                      @click=${() => {
                        this.changeOrderStatusState = 'idle';
                      }}
                    >
                      ×
                    </button>
                  </div>
                `
              : this.changeOrderStatusState === 'error'
                ? html`
                    <div
                      class="flex items-start justify-between gap-3 rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] px-3 py-2 text-sm text-[var(--status-error-text,#991b1b)]"
                      role="alert"
                    >
                      <span
                        >${this.changeOrderStatusError && this.changeOrderStatusError.length > 0
                          ? this.changeOrderStatusError
                          : html`<!-- TODO: action.changeOrderStatus.error msg key not in shared MessageType -->Erro ao atualizar status.`}</span
                      >
                      <button
                        type="button"
                        class="shrink-0 text-xs font-medium underline"
                        @click=${() => {
                          this.changeOrderStatusState = 'idle';
                        }}
                      >
                        ×
                      </button>
                    </div>
                  `
                : nothing}
          </section>
        </div>
      </div>
    `;
  }
}
