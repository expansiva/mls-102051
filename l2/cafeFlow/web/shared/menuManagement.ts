/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/menuManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  ListMenuItemsInput,
  ListMenuItemsOutput,
  CreateMenuItemCmdInput,
  CreateMenuItemCmdOutput,
  UpdateMenuItemCmdInput,
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
  'section.menuManagement.createMenuItemSection.title': 'Create Menu Item',
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
  'section.menuManagement.sec-menu-item-list.title': 'Lista de Itens do Cardápio',
  'section.menuManagement.sec-create-menu-item.title': 'Criar Novo Item',
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
    this.initStateValues();
    this.applyRouteParams();
    subscribe(this.subscribedKeys, this);
    void this.loadListMenuItems();
  }

  disconnectedCallback(): void {
    unsubscribe(this.subscribedKeys, this);
    super.disconnectedCallback();
  }

  /** handleIcaStateChange — collabState notify contract */
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

  private initStateValues(): void {
    const statusVal = getState('ui.menuManagement.status');
    this.status = statusVal !== undefined && statusVal !== null ? (statusVal as string) : '';
    const listMenuItemsStateVal = getState('ui.menuManagement.action.listMenuItems.status');
    this.listMenuItemsState =
      listMenuItemsStateVal !== undefined && listMenuItemsStateVal !== null
        ? (listMenuItemsStateVal as 'idle' | 'loading' | 'success' | 'error')
        : 'idle';
    const listMenuItemsStatusVal = getState('ui.menuManagement.input.listMenuItems.status');
    this.listMenuItemsStatus =
      listMenuItemsStatusVal !== undefined && listMenuItemsStatusVal !== null
        ? (listMenuItemsStatusVal as string)
        : '';
    const listMenuItemsMenuCategoryIdVal = getState('ui.menuManagement.input.listMenuItems.menuCategoryId');
    this.listMenuItemsMenuCategoryId =
      listMenuItemsMenuCategoryIdVal !== undefined && listMenuItemsMenuCategoryIdVal !== null
        ? (listMenuItemsMenuCategoryIdVal as string)
        : '';
    const listMenuItemsNameVal = getState('ui.menuManagement.input.listMenuItems.name');
    this.listMenuItemsName =
      listMenuItemsNameVal !== undefined && listMenuItemsNameVal !== null
        ? (listMenuItemsNameVal as string)
        : '';
    const listMenuItemsPageVal = getState('ui.menuManagement.input.listMenuItems.page');
    this.listMenuItemsPage =
      listMenuItemsPageVal !== undefined && listMenuItemsPageVal !== null
        ? (listMenuItemsPageVal as string)
        : '';
    const listMenuItemsPageSizeVal = getState('ui.menuManagement.input.listMenuItems.pageSize');
    this.listMenuItemsPageSize =
      listMenuItemsPageSizeVal !== undefined && listMenuItemsPageSizeVal !== null
        ? (listMenuItemsPageSizeVal as string)
        : '';
    const listMenuItemsDataVal = getState('ui.menuManagement.data.listMenuItems');
    this.listMenuItemsData =
      listMenuItemsDataVal !== undefined && listMenuItemsDataVal !== null
        ? (listMenuItemsDataVal as ListMenuItemsOutput)
        : { menuItems: [], total: 0 };
    const createMenuItemCmdStateVal = getState('ui.menuManagement.action.createMenuItemCmd.status');
    this.createMenuItemCmdState =
      createMenuItemCmdStateVal !== undefined && createMenuItemCmdStateVal !== null
        ? (createMenuItemCmdStateVal as 'idle' | 'loading' | 'success' | 'error')
        : 'idle';
    const createMenuItemCmdMenuCategoryIdVal = getState(
      'ui.menuManagement.input.createMenuItemCmd.menuCategoryId',
    );
    this.createMenuItemCmdMenuCategoryId =
      createMenuItemCmdMenuCategoryIdVal !== undefined && createMenuItemCmdMenuCategoryIdVal !== null
        ? (createMenuItemCmdMenuCategoryIdVal as string)
        : '';
    const createMenuItemCmdNameVal = getState('ui.menuManagement.input.createMenuItemCmd.name');
    this.createMenuItemCmdName =
      createMenuItemCmdNameVal !== undefined && createMenuItemCmdNameVal !== null
        ? (createMenuItemCmdNameVal as string)
        : '';
    const createMenuItemCmdDescriptionVal = getState(
      'ui.menuManagement.input.createMenuItemCmd.description',
    );
    this.createMenuItemCmdDescription =
      createMenuItemCmdDescriptionVal !== undefined && createMenuItemCmdDescriptionVal !== null
        ? (createMenuItemCmdDescriptionVal as string)
        : '';
    const createMenuItemCmdPriceVal = getState('ui.menuManagement.input.createMenuItemCmd.price');
    this.createMenuItemCmdPrice =
      createMenuItemCmdPriceVal !== undefined && createMenuItemCmdPriceVal !== null
        ? (createMenuItemCmdPriceVal as string)
        : '';
    const createMenuItemCmdStatusVal = getState('ui.menuManagement.input.createMenuItemCmd.status');
    this.createMenuItemCmdStatus =
      createMenuItemCmdStatusVal !== undefined && createMenuItemCmdStatusVal !== null
        ? (createMenuItemCmdStatusVal as string)
        : '';
    const createMenuItemCmdImageUrlVal = getState('ui.menuManagement.input.createMenuItemCmd.imageUrl');
    this.createMenuItemCmdImageUrl =
      createMenuItemCmdImageUrlVal !== undefined && createMenuItemCmdImageUrlVal !== null
        ? (createMenuItemCmdImageUrlVal as string)
        : '';
    const createMenuItemCmdDisplayOrderVal = getState(
      'ui.menuManagement.input.createMenuItemCmd.displayOrder',
    );
    this.createMenuItemCmdDisplayOrder =
      createMenuItemCmdDisplayOrderVal !== undefined && createMenuItemCmdDisplayOrderVal !== null
        ? (createMenuItemCmdDisplayOrderVal as string)
        : '';
    const createMenuItemCmdRequiresStockLinkVal = getState(
      'ui.menuManagement.input.createMenuItemCmd.requiresStockLink',
    );
    this.createMenuItemCmdRequiresStockLink =
      createMenuItemCmdRequiresStockLinkVal !== undefined &&
      createMenuItemCmdRequiresStockLinkVal !== null
        ? (createMenuItemCmdRequiresStockLinkVal as string)
        : '';
    const createMenuItemCmdOutputVal = getState('ui.menuManagement.output.createMenuItemCmd');
    this.createMenuItemCmdOutput =
      createMenuItemCmdOutputVal !== undefined
        ? (createMenuItemCmdOutputVal as CreateMenuItemCmdOutput | null)
        : null;
    const createMenuItemCmdErrorVal = getState('ui.menuManagement.action.createMenuItemCmd.error');
    this.createMenuItemCmdError =
      createMenuItemCmdErrorVal !== undefined && createMenuItemCmdErrorVal !== null
        ? (createMenuItemCmdErrorVal as string)
        : '';
    const updateMenuItemCmdStateVal = getState('ui.menuManagement.action.updateMenuItemCmd.status');
    this.updateMenuItemCmdState =
      updateMenuItemCmdStateVal !== undefined && updateMenuItemCmdStateVal !== null
        ? (updateMenuItemCmdStateVal as 'idle' | 'loading' | 'success' | 'error')
        : 'idle';
    const updateMenuItemCmdMenuItemIdVal = getState(
      'ui.menuManagement.input.updateMenuItemCmd.menuItemId',
    );
    this.updateMenuItemCmdMenuItemId =
      updateMenuItemCmdMenuItemIdVal !== undefined && updateMenuItemCmdMenuItemIdVal !== null
        ? (updateMenuItemCmdMenuItemIdVal as string)
        : '';
    const updateMenuItemCmdMenuCategoryIdVal = getState(
      'ui.menuManagement.input.updateMenuItemCmd.menuCategoryId',
    );
    this.updateMenuItemCmdMenuCategoryId =
      updateMenuItemCmdMenuCategoryIdVal !== undefined && updateMenuItemCmdMenuCategoryIdVal !== null
        ? (updateMenuItemCmdMenuCategoryIdVal as string)
        : '';
    const updateMenuItemCmdNameVal = getState('ui.menuManagement.input.updateMenuItemCmd.name');
    this.updateMenuItemCmdName =
      updateMenuItemCmdNameVal !== undefined && updateMenuItemCmdNameVal !== null
        ? (updateMenuItemCmdNameVal as string)
        : '';
    const updateMenuItemCmdDescriptionVal = getState(
      'ui.menuManagement.input.updateMenuItemCmd.description',
    );
    this.updateMenuItemCmdDescription =
      updateMenuItemCmdDescriptionVal !== undefined && updateMenuItemCmdDescriptionVal !== null
        ? (updateMenuItemCmdDescriptionVal as string)
        : '';
    const updateMenuItemCmdPriceVal = getState('ui.menuManagement.input.updateMenuItemCmd.price');
    this.updateMenuItemCmdPrice =
      updateMenuItemCmdPriceVal !== undefined && updateMenuItemCmdPriceVal !== null
        ? (updateMenuItemCmdPriceVal as string)
        : '';
    const updateMenuItemCmdStatusVal = getState('ui.menuManagement.input.updateMenuItemCmd.status');
    this.updateMenuItemCmdStatus =
      updateMenuItemCmdStatusVal !== undefined && updateMenuItemCmdStatusVal !== null
        ? (updateMenuItemCmdStatusVal as string)
        : '';
    const updateMenuItemCmdPauseReasonVal = getState(
      'ui.menuManagement.input.updateMenuItemCmd.pauseReason',
    );
    this.updateMenuItemCmdPauseReason =
      updateMenuItemCmdPauseReasonVal !== undefined && updateMenuItemCmdPauseReasonVal !== null
        ? (updateMenuItemCmdPauseReasonVal as string)
        : '';
    const updateMenuItemCmdImageUrlVal = getState('ui.menuManagement.input.updateMenuItemCmd.imageUrl');
    this.updateMenuItemCmdImageUrl =
      updateMenuItemCmdImageUrlVal !== undefined && updateMenuItemCmdImageUrlVal !== null
        ? (updateMenuItemCmdImageUrlVal as string)
        : '';
    const updateMenuItemCmdDisplayOrderVal = getState(
      'ui.menuManagement.input.updateMenuItemCmd.displayOrder',
    );
    this.updateMenuItemCmdDisplayOrder =
      updateMenuItemCmdDisplayOrderVal !== undefined && updateMenuItemCmdDisplayOrderVal !== null
        ? (updateMenuItemCmdDisplayOrderVal as string)
        : '';
    const updateMenuItemCmdRequiresStockLinkVal = getState(
      'ui.menuManagement.input.updateMenuItemCmd.requiresStockLink',
    );
    this.updateMenuItemCmdRequiresStockLink =
      updateMenuItemCmdRequiresStockLinkVal !== undefined &&
      updateMenuItemCmdRequiresStockLinkVal !== null
        ? (updateMenuItemCmdRequiresStockLinkVal as string)
        : '';
    const updateMenuItemCmdOutputVal = getState('ui.menuManagement.output.updateMenuItemCmd');
    this.updateMenuItemCmdOutput =
      updateMenuItemCmdOutputVal !== undefined
        ? (updateMenuItemCmdOutputVal as UpdateMenuItemCmdOutput | null)
        : null;
    const updateMenuItemCmdErrorVal = getState('ui.menuManagement.action.updateMenuItemCmd.error');
    this.updateMenuItemCmdError =
      updateMenuItemCmdErrorVal !== undefined && updateMenuItemCmdErrorVal !== null
        ? (updateMenuItemCmdErrorVal as string)
        : '';
  }

  private applyRouteParams(): void {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter((s: string) => s.length > 0);
    // routePattern: /cafeFlow/menuManagement/:menuItemId?
    if (segments.length >= 3 && segments[0] === 'cafeFlow' && segments[1] === 'menuManagement') {
      const raw = segments[2];
      if (raw) {
        let decoded = raw;
        try {
          decoded = decodeURIComponent(raw);
        } catch {
          decoded = raw;
        }
        if (decoded && !this.updateMenuItemCmdMenuItemId) {
          this.updateMenuItemCmdMenuItemId = decoded;
          setState('ui.menuManagement.input.updateMenuItemCmd.menuItemId', decoded);
        } else if (decoded) {
          this.updateMenuItemCmdMenuItemId = decoded;
          setState('ui.menuManagement.input.updateMenuItemCmd.menuItemId', decoded);
        }
      }
    }
  }

  private parseOptionalNumber(value: string): number | undefined {
    if (value === '' || value === undefined || value === null) return undefined;
    const n = Number(value);
    return Number.isFinite(n) ? n : undefined;
  }

  private parseRequiredNumber(value: string): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private parseBool(value: string): boolean {
    const v = String(value).trim().toLowerCase();
    return v === 'true' || v === '1' || v === 'yes' || v === 'on';
  }

  /** action listMenuItems (query) — route cafeFlow.menuManagement.listMenuItems; inputs: status, menuCategoryId, name, page, pageSize; writes ui.menuManagement.data.listMenuItems; status ui.menuManagement.action.listMenuItems.status */
  async loadListMenuItems(): Promise<void> {
    this.listMenuItemsState = 'loading';
    setState('ui.menuManagement.action.listMenuItems.status', 'loading');
    const params: ListMenuItemsInput = {};
    if (this.listMenuItemsStatus !== '') params.status = this.listMenuItemsStatus;
    if (this.listMenuItemsMenuCategoryId !== '') params.menuCategoryId = this.listMenuItemsMenuCategoryId;
    if (this.listMenuItemsName !== '') params.name = this.listMenuItemsName;
    const pageNum = this.parseOptionalNumber(this.listMenuItemsPage);
    if (pageNum !== undefined) params.page = pageNum;
    const pageSizeNum = this.parseOptionalNumber(this.listMenuItemsPageSize);
    if (pageSizeNum !== undefined) params.pageSize = pageSizeNum;
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<ListMenuItemsOutput>(listMenuItemsRoute, params, options);
    if (!response.ok) {
      this.listMenuItemsState = 'error';
      setState('ui.menuManagement.action.listMenuItems.status', 'error');
      return;
    }
    const data: ListMenuItemsOutput =
      response.data !== null && response.data !== undefined
        ? response.data
        : { menuItems: [], total: 0 };
    this.listMenuItemsData = data;
    setState('ui.menuManagement.data.listMenuItems', data);
    this.listMenuItemsState = 'success';
    setState('ui.menuManagement.action.listMenuItems.status', 'success');
  }

  /** handler for action listMenuItems — bind UI events here */
  async handleListMenuItemsClick(): Promise<void> {
    await this.loadListMenuItems();
  }

  /** action createMenuItemCmd (command) — route cafeFlow.menuManagement.createMenuItemCmd; inputs: menuCategoryId, name, description, price, status, imageUrl, displayOrder, requiresStockLink; writes ui.menuManagement.output.createMenuItemCmd; status ui.menuManagement.action.createMenuItemCmd.status; feedback keys action.createMenuItemCmd.success / action.createMenuItemCmd.error */
  async createMenuItemCmd(): Promise<void> {
    this.createMenuItemCmdState = 'loading';
    setState('ui.menuManagement.action.createMenuItemCmd.status', 'loading');
    this.createMenuItemCmdError = '';
    setState('ui.menuManagement.action.createMenuItemCmd.error', '');
    const params: CreateMenuItemCmdInput = {
      menuCategoryId: this.createMenuItemCmdMenuCategoryId,
      name: this.createMenuItemCmdName,
      price: this.parseRequiredNumber(this.createMenuItemCmdPrice),
      requiresStockLink: this.parseBool(this.createMenuItemCmdRequiresStockLink),
    };
    if (this.createMenuItemCmdDescription !== '') params.description = this.createMenuItemCmdDescription;
    if (this.createMenuItemCmdStatus !== '') params.status = this.createMenuItemCmdStatus;
    if (this.createMenuItemCmdImageUrl !== '') params.imageUrl = this.createMenuItemCmdImageUrl;
    const displayOrderNum = this.parseOptionalNumber(this.createMenuItemCmdDisplayOrder);
    if (displayOrderNum !== undefined) params.displayOrder = displayOrderNum;
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CreateMenuItemCmdOutput>(createMenuItemCmdRoute, params, options);
    if (!response.ok) {
      const errMsg =
        response.error && response.error.message ? String(response.error.message) : '';
      this.createMenuItemCmdError = errMsg;
      setState('ui.menuManagement.action.createMenuItemCmd.error', errMsg);
      this.createMenuItemCmdState = 'error';
      setState('ui.menuManagement.action.createMenuItemCmd.status', 'error');
      return;
    }
    const out: CreateMenuItemCmdOutput | null =
      response.data !== null && response.data !== undefined ? response.data : null;
    this.createMenuItemCmdOutput = out;
    setState('ui.menuManagement.output.createMenuItemCmd', out);
    await this.loadListMenuItems();
    if (this.listMenuItemsState === 'error') {
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
  async handleCreateMenuItemCmdClick(): Promise<void> {
    await runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.createMenuItemCmd();
    });
  }

  /** action updateMenuItemCmd (command) — route cafeFlow.menuManagement.updateMenuItemCmd; inputs: menuItemId, menuCategoryId, name, description, price, status, pauseReason, imageUrl, displayOrder, requiresStockLink; writes ui.menuManagement.output.updateMenuItemCmd; status ui.menuManagement.action.updateMenuItemCmd.status; feedback keys action.updateMenuItemCmd.success / action.updateMenuItemCmd.error */
  async updateMenuItemCmd(): Promise<void> {
    this.applyRouteParams();
    if (!this.updateMenuItemCmdMenuItemId) {
      this.updateMenuItemCmdState = 'idle';
      setState('ui.menuManagement.action.updateMenuItemCmd.status', 'idle');
      this.updateMenuItemCmdOutput = null;
      setState('ui.menuManagement.output.updateMenuItemCmd', null);
      return;
    }
    this.updateMenuItemCmdState = 'loading';
    setState('ui.menuManagement.action.updateMenuItemCmd.status', 'loading');
    this.updateMenuItemCmdError = '';
    setState('ui.menuManagement.action.updateMenuItemCmd.error', '');
    const params: UpdateMenuItemCmdInput = {
      menuItemId: this.updateMenuItemCmdMenuItemId,
      menuCategoryId: this.updateMenuItemCmdMenuCategoryId,
      name: this.updateMenuItemCmdName,
      price: this.parseRequiredNumber(this.updateMenuItemCmdPrice),
      status: this.updateMenuItemCmdStatus,
      requiresStockLink: this.parseBool(this.updateMenuItemCmdRequiresStockLink),
    };
    if (this.updateMenuItemCmdDescription !== '') params.description = this.updateMenuItemCmdDescription;
    if (this.updateMenuItemCmdPauseReason !== '') params.pauseReason = this.updateMenuItemCmdPauseReason;
    if (this.updateMenuItemCmdImageUrl !== '') params.imageUrl = this.updateMenuItemCmdImageUrl;
    const displayOrderNum = this.parseOptionalNumber(this.updateMenuItemCmdDisplayOrder);
    if (displayOrderNum !== undefined) params.displayOrder = displayOrderNum;
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<UpdateMenuItemCmdOutput>(updateMenuItemCmdRoute, params, options);
    if (!response.ok) {
      const errMsg =
        response.error && response.error.message ? String(response.error.message) : '';
      this.updateMenuItemCmdError = errMsg;
      setState('ui.menuManagement.action.updateMenuItemCmd.error', errMsg);
      this.updateMenuItemCmdState = 'error';
      setState('ui.menuManagement.action.updateMenuItemCmd.status', 'error');
      return;
    }
    const out: UpdateMenuItemCmdOutput | null =
      response.data !== null && response.data !== undefined ? response.data : null;
    this.updateMenuItemCmdOutput = out;
    setState('ui.menuManagement.output.updateMenuItemCmd', out);
    await this.loadListMenuItems();
    if (this.listMenuItemsState === 'error') {
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
  async handleUpdateMenuItemCmdClick(): Promise<void> {
    await runBlockingUiAction(async (_signal: AbortSignal) => {
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
    const value = target ? String(target.value) : '';
    this.setListMenuItemsStatus(value);
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
    const value = target ? String(target.value) : '';
    this.setListMenuItemsMenuCategoryId(value);
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
    const value = target ? String(target.value) : '';
    this.setListMenuItemsName(value);
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
    const value = target ? String(target.value) : '';
    this.setListMenuItemsPage(value);
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
    const value = target ? String(target.value) : '';
    this.setListMenuItemsPageSize(value);
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
    const value = target ? String(target.value) : '';
    this.setCreateMenuItemCmdMenuCategoryId(value);
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
    const value = target ? String(target.value) : '';
    this.setCreateMenuItemCmdName(value);
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
    const value = target ? String(target.value) : '';
    this.setCreateMenuItemCmdDescription(value);
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
    const value = target ? String(target.value) : '';
    this.setCreateMenuItemCmdPrice(value);
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
    const value = target ? String(target.value) : '';
    this.setCreateMenuItemCmdStatus(value);
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
    const value = target ? String(target.value) : '';
    this.setCreateMenuItemCmdImageUrl(value);
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
    const value = target ? String(target.value) : '';
    this.setCreateMenuItemCmdDisplayOrder(value);
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
    const value = target ? String(target.value) : '';
    this.setCreateMenuItemCmdRequiresStockLink(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdMenuItemId(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdMenuCategoryId(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdName(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdDescription(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdPrice(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdStatus(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdPauseReason(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdImageUrl(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdDisplayOrder(value);
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
    const value = target ? String(target.value) : '';
    this.setUpdateMenuItemCmdRequiresStockLink(value);
  }
}
