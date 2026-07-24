/// <mls fileReference="_102051_/l2/cafeFlow/web/desktop/page11/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { CafeFlowMenuManagementBase } from '/_102051_/l2/cafeFlow/web/shared/menuManagement.js';

@customElement('cafe-flow--web--desktop--page11--menu-management-102051')
export class CafeFlowDesktopPage11MenuManagementPage extends CafeFlowMenuManagementBase {
  render() {
    const menuItems = this.listMenuItemsData?.menuItems ?? [];
    const total = this.listMenuItemsData?.total;
    const listLoading = this.listMenuItemsState === 'loading';
    const createLoading = this.createMenuItemCmdState === 'loading';
    const updateLoading = this.updateMenuItemCmdState === 'loading';

    return html`
      <div class="min-h-full bg-[var(--page-bg,#f8fafc)] text-[var(--text-default,#0f172a)]">
        <div class="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <header class="space-y-1">
            <h1 class="text-2xl font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['section.menuManagement.menuItemList.title']}
            </h1>
          </header>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4">
            <div class="flex flex-wrap items-end gap-3">
              <label class="flex flex-col gap-1 text-sm min-w-[8rem]">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.status.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.listMenuItemsStatus}
                  @input=${this.handleListMenuItemsStatusChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm min-w-[8rem]">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.menuCategoryId.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.listMenuItemsMenuCategoryId}
                  @input=${this.handleListMenuItemsMenuCategoryIdChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm min-w-[10rem] flex-1">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.name.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.listMenuItemsName}
                  @input=${this.handleListMenuItemsNameChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm w-24">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.page.label']}</span>
                <input
                  type="number"
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.listMenuItemsPage}
                  @input=${this.handleListMenuItemsPageChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm w-28">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.listMenuItems.list.filter.pageSize.label']}</span>
                <input
                  type="number"
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.listMenuItemsPageSize}
                  @input=${this.handleListMenuItemsPageSizeChange}
                />
              </label>
              <button
                type="button"
                class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${listLoading}
                @click=${this.handleListMenuItemsClick}
              >
                ${listLoading ? '…' : this.msg['organism.menuManagement.listMenuItems.title']}
              </button>
            </div>

            ${listLoading
              ? html`<div class="animate-pulse space-y-2 py-4">
                  <div class="h-4 rounded bg-[var(--surface-alt-bg,#e2e8f0)]"></div>
                  <div class="h-4 rounded bg-[var(--surface-alt-bg,#e2e8f0)] w-5/6"></div>
                  <div class="h-4 rounded bg-[var(--surface-alt-bg,#e2e8f0)] w-2/3"></div>
                </div>`
              : menuItems.length === 0
                ? html`<p class="text-sm text-[var(--text-muted,#64748b)] py-4">${this.msg['intent.menuManagement.listMenuItems.list.empty']}</p>`
                : html`
                    <div class="overflow-x-auto">
                      <table class="w-full text-sm border-collapse">
                        <thead>
                          <tr class="border-b border-[var(--border-default,#e2e8f0)] text-left text-[var(--text-muted,#64748b)]">
                            <th class="py-2 pr-3 font-medium">name</th>
                            <th class="py-2 pr-3 font-medium">menuCategoryId</th>
                            <th class="py-2 pr-3 font-medium">price</th>
                            <th class="py-2 pr-3 font-medium">status</th>
                            <th class="py-2 pr-3 font-medium">displayOrder</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${menuItems.map(
                            (item: {
                              menuItemId?: string;
                              name?: string;
                              menuCategoryId?: string;
                              price?: number | string;
                              status?: string;
                              displayOrder?: number | string;
                              description?: string;
                              imageUrl?: string;
                              pauseReason?: string;
                              requiresStockLink?: boolean | string;
                            }) => html`
                              <tr
                                class="border-b border-[var(--border-subtle,#f1f5f9)] hover:bg-[var(--surface-alt-bg,#f8fafc)] cursor-pointer"
                                @click=${() => {
                                  if (item.menuItemId != null) this.setUpdateMenuItemCmdMenuItemId(String(item.menuItemId));
                                  if (item.menuCategoryId != null) this.setUpdateMenuItemCmdMenuCategoryId(String(item.menuCategoryId));
                                  if (item.name != null) this.setUpdateMenuItemCmdName(String(item.name));
                                  if (item.description != null) this.setUpdateMenuItemCmdDescription(String(item.description));
                                  if (item.price != null) this.setUpdateMenuItemCmdPrice(String(item.price));
                                  if (item.status != null) this.setUpdateMenuItemCmdStatus(String(item.status));
                                  if (item.pauseReason != null) this.setUpdateMenuItemCmdPauseReason(String(item.pauseReason));
                                  if (item.imageUrl != null) this.setUpdateMenuItemCmdImageUrl(String(item.imageUrl));
                                  if (item.displayOrder != null) this.setUpdateMenuItemCmdDisplayOrder(String(item.displayOrder));
                                  if (item.requiresStockLink != null) this.setUpdateMenuItemCmdRequiresStockLink(String(item.requiresStockLink));
                                }}
                              >
                                <td class="py-2 pr-3">${item.name ?? ''}</td>
                                <td class="py-2 pr-3">${item.menuCategoryId ?? ''}</td>
                                <td class="py-2 pr-3">${item.price ?? ''}</td>
                                <td class="py-2 pr-3">
                                  <span class="inline-flex rounded px-2 py-0.5 text-xs bg-[var(--status-neutral-bg,#f1f5f9)] text-[var(--status-neutral-text,#334155)]">
                                    ${item.status ?? ''}
                                  </span>
                                </td>
                                <td class="py-2 pr-3">${item.displayOrder ?? ''}</td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                    ${total != null
                      ? html`<p class="text-xs text-[var(--text-muted,#64748b)] pt-2">
                          ${this.msg['intent.menuManagement.listMenuItems.list.column.total.label']}: ${total}
                        </p>`
                      : null}
                  `}
          </section>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['organism.menuManagement.createMenuItemCmd.title']}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.menuCategoryId.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.createMenuItemCmdMenuCategoryId}
                  @input=${this.handleCreateMenuItemCmdMenuCategoryIdChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.name.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.createMenuItemCmdName}
                  @input=${this.handleCreateMenuItemCmdNameChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.description.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.createMenuItemCmdDescription}
                  @input=${this.handleCreateMenuItemCmdDescriptionChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.price.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.createMenuItemCmdPrice}
                  @input=${this.handleCreateMenuItemCmdPriceChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.status.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.createMenuItemCmdStatus}
                  @input=${this.handleCreateMenuItemCmdStatusChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.imageUrl.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.createMenuItemCmdImageUrl}
                  @input=${this.handleCreateMenuItemCmdImageUrlChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.displayOrder.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.createMenuItemCmdDisplayOrder}
                  @input=${this.handleCreateMenuItemCmdDisplayOrderChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.createMenuItemCmd.form.field.requiresStockLink.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.createMenuItemCmdRequiresStockLink}
                  @input=${this.handleCreateMenuItemCmdRequiresStockLinkChange}
                />
              </label>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${createLoading}
                @click=${this.handleCreateMenuItemCmdClick}
              >
                ${createLoading ? '…' : this.msg['intent.menuManagement.createMenuItemCmd.form.action.createMenuItemCmd']}
              </button>
            </div>
            ${this.createMenuItemCmdState === 'success'
              ? html`<div class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm flex justify-between items-center gap-2">
                  <span><!-- TODO: action.createMenuItemCmd.success -->Created successfully</span>
                  <button type="button" class="underline text-xs" @click=${() => { this.createMenuItemCmdState = 'idle'; }}>×</button>
                </div>`
              : null}
            ${this.createMenuItemCmdState === 'error'
              ? html`<div class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm flex justify-between items-center gap-2">
                  <span>${this.createMenuItemCmdError || '<!-- TODO: action.createMenuItemCmd.error -->Error'}</span>
                  <button type="button" class="underline text-xs" @click=${() => { this.createMenuItemCmdState = 'idle'; }}>×</button>
                </div>`
              : null}
          </section>

          <section class="rounded-lg border border-[var(--border-default,#e2e8f0)] bg-[var(--surface-bg,#ffffff)] p-4 space-y-4">
            <h2 class="text-lg font-semibold text-[var(--text-strong,#0f172a)]">
              ${this.msg['organism.menuManagement.updateMenuItemCmd.title']}
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.updateMenuItemCmdMenuCategoryId}
                  @input=${this.handleUpdateMenuItemCmdMenuCategoryIdChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.name.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.updateMenuItemCmdName}
                  @input=${this.handleUpdateMenuItemCmdNameChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm sm:col-span-2">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.description.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.updateMenuItemCmdDescription}
                  @input=${this.handleUpdateMenuItemCmdDescriptionChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.price.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.updateMenuItemCmdPrice}
                  @input=${this.handleUpdateMenuItemCmdPriceChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.status.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.updateMenuItemCmdStatus}
                  @input=${this.handleUpdateMenuItemCmdStatusChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.pauseReason.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.updateMenuItemCmdPauseReason}
                  @input=${this.handleUpdateMenuItemCmdPauseReasonChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.imageUrl.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.updateMenuItemCmdImageUrl}
                  @input=${this.handleUpdateMenuItemCmdImageUrlChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.updateMenuItemCmdDisplayOrder}
                  @input=${this.handleUpdateMenuItemCmdDisplayOrderChange}
                />
              </label>
              <label class="flex flex-col gap-1 text-sm">
                <span class="text-[var(--text-muted,#64748b)]">${this.msg['intent.menuManagement.updateMenuItemCmd.form.field.requiresStockLink.label']}</span>
                <input
                  class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--input-bg,#ffffff)] px-3 py-2"
                  .value=${this.updateMenuItemCmdRequiresStockLink}
                  @input=${this.handleUpdateMenuItemCmdRequiresStockLinkChange}
                />
              </label>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="rounded px-4 py-2 bg-[var(--button-primary-bg,#2563eb)] text-[var(--button-primary-text,#ffffff)] disabled:opacity-60"
                ?disabled=${updateLoading || !this.updateMenuItemCmdMenuItemId}
                @click=${this.handleUpdateMenuItemCmdClick}
              >
                ${updateLoading ? '…' : this.msg['intent.menuManagement.updateMenuItemCmd.form.action.updateMenuItemCmd']}
              </button>
            </div>
            ${this.updateMenuItemCmdState === 'success'
              ? html`<div class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--status-success-bg,#dcfce7)] text-[var(--status-success-text,#166534)] px-3 py-2 text-sm flex justify-between items-center gap-2">
                  <span><!-- TODO: action.updateMenuItemCmd.success -->Updated successfully</span>
                  <button type="button" class="underline text-xs" @click=${() => { this.updateMenuItemCmdState = 'idle'; }}>×</button>
                </div>`
              : null}
            ${this.updateMenuItemCmdState === 'error'
              ? html`<div class="rounded border border-[var(--border-default,#e2e8f0)] bg-[var(--status-error-bg,#fee2e2)] text-[var(--status-error-text,#991b1b)] px-3 py-2 text-sm flex justify-between items-center gap-2">
                  <span>${this.updateMenuItemCmdError || '<!-- TODO: action.updateMenuItemCmd.error -->Error'}</span>
                  <button type="button" class="underline text-xs" @click=${() => { this.updateMenuItemCmdState = 'idle'; }}>×</button>
                </div>`
              : null}
          </section>
        </div>
      </div>
    `;
  }
}
