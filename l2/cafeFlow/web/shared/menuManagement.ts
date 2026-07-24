/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  ListMenuItemsOutput,
  CreateMenuItemCmdOutput,
  UpdateMenuItemCmdOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';
import {
  listMenuItemsRoute,
  createMenuItemCmdRoute,
  updateMenuItemCmdRoute,
} from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';
export type {
  ListMenuItemsInput,
  ListMenuItemsOutput,
  CreateMenuItemCmdInput,
  CreateMenuItemCmdOutput,
  UpdateMenuItemCmdInput,
  UpdateMenuItemCmdOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/menuManagement.js';

/// **collab_i18n_start**
const message_pt = {
  'section.menuManagement.menuItemList.title': 'Menu Item List',
  'organism.menuManagement.listMenuItems.title': 'Listar itens do cardápio',
  'intent.menuManagement.listMenuItems.list.title': 'Listar itens do cardápio',
  'intent.menuManagement.listMenuItems.list.empty': 'Nenhum registro encontrado',
  'intent.menuManagement.listMenuItems.list.column.menuItems.label': 'Menu Items',
  'intent.menuManagement.listMenuItems.list.column.total.label': 'Total',
  'intent.menuManagement.listMenuItems.list.filter.status.label': 'Status',
  'intent.menuManagement.listMenuItems.list.filter.menuCategoryId.label': 'Menu Category Id',
  'intent.menuManagement.listMenuItems.list.filter.name.label': 'Name',
  'intent.menuManagement.listMenuItems.list.filter.page.label': 'Page',
  'intent.menuManagement.listMenuItems.list.filter.pageSize.label': 'Page Size',
  'organism.menuManagement.createMenuItemCmd.title': 'Criar item do cardápio',
  'intent.menuManagement.createMenuItemCmd.form.title': 'Criar item do cardápio',
  'intent.menuManagement.createMenuItemCmd.form.action.createMenuItemCmd': 'Criar item do cardápio',
  'intent.menuManagement.createMenuItemCmd.form.field.menuCategoryId.label': 'Menu Category Id',
  'intent.menuManagement.createMenuItemCmd.form.field.name.label': 'Name',
  'intent.menuManagement.createMenuItemCmd.form.field.description.label': 'Description',
  'intent.menuManagement.createMenuItemCmd.form.field.price.label': 'Price',
  'intent.menuManagement.createMenuItemCmd.form.field.status.label': 'Status',
  'intent.menuManagement.createMenuItemCmd.form.field.imageUrl.label': 'Image Url',
  'intent.menuManagement.createMenuItemCmd.form.field.displayOrder.label': 'Display Order',
  'intent.menuManagement.createMenuItemCmd.form.field.requiresStockLink.label': 'Requires Stock Link',
  'organism.menuManagement.updateMenuItemCmd.title': 'Atualizar item do cardápio',
  'intent.menuManagement.updateMenuItemCmd.form.title': 'Atualizar item do cardápio',
  'intent.menuManagement.updateMenuItemCmd.form.action.updateMenuItemCmd': 'Atualizar item do cardápio',
  'intent.menuManagement.updateMenuItemCmd.form.field.menuCategoryId.label': 'Menu Category Id',
  'intent.menuManagement.updateMenuItemCmd.form.field.name.label': 'Name',
  'intent.menuManagement.updateMenuItemCmd.form.field.description.label': 'Description',
  'intent.menuManagement.updateMenuItemCmd.form.field.price.label': 'Price',
  'intent.menuManagement.updateMenuItemCmd.form.field.status.label': 'Status',
  'intent.menuManagement.updateMenuItemCmd.form.field.pauseReason.label': 'Pause Reason',
  'intent.menuManagement.updateMenuItemCmd.form.field.imageUrl.label': 'Image Url',
  'intent.menuManagement.updateMenuItemCmd.form.field.displayOrder.label': 'Display Order',
  'intent.menuManagement.updateMenuItemCmd.form.field.requiresStockLink.label': 'Requires Stock Link',
  'section.menuManagement.sec-menu-item-workbench.title': 'Menu Item Workbench',
  'organism.menuManagement.summary-first10.title': 'Summary first',
  'intent.menuManagement.summary-first10.content.title': 'Summary first',
  'section.menuManagement.sec-create-menu-item.title': 'Criar Item do Cardápio',
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

const LIST_MENU_ITEMS_DATA_DEFAULT: ListMenuItemsOutput = { menuItems: [], total: 0 };

export class CafeFlowMenuManagementBase extends CollabLitElement {
  /** state ui.menuManagement.status — pageStatus */
  @property() status: string = '';
  /** state ui.menuManagement.action.listMenuItems.status — actionStatus, values: idle|loading|success|error */
  @property() listMenuItemsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state ui.menuManagement.input.listMenuItems.status — input */
  @property() listMenuItemsStatus: string = '';
  /** state ui.menuManagement.input.listMenuItems.menuCategoryId — input */
  @property() listMenuItemsMenuCategoryId: string = '';
  /** state ui.menuManagement.input.listMenuItems.name — input */
  @property() listMenuItemsName: string = '';
  /** state ui.menuManagement.input.listMenuItems.page — input */
  @property() listMenuItemsPage: string = '';
  /** state ui.menuManagement.input.listMenuItems.pageSize — input */
  @property() listMenuItemsPageSize: string = '';
  /** state ui.menuManagement.data.listMenuItems — queryResult, outputShape: paginated */
  @property() listMenuItemsData: ListMenuItemsOutput = { menuItems: [], total: 0 };
  /** state ui.menuManagement.action.createMenuItemCmd.status — actionStatus, values: idle|loading|success|error */
  @property() createMenuItemCmdState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state ui.menuManagement.input.createMenuItemCmd.menuCategoryId — input */
  @property() createMenuItemCmdMenuCategoryId: string = '';
  /** state ui.menuManagement.input.createMenuItemCmd.name — input */
  @property() createMenuItemCmdName: string = '';
  /** state ui.menuManagement.input.createMenuItemCmd.description — input */
  @property() createMenuItemCmdDescription: string = '';
  /** state ui.menuManagement.input.createMenuItemCmd.price — input */
  @property() createMenuItemCmdPrice: string = '';
  /** state ui.menuManagement.input.createMenuItemCmd.status — input */
  @property() createMenuItemCmdStatus: string = '';
  /** state ui.menuManagement.input.createMenuItemCmd.imageUrl — input */
  @property() createMenuItemCmdImageUrl: string = '';
  /** state ui.menuManagement.input.createMenuItemCmd.displayOrder — input */
  @property() createMenuItemCmdDisplayOrder: string = '';
  /** state ui.menuManagement.input.createMenuItemCmd.requiresStockLink — input */
  @property() createMenuItemCmdRequiresStockLink: string = '';
  /** state ui.menuManagement.output.createMenuItemCmd — commandOutput */
  @property() createMenuItemCmdOutput: CreateMenuItemCmdOutput | null = null;
  /** state ui.menuManagement.action.createMenuItemCmd.error — actionError */
  @property() createMenuItemCmdError: string = '';
  /** state ui.menuManagement.action.updateMenuItemCmd.status — actionStatus, values: idle|loading|success|error */
  @property() updateMenuItemCmdState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state ui.menuManagement.input.updateMenuItemCmd.menuItemId — input */
  @property() updateMenuItemCmdMenuItemId: string = '';
  /** state ui.menuManagement.input.updateMenuItemCmd.menuCategoryId — input */
  @property() updateMenuItemCmdMenuCategoryId: string = '';
  /** state ui.menuManagement.input.updateMenuItemCmd.name — input */
  @property() updateMenuItemCmdName: string = '';
  /** state ui.menuManagement.input.updateMenuItemCmd.description — input */
  @property() updateMenuItemCmdDescription: string = '';
  /** state ui.menuManagement.input.updateMenuItemCmd.price — input */
  @property() updateMenuItemCmdPrice: string = '';
  /** state ui.menuManagement.input.updateMenuItemCmd.status — input */
  @property() updateMenuItemCmdStatus: string = '';
  /** state ui.menuManagement.input.updateMenuItemCmd.pauseReason — input */
  @property() updateMenuItemCmdPauseReason: string = '';
  /** state ui.menuManagement.input.updateMenuItemCmd.imageUrl — input */
  @property() updateMenuItemCmdImageUrl: string = '';
  /** state ui.menuManagement.input.updateMenuItemCmd.displayOrder — input */
  @property() updateMenuItemCmdDisplayOrder: string = '';
  /** state ui.menuManagement.input.updateMenuItemCmd.requiresStockLink — input */
  @property() updateMenuItemCmdRequiresStockLink: string = '';
  /** state ui.menuManagement.output.updateMenuItemCmd — commandOutput */
  @property() updateMenuItemCmdOutput: UpdateMenuItemCmdOutput | null = null;
  /** state ui.menuManagement.action.updateMenuItemCmd.error — actionError */
  @property() updateMenuItemCmdError: string = '';

  private readonly subscribedKeys: string[] = [
    'ui.menuManagement.status',
    'ui.menuManagement.action.listMenuItems.status',
    'ui.menuManagement.input.listMenuItems.status',
    'ui.menuManagement.input.listMenuItems.menuCategoryId',
    'ui.menuManagement.input.listMenuItems.name',
    'ui.menuManagement.input.listMenuItems.page',
    'ui.menuManagement.input.listMenuItems.pageSize',
    'ui.menuManagement.data.listMenuItems',
    'ui.menuManagement.action.createMenuItemCmd.status',
    'ui.menuManagement.input.createMenuItemCmd.menuCategoryId',
    'ui.menuManagement.input.createMenuItemCmd.name',
    'ui.menuManagement.input.createMenuItemCmd.description',
    'ui.menuManagement.input.createMenuItemCmd.price',
    'ui.menuManagement.input.createMenuItemCmd.status',
    'ui.menuManagement.input.createMenuItemCmd.imageUrl',
    'ui.menuManagement.input.createMenuItemCmd.displayOrder',
    'ui.menuManagement.input.createMenuItemCmd.requiresStockLink',
    'ui.menuManagement.output.createMenuItemCmd',
    'ui.menuManagement.action.createMenuItemCmd.error',
    'ui.menuManagement.action.updateMenuItemCmd.status',
    'ui.menuManagement.input.updateMenuItemCmd.menuItemId',
    'ui.menuManagement.input.updateMenuItemCmd.menuCategoryId',
    'ui.menuManagement.input.updateMenuItemCmd.name',
    'ui.menuManagement.input.updateMenuItemCmd.description',
    'ui.menuManagement.input.updateMenuItemCmd.price',
    'ui.menuManagement.input.updateMenuItemCmd.status',
    'ui.menuManagement.input.updateMenuItemCmd.pauseReason',
    'ui.menuManagement.input.updateMenuItemCmd.imageUrl',
    'ui.menuManagement.input.updateMenuItemCmd.displayOrder',
    'ui.menuManagement.input.updateMenuItemCmd.requiresStockLink',
    'ui.menuManagement.output.updateMenuItemCmd',
    'ui.menuManagement.action.updateMenuItemCmd.error',
  ];

  /** i18n catalog — MessageType keys are the CLOSED msg vocabulary for page renders */
  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.status = (getState('ui.menuManagement.status') as string) ?? '';
    this.listMenuItemsState = (getState('ui.menuManagement.action.listMenuItems.status') as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
    this.listMenuItemsStatus = (getState('ui.menuManagement.input.listMenuItems.status') as string) ?? '';
    this.listMenuItemsMenuCategoryId = (getState('ui.menuManagement.input.listMenuItems.menuCategoryId') as string) ?? '';
    this.listMenuItemsName = (getState('ui.menuManagement.input.listMenuItems.name') as string) ?? '';
    this.listMenuItemsPage = (getState('ui.menuManagement.input.listMenuItems.page') as string) ?? '';
    this.listMenuItemsPageSize = (getState('ui.menuManagement.input.listMenuItems.pageSize') as string) ?? '';
    this.listMenuItemsData = (getState('ui.menuManagement.data.listMenuItems') as ListMenuItemsOutput) ?? { menuItems: [], total: 0 };
    this.createMenuItemCmdState = (getState('ui.menuManagement.action.createMenuItemCmd.status') as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
    this.createMenuItemCmdMenuCategoryId = (getState('ui.menuManagement.input.createMenuItemCmd.menuCategoryId') as string) ?? '';
    this.createMenuItemCmdName = (getState('ui.menuManagement.input.createMenuItemCmd.name') as string) ?? '';
    this.createMenuItemCmdDescription = (getState('ui.menuManagement.input.createMenuItemCmd.description') as string) ?? '';
    this.createMenuItemCmdPrice = (getState('ui.menuManagement.input.createMenuItemCmd.price') as string) ?? '';
    this.createMenuItemCmdStatus = (getState('ui.menuManagement.input.createMenuItemCmd.status') as string) ?? '';
    this.createMenuItemCmdImageUrl = (getState('ui.menuManagement.input.createMenuItemCmd.imageUrl') as string) ?? '';
    this.createMenuItemCmdDisplayOrder = (getState('ui.menuManagement.input.createMenuItemCmd.displayOrder') as string) ?? '';
    this.createMenuItemCmdRequiresStockLink = (getState('ui.menuManagement.input.createMenuItemCmd.requiresStockLink') as string) ?? '';
    this.createMenuItemCmdOutput = (getState('ui.menuManagement.output.createMenuItemCmd') as CreateMenuItemCmdOutput | null) ?? null;
    this.createMenuItemCmdError = (getState('ui.menuManagement.action.createMenuItemCmd.error') as string) ?? '';
    this.updateMenuItemCmdState = (getState('ui.menuManagement.action.updateMenuItemCmd.status') as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
    this.updateMenuItemCmdMenuItemId = (getState('ui.menuManagement.input.updateMenuItemCmd.menuItemId') as string) ?? '';
    this.updateMenuItemCmdMenuCategoryId = (getState('ui.menuManagement.input.updateMenuItemCmd.menuCategoryId') as string) ?? '';
    this.updateMenuItemCmdName = (getState('ui.menuManagement.input.updateMenuItemCmd.name') as string) ?? '';
    this.updateMenuItemCmdDescription = (getState('ui.menuManagement.input.updateMenuItemCmd.description') as string) ?? '';
    this.updateMenuItemCmdPrice = (getState('ui.menuManagement.input.updateMenuItemCmd.price') as string) ?? '';
    this.updateMenuItemCmdStatus = (getState('ui.menuManagement.input.updateMenuItemCmd.status') as string) ?? '';
    this.updateMenuItemCmdPauseReason = (getState('ui.menuManagement.input.updateMenuItemCmd.pauseReason') as string) ?? '';
    this.updateMenuItemCmdImageUrl = (getState('ui.menuManagement.input.updateMenuItemCmd.imageUrl') as string) ?? '';
    this.updateMenuItemCmdDisplayOrder = (getState('ui.menuManagement.input.updateMenuItemCmd.displayOrder') as string) ?? '';
    this.updateMenuItemCmdRequiresStockLink = (getState('ui.menuManagement.input.updateMenuItemCmd.requiresStockLink') as string) ?? '';
    this.updateMenuItemCmdOutput = (getState('ui.menuManagement.output.updateMenuItemCmd') as UpdateMenuItemCmdOutput | null) ?? null;
    this.updateMenuItemCmdError = (getState('ui.menuManagement.action.updateMenuItemCmd.error') as string) ?? '';
    subscribe(this.subscribedKeys, this);
    void this.loadListMenuItems();
  }

  disconnectedCallback(): void {
    unsubscribe(this.subscribedKeys, this);
    super.disconnectedCallback();
  }

  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.menuManagement.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.menuManagement.action.listMenuItems.status':
        this.listMenuItemsState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.menuManagement.input.listMenuItems.status':
        this.listMenuItemsStatus = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.listMenuItems.menuCategoryId':
        this.listMenuItemsMenuCategoryId = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.listMenuItems.name':
        this.listMenuItemsName = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.listMenuItems.page':
        this.listMenuItemsPage = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.listMenuItems.pageSize':
        this.listMenuItemsPageSize = (value as string) ?? '';
        break;
      case 'ui.menuManagement.data.listMenuItems':
        this.listMenuItemsData = (value as ListMenuItemsOutput) ?? { menuItems: [], total: 0 };
        break;
      case 'ui.menuManagement.action.createMenuItemCmd.status':
        this.createMenuItemCmdState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.menuManagement.input.createMenuItemCmd.menuCategoryId':
        this.createMenuItemCmdMenuCategoryId = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.createMenuItemCmd.name':
        this.createMenuItemCmdName = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.createMenuItemCmd.description':
        this.createMenuItemCmdDescription = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.createMenuItemCmd.price':
        this.createMenuItemCmdPrice = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.createMenuItemCmd.status':
        this.createMenuItemCmdStatus = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.createMenuItemCmd.imageUrl':
        this.createMenuItemCmdImageUrl = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.createMenuItemCmd.displayOrder':
        this.createMenuItemCmdDisplayOrder = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.createMenuItemCmd.requiresStockLink':
        this.createMenuItemCmdRequiresStockLink = (value as string) ?? '';
        break;
      case 'ui.menuManagement.output.createMenuItemCmd':
        this.createMenuItemCmdOutput = (value as CreateMenuItemCmdOutput | null) ?? null;
        break;
      case 'ui.menuManagement.action.createMenuItemCmd.error':
        this.createMenuItemCmdError = (value as string) ?? '';
        break;
      case 'ui.menuManagement.action.updateMenuItemCmd.status':
        this.updateMenuItemCmdState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.menuItemId':
        this.updateMenuItemCmdMenuItemId = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.menuCategoryId':
        this.updateMenuItemCmdMenuCategoryId = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.name':
        this.updateMenuItemCmdName = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.description':
        this.updateMenuItemCmdDescription = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.price':
        this.updateMenuItemCmdPrice = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.status':
        this.updateMenuItemCmdStatus = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.pauseReason':
        this.updateMenuItemCmdPauseReason = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.imageUrl':
        this.updateMenuItemCmdImageUrl = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.displayOrder':
        this.updateMenuItemCmdDisplayOrder = (value as string) ?? '';
        break;
      case 'ui.menuManagement.input.updateMenuItemCmd.requiresStockLink':
        this.updateMenuItemCmdRequiresStockLink = (value as string) ?? '';
        break;
      case 'ui.menuManagement.output.updateMenuItemCmd':
        this.updateMenuItemCmdOutput = (value as UpdateMenuItemCmdOutput | null) ?? null;
        break;
      case 'ui.menuManagement.action.updateMenuItemCmd.error':
        this.updateMenuItemCmdError = (value as string) ?? '';
        break;
      default:
        break;
    }
    this.requestUpdate();
  }

  private applyRouteParams(): void {
    const patternParts = '/cafeFlow/menuManagement/:menuItemId?'.split('/').filter(Boolean);
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const params: { [key: string]: string } = {};
    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(':')) {
        const optional = part.endsWith('?');
        const name = optional ? part.slice(1, -1) : part.slice(1);
        const raw = pathParts[i];
        if (raw !== undefined && raw !== '') {
          try {
            params[name] = decodeURIComponent(raw);
          } catch {
            params[name] = raw;
          }
        }
      }
    }
    if (params['menuItemId'] !== undefined && params['menuItemId'] !== '') {
      this.updateMenuItemCmdMenuItemId = params['menuItemId'];
      setState('ui.menuManagement.input.updateMenuItemCmd.menuItemId', params['menuItemId']);
    }
  }

  private parseOptionalNumber(value: string): number | undefined {
    if (value === '' || value === undefined || value === null) return undefined;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }

  private parseBoolean(value: string): boolean {
    if (value === true as unknown as string) return true;
    const normalized = String(value).trim().toLowerCase();
    return normalized === 'true' || normalized === '1' || normalized === 'on' || normalized === 'yes';
  }

  /** action listMenuItems (query) — route cafeFlow.menuManagement.listMenuItems; inputs: status, menuCategoryId, name, page, pageSize; writes ui.menuManagement.data.listMenuItems; status ui.menuManagement.action.listMenuItems.status */
  async loadListMenuItems(): Promise<void> {
    this.listMenuItemsState = 'loading';
    setState('ui.menuManagement.action.listMenuItems.status', 'loading');
    const params: {
      status?: string;
      menuCategoryId?: string;
      name?: string;
      page?: number;
      pageSize?: number;
    } = {};
    if (this.listMenuItemsStatus !== '') params.status = this.listMenuItemsStatus;
    if (this.listMenuItemsMenuCategoryId !== '') params.menuCategoryId = this.listMenuItemsMenuCategoryId;
    if (this.listMenuItemsName !== '') params.name = this.listMenuItemsName;
    const page = this.parseOptionalNumber(this.listMenuItemsPage);
    if (page !== undefined) params.page = page;
    const pageSize = this.parseOptionalNumber(this.listMenuItemsPageSize);
    if (pageSize !== undefined) params.pageSize = pageSize;
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<ListMenuItemsOutput>(listMenuItemsRoute, params, options);
    if (response.ok) {
      const data = response.data ?? LIST_MENU_ITEMS_DATA_DEFAULT;
      this.listMenuItemsData = data;
      setState('ui.menuManagement.data.listMenuItems', data);
      this.listMenuItemsState = 'success';
      setState('ui.menuManagement.action.listMenuItems.status', 'success');
    } else {
      console.error('listMenuItems failed', response.error);
      this.listMenuItemsState = 'error';
      setState('ui.menuManagement.action.listMenuItems.status', 'error');
    }
  }

  /** handler for action listMenuItems — bind UI events here */
  handleListMenuItemsClick(_event?: Event): void {
    void this.loadListMenuItems();
  }

  /** action createMenuItemCmd (command) — route cafeFlow.menuManagement.createMenuItemCmd; inputs: menuCategoryId, name, description, price, status, imageUrl, displayOrder, requiresStockLink; writes ui.menuManagement.output.createMenuItemCmd; status ui.menuManagement.action.createMenuItemCmd.status; feedback keys action.createMenuItemCmd.success / action.createMenuItemCmd.error */
  async createMenuItemCmd(): Promise<void> {
    this.createMenuItemCmdState = 'loading';
    setState('ui.menuManagement.action.createMenuItemCmd.status', 'loading');
    this.createMenuItemCmdError = '';
    setState('ui.menuManagement.action.createMenuItemCmd.error', '');
    const params: {
      menuCategoryId: string;
      name: string;
      description?: string;
      price: number;
      status?: string;
      imageUrl?: string;
      displayOrder?: number;
      requiresStockLink: boolean;
    } = {
      menuCategoryId: this.createMenuItemCmdMenuCategoryId,
      name: this.createMenuItemCmdName,
      price: this.parseOptionalNumber(this.createMenuItemCmdPrice) ?? 0,
      requiresStockLink: this.parseBoolean(this.createMenuItemCmdRequiresStockLink),
    };
    if (this.createMenuItemCmdDescription !== '') params.description = this.createMenuItemCmdDescription;
    if (this.createMenuItemCmdStatus !== '') params.status = this.createMenuItemCmdStatus;
    if (this.createMenuItemCmdImageUrl !== '') params.imageUrl = this.createMenuItemCmdImageUrl;
    const displayOrder = this.parseOptionalNumber(this.createMenuItemCmdDisplayOrder);
    if (displayOrder !== undefined) params.displayOrder = displayOrder;
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CreateMenuItemCmdOutput>(createMenuItemCmdRoute, params, options);
    if (!response.ok) {
      const errMsg = response.error?.message ?? '';
      this.createMenuItemCmdError = errMsg;
      setState('ui.menuManagement.action.createMenuItemCmd.error', errMsg);
      this.createMenuItemCmdState = 'error';
      setState('ui.menuManagement.action.createMenuItemCmd.status', 'error');
      console.error('createMenuItemCmd failed', response.error);
      return;
    }
    const data = response.data ?? null;
    this.createMenuItemCmdOutput = data;
    setState('ui.menuManagement.output.createMenuItemCmd', data);
    try {
      await this.loadListMenuItems();
      if (this.listMenuItemsState === 'error') {
        this.createMenuItemCmdState = 'error';
        setState('ui.menuManagement.action.createMenuItemCmd.status', 'error');
        return;
      }
    } catch (err) {
      console.error('createMenuItemCmd refresh failed', err);
      this.createMenuItemCmdState = 'error';
      setState('ui.menuManagement.action.createMenuItemCmd.status', 'error');
      return;
    }
    this.createMenuItemCmdMenuCategoryId = '';
    setState('ui.menuManagement.input.createMenuItemCmd.menuCategoryId', '');
    this.createMenuItemCmdName = '';
    setState('ui.menuManagement.input.createMenuItemCmd.name', '');
    this.createMenuItemCmdDescription = '';
    setState('ui.menuManagement.input.createMenuItemCmd.description', '');
    this.createMenuItemCmdPrice = '';
    setState('ui.menuManagement.input.createMenuItemCmd.price', '');
    this.createMenuItemCmdStatus = '';
    setState('ui.menuManagement.input.createMenuItemCmd.status', '');
    this.createMenuItemCmdImageUrl = '';
    setState('ui.menuManagement.input.createMenuItemCmd.imageUrl', '');
    this.createMenuItemCmdDisplayOrder = '';
    setState('ui.menuManagement.input.createMenuItemCmd.displayOrder', '');
    this.createMenuItemCmdRequiresStockLink = '';
    setState('ui.menuManagement.input.createMenuItemCmd.requiresStockLink', '');
    this.createMenuItemCmdState = 'success';
    setState('ui.menuManagement.action.createMenuItemCmd.status', 'success');
  }

  /** handler for action createMenuItemCmd — bind UI events here */
  handleCreateMenuItemCmdClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.createMenuItemCmd();
    });
  }

  /** action updateMenuItemCmd (command) — route cafeFlow.menuManagement.updateMenuItemCmd; inputs: menuItemId, menuCategoryId, name, description, price, status, pauseReason, imageUrl, displayOrder, requiresStockLink; writes ui.menuManagement.output.updateMenuItemCmd; status ui.menuManagement.action.updateMenuItemCmd.status; feedback keys action.updateMenuItemCmd.success / action.updateMenuItemCmd.error */
  async updateMenuItemCmd(): Promise<void> {
    this.applyRouteParams();
    if (!this.updateMenuItemCmdMenuItemId) {
      this.updateMenuItemCmdState = 'idle';
      setState('ui.menuManagement.action.updateMenuItemCmd.status', 'idle');
      return;
    }
    this.updateMenuItemCmdState = 'loading';
    setState('ui.menuManagement.action.updateMenuItemCmd.status', 'loading');
    this.updateMenuItemCmdError = '';
    setState('ui.menuManagement.action.updateMenuItemCmd.error', '');
    const params: {
      menuItemId: string;
      menuCategoryId: string;
      name: string;
      description?: string;
      price: number;
      status: string;
      pauseReason?: string;
      imageUrl?: string;
      displayOrder?: number;
      requiresStockLink: boolean;
    } = {
      menuItemId: this.updateMenuItemCmdMenuItemId,
      menuCategoryId: this.updateMenuItemCmdMenuCategoryId,
      name: this.updateMenuItemCmdName,
      price: this.parseOptionalNumber(this.updateMenuItemCmdPrice) ?? 0,
      status: this.updateMenuItemCmdStatus,
      requiresStockLink: this.parseBoolean(this.updateMenuItemCmdRequiresStockLink),
    };
    if (this.updateMenuItemCmdDescription !== '') params.description = this.updateMenuItemCmdDescription;
    if (this.updateMenuItemCmdPauseReason !== '') params.pauseReason = this.updateMenuItemCmdPauseReason;
    if (this.updateMenuItemCmdImageUrl !== '') params.imageUrl = this.updateMenuItemCmdImageUrl;
    const displayOrder = this.parseOptionalNumber(this.updateMenuItemCmdDisplayOrder);
    if (displayOrder !== undefined) params.displayOrder = displayOrder;
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<UpdateMenuItemCmdOutput>(updateMenuItemCmdRoute, params, options);
    if (!response.ok) {
      const errMsg = response.error?.message ?? '';
      this.updateMenuItemCmdError = errMsg;
      setState('ui.menuManagement.action.updateMenuItemCmd.error', errMsg);
      this.updateMenuItemCmdState = 'error';
      setState('ui.menuManagement.action.updateMenuItemCmd.status', 'error');
      console.error('updateMenuItemCmd failed', response.error);
      return;
    }
    const data = response.data ?? null;
    this.updateMenuItemCmdOutput = data;
    setState('ui.menuManagement.output.updateMenuItemCmd', data);
    try {
      await this.loadListMenuItems();
      if (this.listMenuItemsState === 'error') {
        this.updateMenuItemCmdState = 'error';
        setState('ui.menuManagement.action.updateMenuItemCmd.status', 'error');
        return;
      }
    } catch (err) {
      console.error('updateMenuItemCmd refresh failed', err);
      this.updateMenuItemCmdState = 'error';
      setState('ui.menuManagement.action.updateMenuItemCmd.status', 'error');
      return;
    }
    this.updateMenuItemCmdMenuCategoryId = '';
    setState('ui.menuManagement.input.updateMenuItemCmd.menuCategoryId', '');
    this.updateMenuItemCmdName = '';
    setState('ui.menuManagement.input.updateMenuItemCmd.name', '');
    this.updateMenuItemCmdDescription = '';
    setState('ui.menuManagement.input.updateMenuItemCmd.description', '');
    this.updateMenuItemCmdPrice = '';
    setState('ui.menuManagement.input.updateMenuItemCmd.price', '');
    this.updateMenuItemCmdStatus = '';
    setState('ui.menuManagement.input.updateMenuItemCmd.status', '');
    this.updateMenuItemCmdPauseReason = '';
    setState('ui.menuManagement.input.updateMenuItemCmd.pauseReason', '');
    this.updateMenuItemCmdImageUrl = '';
    setState('ui.menuManagement.input.updateMenuItemCmd.imageUrl', '');
    this.updateMenuItemCmdDisplayOrder = '';
    setState('ui.menuManagement.input.updateMenuItemCmd.displayOrder', '');
    this.updateMenuItemCmdRequiresStockLink = '';
    setState('ui.menuManagement.input.updateMenuItemCmd.requiresStockLink', '');
    this.updateMenuItemCmdState = 'success';
    setState('ui.menuManagement.action.updateMenuItemCmd.status', 'success');
  }

  /** handler for action updateMenuItemCmd — bind UI events here */
  handleUpdateMenuItemCmdClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.updateMenuItemCmd();
    });
  }

  /** setter for state ui.menuManagement.input.listMenuItems.status */
  setListMenuItemsStatus(value: string): void {
    this.listMenuItemsStatus = value;
    setState('ui.menuManagement.input.listMenuItems.status', value);
    this.requestUpdate();
  }

  /** handler for action set.listMenuItemsStatus — bind UI events here */
  handleListMenuItemsStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setListMenuItemsStatus(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.listMenuItems.menuCategoryId */
  setListMenuItemsMenuCategoryId(value: string): void {
    this.listMenuItemsMenuCategoryId = value;
    setState('ui.menuManagement.input.listMenuItems.menuCategoryId', value);
    this.requestUpdate();
  }

  /** handler for action set.listMenuItemsMenuCategoryId — bind UI events here */
  handleListMenuItemsMenuCategoryIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setListMenuItemsMenuCategoryId(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.listMenuItems.name */
  setListMenuItemsName(value: string): void {
    this.listMenuItemsName = value;
    setState('ui.menuManagement.input.listMenuItems.name', value);
    this.requestUpdate();
  }

  /** handler for action set.listMenuItemsName — bind UI events here */
  handleListMenuItemsNameChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setListMenuItemsName(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.listMenuItems.page */
  setListMenuItemsPage(value: string): void {
    this.listMenuItemsPage = value;
    setState('ui.menuManagement.input.listMenuItems.page', value);
    this.requestUpdate();
  }

  /** handler for action set.listMenuItemsPage — bind UI events here */
  handleListMenuItemsPageChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setListMenuItemsPage(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.listMenuItems.pageSize */
  setListMenuItemsPageSize(value: string): void {
    this.listMenuItemsPageSize = value;
    setState('ui.menuManagement.input.listMenuItems.pageSize', value);
    this.requestUpdate();
  }

  /** handler for action set.listMenuItemsPageSize — bind UI events here */
  handleListMenuItemsPageSizeChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setListMenuItemsPageSize(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.createMenuItemCmd.menuCategoryId */
  setCreateMenuItemCmdMenuCategoryId(value: string): void {
    this.createMenuItemCmdMenuCategoryId = value;
    setState('ui.menuManagement.input.createMenuItemCmd.menuCategoryId', value);
    this.requestUpdate();
  }

  /** handler for action set.createMenuItemCmdMenuCategoryId — bind UI events here */
  handleCreateMenuItemCmdMenuCategoryIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCreateMenuItemCmdMenuCategoryId(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.createMenuItemCmd.name */
  setCreateMenuItemCmdName(value: string): void {
    this.createMenuItemCmdName = value;
    setState('ui.menuManagement.input.createMenuItemCmd.name', value);
    this.requestUpdate();
  }

  /** handler for action set.createMenuItemCmdName — bind UI events here */
  handleCreateMenuItemCmdNameChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCreateMenuItemCmdName(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.createMenuItemCmd.description */
  setCreateMenuItemCmdDescription(value: string): void {
    this.createMenuItemCmdDescription = value;
    setState('ui.menuManagement.input.createMenuItemCmd.description', value);
    this.requestUpdate();
  }

  /** handler for action set.createMenuItemCmdDescription — bind UI events here */
  handleCreateMenuItemCmdDescriptionChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCreateMenuItemCmdDescription(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.createMenuItemCmd.price */
  setCreateMenuItemCmdPrice(value: string): void {
    this.createMenuItemCmdPrice = value;
    setState('ui.menuManagement.input.createMenuItemCmd.price', value);
    this.requestUpdate();
  }

  /** handler for action set.createMenuItemCmdPrice — bind UI events here */
  handleCreateMenuItemCmdPriceChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCreateMenuItemCmdPrice(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.createMenuItemCmd.status */
  setCreateMenuItemCmdStatus(value: string): void {
    this.createMenuItemCmdStatus = value;
    setState('ui.menuManagement.input.createMenuItemCmd.status', value);
    this.requestUpdate();
  }

  /** handler for action set.createMenuItemCmdStatus — bind UI events here */
  handleCreateMenuItemCmdStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCreateMenuItemCmdStatus(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.createMenuItemCmd.imageUrl */
  setCreateMenuItemCmdImageUrl(value: string): void {
    this.createMenuItemCmdImageUrl = value;
    setState('ui.menuManagement.input.createMenuItemCmd.imageUrl', value);
    this.requestUpdate();
  }

  /** handler for action set.createMenuItemCmdImageUrl — bind UI events here */
  handleCreateMenuItemCmdImageUrlChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCreateMenuItemCmdImageUrl(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.createMenuItemCmd.displayOrder */
  setCreateMenuItemCmdDisplayOrder(value: string): void {
    this.createMenuItemCmdDisplayOrder = value;
    setState('ui.menuManagement.input.createMenuItemCmd.displayOrder', value);
    this.requestUpdate();
  }

  /** handler for action set.createMenuItemCmdDisplayOrder — bind UI events here */
  handleCreateMenuItemCmdDisplayOrderChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCreateMenuItemCmdDisplayOrder(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.createMenuItemCmd.requiresStockLink */
  setCreateMenuItemCmdRequiresStockLink(value: string): void {
    this.createMenuItemCmdRequiresStockLink = value;
    setState('ui.menuManagement.input.createMenuItemCmd.requiresStockLink', value);
    this.requestUpdate();
  }

  /** handler for action set.createMenuItemCmdRequiresStockLink — bind UI events here */
  handleCreateMenuItemCmdRequiresStockLinkChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    if (target && target instanceof HTMLInputElement && target.type === 'checkbox') {
      this.setCreateMenuItemCmdRequiresStockLink(target.checked ? 'true' : 'false');
      return;
    }
    this.setCreateMenuItemCmdRequiresStockLink(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.menuItemId */
  setUpdateMenuItemCmdMenuItemId(value: string): void {
    this.updateMenuItemCmdMenuItemId = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.menuItemId', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdMenuItemId — bind UI events here */
  handleUpdateMenuItemCmdMenuItemIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setUpdateMenuItemCmdMenuItemId(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.menuCategoryId */
  setUpdateMenuItemCmdMenuCategoryId(value: string): void {
    this.updateMenuItemCmdMenuCategoryId = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.menuCategoryId', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdMenuCategoryId — bind UI events here */
  handleUpdateMenuItemCmdMenuCategoryIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setUpdateMenuItemCmdMenuCategoryId(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.name */
  setUpdateMenuItemCmdName(value: string): void {
    this.updateMenuItemCmdName = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.name', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdName — bind UI events here */
  handleUpdateMenuItemCmdNameChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setUpdateMenuItemCmdName(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.description */
  setUpdateMenuItemCmdDescription(value: string): void {
    this.updateMenuItemCmdDescription = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.description', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdDescription — bind UI events here */
  handleUpdateMenuItemCmdDescriptionChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setUpdateMenuItemCmdDescription(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.price */
  setUpdateMenuItemCmdPrice(value: string): void {
    this.updateMenuItemCmdPrice = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.price', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdPrice — bind UI events here */
  handleUpdateMenuItemCmdPriceChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setUpdateMenuItemCmdPrice(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.status */
  setUpdateMenuItemCmdStatus(value: string): void {
    this.updateMenuItemCmdStatus = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.status', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdStatus — bind UI events here */
  handleUpdateMenuItemCmdStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setUpdateMenuItemCmdStatus(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.pauseReason */
  setUpdateMenuItemCmdPauseReason(value: string): void {
    this.updateMenuItemCmdPauseReason = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.pauseReason', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdPauseReason — bind UI events here */
  handleUpdateMenuItemCmdPauseReasonChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setUpdateMenuItemCmdPauseReason(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.imageUrl */
  setUpdateMenuItemCmdImageUrl(value: string): void {
    this.updateMenuItemCmdImageUrl = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.imageUrl', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdImageUrl — bind UI events here */
  handleUpdateMenuItemCmdImageUrlChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setUpdateMenuItemCmdImageUrl(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.displayOrder */
  setUpdateMenuItemCmdDisplayOrder(value: string): void {
    this.updateMenuItemCmdDisplayOrder = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.displayOrder', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdDisplayOrder — bind UI events here */
  handleUpdateMenuItemCmdDisplayOrderChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setUpdateMenuItemCmdDisplayOrder(target?.value ?? '');
  }

  /** setter for state ui.menuManagement.input.updateMenuItemCmd.requiresStockLink */
  setUpdateMenuItemCmdRequiresStockLink(value: string): void {
    this.updateMenuItemCmdRequiresStockLink = value;
    setState('ui.menuManagement.input.updateMenuItemCmd.requiresStockLink', value);
    this.requestUpdate();
  }

  /** handler for action set.updateMenuItemCmdRequiresStockLink — bind UI events here */
  handleUpdateMenuItemCmdRequiresStockLinkChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    if (target && target instanceof HTMLInputElement && target.type === 'checkbox') {
      this.setUpdateMenuItemCmdRequiresStockLink(target.checked ? 'true' : 'false');
      return;
    }
    this.setUpdateMenuItemCmdRequiresStockLink(target?.value ?? '');
  }
}
