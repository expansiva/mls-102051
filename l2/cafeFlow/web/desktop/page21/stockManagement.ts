/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

type StockItemRow = {
  stockItemId?: string;
  id?: string;
  name?: string;
  unit?: string;
  currentBalance?: number | string;
  minimumLevel?: number | string;
  description?: string;
};

@customElement('cafe-flow--web--desktop--page21--stock-management-102051')
export class CafeFlowDesktopPage21StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const listData = this.listStockItemsData as {
      stockItems?: StockItemRow[];
      total?: number;
    } | null | undefined;
    const stockItems: StockItemRow[] = Array.isArray(listData?.stockItems)
      ? listData!.stockItems!
      : [];
    const totalCount =
      typeof listData?.total === 'number' ? listData.total : stockItems.length;

    const toNumber = (value: number | string | undefined): number => {
      if (typeof value === 'number' && Number.isFinite(value)) return value;
      if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : NaN;
      }
      return NaN;
    };

    const isLowStock = (item: StockItemRow): boolean => {
      const balance = toNumber(item.currentBalance);
      const minimum = toNumber(item.minimumLevel);
      if (Number.isNaN(balance) || Number.isNaN(minimum)) return false;
      return balance <= minimum;
    };

    const lowStockCount = stockItems.filter((item: StockItemRow) => isLowStock(item)).length;

    const rowId = (item: StockItemRow): string => {
      if (typeof item.stockItemId === 'string' && item.stockItemId !== '') return item.stockItemId;
      if (typeof item.id === 'string' && item.id !== '') return item.id;
      return '';
    };

    const selectedId = this.editStockItemStockItemId || this.removeStockItemStockItemId || this.registerStockAdjustmentStockItemId;
    const selectedItem =
      selectedId !== ''
        ? stockItems.find((item: StockItemRow) => rowId(item) === selectedId)
        : undefined;

    const listLoading = this.listStockItemsState === 'loading';
    const listEmpty = !listLoading && stockItems.length === 0;

    const selectStockItem = (item: StockItemRow): void => {
      const id = rowId(item);
      if (id === '') return;
      this.setEditStockItemStockItemId(id);
      this.setRemoveStockItemStockItemId(id);
      this.setRegisterStockAdjustmentStockItemId(id);
      this.setEditStockItemName(item.name ?? '');
      this.setEditStockItemUnit(item.unit ?? '');
      this.setEditStockItemMinimumLevel(
        item.minimumLevel !== undefined && item.minimumLevel !== null
          ? String(item.minimumLevel)
          : '',
      );
      this.setEditStockItemDescription(item.description ?? '');
    };

    return html`
      <div class="min-h-full p-6 space-y-6 bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)]">
        <header class="space-y-1">
          <h1 class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.stockManagement.sec-stock-overview.title']}
          </h1>
        </header>

        <!-- 1. Summary-first: low-stock alerts -->
        <section class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm">
          <div class="flex flex-wrap items-center gap-4">
            <div
              class="min-w-[10rem] flex-1 rounded-lg border px-4 py-3 ${lowStockCount > 0
                ? 'border-[var(--ds-color-status-warning-bg,#fef3c7)] bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)]'
                : 'border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)]'}"
            >
              <p class="text-xs uppercase tracking-wide opacity-80">
                ${this.msg['intent.stockManagement.listStockItems.list.filter.lowStockOnly.label']}
              </p>
              <p class="mt-1 text-3xl font-semibold tabular-nums">
                ${listLoading ? '…' : lowStockCount}
              </p>
            </div>
            <div class="min-w-[10rem] flex-1 rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] px-4 py-3">
              <p class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.stockManagement.listStockItems.list.column.total.label']}
              </p>
              <p class="mt-1 text-3xl font-semibold tabular-nums text-[var(--ds-color-text-strong,#020617)]">
                ${listLoading ? '…' : totalCount}
              </p>
            </div>
          </div>
        </section>

        <!-- 2–3. Master-detail: filters + list + contextual panel -->
        <section class="space-y-4">
          <h2 class="text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.stockManagement.sec-stock-master-detail.title']}
          </h2>

          <!-- Filter toolbar + primary add affordance -->
          <div class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm">
            <div class="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-end">
              <label class="flex min-w-[12rem] flex-1 flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.nameFilter.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 text-[var(--ds-color-text-default,#0f172a)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-focus-ring,#94a3b8)]"
                  type="search"
                  .value=${this.listStockItemsNameFilter}
                  @input=${(event: Event) => this.handleListStockItemsNameFilterChange(event)}
                  @change=${(event: Event) => {
                    this.handleListStockItemsNameFilterChange(event);
                    this.handleListStockItemsClick();
                  }}
                />
              </label>

              <label class="flex items-center gap-2 rounded-md border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] px-3 py-2 text-sm">
                <input
                  type="checkbox"
                  class="h-4 w-4"
                  .checked=${this.listStockItemsLowStockOnly === 'true' || this.listStockItemsLowStockOnly === '1'}
                  @change=${(event: Event) => {
                    const target = event.target as HTMLInputElement | null;
                    const checked = target?.checked === true;
                    this.setListStockItemsLowStockOnly(checked ? 'true' : 'false');
                    this.handleListStockItemsClick();
                  }}
                />
                <span>${this.msg['intent.stockManagement.listStockItems.list.filter.lowStockOnly.label']}</span>
              </label>

              <label class="flex w-24 flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.page.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  min="1"
                  .value=${this.listStockItemsPage}
                  @change=${(event: Event) => {
                    this.handleListStockItemsPageChange(event);
                    this.handleListStockItemsClick();
                  }}
                />
              </label>

              <label class="flex w-28 flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.pageSize.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  min="1"
                  .value=${this.listStockItemsPageSize}
                  @change=${(event: Event) => {
                    this.handleListStockItemsPageSizeChange(event);
                    this.handleListStockItemsClick();
                  }}
                />
              </label>

              <button
                type="button"
                class="rounded-md px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#cbd5e1)] disabled:opacity-60"
                ?disabled=${listLoading}
                @click=${(event: Event) => this.handleListStockItemsClick(event)}
              >
                ${listLoading
                  ? '…'
                  : this.msg['organism.stockManagement.listStockItems.title']}
              </button>

              <a
                href="#add-stock-item"
                class="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)]"
              >
                ${this.msg['intent.stockManagement.addStockItem.form.action.addStockItem']}
              </a>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <!-- Master list -->
            <div class="lg:col-span-2 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] shadow-sm overflow-hidden">
              <div class="border-b border-[var(--ds-color-border-subtle,#e2e8f0)] px-4 py-3">
                <h3 class="font-medium text-[var(--ds-color-text-strong,#020617)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.title']}
                </h3>
              </div>

              ${listLoading
                ? html`
                    <div class="space-y-3 p-4" aria-busy="true">
                      <div class="h-10 animate-pulse rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                      <div class="h-10 animate-pulse rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                      <div class="h-10 animate-pulse rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                    </div>
                  `
                : listEmpty
                  ? html`
                      <p class="p-6 text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.stockManagement.listStockItems.list.empty']}
                      </p>
                    `
                  : html`
                      <div class="overflow-x-auto">
                        <table class="min-w-full text-left text-sm">
                          <thead class="bg-[var(--ds-color-surface-alt-bg,#f8fafc)] text-[var(--ds-color-text-muted,#64748b)]">
                            <tr>
                              <th class="px-4 py-2 font-medium">
                                ${this.msg['intent.stockManagement.editStockItem.form.field.name.label']}
                              </th>
                              <th class="px-4 py-2 font-medium">
                                ${this.msg['intent.stockManagement.editStockItem.form.field.unit.label']}
                              </th>
                              <th class="px-4 py-2 font-medium">
                                ${this.msg['intent.stockManagement.addStockItem.form.field.currentBalance.label']}
                              </th>
                              <th class="px-4 py-2 font-medium">
                                ${this.msg['intent.stockManagement.editStockItem.form.field.minimumLevel.label']}
                              </th>
                              <th class="px-4 py-2 font-medium"></th>
                            </tr>
                          </thead>
                          <tbody>
                            ${stockItems.map((item: StockItemRow) => {
                              const id = rowId(item);
                              const low = isLowStock(item);
                              const selected = id !== '' && id === selectedId;
                              return html`
                                <tr
                                  class="border-t border-[var(--ds-color-border-subtle,#e2e8f0)] cursor-pointer ${selected
                                    ? 'bg-[var(--ds-color-selected-bg,#e0e7ff)] text-[var(--ds-color-selected-text,#1e3a8a)]'
                                    : low
                                      ? 'bg-[var(--ds-color-status-warning-bg,#fef3c7)]'
                                      : 'hover:bg-[var(--ds-color-surface-alt-bg,#f8fafc)]'}"
                                  @click=${() => selectStockItem(item)}
                                >
                                  <td class="px-4 py-3 font-medium">${item.name ?? ''}</td>
                                  <td class="px-4 py-3">${item.unit ?? ''}</td>
                                  <td class="px-4 py-3 tabular-nums">
                                    ${item.currentBalance ?? ''}
                                    ${low
                                      ? html`<span class="ml-2 inline-block rounded px-1.5 py-0.5 text-xs bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)]">!</span>`
                                      : ''}
                                  </td>
                                  <td class="px-4 py-3 tabular-nums">${item.minimumLevel ?? ''}</td>
                                  <td class="px-4 py-3 text-right">
                                    <button
                                      type="button"
                                      class="rounded-md px-3 py-1.5 text-xs font-medium bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#cbd5e1)]"
                                      @click=${(event: Event) => {
                                        event.stopPropagation();
                                        selectStockItem(item);
                                      }}
                                    >
                                      ${this.msg['organism.stockManagement.editStockItem.title']}
                                    </button>
                                  </td>
                                </tr>
                              `;
                            })}
                          </tbody>
                        </table>
                      </div>
                    `}
            </div>

            <!-- Detail / contextual actions panel -->
            <aside class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm space-y-5">
              <h3 class="font-medium text-[var(--ds-color-text-strong,#020617)]">
                ${this.msg['organism.stockManagement.editStockItem.title']}
              </h3>

              ${!selectedItem
                ? html`
                    <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.stockManagement.listStockItems.list.empty']}
                    </p>
                  `
                : html`
                    <div class="rounded-md border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3 text-sm space-y-1">
                      <p class="font-semibold text-[var(--ds-color-text-strong,#020617)]">
                        ${selectedItem.name ?? ''}
                      </p>
                      <p class="text-[var(--ds-color-text-muted,#64748b)]">
                        ${selectedItem.unit ?? ''} · ${selectedItem.currentBalance ?? ''}
                        ${isLowStock(selectedItem)
                          ? html`<span class="ml-1 text-[var(--ds-color-status-warning-text,#92400e)]">!</span>`
                          : ''}
                      </p>
                    </div>

                    <!-- Edit stock item -->
                    <div class="space-y-3">
                      <h4 class="text-sm font-medium">
                        ${this.msg['intent.stockManagement.editStockItem.form.title']}
                      </h4>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.stockManagement.editStockItem.form.field.name.label']}
                        </span>
                        <input
                          class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                          .value=${this.editStockItemName}
                          @input=${(event: Event) => this.handleEditStockItemNameChange(event)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.stockManagement.editStockItem.form.field.unit.label']}
                        </span>
                        <input
                          class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                          .value=${this.editStockItemUnit}
                          @input=${(event: Event) => this.handleEditStockItemUnitChange(event)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.stockManagement.editStockItem.form.field.minimumLevel.label']}
                        </span>
                        <input
                          type="number"
                          class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                          .value=${this.editStockItemMinimumLevel}
                          @input=${(event: Event) => this.handleEditStockItemMinimumLevelChange(event)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.stockManagement.editStockItem.form.field.description.label']}
                        </span>
                        <textarea
                          class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                          rows="2"
                          .value=${this.editStockItemDescription}
                          @input=${(event: Event) => this.handleEditStockItemDescriptionChange(event)}
                        ></textarea>
                      </label>
                      <button
                        type="button"
                        class="w-full rounded-md px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                        ?disabled=${this.editStockItemState === 'loading' || !this.editStockItemStockItemId}
                        @click=${(event: Event) => this.handleEditStockItemClick(event)}
                      >
                        ${this.editStockItemState === 'loading'
                          ? '…'
                          : this.msg['intent.stockManagement.editStockItem.form.action.editStockItem']}
                      </button>
                      ${this.editStockItemState === 'success'
                        ? html`<p class="text-sm text-[var(--ds-color-status-success-text,#166534)] bg-[var(--ds-color-status-success-bg,#dcfce7)] rounded px-2 py-1" role="status">
                            <!-- TODO: action.editStockItem.success msg key not in MessageType -->
                            OK
                          </p>`
                        : ''}
                      ${this.editStockItemState === 'error'
                        ? html`<p class="text-sm text-[var(--ds-color-status-error-text,#991b1b)] bg-[var(--ds-color-status-error-bg,#fee2e2)] rounded px-2 py-1" role="alert">
                            ${this.editStockItemError || 'Error'}
                          </p>`
                        : ''}
                    </div>

                    <!-- Register stock adjustment (contextual; stockItemId from selection) -->
                    <div class="space-y-3 border-t border-[var(--ds-color-border-subtle,#e2e8f0)] pt-4">
                      <h4 class="text-sm font-medium">
                        ${this.msg['intent.stockManagement.registerStockAdjustment.form.title']}
                      </h4>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.quantity.label']}
                        </span>
                        <input
                          type="number"
                          class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                          .value=${this.registerStockAdjustmentQuantity}
                          @input=${(event: Event) => this.handleRegisterStockAdjustmentQuantityChange(event)}
                        />
                      </label>
                      <fieldset class="space-y-2">
                        <legend class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.direction.label']}
                        </legend>
                        <div class="flex flex-wrap gap-2">
                          <button
                            type="button"
                            class="rounded-md px-3 py-2 text-sm border ${this.registerStockAdjustmentDirection === 'in'
                              ? 'bg-[var(--ds-color-selected-bg,#e0e7ff)] border-[var(--ds-color-selected-border,#6366f1)] text-[var(--ds-color-selected-text,#1e3a8a)]'
                              : 'bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] border-[var(--ds-color-button-secondary-border,#cbd5e1)] text-[var(--ds-color-button-secondary-text,#0f172a)]'}"
                            @click=${() => this.setRegisterStockAdjustmentDirection('in')}
                          >
                            in
                          </button>
                          <button
                            type="button"
                            class="rounded-md px-3 py-2 text-sm border ${this.registerStockAdjustmentDirection === 'out'
                              ? 'bg-[var(--ds-color-selected-bg,#e0e7ff)] border-[var(--ds-color-selected-border,#6366f1)] text-[var(--ds-color-selected-text,#1e3a8a)]'
                              : 'bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] border-[var(--ds-color-button-secondary-border,#cbd5e1)] text-[var(--ds-color-button-secondary-text,#0f172a)]'}"
                            @click=${() => this.setRegisterStockAdjustmentDirection('out')}
                          >
                            out
                          </button>
                        </div>
                      </fieldset>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.reason.label']}
                        </span>
                        <input
                          class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                          .value=${this.registerStockAdjustmentReason}
                          @input=${(event: Event) => this.handleRegisterStockAdjustmentReasonChange(event)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--ds-color-text-muted,#64748b)]">
                          ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.notes.label']}
                        </span>
                        <textarea
                          class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                          rows="2"
                          .value=${this.registerStockAdjustmentNotes}
                          @input=${(event: Event) => this.handleRegisterStockAdjustmentNotesChange(event)}
                        ></textarea>
                      </label>
                      <button
                        type="button"
                        class="w-full rounded-md px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                        ?disabled=${this.registerStockAdjustmentState === 'loading' || !this.registerStockAdjustmentStockItemId}
                        @click=${(event: Event) => this.handleRegisterStockAdjustmentClick(event)}
                      >
                        ${this.registerStockAdjustmentState === 'loading'
                          ? '…'
                          : this.msg['intent.stockManagement.registerStockAdjustment.form.action.registerStockAdjustment']}
                      </button>
                      ${this.registerStockAdjustmentState === 'success'
                        ? html`<p class="text-sm text-[var(--ds-color-status-success-text,#166534)] bg-[var(--ds-color-status-success-bg,#dcfce7)] rounded px-2 py-1" role="status">
                            <!-- TODO: action.registerStockAdjustment.success msg key not in MessageType -->
                            OK
                          </p>`
                        : ''}
                      ${this.registerStockAdjustmentState === 'error'
                        ? html`<p class="text-sm text-[var(--ds-color-status-error-text,#991b1b)] bg-[var(--ds-color-status-error-bg,#fee2e2)] rounded px-2 py-1" role="alert">
                            ${this.registerStockAdjustmentError || 'Error'}
                          </p>`
                        : ''}
                    </div>

                    <!-- Remove stock item -->
                    <div class="space-y-3 border-t border-[var(--ds-color-border-subtle,#e2e8f0)] pt-4">
                      <h4 class="text-sm font-medium">
                        ${this.msg['intent.stockManagement.removeStockItem.form.title']}
                      </h4>
                      <button
                        type="button"
                        class="w-full rounded-md px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-danger-bg,#dc2626)] text-[var(--ds-color-button-danger-text,#ffffff)] disabled:opacity-60"
                        ?disabled=${this.removeStockItemState === 'loading' || !this.removeStockItemStockItemId}
                        @click=${(event: Event) => this.handleRemoveStockItemClick(event)}
                      >
                        ${this.removeStockItemState === 'loading'
                          ? '…'
                          : this.msg['intent.stockManagement.removeStockItem.form.action.removeStockItem']}
                      </button>
                      ${this.removeStockItemState === 'success'
                        ? html`<p class="text-sm text-[var(--ds-color-status-success-text,#166534)] bg-[var(--ds-color-status-success-bg,#dcfce7)] rounded px-2 py-1" role="status">
                            <!-- TODO: action.removeStockItem.success msg key not in MessageType -->
                            OK
                          </p>`
                        : ''}
                      ${this.removeStockItemState === 'error'
                        ? html`<p class="text-sm text-[var(--ds-color-status-error-text,#991b1b)] bg-[var(--ds-color-status-error-bg,#fee2e2)] rounded px-2 py-1" role="alert">
                            ${this.removeStockItemError || 'Error'}
                          </p>`
                        : ''}
                    </div>
                  `}
            </aside>
          </div>
        </section>

        <!-- 4. Collapsible add stock item form -->
        <section
          id="add-stock-item"
          class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm"
        >
          <details class="group">
            <summary class="cursor-pointer list-none flex items-center justify-between gap-3">
              <h2 class="text-lg font-semibold text-[var(--ds-color-text-strong,#020617)]">
                ${this.msg['section.stockManagement.sec-add-stock-item.title']}
              </h2>
              <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['organism.stockManagement.addStockItem.title']}
              </span>
            </summary>

            <div class="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.name.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  .value=${this.addStockItemName}
                  @input=${(event: Event) => this.handleAddStockItemNameChange(event)}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.unit.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  .value=${this.addStockItemUnit}
                  @input=${(event: Event) => this.handleAddStockItemUnitChange(event)}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.currentBalance.label']}
                </span>
                <input
                  type="number"
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  .value=${this.addStockItemCurrentBalance}
                  @input=${(event: Event) => this.handleAddStockItemCurrentBalanceChange(event)}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.minimumLevel.label']}
                </span>
                <input
                  type="number"
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  .value=${this.addStockItemMinimumLevel}
                  @input=${(event: Event) => this.handleAddStockItemMinimumLevelChange(event)}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm md:col-span-2">
                <span class="text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.description.label']}
                </span>
                <textarea
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  rows="2"
                  .value=${this.addStockItemDescription}
                  @input=${(event: Event) => this.handleAddStockItemDescriptionChange(event)}
                ></textarea>
              </label>
            </div>

            <div class="mt-4 flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="rounded-md px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${this.addStockItemState === 'loading'}
                @click=${(event: Event) => this.handleAddStockItemClick(event)}
              >
                ${this.addStockItemState === 'loading'
                  ? '…'
                  : this.msg['intent.stockManagement.addStockItem.form.action.addStockItem']}
              </button>
              ${this.addStockItemState === 'success'
                ? html`<p class="text-sm text-[var(--ds-color-status-success-text,#166534)] bg-[var(--ds-color-status-success-bg,#dcfce7)] rounded px-2 py-1" role="status">
                    <!-- TODO: action.addStockItem.success msg key not in MessageType -->
                    OK
                  </p>`
                : ''}
              ${this.addStockItemState === 'error'
                ? html`<p class="text-sm text-[var(--ds-color-status-error-text,#991b1b)] bg-[var(--ds-color-status-error-bg,#fee2e2)] rounded px-2 py-1" role="alert">
                    ${this.addStockItemError || 'Error'}
                  </p>`
                : ''}
            </div>
          </details>
        </section>
      </div>
    `;
  }
}
