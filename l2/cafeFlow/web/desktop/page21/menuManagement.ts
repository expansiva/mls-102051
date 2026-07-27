/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { ListMenuItemsOutput } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';

type MenuItemRow = {
  menuItemId?: string;
  menuCategoryId?: string;
  name?: string;
  description?: string;
  price?: number | string;
  status?: string;
  pauseReason?: string | null;
  imageUrl?: string | null;
  displayOrder?: number | string;
  requiresStockLink?: boolean | string;
};

@customElement('cafe-flow--web--desktop--page21--menu-management-102051')
export class CafeFlowDesktopPage21MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const listData = this.listMenuItemsData as ListMenuItemsOutput | null | undefined;
    const menuItemsRaw = listData && Array.isArray((listData as { menuItems?: unknown }).menuItems)
      ? (listData as { menuItems: MenuItemRow[] }).menuItems
      : [];
    const menuItems: MenuItemRow[] = menuItemsRaw;
    const totalRaw = listData && (listData as { total?: unknown }).total;
    const total = typeof totalRaw === 'number' ? totalRaw : Number(totalRaw ?? 0) || 0;
    const listLoading = this.listMenuItemsState === 'loading';
    const createLoading = this.createMenuItemCmdState === 'loading';
    const updateLoading = this.updateMenuItemCmdState === 'loading';
    const selectedId = this.updateMenuItemCmdMenuItemId;
    const hasSelection = Boolean(selectedId && selectedId.trim());
    const selectedItem = hasSelection
      ? menuItems.find((item) => String(item.menuItemId ?? '') === selectedId) ?? null
      : null;
    const currentStatus = (this.updateMenuItemCmdStatus || selectedItem?.status || '').toLowerCase();

    const formatPrice = (value: number | string | undefined): string => {
      if (value === undefined || value === null || value === '') return '—';
      const num = typeof value === 'number' ? value : Number(value);
      if (Number.isFinite(num)) {
        return num.toLocaleString(undefined, { style: 'currency', currency: 'BRL' });
      }
      return String(value);
    };

    const statusBadgeClass = (status: string | undefined): string => {
      const s = (status ?? '').toLowerCase();
      if (s === 'active' || s === 'ativo') {
        return 'bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]';
      }
      if (s === 'paused' || s === 'pausado') {
        return 'bg-[var(--ds-color-status-warning-bg,#fef9c3)] text-[var(--ds-color-status-warning-text,#854d0e)]';
      }
      return 'bg-[var(--ds-color-status-neutral-bg,#f1f5f9)] text-[var(--ds-color-status-neutral-text,#334155)]';
    };

    const selectMenuItem = (item: MenuItemRow): void => {
      this.setUpdateMenuItemCmdMenuItemId(String(item.menuItemId ?? ''));
      this.setUpdateMenuItemCmdMenuCategoryId(String(item.menuCategoryId ?? ''));
      this.setUpdateMenuItemCmdName(String(item.name ?? ''));
      this.setUpdateMenuItemCmdDescription(String(item.description ?? ''));
      this.setUpdateMenuItemCmdPrice(item.price === undefined || item.price === null ? '' : String(item.price));
      this.setUpdateMenuItemCmdStatus(String(item.status ?? ''));
      this.setUpdateMenuItemCmdPauseReason(String(item.pauseReason ?? ''));
      this.setUpdateMenuItemCmdImageUrl(String(item.imageUrl ?? ''));
      this.setUpdateMenuItemCmdDisplayOrder(
        item.displayOrder === undefined || item.displayOrder === null ? '' : String(item.displayOrder),
      );
      const stock = item.requiresStockLink;
      this.setUpdateMenuItemCmdRequiresStockLink(
        stock === true || stock === 'true' ? 'true' : stock === false || stock === 'false' ? 'false' : String(stock ?? ''),
      );
    };

    const clearSelectionForCreate = (): void => {
      this.setUpdateMenuItemCmdMenuItemId('');
    };

    const applyStatusTransition = (nextStatus: string): void => {
      this.setUpdateMenuItemCmdStatus(nextStatus);
      if (nextStatus === 'active' || nextStatus === 'ativo') {
        this.setUpdateMenuItemCmdPauseReason('');
      }
      void this.handleUpdateMenuItemCmdClick();
    };

    return html`
      <div class="min-h-full bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)] p-6 space-y-6">
        <header class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['section.menuManagement.sec-menu-item-list.title']}
            </h1>
            <p class="text-sm text-[var(--ds-color-text-muted,#64748b)] mt-1">
              ${this.msg['organism.menuManagement.listMenuItems.title']}
            </p>
          </div>
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] hover:bg-[var(--ds-color-button-primary-bg-hover,#1d4ed8)] focus:outline-none focus:ring-2 focus:ring-[var(--ds-color-focus-ring,#93c5fd)]"
            @click=${clearSelectionForCreate}
          >
            ${this.msg['organism.menuManagement.createMenuItemCmd.title']}
          </button>
        </header>

        <section class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm space-y-4">
          <div class="flex flex-wrap items-end gap-3">
            <label class="flex flex-col gap-1 text-sm min-w-[8rem]">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.status.label']}</span>
              <select
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsStatus}
                @change=${this.handleListMenuItemsStatusChange}
              >
                <option value="">—</option>
                <option value="active">active</option>
                <option value="paused">paused</option>
              </select>
            </label>
            <label class="flex flex-col gap-1 text-sm min-w-[10rem]">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.menuCategoryId.label']}</span>
              <input
                type="text"
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsMenuCategoryId}
                @input=${this.handleListMenuItemsMenuCategoryIdChange}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm min-w-[12rem] flex-1">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.name.label']}</span>
              <input
                type="text"
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsName}
                @input=${this.handleListMenuItemsNameChange}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm w-24">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.page.label']}</span>
              <input
                type="number"
                min="1"
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsPage}
                @input=${this.handleListMenuItemsPageChange}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm w-28">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.pageSize.label']}</span>
              <input
                type="number"
                min="1"
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsPageSize}
                @input=${this.handleListMenuItemsPageSizeChange}
              />
            </label>
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-secondary-bg,#f8fafc)] text-[var(--ds-color-button-secondary-text,#0f172a)] border border-[var(--ds-color-button-secondary-border,#e2e8f0)] disabled:opacity-60"
              ?disabled=${listLoading}
              @click=${this.handleListMenuItemsClick}
            >
              ${listLoading ? '…' : this.msg['intent.menuManagement.listMenuItems.list.title']}
            </button>
          </div>

          <div class="flex flex-wrap gap-3 text-sm">
            <div class="rounded-md border border-[var(--ds-color-border-subtle,#e2e8f0)] bg-[var(--ds-color-surface-alt-bg,#f8fafc)] px-3 py-2">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.column.total.label']}:</span>
              <span class="ml-1 font-semibold text-[var(--ds-color-text-strong,#020617)]">${total}</span>
            </div>
          </div>
        </section>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section class="lg:col-span-2 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] shadow-sm overflow-hidden">
            <div class="px-4 py-3 border-b border-[var(--ds-color-border-subtle,#e2e8f0)]">
              <h2 class="text-base font-medium">${this.msg['intent.menuManagement.listMenuItems.list.title']}</h2>
            </div>

            ${listLoading
              ? html`
                  <div class="p-6 space-y-3 animate-pulse">
                    <div class="h-10 rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-10 rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                    <div class="h-10 rounded bg-[var(--ds-color-surface-alt-bg,#f1f5f9)]"></div>
                  </div>
                `
              : menuItems.length === 0
                ? html`
                    <div class="p-8 text-center text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.menuManagement.listMenuItems.list.empty']}
                    </div>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="min-w-full text-sm">
                        <thead class="bg-[var(--ds-color-surface-alt-bg,#f8fafc)] text-left text-[var(--ds-color-text-muted,#64748b)]">
                          <tr>
                            <th class="px-3 py-2 font-medium w-14"></th>
                            <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.name.label']}</th>
                            <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label']}</th>
                            <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.price.label']}</th>
                            <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.status.label']}</th>
                            <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label']}</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${menuItems.map((item: MenuItemRow) => {
                            const rowId = String(item.menuItemId ?? '');
                            const isSelected = hasSelection && rowId === selectedId;
                            return html`
                              <tr
                                class="border-t border-[var(--ds-color-border-subtle,#e2e8f0)] cursor-pointer ${isSelected
                                  ? 'bg-[var(--ds-color-selected-bg,#eff6ff)] text-[var(--ds-color-selected-text,#1e3a8a)]'
                                  : 'hover:bg-[var(--ds-color-surface-alt-bg,#f8fafc)]'}"
                                @click=${() => selectMenuItem(item)}
                              >
                                <td class="px-3 py-2">
                                  ${item.imageUrl
                                    ? html`<img
                                        src=${item.imageUrl}
                                        alt=${item.name ?? ''}
                                        loading="lazy"
                                        class="h-10 w-10 rounded object-cover border border-[var(--ds-color-border-subtle,#e2e8f0)]"
                                      />`
                                    : nothing}
                                </td>
                                <td class="px-3 py-2 font-medium">${item.name ?? '—'}</td>
                                <td class="px-3 py-2 text-[var(--ds-color-text-muted,#64748b)]">${item.menuCategoryId ?? '—'}</td>
                                <td class="px-3 py-2">${formatPrice(item.price)}</td>
                                <td class="px-3 py-2">
                                  <span class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(item.status)}">
                                    ${item.status ?? '—'}
                                  </span>
                                </td>
                                <td class="px-3 py-2">${item.displayOrder ?? '—'}</td>
                              </tr>
                            `;
                          })}
                        </tbody>
                      </table>
                    </div>
                  `}
          </section>

          <aside class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] shadow-sm p-4 space-y-4">
            ${hasSelection
              ? html`
                  <div class="space-y-1">
                    <h2 class="text-base font-medium">${this.msg['organism.menuManagement.updateMenuItemCmd.title']}</h2>
                    <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.title']}</p>
                  </div>

                  ${selectedItem?.imageUrl
                    ? html`<img
                        src=${selectedItem.imageUrl}
                        alt=${selectedItem.name ?? ''}
                        loading="lazy"
                        class="h-28 w-full max-w-xs rounded-lg object-cover border border-[var(--ds-color-border-subtle,#e2e8f0)]"
                      />`
                    : nothing}

                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-sm text-[var(--ds-color-text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.status.label']}:</span>
                    <span class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(currentStatus)}">
                      ${this.updateMenuItemCmdStatus || selectedItem?.status || '—'}
                    </span>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    ${currentStatus === 'paused' || currentStatus === 'pausado'
                      ? html`
                          <button
                            type="button"
                            class="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)] disabled:opacity-60"
                            ?disabled=${updateLoading}
                            @click=${() => applyStatusTransition('active')}
                          >
                            ${updateLoading ? '…' : 'Ativar'}
                          </button>
                        `
                      : nothing}
                    ${currentStatus === 'active' || currentStatus === 'ativo' || (currentStatus && currentStatus !== 'paused' && currentStatus !== 'pausado')
                      ? html`
                          <button
                            type="button"
                            class="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium bg-[var(--ds-color-status-warning-bg,#fef9c3)] text-[var(--ds-color-status-warning-text,#854d0e)] disabled:opacity-60"
                            ?disabled=${updateLoading}
                            @click=${() => applyStatusTransition('paused')}
                          >
                            ${updateLoading ? '…' : 'Pausar'}
                          </button>
                        `
                      : nothing}
                  </div>

                  <div class="space-y-3">
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label']}</span>
                      <input
                        type="text"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdMenuCategoryId}
                        @input=${this.handleUpdateMenuItemCmdMenuCategoryIdChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.name.label']}</span>
                      <input
                        type="text"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdName}
                        @input=${this.handleUpdateMenuItemCmdNameChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.description.label']}</span>
                      <textarea
                        rows="3"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdDescription}
                        @input=${this.handleUpdateMenuItemCmdDescriptionChange}
                      ></textarea>
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.price.label']}</span>
                      <input
                        type="number"
                        step="0.01"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdPrice}
                        @input=${this.handleUpdateMenuItemCmdPriceChange}
                      />
                    </label>
                    ${(currentStatus === 'paused' || currentStatus === 'pausado' || this.updateMenuItemCmdStatus === 'paused')
                      ? html`
                          <label class="flex flex-col gap-1 text-sm">
                            <span>${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.pauseReason.label']}</span>
                            <input
                              type="text"
                              class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                              .value=${this.updateMenuItemCmdPauseReason}
                              @input=${this.handleUpdateMenuItemCmdPauseReasonChange}
                            />
                          </label>
                        `
                      : nothing}
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.imageUrl.label']}</span>
                      <input
                        type="text"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdImageUrl}
                        @input=${this.handleUpdateMenuItemCmdImageUrlChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label']}</span>
                      <input
                        type="number"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdDisplayOrder}
                        @input=${this.handleUpdateMenuItemCmdDisplayOrderChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.requiresStockLink.label']}</span>
                      <select
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdRequiresStockLink}
                        @change=${this.handleUpdateMenuItemCmdRequiresStockLinkChange}
                      >
                        <option value="">—</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    </label>
                  </div>

                  <button
                    type="button"
                    class="w-full inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                    ?disabled=${updateLoading}
                    @click=${this.handleUpdateMenuItemCmdClick}
                  >
                    ${updateLoading ? '…' : this.msg['intent.menuManagement.updateMenuItemCmd.form.action.updateMenuItemCmd']}
                  </button>

                  ${this.updateMenuItemCmdState === 'success'
                    ? html`
                        <div class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)] px-3 py-2 text-sm" role="status">
                          <!-- TODO: action.updateMenuItemCmd.success -->
                          OK
                        </div>
                      `
                    : nothing}
                  ${this.updateMenuItemCmdState === 'error'
                    ? html`
                        <div class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)] px-3 py-2 text-sm" role="alert">
                          ${this.updateMenuItemCmdError || 'Error'}
                        </div>
                      `
                    : nothing}
                `
              : html`
                  <div class="space-y-1">
                    <h2 class="text-base font-medium">${this.msg['section.menuManagement.sec-create-menu-item.title']}</h2>
                    <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.title']}</p>
                  </div>

                  <div class="space-y-3">
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.createMenuItemCmd.form.field.menuCategoryId.label']}</span>
                      <input
                        type="text"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.createMenuItemCmdMenuCategoryId}
                        @input=${this.handleCreateMenuItemCmdMenuCategoryIdChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.createMenuItemCmd.form.field.name.label']}</span>
                      <input
                        type="text"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.createMenuItemCmdName}
                        @input=${this.handleCreateMenuItemCmdNameChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.createMenuItemCmd.form.field.description.label']}</span>
                      <textarea
                        rows="3"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.createMenuItemCmdDescription}
                        @input=${this.handleCreateMenuItemCmdDescriptionChange}
                      ></textarea>
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.createMenuItemCmd.form.field.price.label']}</span>
                      <input
                        type="number"
                        step="0.01"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.createMenuItemCmdPrice}
                        @input=${this.handleCreateMenuItemCmdPriceChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.createMenuItemCmd.form.field.status.label']}</span>
                      <select
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.createMenuItemCmdStatus}
                        @change=${this.handleCreateMenuItemCmdStatusChange}
                      >
                        <option value="">—</option>
                        <option value="active">active</option>
                        <option value="paused">paused</option>
                      </select>
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.createMenuItemCmd.form.field.imageUrl.label']}</span>
                      <input
                        type="text"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.createMenuItemCmdImageUrl}
                        @input=${this.handleCreateMenuItemCmdImageUrlChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.createMenuItemCmd.form.field.displayOrder.label']}</span>
                      <input
                        type="number"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.createMenuItemCmdDisplayOrder}
                        @input=${this.handleCreateMenuItemCmdDisplayOrderChange}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span>${this.msg['intent.menuManagement.createMenuItemCmd.form.field.requiresStockLink.label']}</span>
                      <select
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.createMenuItemCmdRequiresStockLink}
                        @change=${this.handleCreateMenuItemCmdRequiresStockLinkChange}
                      >
                        <option value="">—</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                      </select>
                    </label>
                  </div>

                  <button
                    type="button"
                    class="w-full inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                    ?disabled=${createLoading}
                    @click=${this.handleCreateMenuItemCmdClick}
                  >
                    ${createLoading ? '…' : this.msg['intent.menuManagement.createMenuItemCmd.form.action.createMenuItemCmd']}
                  </button>

                  ${this.createMenuItemCmdState === 'success'
                    ? html`
                        <div class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)] px-3 py-2 text-sm" role="status">
                          <!-- TODO: action.createMenuItemCmd.success -->
                          OK
                        </div>
                      `
                    : nothing}
                  ${this.createMenuItemCmdState === 'error'
                    ? html`
                        <div class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)] px-3 py-2 text-sm" role="alert">
                          ${this.createMenuItemCmdError || 'Error'}
                        </div>
                      `
                    : nothing}
                `}
          </aside>
        </div>
      </div>
    `;
  }
}
