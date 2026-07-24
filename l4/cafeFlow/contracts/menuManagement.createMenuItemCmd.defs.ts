/// <mls fileReference="_102051_/l4/cafeFlow/contracts/menuManagement.createMenuItemCmd.defs.ts" enhancement="_blank"/>

// GENERATED MECHANICALLY from _102051_/l4/cafeFlow/workspaces/menuManagement.defs.ts — DO NOT EDIT.
// Contract of record: bffCall createMenuItemCmd (command); Output kind=object; route cafeFlow.menuManagement.createMenuItemCmd.

export interface CreateMenuItemCmdInput {
  menuCategoryId: string;
  name: string;
  description?: string;
  price: number;
  status?: string;
  imageUrl?: string;
  displayOrder?: number;
  requiresStockLink?: boolean;
}

export interface CreateMenuItemCmdOutput {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description: string;
  price: number;
  status: string;
  imageUrl: string;
  displayOrder: number;
  requiresStockLink: boolean;
  createdAt: string;
  updatedAt: string;
}

export const createMenuItemCmdRoute = 'cafeFlow.menuManagement.createMenuItemCmd' as const;
