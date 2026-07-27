/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/kitchenWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  FetchKitchenQueueOutput,
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
  "section.kitchenWorkspace.kitchenQueueSection.title": "Fila da Cozinha",
  "organism.kitchenWorkspace.fetchKitchenQueue.title": "Ver fila da cozinha",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.title": "Ver fila da cozinha",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.empty": "Nenhum registro encontrado",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderId.label": "Order Id",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.column.orderType.label": "Order Type",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.column.tableNumber.label": "Table Number",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.column.customerName.label": "Customer Name",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.column.notes.label": "Notes",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.column.status.label": "Status",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.column.confirmedAt.label": "Confirmed At",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.column.inPreparationAt.label": "In Preparation At",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.column.items.label": "Items",
  "intent.kitchenWorkspace.fetchKitchenQueue.list.filter.dailyShiftId.label": "Daily Shift Id",
  "organism.kitchenWorkspace.changeOrderStatus.title": "Atualizar status do pedido",
  "intent.kitchenWorkspace.changeOrderStatus.form.title": "Atualizar status do pedido",
  "intent.kitchenWorkspace.changeOrderStatus.form.action.changeOrderStatus": "Atualizar status do pedido",
  "intent.kitchenWorkspace.changeOrderStatus.form.field.status.label": "Status",
  "intent.kitchenWorkspace.changeOrderStatus.form.field.cancellationReason.label": "Cancellation Reason",
  "intent.kitchenWorkspace.changeOrderStatus.form.field.updatedAt.label": "Updated At",
  "section.kitchenWorkspace.sec-kitchen-queue.title": "Fila da Cozinha",
  "action.changeOrderStatus.success": "Status do pedido atualizado",
  "action.changeOrderStatus.error": "Nao foi possivel atualizar o status do pedido",
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

type ActionStatus = "idle" | "loading" | "success" | "error";

export class CafeFlowKitchenWorkspaceBase extends CollabLitElement {
  /** state ui.kitchenWorkspace.status — pageStatus */
  @property() status: string = "";
  /** state ui.kitchenWorkspace.action.fetchKitchenQueue.status — actionStatus, values: idle|loading|success|error */
  @property() fetchKitchenQueueState: ActionStatus = "idle";
  /** state ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId — input */
  @property() fetchKitchenQueueDailyShiftId: string = "";
  /** state ui.kitchenWorkspace.data.fetchKitchenQueue — queryResult, outputShape: array */
  @property() fetchKitchenQueueData: FetchKitchenQueueOutput[] = [];
  /** state ui.kitchenWorkspace.action.changeOrderStatus.status — actionStatus, values: idle|loading|success|error */
  @property() changeOrderStatusState: ActionStatus = "idle";
  /** state ui.kitchenWorkspace.input.changeOrderStatus.orderId — input */
  @property() changeOrderStatusOrderId: string = "";
  /** state ui.kitchenWorkspace.input.changeOrderStatus.status — input */
  @property() changeOrderStatusStatus: string = "";
  /** state ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason — input */
  @property() changeOrderStatusCancellationReason: string = "";
  /** state ui.kitchenWorkspace.input.changeOrderStatus.updatedAt — input */
  @property() changeOrderStatusUpdatedAt: string = "";
  /** state ui.kitchenWorkspace.output.changeOrderStatus — commandOutput */
  @property() changeOrderStatusOutput: ChangeOrderStatusOutput | null = null;
  /** state ui.kitchenWorkspace.action.changeOrderStatus.error — actionError */
  @property() changeOrderStatusError: string = "";

  private readonly _subscribedKeys: string[] = [
    "ui.kitchenWorkspace.status",
    "ui.kitchenWorkspace.action.fetchKitchenQueue.status",
    "ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId",
    "ui.kitchenWorkspace.data.fetchKitchenQueue",
    "ui.kitchenWorkspace.action.changeOrderStatus.status",
    "ui.kitchenWorkspace.input.changeOrderStatus.orderId",
    "ui.kitchenWorkspace.input.changeOrderStatus.status",
    "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason",
    "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt",
    "ui.kitchenWorkspace.output.changeOrderStatus",
    "ui.kitchenWorkspace.action.changeOrderStatus.error",
  ];

  /** i18n catalog — MessageType keys are the CLOSED msg vocabulary for page renders */
  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  private initStateValue(stateKey: string, fallback: unknown): unknown {
    const existing = getState(stateKey);
    return existing !== undefined && existing !== null ? existing : fallback;
  }

  private triggerUpdate(): void {
    const host = this as unknown as { requestUpdate?: () => void };
    if (typeof host.requestUpdate === "function") {
      host.requestUpdate();
    }
  }

  private callSuperConnected(): void {
    const proto = CollabLitElement.prototype as unknown as {
      connectedCallback?: () => void;
    };
    if (typeof proto.connectedCallback === "function") {
      proto.connectedCallback.call(this);
    }
  }

  private callSuperDisconnected(): void {
    const proto = CollabLitElement.prototype as unknown as {
      disconnectedCallback?: () => void;
    };
    if (typeof proto.disconnectedCallback === "function") {
      proto.disconnectedCallback.call(this);
    }
  }

  connectedCallback(): void {
    this.callSuperConnected();
    this.status = this.initStateValue("ui.kitchenWorkspace.status", "") as string;
    this.fetchKitchenQueueState = this.initStateValue(
      "ui.kitchenWorkspace.action.fetchKitchenQueue.status",
      "idle",
    ) as ActionStatus;
    this.fetchKitchenQueueDailyShiftId = this.initStateValue(
      "ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId",
      "",
    ) as string;
    this.fetchKitchenQueueData = this.initStateValue(
      "ui.kitchenWorkspace.data.fetchKitchenQueue",
      [],
    ) as FetchKitchenQueueOutput[];
    this.changeOrderStatusState = this.initStateValue(
      "ui.kitchenWorkspace.action.changeOrderStatus.status",
      "idle",
    ) as ActionStatus;
    this.changeOrderStatusOrderId = this.initStateValue(
      "ui.kitchenWorkspace.input.changeOrderStatus.orderId",
      "",
    ) as string;
    this.changeOrderStatusStatus = this.initStateValue(
      "ui.kitchenWorkspace.input.changeOrderStatus.status",
      "",
    ) as string;
    this.changeOrderStatusCancellationReason = this.initStateValue(
      "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason",
      "",
    ) as string;
    this.changeOrderStatusUpdatedAt = this.initStateValue(
      "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt",
      "",
    ) as string;
    this.changeOrderStatusOutput = this.initStateValue(
      "ui.kitchenWorkspace.output.changeOrderStatus",
      null,
    ) as ChangeOrderStatusOutput | null;
    this.changeOrderStatusError = this.initStateValue(
      "ui.kitchenWorkspace.action.changeOrderStatus.error",
      "",
    ) as string;
    subscribe(this._subscribedKeys, this);
  }

  disconnectedCallback(): void {
    unsubscribe(this._subscribedKeys, this);
    this.callSuperDisconnected();
  }

  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case "ui.kitchenWorkspace.status":
        this.status = (value as string) ?? "";
        break;
      case "ui.kitchenWorkspace.action.fetchKitchenQueue.status":
        this.fetchKitchenQueueState = (value as ActionStatus) ?? "idle";
        break;
      case "ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId":
        this.fetchKitchenQueueDailyShiftId = (value as string) ?? "";
        break;
      case "ui.kitchenWorkspace.data.fetchKitchenQueue":
        this.fetchKitchenQueueData = (value as FetchKitchenQueueOutput[]) ?? [];
        break;
      case "ui.kitchenWorkspace.action.changeOrderStatus.status":
        this.changeOrderStatusState = (value as ActionStatus) ?? "idle";
        break;
      case "ui.kitchenWorkspace.input.changeOrderStatus.orderId":
        this.changeOrderStatusOrderId = (value as string) ?? "";
        break;
      case "ui.kitchenWorkspace.input.changeOrderStatus.status":
        this.changeOrderStatusStatus = (value as string) ?? "";
        break;
      case "ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason":
        this.changeOrderStatusCancellationReason = (value as string) ?? "";
        break;
      case "ui.kitchenWorkspace.input.changeOrderStatus.updatedAt":
        this.changeOrderStatusUpdatedAt = (value as string) ?? "";
        break;
      case "ui.kitchenWorkspace.output.changeOrderStatus":
        this.changeOrderStatusOutput = (value as ChangeOrderStatusOutput | null) ?? null;
        break;
      case "ui.kitchenWorkspace.action.changeOrderStatus.error":
        this.changeOrderStatusError = (value as string) ?? "";
        break;
      default:
        break;
    }
    this.triggerUpdate();
  }

  /** action fetchKitchenQueue (query) — route cafeFlow.kitchenWorkspace.fetchKitchenQueue; inputs: dailyShiftId; writes ui.kitchenWorkspace.data.fetchKitchenQueue; status ui.kitchenWorkspace.action.fetchKitchenQueue.status */
  async loadFetchKitchenQueue(): Promise<void> {
    this.fetchKitchenQueueState = "loading";
    setState("ui.kitchenWorkspace.action.fetchKitchenQueue.status", "loading");
    const params = {
      dailyShiftId: this.fetchKitchenQueueDailyShiftId,
    };
    const options: BffClientOptions = { mode: "silent" };
    const response = await execBff<FetchKitchenQueueOutput[]>(
      fetchKitchenQueueRoute,
      params,
      options,
    );
    if (response.ok) {
      const data = response.data ?? [];
      this.fetchKitchenQueueData = data;
      setState("ui.kitchenWorkspace.data.fetchKitchenQueue", data);
      this.fetchKitchenQueueState = "success";
      setState("ui.kitchenWorkspace.action.fetchKitchenQueue.status", "success");
    } else {
      this.fetchKitchenQueueState = "error";
      setState("ui.kitchenWorkspace.action.fetchKitchenQueue.status", "error");
      if (response.error) {
        console.error("fetchKitchenQueue failed", response.error);
      }
    }
    this.triggerUpdate();
  }

  /** handler for action fetchKitchenQueue — bind UI events here */
  handleFetchKitchenQueueClick(_event?: Event): void {
    void this.loadFetchKitchenQueue();
  }

  /** action changeOrderStatus (command) — route cafeFlow.kitchenWorkspace.changeOrderStatus; inputs: orderId, status, cancellationReason, updatedAt; writes ui.kitchenWorkspace.output.changeOrderStatus; status ui.kitchenWorkspace.action.changeOrderStatus.status; feedback keys action.changeOrderStatus.success / action.changeOrderStatus.error */
  async changeOrderStatus(): Promise<void> {
    this.changeOrderStatusState = "loading";
    setState("ui.kitchenWorkspace.action.changeOrderStatus.status", "loading");
    this.changeOrderStatusError = "";
    setState("ui.kitchenWorkspace.action.changeOrderStatus.error", "");
    const params: {
      orderId: string;
      status: string;
      cancellationReason?: string;
      updatedAt: string;
    } = {
      orderId: this.changeOrderStatusOrderId,
      status: this.changeOrderStatusStatus,
      updatedAt: this.changeOrderStatusUpdatedAt,
    };
    if (this.changeOrderStatusCancellationReason) {
      params.cancellationReason = this.changeOrderStatusCancellationReason;
    }
    const options: BffClientOptions = { mode: "blocking" };
    const response = await execBff<ChangeOrderStatusOutput>(
      changeOrderStatusRoute,
      params,
      options,
    );
    if (!response.ok) {
      const errMsg =
        response.error?.message ||
        message_pt["action.changeOrderStatus.error"];
      this.changeOrderStatusError = errMsg;
      setState("ui.kitchenWorkspace.action.changeOrderStatus.error", errMsg);
      this.changeOrderStatusState = "error";
      setState("ui.kitchenWorkspace.action.changeOrderStatus.status", "error");
      this.triggerUpdate();
      return;
    }
    const data = response.data ?? null;
    this.changeOrderStatusOutput = data;
    setState("ui.kitchenWorkspace.output.changeOrderStatus", data);
    try {
      await this.loadFetchKitchenQueue();
      if (this.fetchKitchenQueueState === "error") {
        this.changeOrderStatusState = "error";
        setState("ui.kitchenWorkspace.action.changeOrderStatus.status", "error");
        this.triggerUpdate();
        return;
      }
    } catch (refreshError) {
      console.error("changeOrderStatus refresh failed", refreshError);
      this.changeOrderStatusState = "error";
      setState("ui.kitchenWorkspace.action.changeOrderStatus.status", "error");
      this.triggerUpdate();
      return;
    }
    this.changeOrderStatusOrderId = "";
    setState("ui.kitchenWorkspace.input.changeOrderStatus.orderId", "");
    this.changeOrderStatusStatus = "";
    setState("ui.kitchenWorkspace.input.changeOrderStatus.status", "");
    this.changeOrderStatusCancellationReason = "";
    setState("ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason", "");
    this.changeOrderStatusUpdatedAt = "";
    setState("ui.kitchenWorkspace.input.changeOrderStatus.updatedAt", "");
    this.changeOrderStatusState = "success";
    setState("ui.kitchenWorkspace.action.changeOrderStatus.status", "success");
    this.triggerUpdate();
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
    setState("ui.kitchenWorkspace.input.fetchKitchenQueue.dailyShiftId", value);
    this.triggerUpdate();
  }

  /** handler for action set.fetchKitchenQueueDailyShiftId — bind UI events here */
  handleFetchKitchenQueueDailyShiftIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? "";
    this.setFetchKitchenQueueDailyShiftId(value);
  }

  /** setter for state ui.kitchenWorkspace.input.changeOrderStatus.orderId */
  setChangeOrderStatusOrderId(value: string): void {
    this.changeOrderStatusOrderId = value;
    setState("ui.kitchenWorkspace.input.changeOrderStatus.orderId", value);
    const collection =
      (getState("ui.kitchenWorkspace.data.fetchKitchenQueue") as
        | FetchKitchenQueueOutput[]
        | null
        | undefined) ?? this.fetchKitchenQueueData;
    if (Array.isArray(collection) && collection.length > 0) {
      const item = collection.find(
        (row: FetchKitchenQueueOutput) => String(row.orderId) === String(value),
      );
      if (item) {
        if (item.status !== null && item.status !== undefined) {
          this.changeOrderStatusStatus = item.status;
          setState("ui.kitchenWorkspace.input.changeOrderStatus.status", item.status);
        }
      }
    }
    this.triggerUpdate();
  }

  /** handler for action set.changeOrderStatusOrderId — bind UI events here */
  handleChangeOrderStatusOrderIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? "";
    this.setChangeOrderStatusOrderId(value);
  }

  /** setter for state ui.kitchenWorkspace.input.changeOrderStatus.status */
  setChangeOrderStatusStatus(value: string): void {
    this.changeOrderStatusStatus = value;
    setState("ui.kitchenWorkspace.input.changeOrderStatus.status", value);
    this.triggerUpdate();
  }

  /** handler for action set.changeOrderStatusStatus — bind UI events here */
  handleChangeOrderStatusStatusChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? "";
    this.setChangeOrderStatusStatus(value);
  }

  /** setter for state ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason */
  setChangeOrderStatusCancellationReason(value: string): void {
    this.changeOrderStatusCancellationReason = value;
    setState("ui.kitchenWorkspace.input.changeOrderStatus.cancellationReason", value);
    this.triggerUpdate();
  }

  /** handler for action set.changeOrderStatusCancellationReason — bind UI events here */
  handleChangeOrderStatusCancellationReasonChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? "";
    this.setChangeOrderStatusCancellationReason(value);
  }

  /** setter for state ui.kitchenWorkspace.input.changeOrderStatus.updatedAt */
  setChangeOrderStatusUpdatedAt(value: string): void {
    this.changeOrderStatusUpdatedAt = value;
    setState("ui.kitchenWorkspace.input.changeOrderStatus.updatedAt", value);
    this.triggerUpdate();
  }

  /** handler for action set.changeOrderStatusUpdatedAt — bind UI events here */
  handleChangeOrderStatusUpdatedAtChange(event: Event): void {
    const target = event.target as HTMLInputElement | HTMLSelectElement | null;
    const value = target?.value ?? "";
    this.setChangeOrderStatusUpdatedAt(value);
  }
}
