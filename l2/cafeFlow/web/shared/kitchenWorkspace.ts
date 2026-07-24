/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  FetchKitchenQueueInput,
  FetchKitchenQueueOutput,
  ChangeOrderStatusInput,
  ChangeOrderStatusOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/kitchenWorkspace.js';
import {
  fetchKitchenQueueRoute,
  changeOrderStatusRoute,
} from '/_102051_/l2/cafeFlow/web/contracts/kitchenWorkspace.js';
export type {
  FetchKitchenQueueInput,
  FetchKitchenQueueOutput,
  ChangeOrderStatusInput,
  ChangeOrderStatusOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/kitchenWorkspace.js';

/// **collab_i18n_start**
const message_pt = {
  'section.kitchenWorkspace.kitchenQueueSection.title': 'Fila da Cozinha',
  'organism.kitchenWorkspace.fetchKitchenQueue.title': 'Ver fila da cozinha',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.title': 'Ver fila da cozinha',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.empty': 'Nenhum registro encontrado',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label': 'Order Id',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderType.label': 'Order Type',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.column.tableNumber.label': 'Table Number',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.column.customerName.label': 'Customer Name',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.column.notes.label': 'Notes',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.column.status.label': 'Status',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.column.confirmedAt.label': 'Confirmed At',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.column.inPreparationAt.label': 'In Preparation At',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.column.items.label': 'Items',
  'intent.kitchenWorkspace.fetchKitchenQueue.list.filter.dailyShiftId.label': 'Daily Shift Id',
  'organism.kitchenWorkspace.changeOrderStatus.title': 'Atualizar status do pedido',
  'intent.kitchenWorkspace.changeOrderStatus.form.title': 'Atualizar status do pedido',
  'intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus': 'Atualizar status do pedido',
  'intent.kitchenWorkspace.changeOrderStatus.form.field.status.label': 'Status',
  'intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason.label': 'Cancellation Reason',
  'intent.kitchenWorkspace.changeOrderStatus.form.field.updatedAt.label': 'Updated At',
  'section.kitchenWorkspace.kitchen-queue-section.title': 'Fila da Cozinha',
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

export class CafeFlowKitchenWorkspaceBase extends CollabLitElement {
  /** state status — pageStatus */
  @property() status: string = '';
  /** state fetchKitchenQueueState — actionStatus, values: idle|loading|success|error */
  @property() fetchKitchenQueueState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state fetchKitchenQueueDailyShiftId — input */
  @property() fetchKitchenQueueDailyShiftId: string = '';
  /** state fetchKitchenQueueData — queryResult, outputShape: array */
  @property() fetchKitchenQueueData: FetchKitchenQueueOutput[] = [];
  /** state changeOrderStatusState — actionStatus, values: idle|loading|success|error */
  @property() changeOrderStatusState: 'idle' | 'loading' | 'success' | 'error' = 'idle';
  /** state changeOrderStatusOrderId — input */
  @property() changeOrderStatusOrderId: string = '';
  /** state changeOrderStatusStatus — input */
  @property() changeOrderStatusStatus: string = '';
  /** state changeOrderStatusCancellationReason — input */
  @property() changeOrderStatusCancellationReason: string = '';
  /** state changeOrderStatusUpdatedAt — input */
  @property() changeOrderStatusUpdatedAt: string = '';
  /** state changeOrderStatusOutput — commandOutput */
  @property() changeOrderStatusOutput: ChangeOrderStatusOutput | null = null;
  /** state changeOrderStatusError — actionError */
  @property() changeOrderStatusError: string = '';

  private readonly subscribedKeys: string[] = [
    'ui.kitchenWorkspace.status',
    'ui.kitchenWorkspace.action.fetchKitchenQueue.status',
    'ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId',
    'ui.kitchenWorkspace.data.fetchKitchenQueue',
    'ui.kitchenWorkspace.action.changeOrderStatus.status',
    'ui.kitchenWorkspace.input.changeOrderStatus.orderId',
    'ui.kitchenWorkspace.input.changeOrderStatus.status',
    'ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason',
    'ui.kitchenWorkspace.input.changeOrderStatus.updatedAt',
    'ui.kitchenWorkspace.output.changeOrderStatus',
    'ui.kitchenWorkspace.action.changeOrderStatus.error',
  ];

  /** i18n catalog — MessageType keys are the CLOSED msg vocabulary for page renders */
  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.initStateValue('ui.kitchenWorkspace.status', 'status', '');
    this.initStateValue('ui.kitchenWorkspace.action.fetchKitchenQueue.status', 'fetchKitchenQueueState', 'idle');
    this.initStateValue('ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId', 'fetchKitchenQueueDailyShiftId', '');
    this.initStateValue('ui.kitchenWorkspace.data.fetchKitchenQueue', 'fetchKitchenQueueData', []);
    this.initStateValue('ui.kitchenWorkspace.action.changeOrderStatus.status', 'changeOrderStatusState', 'idle');
    this.initStateValue('ui.kitchenWorkspace.input.changeOrderStatus.orderId', 'changeOrderStatusOrderId', '');
    this.initStateValue('ui.kitchenWorkspace.input.changeOrderStatus.status', 'changeOrderStatusStatus', '');
    this.initStateValue('ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason', 'changeOrderStatusCancellationReason', '');
    this.initStateValue('ui.kitchenWorkspace.input.changeOrderStatus.updatedAt', 'changeOrderStatusUpdatedAt', '');
    this.initStateValue('ui.kitchenWorkspace.output.changeOrderStatus', 'changeOrderStatusOutput', null);
    this.initStateValue('ui.kitchenWorkspace.action.changeOrderStatus.error', 'changeOrderStatusError', '');
    subscribe(this.subscribedKeys, this);
  }

  disconnectedCallback(): void {
    unsubscribe(this.subscribedKeys, this);
    super.disconnectedCallback();
  }

  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.kitchenWorkspace.status':
        this.status = value as string;
        break;
      case 'ui.kitchenWorkspace.action.fetchKitchenQueue.status':
        this.fetchKitchenQueueState = value as 'idle' | 'loading' | 'success' | 'error';
        break;
      case 'ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId':
        this.fetchKitchenQueueDailyShiftId = value as string;
        break;
      case 'ui.kitchenWorkspace.data.fetchKitchenQueue':
        this.fetchKitchenQueueData = value as FetchKitchenQueueOutput[];
        break;
      case 'ui.kitchenWorkspace.action.changeOrderStatus.status':
        this.changeOrderStatusState = value as 'idle' | 'loading' | 'success' | 'error';
        break;
      case 'ui.kitchenWorkspace.input.changeOrderStatus.orderId':
        this.changeOrderStatusOrderId = value as string;
        break;
      case 'ui.kitchenWorkspace.input.changeOrderStatus.status':
        this.changeOrderStatusStatus = value as string;
        break;
      case 'ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason':
        this.changeOrderStatusCancellationReason = value as string;
        break;
      case 'ui.kitchenWorkspace.input.changeOrderStatus.updatedAt':
        this.changeOrderStatusUpdatedAt = value as string;
        break;
      case 'ui.kitchenWorkspace.output.changeOrderStatus':
        this.changeOrderStatusOutput = value as ChangeOrderStatusOutput | null;
        break;
      case 'ui.kitchenWorkspace.action.changeOrderStatus.error':
        this.changeOrderStatusError = value as string;
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

  /** action fetchKitchenQueue (query) — route cafeFlow.kitchenWorkspace.fetchKitchenQueue; inputs: dailyShiftId; writes ui.kitchenWorkspace.data.fetchKitchenQueue; status ui.kitchenWorkspace.action.fetchKitchenQueue.status */
  async loadFetchKitchenQueue(): Promise<void> {
    this.fetchKitchenQueueState = 'loading';
    setState('ui.kitchenWorkspace.action.fetchKitchenQueue.status', 'loading');
    const params: FetchKitchenQueueInput = {
      dailyShiftId: this.fetchKitchenQueueDailyShiftId,
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<FetchKitchenQueueOutput[]>(fetchKitchenQueueRoute, params, options);
    if (response.ok) {
      const data = response.data ?? [];
      this.fetchKitchenQueueData = data;
      setState('ui.kitchenWorkspace.data.fetchKitchenQueue', data);
      this.fetchKitchenQueueState = 'success';
      setState('ui.kitchenWorkspace.action.fetchKitchenQueue.status', 'success');
    } else {
      this.fetchKitchenQueueState = 'error';
      setState('ui.kitchenWorkspace.action.fetchKitchenQueue.status', 'error');
      if (response.error) {
        console.error('fetchKitchenQueue failed', response.error);
      }
    }
  }

  /** handler for action fetchKitchenQueue — bind UI events here */
  handleFetchKitchenQueueClick(_event?: Event): void {
    void this.loadFetchKitchenQueue();
  }

  /** action changeOrderStatus (command) — route cafeFlow.kitchenWorkspace.changeOrderStatus; inputs: orderId, status, cancellationReason, updatedAt; writes ui.kitchenWorkspace.output.changeOrderStatus; status ui.kitchenWorkspace.action.changeOrderStatus.status; feedback keys action.changeOrderStatus.success / action.changeOrderStatus.error */
  async changeOrderStatus(): Promise<void> {
    this.changeOrderStatusState = 'loading';
    setState('ui.kitchenWorkspace.action.changeOrderStatus.status', 'loading');
    this.changeOrderStatusError = '';
    setState('ui.kitchenWorkspace.action.changeOrderStatus.error', '');
    const params: ChangeOrderStatusInput = {
      orderId: this.changeOrderStatusOrderId,
      status: this.changeOrderStatusStatus,
      cancellationReason: this.changeOrderStatusCancellationReason || undefined,
      updatedAt: this.changeOrderStatusUpdatedAt,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<ChangeOrderStatusOutput>(changeOrderStatusRoute, params, options);
    if (response.ok) {
      const data = response.data ?? null;
      this.changeOrderStatusOutput = data;
      setState('ui.kitchenWorkspace.output.changeOrderStatus', data);
      try {
        await this.loadFetchKitchenQueue();
        if (this.fetchKitchenQueueState === 'error') {
          this.changeOrderStatusState = 'error';
          setState('ui.kitchenWorkspace.action.changeOrderStatus.status', 'error');
          return;
        }
      } catch (refreshError) {
        this.changeOrderStatusState = 'error';
        setState('ui.kitchenWorkspace.action.changeOrderStatus.status', 'error');
        console.error('changeOrderStatus refresh failed', refreshError);
        return;
      }
      this.changeOrderStatusOrderId = '';
      setState('ui.kitchenWorkspace.input.changeOrderStatus.orderId', '');
      this.changeOrderStatusStatus = '';
      setState('ui.kitchenWorkspace.input.changeOrderStatus.status', '');
      this.changeOrderStatusCancellationReason = '';
      setState('ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason', '');
      this.changeOrderStatusUpdatedAt = '';
      setState('ui.kitchenWorkspace.input.changeOrderStatus.updatedAt', '');
      this.changeOrderStatusState = 'success';
      setState('ui.kitchenWorkspace.action.changeOrderStatus.status', 'success');
    } else {
      const errorMessage = response.error?.message ?? '';
      this.changeOrderStatusError = errorMessage;
      setState('ui.kitchenWorkspace.action.changeOrderStatus.error', errorMessage);
      this.changeOrderStatusState = 'error';
      setState('ui.kitchenWorkspace.action.changeOrderStatus.status', 'error');
      if (response.error) {
        console.error('changeOrderStatus failed', response.error);
      }
    }
  }

  /** handler for action changeOrderStatus — bind UI events here */
  handleChangeOrderStatusClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.changeOrderStatus();
    });
  }

  /** setter for state ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId */
  setFetchKitchenQueueDailyShiftId(value: string): void {
    this.fetchKitchenQueueDailyShiftId = value;
    setState('ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId', value);
    this.requestUpdate();
  }

  /** handler for action set.fetchKitchenQueueDailyShiftId — bind UI events here */
  handleFetchKitchenQueueDailyShiftIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setFetchKitchenQueueDailyShiftId(value);
  }

  /** setter for state ui.kitchenWorkspace.input.changeOrderStatus.orderId */
  setChangeOrderStatusOrderId(value: string): void {
    this.changeOrderStatusOrderId = value;
    setState('ui.kitchenWorkspace.input.changeOrderStatus.orderId', value);
    const collectionRaw = getState('ui.kitchenWorkspace.data.fetchKitchenQueue') ?? this.fetchKitchenQueueData;
    const collection = Array.isArray(collectionRaw) ? (collectionRaw as FetchKitchenQueueOutput[]) : [];
    if (collection.length > 0) {
      const matched = collection.find((item: FetchKitchenQueueOutput) => String(item.orderId) === String(value));
      if (matched) {
        if (matched.status !== null && matched.status !== undefined) {
          this.changeOrderStatusStatus = matched.status;
          setState('ui.kitchenWorkspace.input.changeOrderStatus.status', matched.status);
        }
      }
    }
    this.requestUpdate();
  }

  /** handler for action set.changeOrderStatusOrderId — bind UI events here */
  handleChangeOrderStatusOrderIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setChangeOrderStatusOrderId(value);
  }

  /** setter for state ui.kitchenWorkspace.input.changeOrderStatus.status */
  setChangeOrderStatusStatus(value: string): void {
    this.changeOrderStatusStatus = value;
    setState('ui.kitchenWorkspace.input.changeOrderStatus.status', value);
    this.requestUpdate();
  }

  /** handler for action set.changeOrderStatusStatus — bind UI events here */
  handleChangeOrderStatusStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setChangeOrderStatusStatus(value);
  }

  /** setter for state ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason */
  setChangeOrderStatusCancellationReason(value: string): void {
    this.changeOrderStatusCancellationReason = value;
    setState('ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason', value);
    this.requestUpdate();
  }

  /** handler for action set.changeOrderStatusCancellationReason — bind UI events here */
  handleChangeOrderStatusCancellationReasonChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setChangeOrderStatusCancellationReason(value);
  }

  /** setter for state ui.kitchenWorkspace.input.changeOrderStatus.updatedAt */
  setChangeOrderStatusUpdatedAt(value: string): void {
    this.changeOrderStatusUpdatedAt = value;
    setState('ui.kitchenWorkspace.input.changeOrderStatus.updatedAt', value);
    this.requestUpdate();
  }

  /** handler for action set.changeOrderStatusUpdatedAt — bind UI events here */
  handleChangeOrderStatusUpdatedAtChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? '';
    this.setChangeOrderStatusUpdatedAt(value);
  }
}
