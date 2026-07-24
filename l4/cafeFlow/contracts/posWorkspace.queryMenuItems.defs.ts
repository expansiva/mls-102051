/// <mls fileReference="_102051_/l4/cafeFlow/contracts/posWorkspace.queryMenuItems.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/posWorkspace.defs.ts — DO NOT EDIT.
// Contract of record: bffCall queryMenuItems (query); Output kind=list; route cafeFlow.posWorkspace.queryMenuItems.

export interface QueryMenuItemsInput {
  menuCategoryId?: string;
}

export interface QueryMenuItemsItem {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description: string;
  price: number;
  status: string;
  imageUrl: string;
  displayOrder: number;
}

export type QueryMenuItemsOutput = QueryMenuItemsItem[];

export const queryMenuItemsRoute = 'cafeFlow.posWorkspace.queryMenuItems' as const;
