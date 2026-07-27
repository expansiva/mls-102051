/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/stockManagement.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  ListStockItemsInput,
  ListStockItemsOutput,
  AddStockItemInput,
  AddStockItemOutput,
  EditStockItemInput,
  EditStockItemOutput,
  RemoveStockItemInput,
  RemoveStockItemOutput,
  RegisterStockAdjustmentInput,
  RegisterStockAdjustmentOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';
import {
  listStockItemsRoute,
  addStockItemRoute,
  editStockItemRoute,
  removeStockItemRoute,
  registerStockAdjustmentRoute,
} from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';

export type {
  ListStockItemsInput,
  ListStockItemsOutput,
  AddStockItemInput,
  AddStockItemOutput,
  EditStockItemInput,
  EditStockItemOutput,
  RemoveStockItemInput,
  RemoveStockItemOutput,
  RegisterStockAdjustmentInput,
  RegisterStockAdjustmentOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/stockManagement.js';

/// **collab_i18n_start**
const message_pt = {
  "section.stockManagement.stockItemList.title": "Stock Item List",
  "organism.stockManagement.listStockItems.title": "Listar itens de estoque",
  "intent.stockManagement.listStockItems.list.title": "Listar itens de estoque",
  "intent.stockManagement.listStockItems.list.empty": "Nenhum registro encontrado",
  "intent.stockManagement.listStockItems.list.column.stockItems.label": "Stock Items",
  "intent.stockManagement.listStockItems.list.column.total.label": "Total",
  "intent.stockManagement.listStockItems.list.filter.nameFilter.label": "Name Filter",
  "intent.stockManagement.listStockItems.list.filter.lowStockOnly.label": "Low Stock Only",
  "intent.stockManagement.listStockItems.list.filter.page.label": "Page",
  "intent.stockManagement.listStockItems.list.filter.pageSize.label": "Page Size",
  "organism.stockManagement.editStockItem.title": "Atualizar item de estoque",
  "intent.stockManagement.editStockItem.form.title": "Atualizar item de estoque",
  "intent.stockManagement.editStockItem.form.action.editStockItem": "Atualizar item de estoque",
  "intent.stockManagement.editStockItem.form.field.name.label": "Name",
  "intent.stockManagement.editStockItem.form.field.unit.label": "Unit",
  "intent.stockManagement.editStockItem.form.field.minimumLevel.label": "Minimum Level",
  "intent.stockManagement.editStockItem.form.field.description.label": "Description",
  "organism.stockManagement.removeStockItem.title": "Excluir item de estoque",
  "intent.stockManagement.removeStockItem.form.title": "Excluir item de estoque",
  "intent.stockManagement.removeStockItem.form.action.removeStockItem": "Excluir item de estoque",
  "organism.stockManagement.registerStockAdjustment.title": "Registrar ajuste manual de estoque",
  "intent.stockManagement.registerStockAdjustment.form.title": "Registrar ajuste manual de estoque",
  "intent.stockManagement.registerStockAdjustment.form.action.registerStockAdjustment": "Registrar ajuste manual de estoque",
  "intent.stockManagement.registerStockAdjustment.form.field.stockItemId.label": "Stock Item Id",
  "intent.stockManagement.registerStockAdjustment.form.field.quantity.label": "Quantity",
  "intent.stockManagement.registerStockAdjustment.form.field.direction.label": "Direction",
  "intent.stockManagement.registerStockAdjustment.form.field.reason.label": "Reason",
  "intent.stockManagement.registerStockAdjustment.form.field.notes.label": "Notes",
  "section.stockManagement.createStockItemSection.title": "Add New Stock Item",
  "organism.stockManagement.addStockItem.title": "Criar item de estoque",
  "intent.stockManagement.addStockItem.form.title": "Criar item de estoque",
  "intent.stockManagement.addStockItem.form.action.addStockItem": "Criar item de estoque",
  "intent.stockManagement.addStockItem.form.field.name.label": "Name",
  "intent.stockManagement.addStockItem.form.field.unit.label": "Unit",
  "intent.stockManagement.addStockItem.form.field.currentBalance.label": "Current Balance",
  "intent.stockManagement.addStockItem.form.field.minimumLevel.label": "Minimum Level",
  "intent.stockManagement.addStockItem.form.field.description.label": "Description",
  "section.stockManagement.sec-stock-master.title": "Controle de Estoque",
  "section.stockManagement.sec-create-panel.title": "Novo Insumo"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

const LIST_STOCK_ITEMS_DEFAULT: ListStockItemsOutput = { stockItems: [], total: 0 };

const SUBSCRIBED_STATE_KEYS: string[] = [
  'ui.stockManagement.status',
  'ui.stockManagement.action.listStockItems.status',
  'ui.stockManagement.input.listStockItems.nameFilter',
  'ui.stockManagement.input.listStockItems.lowStockOnly',
  'ui.stockManagement.input.listStockItems.page',
  'ui.stockManagement.input.listStockItems.pageSize',
  'ui.stockManagement.data.listStockItems',
  'ui.stockManagement.action.addStockItem.status',
  'ui.stockManagement.input.addStockItem.name',
  'ui.stockManagement.input.addStockItem.unit',
  'ui.stockManagement.input.addStockItem.currentBalance',
  'ui.stockManagement.input.addStockItem.minimumLevel',
  'ui.stockManagement.input.addStockItem.description',
  'ui.stockManagement.output.addStockItem',
  'ui.stockManagement.action.addStockItem.error',
  'ui.stockManagement.action.editStockItem.status',
  'ui.stockManagement.input.editStockItem.stockItemId',
  'ui.stockManagement.input.editStockItem.name',
  'ui.stockManagement.input.editStockItem.unit',
  'ui.stockManagement.input.editStockItem.minimumLevel',
  'ui.stockManagement.input.editStockItem.description',
  'ui.stockManagement.output.editStockItem',
  'ui.stockManagement.action.editStockItem.error',
  'ui.stockManagement.action.removeStockItem.status',
  'ui.stockManagement.input.removeStockItem.stockItemId',
  'ui.stockManagement.output.removeStockItem',
  'ui.stockManagement.action.removeStockItem.error',
  'ui.stockManagement.action.registerStockAdjustment.status',
  'ui.stockManagement.input.registerStockAdjustment.stockItemId',
  'ui.stockManagement.input.registerStockAdjustment.quantity',
  'ui.stockManagement.input.registerStockAdjustment.direction',
  'ui.stockManagement.input.registerStockAdjustment.reason',
  'ui.stockManagement.input.registerStockAdjustment.notes',
  'ui.stockManagement.output.registerStockAdjustment',
  'ui.stockManagement.action.registerStockAdjustment.error',
];

export class CafeFlowStockManagementBase extends CollabLitElement {
  /** state status — pageStatus */
  @property() status: string = '';
  /** state listStockItemsState — actionStatus, values: idle|loading|success|error */
  @property() listStockItemsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state listStockItemsNameFilter — input */
  @property() listStockItemsNameFilter: string = '';
  /** state listStockItemsLowStockOnly — input */
  @property() listStockItemsLowStockOnly: string = '';
  /** state listStockItemsPage — input */
  @property() listStockItemsPage: string = '';
  /** state listStockItemsPageSize — input */
  @property() listStockItemsPageSize: string = '';
  /** state listStockItemsData — queryResult, outputShape: paginated */
  @property() listStockItemsData: ListStockItemsOutput = { stockItems: [], total: 0 };
  /** state addStockItemState — actionStatus, values: idle|loading|success|error */
  @property() addStockItemState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state addStockItemName — input */
  @property() addStockItemName: string = '';
  /** state addStockItemUnit — input */
  @property() addStockItemUnit: string = '';
  /** state addStockItemCurrentBalance — input */
  @property() addStockItemCurrentBalance: string = '';
  /** state addStockItemMinimumLevel — input */
  @property() addStockItemMinimumLevel: string = '';
  /** state addStockItemDescription — input */
  @property() addStockItemDescription: string = '';
  /** state addStockItemOutput — commandOutput */
  @property() addStockItemOutput: AddStockItemOutput | null = null;
  /** state addStockItemError — actionError */
  @property() addStockItemError: string = '';
  /** state editStockItemState — actionStatus, values: idle|loading|success|error */
  @property() editStockItemState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state editStockItemStockItemId — input */
  @property() editStockItemStockItemId: string = '';
  /** state editStockItemName — input */
  @property() editStockItemName: string = '';
  /** state editStockItemUnit — input */
  @property() editStockItemUnit: string = '';
  /** state editStockItemMinimumLevel — input */
  @property() editStockItemMinimumLevel: string = '';
  /** state editStockItemDescription — input */
  @property() editStockItemDescription: string = '';
  /** state editStockItemOutput — commandOutput */
  @property() editStockItemOutput: EditStockItemOutput | null = null;
  /** state editStockItemError — actionError */
  @property() editStockItemError: string = '';
  /** state removeStockItemState — actionStatus, values: idle|loading|success|error */
  @property() removeStockItemState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state removeStockItemStockItemId — input */
  @property() removeStockItemStockItemId: string = '';
  /** state removeStockItemOutput — commandOutput */
  @property() removeStockItemOutput: RemoveStockItemOutput | null = null;
  /** state removeStockItemError — actionError */
  @property() removeStockItemError: string = '';
  /** state registerStockAdjustmentState — actionStatus, values: idle|loading|success|error */
  @property() registerStockAdjustmentState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state registerStockAdjustmentStockItemId — input */
  @property() registerStockAdjustmentStockItemId: string = '';
  /** state registerStockAdjustmentQuantity — input */
  @property() registerStockAdjustmentQuantity: string = '';
  /** state registerStockAdjustmentDirection — input */
  @property() registerStockAdjustmentDirection: string = '';
  /** state registerStockAdjustmentReason — input */
  @property() registerStockAdjustmentReason: string = '';
  /** state registerStockAdjustmentNotes — input */
  @property() registerStockAdjustmentNotes: string = '';
  /** state registerStockAdjustmentOutput — commandOutput */
  @property() registerStockAdjustmentOutput: RegisterStockAdjustmentOutput | null = null;
  /** state registerStockAdjustmentError — actionError */
  @property() registerStockAdjustmentError: string = '';

  /** i18n catalog — MessageType keys are the CLOSED msg vocabulary for page renders */
  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.initStateValue('ui.stockManagement.status', 'status', '');
    this.initStateValue('ui.stockManagement.action.listStockItems.status', 'listStockItemsState', 'idle');
    this.initStateValue('ui.stockManagement.input.listStockItems.nameFilter', 'listStockItemsNameFilter', '');
    this.initStateValue('ui.stockManagement.input.listStockItems.lowStockOnly', 'listStockItemsLowStockOnly', '');
    this.initStateValue('ui.stockManagement.input.listStockItems.page', 'listStockItemsPage', '');
    this.initStateValue('ui.stockManagement.input.listStockItems.pageSize', 'listStockItemsPageSize', '');
    this.initStateValue('ui.stockManagement.data.listStockItems', 'listStockItemsData', LIST_STOCK_ITEMS_DEFAULT);
    this.initStateValue('ui.stockManagement.action.addStockItem.status', 'addStockItemState', 'idle');
    this.initStateValue('ui.stockManagement.input.addStockItem.name', 'addStockItemName', '');
    this.initStateValue('ui.stockManagement.input.addStockItem.unit', 'addStockItemUnit', '');
    this.initStateValue('ui.stockManagement.input.addStockItem.currentBalance', 'addStockItemCurrentBalance', '');
    this.initStateValue('ui.stockManagement.input.addStockItem.minimumLevel', 'addStockItemMinimumLevel', '');
    this.initStateValue('ui.stockManagement.input.addStockItem.description', 'addStockItemDescription', '');
    this.initStateValue('ui.stockManagement.output.addStockItem', 'addStockItemOutput', null);
    this.initStateValue('ui.stockManagement.action.addStockItem.error', 'addStockItemError', '');
    this.initStateValue('ui.stockManagement.action.editStockItem.status', 'editStockItemState', 'idle');
    this.initStateValue('ui.stockManagement.input.editStockItem.stockItemId', 'editStockItemStockItemId', '');
    this.initStateValue('ui.stockManagement.input.editStockItem.name', 'editStockItemName', '');
    this.initStateValue('ui.stockManagement.input.editStockItem.unit', 'editStockItemUnit', '');
    this.initStateValue('ui.stockManagement.input.editStockItem.minimumLevel', 'editStockItemMinimumLevel', '');
    this.initStateValue('ui.stockManagement.input.editStockItem.description', 'editStockItemDescription', '');
    this.initStateValue('ui.stockManagement.output.editStockItem', 'editStockItemOutput', null);
    this.initStateValue('ui.stockManagement.action.editStockItem.error', 'editStockItemError', '');
    this.initStateValue('ui.stockManagement.action.removeStockItem.status', 'removeStockItemState', 'idle');
    this.initStateValue('ui.stockManagement.input.removeStockItem.stockItemId', 'removeStockItemStockItemId', '');
    this.initStateValue('ui.stockManagement.output.removeStockItem', 'removeStockItemOutput', null);
    this.initStateValue('ui.stockManagement.action.removeStockItem.error', 'removeStockItemError', '');
    this.initStateValue('ui.stockManagement.action.registerStockAdjustment.status', 'registerStockAdjustmentState', 'idle');
    this.initStateValue('ui.stockManagement.input.registerStockAdjustment.stockItemId', 'registerStockAdjustmentStockItemId', '');
    this.initStateValue('ui.stockManagement.input.registerStockAdjustment.quantity', 'registerStockAdjustmentQuantity', '');
    this.initStateValue('ui.stockManagement.input.registerStockAdjustment.direction', 'registerStockAdjustmentDirection', '');
    this.initStateValue('ui.stockManagement.input.registerStockAdjustment.reason', 'registerStockAdjustmentReason', '');
    this.initStateValue('ui.stockManagement.input.registerStockAdjustment.notes', 'registerStockAdjustmentNotes', '');
    this.initStateValue('ui.stockManagement.output.registerStockAdjustment', 'registerStockAdjustmentOutput', null);
    this.initStateValue('ui.stockManagement.action.registerStockAdjustment.error', 'registerStockAdjustmentError', '');
    subscribe(SUBSCRIBED_STATE_KEYS, this);
    void this.loadListStockItems();
  }

  disconnectedCallback(): void {
    unsubscribe(SUBSCRIBED_STATE_KEYS, this);
    super.disconnectedCallback();
  }

  /** Notify contract — assign shared state to the mapped field and re-render */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.stockManagement.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.stockManagement.action.listStockItems.status':
        this.listStockItemsState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.stockManagement.input.listStockItems.nameFilter':
        this.listStockItemsNameFilter = (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.listStockItems.lowStockOnly':
        this.listStockItemsLowStockOnly = value === true || value === 'true' ? 'true' : (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.listStockItems.page':
        this.listStockItemsPage = value === null || value === undefined ? '' : String(value);
        break;
      case 'ui.stockManagement.input.listStockItems.pageSize':
        this.listStockItemsPageSize = value === null || value === undefined ? '' : String(value);
        break;
      case 'ui.stockManagement.data.listStockItems':
        this.listStockItemsData = (value as ListStockItemsOutput) ?? LIST_STOCK_ITEMS_DEFAULT;
        break;
      case 'ui.stockManagement.action.addStockItem.status':
        this.addStockItemState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.stockManagement.input.addStockItem.name':
        this.addStockItemName = (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.addStockItem.unit':
        this.addStockItemUnit = (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.addStockItem.currentBalance':
        this.addStockItemCurrentBalance = value === null || value === undefined ? '' : String(value);
        break;
      case 'ui.stockManagement.input.addStockItem.minimumLevel':
        this.addStockItemMinimumLevel = value === null || value === undefined ? '' : String(value);
        break;
      case 'ui.stockManagement.input.addStockItem.description':
        this.addStockItemDescription = (value as string) ?? '';
        break;
      case 'ui.stockManagement.output.addStockItem':
        this.addStockItemOutput = (value as AddStockItemOutput | null) ?? null;
        break;
      case 'ui.stockManagement.action.addStockItem.error':
        this.addStockItemError = (value as string) ?? '';
        break;
      case 'ui.stockManagement.action.editStockItem.status':
        this.editStockItemState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.stockManagement.input.editStockItem.stockItemId':
        this.editStockItemStockItemId = (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.editStockItem.name':
        this.editStockItemName = (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.editStockItem.unit':
        this.editStockItemUnit = (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.editStockItem.minimumLevel':
        this.editStockItemMinimumLevel = value === null || value === undefined ? '' : String(value);
        break;
      case 'ui.stockManagement.input.editStockItem.description':
        this.editStockItemDescription = (value as string) ?? '';
        break;
      case 'ui.stockManagement.output.editStockItem':
        this.editStockItemOutput = (value as EditStockItemOutput | null) ?? null;
        break;
      case 'ui.stockManagement.action.editStockItem.error':
        this.editStockItemError = (value as string) ?? '';
        break;
      case 'ui.stockManagement.action.removeStockItem.status':
        this.removeStockItemState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.stockManagement.input.removeStockItem.stockItemId':
        this.removeStockItemStockItemId = (value as string) ?? '';
        break;
      case 'ui.stockManagement.output.removeStockItem':
        this.removeStockItemOutput = (value as RemoveStockItemOutput | null) ?? null;
        break;
      case 'ui.stockManagement.action.removeStockItem.error':
        this.removeStockItemError = (value as string) ?? '';
        break;
      case 'ui.stockManagement.action.registerStockAdjustment.status':
        this.registerStockAdjustmentState = (value as 'idle' | 'loading' | 'success' | 'error') ?? 'idle';
        break;
      case 'ui.stockManagement.input.registerStockAdjustment.stockItemId':
        this.registerStockAdjustmentStockItemId = (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.registerStockAdjustment.quantity':
        this.registerStockAdjustmentQuantity = value === null || value === undefined ? '' : String(value);
        break;
      case 'ui.stockManagement.input.registerStockAdjustment.direction':
        this.registerStockAdjustmentDirection = (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.registerStockAdjustment.reason':
        this.registerStockAdjustmentReason = (value as string) ?? '';
        break;
      case 'ui.stockManagement.input.registerStockAdjustment.notes':
        this.registerStockAdjustmentNotes = (value as string) ?? '';
        break;
      case 'ui.stockManagement.output.registerStockAdjustment':
        this.registerStockAdjustmentOutput = (value as RegisterStockAdjustmentOutput | null) ?? null;
        break;
      case 'ui.stockManagement.action.registerStockAdjustment.error':
        this.registerStockAdjustmentError = (value as string) ?? '';
        break;
      default:
        break;
    }
    this.requestUpdate();
  }

  private initStateValue(stateKey: string, propName: string, defaultValue: unknown): void {
    const existing = getState(stateKey);
    const value = existing !== undefined && existing !== null ? existing : defaultValue;
    (this as unknown as Record<string, unknown>)[propName] = value;
    if (existing === undefined || existing === null) {
      setState(stateKey, value);
    }
  }

  private applyRouteParams(): void {
    const path = window.location.pathname;
    const patternParts = '/cafeFlow/stockManagement/:stockItemId?'.split('/').filter(Boolean);
    const pathParts = path.split('/').filter(Boolean);
    let stockItemId = '';
    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(':')) {
        const optional = part.endsWith('?');
        const name = optional ? part.slice(1, -1) : part.slice(1);
        const raw = pathParts[i];
        if (raw !== undefined && raw !== '') {
          const decoded = decodeURIComponent(raw);
          if (name === 'stockItemId') {
            stockItemId = decoded;
          }
        }
      }
    }
    if (stockItemId !== '') {
      this.editStockItemStockItemId = stockItemId;
      setState('ui.stockManagement.input.editStockItem.stockItemId', stockItemId);
    }
  }

  private readErrorMessage(error: { message?: string } | null | undefined): string {
    if (!error) return '';
    if (typeof error.message === 'string' && error.message.length > 0) return error.message;
    return String(error);
  }

  private parseOptionalNumber(raw: string): number | undefined {
    if (raw === '' || raw === undefined || raw === null) return undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
  }

  private parseOptionalBoolean(raw: string): boolean | undefined {
    if (raw === '' || raw === undefined || raw === null) return undefined;
    if (raw === true as unknown as string) return true;
    if (raw === false as unknown as string) return false;
    const lowered = String(raw).toLowerCase();
    if (lowered === 'true' || lowered === '1' || lowered === 'yes') return true;
    if (lowered === 'false' || lowered === '0' || lowered === 'no') return false;
    return undefined;
  }

  private parseRequiredNumber(raw: string): number {
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }

  /** action listStockItems (query) — route cafeFlow.stockManagement.listStockItems; inputs: nameFilter, lowStockOnly, page, pageSize; writes ui.stockManagement.data.listStockItems; status ui.stockManagement.action.listStockItems.status */
  async loadListStockItems(): Promise<boolean> {
    this.listStockItemsState = 'loading';
    setState('ui.stockManagement.action.listStockItems.status', 'loading');
    const params: ListStockItemsInput = {};
    if (this.listStockItemsNameFilter !== '') {
      params.nameFilter = this.listStockItemsNameFilter;
    }
    const lowStockOnly = this.parseOptionalBoolean(this.listStockItemsLowStockOnly);
    if (lowStockOnly !== undefined) {
      params.lowStockOnly = lowStockOnly;
    }
    const page = this.parseOptionalNumber(this.listStockItemsPage);
    if (page !== undefined) {
      params.page = page;
    }
    const pageSize = this.parseOptionalNumber(this.listStockItemsPageSize);
    if (pageSize !== undefined) {
      params.pageSize = pageSize;
    }
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<ListStockItemsOutput>(listStockItemsRoute, params, options);
    if (response.ok) {
      const data = response.data ?? LIST_STOCK_ITEMS_DEFAULT;
      this.listStockItemsData = data;
      setState('ui.stockManagement.data.listStockItems', data);
      this.listStockItemsState = 'success';
      setState('ui.stockManagement.action.listStockItems.status', 'success');
      return true;
    }
    this.listStockItemsState = 'error';
    setState('ui.stockManagement.action.listStockItems.status', 'error');
    return false;
  }

  /** handler for action listStockItems — bind UI events here */
  handleListStockItemsClick(_event?: Event): void {
    void this.loadListStockItems();
  }

  /** action addStockItem (command) — route cafeFlow.stockManagement.addStockItem; inputs: name, unit, currentBalance, minimumLevel, description; writes ui.stockManagement.output.addStockItem; status ui.stockManagement.action.addStockItem.status; feedback keys action.addStockItem.success / action.addStockItem.error */
  async addStockItem(): Promise<void> {
    this.addStockItemState = 'loading';
    setState('ui.stockManagement.action.addStockItem.status', 'loading');
    this.addStockItemError = '';
    setState('ui.stockManagement.action.addStockItem.error', '');
    const params: AddStockItemInput = {
      name: this.addStockItemName,
      unit: this.addStockItemUnit,
      currentBalance: this.parseRequiredNumber(this.addStockItemCurrentBalance),
      minimumLevel: this.parseRequiredNumber(this.addStockItemMinimumLevel),
    };
    if (this.addStockItemDescription !== '') {
      params.description = this.addStockItemDescription;
    }
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<AddStockItemOutput>(addStockItemRoute, params, options);
    if (!response.ok) {
      const errMsg = this.readErrorMessage(response.error);
      this.addStockItemError = errMsg;
      setState('ui.stockManagement.action.addStockItem.error', errMsg);
      this.addStockItemState = 'error';
      setState('ui.stockManagement.action.addStockItem.status', 'error');
      return;
    }
    const data = response.data ?? null;
    this.addStockItemOutput = data;
    setState('ui.stockManagement.output.addStockItem', data);
    const refreshed = await this.loadListStockItems();
    if (!refreshed) {
      this.addStockItemState = 'error';
      setState('ui.stockManagement.action.addStockItem.status', 'error');
      return;
    }
    this.addStockItemName = '';
    setState('ui.stockManagement.input.addStockItem.name', '');
    this.addStockItemUnit = '';
    setState('ui.stockManagement.input.addStockItem.unit', '');
    this.addStockItemCurrentBalance = '';
    setState('ui.stockManagement.input.addStockItem.currentBalance', '');
    this.addStockItemMinimumLevel = '';
    setState('ui.stockManagement.input.addStockItem.minimumLevel', '');
    this.addStockItemDescription = '';
    setState('ui.stockManagement.input.addStockItem.description', '');
    this.addStockItemState = 'success';
    setState('ui.stockManagement.action.addStockItem.status', 'success');
  }

  /** handler for action addStockItem — bind UI events here */
  handleAddStockItemClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.addStockItem();
    });
  }

  /** action editStockItem (command) — route cafeFlow.stockManagement.editStockItem; inputs: stockItemId, name, unit, minimumLevel, description; writes ui.stockManagement.output.editStockItem; status ui.stockManagement.action.editStockItem.status; feedback keys action.editStockItem.success / action.editStockItem.error */
  async editStockItem(): Promise<void> {
    this.applyRouteParams();
    if (!this.editStockItemStockItemId) {
      this.editStockItemState = 'idle';
      setState('ui.stockManagement.action.editStockItem.status', 'idle');
      return;
    }
    this.editStockItemState = 'loading';
    setState('ui.stockManagement.action.editStockItem.status', 'loading');
    this.editStockItemError = '';
    setState('ui.stockManagement.action.editStockItem.error', '');
    const params: EditStockItemInput = {
      stockItemId: this.editStockItemStockItemId,
      name: this.editStockItemName,
      unit: this.editStockItemUnit,
      minimumLevel: this.parseRequiredNumber(this.editStockItemMinimumLevel),
    };
    if (this.editStockItemDescription !== '') {
      params.description = this.editStockItemDescription;
    }
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<EditStockItemOutput>(editStockItemRoute, params, options);
    if (!response.ok) {
      const errMsg = this.readErrorMessage(response.error);
      this.editStockItemError = errMsg;
      setState('ui.stockManagement.action.editStockItem.error', errMsg);
      this.editStockItemState = 'error';
      setState('ui.stockManagement.action.editStockItem.status', 'error');
      return;
    }
    const data = response.data ?? null;
    this.editStockItemOutput = data;
    setState('ui.stockManagement.output.editStockItem', data);
    const refreshed = await this.loadListStockItems();
    if (!refreshed) {
      this.editStockItemState = 'error';
      setState('ui.stockManagement.action.editStockItem.status', 'error');
      return;
    }
    this.editStockItemName = '';
    setState('ui.stockManagement.input.editStockItem.name', '');
    this.editStockItemUnit = '';
    setState('ui.stockManagement.input.editStockItem.unit', '');
    this.editStockItemMinimumLevel = '';
    setState('ui.stockManagement.input.editStockItem.minimumLevel', '');
    this.editStockItemDescription = '';
    setState('ui.stockManagement.input.editStockItem.description', '');
    this.editStockItemState = 'success';
    setState('ui.stockManagement.action.editStockItem.status', 'success');
  }

  /** handler for action editStockItem — bind UI events here */
  handleEditStockItemClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.editStockItem();
    });
  }

  /** action removeStockItem (command) — route cafeFlow.stockManagement.removeStockItem; inputs: stockItemId; writes ui.stockManagement.output.removeStockItem; status ui.stockManagement.action.removeStockItem.status; feedback keys action.removeStockItem.success / action.removeStockItem.error */
  async removeStockItem(): Promise<void> {
    this.removeStockItemState = 'loading';
    setState('ui.stockManagement.action.removeStockItem.status', 'loading');
    this.removeStockItemError = '';
    setState('ui.stockManagement.action.removeStockItem.error', '');
    const params: RemoveStockItemInput = {
      stockItemId: this.removeStockItemStockItemId,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<RemoveStockItemOutput>(removeStockItemRoute, params, options);
    if (!response.ok) {
      const errMsg = this.readErrorMessage(response.error);
      this.removeStockItemError = errMsg;
      setState('ui.stockManagement.action.removeStockItem.error', errMsg);
      this.removeStockItemState = 'error';
      setState('ui.stockManagement.action.removeStockItem.status', 'error');
      return;
    }
    const data = response.data ?? null;
    this.removeStockItemOutput = data;
    setState('ui.stockManagement.output.removeStockItem', data);
    const refreshed = await this.loadListStockItems();
    if (!refreshed) {
      this.removeStockItemState = 'error';
      setState('ui.stockManagement.action.removeStockItem.status', 'error');
      return;
    }
    this.removeStockItemStockItemId = '';
    setState('ui.stockManagement.input.removeStockItem.stockItemId', '');
    this.removeStockItemState = 'success';
    setState('ui.stockManagement.action.removeStockItem.status', 'success');
  }

  /** handler for action removeStockItem — bind UI events here */
  handleRemoveStockItemClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.removeStockItem();
    });
  }

  /** action registerStockAdjustment (command) — route cafeFlow.stockManagement.registerStockAdjustment; inputs: stockItemId, quantity, direction, reason, notes; writes ui.stockManagement.output.registerStockAdjustment; status ui.stockManagement.action.registerStockAdjustment.status; feedback keys action.registerStockAdjustment.success / action.registerStockAdjustment.error */
  async registerStockAdjustment(): Promise<void> {
    this.registerStockAdjustmentState = 'loading';
    setState('ui.stockManagement.action.registerStockAdjustment.status', 'loading');
    this.registerStockAdjustmentError = '';
    setState('ui.stockManagement.action.registerStockAdjustment.error', '');
    const params: RegisterStockAdjustmentInput = {
      stockItemId: this.registerStockAdjustmentStockItemId,
      quantity: this.parseRequiredNumber(this.registerStockAdjustmentQuantity),
      direction: this.registerStockAdjustmentDirection,
      reason: this.registerStockAdjustmentReason,
    };
    if (this.registerStockAdjustmentNotes !== '') {
      params.notes = this.registerStockAdjustmentNotes;
    }
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<RegisterStockAdjustmentOutput>(registerStockAdjustmentRoute, params, options);
    if (!response.ok) {
      const errMsg = this.readErrorMessage(response.error);
      this.registerStockAdjustmentError = errMsg;
      setState('ui.stockManagement.action.registerStockAdjustment.error', errMsg);
      this.registerStockAdjustmentState = 'error';
      setState('ui.stockManagement.action.registerStockAdjustment.status', 'error');
      return;
    }
    const data = response.data ?? null;
    this.registerStockAdjustmentOutput = data;
    setState('ui.stockManagement.output.registerStockAdjustment', data);
    const refreshed = await this.loadListStockItems();
    if (!refreshed) {
      this.registerStockAdjustmentState = 'error';
      setState('ui.stockManagement.action.registerStockAdjustment.status', 'error');
      return;
    }
    this.registerStockAdjustmentStockItemId = '';
    setState('ui.stockManagement.input.registerStockAdjustment.stockItemId', '');
    this.registerStockAdjustmentQuantity = '';
    setState('ui.stockManagement.input.registerStockAdjustment.quantity', '');
    this.registerStockAdjustmentDirection = '';
    setState('ui.stockManagement.input.registerStockAdjustment.direction', '');
    this.registerStockAdjustmentReason = '';
    setState('ui.stockManagement.input.registerStockAdjustment.reason', '');
    this.registerStockAdjustmentNotes = '';
    setState('ui.stockManagement.input.registerStockAdjustment.notes', '');
    this.registerStockAdjustmentState = 'success';
    setState('ui.stockManagement.action.registerStockAdjustment.status', 'success');
  }

  /** handler for action registerStockAdjustment — bind UI events here */
  handleRegisterStockAdjustmentClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.registerStockAdjustment();
    });
  }

  /** setter for state ui.stockManagement.input.listStockItems.nameFilter */
  setListStockItemsNameFilter(value: string): void {
    this.listStockItemsNameFilter = value;
    setState('ui.stockManagement.input.listStockItems.nameFilter', value);
    this.requestUpdate();
  }

  /** handler for action set.listStockItemsNameFilter — bind UI events here */
  handleListStockItemsNameFilterChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setListStockItemsNameFilter(value);
  }

  /** setter for state ui.stockManagement.input.listStockItems.lowStockOnly */
  setListStockItemsLowStockOnly(value: string): void {
    this.listStockItemsLowStockOnly = value;
    setState('ui.stockManagement.input.listStockItems.lowStockOnly', value);
    this.requestUpdate();
  }

  /** handler for action set.listStockItemsLowStockOnly — bind UI events here */
  handleListStockItemsLowStockOnlyChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    let value = '';
    if (target) {
      if (target instanceof HTMLInputElement && target.type === 'checkbox') {
        value = target.checked ? 'true' : 'false';
      } else {
        value = target.value ?? '';
      }
    }
    this.setListStockItemsLowStockOnly(value);
  }

  /** setter for state ui.stockManagement.input.listStockItems.page */
  setListStockItemsPage(value: string): void {
    this.listStockItemsPage = value;
    setState('ui.stockManagement.input.listStockItems.page', value);
    this.requestUpdate();
  }

  /** handler for action set.listStockItemsPage — bind UI events here */
  handleListStockItemsPageChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setListStockItemsPage(value);
  }

  /** setter for state ui.stockManagement.input.listStockItems.pageSize */
  setListStockItemsPageSize(value: string): void {
    this.listStockItemsPageSize = value;
    setState('ui.stockManagement.input.listStockItems.pageSize', value);
    this.requestUpdate();
  }

  /** handler for action set.listStockItemsPageSize — bind UI events here */
  handleListStockItemsPageSizeChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setListStockItemsPageSize(value);
  }

  /** setter for state ui.stockManagement.input.addStockItem.name */
  setAddStockItemName(value: string): void {
    this.addStockItemName = value;
    setState('ui.stockManagement.input.addStockItem.name', value);
    this.requestUpdate();
  }

  /** handler for action set.addStockItemName — bind UI events here */
  handleAddStockItemNameChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setAddStockItemName(value);
  }

  /** setter for state ui.stockManagement.input.addStockItem.unit */
  setAddStockItemUnit(value: string): void {
    this.addStockItemUnit = value;
    setState('ui.stockManagement.input.addStockItem.unit', value);
    this.requestUpdate();
  }

  /** handler for action set.addStockItemUnit — bind UI events here */
  handleAddStockItemUnitChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setAddStockItemUnit(value);
  }

  /** setter for state ui.stockManagement.input.addStockItem.currentBalance */
  setAddStockItemCurrentBalance(value: string): void {
    this.addStockItemCurrentBalance = value;
    setState('ui.stockManagement.input.addStockItem.currentBalance', value);
    this.requestUpdate();
  }

  /** handler for action set.addStockItemCurrentBalance — bind UI events here */
  handleAddStockItemCurrentBalanceChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setAddStockItemCurrentBalance(value);
  }

  /** setter for state ui.stockManagement.input.addStockItem.minimumLevel */
  setAddStockItemMinimumLevel(value: string): void {
    this.addStockItemMinimumLevel = value;
    setState('ui.stockManagement.input.addStockItem.minimumLevel', value);
    this.requestUpdate();
  }

  /** handler for action set.addStockItemMinimumLevel — bind UI events here */
  handleAddStockItemMinimumLevelChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setAddStockItemMinimumLevel(value);
  }

  /** setter for state ui.stockManagement.input.addStockItem.description */
  setAddStockItemDescription(value: string): void {
    this.addStockItemDescription = value;
    setState('ui.stockManagement.input.addStockItem.description', value);
    this.requestUpdate();
  }

  /** handler for action set.addStockItemDescription — bind UI events here */
  handleAddStockItemDescriptionChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setAddStockItemDescription(value);
  }

  /** setter for state ui.stockManagement.input.editStockItem.stockItemId */
  setEditStockItemStockItemId(value: string): void {
    this.editStockItemStockItemId = value;
    setState('ui.stockManagement.input.editStockItem.stockItemId', value);
    this.requestUpdate();
  }

  /** handler for action set.editStockItemStockItemId — bind UI events here */
  handleEditStockItemStockItemIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setEditStockItemStockItemId(value);
  }

  /** setter for state ui.stockManagement.input.editStockItem.name */
  setEditStockItemName(value: string): void {
    this.editStockItemName = value;
    setState('ui.stockManagement.input.editStockItem.name', value);
    this.requestUpdate();
  }

  /** handler for action set.editStockItemName — bind UI events here */
  handleEditStockItemNameChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setEditStockItemName(value);
  }

  /** setter for state ui.stockManagement.input.editStockItem.unit */
  setEditStockItemUnit(value: string): void {
    this.editStockItemUnit = value;
    setState('ui.stockManagement.input.editStockItem.unit', value);
    this.requestUpdate();
  }

  /** handler for action set.editStockItemUnit — bind UI events here */
  handleEditStockItemUnitChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setEditStockItemUnit(value);
  }

  /** setter for state ui.stockManagement.input.editStockItem.minimumLevel */
  setEditStockItemMinimumLevel(value: string): void {
    this.editStockItemMinimumLevel = value;
    setState('ui.stockManagement.input.editStockItem.minimumLevel', value);
    this.requestUpdate();
  }

  /** handler for action set.editStockItemMinimumLevel — bind UI events here */
  handleEditStockItemMinimumLevelChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setEditStockItemMinimumLevel(value);
  }

  /** setter for state ui.stockManagement.input.editStockItem.description */
  setEditStockItemDescription(value: string): void {
    this.editStockItemDescription = value;
    setState('ui.stockManagement.input.editStockItem.description', value);
    this.requestUpdate();
  }

  /** handler for action set.editStockItemDescription — bind UI events here */
  handleEditStockItemDescriptionChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setEditStockItemDescription(value);
  }

  /** setter for state ui.stockManagement.input.removeStockItem.stockItemId */
  setRemoveStockItemStockItemId(value: string): void {
    this.removeStockItemStockItemId = value;
    setState('ui.stockManagement.input.removeStockItem.stockItemId', value);
    this.requestUpdate();
  }

  /** handler for action set.removeStockItemStockItemId — bind UI events here */
  handleRemoveStockItemStockItemIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setRemoveStockItemStockItemId(value);
  }

  /** setter for state ui.stockManagement.input.registerStockAdjustment.stockItemId */
  setRegisterStockAdjustmentStockItemId(value: string): void {
    this.registerStockAdjustmentStockItemId = value;
    setState('ui.stockManagement.input.registerStockAdjustment.stockItemId', value);
    this.requestUpdate();
  }

  /** handler for action set.registerStockAdjustmentStockItemId — bind UI events here */
  handleRegisterStockAdjustmentStockItemIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setRegisterStockAdjustmentStockItemId(value);
  }

  /** setter for state ui.stockManagement.input.registerStockAdjustment.quantity */
  setRegisterStockAdjustmentQuantity(value: string): void {
    this.registerStockAdjustmentQuantity = value;
    setState('ui.stockManagement.input.registerStockAdjustment.quantity', value);
    this.requestUpdate();
  }

  /** handler for action set.registerStockAdjustmentQuantity — bind UI events here */
  handleRegisterStockAdjustmentQuantityChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setRegisterStockAdjustmentQuantity(value);
  }

  /** setter for state ui.stockManagement.input.registerStockAdjustment.direction */
  setRegisterStockAdjustmentDirection(value: string): void {
    this.registerStockAdjustmentDirection = value;
    setState('ui.stockManagement.input.registerStockAdjustment.direction', value);
    this.requestUpdate();
  }

  /** handler for action set.registerStockAdjustmentDirection — bind UI events here */
  handleRegisterStockAdjustmentDirectionChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setRegisterStockAdjustmentDirection(value);
  }

  /** setter for state ui.stockManagement.input.registerStockAdjustment.reason */
  setRegisterStockAdjustmentReason(value: string): void {
    this.registerStockAdjustmentReason = value;
    setState('ui.stockManagement.input.registerStockAdjustment.reason', value);
    this.requestUpdate();
  }

  /** handler for action set.registerStockAdjustmentReason — bind UI events here */
  handleRegisterStockAdjustmentReasonChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setRegisterStockAdjustmentReason(value);
  }

  /** setter for state ui.stockManagement.input.registerStockAdjustment.notes */
  setRegisterStockAdjustmentNotes(value: string): void {
    this.registerStockAdjustmentNotes = value;
    setState('ui.stockManagement.input.registerStockAdjustment.notes', value);
    this.requestUpdate();
  }

  /** handler for action set.registerStockAdjustmentNotes — bind UI events here */
  handleRegisterStockAdjustmentNotesChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setRegisterStockAdjustmentNotes(value);
  }
}
