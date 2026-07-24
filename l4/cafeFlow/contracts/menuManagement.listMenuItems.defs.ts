/// <mls fileReference="_102051_/l4/cafeFlow/contracts/menuManagement.listMenuItems.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/menuManagement.defs.ts — DO NOT EDIT.
// Contract of record: bffCall listMenuItems (query); Output kind=paginated; route cafeFlow.menuManagement.listMenuItems.

export interface ListMenuItemsInput {
  status?: string;
  menuCategoryId?: string;
  name?: string;
  page?: number;
  pageSize?: number;
}

export interface ListMenuItemsMenuItemsItem {
  menuItemId: string;
  menuCategoryId: string;
  categoryName: string;
  name: string;
  description: string;
  price: number;
  status: string;
  pausedAt: string;
  pauseReason: string;
  imageUrl: string;
  displayOrder: number;
  requiresStockLink: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListMenuItemsOutput {
  menuItems: ListMenuItemsMenuItemsItem[];
  total: number;
}

export const listMenuItemsRoute = 'cafeFlow.menuManagement.listMenuItems' as const;
