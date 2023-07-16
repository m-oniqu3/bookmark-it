export enum PopoverEnum {
  DELETE_POPOVER = "DELETE_POPOVER",
}

export type DeletePopover = {
  type: PopoverEnum.DELETE_POPOVER;
  name: string;
};

export type PopoverType = DeletePopover;
