/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page21/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { ListMenuItemsOutput } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';

type MenuItemRow = {
  menuItemId?: string;
  menuCategoryId?: string;
  name?: string;
  description?: string;
  price?: string | number;
  status?: string;
  pauseReason?: string;
  imageUrl?: string;
  displayOrder?: string | number;
  requiresStockLink?: boolean | string;
};

@customElement('cafe-flow--web--desktop--page21--menu-management-102051')
export class CafeFlowDesktopPage21MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const listData: ListMenuItemsOutput | null | undefined = this.listMenuItemsData;
    const rawItems = listData && (listData as { menuItems?: unknown }).menuItems;
    const menuItems: MenuItemRow[] = Array.isArray(rawItems) ? (rawItems as MenuItemRow[]) : [];
    const totalRaw = listData && (listData as { total?: unknown }).total;
    const total = typeof totalRaw === 'number' ? totalRaw : Number(totalRaw ?? 0) || 0;
    const listLoading = this.listMenuItemsState === 'loading';
    const selectedId = this.updateMenuItemCmdMenuItemId || '';
    const selectedItem =
      menuItems.find((item: MenuItemRow) => String(item.menuItemId ?? '') === selectedId) ?? null;
    const currentStatus = (this.updateMenuItemCmdStatus || selectedItem?.status || '').toLowerCase();

    const selectMenuItem = (item: MenuItemRow): void => {
      this.setUpdateMenuItemCmdMenuItemId(String(item.menuItemId ?? ''));
      this.setUpdateMenuItemCmdMenuCategoryId(String(item.menuCategoryId ?? ''));
      this.setUpdateMenuItemCmdName(String(item.name ?? ''));
      this.setUpdateMenuItemCmdDescription(String(item.description ?? ''));
      this.setUpdateMenuItemCmdPrice(String(item.price ?? ''));
      this.setUpdateMenuItemCmdStatus(String(item.status ?? ''));
      this.setUpdateMenuItemCmdPauseReason(String(item.pauseReason ?? ''));
      this.setUpdateMenuItemCmdImageUrl(String(item.imageUrl ?? ''));
      this.setUpdateMenuItemCmdDisplayOrder(String(item.displayOrder ?? ''));
      const stock =
        item.requiresStockLink === true ||
        item.requiresStockLink === 'true' ||
        item.requiresStockLink === '1'
          ? 'true'
          : 'false';
      this.setUpdateMenuItemCmdRequiresStockLink(stock);
    };

    const applyStatusTransition = (nextStatus: string): void => {
      this.setUpdateMenuItemCmdStatus(nextStatus);
      if (nextStatus !== 'paused' && nextStatus !== 'PAUSED') {
        this.setUpdateMenuItemCmdPauseReason('');
      }
      this.handleUpdateMenuItemCmdClick();
    };

    const statusBadgeClass = (status: string): string => {
      const s = (status || '').toLowerCase();
      if (s === 'active' || s === 'ativo') {
        return 'bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]';
      }
      if (s === 'paused' || s === 'pausado') {
        return 'bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)]';
      }
      return 'bg-[var(--ds-color-status-neutral-bg,#f1f5f9)] text-[var(--ds-color-status-neutral-text,#334155)]';
    };

    return html`
      <div class="min-h-full p-6 space-y-6 bg-[var(--ds-color-page-bg,#f8fafc)] text-[var(--ds-color-text-default,#0f172a)]">
        <header class="flex flex-wrap items-center justify-between gap-4">
          <h1 class="text-2xl font-semibold text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['section.menuManagement.sec-menu-item-workbench.title']}
          </h1>
          <div class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
            ${this.msg['intent.menuManagement.listMenuItems.list.column.total.label']}: ${total}
          </div>
        </header>

        <!-- Filters / summary-first -->
        <section
          class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] p-4 shadow-sm"
          aria-label=${this.msg['organism.menuManagement.summary-first10.title']}
        >
          <div class="mb-3 text-sm font-medium text-[var(--ds-color-text-strong,#020617)]">
            ${this.msg['intent.menuManagement.summary-first10.content.title']}
          </div>
          <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.listMenuItems.list.filter.status.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsStatus ?? ''}
                @change=${(event: Event) => this.handleListMenuItemsStatusChange(event)}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.listMenuItems.list.filter.menuCategoryId.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsMenuCategoryId ?? ''}
                @change=${(event: Event) => this.handleListMenuItemsMenuCategoryIdChange(event)}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.listMenuItems.list.filter.name.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsName ?? ''}
                @change=${(event: Event) => this.handleListMenuItemsNameChange(event)}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.listMenuItems.list.filter.page.label']}
              </span>
              <input
                type="number"
                min="1"
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsPage ?? ''}
                @change=${(event: Event) => this.handleListMenuItemsPageChange(event)}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.listMenuItems.list.filter.pageSize.label']}
              </span>
              <input
                type="number"
                min="1"
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.listMenuItemsPageSize ?? ''}
                @change=${(event: Event) => this.handleListMenuItemsPageSizeChange(event)}
              />
            </label>
          </div>
          <div class="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              class="rounded-md px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
              ?disabled=${listLoading}
              @click=${(event: Event) => this.handleListMenuItemsClick(event)}
            >
              ${listLoading
                ? '…'
                : this.msg['organism.menuManagement.listMenuItems.title']}
            </button>
          </div>
        </section>

        <!-- Master-detail: list + contextual edit panel -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <section
            class="lg:col-span-3 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] shadow-sm overflow-hidden"
            aria-label=${this.msg['organism.menuManagement.listMenuItems.title']}
          >
            <div
              class="flex items-center justify-between border-b border-[var(--ds-color-border-subtle,#e2e8f0)] px-4 py-3 bg-[var(--ds-color-surface-alt-bg,#f8fafc)]"
            >
              <h2 class="text-base font-semibold text-[var(--ds-color-text-strong,#020617)]">
                ${this.msg['intent.menuManagement.listMenuItems.list.title']}
              </h2>
              <span class="text-xs text-[var(--ds-color-text-muted,#64748b)]">${total}</span>
            </div>

            ${listLoading
              ? html`
                  <div class="p-4 space-y-3" aria-busy="true">
                    <div class="h-10 rounded-md bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] animate-pulse"></div>
                    <div class="h-10 rounded-md bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] animate-pulse"></div>
                    <div class="h-10 rounded-md bg-[var(--ds-color-surface-alt-bg,#f1f5f9)] animate-pulse"></div>
                  </div>
                `
              : menuItems.length === 0
                ? html`
                    <div class="p-8 text-center text-sm text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.menuManagement.listMenuItems.list.empty']}
                    </div>
                  `
                : html`
                    <div class="overflow-x-auto">
                      <table class="min-w-full text-sm">
                        <thead class="bg-[var(--ds-color-surface-alt-bg,#f8fafc)] text-left text-[var(--ds-color-text-muted,#64748b)]">
                          <tr>
                            <th class="px-4 py-2 font-medium">
                              ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.name.label']}
                            </th>
                            <th class="px-4 py-2 font-medium">
                              ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label']}
                            </th>
                            <th class="px-4 py-2 font-medium">
                              ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.price.label']}
                            </th>
                            <th class="px-4 py-2 font-medium">
                              ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.status.label']}
                            </th>
                            <th class="px-4 py-2 font-medium">
                              ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label']}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          ${menuItems.map((item: MenuItemRow) => {
                            const id = String(item.menuItemId ?? '');
                            const isSelected = id !== '' && id === selectedId;
                            return html`
                              <tr
                                class="cursor-pointer border-t border-[var(--ds-color-border-subtle,#e2e8f0)] ${isSelected
                                  ? 'bg-[var(--ds-color-selected-bg,#eff6ff)] text-[var(--ds-color-selected-text,#1e3a8a)]'
                                  : 'hover:bg-[var(--ds-color-surface-alt-bg,#f8fafc)]'}"
                                @click=${(_event: Event) => selectMenuItem(item)}
                              >
                                <td class="px-4 py-3 font-medium">${item.name ?? ''}</td>
                                <td class="px-4 py-3 text-[var(--ds-color-text-muted,#64748b)]">
                                  ${item.menuCategoryId ?? ''}
                                </td>
                                <td class="px-4 py-3">${item.price ?? ''}</td>
                                <td class="px-4 py-3">
                                  <span
                                    class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(
                                      String(item.status ?? ''),
                                    )}"
                                  >
                                    ${item.status ?? ''}
                                  </span>
                                </td>
                                <td class="px-4 py-3">${item.displayOrder ?? ''}</td>
                              </tr>
                            `;
                          })}
                        </tbody>
                      </table>
                    </div>
                  `}
          </section>

          <!-- Detail / update panel (contextual-transition-actions) -->
          <section
            class="lg:col-span-2 rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] shadow-sm p-4 space-y-4"
            aria-label=${this.msg['organism.menuManagement.updateMenuItemCmd.title']}
          >
            <h2 class="text-base font-semibold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['intent.menuManagement.updateMenuItemCmd.form.title']}
            </h2>

            ${!selectedId
              ? html`
                  <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
                    ${this.msg['intent.menuManagement.listMenuItems.list.empty']}
                  </p>
                `
              : html`
                  <div class="flex flex-wrap items-center gap-2">
                    <span class="text-xs text-[var(--ds-color-text-muted,#64748b)]">
                      ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.status.label']}
                    </span>
                    <span
                      class="inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${statusBadgeClass(
                        this.updateMenuItemCmdStatus || currentStatus,
                      )}"
                    >
                      ${this.updateMenuItemCmdStatus || currentStatus || '—'}
                    </span>
                  </div>

                  <div class="flex flex-wrap gap-2">
                    ${currentStatus === 'active' || currentStatus === 'ativo'
                      ? html`
                          <button
                            type="button"
                            class="rounded-md px-3 py-2 text-sm font-medium bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)] disabled:opacity-60"
                            ?disabled=${this.updateMenuItemCmdState === 'loading'}
                            @click=${(_event: Event) => applyStatusTransition('paused')}
                          >
                            paused
                          </button>
                        `
                      : ''}
                    ${currentStatus === 'paused' || currentStatus === 'pausado'
                      ? html`
                          <button
                            type="button"
                            class="rounded-md px-3 py-2 text-sm font-medium bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)] disabled:opacity-60"
                            ?disabled=${this.updateMenuItemCmdState === 'loading'}
                            @click=${(_event: Event) => applyStatusTransition('active')}
                          >
                            active
                          </button>
                        `
                      : ''}
                    ${currentStatus !== 'active' &&
                    currentStatus !== 'ativo' &&
                    currentStatus !== 'paused' &&
                    currentStatus !== 'pausado'
                      ? html`
                          <button
                            type="button"
                            class="rounded-md px-3 py-2 text-sm font-medium bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)] disabled:opacity-60"
                            ?disabled=${this.updateMenuItemCmdState === 'loading'}
                            @click=${(_event: Event) => applyStatusTransition('active')}
                          >
                            active
                          </button>
                          <button
                            type="button"
                            class="rounded-md px-3 py-2 text-sm font-medium bg-[var(--ds-color-status-warning-bg,#fef3c7)] text-[var(--ds-color-status-warning-text,#92400e)] disabled:opacity-60"
                            ?disabled=${this.updateMenuItemCmdState === 'loading'}
                            @click=${(_event: Event) => applyStatusTransition('paused')}
                          >
                            paused
                          </button>
                        `
                      : ''}
                  </div>

                  <div class="grid grid-cols-1 gap-3">
                    <label class="flex flex-col gap-1 text-sm">
                      <span class="text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label']}
                      </span>
                      <input
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdMenuCategoryId ?? ''}
                        @change=${(event: Event) => this.handleUpdateMenuItemCmdMenuCategoryIdChange(event)}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span class="text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.name.label']}
                      </span>
                      <input
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdName ?? ''}
                        @change=${(event: Event) => this.handleUpdateMenuItemCmdNameChange(event)}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span class="text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.description.label']}
                      </span>
                      <textarea
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2 min-h-[4rem]"
                        .value=${this.updateMenuItemCmdDescription ?? ''}
                        @change=${(event: Event) => this.handleUpdateMenuItemCmdDescriptionChange(event)}
                      ></textarea>
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span class="text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.price.label']}
                      </span>
                      <input
                        type="number"
                        step="0.01"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdPrice ?? ''}
                        @change=${(event: Event) => this.handleUpdateMenuItemCmdPriceChange(event)}
                      />
                    </label>
                    ${currentStatus === 'paused' ||
                    currentStatus === 'pausado' ||
                    (this.updateMenuItemCmdStatus || '').toLowerCase() === 'paused'
                      ? html`
                          <label class="flex flex-col gap-1 text-sm">
                            <span class="text-[var(--ds-color-text-muted,#64748b)]">
                              ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.pauseReason.label']}
                            </span>
                            <input
                              class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                              .value=${this.updateMenuItemCmdPauseReason ?? ''}
                              @change=${(event: Event) => this.handleUpdateMenuItemCmdPauseReasonChange(event)}
                            />
                          </label>
                        `
                      : ''}
                    <label class="flex flex-col gap-1 text-sm">
                      <span class="text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.imageUrl.label']}
                      </span>
                      <input
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdImageUrl ?? ''}
                        @change=${(event: Event) => this.handleUpdateMenuItemCmdImageUrlChange(event)}
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-sm">
                      <span class="text-[var(--ds-color-text-muted,#64748b)]">
                        ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label']}
                      </span>
                      <input
                        type="number"
                        class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                        .value=${this.updateMenuItemCmdDisplayOrder ?? ''}
                        @change=${(event: Event) => this.handleUpdateMenuItemCmdDisplayOrderChange(event)}
                      />
                    </label>
                    <label class="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        .checked=${this.updateMenuItemCmdRequiresStockLink === 'true' ||
                        this.updateMenuItemCmdRequiresStockLink === '1'}
                        @change=${(event: Event) => {
                          const checked = (event.target as HTMLInputElement | null)?.checked === true;
                          this.setUpdateMenuItemCmdRequiresStockLink(checked ? 'true' : 'false');
                        }}
                      />
                      <span>
                        ${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.requiresStockLink.label']}
                      </span>
                    </label>
                  </div>

                  <div class="flex flex-wrap items-center gap-2 pt-2">
                    <button
                      type="button"
                      class="rounded-md px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
                      ?disabled=${this.updateMenuItemCmdState === 'loading'}
                      @click=${(event: Event) => this.handleUpdateMenuItemCmdClick(event)}
                    >
                      ${this.updateMenuItemCmdState === 'loading'
                        ? '…'
                        : this.msg['intent.menuManagement.updateMenuItemCmd.form.action.updateMenuItemCmd']}
                    </button>
                  </div>

                  ${this.updateMenuItemCmdState === 'success'
                    ? html`
                        <div
                          class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]"
                          role="status"
                        >
                          <!-- TODO: action.updateMenuItemCmd.success -->
                          OK
                        </div>
                      `
                    : ''}
                  ${this.updateMenuItemCmdState === 'error'
                    ? html`
                        <div
                          class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]"
                          role="alert"
                        >
                          ${this.updateMenuItemCmdError || '<!-- TODO: action.updateMenuItemCmd.error --> Error'}
                        </div>
                      `
                    : ''}
                `}
          </section>
        </div>

        <!-- Create form (toolbar / secondary panel) -->
        <section
          class="rounded-lg border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-surface-bg,#ffffff)] shadow-sm p-4 space-y-4"
          aria-label=${this.msg['section.menuManagement.sec-create-menu-item.title']}
        >
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h2 class="text-base font-semibold text-[var(--ds-color-text-strong,#020617)]">
              ${this.msg['organism.menuManagement.createMenuItemCmd.title']}
            </h2>
          </div>
          <p class="text-sm text-[var(--ds-color-text-muted,#64748b)]">
            ${this.msg['intent.menuManagement.createMenuItemCmd.form.title']}
          </p>

          <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.createMenuItemCmd.form.field.menuCategoryId.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.createMenuItemCmdMenuCategoryId ?? ''}
                @change=${(event: Event) => this.handleCreateMenuItemCmdMenuCategoryIdChange(event)}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.createMenuItemCmd.form.field.name.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.createMenuItemCmdName ?? ''}
                @change=${(event: Event) => this.handleCreateMenuItemCmdNameChange(event)}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm md:col-span-2">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.createMenuItemCmd.form.field.description.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.createMenuItemCmdDescription ?? ''}
                @change=${(event: Event) => this.handleCreateMenuItemCmdDescriptionChange(event)}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.createMenuItemCmd.form.field.price.label']}
              </span>
              <input
                type="number"
                step="0.01"
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.createMenuItemCmdPrice ?? ''}
                @change=${(event: Event) => this.handleCreateMenuItemCmdPriceChange(event)}
              />
            </label>
            <div class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.createMenuItemCmd.form.field.status.label']}
              </span>
              <div class="flex flex-wrap gap-2">
                <button
                  type="button"
                  class="rounded-md px-3 py-2 text-sm border border-[var(--ds-color-border-default,#e2e8f0)] ${this.createMenuItemCmdStatus === 'active'
                    ? 'bg-[var(--ds-color-selected-bg,#eff6ff)] border-[var(--ds-color-selected-border,#2563eb)] text-[var(--ds-color-selected-text,#1e3a8a)]'
                    : 'bg-[var(--ds-color-button-secondary-bg,#ffffff)] text-[var(--ds-color-button-secondary-text,#0f172a)]'}"
                  @click=${(_event: Event) => this.setCreateMenuItemCmdStatus('active')}
                >
                  active
                </button>
                <button
                  type="button"
                  class="rounded-md px-3 py-2 text-sm border border-[var(--ds-color-border-default,#e2e8f0)] ${this.createMenuItemCmdStatus === 'paused'
                    ? 'bg-[var(--ds-color-selected-bg,#eff6ff)] border-[var(--ds-color-selected-border,#2563eb)] text-[var(--ds-color-selected-text,#1e3a8a)]'
                    : 'bg-[var(--ds-color-button-secondary-bg,#ffffff)] text-[var(--ds-color-button-secondary-text,#0f172a)]'}"
                  @click=${(_event: Event) => this.setCreateMenuItemCmdStatus('paused')}
                >
                  paused
                </button>
              </div>
            </div>
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.createMenuItemCmd.form.field.imageUrl.label']}
              </span>
              <input
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.createMenuItemCmdImageUrl ?? ''}
                @change=${(event: Event) => this.handleCreateMenuItemCmdImageUrlChange(event)}
              />
            </label>
            <label class="flex flex-col gap-1 text-sm">
              <span class="text-[var(--ds-color-text-muted,#64748b)]">
                ${this.msg['intent.menuManagement.createMenuItemCmd.form.field.displayOrder.label']}
              </span>
              <input
                type="number"
                class="rounded-md border border-[var(--ds-color-border-default,#e2e8f0)] bg-[var(--ds-color-input-bg,#ffffff)] px-3 py-2"
                .value=${this.createMenuItemCmdDisplayOrder ?? ''}
                @change=${(event: Event) => this.handleCreateMenuItemCmdDisplayOrderChange(event)}
              />
            </label>
            <label class="flex items-center gap-2 text-sm self-end pb-2">
              <input
                type="checkbox"
                .checked=${this.createMenuItemCmdRequiresStockLink === 'true' ||
                this.createMenuItemCmdRequiresStockLink === '1'}
                @change=${(event: Event) => {
                  const checked = (event.target as HTMLInputElement | null)?.checked === true;
                  this.setCreateMenuItemCmdRequiresStockLink(checked ? 'true' : 'false');
                }}
              />
              <span>
                ${this.msg['intent.menuManagement.createMenuItemCmd.form.field.requiresStockLink.label']}
              </span>
            </label>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              type="button"
              class="rounded-md px-4 py-2 text-sm font-medium bg-[var(--ds-color-button-primary-bg,#2563eb)] text-[var(--ds-color-button-primary-text,#ffffff)] disabled:opacity-60"
              ?disabled=${this.createMenuItemCmdState === 'loading'}
              @click=${(event: Event) => this.handleCreateMenuItemCmdClick(event)}
            >
              ${this.createMenuItemCmdState === 'loading'
                ? '…'
                : this.msg['intent.menuManagement.createMenuItemCmd.form.action.createMenuItemCmd']}
            </button>
          </div>

          ${this.createMenuItemCmdState === 'success'
            ? html`
                <div
                  class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-success-bg,#dcfce7)] text-[var(--ds-color-status-success-text,#166534)]"
                  role="status"
                >
                  <!-- TODO: action.createMenuItemCmd.success -->
                  OK
                </div>
              `
            : ''}
          ${this.createMenuItemCmdState === 'error'
            ? html`
                <div
                  class="rounded-md px-3 py-2 text-sm bg-[var(--ds-color-status-error-bg,#fee2e2)] text-[var(--ds-color-status-error-text,#991b1b)]"
                  role="alert"
                >
                  ${this.createMenuItemCmdError || '<!-- TODO: action.createMenuItemCmd.error --> Error'}
                </div>
              `
            : ''}
        </section>
      </div>
    `;
  }
}
