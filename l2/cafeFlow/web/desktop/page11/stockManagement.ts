/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowStockManagementBase } from '/_102051_/l2/cafeFlow/web/shared/stockManagement.js';

@customElement('cafe-flow--web--desktop--page11--stock-management-102051')
export class CafeFlowDesktopPage11StockManagementPage extends CafeFlowStockManagementBase {
  render() {
    const stockItems =
      this.listStockItemsData && Array.isArray(this.listStockItemsData.stockItems)
        ? this.listStockItemsData.stockItems
        : [];
    const total =
      this.listStockItemsData && typeof this.listStockItemsData.total === 'number'
        ? this.listStockItemsData.total
        : stockItems.length;
    const listLoading = this.listStockItemsState === 'loading';
    const addLoading = this.addStockItemState === 'loading';
    const editLoading = this.editStockItemState === 'loading';
    const removeLoading = this.removeStockItemState === 'loading';
    const adjustLoading = this.registerStockAdjustmentState === 'loading';

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.stockManagement.sec-stockItemList.title']}
            </h1>
          </header>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <div class="flex flex-wrap items-end gap-3">
              <label class="flex flex-col gap-1 min-w-[12rem] flex-1">
                <span class="text-sm text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.nameFilter.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="text"
                  .value=${this.listStockItemsNameFilter ?? ''}
                  @input=${this.handleListStockItemsNameFilterChange}
                />
              </label>
              <label class="flex items-center gap-2 pb-2">
                <input
                  type="checkbox"
                  .checked=${this.listStockItemsLowStockOnly === 'true'}
                  @change=${this.handleListStockItemsLowStockOnlyChange}
                />
                <span class="text-sm">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.lowStockOnly.label']}
                </span>
              </label>
              <label class="flex flex-col gap-1 w-24">
                <span class="text-sm text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.page.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  min="1"
                  .value=${this.listStockItemsPage ?? ''}
                  @input=${this.handleListStockItemsPageChange}
                />
              </label>
              <label class="flex flex-col gap-1 w-28">
                <span class="text-sm text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.filter.pageSize.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  min="1"
                  .value=${this.listStockItemsPageSize ?? ''}
                  @input=${this.handleListStockItemsPageSizeChange}
                />
              </label>
              <button
                type="button"
                class="rounded-md px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${listLoading}
                @click=${this.handleListStockItemsClick}
              >
                ${listLoading ? '…' : this.msg['organism.stockManagement.listStockItems.title']}
              </button>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between gap-2">
                <h2 class="text-lg font-medium text-[var(--text-strong,#0f172a)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.title']}
                </h2>
                <span class="text-sm text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.listStockItems.list.column.total.label']}: ${total}
                </span>
              </div>

              ${listLoading
                ? html`
                    <div class="animate-pulse space-y-2">
                      <div class="h-10 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                      <div class="h-10 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                      <div class="h-10 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                    </div>
                  `
                : stockItems.length === 0
                  ? html`
                      <p class="text-sm text-[var(--text-muted,#64748b)] py-6 text-center">
                        ${this.msg['intent.stockManagement.listStockItems.list.empty']}
                      </p>
                    `
                  : html`
                      <div class="overflow-x-auto rounded-md border border-[var(--border-subtle,#e2e8f0)]">
                        <table class="min-w-full text-sm">
                          <thead class="bg-[var(--surface-alt-bg,#f1f5f9)] text-left">
                            <tr>
                              <th class="px-3 py-2 font-medium">
                                ${this.msg['intent.stockManagement.editStockItem.form.field.name.label']}
                              </th>
                              <th class="px-3 py-2 font-medium">
                                ${this.msg['intent.stockManagement.editStockItem.form.field.unit.label']}
                              </th>
                              <th class="px-3 py-2 font-medium">
                                ${this.msg['intent.stockManagement.addStockItem.form.field.currentBalance.label']}
                              </th>
                              <th class="px-3 py-2 font-medium">
                                ${this.msg['intent.stockManagement.editStockItem.form.field.minimumLevel.label']}
                              </th>
                              <th class="px-3 py-2 font-medium"></th>
                            </tr>
                          </thead>
                          <tbody>
                            ${stockItems.map((item: {
                              stockItemId?: string;
                              id?: string;
                              name?: string;
                              unit?: string;
                              currentBalance?: number | string;
                              minimumLevel?: number | string;
                              description?: string;
                              isLowStock?: boolean;
                            }) => {
                              const itemId = String(item.stockItemId ?? item.id ?? '');
                              const isLow =
                                item.isLowStock === true ||
                                (typeof item.currentBalance === 'number' &&
                                  typeof item.minimumLevel === 'number' &&
                                  item.currentBalance <= item.minimumLevel);
                              return html`
                                <tr
                                  class="border-t border-[var(--border-subtle,#e2e8f0)] ${isLow
                                    ? 'bg-[var(--status-warning-bg,#fef3c7)]'
                                    : ''}"
                                >
                                  <td class="px-3 py-2">${item.name ?? ''}</td>
                                  <td class="px-3 py-2">${item.unit ?? ''}</td>
                                  <td class="px-3 py-2">${item.currentBalance ?? ''}</td>
                                  <td class="px-3 py-2">${item.minimumLevel ?? ''}</td>
                                  <td class="px-3 py-2 text-right">
                                    <button
                                      type="button"
                                      class="rounded px-2 py-1 text-sm border border-[var(--button-secondary-border,#cbd5e1)] bg-[var(--button-secondary-bg,#ffffff)] text-[var(--button-secondary-text,#0f172a)]"
                                      @click=${() => {
                                        this.setEditStockItemStockItemId(itemId);
                                        this.setEditStockItemName(String(item.name ?? ''));
                                        this.setEditStockItemUnit(String(item.unit ?? ''));
                                        this.setEditStockItemMinimumLevel(String(item.minimumLevel ?? ''));
                                        this.setEditStockItemDescription(String(item.description ?? ''));
                                        this.setRemoveStockItemStockItemId(itemId);
                                        this.setRegisterStockAdjustmentStockItemId(itemId);
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

            <div class="grid gap-4 md:grid-cols-2">
              <div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
                <h2 class="text-base font-medium">
                  ${this.msg['intent.stockManagement.editStockItem.form.title']}
                </h2>
                <label class="flex flex-col gap-1">
                  <span class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.stockManagement.editStockItem.form.field.name.label']}
                  </span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="text"
                    .value=${this.editStockItemName ?? ''}
                    @input=${this.handleEditStockItemNameChange}
                  />
                </label>
                <label class="flex flex-col gap-1">
                  <span class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.stockManagement.editStockItem.form.field.unit.label']}
                  </span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="text"
                    .value=${this.editStockItemUnit ?? ''}
                    @input=${this.handleEditStockItemUnitChange}
                  />
                </label>
                <label class="flex flex-col gap-1">
                  <span class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.stockManagement.editStockItem.form.field.minimumLevel.label']}
                  </span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="number"
                    .value=${this.editStockItemMinimumLevel ?? ''}
                    @input=${this.handleEditStockItemMinimumLevelChange}
                  />
                </label>
                <label class="flex flex-col gap-1">
                  <span class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.stockManagement.editStockItem.form.field.description.label']}
                  </span>
                  <textarea
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    rows="2"
                    .value=${this.editStockItemDescription ?? ''}
                    @input=${this.handleEditStockItemDescriptionChange}
                  ></textarea>
                </label>
                <div class="flex flex-wrap gap-2">
                  <button
                    type="button"
                    class="rounded-md px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                    ?disabled=${editLoading || !this.editStockItemStockItemId}
                    @click=${this.handleEditStockItemClick}
                  >
                    ${editLoading
                      ? '…'
                      : this.msg['intent.stockManagement.editStockItem.form.action.editStockItem']}
                  </button>
                  <button
                    type="button"
                    class="rounded-md px-4 py-2 bg-[var(--button-danger-bg,#dc2626)] text-[var(--button-danger-text,#ffffff)] disabled:opacity-60"
                    ?disabled=${removeLoading || !this.removeStockItemStockItemId}
                    @click=${this.handleRemoveStockItemClick}
                  >
                    ${removeLoading
                      ? '…'
                      : this.msg['intent.stockManagement.removeStockItem.form.action.removeStockItem']}
                  </button>
                </div>
                ${this.editStockItemState === 'success'
                  ? html`
                      <div
                        class="rounded-md px-3 py-2 text-sm bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]"
                        role="status"
                      >
                        <!-- TODO: action.editStockItem.success not in MessageType -->
                        OK
                        <button type="button" class="ml-2 underline" @click=${() => { this.editStockItemState = 'idle'; }}>
                          ×
                        </button>
                      </div>
                    `
                  : nothingOrEmpty(this.editStockItemState === 'error'
                      ? this.editStockItemError || 'Error'
                      : '')}
                ${this.editStockItemState === 'error'
                  ? html`
                      <div
                        class="rounded-md px-3 py-2 text-sm bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)]"
                        role="alert"
                      >
                        ${this.editStockItemError || '<!-- TODO: action.editStockItem.error --> Error'}
                      </div>
                    `
                  : ''}
                ${this.removeStockItemState === 'success'
                  ? html`
                      <div
                        class="rounded-md px-3 py-2 text-sm bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]"
                        role="status"
                      >
                        <!-- TODO: action.removeStockItem.success not in MessageType -->
                        OK
                      </div>
                    `
                  : ''}
                ${this.removeStockItemState === 'error'
                  ? html`
                      <div
                        class="rounded-md px-3 py-2 text-sm bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)]"
                        role="alert"
                      >
                        ${this.removeStockItemError || '<!-- TODO: action.removeStockItem.error --> Error'}
                      </div>
                    `
                  : ''}
              </div>

              <div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-3">
                <h2 class="text-base font-medium">
                  ${this.msg['intent.stockManagement.registerStockAdjustment.form.title']}
                </h2>
                <label class="flex flex-col gap-1">
                  <span class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.stockItemId.label']}
                  </span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="text"
                    .value=${this.registerStockAdjustmentStockItemId ?? ''}
                    @input=${this.handleRegisterStockAdjustmentStockItemIdChange}
                  />
                </label>
                <label class="flex flex-col gap-1">
                  <span class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.quantity.label']}
                  </span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="number"
                    .value=${this.registerStockAdjustmentQuantity ?? ''}
                    @input=${this.handleRegisterStockAdjustmentQuantityChange}
                  />
                </label>
                <label class="flex flex-col gap-1">
                  <span class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.direction.label']}
                  </span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="text"
                    .value=${this.registerStockAdjustmentDirection ?? ''}
                    @input=${this.handleRegisterStockAdjustmentDirectionChange}
                  />
                </label>
                <label class="flex flex-col gap-1">
                  <span class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.reason.label']}
                  </span>
                  <input
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    type="text"
                    .value=${this.registerStockAdjustmentReason ?? ''}
                    @input=${this.handleRegisterStockAdjustmentReasonChange}
                  />
                </label>
                <label class="flex flex-col gap-1">
                  <span class="text-sm text-[var(--text-muted,#64748b)]">
                    ${this.msg['intent.stockManagement.registerStockAdjustment.form.field.notes.label']}
                  </span>
                  <textarea
                    class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    rows="2"
                    .value=${this.registerStockAdjustmentNotes ?? ''}
                    @input=${this.handleRegisterStockAdjustmentNotesChange}
                  ></textarea>
                </label>
                <button
                  type="button"
                  class="rounded-md px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${adjustLoading}
                  @click=${this.handleRegisterStockAdjustmentClick}
                >
                  ${adjustLoading
                    ? '…'
                    : this.msg['intent.stockManagement.registerStockAdjustment.form.action.registerStockAdjustment']}
                </button>
                ${this.registerStockAdjustmentState === 'success'
                  ? html`
                      <div
                        class="rounded-md px-3 py-2 text-sm bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]"
                        role="status"
                      >
                        <!-- TODO: action.registerStockAdjustment.success not in MessageType -->
                        OK
                      </div>
                    `
                  : ''}
                ${this.registerStockAdjustmentState === 'error'
                  ? html`
                      <div
                        class="rounded-md px-3 py-2 text-sm bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)]"
                        role="alert"
                      >
                        ${this.registerStockAdjustmentError ||
                        '<!-- TODO: action.registerStockAdjustment.error --> Error'}
                      </div>
                    `
                  : ''}
              </div>
            </div>
          </section>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <h2 class="text-lg font-medium text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.stockManagement.sec-createStockItem.title']}
            </h2>
            <div class="grid gap-3 md:grid-cols-2">
              <label class="flex flex-col gap-1">
                <span class="text-sm text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.name.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="text"
                  .value=${this.addStockItemName ?? ''}
                  @input=${this.handleAddStockItemNameChange}
                />
              </label>
              <label class="flex flex-col gap-1">
                <span class="text-sm text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.unit.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="text"
                  .value=${this.addStockItemUnit ?? ''}
                  @input=${this.handleAddStockItemUnitChange}
                />
              </label>
              <label class="flex flex-col gap-1">
                <span class="text-sm text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.currentBalance.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  .value=${this.addStockItemCurrentBalance ?? ''}
                  @input=${this.handleAddStockItemCurrentBalanceChange}
                />
              </label>
              <label class="flex flex-col gap-1">
                <span class="text-sm text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.minimumLevel.label']}
                </span>
                <input
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  type="number"
                  .value=${this.addStockItemMinimumLevel ?? ''}
                  @input=${this.handleAddStockItemMinimumLevelChange}
                />
              </label>
              <label class="flex flex-col gap-1 md:col-span-2">
                <span class="text-sm text-[var(--text-muted,#64748b)]">
                  ${this.msg['intent.stockManagement.addStockItem.form.field.description.label']}
                </span>
                <textarea
                  class="rounded-md border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  rows="2"
                  .value=${this.addStockItemDescription ?? ''}
                  @input=${this.handleAddStockItemDescriptionChange}
                ></textarea>
              </label>
            </div>
            <button
              type="button"
              class="rounded-md px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
              ?disabled=${addLoading}
              @click=${this.handleAddStockItemClick}
            >
              ${addLoading
                ? '…'
                : this.msg['intent.stockManagement.addStockItem.form.action.addStockItem']}
            </button>
            ${this.addStockItemState === 'success'
              ? html`
                  <div
                    class="rounded-md px-3 py-2 text-sm bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)]"
                    role="status"
                  >
                    <!-- TODO: action.addStockItem.success not in MessageType -->
                    OK
                  </div>
                `
              : ''}
            ${this.addStockItemState === 'error'
              ? html`
                  <div
                    class="rounded-md px-3 py-2 text-sm bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)]"
                    role="alert"
                  >
                    ${this.addStockItemError || '<!-- TODO: action.addStockItem.error --> Error'}
                  </div>
                `
              : ''}
          </section>
        </div>
      </div>
    `;
  }
}

function nothingOrEmpty(_s: string): unknown {
  return '';
}
