/// <mls fileReference="_102051_/l1/cafeFlow/layer_2_application/usecases/deleteStockItem.ts" enhancement="_blank"/>
import type { RequestContext } from '/_102034_/l1/server/layer_2_controllers/contracts.js';

export interface DeleteStockItemInput {
  stockItemId: string;
}

export interface DeleteStockItemOutput {
  stockItemId: string;
  name: string;
}

export async function deleteStockItem(
  ctx: RequestContext,
  input: DeleteStockItemInput,
): Promise<DeleteStockItemOutput> {
  // Load StockItem (MDM master data) — get throws NOT_FOUND when missing
  const entity = await ctx.mdm.entity.get({ mdmId: input.stockItemId });
  const name = entity.details.name;

  // Physical delete of the cadastral MDM record (facade keeps document/index/relationships consistent)
  await ctx.mdm.entity.delete({ mdmId: input.stockItemId });

  return {
    stockItemId: input.stockItemId,
    name,
  };
}
