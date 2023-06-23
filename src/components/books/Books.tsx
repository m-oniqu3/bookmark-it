import { Fragment, useState } from "react";
import { styled } from "styled-components";
import { devices } from "../../styles/breakpoints";
import type { Book } from "../../types/Book";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Modal from "../helpers/ui/Modal";
import AddToLibrary from "./AddToLibrary";
import Information from "./Information";

const StyledBook = styled.div`
  figure {
    cursor: pointer;
    height: 9.8rem;
    width: 6.5rem;

    @media (${devices.medium}) {
      height: 11.5rem;
      width: 7.5rem;
    }

    img {
      height: 100%;
      width: 100%;
      /* box-shadow: rgba(95, 95, 96, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px; */
      border-radius: 5px;
    }
  }
`;

type Props = {
  book: Book;
  modalType: "library" | "shelf";
};

const Books = (props: Props) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const { book, modalType } = props;

  const handleModal = () => {
    setActiveModal({ type: ModalEnum.INFO_MODAL, book, modal: modalType });
  };

  const modalContent = (() => {
    switch (activeModal?.type) {
      case ModalEnum.INFO_MODAL:
        return (
          <Information
            book={book}
            modalType={modalType}
            setActiveModal={setActiveModal}
          />
        );

      case ModalEnum.ADD_TO_LIBRARY_MODAL:
        return <AddToLibrary book={book} />;

      default:
        return null;
    }
  })();

  const src = book.imageLinks?.smallThumbnail;
  return (
    <Fragment>
      <StyledBook>
        <figure onClick={handleModal}>
          <img src={src} alt={book.title} />
        </figure>
      </StyledBook>

      {activeModal && (
        <Modal closeModal={() => setActiveModal(null)}>
          <Fragment>{modalContent}</Fragment>
        </Modal>
      )}
    </Fragment>
  );
};

export default Books;
