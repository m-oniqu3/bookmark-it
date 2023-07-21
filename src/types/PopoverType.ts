export enum PopoverEnum {
  SHELF_MENU_POPOVER = "SHELF_MENU_POPOVER",
}

export type ShelfMenu = {
  type: PopoverEnum.SHELF_MENU_POPOVER;
  name: string;
};

export type PopoverType = ShelfMenu;
