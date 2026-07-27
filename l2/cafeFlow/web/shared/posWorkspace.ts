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
  'section.posWorkspace.openOrdersSection.title': 'Pedidos Abertos',
  'organism.posWorkspace.queryOpenOrders.title': 'Acompanhar pedidos abertos',
  'intent.posWorkspace.queryOpenOrders.list.title': 'Acompanhar pedidos abertos',
  'intent.posWorkspace.queryOpenOrders.list.empty': 'Nenhum registro encontrado',
  'intent.posWorkspace.queryOpenOrders.list.column.orders.label': 'Orders',
  'intent.posWorkspace.queryOpenOrders.list.column.total.label': 'Total',
  'intent.posWorkspace.queryOpenOrders.list.filter.dailyShiftId.label': 'Daily Shift Id',
  'intent.posWorkspace.queryOpenOrders.list.filter.status.label': 'Status',
  'intent.posWorkspace.queryOpenOrders.list.filter.orderType.label': 'Order Type',
  'intent.posWorkspace.queryOpenOrders.list.filter.tableNumber.label': 'Table Number',
  'intent.posWorkspace.queryOpenOrders.list.filter.page.label': 'Page',
  'intent.posWorkspace.queryOpenOrders.list.filter.pageSize.label': 'Page Size',
  'organism.posWorkspace.cmdUpdateOrderStatus.title': 'Atualizar status do pedido',
  'intent.posWorkspace.cmdUpdateOrderStatus.form.title': 'Atualizar status do pedido',
  'intent.posWorkspace.cmdUpdateOrderStatus.form.action.cmdUpdateOrderStatus': 'Atualizar status do pedido',
  'intent.posWorkspace.cmdUpdateOrderStatus.form.field.status.label': 'Status',
  'intent.posWorkspace.cmdUpdateOrderStatus.form.field.cancellationReason.label': 'Cancellation Reason',
  'section.posWorkspace.createOrderSection.title': 'Lançar Pedido',
  'organism.posWorkspace.queryMenuItems.title': 'Consultar cardápio no POS',
  'intent.posWorkspace.queryMenuItems.list.title': 'Consultar cardápio no POS',
  'intent.posWorkspace.queryMenuItems.list.empty': 'Nenhum registro encontrado',
  'intent.posWorkspace.queryMenuItems.list.column.menuItemId.label': 'Menu Item Id',
  'intent.posWorkspace.queryMenuItems.list.column.menuCategoryId.label': 'Menu Category Id',
  'intent.posWorkspace.queryMenuItems.list.column.name.label': 'Name',
  'intent.posWorkspace.queryMenuItems.list.column.description.label': 'Description',
  'intent.posWorkspace.queryMenuItems.list.column.price.label': 'Price',
  'intent.posWorkspace.queryMenuItems.list.column.status.label': 'Status',
  'intent.posWorkspace.queryMenuItems.list.column.imageUrl.label': 'Image Url',
  'intent.posWorkspace.queryMenuItems.list.column.displayOrder.label': 'Display Order',
  'intent.posWorkspace.queryMenuItems.list.filter.menuCategoryId.label': 'Menu Category Id',
  'organism.posWorkspace.cmdCreateOrder.title': 'Registrar pedido',
  'intent.posWorkspace.cmdCreateOrder.form.title': 'Registrar pedido',
  'intent.posWorkspace.cmdCreateOrder.form.action.cmdCreateOrder': 'Registrar pedido',
  'intent.posWorkspace.cmdCreateOrder.form.field.orderType.label': 'Order Type',
  'intent.posWorkspace.cmdCreateOrder.form.field.tableNumber.label': 'Table Number',
  'intent.posWorkspace.cmdCreateOrder.form.field.customerName.label': 'Customer Name',
  'intent.posWorkspace.cmdCreateOrder.form.field.notes.label': 'Notes',
  'intent.posWorkspace.cmdCreateOrder.form.field.menuItemId.label': 'Menu Item Id',
  'intent.posWorkspace.cmdCreateOrder.form.field.quantity.label': 'Quantity',
  'intent.posWorkspace.cmdCreateOrder.form.field.observations.label': 'Observations',
  'intent.posWorkspace.cmdCreateOrder.form.field.dailyShiftId.label': 'Daily Shift Id',
  'section.posWorkspace.paymentSection.title': 'Registrar Pagamento',
  'organism.posWorkspace.cmdRecordBasicPayment.title': 'Registrar pagamento básico',
  'intent.posWorkspace.cmdRecordBasicPayment.form.title': 'Registrar pagamento básico',
  'intent.posWorkspace.cmdRecordBasicPayment.form.action.cmdRecordBasicPayment': 'Registrar pagamento básico',
  'intent.posWorkspace.cmdRecordBasicPayment.form.field.totalAmount.label': 'Total Amount',
  'intent.posWorkspace.cmdRecordBasicPayment.form.field.paymentMethod.label': 'Payment Method',
  'intent.posWorkspace.cmdRecordBasicPayment.form.field.notes.label': 'Notes',
  'section.posWorkspace.sec-open-orders.title': 'Pedidos Abertos do Turno',
  'section.posWorkspace.sec-create-order.title': 'Lançar Novo Pedido',
  'section.posWorkspace.sec-payment.title': 'Registrar Pagamento',
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

type ActionStatus = 'idle' | 'loading' | 'success' | 'error';

const QUERY_OPEN_ORDERS_DEFAULT: QueryOpenOrdersOutput = { orders: [], total: 0 };

export class CafeFlowPosWorkspaceBase extends CollabLitElement {
  /** state ui.posWorkspace.status — pageStatus */
  @property() status: string = '';
  /** state ui.posWorkspace.action.queryOpenOrders.status — actionStatus, values: idle|loading|success|error */
  @property() queryOpenOrdersState: ActionStatus = 'idle';
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
  @property() queryMenuItemsState: ActionStatus = 'idle';
  /** state ui.posWorkspace.input.queryMenuItems.menuCategoryId — input */
  @property() queryMenuItemsMenuCategoryId: string = '';
  /** state ui.posWorkspace.data.queryMenuItems — queryResult, outputShape: array */
  @property() queryMenuItemsData: QueryMenuItemsOutput[] = [];
  /** state ui.posWorkspace.action.cmdCreateOrder.status — actionStatus, values: idle|loading|success|error */
  @property() cmdCreateOrderState: ActionStatus = 'idle';
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
  @property() cmdUpdateOrderStatusState: ActionStatus = 'idle';
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
  @property() cmdRecordBasicPaymentState: ActionStatus = 'idle';
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

  private readonly _subscribedKeys: string[] = [
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

  /** i18n catalog — MessageType keys are the CLOSED msg vocabulary for page renders */
  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.initStateValues();
    subscribe(this._subscribedKeys, this);
    void this.loadQueryMenuItems();
  }

  override disconnectedCallback(): void {
    unsubscribe(this._subscribedKeys, this);
    super.disconnectedCallback();
  }

  /** notify contract — assign shared state into local fields and re-render */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.posWorkspace.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.action.queryOpenOrders.status':
        this.queryOpenOrdersState = (value as ActionStatus) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.dailyShiftId':
        this.queryOpenOrdersDailyShiftId = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.status':
        this.queryOpenOrdersStatus = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.orderType':
        this.queryOpenOrdersOrderType = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.tableNumber':
        this.queryOpenOrdersTableNumber = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.page':
        this.queryOpenOrdersPage = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.queryOpenOrders.pageSize':
        this.queryOpenOrdersPageSize = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.data.queryOpenOrders':
        this.queryOpenOrdersData = (value as QueryOpenOrdersOutput) ?? { orders: [], total: 0 };
        break;
      case 'ui.posWorkspace.action.queryMenuItems.status':
        this.queryMenuItemsState = (value as ActionStatus) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.queryMenuItems.menuCategoryId':
        this.queryMenuItemsMenuCategoryId = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.data.queryMenuItems':
        this.queryMenuItemsData = (value as QueryMenuItemsOutput[]) ?? [];
        break;
      case 'ui.posWorkspace.action.cmdCreateOrder.status':
        this.cmdCreateOrderState = (value as ActionStatus) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.orderType':
        this.cmdCreateOrderOrderType = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.tableNumber':
        this.cmdCreateOrderTableNumber = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.customerName':
        this.cmdCreateOrderCustomerName = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.notes':
        this.cmdCreateOrderNotes = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.menuItemId':
        this.cmdCreateOrderMenuItemId = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.quantity':
        this.cmdCreateOrderQuantity = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.observations':
        this.cmdCreateOrderObservations = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdCreateOrder.dailyShiftId':
        this.cmdCreateOrderDailyShiftId = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.output.cmdCreateOrder':
        this.cmdCreateOrderOutput = (value as CmdCreateOrderOutput | null) ?? null;
        break;
      case 'ui.posWorkspace.action.cmdCreateOrder.error':
        this.cmdCreateOrderError = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.action.cmdUpdateOrderStatus.status':
        this.cmdUpdateOrderStatusState = (value as ActionStatus) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.cmdUpdateOrderStatus.orderId':
        this.cmdUpdateOrderStatusOrderId = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdUpdateOrderStatus.status':
        this.cmdUpdateOrderStatusStatus = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason':
        this.cmdUpdateOrderStatusCancellationReason = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.output.cmdUpdateOrderStatus':
        this.cmdUpdateOrderStatusOutput = (value as CmdUpdateOrderStatusOutput | null) ?? null;
        break;
      case 'ui.posWorkspace.action.cmdUpdateOrderStatus.error':
        this.cmdUpdateOrderStatusError = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.action.cmdRecordBasicPayment.status':
        this.cmdRecordBasicPaymentState = (value as ActionStatus) ?? 'idle';
        break;
      case 'ui.posWorkspace.input.cmdRecordBasicPayment.orderId':
        this.cmdRecordBasicPaymentOrderId = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount':
        this.cmdRecordBasicPaymentTotalAmount = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod':
        this.cmdRecordBasicPaymentPaymentMethod = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.input.cmdRecordBasicPayment.notes':
        this.cmdRecordBasicPaymentNotes = (value as string) ?? '';
        break;
      case 'ui.posWorkspace.output.cmdRecordBasicPayment':
        this.cmdRecordBasicPaymentOutput = (value as CmdRecordBasicPaymentOutput | null) ?? null;
        break;
      case 'ui.posWorkspace.action.cmdRecordBasicPayment.error':
        this.cmdRecordBasicPaymentError = (value as string) ?? '';
        break;
      default:
        break;
    }
    this.requestUpdate();
  }

  private initStateValues(): void {
    const statusVal = getState('ui.posWorkspace.status');
    this.status = (statusVal as string | undefined) ?? '';
    const queryOpenOrdersStateVal = getState('ui.posWorkspace.action.queryOpenOrders.status');
    this.queryOpenOrdersState = (queryOpenOrdersStateVal as ActionStatus | undefined) ?? 'idle';
    const queryOpenOrdersDailyShiftIdVal = getState('ui.posWorkspace.input.queryOpenOrders.dailyShiftId');
    this.queryOpenOrdersDailyShiftId = (queryOpenOrdersDailyShiftIdVal as string | undefined) ?? '';
    const queryOpenOrdersStatusVal = getState('ui.posWorkspace.input.queryOpenOrders.status');
    this.queryOpenOrdersStatus = (queryOpenOrdersStatusVal as string | undefined) ?? '';
    const queryOpenOrdersOrderTypeVal = getState('ui.posWorkspace.input.queryOpenOrders.orderType');
    this.queryOpenOrdersOrderType = (queryOpenOrdersOrderTypeVal as string | undefined) ?? '';
    const queryOpenOrdersTableNumberVal = getState('ui.posWorkspace.input.queryOpenOrders.tableNumber');
    this.queryOpenOrdersTableNumber = (queryOpenOrdersTableNumberVal as string | undefined) ?? '';
    const queryOpenOrdersPageVal = getState('ui.posWorkspace.input.queryOpenOrders.page');
    this.queryOpenOrdersPage = (queryOpenOrdersPageVal as string | undefined) ?? '';
    const queryOpenOrdersPageSizeVal = getState('ui.posWorkspace.input.queryOpenOrders.pageSize');
    this.queryOpenOrdersPageSize = (queryOpenOrdersPageSizeVal as string | undefined) ?? '';
    const queryOpenOrdersDataVal = getState('ui.posWorkspace.data.queryOpenOrders');
    this.queryOpenOrdersData = (queryOpenOrdersDataVal as QueryOpenOrdersOutput | undefined) ?? { orders: [], total: 0 };
    const queryMenuItemsStateVal = getState('ui.posWorkspace.action.queryMenuItems.status');
    this.queryMenuItemsState = (queryMenuItemsStateVal as ActionStatus | undefined) ?? 'idle';
    const queryMenuItemsMenuCategoryIdVal = getState('ui.posWorkspace.input.queryMenuItems.menuCategoryId');
    this.queryMenuItemsMenuCategoryId = (queryMenuItemsMenuCategoryIdVal as string | undefined) ?? '';
    const queryMenuItemsDataVal = getState('ui.posWorkspace.data.queryMenuItems');
    this.queryMenuItemsData = (queryMenuItemsDataVal as QueryMenuItemsOutput[] | undefined) ?? [];
    const cmdCreateOrderStateVal = getState('ui.posWorkspace.action.cmdCreateOrder.status');
    this.cmdCreateOrderState = (cmdCreateOrderStateVal as ActionStatus | undefined) ?? 'idle';
    const cmdCreateOrderOrderTypeVal = getState('ui.posWorkspace.input.cmdCreateOrder.orderType');
    this.cmdCreateOrderOrderType = (cmdCreateOrderOrderTypeVal as string | undefined) ?? '';
    const cmdCreateOrderTableNumberVal = getState('ui.posWorkspace.input.cmdCreateOrder.tableNumber');
    this.cmdCreateOrderTableNumber = (cmdCreateOrderTableNumberVal as string | undefined) ?? '';
    const cmdCreateOrderCustomerNameVal = getState('ui.posWorkspace.input.cmdCreateOrder.customerName');
    this.cmdCreateOrderCustomerName = (cmdCreateOrderCustomerNameVal as string | undefined) ?? '';
    const cmdCreateOrderNotesVal = getState('ui.posWorkspace.input.cmdCreateOrder.notes');
    this.cmdCreateOrderNotes = (cmdCreateOrderNotesVal as string | undefined) ?? '';
    const cmdCreateOrderMenuItemIdVal = getState('ui.posWorkspace.input.cmdCreateOrder.menuItemId');
    this.cmdCreateOrderMenuItemId = (cmdCreateOrderMenuItemIdVal as string | undefined) ?? '';
    const cmdCreateOrderQuantityVal = getState('ui.posWorkspace.input.cmdCreateOrder.quantity');
    this.cmdCreateOrderQuantity = (cmdCreateOrderQuantityVal as string | undefined) ?? '';
    const cmdCreateOrderObservationsVal = getState('ui.posWorkspace.input.cmdCreateOrder.observations');
    this.cmdCreateOrderObservations = (cmdCreateOrderObservationsVal as string | undefined) ?? '';
    const cmdCreateOrderDailyShiftIdVal = getState('ui.posWorkspace.input.cmdCreateOrder.dailyShiftId');
    this.cmdCreateOrderDailyShiftId = (cmdCreateOrderDailyShiftIdVal as string | undefined) ?? '';
    const cmdCreateOrderOutputVal = getState('ui.posWorkspace.output.cmdCreateOrder');
    this.cmdCreateOrderOutput = (cmdCreateOrderOutputVal as CmdCreateOrderOutput | null | undefined) ?? null;
    const cmdCreateOrderErrorVal = getState('ui.posWorkspace.action.cmdCreateOrder.error');
    this.cmdCreateOrderError = (cmdCreateOrderErrorVal as string | undefined) ?? '';
    const cmdUpdateOrderStatusStateVal = getState('ui.posWorkspace.action.cmdUpdateOrderStatus.status');
    this.cmdUpdateOrderStatusState = (cmdUpdateOrderStatusStateVal as ActionStatus | undefined) ?? 'idle';
    const cmdUpdateOrderStatusOrderIdVal = getState('ui.posWorkspace.input.cmdUpdateOrderStatus.orderId');
    this.cmdUpdateOrderStatusOrderId = (cmdUpdateOrderStatusOrderIdVal as string | undefined) ?? '';
    const cmdUpdateOrderStatusStatusVal = getState('ui.posWorkspace.input.cmdUpdateOrderStatus.status');
    this.cmdUpdateOrderStatusStatus = (cmdUpdateOrderStatusStatusVal as string | undefined) ?? '';
    const cmdUpdateOrderStatusCancellationReasonVal = getState('ui.posWorkspace.input.cmdUpdateOrderStatus.cancellationReason');
    this.cmdUpdateOrderStatusCancellationReason = (cmdUpdateOrderStatusCancellationReasonVal as string | undefined) ?? '';
    const cmdUpdateOrderStatusOutputVal = getState('ui.posWorkspace.output.cmdUpdateOrderStatus');
    this.cmdUpdateOrderStatusOutput = (cmdUpdateOrderStatusOutputVal as CmdUpdateOrderStatusOutput | null | undefined) ?? null;
    const cmdUpdateOrderStatusErrorVal = getState('ui.posWorkspace.action.cmdUpdateOrderStatus.error');
    this.cmdUpdateOrderStatusError = (cmdUpdateOrderStatusErrorVal as string | undefined) ?? '';
    const cmdRecordBasicPaymentStateVal = getState('ui.posWorkspace.action.cmdRecordBasicPayment.status');
    this.cmdRecordBasicPaymentState = (cmdRecordBasicPaymentStateVal as ActionStatus | undefined) ?? 'idle';
    const cmdRecordBasicPaymentOrderIdVal = getState('ui.posWorkspace.input.cmdRecordBasicPayment.orderId');
    this.cmdRecordBasicPaymentOrderId = (cmdRecordBasicPaymentOrderIdVal as string | undefined) ?? '';
    const cmdRecordBasicPaymentTotalAmountVal = getState('ui.posWorkspace.input.cmdRecordBasicPayment.totalAmount');
    this.cmdRecordBasicPaymentTotalAmount = (cmdRecordBasicPaymentTotalAmountVal as string | undefined) ?? '';
    const cmdRecordBasicPaymentPaymentMethodVal = getState('ui.posWorkspace.input.cmdRecordBasicPayment.paymentMethod');
    this.cmdRecordBasicPaymentPaymentMethod = (cmdRecordBasicPaymentPaymentMethodVal as string | undefined) ?? '';
    const cmdRecordBasicPaymentNotesVal = getState('ui.posWorkspace.input.cmdRecordBasicPayment.notes');
    this.cmdRecordBasicPaymentNotes = (cmdRecordBasicPaymentNotesVal as string | undefined) ?? '';
    const cmdRecordBasicPaymentOutputVal = getState('ui.posWorkspace.output.cmdRecordBasicPayment');
    this.cmdRecordBasicPaymentOutput = (cmdRecordBasicPaymentOutputVal as CmdRecordBasicPaymentOutput | null | undefined) ?? null;
    const cmdRecordBasicPaymentErrorVal = getState('ui.posWorkspace.action.cmdRecordBasicPayment.error');
    this.cmdRecordBasicPaymentError = (cmdRecordBasicPaymentErrorVal as string | undefined) ?? '';
  }

  private readErrorMessage(error: unknown): string {
    if (error && typeof error === 'object' && 'message' in error) {
      const msg = (error as { message?: unknown }).message;
      if (msg !== undefined && msg !== null) return String(msg);
    }
    return '';
  }

  private parseOptionalNumber(raw: string): number | undefined {
    if (raw === '' || raw === undefined || raw === null) return undefined;
    const n = Number(raw);
    return Number.isFinite(n) ? n : undefined;
  }

  private parseRequiredNumber(raw: string): number {
    const n = Number(raw);
    return Number.isFinite(n) ? n : 0;
  }

  /** action queryOpenOrders (query) — route cafeFlow.posWorkspace.queryOpenOrders; inputs: dailyShiftId, status, orderType, tableNumber, page, pageSize; writes ui.posWorkspace.data.queryOpenOrders; status ui.posWorkspace.action.queryOpenOrders.status */
  async loadQueryOpenOrders(): Promise<void> {
    this.queryOpenOrdersState = 'loading';
    setState('ui.posWorkspace.action.queryOpenOrders.status', 'loading');
    const params: QueryOpenOrdersInput = {
      dailyShiftId: this.queryOpenOrdersDailyShiftId,
    };
    if (this.queryOpenOrdersStatus) params.status = this.queryOpenOrdersStatus;
    if (this.queryOpenOrdersOrderType) params.orderType = this.queryOpenOrdersOrderType;
    if (this.queryOpenOrdersTableNumber) params.tableNumber = this.queryOpenOrdersTableNumber;
    const page = this.parseOptionalNumber(this.queryOpenOrdersPage);
    if (page !== undefined) params.page = page;
    const pageSize = this.parseOptionalNumber(this.queryOpenOrdersPageSize);
    if (pageSize !== undefined) params.pageSize = pageSize;
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QueryOpenOrdersOutput>(queryOpenOrdersRoute, params, options);
    if (!response.ok) {
      this.queryOpenOrdersState = 'error';
      setState('ui.posWorkspace.action.queryOpenOrders.status', 'error');
      return;
    }
    const data = response.data ?? QUERY_OPEN_ORDERS_DEFAULT;
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
    if (this.queryMenuItemsMenuCategoryId) params.menuCategoryId = this.queryMenuItemsMenuCategoryId;
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<QueryMenuItemsOutput[]>(queryMenuItemsRoute, params, options);
    if (!response.ok) {
      this.queryMenuItemsState = 'error';
      setState('ui.posWorkspace.action.queryMenuItems.status', 'error');
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
      quantity: this.parseRequiredNumber(this.cmdCreateOrderQuantity),
      dailyShiftId: this.cmdCreateOrderDailyShiftId,
    };
    if (this.cmdCreateOrderTableNumber) params.tableNumber = this.cmdCreateOrderTableNumber;
    if (this.cmdCreateOrderCustomerName) params.customerName = this.cmdCreateOrderCustomerName;
    if (this.cmdCreateOrderNotes) params.notes = this.cmdCreateOrderNotes;
    if (this.cmdCreateOrderObservations) params.observations = this.cmdCreateOrderObservations;
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdCreateOrderOutput>(cmdCreateOrderRoute, params, options);
    if (!response.ok) {
      const errMsg = this.readErrorMessage(response.error);
      this.cmdCreateOrderError = errMsg;
      setState('ui.posWorkspace.action.cmdCreateOrder.error', errMsg);
      this.cmdCreateOrderState = 'error';
      setState('ui.posWorkspace.action.cmdCreateOrder.status', 'error');
      return;
    }
    const data = response.data ?? null;
    this.cmdCreateOrderOutput = data;
    setState('ui.posWorkspace.output.cmdCreateOrder', data);
    await this.loadQueryOpenOrders();
    await this.loadQueryMenuItems();
    if (this.queryOpenOrdersState === 'error' || this.queryMenuItemsState === 'error') {
      this.cmdCreateOrderState = 'error';
      setState('ui.posWorkspace.action.cmdCreateOrder.status', 'error');
      return;
    }
    this.setCmdCreateOrderOrderType('');
    this.setCmdCreateOrderTableNumber('');
    this.setCmdCreateOrderCustomerName('');
    this.setCmdCreateOrderNotes('');
    this.setCmdCreateOrderMenuItemId('');
    this.setCmdCreateOrderQuantity('');
    this.setCmdCreateOrderObservations('');
    this.setCmdCreateOrderDailyShiftId('');
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
      const errMsg = this.readErrorMessage(response.error);
      this.cmdUpdateOrderStatusError = errMsg;
      setState('ui.posWorkspace.action.cmdUpdateOrderStatus.error', errMsg);
      this.cmdUpdateOrderStatusState = 'error';
      setState('ui.posWorkspace.action.cmdUpdateOrderStatus.status', 'error');
      return;
    }
    const data = response.data ?? null;
    this.cmdUpdateOrderStatusOutput = data;
    setState('ui.posWorkspace.output.cmdUpdateOrderStatus', data);
    await this.loadQueryOpenOrders();
    await this.loadQueryMenuItems();
    if (this.queryOpenOrdersState === 'error' || this.queryMenuItemsState === 'error') {
      this.cmdUpdateOrderStatusState = 'error';
      setState('ui.posWorkspace.action.cmdUpdateOrderStatus.status', 'error');
      return;
    }
    this.setCmdUpdateOrderStatusOrderId('');
    this.setCmdUpdateOrderStatusStatus('');
    this.setCmdUpdateOrderStatusCancellationReason('');
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
      totalAmount: this.parseRequiredNumber(this.cmdRecordBasicPaymentTotalAmount),
      paymentMethod: this.cmdRecordBasicPaymentPaymentMethod,
    };
    if (this.cmdRecordBasicPaymentNotes) params.notes = this.cmdRecordBasicPaymentNotes;
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CmdRecordBasicPaymentOutput>(cmdRecordBasicPaymentRoute, params, options);
    if (!response.ok) {
      const errMsg = this.readErrorMessage(response.error);
      this.cmdRecordBasicPaymentError = errMsg;
      setState('ui.posWorkspace.action.cmdRecordBasicPayment.error', errMsg);
      this.cmdRecordBasicPaymentState = 'error';
      setState('ui.posWorkspace.action.cmdRecordBasicPayment.status', 'error');
      return;
    }
    const data = response.data ?? null;
    this.cmdRecordBasicPaymentOutput = data;
    setState('ui.posWorkspace.output.cmdRecordBasicPayment', data);
    await this.loadQueryOpenOrders();
    await this.loadQueryMenuItems();
    if (this.queryOpenOrdersState === 'error' || this.queryMenuItemsState === 'error') {
      this.cmdRecordBasicPaymentState = 'error';
      setState('ui.posWorkspace.action.cmdRecordBasicPayment.status', 'error');
      return;
    }
    this.setCmdRecordBasicPaymentOrderId('');
    this.setCmdRecordBasicPaymentTotalAmount('');
    this.setCmdRecordBasicPaymentPaymentMethod('');
    this.setCmdRecordBasicPaymentNotes('');
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
  }

  /** handler for action set.cmdRecordBasicPaymentNotes — bind UI events here */
  handleCmdRecordBasicPaymentNotesChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    this.setCmdRecordBasicPaymentNotes(target?.value ?? '');
  }
}
