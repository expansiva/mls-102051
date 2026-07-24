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
  "section.shiftWorkspace.openShiftSection.title": "Abrir Turno",
  "organism.shiftWorkspace.openDailyShiftCmd.title": "Abrir turno diário",
  "intent.shiftWorkspace.openDailyShiftCmd.form.title": "Abrir turno diário",
  "intent.shiftWorkspace.openDailyShiftCmd.form.action.openDailyShiftCmd": "Abrir turno diário",
  "intent.shiftWorkspace.openDailyShiftCmd.form.field.shiftDate.label": "Shift Date",
  "intent.shiftWorkspace.openDailyShiftCmd.form.field.openedByUserId.label": "Opened By User Id",
  "intent.shiftWorkspace.openDailyShiftCmd.form.field.notes.label": "Notes",
  "section.shiftWorkspace.closeShiftSection.title": "Fechar Turno e Relatório",
  "organism.shiftWorkspace.closeDailyShiftCmd.title": "Fechar turno diário",
  "intent.shiftWorkspace.closeDailyShiftCmd.form.title": "Fechar turno diário",
  "intent.shiftWorkspace.closeDailyShiftCmd.form.action.closeDailyShiftCmd": "Fechar turno diário",
  "intent.shiftWorkspace.closeDailyShiftCmd.form.field.dailyShiftId.label": "Daily Shift Id",
  "intent.shiftWorkspace.closeDailyShiftCmd.form.field.cashTotal.label": "Cash Total",
  "intent.shiftWorkspace.closeDailyShiftCmd.form.field.otherPaymentsTotal.label": "Other Payments Total",
  "intent.shiftWorkspace.closeDailyShiftCmd.form.field.notes.label": "Notes",
  "intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedByUserId.label": "Closed By User Id",
  "intent.shiftWorkspace.closeDailyShiftCmd.form.field.closedAt.label": "Closed At",
  "organism.shiftWorkspace.getShiftClosingReport.title": "Ver relatório de fechamento de turno",
  "intent.shiftWorkspace.getShiftClosingReport.list.title": "Ver relatório de fechamento de turno",
  "intent.shiftWorkspace.getShiftClosingReport.list.empty": "Nenhum registro encontrado",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.shiftClosingReportId.label": "Shift Closing Report Id",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.dailyShiftId.label": "Daily Shift Id",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.shiftDate.label": "Shift Date",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.totalSalesAmount.label": "Total Sales Amount",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.totalOrdersCount.label": "Total Orders Count",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.totalItemsSold.label": "Total Items Sold",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.cashPaymentsAmount.label": "Cash Payments Amount",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.otherPaymentsAmount.label": "Other Payments Amount",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.topSellingItemsSummary.label": "Top Selling Items Summary",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.lowStockSignalsCount.label": "Low Stock Signals Count",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.stockoutSignalsCount.label": "Stockout Signals Count",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.closingNotes.label": "Closing Notes",
  "intent.shiftWorkspace.getShiftClosingReport.list.column.generatedAt.label": "Generated At",
  "section.shiftWorkspace.sec-shift-status.title": "Estado do Turno",
  "section.shiftWorkspace.sec-open-shift.title": "Abrir Turno",
  "section.shiftWorkspace.sec-close-shift.title": "Fechar Turno"
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

export class CafeFlowShiftWorkspaceBase extends CollabLitElement {
  /** state status — pageStatus */
  @property() status: string = '';
  /** state openDailyShiftCmdState — actionStatus, values: idle|loading|success|error */
  @property() openDailyShiftCmdState: "idle" | "loading" | "success" | "error" = 'idle';
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
  @property() closeDailyShiftCmdState: "idle" | "loading" | "success" | "error" = 'idle';
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
  @property() getShiftClosingReportState: "idle" | "loading" | "success" | "error" = 'idle';
  /** state getShiftClosingReportShiftClosingReportId — input */
  @property() getShiftClosingReportShiftClosingReportId: string = '';
  /** state getShiftClosingReportData — queryResult, outputShape: object */
  @property() getShiftClosingReportData: GetShiftClosingReportOutput | null = null;

  /** i18n catalog — MessageType keys are the CLOSED msg vocabulary for page renders */
  protected get msg(): MessageType {
    const lang: string = this.getMessageKey(messages);
    return messages[lang] || message_pt;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.status = (getState('ui.shiftWorkspace.status') as string | undefined) ?? '';
    this.openDailyShiftCmdState = (getState('ui.shiftWorkspace.action.openDailyShiftCmd.status') as "idle" | "loading" | "success" | "error" | undefined) ?? 'idle';
    this.openDailyShiftCmdShiftDate = (getState('ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate') as string | undefined) ?? '';
    this.openDailyShiftCmdOpenedByUserId = (getState('ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId') as string | undefined) ?? '';
    this.openDailyShiftCmdNotes = (getState('ui.shiftWorkspace.input.openDailyShiftCmd.notes') as string | undefined) ?? '';
    this.openDailyShiftCmdOutput = (getState('ui.shiftWorkspace.output.openDailyShiftCmd') as OpenDailyShiftCmdOutput | null | undefined) ?? null;
    this.openDailyShiftCmdError = (getState('ui.shiftWorkspace.action.openDailyShiftCmd.error') as string | undefined) ?? '';
    this.closeDailyShiftCmdState = (getState('ui.shiftWorkspace.action.closeDailyShiftCmd.status') as "idle" | "loading" | "success" | "error" | undefined) ?? 'idle';
    this.closeDailyShiftCmdDailyShiftId = (getState('ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId') as string | undefined) ?? '';
    this.closeDailyShiftCmdCashTotal = (getState('ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal') as string | undefined) ?? '';
    this.closeDailyShiftCmdOtherPaymentsTotal = (getState('ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal') as string | undefined) ?? '';
    this.closeDailyShiftCmdNotes = (getState('ui.shiftWorkspace.input.closeDailyShiftCmd.notes') as string | undefined) ?? '';
    this.closeDailyShiftCmdClosedByUserId = (getState('ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId') as string | undefined) ?? '';
    this.closeDailyShiftCmdClosedAt = (getState('ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt') as string | undefined) ?? '';
    this.closeDailyShiftCmdOutput = (getState('ui.shiftWorkspace.output.closeDailyShiftCmd') as CloseDailyShiftCmdOutput | null | undefined) ?? null;
    this.closeDailyShiftCmdError = (getState('ui.shiftWorkspace.action.closeDailyShiftCmd.error') as string | undefined) ?? '';
    this.getShiftClosingReportState = (getState('ui.shiftWorkspace.action.getShiftClosingReport.status') as "idle" | "loading" | "success" | "error" | undefined) ?? 'idle';
    this.getShiftClosingReportShiftClosingReportId = (getState('ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId') as string | undefined) ?? '';
    this.getShiftClosingReportData = (getState('ui.shiftWorkspace.data.getShiftClosingReport') as GetShiftClosingReportOutput | null | undefined) ?? null;
    subscribe(SUBSCRIBED_STATE_KEYS, this);
    this.syncRouteParamsFromLocation();
  }

  disconnectedCallback(): void {
    unsubscribe(SUBSCRIBED_STATE_KEYS, this);
    super.disconnectedCallback();
  }

  /** handleIcaStateChange — collabState notify contract */
  handleIcaStateChange(key: string, value: unknown): void {
    switch (key) {
      case 'ui.shiftWorkspace.status':
        this.status = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.action.openDailyShiftCmd.status':
        this.openDailyShiftCmdState = (value as "idle" | "loading" | "success" | "error") ?? 'idle';
        break;
      case 'ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate':
        this.openDailyShiftCmdShiftDate = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId':
        this.openDailyShiftCmdOpenedByUserId = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.input.openDailyShiftCmd.notes':
        this.openDailyShiftCmdNotes = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.output.openDailyShiftCmd':
        this.openDailyShiftCmdOutput = (value as OpenDailyShiftCmdOutput | null) ?? null;
        break;
      case 'ui.shiftWorkspace.action.openDailyShiftCmd.error':
        this.openDailyShiftCmdError = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.action.closeDailyShiftCmd.status':
        this.closeDailyShiftCmdState = (value as "idle" | "loading" | "success" | "error") ?? 'idle';
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId':
        this.closeDailyShiftCmdDailyShiftId = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal':
        this.closeDailyShiftCmdCashTotal = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal':
        this.closeDailyShiftCmdOtherPaymentsTotal = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.notes':
        this.closeDailyShiftCmdNotes = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId':
        this.closeDailyShiftCmdClosedByUserId = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt':
        this.closeDailyShiftCmdClosedAt = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.output.closeDailyShiftCmd':
        this.closeDailyShiftCmdOutput = (value as CloseDailyShiftCmdOutput | null) ?? null;
        break;
      case 'ui.shiftWorkspace.action.closeDailyShiftCmd.error':
        this.closeDailyShiftCmdError = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.action.getShiftClosingReport.status':
        this.getShiftClosingReportState = (value as "idle" | "loading" | "success" | "error") ?? 'idle';
        break;
      case 'ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId':
        this.getShiftClosingReportShiftClosingReportId = (value as string) ?? '';
        break;
      case 'ui.shiftWorkspace.data.getShiftClosingReport':
        this.getShiftClosingReportData = (value as GetShiftClosingReportOutput | null) ?? null;
        break;
      default:
        break;
    }
    this.requestUpdate();
  }

  private syncRouteParamsFromLocation(): void {
    const patternParts = '/cafeFlow/shiftWorkspace/:shiftClosingReportId?'.split('/').filter(Boolean);
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    const params: Record<string, string> = {};
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
    if (params['shiftClosingReportId'] !== undefined && params['shiftClosingReportId'] !== '') {
      this.getShiftClosingReportShiftClosingReportId = params['shiftClosingReportId'];
      setState('ui.shiftWorkspace.input.getShiftClosingReport.shiftClosingReportId', this.getShiftClosingReportShiftClosingReportId);
    }
  }

  /** action openDailyShiftCmd (command) — route cafeFlow.shiftWorkspace.openDailyShiftCmd; inputs: shiftDate, openedByUserId, notes; writes ui.shiftWorkspace.output.openDailyShiftCmd; status ui.shiftWorkspace.action.openDailyShiftCmd.status; feedback keys action.openDailyShiftCmd.success / action.openDailyShiftCmd.error */
  async openDailyShiftCmd(): Promise<void> {
    this.openDailyShiftCmdState = 'loading';
    setState('ui.shiftWorkspace.action.openDailyShiftCmd.status', 'loading');
    this.openDailyShiftCmdError = '';
    setState('ui.shiftWorkspace.action.openDailyShiftCmd.error', '');
    const params: OpenDailyShiftCmdInput = {
      shiftDate: this.openDailyShiftCmdShiftDate,
      openedByUserId: this.openDailyShiftCmdOpenedByUserId,
      notes: this.openDailyShiftCmdNotes || undefined,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<OpenDailyShiftCmdOutput>(openDailyShiftCmdRoute, params, options);
    if (!response.ok) {
      const errMsg = response.error?.message ?? '';
      this.openDailyShiftCmdError = errMsg;
      setState('ui.shiftWorkspace.action.openDailyShiftCmd.error', errMsg);
      this.openDailyShiftCmdState = 'error';
      setState('ui.shiftWorkspace.action.openDailyShiftCmd.status', 'error');
      return;
    }
    const out = response.data ?? null;
    this.openDailyShiftCmdOutput = out;
    setState('ui.shiftWorkspace.output.openDailyShiftCmd', out);
    try {
      await this.loadGetShiftClosingReport();
      if (this.getShiftClosingReportState === 'error') {
        this.openDailyShiftCmdState = 'error';
        setState('ui.shiftWorkspace.action.openDailyShiftCmd.status', 'error');
        return;
      }
    } catch {
      this.openDailyShiftCmdState = 'error';
      setState('ui.shiftWorkspace.action.openDailyShiftCmd.status', 'error');
      return;
    }
    this.openDailyShiftCmdShiftDate = '';
    setState('ui.shiftWorkspace.input.openDailyShiftCmd.shiftDate', '');
    this.openDailyShiftCmdOpenedByUserId = '';
    setState('ui.shiftWorkspace.input.openDailyShiftCmd.openedByUserId', '');
    this.openDailyShiftCmdNotes = '';
    setState('ui.shiftWorkspace.input.openDailyShiftCmd.notes', '');
    this.openDailyShiftCmdState = 'success';
    setState('ui.shiftWorkspace.action.openDailyShiftCmd.status', 'success');
  }

  /** handler for action openDailyShiftCmd — bind UI events here */
  handleOpenDailyShiftCmdClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.openDailyShiftCmd();
    });
  }

  /** action closeDailyShiftCmd (command) — route cafeFlow.shiftWorkspace.closeDailyShiftCmd; inputs: dailyShiftId, cashTotal, otherPaymentsTotal, notes, closedByUserId, closedAt; writes ui.shiftWorkspace.output.closeDailyShiftCmd; status ui.shiftWorkspace.action.closeDailyShiftCmd.status; feedback keys action.closeDailyShiftCmd.success / action.closeDailyShiftCmd.error */
  async closeDailyShiftCmd(): Promise<void> {
    this.closeDailyShiftCmdState = 'loading';
    setState('ui.shiftWorkspace.action.closeDailyShiftCmd.status', 'loading');
    this.closeDailyShiftCmdError = '';
    setState('ui.shiftWorkspace.action.closeDailyShiftCmd.error', '');
    const cashTotalRaw = this.closeDailyShiftCmdCashTotal;
    const otherPaymentsTotalRaw = this.closeDailyShiftCmdOtherPaymentsTotal;
    const params: CloseDailyShiftCmdInput = {
      dailyShiftId: this.closeDailyShiftCmdDailyShiftId,
      cashTotal: cashTotalRaw !== '' ? Number(cashTotalRaw) : undefined,
      otherPaymentsTotal: otherPaymentsTotalRaw !== '' ? Number(otherPaymentsTotalRaw) : undefined,
      notes: this.closeDailyShiftCmdNotes || undefined,
      closedByUserId: this.closeDailyShiftCmdClosedByUserId,
      closedAt: this.closeDailyShiftCmdClosedAt,
    };
    const options: BffClientOptions = { mode: 'blocking' };
    const response = await execBff<CloseDailyShiftCmdOutput>(closeDailyShiftCmdRoute, params, options);
    if (!response.ok) {
      const errMsg = response.error?.message ?? '';
      this.closeDailyShiftCmdError = errMsg;
      setState('ui.shiftWorkspace.action.closeDailyShiftCmd.error', errMsg);
      this.closeDailyShiftCmdState = 'error';
      setState('ui.shiftWorkspace.action.closeDailyShiftCmd.status', 'error');
      return;
    }
    const out = response.data ?? null;
    this.closeDailyShiftCmdOutput = out;
    setState('ui.shiftWorkspace.output.closeDailyShiftCmd', out);
    try {
      await this.loadGetShiftClosingReport();
      if (this.getShiftClosingReportState === 'error') {
        this.closeDailyShiftCmdState = 'error';
        setState('ui.shiftWorkspace.action.closeDailyShiftCmd.status', 'error');
        return;
      }
    } catch {
      this.closeDailyShiftCmdState = 'error';
      setState('ui.shiftWorkspace.action.closeDailyShiftCmd.status', 'error');
      return;
    }
    this.closeDailyShiftCmdDailyShiftId = '';
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.dailyShiftId', '');
    this.closeDailyShiftCmdCashTotal = '';
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.cashTotal', '');
    this.closeDailyShiftCmdOtherPaymentsTotal = '';
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.otherPaymentsTotal', '');
    this.closeDailyShiftCmdNotes = '';
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.notes', '');
    this.closeDailyShiftCmdClosedByUserId = '';
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.closedByUserId', '');
    this.closeDailyShiftCmdClosedAt = '';
    setState('ui.shiftWorkspace.input.closeDailyShiftCmd.closedAt', '');
    this.closeDailyShiftCmdState = 'success';
    setState('ui.shiftWorkspace.action.closeDailyShiftCmd.status', 'success');
  }

  /** handler for action closeDailyShiftCmd — bind UI events here */
  handleCloseDailyShiftCmdClick(_event?: Event): void {
    void runBlockingUiAction(async (_signal: AbortSignal) => {
      await this.closeDailyShiftCmd();
    });
  }

  /** action getShiftClosingReport (query) — route cafeFlow.shiftWorkspace.getShiftClosingReport; inputs: shiftClosingReportId; writes ui.shiftWorkspace.data.getShiftClosingReport; status ui.shiftWorkspace.action.getShiftClosingReport.status */
  async loadGetShiftClosingReport(): Promise<void> {
    this.syncRouteParamsFromLocation();
    const shiftClosingReportId = this.getShiftClosingReportShiftClosingReportId;
    if (!shiftClosingReportId) {
      this.getShiftClosingReportState = 'idle';
      setState('ui.shiftWorkspace.action.getShiftClosingReport.status', 'idle');
      this.getShiftClosingReportData = null;
      setState('ui.shiftWorkspace.data.getShiftClosingReport', null);
      return;
    }
    this.getShiftClosingReportState = 'loading';
    setState('ui.shiftWorkspace.action.getShiftClosingReport.status', 'loading');
    const params: GetShiftClosingReportInput = {
      shiftClosingReportId,
    };
    const options: BffClientOptions = { mode: 'silent' };
    const response = await execBff<GetShiftClosingReportOutput>(getShiftClosingReportRoute, params, options);
    if (!response.ok) {
      this.getShiftClosingReportState = 'error';
      setState('ui.shiftWorkspace.action.getShiftClosingReport.status', 'error');
      return;
    }
    const data = response.data ?? null;
    this.getShiftClosingReportData = data;
    setState('ui.shiftWorkspace.data.getShiftClosingReport', data);
    this.getShiftClosingReportState = 'success';
    setState('ui.shiftWorkspace.action.getShiftClosingReport.status', 'success');
  }

  /** handler for action getShiftClosingReport — bind UI events here */
  handleGetShiftClosingReportClick(_event?: Event): void {
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
    const value = target?.value ?? '';
    this.setOpenDailyShiftCmdShiftDate(value);
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
    const value = target?.value ?? '';
    this.setOpenDailyShiftCmdOpenedByUserId(value);
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
    const value = target?.value ?? '';
    this.setOpenDailyShiftCmdNotes(value);
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
    const value = target?.value ?? '';
    this.setCloseDailyShiftCmdDailyShiftId(value);
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
    const value = target?.value ?? '';
    this.setCloseDailyShiftCmdCashTotal(value);
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
    const value = target?.value ?? '';
    this.setCloseDailyShiftCmdOtherPaymentsTotal(value);
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
    const value = target?.value ?? '';
    this.setCloseDailyShiftCmdNotes(value);
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
    const value = target?.value ?? '';
    this.setCloseDailyShiftCmdClosedByUserId(value);
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
    const value = target?.value ?? '';
    this.setCloseDailyShiftCmdClosedAt(value);
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
    const value = target?.value ?? '';
    this.setGetShiftClosingReportShiftClosingReportId(value);
  }
}
