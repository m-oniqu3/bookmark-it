export enum SmallModalEnum {
  NEW_SHELF_MODAL = "NEW_SHELF_MODAL",
  RENAME_SHELF_MODAL = "RENAME_SHELF_MODAL",
}

export type NewShelfModal = {
  type: SmallModalEnum.NEW_SHELF_MODAL;
};

export type RenameShelfModal = {
  type: SmallModalEnum.RENAME_SHELF_MODAL;
  currentShelf: string;
};

export type SmallModalTypes = NewShelfModal | RenameShelfModal;
