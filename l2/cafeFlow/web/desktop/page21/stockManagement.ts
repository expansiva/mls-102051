/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';
import type { ListStockItemsOutput } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

type StockItemRow = NonNullable<ListStockItemsOutput['stockItems']>[number];

@customElement('cafe-flow--web--desktop--page21--stock-management-102051')
export class CafeFlowDesktopPage21StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const rows: StockItemRow[] = Array.isArray(this.listStockItemsData?.stockItems)
      ? this.listStockItemsData.stockItems
      : [];
    const total =
      typeof this.listStockItemsData?.total === 'number' ? this.listStockItemsData.total : rows.length;
    const isListLoading = this.listStockItemsState === 'loading';
    const selectedId =
      this.registerStockAdjustmentStockItemId ||
      this.editStockItemStockItemId ||
      this.removeStockItemStockItemId;
    const selectedItem: StockItemRow | undefined = selectedId
      ? rows.find((item: StockItemRow) => String((item as { stockItemId?: unknown }).stockItemId ?? '') === selectedId)
      : undefined;

    const lowStockCount = rows.filter((item: StockItemRow) => {
      const balance = Number((item as { currentBalance?: unknown }).currentBalance ?? NaN);
      const minimum = Number((item as { minimumLevel?: unknown }).minimumLevel ?? NaN);
      return Number.isFinite(balance) && Number.isFinite(minimum) && balance <= minimum;
    }).length;

    const selectItem = (item: StockItemRow): void => {
      const id = String((item as { stockItemId?: unknown }).stockItemId ?? '');
      this.setEditStockItemStockItemId(id);
      this.setRemoveStockItemStockItemId(id);
      this.setRegisterStockAdjustmentStockItemId(id);
      this.setEditStockItemName(String((item as { name?: unknown }).name ?? ''));
      this.setEditStockItemUnit(String((item as { unit?: unknown }).unit ?? ''));
      this.setEditStockItemMinimumLevel(String((item as { minimumLevel?: unknown }).minimumLevel ?? ''));
      this.setEditStockItemDescription(String((item as { description?: unknown }).description ?? ''));
    };

    return html`
      <div class="min-h-full bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)] p-6 space-y-6">
        <header class="space-y-1">
          <h1 class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.stockManagement.sec-stock-master.title']}
          </h1>
        </header>

        <section class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
          <div class="flex flex-wrap items-end gap-3 justify-between">
            <div class="flex flex-wrap items-end gap-3 flex-1">
              <label class="flex flex-col gap-1 min-w-[12rem] flex-1">
                <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.nameFilter.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  type="search"
                  .value=${this.listStockItemsNameFilter}
                  @input=${this.handleListStockItemsNameFilterChange}
                />
              </label>
              <label class="flex items-center gap-2 pb-2 cursor-pointer">
                <input
                  type="checkbox"
                  class="h-4 w-4"
                  .checked=${this.listStockItemsLowStockOnly === 'true'}
                  @change=${this.handleListStockItemsLowStockOnlyChange}
                />
                <span class="text-sm">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.lowStockOnly.label']}
                </span>
              </label>
              <label class="flex flex-col gap-1 w-24">
                <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.page.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  min="1"
                  .value=${this.listStockItemsPage}
                  @input=${this.handleListStockItemsPageChange}
                />
              </label>
              <label class="flex flex-col gap-1 w-28">
                <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.pageSize.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  min="1"
                  .value=${this.listStockItemsPageSize}
                  @input=${this.handleListStockItemsPageSizeChange}
                />
              </label>
              <button
                type="button"
                class="rounded-md px-4 py-2 bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#cbd5e1)] disabled:opacity-60"
                ?disabled=${isListLoading}
                @click=${this.handleListStockItemsClick}
              >
                ${isListLoading
                  ? '…'
                  : this.msg['organism.stockManagement.listStockItems.title']}
              </button>
            </div>
            <a
              href="#stock-create-panel"
              class="rounded-md px-4 py-2 bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] font-medium"
            >
              ${this.msg['intent.stockManagement.addStockItem.form.action.addStockItem']}
            </a>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] p-3">
              <div class="text-xs uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.stockManagement.listStockItems.list.column.total.label']}
              </div>
              <div class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">${total}</div>
            </div>
            <div class="rounded-lg border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-status-warning-bg,#fffbeb)] p-3">
              <div class="text-xs uppercase tracking-wide text-[var(--ds-color-status-warning-text,#92400e)]">
                ${this.msg['intent.stockManagement.listStockItems.list.filter.lowStockOnly.label']}
              </div>
              <div class="text-2xl font-semibold text-[var(--ds-color-status-warning-text,#92400e)]">${lowStockCount}</div>
            </div>
          </div>
        </section>

        <section class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div class="lg:col-span-2 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] shadow-sm overflow-hidden">
            <div class="px-4 py-3 border-b border-[var(--ds-color-border-subtle,#e2e8f0)]">
              <h2 class="text-lg font-medium">
                ${this.msg['intent.stockManagement.listStockItems.list.title']}
              </h2>
            </div>

            ${isListLoading
              ? html`
                  <div class="p-6 space-y-3 animate-pulse">
                    <div class="h-10 rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-10 rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-10 rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                  </div>
                `
              : rows.length === 0
                ? html`
                    <div class="p-8 text-center text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.stockManagement.listStockItems.list.empty']}
                    </div>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="min-w-full text-sm">
                        <thead class="bg-[var(--ds-color-surface-alt-bg,#f8fafc)] text-left text-[var(--ds-color-text-muted,#64748b)]">
                          <tr>
                            <th class="px-4 py-3 font-medium">
                              ${this.msg['intent.stockManagement.editStockItem.form.field.name.label']}
                            </th>
                            <th class="px-4 py-3 font-medium">
                              ${this.msg['intent.stockManagement.editStockItem.form.field.unit.label']}
                            </th>
                            <th class="px-4 py-3 font-medium">
                              ${this.msg['intent.stockManagement.addStockItem.form.field.currentBalance.label']}
                            </th>
                            <th class="px-4 py-3 font-medium">
                              ${this.msg['intent.stockManagement.editStockItem.form.field.minimumLevel.label']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${rows.map((item: StockItemRow) => {
                            const id = String((item as { stockItemId?: unknown }).stockItemId ?? '');
                            const name = String((item as { name?: unknown }).name ?? '');
                            const unit = String((item as { unit?: unknown }).unit ?? '');
                            const balanceRaw = (item as { currentBalance?: unknown }).currentBalance;
                            const minimumRaw = (item as { minimumLevel?: unknown }).minimumLevel;
                            const balance = Number(balanceRaw ?? NaN);
                            const minimum = Number(minimumRaw ?? NaN);
                            const isLow =
                              Number.isFinite(balance) &&
                              Number.isFinite(minimum) &&
                              balance <= minimum;
                            const isSelected = Boolean(selectedId) && selectedId === id;
                            return html`
                              <tr
                                class="border-t border-[var(--ds-color-border-subtle,#e2e8f0)] cursor-pointer ${isSelected
                                  ? 'bg-[var(--ds-color-selected-bg,#dbeafe)] text-[var(--ds-color-selected-text,#0f172a)]'
                                  : isLow
                                    ? 'bg-[var(--ds-color-status-warning-bg,#fffbeb)]'
                                    : 'hover:bg-[var(--ds-color-surface-alt-bg,#f8fafc)]'}"
                                @click=${() => selectItem(item)}
                              >
                                <td class="px-4 py-3 font-medium">
                                  ${name}
                                  ${isLow
                                    ? html`<span
                                        class="ml-2 inline-flex rounded-full px-2 py-0.5 text-xs bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)]"
                                        >!</span
                                      >`
                                    : nothing}
                                </td>
                                <td class="px-4 py-3">${unit}</td>
                                <td class="px-4 py-3 ${isLow ? 'font-semibold text-[var(--ds-color-status-warning-text,#92400e)]' : ''}">
                                  ${balanceRaw ?? '—'}
                                </td>
                                <td class="px-4 py-3">${minimumRaw ?? '—'}</td>
                              </tr>
                            `;
                          })}
                        </tbody>
                      </table>
                    </div>
                  `}
          </div>

          <aside class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] shadow-sm p-4 space-y-5">
            ${!selectedItem
              ? html`
                  <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['organism.stockManagement.registerStockAdjustment.title']}
                  </p>
                `
              : html`
                  <div class="space-y-1 border-b border-[var(--ds-color-border-subtle,#e2e8f0)] pb-3">
                    <h2 class="text-lg font-medium text-[var(--ds-color-text-strong,#020617)]">
                      ${String((selectedItem as { name?: unknown }).name ?? '')}
                    </h2>
                    <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                      ${String((selectedItem as { unit?: unknown }).unit ?? '')}
                      ·
                      ${this.msg['intent.stockManagement.addStockItem.form.field.currentBalance.label']}:
                      ${String((selectedItem as { currentBalance?: unknown }).currentBalance ?? '—')}
                    </p>
                  </div>

                  <div class="space-y-3">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.stockManagement.registerStockAdjustment.form.title']}
                    </h3>
                    <label class="flex flex-col gap-1">
                      <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.quantity.label']}
                      </span>
                      <input
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        type="number"
                        min="0"
                        step="any"
                        .value=${this.registerStockAdjustmentQuantity}
                        @input=${this.handleRegisterStockAdjustmentQuantityChange}
                      />
                    </label>
                    <div class="space-y-1">
                      <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.direction.label']}
                      </span>
                      <div class="flex gap-2">
                        <button
                          type="button"
                          class="flex-1 rounded-md px-3 py-2 border ${this.registerStockAdjustmentDirection === 'in'
                            ? 'bg-[var(--ds-color-selected-bg,#dbeafe)] border-[var(--ds-color-selected-border,#2563eb)] text-[var(--ds-color-selected-text,#0f172a)]'
                            : 'bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] border-[var(--ds-color-button-secondary-border,#cbd5e1)] text-[var(--ds-color-button-secondary-text,#0f172a)]'}"
                          @click=${() => this.setRegisterStockAdjustmentDirection('in')}
                        >
                          <!-- TODO: i18n direction in -->
                          Entrada
                        </button>
                        <button
                          type="button"
                          class="flex-1 rounded-md px-3 py-2 border ${this.registerStockAdjustmentDirection === 'out'
                            ? 'bg-[var(--ds-color-selected-bg,#dbeafe)] border-[var(--ds-color-selected-border,#2563eb)] text-[var(--ds-color-selected-text,#0f172a)]'
                            : 'bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] border-[var(--ds-color-button-secondary-border,#cbd5e1)] text-[var(--ds-color-button-secondary-text,#0f172a)]'}"
                          @click=${() => this.setRegisterStockAdjustmentDirection('out')}
                        >
                          <!-- TODO: i18n direction out -->
                          Saída
                        </button>
                      </div>
                    </div>
                    <label class="flex flex-col gap-1">
                      <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.reason.label']}
                      </span>
                      <input
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        type="text"
                        .value=${this.registerStockAdjustmentReason}
                        @input=${this.handleRegisterStockAdjustmentReasonChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1">
                      <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.notes.label']}
                      </span>
                      <textarea
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 min-h-[4rem]"
                        .value=${this.registerStockAdjustmentNotes}
                        @input=${this.handleRegisterStockAdjustmentNotesChange}
                      ></textarea>
                    </label>
                    <button
                      type="button"
                      class="w-full rounded-md px-4 py-2 bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] font-medium disabled:opacity-60"
                      ?disabled=${this.registerStockAdjustmentState === 'loading'}
                      @click=${this.handleRegisterStockAdjustmentClick}
                    >
                      ${this.registerStockAdjustmentState === 'loading'
                        ? '…'
                        : this.msg['intent.stockManagement.registerStockAdjustment.form.action.registerStockAdjustment']}
                    </button>
                    ${this.registerStockAdjustmentState === 'success'
                      ? html`<div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]">
                          <!-- TODO: action.registerStockAdjustment.success -->
                          OK
                        </div>`
                      : nothing}
                    ${this.registerStockAdjustmentState === 'error'
                      ? html`<div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]">
                          ${this.registerStockAdjustmentError || '<!-- TODO: action.registerStockAdjustment.error -->Error'}
                        </div>`
                      : nothing}
                  </div>

                  <div class="space-y-3 border-t border-[var(--ds-color-border-subtle,#e2e8f0)] pt-4">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.stockManagement.editStockItem.form.title']}
                    </h3>
                    <label class="flex flex-col gap-1">
                      <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.stockManagement.editStockItem.form.field.name.label']}
                      </span>
                      <input
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        type="text"
                        .value=${this.editStockItemName}
                        @input=${this.handleEditStockItemNameChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1">
                      <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.stockManagement.editStockItem.form.field.unit.label']}
                      </span>
                      <input
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        type="text"
                        .value=${this.editStockItemUnit}
                        @input=${this.handleEditStockItemUnitChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1">
                      <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.stockManagement.editStockItem.form.field.minimumLevel.label']}
                      </span>
                      <input
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        type="number"
                        min="0"
                        step="any"
                        .value=${this.editStockItemMinimumLevel}
                        @input=${this.handleEditStockItemMinimumLevelChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1">
                      <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.stockManagement.editStockItem.form.field.description.label']}
                      </span>
                      <textarea
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 min-h-[4rem]"
                        .value=${this.editStockItemDescription}
                        @input=${this.handleEditStockItemDescriptionChange}
                      ></textarea>
                    </label>
                    <button
                      type="button"
                      class="w-full rounded-md px-4 py-2 bg-[var(--ds-color-button-secondary-bg,#f1f5f9)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#cbd5e1)] font-medium disabled:opacity-60"
                      ?disabled=${this.editStockItemState === 'loading'}
                      @click=${this.handleEditStockItemClick}
                    >
                      ${this.editStockItemState === 'loading'
                        ? '…'
                        : this.msg['intent.stockManagement.editStockItem.form.action.editStockItem']}
                    </button>
                    ${this.editStockItemState === 'success'
                      ? html`<div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]">
                          <!-- TODO: action.editStockItem.success -->
                          OK
                        </div>`
                      : nothing}
                    ${this.editStockItemState === 'error'
                      ? html`<div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]">
                          ${this.editStockItemError || '<!-- TODO: action.editStockItem.error -->Error'}
                        </div>`
                      : nothing}
                  </div>

                  <div class="space-y-3 border-t border-[var(--ds-color-border-subtle,#e2e8f0)] pt-4">
                    <h3 class="text-sm font-semibold uppercase tracking-wide text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.stockManagement.removeStockItem.form.title']}
                    </h3>
                    <button
                      type="button"
                      class="w-full rounded-md px-4 py-2 bg-[var(--ds-color-button-danger-bg,#dc2626)] text-[var(--ds-color-button-danger-text,#ffffff)] font-medium disabled:opacity-60"
                      ?disabled=${this.removeStockItemState === 'loading'}
                      @click=${this.handleRemoveStockItemClick}
                    >
                      ${this.removeStockItemState === 'loading'
                        ? '…'
                        : this.msg['intent.stockManagement.removeStockItem.form.action.removeStockItem']}
                    </button>
                    ${this.removeStockItemState === 'success'
                      ? html`<div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]">
                          <!-- TODO: action.removeStockItem.success -->
                          OK
                        </div>`
                      : nothing}
                    ${this.removeStockItemState === 'error'
                      ? html`<div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]">
                          ${this.removeStockItemError || '<!-- TODO: action.removeStockItem.error -->Error'}
                        </div>`
                      : nothing}
                  </div>
                `}
          </aside>
        </section>

        <section
          id="stock-create-panel"
          class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 space-y-4 shadow-sm"
        >
          <h2 class="text-lg font-medium text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.stockManagement.sec-create-panel.title']}
          </h2>
          <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
            ${this.msg['intent.stockManagement.addStockItem.form.title']}
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label class="flex flex-col gap-1">
              <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.stockManagement.addStockItem.form.field.name.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                type="text"
                .value=${this.addStockItemName}
                @input=${this.handleAddStockItemNameChange}
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.stockManagement.addStockItem.form.field.unit.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                type="text"
                .value=${this.addStockItemUnit}
                @input=${this.handleAddStockItemUnitChange}
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.stockManagement.addStockItem.form.field.currentBalance.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                type="number"
                min="0"
                step="any"
                .value=${this.addStockItemCurrentBalance}
                @input=${this.handleAddStockItemCurrentBalanceChange}
              />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.stockManagement.addStockItem.form.field.minimumLevel.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                type="number"
                min="0"
                step="any"
                .value=${this.addStockItemMinimumLevel}
                @input=${this.handleAddStockItemMinimumLevelChange}
              />
            </label>
            <label class="flex flex-col gap-1 md:col-span-2">
              <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.stockManagement.addStockItem.form.field.description.label']}
              </span>
              <textarea
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 min-h-[4rem]"
                .value=${this.addStockItemDescription}
                @input=${this.handleAddStockItemDescriptionChange}
              ></textarea>
            </label>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <button
              type="button"
              class="rounded-md px-4 py-2 bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] font-medium disabled:opacity-60"
              ?disabled=${this.addStockItemState === 'loading'}
              @click=${this.handleAddStockItemClick}
            >
              ${this.addStockItemState === 'loading'
                ? '…'
                : this.msg['intent.stockManagement.addStockItem.form.action.addStockItem']}
            </button>
            ${this.addStockItemState === 'success'
              ? html`<div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]">
                  <!-- TODO: action.addStockItem.success -->
                  OK
                </div>`
              : nothing}
            ${this.addStockItemState === 'error'
              ? html`<div class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]">
                  ${this.addStockItemError || '<!-- TODO: action.addStockItem.error -->Error'}
                </div>`
              : nothing}
          </div>
        </section>
      </div>
    `;
  }
}
