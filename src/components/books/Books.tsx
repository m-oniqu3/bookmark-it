import { Fragment, useState } from "react";
import { styled } from "styled-components";
import { devices } from "../../styles/breakpoints";
import type { Book } from "../../types/Book";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Modal from "../helpers/ui/Modal";
import AddToLibrary from "./AddToLibrary";
import Information from "./Information";

// @ts-expect-error - no types available

import { ColorExtractor } from "react-color-extractor";

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
  const [colors, setColors] = useState<string[]>([]);

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
        return (
          <AddToLibrary
            book={book}
            setActiveModal={setActiveModal}
            modalType={modalType}
          />
        );

      default:
        return null;
    }
  })();

  const handleColors = (colors: string[]) => {
    setColors(colors);
  };

  const src = `/api/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;

  return (
    <Fragment>
      <StyledBook>
        <figure onClick={handleModal}>
          <ColorExtractor getColors={handleColors}>
            <img src={src} alt={book.title} />
          </ColorExtractor>
        </figure>

        {colors.map((color, index) => (
          <div
            key={index}
            style={{ backgroundColor: color, width: "100%", height: "1rem" }}
          ></div>
        ))}
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
