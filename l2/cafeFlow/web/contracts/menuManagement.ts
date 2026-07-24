/// <mls fileReference="_102051_/l2/cafeFlow/web/contracts/menuManagement.ts" enhancement="_blank"/>

// GENERATED from l4 bffCalls — do not edit (workspace menuManagement; one contract file per workspace, all bffCalls).

// bffCall listMenuItems (query) — Output kind=paginated; route cafeFlow.menuManagement.listMenuItems.
export interface ListMenuItemsInput {
  status?: string;
  menuCategoryId?: string;
  name?: string;
  page?: number;
  pageSize?: number;
}
export interface ListMenuItemsOutput {
  menuItems: { menuItemId: string; menuCategoryId: string; categoryName: string; name: string; description: string; price: number; status: string; pausedAt: string; pauseReason: string; imageUrl: string; displayOrder: number; requiresStockLink: boolean; createdAt: string; updatedAt: string }[];
  total: number;
}
export const listMenuItemsRoute = 'cafeFlow.menuManagement.listMenuItems' as const;

// bffCall createMenuItemCmd (command) — Output kind=object; route cafeFlow.menuManagement.createMenuItemCmd.
export interface CreateMenuItemCmdInput {
  menuCategoryId: string;
  name: string;
  description?: string;
  price: number;
  status?: string;
  imageUrl?: string;
  displayOrder?: number;
  requiresStockLink: boolean;
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

// bffCall updateMenuItemCmd (command) — Output kind=object; route cafeFlow.menuManagement.updateMenuItemCmd.
export interface UpdateMenuItemCmdInput {
  menuItemId: string;
  menuCategoryId: string;
  name: string;
  description?: string;
  price: number;
  status: string;
  pauseReason?: string;
  imageUrl?: string;
  displayOrder?: number;
  requiresStockLink: boolean;
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
