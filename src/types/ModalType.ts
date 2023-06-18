import { Book } from "./Book";

export enum ModalEnum {
  INFO_MODAL = "INFO_MODAL",
  LOGIN_MODAL = "LOGIN_MODAL",
}

export type InfoModal = {
  type: ModalEnum.INFO_MODAL;
  book: Book;
  modal: "library" | "shelf";
};

export type LoginModal = {
  type: ModalEnum.LOGIN_MODAL;
};

export type ModalType = InfoModal | LoginModal;
