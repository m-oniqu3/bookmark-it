import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export enum PopoverEnum {
  NEW_SHELF_POPOVER = "NEW_SHELF_POPOVER",
  SHELF_MENU_POPOVER = "SHELF_MENU_POPOVER",
  RENAME_SHELF_POPOVER = "RENAME_SHELF_POPOVER",
}

export type ShelfMenu = {
  type: PopoverEnum.SHELF_MENU_POPOVER;
  name: string;
};

export type NewShelfPopover = {
  type: PopoverEnum.NEW_SHELF_POPOVER;
  title: string;
  text: string;
  submitFn: ActionCreatorWithPayload<string>;
};

export type RenameShelfPopover = {
  type: PopoverEnum.RENAME_SHELF_POPOVER;
  title: string;
  text: string;
  submitFn: ActionCreatorWithPayload<string>;
  shelfName: string;
};

export type PopoverType = ShelfMenu | NewShelfPopover | RenameShelfPopover;
