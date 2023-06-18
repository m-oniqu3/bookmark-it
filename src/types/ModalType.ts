import { Book } from "./Book";

export enum ModalEnum {
  INFO_MODAL = "INFO_MODAL",
}

export type InfoModal = {
  type: ModalEnum.INFO_MODAL;
  book: Book;
  modal: "library" | "shelf";
};

export type ModalType = InfoModal;
