import { Book } from "./Book";

export enum ModalEnum {
  INFO_MODAL = "INFO_MODAL",
  LOGIN_MODAL = "LOGIN_MODAL",
  ADD_TO_LIBRARY_MODAL = "ADD_TO_LIBRARY_MODAL",
  ADD_TO_SHELF_MODAL = "ADD_TO_SHELF_MODAL",
}

export type InfoModal = {
  type: ModalEnum.INFO_MODAL;
  book: Book;
  modal: "library" | "shelf";
};

export type LoginModal = {
  type: ModalEnum.LOGIN_MODAL;
};

export type AddToLibraryModal = {
  type: ModalEnum.ADD_TO_LIBRARY_MODAL;
  book: Book;
};

export type AddToShelfModal = {
  type: ModalEnum.ADD_TO_SHELF_MODAL;
  book: Book;
};

export type ModalType = InfoModal | LoginModal | AddToLibraryModal | AddToShelfModal;
