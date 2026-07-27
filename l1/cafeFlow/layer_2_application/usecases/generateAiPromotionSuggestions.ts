/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/generateAiPromotionSuggestions.ts" enhancement="_blank"/>
import { AppError, type RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';
import { resolveRepository } from '/_102034_/l1/server/layer_2_application/repositoryRegistry.js';
import type { IAiPromotionSuggestionRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/aiPromotionSuggestionRepository.js';
import type { IOperationalDashboardRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/operationalDashboardRepository.js';
import type { IOrderRepository } from '/_102051_/l1/cafeFlow/layer_2_application/ports/orderRepository.js';
import type { AiPromotionSuggestion } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.js';
import { canExpireAiPromotionSuggestion } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/aiPromotionSuggestion.js';
import type { Order } from '/_102051_/l1/cafeFlow/layer_3_domain/entities/order.js';
export interface GenerateAiPromotionSuggestionsInput {
operationalDashboardId: string;
}
export interface GenerateAiPromotionSuggestionsOutput {
aiPromotionSuggestionId: string;
operationalDashboardId: string;
menuItemId: string;
menuItemName: string;
menuCategoryId?: string;
reason: string;
salesLast7Days: number;
salesToday?: number;
currentStockLevel?: number;
confidenceScore: number;
suggestedDiscountPercent?: number;
status: string;
generatedAt: string;
expiresAt?: string;
}
interface MenuItemSalesAgg {
menuItemId: string;
menuItemName: string;
salesLast7Days: number;
salesToday: number;
}
interface CafeFlowMenuItemDetails {
menuCategoryId?: string | null;
stockItemId?: string | null;
currentStockLevel?: number | null;
stockLevel?: number | null;
balance?: number | null;
}
interface CafeFlowStockItemDetails {
currentStockLevel?: number | null;
stockLevel?: number | null;
balance?: number | null;
quantityOnHand?: number | null;
}
function dayStartIso(dateStr: string): string {
return `${dateStr.slice(0, 10)}T00:00:00.000Z`;
}
function addDays(dateStr: string, days: number): string {
const base = new Date(dayStartIso(dateStr));
base.setUTCDate(base.getUTCDate() + days);
return base.toISOString().slice(0, 10);
}
function orderActivityAt(order: Order): string {
return order.registeredAt || order.createdAt;
}
function isCancelledOrder(order: Order): boolean {
return String(order.status) === 'cancelled';
}
function aggregateSalesByMenuItem(
orders: Order[],
referenceDate: string,
): Map<string, MenuItemSalesAgg> {
const today = referenceDate.slice(0, 10);
const fromDay = addDays(today, -6);
const fromIso = dayStartIso(fromDay);
const todayStart = dayStartIso(today);
const tomorrowStart = dayStartIso(addDays(today, 1));
const byItem = new Map<string, MenuItemSalesAgg>();
for (const order of orders) {
if (isCancelledOrder(order)) continue;
const at = orderActivityAt(order);
if (at < fromIso || at >= tomorrowStart) continue;
for (const item of order.items ?? []) {
if (String(item.status) === 'cancelled') continue;
const existing = byItem.get(item.menuItemId) ?? {
menuItemId: item.menuItemId,
menuItemName: item.menuItemName,
salesLast7Days: 0,
salesToday: 0,
};
existing.salesLast7Days += item.quantity;
if (at >= todayStart && at < tomorrowStart) {
existing.salesToday += item.quantity;
}
if (!existing.menuItemName && item.menuItemName) {
existing.menuItemName = item.menuItemName;
}
byItem.set(item.menuItemId, existing);
}
}
return byItem;
}
function readStockLevel(details: unknown): number | null {
if (details == null || typeof details !== 'object') return null;
const root = details as Record<string, unknown>;
const cafeFlow = (root.cafeFlow ?? null) as CafeFlowStockItemDetails | CafeFlowMenuItemDetails | null;
const candidates = [
cafeFlow?.currentStockLevel,
cafeFlow && 'stockLevel' in cafeFlow ? cafeFlow.stockLevel : null,
cafeFlow && 'balance' in cafeFlow ? cafeFlow.balance : null,
cafeFlow && 'quantityOnHand' in cafeFlow ? (cafeFlow as CafeFlowStockItemDetails).quantityOnHand : null,
];
for (const value of candidates) {
if (typeof value === 'number' && Number.isFinite(value) && value >= 0) {
return value;
}
}
return null;
}
function readMenuCategoryId(details: unknown): string | null {
if (details == null || typeof details !== 'object') return null;
const root = details as Record<string, unknown>;
const cafeFlow = (root.cafeFlow ?? null) as CafeFlowMenuItemDetails | null;
const categoryId = cafeFlow?.menuCategoryId;
return typeof categoryId === 'string' && categoryId.length > 0 ? categoryId : null;
}
function readStockItemId(details: unknown): string | null {
if (details == null || typeof details !== 'object') return null;
const root = details as Record<string, unknown>;
const cafeFlow = (root.cafeFlow ?? null) as CafeFlowMenuItemDetails | null;
const stockItemId = cafeFlow?.stockItemId;
return typeof stockItemId === 'string' && stockItemId.length > 0 ? stockItemId : null;
}
function computeConfidence(salesLast7Days: number, salesToday: number, stockLevel: number | null): number {
// Lower recent sales and higher stock increase promotion confidence.
const slowSalesScore = Math.max(0, 70 - salesLast7Days * 8);
const todayPenalty = Math.min(20, salesToday * 5);
const stockBoost =
stockLevel == null ? 10 : stockLevel <= 0 ? 0 : Math.min(30, Math.floor(stockLevel / 2) + 5);
const raw = slowSalesScore - todayPenalty + stockBoost;
return Math.max(0, Math.min(100, Math.round(raw)));
}
function computeSuggestedDiscountPercent(
salesLast7Days: number,
stockLevel: number | null,
): number | null {
if (salesLast7Days > 20 && (stockLevel == null || stockLevel < 5)) {
return null;
}
if (stockLevel != null && stockLevel >= 30 && salesLast7Days <= 3) {
return 20;
}
if (salesLast7Days <= 5) {
return 15;
}
if (salesLast7Days <= 12) {
return 10;
}
return null;
}
function buildReason(
salesLast7Days: number,
salesToday: number,
stockLevel: number | null,
): string {
const parts: string[] = [];
if (salesLast7Days <= 5) {
parts.push(`baixo volume de vendas nos últimos 7 dias (${salesLast7Days})`);
} else {
parts.push(`vendas moderadas/baixas nos últimos 7 dias (${salesLast7Days})`);
}
if (salesToday === 0) {
parts.push('sem vendas hoje');
}
if (stockLevel != null && stockLevel > 0) {
parts.push(`estoque disponível (${stockLevel})`);
} else if (stockLevel === 0) {
parts.push('estoque zerado — priorizar reposição antes de promover');
}
return `Sugestão de apoio à decisão: ${parts.join('; ')}.`;
}
function toOutput(suggestion: AiPromotionSuggestion): GenerateAiPromotionSuggestionsOutput {
const output: GenerateAiPromotionSuggestionsOutput = {
aiPromotionSuggestionId: suggestion.aiPromotionSuggestionId,
operationalDashboardId: suggestion.operationalDashboardId,
menuItemId: suggestion.menuItemId,
menuItemName: suggestion.menuItemName,
reason: suggestion.reason,
salesLast7Days: suggestion.salesLast7Days,
confidenceScore: suggestion.confidenceScore,
status: suggestion.status,
generatedAt: suggestion.generatedAt,
};
if (suggestion.menuCategoryId != null) {
output.menuCategoryId = suggestion.menuCategoryId;
}
if (suggestion.salesToday != null) {
output.salesToday = suggestion.salesToday;
}
if (suggestion.currentStockLevel != null) {
output.currentStockLevel = suggestion.currentStockLevel;
}
if (suggestion.suggestedDiscountPercent != null) {
output.suggestedDiscountPercent = suggestion.suggestedDiscountPercent;
}
if (suggestion.expiresAt != null) {
output.expiresAt = suggestion.expiresAt;
}
return output;
}
function isFreshPending(suggestion: AiPromotionSuggestion, nowIso: string): boolean {
if (String(suggestion.status) !== 'pending') return false;
if (canExpireAiPromotionSuggestion(suggestion, nowIso)) return false;
return true;
}
export async function generateAiPromotionSuggestions(
ctx: RequestContext,
input: GenerateAiPromotionSuggestionsInput,
): Promise<GenerateAiPromotionSuggestionsOutput[]> {
if (!input.operationalDashboardId || input.operationalDashboardId.trim().length === 0) {
throw new AppError(
'VALIDATION_ERROR',
'operationalDashboardId is required.',
400,
{ field: 'operationalDashboardId' },
);
}
const dashboards = resolveRepository<IOperationalDashboardRepository>(ctx, 'OperationalDashboard');
const ordersRepo = resolveRepository<IOrderRepository>(ctx, 'Order');
const suggestionsRepo = resolveRepository<IAiPromotionSuggestionRepository>(ctx, 'AiPromotionSuggestion');
const dashboard = await dashboards.getById(input.operationalDashboardId);
if (!dashboard) {
throw new AppError(
'NOT_FOUND',
`OperationalDashboard not found: ${input.operationalDashboardId}`,
404,
{ operationalDashboardId: input.operationalDashboardId },
);
}
const nowIso = ctx.clock.nowIso();
const referenceDate = (dashboard.referenceDate || nowIso).slice(0, 10);
const existing = await suggestionsRepo.list({
operationalDashboardId: input.operationalDashboardId,
});
const freshPending = existing
.filter((s) => isFreshPending(s, nowIso))
.sort((a, b) => b.confidenceScore - a.confidenceScore);
if (freshPending.length > 0) {
// rule: aiPromotionSuggestionsAreDecisionSupport
return freshPending.map(toOutput);
}
const orders = await ordersRepo.list({});
const salesByItem = aggregateSalesByMenuItem(orders, referenceDate);
const menuItemIds = [...salesByItem.keys()];
const menuEntities =
menuItemIds.length > 0
? await ctx.mdm.collection.getMany({ mdmIds: menuItemIds })
: [];
const menuById = new Map(menuEntities.map((e) => [e.mdmId, e]));
const stockItemIds = [
...new Set(
menuEntities
.map((e) => readStockItemId((e as unknown as { details?: unknown }).details))
.filter((id): id is string => typeof id === 'string' && id.length > 0),
),
];
const stockEntities =
stockItemIds.length > 0
? await ctx.mdm.collection.getMany({ mdmIds: stockItemIds })
: [];
const stockById = new Map(stockEntities.map((e) => [e.mdmId, e]));
const candidates: MenuItemSalesAgg[] = [...salesByItem.values()];
// Prefer slow movers; if catalog has no sales rows, still allow empty result.
candidates.sort((a, b) => a.salesLast7Days - b.salesLast7Days || a.salesToday - b.salesToday);
const generated: AiPromotionSuggestion[] = [];
const expiresAt = new Date(nowIso);
expiresAt.setUTCDate(expiresAt.getUTCDate() + 1);
const expiresAtIso = expiresAt.toISOString();
for (const agg of candidates) {
// Skip strong sellers — promotions target low/slow movers only.
if (agg.salesLast7Days > 25 && agg.salesToday > 5) {
continue;
}
const menuEntity = menuById.get(agg.menuItemId);
const menuDetails = (menuEntity as unknown as { details?: unknown } | undefined)?.details ?? null;
const menuDetailsRec = (menuDetails ?? {}) as unknown as Record<string, unknown>;
const menuItemName =
(menuDetailsRec.name != null && String(menuDetailsRec.name)) ||
agg.menuItemName ||
'Item';
const menuCategoryId = readMenuCategoryId(menuDetails);
const linkedStockId = readStockItemId(menuDetails);
const stockEntity = linkedStockId ? stockById.get(linkedStockId) : undefined;
const currentStockLevel =
readStockLevel((stockEntity as unknown as { details?: unknown } | undefined)?.details) ?? readStockLevel(menuDetails);
// Out of stock items are not good promotion targets.
if (currentStockLevel === 0) {
continue;
}
const confidenceScore = computeConfidence(
agg.salesLast7Days,
agg.salesToday,
currentStockLevel,
);
if (confidenceScore < 25) {
continue;
}
const suggestedDiscountPercent = computeSuggestedDiscountPercent(
agg.salesLast7Days,
currentStockLevel,
);
const reason = buildReason(agg.salesLast7Days, agg.salesToday, currentStockLevel);
const suggestion: AiPromotionSuggestion = {
aiPromotionSuggestionId: ctx.idGenerator.newId(),
operationalDashboardId: input.operationalDashboardId,
menuItemId: agg.menuItemId,
menuItemName,
menuCategoryId,
reason,
salesLast7Days: agg.salesLast7Days,
salesToday: agg.salesToday,
currentStockLevel,
confidenceScore,
suggestedDiscountPercent,
status: 'pending',
reviewedAt: null,
reviewedByUserId: null,
reviewNotes: null,
generatedAt: nowIso,
expiresAt: expiresAtIso,
createdAt: nowIso,
updatedAt: nowIso,
};
// rule: aiPromotionSuggestionsAreDecisionSupport — persist as pending decision-support only; do not auto-launch campaigns
await suggestionsRepo.save(suggestion);
generated.push(suggestion);
if (generated.length >= 10) {
break;
}
}
generated.sort((a, b) => b.confidenceScore - a.confidenceScore);
// rule: aiPromotionSuggestionsAreDecisionSupport
return generated.map(toOutput);
}
