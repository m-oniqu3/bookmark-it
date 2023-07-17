import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export enum PopoverEnum {
  NEW_SHELF_POPOVER = "NEW_SHELF_POPOVER",
  DELETE_POPOVER = "DELETE_POPOVER",
}

export type DeletePopover = {
  type: PopoverEnum.DELETE_POPOVER;
  name: string;
};

export type NewShelfPopover = {
  type: PopoverEnum.NEW_SHELF_POPOVER;
  title: string;
  text: string;
  submitFn: ActionCreatorWithPayload<string, "shelf/createShelf">;
};

export type PopoverType = DeletePopover | NewShelfPopover;
