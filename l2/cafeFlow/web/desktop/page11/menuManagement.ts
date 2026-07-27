/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';
import type { ListMenuItemsOutput } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';

type MenuItemRow = NonNullable<ListMenuItemsOutput['menuItems']>[number];

@customElement('cafe-flow--web--desktop--page11--menu-management-102051')
export class CafeFlowDesktopPage11MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const listLoading = this.listMenuItemsState === 'loading';
    const listData = this.listMenuItemsData;
    const rows: MenuItemRow[] = listData?.menuItems ?? [];
    const total = listData?.total;
    const createLoading = this.createMenuItemCmdState === 'loading';
    const updateLoading = this.updateMenuItemCmdState === 'loading';
    const selectedId = this.updateMenuItemCmdMenuItemId;

    const selectRow = (item: MenuItemRow): void => {
      const id = (item as { menuItemId?: string | number }).menuItemId;
      const menuCategoryId = (item as { menuCategoryId?: string | number }).menuCategoryId;
      const name = (item as { name?: string }).name;
      const description = (item as { description?: string }).description;
      const price = (item as { price?: string | number }).price;
      const status = (item as { status?: string }).status;
      const pauseReason = (item as { pauseReason?: string }).pauseReason;
      const imageUrl = (item as { imageUrl?: string }).imageUrl;
      const displayOrder = (item as { displayOrder?: string | number }).displayOrder;
      const requiresStockLink = (item as { requiresStockLink?: boolean | string }).requiresStockLink;
      this.setUpdateMenuItemCmdMenuItemId(id != null ? String(id) : '');
      this.setUpdateMenuItemCmdMenuCategoryId(menuCategoryId != null ? String(menuCategoryId) : '');
      this.setUpdateMenuItemCmdName(name != null ? String(name) : '');
      this.setUpdateMenuItemCmdDescription(description != null ? String(description) : '');
      this.setUpdateMenuItemCmdPrice(price != null ? String(price) : '');
      this.setUpdateMenuItemCmdStatus(status != null ? String(status) : '');
      this.setUpdateMenuItemCmdPauseReason(pauseReason != null ? String(pauseReason) : '');
      this.setUpdateMenuItemCmdImageUrl(imageUrl != null ? String(imageUrl) : '');
      this.setUpdateMenuItemCmdDisplayOrder(displayOrder != null ? String(displayOrder) : '');
      this.setUpdateMenuItemCmdRequiresStockLink(
        requiresStockLink === true || requiresStockLink === 'true' ? 'true' : 'false',
      );
    };

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.menuManagement.menuItemList.title']}
            </h1>
          </header>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <div class="space-y-3">
              <div class="flex flex-wrap items-end gap-3">
                <label class="flex flex-col gap-1 text-sm min-w-[8rem]">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.status.label']}</span>
                  <input
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.listMenuItemsStatus}
                    @input=${(e: Event) => this.handleListMenuItemsStatusChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm min-w-[8rem]">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.menuCategoryId.label']}</span>
                  <input
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.listMenuItemsMenuCategoryId}
                    @input=${(e: Event) => this.handleListMenuItemsMenuCategoryIdChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm min-w-[10rem] flex-1">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.name.label']}</span>
                  <input
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.listMenuItemsName}
                    @input=${(e: Event) => this.handleListMenuItemsNameChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm w-20">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.page.label']}</span>
                  <input
                    type="number"
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.listMenuItemsPage}
                    @input=${(e: Event) => this.handleListMenuItemsPageChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm w-24">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.pageSize.label']}</span>
                  <input
                    type="number"
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.listMenuItemsPageSize}
                    @input=${(e: Event) => this.handleListMenuItemsPageSizeChange(e)}
                  />
                </label>
                <button
                  type="button"
                  class="rounded px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${listLoading}
                  @click=${() => this.handleListMenuItemsClick()}
                >
                  ${listLoading ? '…' : this.msg['organism.menuManagement.listMenuItems.title']}
                </button>
              </div>

              ${listLoading
                ? html`
                    <div class="space-y-2 animate-pulse" aria-busy="true">
                      <div class="h-10 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                      <div class="h-10 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                      <div class="h-10 rounded bg-[var(--surface-alt-bg,#f1f5f9)]"></div>
                    </div>
                  `
                : rows.length === 0
                  ? html`
                      <p class="text-sm text-[var(--text-muted,#64748b)] py-6 text-center">
                        ${this.msg['intent.menuManagement.listMenuItems.list.empty']}
                      </p>
                    `
                  : html`
                      <div class="overflow-x-auto rounded border border-[var(--border-subtle,#e2e8f0)]">
                        <table class="min-w-full text-sm">
                          <thead class="bg-[var(--surface-alt-bg,#f1f5f9)] text-left text-[var(--text-muted,#64748b)]">
                            <tr>
                              <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.listMenuItems.list.column.menuItems.label']}</th>
                              <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label']}</th>
                              <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.price.label']}</th>
                              <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.status.label']}</th>
                              <th class="px-3 py-2 font-medium">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label']}</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${rows.map((item: MenuItemRow) => {
                              const row = item as {
                                menuItemId?: string | number;
                                name?: string;
                                menuCategoryId?: string | number;
                                price?: string | number;
                                status?: string;
                                imageUrl?: string;
                                displayOrder?: string | number;
                              };
                              const rowId = row.menuItemId != null ? String(row.menuItemId) : '';
                              const isSelected = selectedId !== '' && selectedId === rowId;
                              return html`
                                <tr
                                  class="border-t border-[var(--border-subtle,#e2e8f0)] cursor-pointer ${isSelected
                                    ? 'bg-[var(--selected-bg,#dbeafe)] text-[var(--selected-text,#0f172a)]'
                                    : 'hover:bg-[var(--surface-alt-bg,#f8fafc)]'}"
                                  @click=${() => selectRow(item)}
                                >
                                  <td class="px-3 py-2">
                                    <div class="flex items-center gap-3">
                                      ${row.imageUrl
                                        ? html`<img
                                            class="h-10 w-10 rounded object-cover shrink-0 border border-[var(--border-subtle,#e2e8f0)]"
                                            src=${row.imageUrl}
                                            alt=${row.name ?? ''}
                                            loading="lazy"
                                          />`
                                        : nothing}
                                      <span class="font-medium">${row.name ?? ''}</span>
                                    </div>
                                  </td>
                                  <td class="px-3 py-2">${row.menuCategoryId != null ? String(row.menuCategoryId) : ''}</td>
                                  <td class="px-3 py-2">${row.price != null ? String(row.price) : ''}</td>
                                  <td class="px-3 py-2">
                                    <span
                                      class="inline-flex rounded px-2 py-0.5 text-xs font-medium bg-[var(--status-neutral-bg,#f1f5f9)] text-[var(--status-neutral-text,#334155)]"
                                    >
                                      ${row.status ?? ''}
                                    </span>
                                  </td>
                                  <td class="px-3 py-2">${row.displayOrder != null ? String(row.displayOrder) : ''}</td>
                                </tr>
                              `;
                            })}
                          </tbody>
                        </table>
                      </div>
                      ${total != null
                        ? html`
                            <p class="text-xs text-[var(--text-muted,#64748b)]">
                              ${this.msg['intent.menuManagement.listMenuItems.list.column.total.label']}: ${total}
                            </p>
                          `
                        : nothing}
                    `}
            </div>

            <div class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-alt-bg,#f8fafc)] p-4 space-y-4">
              <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
                ${this.msg['organism.menuManagement.updateMenuItemCmd.title']}
              </h2>
              ${selectedId
                ? html`
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label']}</span>
                        <input
                          class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                          .value=${this.updateMenuItemCmdMenuCategoryId}
                          @input=${(e: Event) => this.handleUpdateMenuItemCmdMenuCategoryIdChange(e)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.name.label']}</span>
                        <input
                          class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                          .value=${this.updateMenuItemCmdName}
                          @input=${(e: Event) => this.handleUpdateMenuItemCmdNameChange(e)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                        <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.description.label']}</span>
                        <textarea
                          class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 min-h-[4rem]"
                          .value=${this.updateMenuItemCmdDescription}
                          @input=${(e: Event) => this.handleUpdateMenuItemCmdDescriptionChange(e)}
                        ></textarea>
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.price.label']}</span>
                        <input
                          type="number"
                          class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                          .value=${this.updateMenuItemCmdPrice}
                          @input=${(e: Event) => this.handleUpdateMenuItemCmdPriceChange(e)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.status.label']}</span>
                        <input
                          class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                          .value=${this.updateMenuItemCmdStatus}
                          @input=${(e: Event) => this.handleUpdateMenuItemCmdStatusChange(e)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.pauseReason.label']}</span>
                        <input
                          class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                          .value=${this.updateMenuItemCmdPauseReason}
                          @input=${(e: Event) => this.handleUpdateMenuItemCmdPauseReasonChange(e)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.imageUrl.label']}</span>
                        <input
                          class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                          .value=${this.updateMenuItemCmdImageUrl}
                          @input=${(e: Event) => this.handleUpdateMenuItemCmdImageUrlChange(e)}
                        />
                      </label>
                      <label class="flex flex-col gap-1 text-sm">
                        <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label']}</span>
                        <input
                          type="number"
                          class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                          .value=${this.updateMenuItemCmdDisplayOrder}
                          @input=${(e: Event) => this.handleUpdateMenuItemCmdDisplayOrderChange(e)}
                        />
                      </label>
                      <label class="flex items-center gap-2 text-sm sm:col-span-2">
                        <input
                          type="checkbox"
                          .checked=${this.updateMenuItemCmdRequiresStockLink === 'true'}
                          @change=${(e: Event) => this.handleUpdateMenuItemCmdRequiresStockLinkChange(e)}
                        />
                        <span>${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.requiresStockLink.label']}</span>
                      </label>
                    </div>
                    <div class="flex flex-wrap items-center gap-3">
                      <button
                        type="button"
                        class="rounded px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                        ?disabled=${updateLoading}
                        @click=${() => this.handleUpdateMenuItemCmdClick()}
                      >
                        ${updateLoading
                          ? '…'
                          : this.msg['intent.menuManagement.updateMenuItemCmd.form.action.updateMenuItemCmd']}
                      </button>
                    </div>
                    ${this.updateMenuItemCmdState === 'success'
                      ? html`
                          <div
                            class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm"
                            role="status"
                          >
                            <!-- TODO: action.updateMenuItemCmd.success not in MessageType -->
                            Item atualizado com sucesso.
                          </div>
                        `
                      : this.updateMenuItemCmdState === 'error'
                        ? html`
                            <div
                              class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm"
                              role="alert"
                            >
                              ${this.updateMenuItemCmdError
                                ? this.updateMenuItemCmdError
                                : html`<!-- TODO: action.updateMenuItemCmd.error not in MessageType -->Erro ao atualizar item.`}
                            </div>
                          `
                        : nothing}
                  `
                : html`
                    <p class="text-sm text-[var(--text-muted,#64748b)]">
                      ${this.msg['intent.menuManagement.listMenuItems.list.empty']}
                    </p>
                  `}
            </div>
          </section>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4 shadow-sm">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.menuManagement.createMenuItemSection.title']}
            </h2>
            <div class="space-y-4">
              <h3 class="text-base font-medium text-[var(--text-default,#0f172a)]">
                ${this.msg['organism.menuManagement.createMenuItemCmd.title']}
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.menuCategoryId.label']}</span>
                  <input
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.createMenuItemCmdMenuCategoryId}
                    @input=${(e: Event) => this.handleCreateMenuItemCmdMenuCategoryIdChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.name.label']}</span>
                  <input
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.createMenuItemCmdName}
                    @input=${(e: Event) => this.handleCreateMenuItemCmdNameChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.description.label']}</span>
                  <textarea
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2 min-h-[4rem]"
                    .value=${this.createMenuItemCmdDescription}
                    @input=${(e: Event) => this.handleCreateMenuItemCmdDescriptionChange(e)}
                  ></textarea>
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.price.label']}</span>
                  <input
                    type="number"
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.createMenuItemCmdPrice}
                    @input=${(e: Event) => this.handleCreateMenuItemCmdPriceChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.status.label']}</span>
                  <input
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.createMenuItemCmdStatus}
                    @input=${(e: Event) => this.handleCreateMenuItemCmdStatusChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.imageUrl.label']}</span>
                  <input
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.createMenuItemCmdImageUrl}
                    @input=${(e: Event) => this.handleCreateMenuItemCmdImageUrlChange(e)}
                  />
                </label>
                <label class="flex flex-col gap-1 text-sm">
                  <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.displayOrder.label']}</span>
                  <input
                    type="number"
                    class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                    .value=${this.createMenuItemCmdDisplayOrder}
                    @input=${(e: Event) => this.handleCreateMenuItemCmdDisplayOrderChange(e)}
                  />
                </label>
                <label class="flex items-center gap-2 text-sm sm:col-span-2">
                  <input
                    type="checkbox"
                    .checked=${this.createMenuItemCmdRequiresStockLink === 'true'}
                    @change=${(e: Event) => this.handleCreateMenuItemCmdRequiresStockLinkChange(e)}
                  />
                  <span>${this.msg['intent.menuManagement.createMenuItemCmd.form.field.requiresStockLink.label']}</span>
                </label>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  class="rounded px-4 py-2 font-medium bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                  ?disabled=${createLoading}
                  @click=${() => this.handleCreateMenuItemCmdClick()}
                >
                  ${createLoading
                    ? '…'
                    : this.msg['intent.menuManagement.createMenuItemCmd.form.action.createMenuItemCmd']}
                </button>
              </div>
              ${this.createMenuItemCmdState === 'success'
                ? html`
                    <div
                      class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm"
                      role="status"
                    >
                      <!-- TODO: action.createMenuItemCmd.success not in MessageType -->
                      Item criado com sucesso.
                    </div>
                  `
                : this.createMenuItemCmdState === 'error'
                  ? html`
                      <div
                        class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm"
                        role="alert"
                      >
                        ${this.createMenuItemCmdError
                          ? this.createMenuItemCmdError
                          : html`<!-- TODO: action.createMenuItemCmd.error not in MessageType -->Erro ao criar item.`}
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
