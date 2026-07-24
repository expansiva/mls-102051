/// <mls fileReference="_102051_/l4/cafeFlow/contracts/menuManagement.updateMenuItemCmd.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/menuManagement.defs.ts — DO NOT EDIT.
// Contract of record: bffCall updateMenuItemCmd (command); Output kind=object; route cafeFlow.menuManagement.updateMenuItemCmd.

export interface UpdateMenuItemCmdInput {
  menuItemId: string;
  menuCategoryId?: string;
  name?: string;
  description?: string;
  price?: number;
  status?: string;
  pauseReason?: string;
  imageUrl?: string;
  displayOrder?: number;
  requiresStockLink?: boolean;
}

export interface UpdateMenuItemCmdOutput {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description: string;
  price: number;
  status: string;
  pausedAt: string;
  pauseReason: string;
  imageUrl: string;
  displayOrder: number;
  requiresStockLink: boolean;
  updatedAt: string;
}

export const updateMenuItemCmdRoute = 'cafeFlow.menuManagement.updateMenuItemCmd' as const;
