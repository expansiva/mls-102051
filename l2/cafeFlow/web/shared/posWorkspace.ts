/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/posWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  QueryOpenOrdersInput,
  QueryOpenOrdersOutput,
  QueryMenuItemsInput,
  QueryMenuItemsOutput,
  CmdCreateOrderInput,
  CmdCreateOrderOutput,
  CmdUpdateOrderStatusInput,
  CmdUpdateOrderStatusOutput,
  CmdRecordBasicPaymentInput,
  CmdRecordBasicPaymentOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';
import {
  queryOpenOrdersRoute,
  queryMenuItemsRoute,
  cmdCreateOrderRoute,
  cmdUpdateOrderStatusRoute,
  cmdRecordBasicPaymentRoute,
} from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

export type {
  QueryOpenOrdersInput,
  QueryOpenOrdersOutput,
  QueryMenuItemsInput,
  QueryMenuItemsOutput,
  CmdCreateOrderInput,
  CmdCreateOrderOutput,
  CmdUpdateOrderStatusInput,
  CmdUpdateOrderStatusOutput,
  CmdRecordBasicPaymentInput,
  CmdRecordBasicPaymentOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/posWorkspace.js';

/// **collab_i18n_start**
const message_pt = {
  "section.posWorkspace.openOrdersSection.title": "Pedidos Abertos",
  "organism.posWorkspace.queryOpenOrders.title": "Acompanhar pedidos abertos",
  "intent.posWorkspace.queryOpenOrders.list.title": "Acompanhar pedidos abertos",
  "intent.posWorkspace.queryOpenOrders.list.empty": "Nenhum registro encontrado",
  "intent.posWorkspace.queryOpenOrders.list.column.orders.label": "Orders",
  "intent.posWorkspace.queryOpenOrders.list.column.total.label": "Total",
  "intent.posWorkspace.queryOpenOrders.list.filter.dailyShiftId.label": "Daily Shift Id",
  "intent.posWorkspace.queryOpenOrders.list.filter.status.label": "Status",
  "intent.posWorkspace.queryOpenOrders.list.filter.orderType.label": "Order Type",
  "intent.posWorkspace.queryOpenOrders.list.filter.tableNumber.label": "Table Number",
  "intent.posWorkspace.queryOpenOrders.list.filter.page.label": "Page",
  "intent.posWorkspace.queryOpenOrders.list.filter.pageSize.label": "Page Size",
  "organism.posWorkspace.cmdUpdateOrderStatus.title": "Atualizar status do pedido",
  "intent.posWorkspace.cmdUpdateOrderStatus.form.title": "Atualizar status do pedido",
  "intent.posWorkspace.cmdUpdateOrderStatus.form.action.cmdUpdateOrderStatus": "Atualizar status do pedido",
  "intent.posWorkspace.cmdUpdateOrderStatus.form.field.status.label": "Status",
  "intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason.label": "Cancellation Reason",
  "section.posWorkspace.createOrderSection.title": "Lançar Pedido",
  "organism.posWorkspace.queryMenuItems.title": "Consultar cardápio no POS",
  "intent.posWorkspace.queryMenuItems.list.title": "Consultar cardápio no POS",
  "intent.posWorkspace.queryMenuItems.list.empty": "Nenhum registro encontrado",
  "intent.posWorkspace.queryMenuItems.list.column.menuItemId.label": "Menu Item Id",
  "intent.posWorkspace.queryMenuItems.list.column.menuCategoryId.label": "Menu Category Id",
  "intent.posWorkspace.queryMenuItems.list.column.name.label": "Name",
  "intent.posWorkspace.queryMenuItems.list.column.description.label": "Description",
  "intent.posWorkspace.queryMenuItems.list.column.price.label": "Price",
  "intent.posWorkspace.queryMenuItems.list.column.status.label": "Status",
  "intent.posWorkspace.queryMenuItems.list.column.imageUrl.label": "Image Url",
  "intent.posWorkspace.queryMenuItems.list.column.displayOrder.label": "Display Order",
  "intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId.label": "Menu Category Id",
  "organism.posWorkspace.cmdCreateOrder.title": "Registrar pedido",
  "intent.posWorkspace.cmdCreateOrder.form.title": "Registrar pedido",
  "intent.posWorkspace.cmdCreateOrder.form.action.cmdCreateOrder": "Registrar pedido",
  "intent.posWorkspace.cmdCreateOrder.form.field.orderType.label": "Order Type",
  "intent.posWorkspace.cmdCreateOrder.form.field.tableNumber.label": "Table Number",
  "intent.posWorkspace.cmdCreateOrder.form.field.customerName.label": "Customer Name",
  "intent.posWorkspace.cmdCreateOrder.form.field.notes.label": "Notes",
  "intent.posWorkspace.cmdCreateOrder.form.field.menuItemId.label": "Menu Item Id",
  "intent.posWorkspace.cmdCreateOrder.form.field.quantity.label": "Quantity",
  "intent.posWorkspace.cmdCreateOrder.form.field.observations.label": "Observations",
  "intent.posWorkspace.cmdCreateOrder.form.field.dailyShiftId.label": "Daily Shift Id",
  "section.posWorkspace.paymentSection.title": "Registrar Pagamento",
  "organism.posWorkspace.cmdRecordBasicPayment.title": "Registrar pagamento básico",
  "intent.posWorkspace.cmdRecordBasicPayment.form.title": "Registrar pagamento básico",
  "intent.posWorkspace.cmdRecordBasicPayment.form.action.cmdRecordBasicPayment": "Registrar pagamento básico",
  "intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount.label": "Total Amount",
  "intent.posWorkspace.cmdRecordBasicPayment.form.field.paymentMethod.label": "Payment Method",
  "intent.posWorkspace.cmdRecordBasicPayment.form.field.notes.label": "Notes",
  "section.posWorkspace.sec-open-orders.title": "Pedidos Abertos do Turno",
  "section.posWorkspace.sec-create-order.title": "Lançar Novo Pedido",
  "section.posWorkspace.sec-payment.title": "Registrar Pagamento"
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

const POS_WORKSPACE_STATE_KEYS: string[] = [
  'ui.posWorkspace.status',
  'ui.posWorkspace.action.queryOpenOrders.status',
  'ui.posWorkspace.input.queryOpenOrders.dailyShiftId',
  'ui.posWorkspace.input.queryOpenOrders.status',
  'ui.posWorkspace.input.queryOpenOrders.orderType',
  'ui.posWorkspace.input.queryOpenOrders.tableNumber',
  'ui.posWorkspace.input.queryOpenOrders.page',
  'ui.posWorkspace.input.queryOpenOrders.pageSize',
  'ui.posWorkspace.data.queryOpenOrders',
  'ui.posWorkspace.action.queryMenuItems.status',
  'ui.posWorkspace.input.queryMenuItems.menuCategoryId',
  'ui.posWorkspace.data.queryMenuItems',
  'ui.posWorkspace.action.cmdCreateOrder.status',
  'ui.posWorkspace.input.cmdCreateOrder.orderType',
  'ui.posWorkspace.input.cmdCreateOrder.tableNumber',
  'ui.posWorkspace.input.cmdCreateOrder.customerName',
  'ui.posWorkspace.input.cmdCreateOrder.notes',
  'ui.posWorkspace.input.cmdCreateOrder.menuItemId',
  'ui.posWorkspace.input.cmdCreateOrder.quantity',
  'ui.posWorkspace.input.cmdCreateOrder.observations',
  'ui.posWorkspace.input.cmdCreateOrder.dailyShiftId',
  'ui.posWorkspace.output.cmdCreateOrder',
  'ui.posWorkspace.action.cmdCreateOrder.error',
  'ui.posWorkspace.action.cmdUpdateOrderStatus.status',
  'ui.posWorkspace.input.cmdUpdateOrderStatus.orderId',
  'ui.posWorkspace.input.cmdUpdateOrderStatus.status',
  'ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason',
  'ui.posWorkspace.output.cmdUpdateOrderStatus',
  'ui.posWorkspace.action.cmdUpdateOrderStatus.error',
  'ui.posWorkspace.action.cmdRecordBasicPayment.status',
  'ui.posWorkspace.input.cmdRecordBasicPayment.orderId',
  'ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount',
  'ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod',
  'ui.posWorkspace.input.cmdRecordBasicPayment.notes',
  'ui.posWorkspace.output.cmdRecordBasicPayment',
  'ui.posWorkspace.action.cmdRecordBasicPayment.error',
];

const DEFAULT_QUERY_OPEN_ORDERS: QueryOpenOrdersOutput = { orders: [], total: 0 };

export class CafeFlowPosWorkspaceBase extends CollabLitElement {
  /** state ui.posWorkspace.status — pageStatus */
  @property() status: string = '';
  /** state ui.posWorkspace.action.queryOpenOrders.status — actionStatus, values: idle|loading|success|error */
  @property() queryOpenOrdersState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state ui.posWorkspace.input.queryOpenOrders.dailyShiftId — input */
  @property() queryOpenOrdersDailyShiftId: string = '';
  /** state ui.posWorkspace.input.queryOpenOrders.status — input */
  @property() queryOpenOrdersStatus: string = '';
  /** state ui.posWorkspace.input.queryOpenOrders.orderType — input */
  @property() queryOpenOrdersOrderType: string = '';
  /** state ui.posWorkspace.input.queryOpenOrders.tableNumber — input */
  @property() queryOpenOrdersTableNumber: string = '';
  /** state ui.posWorkspace.input.queryOpenOrders.page — input */
  @property() queryOpenOrdersPage: string = '';
  /** state ui.posWorkspace.input.queryOpenOrders.pageSize — input */
  @property() queryOpenOrdersPageSize: string = '';
  /** state ui.posWorkspace.data.queryOpenOrders — queryResult, outputShape: paginated */
  @property() queryOpenOrdersData: QueryOpenOrdersOutput = { orders: [], total: 0 };
  /** state ui.posWorkspace.action.queryMenuItems.status — actionStatus, values: idle|loading|success|error */
  @property() queryMenuItemsState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state ui.posWorkspace.input.queryMenuItems.menuCategoryId — input */
  @property() queryMenuItemsMenuCategoryId: string = '';
  /** state ui.posWorkspace.data.queryMenuItems — queryResult, outputShape: array */
  @property() queryMenuItemsData: QueryMenuItemsOutput[] = [];
  /** state ui.posWorkspace.action.cmdCreateOrder.status — actionStatus, values: idle|loading|success|error */
  @property() cmdCreateOrderState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state ui.posWorkspace.input.cmdCreateOrder.orderType — input */
  @property() cmdCreateOrderOrderType: string = '';
  /** state ui.posWorkspace.input.cmdCreateOrder.tableNumber — input */
  @property() cmdCreateOrderTableNumber: string = '';
  /** state ui.posWorkspace.input.cmdCreateOrder.customerName — input */
  @property() cmdCreateOrderCustomerName: string = '';
  /** state ui.posWorkspace.input.cmdCreateOrder.notes — input */
  @property() cmdCreateOrderNotes: string = '';
  /** state ui.posWorkspace.input.cmdCreateOrder.menuItemId — input */
  @property() cmdCreateOrderMenuItemId: string = '';
  /** state ui.posWorkspace.input.cmdCreateOrder.quantity — input */
  @property() cmdCreateOrderQuantity: string = '';
  /** state ui.posWorkspace.input.cmdCreateOrder.observations — input */
  @property() cmdCreateOrderObservations: string = '';
  /** state ui.posWorkspace.input.cmdCreateOrder.dailyShiftId — input */
  @property() cmdCreateOrderDailyShiftId: string = '';
  /** state ui.posWorkspace.output.cmdCreateOrder — commandOutput */
  @property() cmdCreateOrderOutput: CmdCreateOrderOutput | null = null;
  /** state ui.posWorkspace.action.cmdCreateOrder.error — actionError */
  @property() cmdCreateOrderError: string = '';
  /** state ui.posWorkspace.action.cmdUpdateOrderStatus.status — actionStatus, values: idle|loading|success|error */
  @property() cmdUpdateOrderStatusState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state ui.posWorkspace.input.cmdUpdateOrderStatus.orderId — input */
  @property() cmdUpdateOrderStatusOrderId: string = '';
  /** state ui.posWorkspace.input.cmdUpdateOrderStatus.status — input */
  @property() cmdUpdateOrderStatusStatus: string = '';
  /** state ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason — input */
  @property() cmdUpdateOrderStatusCancellationReason: string = '';
  /** state ui.posWorkspace.output.cmdUpdateOrderStatus — commandOutput */
  @property() cmdUpdateOrderStatusOutput: CmdUpdateOrderStatusOutput | null = null;
  /** state ui.posWorkspace.action.cmdUpdateOrderStatus.error — actionError */
  @property() cmdUpdateOrderStatusError: string = '';
  /** state ui.posWorkspace.action.cmdRecordBasicPayment.status — actionStatus, values: idle|loading|success|error */
  @property() cmdRecordBasicPaymentState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state ui.posWorkspace.input.cmdRecordBasicPayment.orderId — input */
  @property() cmdRecordBasicPaymentOrderId: string = '';
  /** state ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount — input */
  @property() cmdRecordBasicPaymentTotalAmount: string = '';
  /** state ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod — input */
  @property() cmdRecordBasicPaymentPaymentMethod: string = '';
  /** state ui.posWorkspace.input.cmdRecordBasicPayment.notes — input */
  @property() cmdRecordBasicPaymentNotes: string = '';
  /** state ui.posWorkspace.output.cmdRecordBasicPayment — commandOutput */
  @property() cmdRecordBasicPaymentOutput: CmdRecordBasicPaymentOutput | null = null;
  /** state ui.posWorkspace.action.cmdRecordBasicPayment.error — actionError */
  @property() cmdRecordBasicPaymentError: string = '';

  /** i18n catalog — MessageType keys are the CLOSED msg vocabulary for page renders */
  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.status = (getState('ui.posWorkspace.status') as string | undefined) ?? '';
    this.queryOpenOrdersState = (getState('ui.posWorkspace.action.queryOpenOrders.status') as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
    this.queryOpenOrdersDailyShiftId = (getState('ui.posWorkspace.input.queryOpenOrders.dailyShiftId') as string | undefined) ?? '';
    this.queryOpenOrdersStatus = (getState('ui.posWorkspace.input.queryOpenOrders.status') as string | undefined) ?? '';
    this.queryOpenOrdersOrderType = (getState('ui.posWorkspace.input.queryOpenOrders.orderType') as string | undefined) ?? '';
    this.queryOpenOrdersTableNumber = (getState('ui.posWorkspace.input.queryOpenOrders.tableNumber') as string | undefined) ?? '';
    this.queryOpenOrdersPage = (getState('ui.posWorkspace.input.queryOpenOrders.page') as string | undefined) ?? '';
    this.queryOpenOrdersPageSize = (getState('ui.posWorkspace.input.queryOpenOrders.pageSize') as string | undefined) ?? '';
    this.queryOpenOrdersData = (getState('ui.posWorkspace.data.queryOpenOrders') as QueryOpenOrdersOutput | undefined) ?? { orders: [], total: 0 };
    this.queryMenuItemsState = (getState('ui.posWorkspace.action.queryMenuItems.status') as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
    this.queryMenuItemsMenuCategoryId = (getState('ui.posWorkspace.input.queryMenuItems.menuCategoryId') as string | undefined) ?? '';
    this.queryMenuItemsData = (getState('ui.posWorkspace.data.queryMenuItems') as QueryMenuItemsOutput[] | undefined) ?? [];
    this.cmdCreateOrderState = (getState('ui.posWorkspace.action.cmdCreateOrder.status') as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
    this.cmdCreateOrderOrderType = (getState('ui.posWorkspace.input.cmdCreateOrder.orderType') as string | undefined) ?? '';
    this.cmdCreateOrderTableNumber = (getState('ui.posWorkspace.input.cmdCreateOrder.tableNumber') as string | undefined) ?? '';
    this.cmdCreateOrderCustomerName = (getState('ui.posWorkspace.input.cmdCreateOrder.customerName') as string | undefined) ?? '';
    this.cmdCreateOrderNotes = (getState('ui.posWorkspace.input.cmdCreateOrder.notes') as string | undefined) ?? '';
    this.cmdCreateOrderMenuItemId = (getState('ui.posWorkspace.input.cmdCreateOrder.menuItemId') as string | undefined) ?? '';
    this.cmdCreateOrderQuantity = (getState('ui.posWorkspace.input.cmdCreateOrder.quantity') as string | undefined) ?? '';
    this.cmdCreateOrderObservations = (getState('ui.posWorkspace.input.cmdCreateOrder.observations') as string | undefined) ?? '';
    this.cmdCreateOrderDailyShiftId = (getState('ui.posWorkspace.input.cmdCreateOrder.dailyShiftId') as string | undefined) ?? '';
    this.cmdCreateOrderOutput = (getState('ui.posWorkspace.output.cmdCreateOrder') as CmdCreateOrderOutput | null | undefined) ?? null;
    this.cmdCreateOrderError = (getState('ui.posWorkspace.action.cmdCreateOrder.error') as string | undefined) ?? '';
    this.cmdUpdateOrderStatusState = (getState('ui.posWorkspace.action.cmdUpdateOrderStatus.status') as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
    this.cmdUpdateOrderStatusOrderId = (getState('ui.posWorkspace.input.cmdUpdateOrderStatus.orderId') as string | undefined) ?? '';
    this.cmdUpdateOrderStatusStatus = (getState('ui.posWorkspace.input.cmdUpdateOrderStatus.status') as string | undefined) ?? '';
    this.cmdUpdateOrderStatusCancellationReason = (getState('ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason') as string | undefined) ?? '';
    this.cmdUpdateOrderStatusOutput = (getState('ui.posWorkspace.output.cmdUpdateOrderStatus') as CmdUpdateOrderStatusOutput | null | undefined) ?? null;
    this.cmdUpdateOrderStatusError = (getState('ui.posWorkspace.action.cmdUpdateOrderStatus.error') as string | undefined) ?? '';
    this.cmdRecordBasicPaymentState = (getState('ui.posWorkspace.action.cmdRecordBasicPayment.status') as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
    this.cmdRecordBasicPaymentOrderId = (getState('ui.posWorkspace.input.cmdRecordBasicPayment.orderId') as string | undefined) ?? '';
    this.cmdRecordBasicPaymentTotalAmount = (getState('ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount') as string | undefined) ?? '';
    this.cmdRecordBasicPaymentPaymentMethod = (getState('ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod') as string | undefined) ?? '';
    this.cmdRecordBasicPaymentNotes = (getState('ui.posWorkspace.input.cmdRecordBasicPayment.notes') as string | undefined) ?? '';
    this.cmdRecordBasicPaymentOutput = (getState('ui.posWorkspace.output.cmdRecordBasicPayment') as CmdRecordBasicPaymentOutput | null | undefined) ?? null;
    this.cmdRecordBasicPaymentError = (getState('ui.posWorkspace.action.cmdRecordBasicPayment.error') as string | undefined) ?? '';
    subscribe(POS_WORKSPACE_STATE_KEYS, this);
    void this.loadQueryMenuItems();
  }

  override disconnectedCallback(): void {
    unsubscribe(POS_WORKSPACE_STATE_KEYS, this);
    super.disconnectedCallback();
  }

  /** handleIcaStateChange — collabState notify contract */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.posWorkspace.status':
        this.status = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.action.queryOpenOrders.status':
        this.queryOpenOrdersState = (value as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.dailyShiftId':
        this.queryOpenOrdersDailyShiftId = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.status':
        this.queryOpenOrdersStatus = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.orderType':
        this.queryOpenOrdersOrderType = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.tableNumber':
        this.queryOpenOrdersTableNumber = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.page':
        this.queryOpenOrdersPage = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.pageSize':
        this.queryOpenOrdersPageSize = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.data.queryOpenOrders':
        this.queryOpenOrdersData = (value as QueryOpenOrdersOutput | undefined) ?? { orders: [], total: 0 };
        break;
      case 'ui.posWorkspace.action.queryMenuItems.status':
        this.queryMenuItemsState = (value as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.queryMenuItems.menuCategoryId':
        this.queryMenuItemsMenuCategoryId = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.data.queryMenuItems':
        this.queryMenuItemsData = (value as QueryMenuItemsOutput[] | undefined) ?? [];
        break;
      case 'ui.posWorkspace.action.cmdCreateOrder.status':
        this.cmdCreateOrderState = (value as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.orderType':
        this.cmdCreateOrderOrderType = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.tableNumber':
        this.cmdCreateOrderTableNumber = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.customerName':
        this.cmdCreateOrderCustomerName = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.notes':
        this.cmdCreateOrderNotes = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.menuItemId':
        this.cmdCreateOrderMenuItemId = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.quantity':
        this.cmdCreateOrderQuantity = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.observations':
        this.cmdCreateOrderObservations = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.dailyShiftId':
        this.cmdCreateOrderDailyShiftId = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.output.cmdCreateOrder':
        this.cmdCreateOrderOutput = (value as CmdCreateOrderOutput | null | undefined) ?? null;
        break;
      case 'ui.posWorkspace.action.cmdCreateOrder.error':
        this.cmdCreateOrderError = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.action.cmdUpdateOrderStatus.status':
        this.cmdUpdateOrderStatusState = (value as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.cmdUpdateOrderStatus.orderId':
        this.cmdUpdateOrderStatusOrderId = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdUpdateOrderStatus.status':
        this.cmdUpdateOrderStatusStatus = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason':
        this.cmdUpdateOrderStatusCancellationReason = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.output.cmdUpdateOrderStatus':
        this.cmdUpdateOrderStatusOutput = (value as CmdUpdateOrderStatusOutput | null | undefined) ?? null;
        break;
      case 'ui.posWorkspace.action.cmdUpdateOrderStatus.error':
        this.cmdUpdateOrderStatusError = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.action.cmdRecordBasicPayment.status':
        this.cmdRecordBasicPaymentState = (value as 'idle' | 'loading' | 'success' | 'error' | undefined) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.cmdRecordBasicPayment.orderId':
        this.cmdRecordBasicPaymentOrderId = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount':
        this.cmdRecordBasicPaymentTotalAmount = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod':
        this.cmdRecordBasicPaymentPaymentMethod = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdRecordBasicPayment.notes':
        this.cmdRecordBasicPaymentNotes = (value as string | undefined) ?? '';
        break;
      case 'ui.posWorkspace.output.cmdRecordBasicPayment':
        this.cmdRecordBasicPaymentOutput = (value as CmdRecordBasicPaymentOutput | null | undefined) ?? null;
        break;
      case 'ui.posWorkspace.action.cmdRecordBasicPayment.error':
        this.cmdRecordBasicPaymentError = (value as string | undefined) ?? '';
        break;
      default:
        break;
    }
    this.requestUpdate();
  }

  /** action queryOpenOrders (query) — route cafeFlow.posWorkspace.queryOpenOrders; inputs: dailyShiftId, status, orderType, tableNumber, page, pageSize; writes ui.posWorkspace.data.queryOpenOrders; status ui.posWorkspace.action.queryOpenOrders.status */
  async loadQueryOpenOrders(): Promise<void> {
    this.queryOpenOrdersState = 'loading';
    setState('ui.posWorkspace.action.queryOpenOrders.status', 'loading');
    const params: QueryOpenOrdersInput = {
      dailyShiftId: this.queryOpenOrdersDailyShiftId,
    };
    if (this.queryOpenOrdersStatus) {
      params.status = this.queryOpenOrdersStatus;
    }
    if (this.queryOpenOrdersOrderType) {
      params.orderType = this.queryOpenOrdersOrderType;
    }
    if (this.queryOpenOrdersTableNumber) {
      params.tableNumber = this.queryOpenOrdersTableNumber;
    }
    if (this.queryOpenOrdersPage !== '') {
      const pageNum = Number(this.queryOpenOrdersPage);
      if (!Number.isNaN(pageNum)) {
        params.page = pageNum;
      }
    }
    if (this.queryOpenOrdersPageSize !== '') {
      const pageSizeNum = Number(this.queryOpenOrdersPageSize);
      if (!Number.isNaN(pageSizeNum)) {
        params.pageSize = pageSizeNum;
      }
    }
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QueryOpenOrdersOutput>(queryOpenOrdersRoute, params, options);
    if (!response.ok) {
      this.queryOpenOrdersState = 'error';
      setState('ui.posWorkspace.action.queryOpenOrders.status', 'error');
      if (response.error) {
        console.error('queryOpenOrders failed', response.error);
      }
      return;
    }
    const data = response.data ?? DEFAULT_QUERY_OPEN_ORDERS;
    this.queryOpenOrdersData = data;
    setState('ui.posWorkspace.data.queryOpenOrders', data);
    this.queryOpenOrdersState = 'success';
    setState('ui.posWorkspace.action.queryOpenOrders.status', 'success');
  }

  /** handler for action queryOpenOrders — bind UI events here */
  handleQueryOpenOrdersClick(_event?: Event): void {
    void this.loadQueryOpenOrders();
  }

  /** action queryMenuItems (query) — route cafeFlow.posWorkspace.queryMenuItems; inputs: menuCategoryId; writes ui.posWorkspace.data.queryMenuItems; status ui.posWorkspace.action.queryMenuItems.status */
  async loadQueryMenuItems(): Promise<void> {
    this.queryMenuItemsState = 'loading';
    setState('ui.posWorkspace.action.queryMenuItems.status', 'loading');
    const params: QueryMenuItemsInput = {};
    if (this.queryMenuItemsMenuCategoryId) {
      params.menuCategoryId = this.queryMenuItemsMenuCategoryId;
    }
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QueryMenuItemsOutput[]>(queryMenuItemsRoute, params, options);
    if (!response.ok) {
      this.queryMenuItemsState = 'error';
      setState('ui.posWorkspace.action.queryMenuItems.status', 'error');
      if (response.error) {
        console.error('queryMenuItems failed', response.error);
      }
      return;
    }
    const data = response.data ?? [];
    this.queryMenuItemsData = data;
    setState('ui.posWorkspace.data.queryMenuItems', data);
    this.queryMenuItemsState = 'success';
    setState('ui.posWorkspace.action.queryMenuItems.status', 'success');
  }

  /** handler for action queryMenuItems — bind UI events here */
  handleQueryMenuItemsClick(_event?: Event): void {
    void this.loadQueryMenuItems();
  }

  /** action cmdCreateOrder (command) — route cafeFlow.posWorkspace.cmdCreateOrder; inputs: orderType, tableNumber, customerName, notes, menuItemId, quantity, observations, dailyShiftId; writes ui.posWorkspace.output.cmdCreateOrder; status ui.posWorkspace.action.cmdCreateOrder.status; feedback keys action.cmdCreateOrder.success / action.cmdCreateOrder.error */
  async cmdCreateOrder(): Promise<void> {
    this.cmdCreateOrderState = 'loading';
    setState('ui.posWorkspace.action.cmdCreateOrder.status', 'loading');
    this.cmdCreateOrderError = '';
    setState('ui.posWorkspace.action.cmdCreateOrder.error', '');
    const params: CmdCreateOrderInput = {
      orderType: this.cmdCreateOrderOrderType,
      menuItemId: this.cmdCreateOrderMenuItemId,
      quantity: Number(this.cmdCreateOrderQuantity) || 0,
      dailyShiftId: this.cmdCreateOrderDailyShiftId,
    };
    if (this.cmdCreateOrderTableNumber) {
      params.tableNumber = this.cmdCreateOrderTableNumber;
    }
    if (this.cmdCreateOrderCustomerName) {
      params.customerName = this.cmdCreateOrderCustomerName;
    }
    if (this.cmdCreateOrderNotes) {
      params.notes = this.cmdCreateOrderNotes;
    }
    if (this.cmdCreateOrderObservations) {
      params.observations = this.cmdCreateOrderObservations;
    }
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdCreateOrderOutput>(cmdCreateOrderRoute, params, options);
    if (!response.ok) {
      const errMsg = response.error?.message ?? '';
      this.cmdCreateOrderError = errMsg;
      setState('ui.posWorkspace.action.cmdCreateOrder.error', errMsg);
      this.cmdCreateOrderState = 'error';
      setState('ui.posWorkspace.action.cmdCreateOrder.status', 'error');
      if (response.error) {
        console.error('cmdCreateOrder failed', response.error);
      }
      return;
    }
    const data = response.data ?? null;
    this.cmdCreateOrderOutput = data;
    setState('ui.posWorkspace.output.cmdCreateOrder', data);
    try {
      await this.loadQueryOpenOrders();
      await this.loadQueryMenuItems();
    } catch (refreshErr) {
      this.cmdCreateOrderState = 'error';
      setState('ui.posWorkspace.action.cmdCreateOrder.status', 'error');
      console.error('cmdCreateOrder refresh failed', refreshErr);
      return;
    }
    if (this.queryOpenOrdersState === 'error' || this.queryMenuItemsState === 'error') {
      this.cmdCreateOrderState = 'error';
      setState('ui.posWorkspace.action.cmdCreateOrder.status', 'error');
      return;
    }
    this.cmdCreateOrderOrderType = '';
    setState('ui.posWorkspace.input.cmdCreateOrder.orderType', '');
    this.cmdCreateOrderTableNumber = '';
    setState('ui.posWorkspace.input.cmdCreateOrder.tableNumber', '');
    this.cmdCreateOrderCustomerName = '';
    setState('ui.posWorkspace.input.cmdCreateOrder.customerName', '');
    this.cmdCreateOrderNotes = '';
    setState('ui.posWorkspace.input.cmdCreateOrder.notes', '');
    this.cmdCreateOrderMenuItemId = '';
    setState('ui.posWorkspace.input.cmdCreateOrder.menuItemId', '');
    this.cmdCreateOrderQuantity = '';
    setState('ui.posWorkspace.input.cmdCreateOrder.quantity', '');
    this.cmdCreateOrderObservations = '';
    setState('ui.posWorkspace.input.cmdCreateOrder.observations', '');
    this.cmdCreateOrderDailyShiftId = '';
    setState('ui.posWorkspace.input.cmdCreateOrder.dailyShiftId', '');
    this.cmdCreateOrderState = 'success';
    setState('ui.posWorkspace.action.cmdCreateOrder.status', 'success');
  }

  /** handler for action cmdCreateOrder — bind UI events here */
  handleCmdCreateOrderClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdCreateOrder();
    });
  }

  /** action cmdUpdateOrderStatus (command) — route cafeFlow.posWorkspace.cmdUpdateOrderStatus; inputs: orderId, status, cancellationReason; writes ui.posWorkspace.output.cmdUpdateOrderStatus; status ui.posWorkspace.action.cmdUpdateOrderStatus.status; feedback keys action.cmdUpdateOrderStatus.success / action.cmdUpdateOrderStatus.error */
  async cmdUpdateOrderStatus(): Promise<void> {
    this.cmdUpdateOrderStatusState = 'loading';
    setState('ui.posWorkspace.action.cmdUpdateOrderStatus.status', 'loading');
    this.cmdUpdateOrderStatusError = '';
    setState('ui.posWorkspace.action.cmdUpdateOrderStatus.error', '');
    const params: CmdUpdateOrderStatusInput = {
      orderId: this.cmdUpdateOrderStatusOrderId,
      status: this.cmdUpdateOrderStatusStatus,
    };
    if (this.cmdUpdateOrderStatusCancellationReason) {
      params.cancellationReason = this.cmdUpdateOrderStatusCancellationReason;
    }
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdUpdateOrderStatusOutput>(cmdUpdateOrderStatusRoute, params, options);
    if (!response.ok) {
      const errMsg = response.error?.message ?? '';
      this.cmdUpdateOrderStatusError = errMsg;
      setState('ui.posWorkspace.action.cmdUpdateOrderStatus.error', errMsg);
      this.cmdUpdateOrderStatusState = 'error';
      setState('ui.posWorkspace.action.cmdUpdateOrderStatus.status', 'error');
      if (response.error) {
        console.error('cmdUpdateOrderStatus failed', response.error);
      }
      return;
    }
    const data = response.data ?? null;
    this.cmdUpdateOrderStatusOutput = data;
    setState('ui.posWorkspace.output.cmdUpdateOrderStatus', data);
    try {
      await this.loadQueryOpenOrders();
      await this.loadQueryMenuItems();
    } catch (refreshErr) {
      this.cmdUpdateOrderStatusState = 'error';
      setState('ui.posWorkspace.action.cmdUpdateOrderStatus.status', 'error');
      console.error('cmdUpdateOrderStatus refresh failed', refreshErr);
      return;
    }
    if (this.queryOpenOrdersState === 'error' || this.queryMenuItemsState === 'error') {
      this.cmdUpdateOrderStatusState = 'error';
      setState('ui.posWorkspace.action.cmdUpdateOrderStatus.status', 'error');
      return;
    }
    this.cmdUpdateOrderStatusOrderId = '';
    setState('ui.posWorkspace.input.cmdUpdateOrderStatus.orderId', '');
    this.cmdUpdateOrderStatusStatus = '';
    setState('ui.posWorkspace.input.cmdUpdateOrderStatus.status', '');
    this.cmdUpdateOrderStatusCancellationReason = '';
    setState('ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason', '');
    this.cmdUpdateOrderStatusState = 'success';
    setState('ui.posWorkspace.action.cmdUpdateOrderStatus.status', 'success');
  }

  /** handler for action cmdUpdateOrderStatus — bind UI events here */
  handleCmdUpdateOrderStatusClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdUpdateOrderStatus();
    });
  }

  /** action cmdRecordBasicPayment (command) — route cafeFlow.posWorkspace.cmdRecordBasicPayment; inputs: orderId, totalAmount, paymentMethod, notes; writes ui.posWorkspace.output.cmdRecordBasicPayment; status ui.posWorkspace.action.cmdRecordBasicPayment.status; feedback keys action.cmdRecordBasicPayment.success / action.cmdRecordBasicPayment.error */
  async cmdRecordBasicPayment(): Promise<void> {
    this.cmdRecordBasicPaymentState = 'loading';
    setState('ui.posWorkspace.action.cmdRecordBasicPayment.status', 'loading');
    this.cmdRecordBasicPaymentError = '';
    setState('ui.posWorkspace.action.cmdRecordBasicPayment.error', '');
    const params: CmdRecordBasicPaymentInput = {
      orderId: this.cmdRecordBasicPaymentOrderId,
      totalAmount: Number(this.cmdRecordBasicPaymentTotalAmount) || 0,
      paymentMethod: this.cmdRecordBasicPaymentPaymentMethod,
    };
    if (this.cmdRecordBasicPaymentNotes) {
      params.notes = this.cmdRecordBasicPaymentNotes;
    }
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdRecordBasicPaymentOutput>(cmdRecordBasicPaymentRoute, params, options);
    if (!response.ok) {
      const errMsg = response.error?.message ?? '';
      this.cmdRecordBasicPaymentError = errMsg;
      setState('ui.posWorkspace.action.cmdRecordBasicPayment.error', errMsg);
      this.cmdRecordBasicPaymentState = 'error';
      setState('ui.posWorkspace.action.cmdRecordBasicPayment.status', 'error');
      if (response.error) {
        console.error('cmdRecordBasicPayment failed', response.error);
      }
      return;
    }
    const data = response.data ?? null;
    this.cmdRecordBasicPaymentOutput = data;
    setState('ui.posWorkspace.output.cmdRecordBasicPayment', data);
    try {
      await this.loadQueryOpenOrders();
      await this.loadQueryMenuItems();
    } catch (refreshErr) {
      this.cmdRecordBasicPaymentState = 'error';
      setState('ui.posWorkspace.action.cmdRecordBasicPayment.status', 'error');
      console.error('cmdRecordBasicPayment refresh failed', refreshErr);
      return;
    }
    if (this.queryOpenOrdersState === 'error' || this.queryMenuItemsState === 'error') {
      this.cmdRecordBasicPaymentState = 'error';
      setState('ui.posWorkspace.action.cmdRecordBasicPayment.status', 'error');
      return;
    }
    this.cmdRecordBasicPaymentOrderId = '';
    setState('ui.posWorkspace.input.cmdRecordBasicPayment.orderId', '');
    this.cmdRecordBasicPaymentTotalAmount = '';
    setState('ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount', '');
    this.cmdRecordBasicPaymentPaymentMethod = '';
    setState('ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod', '');
    this.cmdRecordBasicPaymentNotes = '';
    setState('ui.posWorkspace.input.cmdRecordBasicPayment.notes', '');
    this.cmdRecordBasicPaymentState = 'success';
    setState('ui.posWorkspace.action.cmdRecordBasicPayment.status', 'success');
  }

  /** handler for action cmdRecordBasicPayment — bind UI events here */
  handleCmdRecordBasicPaymentClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.cmdRecordBasicPayment();
    });
  }

  /** setter for state ui.posWorkspace.input.queryOpenOrders.dailyShiftId */
  setQueryOpenOrdersDailyShiftId(value: string): void {
    this.queryOpenOrdersDailyShiftId = value;
    setState('ui.posWorkspace.input.queryOpenOrders.dailyShiftId', value);
    this.requestUpdate();
  }

  /** handler for action set.queryOpenOrdersDailyShiftId — bind UI events here */
  handleQueryOpenOrdersDailyShiftIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setQueryOpenOrdersDailyShiftId(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.queryOpenOrders.status */
  setQueryOpenOrdersStatus(value: string): void {
    this.queryOpenOrdersStatus = value;
    setState('ui.posWorkspace.input.queryOpenOrders.status', value);
    this.requestUpdate();
  }

  /** handler for action set.queryOpenOrdersStatus — bind UI events here */
  handleQueryOpenOrdersStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setQueryOpenOrdersStatus(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.queryOpenOrders.orderType */
  setQueryOpenOrdersOrderType(value: string): void {
    this.queryOpenOrdersOrderType = value;
    setState('ui.posWorkspace.input.queryOpenOrders.orderType', value);
    this.requestUpdate();
  }

  /** handler for action set.queryOpenOrdersOrderType — bind UI events here */
  handleQueryOpenOrdersOrderTypeChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setQueryOpenOrdersOrderType(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.queryOpenOrders.tableNumber */
  setQueryOpenOrdersTableNumber(value: string): void {
    this.queryOpenOrdersTableNumber = value;
    setState('ui.posWorkspace.input.queryOpenOrders.tableNumber', value);
    this.requestUpdate();
  }

  /** handler for action set.queryOpenOrdersTableNumber — bind UI events here */
  handleQueryOpenOrdersTableNumberChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setQueryOpenOrdersTableNumber(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.queryOpenOrders.page */
  setQueryOpenOrdersPage(value: string): void {
    this.queryOpenOrdersPage = value;
    setState('ui.posWorkspace.input.queryOpenOrders.page', value);
    this.requestUpdate();
  }

  /** handler for action set.queryOpenOrdersPage — bind UI events here */
  handleQueryOpenOrdersPageChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setQueryOpenOrdersPage(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.queryOpenOrders.pageSize */
  setQueryOpenOrdersPageSize(value: string): void {
    this.queryOpenOrdersPageSize = value;
    setState('ui.posWorkspace.input.queryOpenOrders.pageSize', value);
    this.requestUpdate();
  }

  /** handler for action set.queryOpenOrdersPageSize — bind UI events here */
  handleQueryOpenOrdersPageSizeChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setQueryOpenOrdersPageSize(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.queryMenuItems.menuCategoryId */
  setQueryMenuItemsMenuCategoryId(value: string): void {
    this.queryMenuItemsMenuCategoryId = value;
    setState('ui.posWorkspace.input.queryMenuItems.menuCategoryId', value);
    this.requestUpdate();
  }

  /** handler for action set.queryMenuItemsMenuCategoryId — bind UI events here */
  handleQueryMenuItemsMenuCategoryIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setQueryMenuItemsMenuCategoryId(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdCreateOrder.orderType */
  setCmdCreateOrderOrderType(value: string): void {
    this.cmdCreateOrderOrderType = value;
    setState('ui.posWorkspace.input.cmdCreateOrder.orderType', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateOrderOrderType — bind UI events here */
  handleCmdCreateOrderOrderTypeChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdCreateOrderOrderType(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdCreateOrder.tableNumber */
  setCmdCreateOrderTableNumber(value: string): void {
    this.cmdCreateOrderTableNumber = value;
    setState('ui.posWorkspace.input.cmdCreateOrder.tableNumber', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateOrderTableNumber — bind UI events here */
  handleCmdCreateOrderTableNumberChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdCreateOrderTableNumber(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdCreateOrder.customerName */
  setCmdCreateOrderCustomerName(value: string): void {
    this.cmdCreateOrderCustomerName = value;
    setState('ui.posWorkspace.input.cmdCreateOrder.customerName', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateOrderCustomerName — bind UI events here */
  handleCmdCreateOrderCustomerNameChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdCreateOrderCustomerName(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdCreateOrder.notes */
  setCmdCreateOrderNotes(value: string): void {
    this.cmdCreateOrderNotes = value;
    setState('ui.posWorkspace.input.cmdCreateOrder.notes', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateOrderNotes — bind UI events here */
  handleCmdCreateOrderNotesChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdCreateOrderNotes(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdCreateOrder.menuItemId */
  setCmdCreateOrderMenuItemId(value: string): void {
    this.cmdCreateOrderMenuItemId = value;
    setState('ui.posWorkspace.input.cmdCreateOrder.menuItemId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateOrderMenuItemId — bind UI events here */
  handleCmdCreateOrderMenuItemIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdCreateOrderMenuItemId(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdCreateOrder.quantity */
  setCmdCreateOrderQuantity(value: string): void {
    this.cmdCreateOrderQuantity = value;
    setState('ui.posWorkspace.input.cmdCreateOrder.quantity', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateOrderQuantity — bind UI events here */
  handleCmdCreateOrderQuantityChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdCreateOrderQuantity(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdCreateOrder.observations */
  setCmdCreateOrderObservations(value: string): void {
    this.cmdCreateOrderObservations = value;
    setState('ui.posWorkspace.input.cmdCreateOrder.observations', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateOrderObservations — bind UI events here */
  handleCmdCreateOrderObservationsChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdCreateOrderObservations(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdCreateOrder.dailyShiftId */
  setCmdCreateOrderDailyShiftId(value: string): void {
    this.cmdCreateOrderDailyShiftId = value;
    setState('ui.posWorkspace.input.cmdCreateOrder.dailyShiftId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdCreateOrderDailyShiftId — bind UI events here */
  handleCmdCreateOrderDailyShiftIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdCreateOrderDailyShiftId(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdUpdateOrderStatus.orderId */
  setCmdUpdateOrderStatusOrderId(value: string): void {
    this.cmdUpdateOrderStatusOrderId = value;
    setState('ui.posWorkspace.input.cmdUpdateOrderStatus.orderId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateOrderStatusOrderId — bind UI events here */
  handleCmdUpdateOrderStatusOrderIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdUpdateOrderStatusOrderId(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdUpdateOrderStatus.status */
  setCmdUpdateOrderStatusStatus(value: string): void {
    this.cmdUpdateOrderStatusStatus = value;
    setState('ui.posWorkspace.input.cmdUpdateOrderStatus.status', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateOrderStatusStatus — bind UI events here */
  handleCmdUpdateOrderStatusStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdUpdateOrderStatusStatus(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason */
  setCmdUpdateOrderStatusCancellationReason(value: string): void {
    this.cmdUpdateOrderStatusCancellationReason = value;
    setState('ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdUpdateOrderStatusCancellationReason — bind UI events here */
  handleCmdUpdateOrderStatusCancellationReasonChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdUpdateOrderStatusCancellationReason(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdRecordBasicPayment.orderId */
  setCmdRecordBasicPaymentOrderId(value: string): void {
    this.cmdRecordBasicPaymentOrderId = value;
    setState('ui.posWorkspace.input.cmdRecordBasicPayment.orderId', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdRecordBasicPaymentOrderId — bind UI events here */
  handleCmdRecordBasicPaymentOrderIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdRecordBasicPaymentOrderId(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount */
  setCmdRecordBasicPaymentTotalAmount(value: string): void {
    this.cmdRecordBasicPaymentTotalAmount = value;
    setState('ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdRecordBasicPaymentTotalAmount — bind UI events here */
  handleCmdRecordBasicPaymentTotalAmountChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdRecordBasicPaymentTotalAmount(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod */
  setCmdRecordBasicPaymentPaymentMethod(value: string): void {
    this.cmdRecordBasicPaymentPaymentMethod = value;
    setState('ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdRecordBasicPaymentPaymentMethod — bind UI events here */
  handleCmdRecordBasicPaymentPaymentMethodChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdRecordBasicPaymentPaymentMethod(target?.value ?? '');
  }

  /** setter for state ui.posWorkspace.input.cmdRecordBasicPayment.notes */
  setCmdRecordBasicPaymentNotes(value: string): void {
    this.cmdRecordBasicPaymentNotes = value;
    setState('ui.posWorkspace.input.cmdRecordBasicPayment.notes', value);
    this.requestUpdate();
  }

  /** handler for action set.cmdRecordBasicPaymentNotes — bind UI events here */
  handleCmdRecordBasicPaymentNotesChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdRecordBasicPaymentNotes(target?.value ?? '');
  }
}
