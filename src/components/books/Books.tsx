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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addBookColors } from "../../store/features/colours/coloursSlice";
import { parseColor } from "../utils/parseColor";

const StyledBook = styled.div<{ color: string }>`
  .bg-container {
    background-color: ${({ color }) => `rgba(${parseColor(color)},
       0.5)`};
    padding: 0.8rem;
    border-radius: 5px;
  }

  figure {
    position: relative;
    cursor: pointer;
    height: 6rem;
    width: 4rem;

    @media (${devices.xsmall}) {
      height: 7.5rem;
      width: 5rem;
    }

    @media (${devices.medium}) {
      height: 10.8rem;
      width: 7.2rem;
    }

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
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
  const dispatch = useDispatch();
  const color = useSelector(
    (state: RootState) => state.colours.bookColours[book.id]
  ) as string;

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
    dispatch(addBookColors({ bookId: book.id, colors: colors[0] }));
  };

  const src = `/api/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;

  return (
    <Fragment>
      <StyledBook color={color}>
        <div className="bg-container">
          <figure onClick={handleModal}>
            <ColorExtractor getColors={handleColors}>
              <img src={src} alt={book.title} />
            </ColorExtractor>
          </figure>
        </div>
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
