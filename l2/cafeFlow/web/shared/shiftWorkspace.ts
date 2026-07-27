/// <mls fileReference="_102051_/l2/cafeFlow/web/shared/shiftWorkspace.ts" enhancement="_102020_/l2/enhancementAura"/>

import { CollabLitElement } from '/_102029_/l2/collabLitElement.js';
import { property } from 'lit/decorators.js';
import { execBff, type BffClientOptions } from '/_102029_/l2/bffClient.js';
import { getState, setState, subscribe, unsubscribe } from '/_102029_/l2/collabState.js';
import { runBlockingUiAction } from '/_102029_/l2/interactionRuntime.js';
import type {
  OpenDailyShiftCmdInput,
  OpenDailyShiftCmdOutput,
  CloseDailyShiftCmdInput,
  CloseDailyShiftCmdOutput,
  GetShiftClosingReportInput,
  GetShiftClosingReportOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/shiftWorkspace.js';
import {
  openDailyShiftCmdRoute,
  closeDailyShiftCmdRoute,
  getShiftClosingReportRoute,
} from '/_102051_/l2/cafeFlow/web/contracts/shiftWorkspace.js';

export type {
  OpenDailyShiftCmdInput,
  OpenDailyShiftCmdOutput,
  CloseDailyShiftCmdInput,
  CloseDailyShiftCmdOutput,
  GetShiftClosingReportInput,
  GetShiftClosingReportOutput,
} from '/_102051_/l2/cafeFlow/web/contracts/shiftWorkspace.js';

/// **collab_i18n_start**
const message_pt = {
  'section.shiftWorkspace.openShiftSection.title': 'Abrir Turno',
  'organism.shiftWorkspace.openDailyShiftCmd.title': 'Abrir turno diário',
  'intent.shiftWorkspace.openDailyShiftCmd.form.title': 'Abrir turno diário',
  'intent.shiftWorkspace.openDailyShiftCmd.form.action.openDailyShiftCmd': 'Abrir turno diário',
  'intent.shiftWorkspace.openDailyShiftCmd.form.field.shiftDate.label': 'Shift Date',
  'intent.shiftWorkspace.openDailyShiftCmd.form.field.openedByUserId.label': 'Opened By User Id',
  'intent.shiftWorkspace.openDailyShiftCmd.form.field.notes.label': 'Notes',
  'section.shiftWorkspace.closeShiftSection.title': 'Fechar Turno e Relatório',
  'organism.shiftWorkspace.closeDailyShiftCmd.title': 'Fechar turno diário',
  'intent.shiftWorkspace.closeDailyShiftCmd.form.title': 'Fechar turno diário',
  'intent.shiftWorkspace.closeDailyShiftCmd.form.action.closeDailyShiftCmd': 'Fechar turno diário',
  'intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId.label': 'Daily Shift Id',
  'intent.shiftWorkspace.closeDailyShiftCmd.form.field.cashTotal.label': 'Cash Total',
  'intent.shiftWorkspace.closeDailyShiftCmd.form.field.otherPaymentsTotal.label': 'Other Payments Total',
  'intent.shiftWorkspace.closeDailyShiftCmd.form.field.notes.label': 'Notes',
  'intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedByUserId.label': 'Closed By User Id',
  'intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedAt.label': 'Closed At',
  'organism.shiftWorkspace.getShiftClosingReport.title': 'Ver relatório de fechamento de turno',
  'intent.shiftWorkspace.getShiftClosingReport.list.title': 'Ver relatório de fechamento de turno',
  'intent.shiftWorkspace.getShiftClosingReport.list.empty': 'Nenhum registro encontrado',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId.label': 'Shift Closing Report Id',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.dailyShiftId.label': 'Daily Shift Id',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate.label': 'Shift Date',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount.label': 'Total Sales Amount',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount.label': 'Total Orders Count',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold.label': 'Total Items Sold',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount.label': 'Cash Payments Amount',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount.label': 'Other Payments Amount',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.topSellingItemsSummary.label': 'Top Selling Items Summary',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.lowStockSignalsCount.label': 'Low Stock Signals Count',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.stockoutSignalsCount.label': 'Stockout Signals Count',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.closingNotes.label': 'Closing Notes',
  'intent.shiftWorkspace.getShiftClosingReport.list.column.generatedAt.label': 'Generated At',
  'section.shiftWorkspace.sec-shift-status.title': 'Estado do Turno',
  'section.shiftWorkspace.sec-open-shift.title': 'Abertura de Turno',
  'section.shiftWorkspace.sec-close-shift.title': 'Fechamento de Turno',
  'action.openDailyShiftCmd.success': 'Abrir turno diário',
  'action.openDailyShiftCmd.error': 'Abrir turno diário',
  'action.closeDailyShiftCmd.success': 'Fechar turno diário',
  'action.closeDailyShiftCmd.error': 'Fechar turno diário',
};
type MessageType = typeof message_pt;
const messages: { [key: string]: MessageType } = { pt: message_pt };
/// **collab_i18n_end**

const SUBSCRIBED_STATE_KEYS: string[] = [
  'ui.shiftWorkspace.status',
  'ui.shiftWorkspace.action.openDailyShiftCmd.status',
  'ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate',
  'ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId',
  'ui.shiftWorkspace.input.openDailyShiftCmd.notes',
  'ui.shiftWorkspace.output.openDailyShiftCmd',
  'ui.shiftWorkspace.action.openDailyShiftCmd.error',
  'ui.shiftWorkspace.action.closeDailyShiftCmd.status',
  'ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId',
  'ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal',
  'ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal',
  'ui.shiftWorkspace.input.closeDailyShiftCmd.notes',
  'ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId',
  'ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt',
  'ui.shiftWorkspace.output.closeDailyShiftCmd',
  'ui.shiftWorkspace.action.closeDailyShiftCmd.error',
  'ui.shiftWorkspace.action.getShiftClosingReport.status',
  'ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId',
  'ui.shiftWorkspace.data.getShiftClosingReport',
];

type ActionStatus = 'idle' | 'loading' | 'success' | 'error';

export class CafeFlowShiftWorkspaceBase extends CollabLitElement {
  /** state status — pageStatus */
  @property() status: string = '';

  /** state openDailyShiftCmdState — actionStatus, values: idle|loading|success|error */
  @property() openDailyShiftCmdState: ActionStatus = 'idle';

  /** state openDailyShiftCmdShiftDate — input */
  @property() openDailyShiftCmdShiftDate: string = '';

  /** state openDailyShiftCmdOpenedByUserId — input */
  @property() openDailyShiftCmdOpenedByUserId: string = '';

  /** state openDailyShiftCmdNotes — input */
  @property() openDailyShiftCmdNotes: string = '';

  /** state openDailyShiftCmdOutput — commandOutput */
  @property() openDailyShiftCmdOutput: OpenDailyShiftCmdOutput | null = null;

  /** state openDailyShiftCmdError — actionError */
  @property() openDailyShiftCmdError: string = '';

  /** state closeDailyShiftCmdState — actionStatus, values: idle|loading|success|error */
  @property() closeDailyShiftCmdState: ActionStatus = 'idle';

  /** state closeDailyShiftCmdDailyShiftId — input */
  @property() closeDailyShiftCmdDailyShiftId: string = '';

  /** state closeDailyShiftCmdCashTotal — input */
  @property() closeDailyShiftCmdCashTotal: string = '';

  /** state closeDailyShiftCmdOtherPaymentsTotal — input */
  @property() closeDailyShiftCmdOtherPaymentsTotal: string = '';

  /** state closeDailyShiftCmdNotes — input */
  @property() closeDailyShiftCmdNotes: string = '';

  /** state closeDailyShiftCmdClosedByUserId — input */
  @property() closeDailyShiftCmdClosedByUserId: string = '';

  /** state closeDailyShiftCmdClosedAt — input */
  @property() closeDailyShiftCmdClosedAt: string = '';

  /** state closeDailyShiftCmdOutput — commandOutput */
  @property() closeDailyShiftCmdOutput: CloseDailyShiftCmdOutput | null = null;

  /** state closeDailyShiftCmdError — actionError */
  @property() closeDailyShiftCmdError: string = '';

  /** state getShiftClosingReportState — actionStatus, values: idle|loading|success|error */
  @property() getShiftClosingReportState: ActionStatus = 'idle';

  /** state getShiftClosingReportShiftClosingReportId — input */
  @property() getShiftClosingReportShiftClosingReportId: string = '';

  /** state getShiftClosingReportData — queryResult, outputShape: object */
  @property() getShiftClosingReportData: GetShiftClosingReportOutput | null = null;

  /** i18n catalog — MessageType keys are the CLOSED msg vocabulary for page renders */
  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.status = this.readInitialString('ui.shiftWorkspace.status', '');
    this.openDailyShiftCmdState = this.readInitialActionStatus(
      'ui.shiftWorkspace.action.openDailyShiftCmd.status',
      'idle',
    );
    this.openDailyShiftCmdShiftDate = this.readInitialString(
      'ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate',
      '',
    );
    this.openDailyShiftCmdOpenedByUserId = this.readInitialString(
      'ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId',
      '',
    );
    this.openDailyShiftCmdNotes = this.readInitialString(
      'ui.shiftWorkspace.input.openDailyShiftCmd.notes',
      '',
    );
    this.openDailyShiftCmdOutput = this.readInitialObject<OpenDailyShiftCmdOutput>(
      'ui.shiftWorkspace.output.openDailyShiftCmd',
      null,
    );
    this.openDailyShiftCmdError = this.readInitialString(
      'ui.shiftWorkspace.action.openDailyShiftCmd.error',
      '',
    );
    this.closeDailyShiftCmdState = this.readInitialActionStatus(
      'ui.shiftWorkspace.action.closeDailyShiftCmd.status',
      'idle',
    );
    this.closeDailyShiftCmdDailyShiftId = this.readInitialString(
      'ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId',
      '',
    );
    this.closeDailyShiftCmdCashTotal = this.readInitialString(
      'ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal',
      '',
    );
    this.closeDailyShiftCmdOtherPaymentsTotal = this.readInitialString(
      'ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal',
      '',
    );
    this.closeDailyShiftCmdNotes = this.readInitialString(
      'ui.shiftWorkspace.input.closeDailyShiftCmd.notes',
      '',
    );
    this.closeDailyShiftCmdClosedByUserId = this.readInitialString(
      'ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId',
      '',
    );
    this.closeDailyShiftCmdClosedAt = this.readInitialString(
      'ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt',
      '',
    );
    this.closeDailyShiftCmdOutput = this.readInitialObject<CloseDailyShiftCmdOutput>(
      'ui.shiftWorkspace.output.closeDailyShiftCmd',
      null,
    );
    this.closeDailyShiftCmdError = this.readInitialString(
      'ui.shiftWorkspace.action.closeDailyShiftCmd.error',
      '',
    );
    this.getShiftClosingReportState = this.readInitialActionStatus(
      'ui.shiftWorkspace.action.getShiftClosingReport.status',
      'idle',
    );
    this.getShiftClosingReportShiftClosingReportId = this.readInitialString(
      'ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId',
      '',
    );
    this.getShiftClosingReportData = this.readInitialObject<GetShiftClosingReportOutput>(
      'ui.shiftWorkspace.data.getShiftClosingReport',
      null,
    );
    this.applyRouteParamsFromUrl();
    subscribe(SUBSCRIBED_STATE_KEYS, this);
  }

  override disconnectedCallback(): void {
    unsubscribe(SUBSCRIBED_STATE_KEYS, this);
    super.disconnectedCallback();
  }

  /** collabState notify hook — maps state keys back into class fields */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.shiftWorkspace.status':
        this.status = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.action.openDailyShiftCmd.status':
        this.openDailyShiftCmdState = this.asActionStatus(value);
        break;
      case 'ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate':
        this.openDailyShiftCmdShiftDate = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId':
        this.openDailyShiftCmdOpenedByUserId = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.input.openDailyShiftCmd.notes':
        this.openDailyShiftCmdNotes = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.output.openDailyShiftCmd':
        this.openDailyShiftCmdOutput = (value as OpenDailyShiftCmdOutput | null) ?? null;
        break;
      case 'ui.shiftWorkspace.action.openDailyShiftCmd.error':
        this.openDailyShiftCmdError = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.action.closeDailyShiftCmd.status':
        this.closeDailyShiftCmdState = this.asActionStatus(value);
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId':
        this.closeDailyShiftCmdDailyShiftId = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal':
        this.closeDailyShiftCmdCashTotal = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal':
        this.closeDailyShiftCmdOtherPaymentsTotal = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.notes':
        this.closeDailyShiftCmdNotes = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId':
        this.closeDailyShiftCmdClosedByUserId = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt':
        this.closeDailyShiftCmdClosedAt = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.output.closeDailyShiftCmd':
        this.closeDailyShiftCmdOutput = (value as CloseDailyShiftCmdOutput | null) ?? null;
        break;
      case 'ui.shiftWorkspace.action.closeDailyShiftCmd.error':
        this.closeDailyShiftCmdError = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.action.getShiftClosingReport.status':
        this.getShiftClosingReportState = this.asActionStatus(value);
        break;
      case 'ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId':
        this.getShiftClosingReportShiftClosingReportId = value == null ? '' : String(value);
        break;
      case 'ui.shiftWorkspace.data.getShiftClosingReport':
        this.getShiftClosingReportData = (value as GetShiftClosingReportOutput | null) ?? null;
        break;
      default:
        break;
    }
    this.requestUpdate();
  }

  /** action openDailyShiftCmd (command) — route cafeFlow.shiftWorkspace.openDailyShiftCmd; inputs: shiftDate, openedByUserId, notes; writes ui.shiftWorkspace.output.openDailyShiftCmd; status ui.shiftWorkspace.action.openDailyShiftCmd.status; feedback keys action.openDailyShiftCmd.success / action.openDailyShiftCmd.error */
  async openDailyShiftCmd(signal?: AbortSignal): Promise<void> {
    this.openDailyShiftCmdState = 'loading';
    setState('ui.shiftWorkspace.action.openDailyShiftCmd.status', 'loading');
    this.openDailyShiftCmdError = '';
    setState('ui.shiftWorkspace.action.openDailyShiftCmd.error', '');

    const params: OpenDailyShiftCmdInput = {
      shiftDate: this.openDailyShiftCmdShiftDate,
      openedByUserId: this.openDailyShiftCmdOpenedByUserId,
    };
    if (this.openDailyShiftCmdNotes !== '') {
      params.notes = this.openDailyShiftCmdNotes;
    }

    const options: BffClientOptions = { mode: 'blocking' };
    if (signal) {
      options.signal = signal;
    }

    const response = await execBff<OpenDailyShiftCmdOutput>(openDailyShiftCmdRoute, params, options);
    if (!response.ok) {
      const errorMessage = this.readErrorMessage(response.error);
      this.openDailyShiftCmdError = errorMessage;
      setState('ui.shiftWorkspace.action.openDailyShiftCmd.error', errorMessage);
      this.openDailyShiftCmdState = 'error';
      setState('ui.shiftWorkspace.action.openDailyShiftCmd.status', 'error');
      return;
    }

    const output = response.data ?? null;
    this.openDailyShiftCmdOutput = output;
    setState('ui.shiftWorkspace.output.openDailyShiftCmd', output);

    const refreshed = await this.loadGetShiftClosingReport(signal);
    if (!refreshed) {
      this.openDailyShiftCmdState = 'error';
      setState('ui.shiftWorkspace.action.openDailyShiftCmd.status', 'error');
      return;
    }

    this.setOpenDailyShiftCmdShiftDate('');
    this.setOpenDailyShiftCmdOpenedByUserId('');
    this.setOpenDailyShiftCmdNotes('');

    this.openDailyShiftCmdState = 'success';
    setState('ui.shiftWorkspace.action.openDailyShiftCmd.status', 'success');
  }

  /** handler for action openDailyShiftCmd — bind UI events here */
  handleOpenDailyShiftCmdClick(): void {
    void runBlockingUiAction(async (signal: AbortSignal) => {
      await this.openDailyShiftCmd(signal);
    });
  }

  /** action closeDailyShiftCmd (command) — route cafeFlow.shiftWorkspace.closeDailyShiftCmd; inputs: dailyShiftId, cashTotal, otherPaymentsTotal, notes, closedByUserId, closedAt; writes ui.shiftWorkspace.output.closeDailyShiftCmd; status ui.shiftWorkspace.action.closeDailyShiftCmd.status; feedback keys action.closeDailyShiftCmd.success / action.closeDailyShiftCmd.error */
  async closeDailyShiftCmd(signal?: AbortSignal): Promise<void> {
    this.closeDailyShiftCmdState = 'loading';
    setState('ui.shiftWorkspace.action.closeDailyShiftCmd.status', 'loading');
    this.closeDailyShiftCmdError = '';
    setState('ui.shiftWorkspace.action.closeDailyShiftCmd.error', '');

    const params: CloseDailyShiftCmdInput = {
      dailyShiftId: this.closeDailyShiftCmdDailyShiftId,
      closedByUserId: this.closeDailyShiftCmdClosedByUserId,
      closedAt: this.closeDailyShiftCmdClosedAt,
    };
    if (this.closeDailyShiftCmdCashTotal !== '') {
      const cashTotal = Number(this.closeDailyShiftCmdCashTotal);
      if (!Number.isNaN(cashTotal)) {
        params.cashTotal = cashTotal;
      }
    }
    if (this.closeDailyShiftCmdOtherPaymentsTotal !== '') {
      const otherPaymentsTotal = Number(this.closeDailyShiftCmdOtherPaymentsTotal);
      if (!Number.isNaN(otherPaymentsTotal)) {
        params.otherPaymentsTotal = otherPaymentsTotal;
      }
    }
    if (this.closeDailyShiftCmdNotes !== '') {
      params.notes = this.closeDailyShiftCmdNotes;
    }

    const options: BffClientOptions = { mode: 'blocking' };
    if (signal) {
      options.signal = signal;
    }

    const response = await execBff<CloseDailyShiftCmdOutput>(closeDailyShiftCmdRoute, params, options);
    if (!response.ok) {
      const errorMessage = this.readErrorMessage(response.error);
      this.closeDailyShiftCmdError = errorMessage;
      setState('ui.shiftWorkspace.action.closeDailyShiftCmd.error', errorMessage);
      this.closeDailyShiftCmdState = 'error';
      setState('ui.shiftWorkspace.action.closeDailyShiftCmd.status', 'error');
      return;
    }

    const output = response.data ?? null;
    this.closeDailyShiftCmdOutput = output;
    setState('ui.shiftWorkspace.output.closeDailyShiftCmd', output);

    if (output && output.shiftClosingReportId) {
      this.setGetShiftClosingReportShiftClosingReportId(output.shiftClosingReportId);
    }

    const refreshed = await this.loadGetShiftClosingReport(signal);
    if (!refreshed) {
      this.closeDailyShiftCmdState = 'error';
      setState('ui.shiftWorkspace.action.closeDailyShiftCmd.status', 'error');
      return;
    }

    this.setCloseDailyShiftCmdDailyShiftId('');
    this.setCloseDailyShiftCmdCashTotal('');
    this.setCloseDailyShiftCmdOtherPaymentsTotal('');
    this.setCloseDailyShiftCmdNotes('');
    this.setCloseDailyShiftCmdClosedByUserId('');
    this.setCloseDailyShiftCmdClosedAt('');

    this.closeDailyShiftCmdState = 'success';
    setState('ui.shiftWorkspace.action.closeDailyShiftCmd.status', 'success');
  }

  /** handler for action closeDailyShiftCmd — bind UI events here */
  handleCloseDailyShiftCmdClick(): void {
    void runBlockingUiAction(async (signal: AbortSignal) => {
      await this.closeDailyShiftCmd(signal);
    });
  }

  /** action getShiftClosingReport (query) — route cafeFlow.shiftWorkspace.getShiftClosingReport; inputs: shiftClosingReportId; writes ui.shiftWorkspace.data.getShiftClosingReport; status ui.shiftWorkspace.action.getShiftClosingReport.status */
  async loadGetShiftClosingReport(signal?: AbortSignal): Promise<boolean> {
    this.applyRouteParamsFromUrl();

    const shiftClosingReportId = this.getShiftClosingReportShiftClosingReportId;
    if (!shiftClosingReportId) {
      this.getShiftClosingReportState = 'idle';
      setState('ui.shiftWorkspace.action.getShiftClosingReport.status', 'idle');
      this.getShiftClosingReportData = null;
      setState('ui.shiftWorkspace.data.getShiftClosingReport', null);
      return true;
    }

    this.getShiftClosingReportState = 'loading';
    setState('ui.shiftWorkspace.action.getShiftClosingReport.status', 'loading');

    const params: GetShiftClosingReportInput = {
      shiftClosingReportId,
    };

    const options: BffClientOptions = { mode: 'silent' };
    if (signal) {
      options.signal = signal;
    }

    const response = await execBff<GetShiftClosingReportOutput>(
      getShiftClosingReportRoute,
      params,
      options,
    );
    if (!response.ok) {
      this.getShiftClosingReportState = 'error';
      setState('ui.shiftWorkspace.action.getShiftClosingReport.status', 'error');
      return false;
    }

    const data = response.data ?? null;
    this.getShiftClosingReportData = data;
    setState('ui.shiftWorkspace.data.getShiftClosingReport', data);
    this.getShiftClosingReportState = 'success';
    setState('ui.shiftWorkspace.action.getShiftClosingReport.status', 'success');
    return true;
  }

  /** handler for action getShiftClosingReport — bind UI events here */
  handleGetShiftClosingReportClick(): void {
    void this.loadGetShiftClosingReport();
  }

  /** setter for state ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate */
  setOpenDailyShiftCmdShiftDate(value: string): void {
    this.openDailyShiftCmdShiftDate = value;
    setState('ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate', value);
    this.requestUpdate();
  }

  /** handler for action set.openDailyShiftCmdShiftDate — bind UI events here */
  handleOpenDailyShiftCmdShiftDateChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setOpenDailyShiftCmdShiftDate(target?.value ?? '');
  }

  /** setter for state ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId */
  setOpenDailyShiftCmdOpenedByUserId(value: string): void {
    this.openDailyShiftCmdOpenedByUserId = value;
    setState('ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId', value);
    this.requestUpdate();
  }

  /** handler for action set.openDailyShiftCmdOpenedByUserId — bind UI events here */
  handleOpenDailyShiftCmdOpenedByUserIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setOpenDailyShiftCmdOpenedByUserId(target?.value ?? '');
  }

  /** setter for state ui.shiftWorkspace.input.openDailyShiftCmd.notes */
  setOpenDailyShiftCmdNotes(value: string): void {
    this.openDailyShiftCmdNotes = value;
    setState('ui.shiftWorkspace.input.openDailyShiftCmd.notes', value);
    this.requestUpdate();
  }

  /** handler for action set.openDailyShiftCmdNotes — bind UI events here */
  handleOpenDailyShiftCmdNotesChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setOpenDailyShiftCmdNotes(target?.value ?? '');
  }

  /** setter for state ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId */
  setCloseDailyShiftCmdDailyShiftId(value: string): void {
    this.closeDailyShiftCmdDailyShiftId = value;
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId', value);
    this.requestUpdate();
  }

  /** handler for action set.closeDailyShiftCmdDailyShiftId — bind UI events here */
  handleCloseDailyShiftCmdDailyShiftIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setCloseDailyShiftCmdDailyShiftId(target?.value ?? '');
  }

  /** setter for state ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal */
  setCloseDailyShiftCmdCashTotal(value: string): void {
    this.closeDailyShiftCmdCashTotal = value;
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal', value);
    this.requestUpdate();
  }

  /** handler for action set.closeDailyShiftCmdCashTotal — bind UI events here */
  handleCloseDailyShiftCmdCashTotalChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setCloseDailyShiftCmdCashTotal(target?.value ?? '');
  }

  /** setter for state ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal */
  setCloseDailyShiftCmdOtherPaymentsTotal(value: string): void {
    this.closeDailyShiftCmdOtherPaymentsTotal = value;
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal', value);
    this.requestUpdate();
  }

  /** handler for action set.closeDailyShiftCmdOtherPaymentsTotal — bind UI events here */
  handleCloseDailyShiftCmdOtherPaymentsTotalChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setCloseDailyShiftCmdOtherPaymentsTotal(target?.value ?? '');
  }

  /** setter for state ui.shiftWorkspace.input.closeDailyShiftCmd.notes */
  setCloseDailyShiftCmdNotes(value: string): void {
    this.closeDailyShiftCmdNotes = value;
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.notes', value);
    this.requestUpdate();
  }

  /** handler for action set.closeDailyShiftCmdNotes — bind UI events here */
  handleCloseDailyShiftCmdNotesChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setCloseDailyShiftCmdNotes(target?.value ?? '');
  }

  /** setter for state ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId */
  setCloseDailyShiftCmdClosedByUserId(value: string): void {
    this.closeDailyShiftCmdClosedByUserId = value;
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId', value);
    this.requestUpdate();
  }

  /** handler for action set.closeDailyShiftCmdClosedByUserId — bind UI events here */
  handleCloseDailyShiftCmdClosedByUserIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setCloseDailyShiftCmdClosedByUserId(target?.value ?? '');
  }

  /** setter for state ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt */
  setCloseDailyShiftCmdClosedAt(value: string): void {
    this.closeDailyShiftCmdClosedAt = value;
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt', value);
    this.requestUpdate();
  }

  /** handler for action set.closeDailyShiftCmdClosedAt — bind UI events here */
  handleCloseDailyShiftCmdClosedAtChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setCloseDailyShiftCmdClosedAt(target?.value ?? '');
  }

  /** setter for state ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId */
  setGetShiftClosingReportShiftClosingReportId(value: string): void {
    this.getShiftClosingReportShiftClosingReportId = value;
    setState('ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId', value);
    this.requestUpdate();
  }

  /** handler for action set.getShiftClosingReportShiftClosingReportId — bind UI events here */
  handleGetShiftClosingReportShiftClosingReportIdChange(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    this.setGetShiftClosingReportShiftClosingReportId(target?.value ?? '');
  }

  private applyRouteParamsFromUrl(): void {
    const pathname = window.location.pathname;
    const patternParts = '/cafeFlow/shiftWorkspace/:shiftClosingReportId?'.split('/').filter(Boolean);
    const pathParts = pathname.split('/').filter(Boolean);
    let shiftClosingReportId = '';
    for (let i = 0; i < patternParts.length; i++) {
      const part = patternParts[i];
      if (part.startsWith(':')) {
        const optional = part.endsWith('?');
        const rawName = optional ? part.slice(1, -1) : part.slice(1);
        const rawValue = pathParts[i];
        if (rawValue != null && rawValue !== '') {
          let decoded = rawValue;
          try {
            decoded = decodeURIComponent(rawValue);
          } catch {
            decoded = rawValue;
          }
          if (rawName === 'shiftClosingReportId') {
            shiftClosingReportId = decoded;
          }
        }
      }
    }
    if (shiftClosingReportId !== '') {
      this.getShiftClosingReportShiftClosingReportId = shiftClosingReportId;
      setState(
        'ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId',
        shiftClosingReportId,
      );
    }
  }

  private readInitialString(stateKey: string, fallback: string): string {
    const value = getState(stateKey);
    if (value === undefined || value === null) {
      return fallback;
    }
    return String(value);
  }

  private readInitialActionStatus(stateKey: string, fallback: ActionStatus): ActionStatus {
    const value = getState(stateKey);
    return this.asActionStatus(value, fallback);
  }

  private readInitialObject<T>(stateKey: string, fallback: T | null): T | null {
    const value = getState(stateKey);
    if (value === undefined) {
      return fallback;
    }
    return value as T | null;
  }

  private asActionStatus(value: unknown, fallback: ActionStatus = 'idle'): ActionStatus {
    if (value === 'idle' || value === 'loading' || value === 'success' || value === 'error') {
      return value;
    }
    return fallback;
  }

  private readErrorMessage(error: unknown): string {
    if (error == null) {
      return '';
    }
    if (typeof error === 'string') {
      return error;
    }
    if (typeof error === 'object' && 'message' in error) {
      const message = (error as { message?: unknown }).message;
      if (message == null) {
        return '';
      }
      return String(message);
    }
    return '';
  }
}
