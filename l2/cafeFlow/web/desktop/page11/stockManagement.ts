/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';
import type { ListStockItemsOutput } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

type StockItemRow = NonNullable<ListStockItemsOutput['stockItems']>[number];

@customElement('cafe-flow--web--desktop--page11--stock-management-102051')
export class CafeFlowDesktopPage11StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const stockItems: StockItemRow[] = this.listStockItemsData?.stockItems ?? [];
    const total = this.listStockItemsData?.total;
    const listLoading = this.listStockItemsState === 'loading';

    const selectStockItem = (item: StockItemRow) => {
      const id = String((item as { stockItemId?: string | number }).stockItemId ?? (item as { id?: string | number }).id ?? '');
      const name = String((item as { name?: string }).name ?? '');
      const unit = String((item as { unit?: string }).unit ?? '');
      const minimumLevel = String((item as { minimumLevel?: string | number }).minimumLevel ?? '');
      const description = String((item as { description?: string }).description ?? '');
      this.setEditStockItemStockItemId(id);
      this.setEditStockItemName(name);
      this.setEditStockItemUnit(unit);
      this.setEditStockItemMinimumLevel(minimumLevel);
      this.setEditStockItemDescription(description);
      this.setRemoveStockItemStockItemId(id);
      this.setRegisterStockAdjustmentStockItemId(id);
    };

    const isLowStock = (item: StockItemRow): boolean => {
      const balance = Number((item as { currentBalance?: string | number }).currentBalance);
      const minimum = Number((item as { minimumLevel?: string | number }).minimumLevel);
      if (Number.isNaN(balance) || Number.isNaN(minimum)) {
        return Boolean((item as { lowStock?: boolean }).lowStock);
      }
      return balance <= minimum;
    };

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.stockManagement.stockItemList.title']}
            </h1>
          </header>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                ${this.msg['organism.stockManagement.listStockItems.title']}
              </h2>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-[var(--button-secondary-bg,#f1f5f9)] text-[var(--button-secondary-text,#0f172a)] border border-[var(--button-secondary-border,#cbd5e1)] disabled:opacity-60"
                ?disabled=${listLoading}
                @click=${this.handleListStockItemsClick}
              >
                ${listLoading
                  ? html`<span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[var(--border-default,#cbd5e1)] border-t-[var(--text-default,#0f172a)]"></span>`
                  : nothing}
                ${this.msg['intent.stockManagement.listStockItems.list.title']}
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.listStockItems.list.filter.nameFilter.label']}</span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="text"
                  .value=${this.listStockItemsNameFilter}
                  @input=${this.handleListStockItemsNameFilterChange}
                />
              </label>
              <label class="flex items-center gap-2 text-sm mt-6">
                <input
                  type="checkbox"
                  .checked=${this.listStockItemsLowStockOnly === 'true' || this.listStockItemsLowStockOnly === '1'}
                  @change=${this.handleListStockItemsLowStockOnlyChange}
                />
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.listStockItems.list.filter.lowStockOnly.label']}</span>
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.listStockItems.list.filter.page.label']}</span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  .value=${this.listStockItemsPage}
                  @input=${this.handleListStockItemsPageChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.listStockItems.list.filter.pageSize.label']}</span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  .value=${this.listStockItemsPageSize}
                  @input=${this.handleListStockItemsPageSizeChange}
                />
              </label>
            </div>

            ${listLoading
              ? html`
                  <div class="space-y-2" aria-busy="true">
                    <div class="h-10 rounded-md bg-[var(--surface-alt-bg,#f1f5f9)] animate-pulse"></div>
                    <div class="h-10 rounded-md bg-[var(--surface-alt-bg,#f1f5f9)] animate-pulse"></div>
                    <div class="h-10 rounded-md bg-[var(--surface-alt-bg,#f1f5f9)] animate-pulse"></div>
                  </div>
                `
              : stockItems.length === 0
                ? html`<p class="text-sm text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.listStockItems.list.empty']}</p>`
                : html`
                    <div class="overflow-x-auto">
                      <table class="min-w-full text-sm border-collapse">
                        <thead>
                          <tr class="border-b border-[var(--border-subtle,#e2e8f0)] text-left text-[var(--text-muted,#64748b)]">
                            <th class="py-2 pr-3 font-medium">${this.msg['intent.stockManagement.editStockItem.form.field.name.label']}</th>
                            <th class="py-2 pr-3 font-medium">${this.msg['intent.stockManagement.editStockItem.form.field.unit.label']}</th>
                            <th class="py-2 pr-3 font-medium">${this.msg['intent.stockManagement.addStockItem.form.field.currentBalance.label']}</th>
                            <th class="py-2 pr-3 font-medium">${this.msg['intent.stockManagement.editStockItem.form.field.minimumLevel.label']}</th>
                            <th class="py-2 pr-3 font-medium">${this.msg['intent.stockManagement.listStockItems.list.column.stockItems.label']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${stockItems.map((item: StockItemRow) => {
                            const low = isLowStock(item);
                            const name = String((item as { name?: string }).name ?? '');
                            const unit = String((item as { unit?: string }).unit ?? '');
                            const balance = String((item as { currentBalance?: string | number }).currentBalance ?? '');
                            const minimumLevel = String((item as { minimumLevel?: string | number }).minimumLevel ?? '');
                            return html`
                              <tr
                                class="border-b border-[var(--border-subtle,#e2e8f0)] cursor-pointer hover:bg-[var(--selected-bg,#eff6ff)] ${low
                                  ? 'bg-[var(--status-warning-bg,#fef3c7)] text-[var(--status-warning-text,#92400e)]'
                                  : ''}"
                                @click=${() => selectStockItem(item)}
                              >
                                <td class="py-2 pr-3 font-medium">${name}</td>
                                <td class="py-2 pr-3">${unit}</td>
                                <td class="py-2 pr-3">${balance}</td>
                                <td class="py-2 pr-3">${minimumLevel}</td>
                                <td class="py-2 pr-3">
                                  ${low
                                    ? html`<span class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--status-warning-bg,#fef3c7)] text-[var(--status-warning-text,#92400e)]">low</span>`
                                    : html`<span class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]">ok</span>`}
                                </td>
                              </tr>
                            `;
                          })}
                        </tbody>
                      </table>
                    </div>
                    ${total !== undefined && total !== null
                      ? html`
                          <p class="text-sm text-[var(--text-muted,#64748b)]">
                            ${this.msg['intent.stockManagement.listStockItems.list.column.total.label']}: ${total}
                          </p>
                        `
                      : nothing}
                  `}

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
                <h3 class="text-base font-semibold text-[var(--text-strong,#0f172a)]">
                  ${this.msg['organism.stockManagement.editStockItem.title']}
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                    <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.editStockItem.form.field.name.label']}</span>
                    <input
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                      type="text"
                      .value=${this.editStockItemName}
                      @input=${this.handleEditStockItemNameChange}
                    />
                  </label>
                  <label class="flex flex-col gap-1 text-sm">
                    <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.editStockItem.form.field.unit.label']}</span>
                    <input
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                      type="text"
                      .value=${this.editStockItemUnit}
                      @input=${this.handleEditStockItemUnitChange}
                    />
                  </label>
                  <label class="flex flex-col gap-1 text-sm">
                    <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.editStockItem.form.field.minimumLevel.label']}</span>
                    <input
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                      type="number"
                      .value=${this.editStockItemMinimumLevel}
                      @input=${this.handleEditStockItemMinimumLevelChange}
                    />
                  </label>
                  <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                    <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.editStockItem.form.field.description.label']}</span>
                    <textarea
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 min-h-[4rem]"
                      .value=${this.editStockItemDescription}
                      @input=${this.handleEditStockItemDescriptionChange}
                    ></textarea>
                  </label>
                </div>
                <div class="flex flex-wrap gap-2">
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                    ?disabled=${this.editStockItemState === 'loading' || !this.editStockItemStockItemId}
                    @click=${this.handleEditStockItemClick}
                  >
                    ${this.editStockItemState === 'loading'
                      ? html`<span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>`
                      : nothing}
                    ${this.msg['intent.stockManagement.editStockItem.form.action.editStockItem']}
                  </button>
                  <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-[var(--button-danger-bg,#dc2626)] text-[var(--button-danger-text,#ffffff)] disabled:opacity-60"
                    ?disabled=${this.removeStockItemState === 'loading' || !this.removeStockItemStockItemId}
                    @click=${this.handleRemoveStockItemClick}
                  >
                    ${this.removeStockItemState === 'loading'
                      ? html`<span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>`
                      : nothing}
                    ${this.msg['intent.stockManagement.removeStockItem.form.action.removeStockItem']}
                  </button>
                </div>
                ${this.editStockItemState === 'success'
                  ? html`
                      <div class="rounded-md border border-[var(--border-default,#bbf7d0)] bg-[var(--status-success-bg,#dcfce7)] px-3 py-2 text-sm text-[var(--status-success-text,#166534)]" role="status">
                        <!-- TODO: missing msg key action.editStockItem.success -->
                        Item atualizado com sucesso.
                      </div>
                    `
                  : nothing}
                ${this.editStockItemState === 'error'
                  ? html`
                      <div class="rounded-md border border-[var(--border-default,#fecaca)] bg-[var(--status-error-bg,#fee2e2)] px-3 py-2 text-sm text-[var(--status-error-text,#991b1b)]" role="alert">
                        ${this.editStockItemError
                          ? this.editStockItemError
                          : html`<!-- TODO: missing msg key action.editStockItem.error -->Erro ao atualizar item.`}
                      </div>
                    `
                  : nothing}
                ${this.removeStockItemState === 'success'
                  ? html`
                      <div class="rounded-md border border-[var(--border-default,#bbf7d0)] bg-[var(--status-success-bg,#dcfce7)] px-3 py-2 text-sm text-[var(--status-success-text,#166534)]" role="status">
                        <!-- TODO: missing msg key action.removeStockItem.success -->
                        Item removido com sucesso.
                      </div>
                    `
                  : nothing}
                ${this.removeStockItemState === 'error'
                  ? html`
                      <div class="rounded-md border border-[var(--border-default,#fecaca)] bg-[var(--status-error-bg,#fee2e2)] px-3 py-2 text-sm text-[var(--status-error-text,#991b1b)]" role="alert">
                        ${this.removeStockItemError
                          ? this.removeStockItemError
                          : html`<!-- TODO: missing msg key action.removeStockItem.error -->Erro ao remover item.`}
                      </div>
                    `
                  : nothing}
              </div>

              <div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
                <h3 class="text-base font-semibold text-[var(--text-strong,#0f172a)]">
                  ${this.msg['organism.stockManagement.registerStockAdjustment.title']}
                </h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                    <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.registerStockAdjustment.form.field.stockItemId.label']}</span>
                    <input
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                      type="text"
                      .value=${this.registerStockAdjustmentStockItemId}
                      @input=${this.handleRegisterStockAdjustmentStockItemIdChange}
                    />
                  </label>
                  <label class="flex flex-col gap-1 text-sm">
                    <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.registerStockAdjustment.form.field.quantity.label']}</span>
                    <input
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                      type="number"
                      .value=${this.registerStockAdjustmentQuantity}
                      @input=${this.handleRegisterStockAdjustmentQuantityChange}
                    />
                  </label>
                  <label class="flex flex-col gap-1 text-sm">
                    <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.registerStockAdjustment.form.field.direction.label']}</span>
                    <input
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                      type="text"
                      .value=${this.registerStockAdjustmentDirection}
                      @input=${this.handleRegisterStockAdjustmentDirectionChange}
                    />
                  </label>
                  <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                    <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.registerStockAdjustment.form.field.reason.label']}</span>
                    <input
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                      type="text"
                      .value=${this.registerStockAdjustmentReason}
                      @input=${this.handleRegisterStockAdjustmentReasonChange}
                    />
                  </label>
                  <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                    <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.registerStockAdjustment.form.field.notes.label']}</span>
                    <textarea
                      class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 min-h-[4rem]"
                      .value=${this.registerStockAdjustmentNotes}
                      @input=${this.handleRegisterStockAdjustmentNotesChange}
                    ></textarea>
                  </label>
                </div>
                <button
                  type="button"
                  class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${this.registerStockAdjustmentState === 'loading'}
                  @click=${this.handleRegisterStockAdjustmentClick}
                >
                  ${this.registerStockAdjustmentState === 'loading'
                    ? html`<span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>`
                    : nothing}
                  ${this.msg['intent.stockManagement.registerStockAdjustment.form.action.registerStockAdjustment']}
                </button>
                ${this.registerStockAdjustmentState === 'success'
                  ? html`
                      <div class="rounded-md border border-[var(--border-default,#bbf7d0)] bg-[var(--status-success-bg,#dcfce7)] px-3 py-2 text-sm text-[var(--status-success-text,#166534)]" role="status">
                        <!-- TODO: missing msg key action.registerStockAdjustment.success -->
                        Ajuste registrado com sucesso.
                      </div>
                    `
                  : nothing}
                ${this.registerStockAdjustmentState === 'error'
                  ? html`
                      <div class="rounded-md border border-[var(--border-default,#fecaca)] bg-[var(--status-error-bg,#fee2e2)] px-3 py-2 text-sm text-[var(--status-error-text,#991b1b)]" role="alert">
                        ${this.registerStockAdjustmentError
                          ? this.registerStockAdjustmentError
                          : html`<!-- TODO: missing msg key action.registerStockAdjustment.error -->Erro ao registrar ajuste.`}
                      </div>
                    `
                  : nothing}
              </div>
            </div>
          </section>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.stockManagement.createStockItemSection.title']}
            </h2>
            <div class="rounded-lg border border-[var(--border-subtle,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
              <h3 class="text-base font-semibold text-[var(--text-strong,#0f172a)]">
                ${this.msg['organism.stockManagement.addStockItem.title']}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.addStockItem.form.field.name.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="text"
                    .value=${this.addStockItemName}
                    @input=${this.handleAddStockItemNameChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.addStockItem.form.field.unit.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="text"
                    .value=${this.addStockItemUnit}
                    @input=${this.handleAddStockItemUnitChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.addStockItem.form.field.currentBalance.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="number"
                    .value=${this.addStockItemCurrentBalance}
                    @input=${this.handleAddStockItemCurrentBalanceChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.addStockItem.form.field.minimumLevel.label']}</span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="number"
                    .value=${this.addStockItemMinimumLevel}
                    @input=${this.handleAddStockItemMinimumLevelChange}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.stockManagement.addStockItem.form.field.description.label']}</span>
                  <textarea
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 min-h-[4rem]"
                    .value=${this.addStockItemDescription}
                    @input=${this.handleAddStockItemDescriptionChange}
                  ></textarea>
                </label>
              </div>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${this.addStockItemState === 'loading'}
                @click=${this.handleAddStockItemClick}
              >
                ${this.addStockItemState === 'loading'
                  ? html`<span class="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>`
                  : nothing}
                ${this.msg['intent.stockManagement.addStockItem.form.action.addStockItem']}
              </button>
              ${this.addStockItemState === 'success'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#bbf7d0)] bg-[var(--status-success-bg,#dcfce7)] px-3 py-2 text-sm text-[var(--status-success-text,#166534)]" role="status">
                      <!-- TODO: missing msg key action.addStockItem.success -->
                      Item criado com sucesso.
                    </div>
                  `
                : nothing}
              ${this.addStockItemState === 'error'
                ? html`
                    <div class="rounded-md border border-[var(--border-default,#fecaca)] bg-[var(--status-error-bg,#fee2e2)] px-3 py-2 text-sm text-[var(--status-error-text,#991b1b)]" role="alert">
                      ${this.addStockItemError
                        ? this.addStockItemError
                        : html`<!-- TODO: missing msg key action.addStockItem.error -->Erro ao criar item.`}
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
