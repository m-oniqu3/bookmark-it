import { Fragment, useState } from "react";
import { ImBookmark } from "react-icons/im";
import { styled } from "styled-components";
import { addBookColors } from "../../store/features/colours/coloursSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { devices } from "../../styles/breakpoints";
import type { Book } from "../../types/Book";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Modal from "../helpers/ui/Modal";
import { parseColor } from "../utils/parseColor";
import AddToLibrary from "./AddToLibrary";
import Information from "./Information";

// @ts-expect-error - no types available
import { ColorExtractor } from "react-color-extractor";

type StyledProps = { color: string; $showicon: boolean };

const StyledBook = styled.div<StyledProps>`
  position: relative;

  .icon {
    position: absolute;
    top: 0;
    right: 2px;
    z-index: 1;
    display: ${({ $showicon }) => ($showicon ? "block" : "none")};
    filter: brightness(60%);
  }

  .bg-container {
    background-color: ${({ color }) => `rgba(${parseColor(color)},
       0.5)`};
    padding: 0.8rem;
    border-radius: 5px;
  }

  figure.cover {
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
  showBookmarkIcon: boolean;
};

const Books = (props: Props) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const { book, modalType, showBookmarkIcon } = props;
  const dispatch = useAppDispatch();
  const color = useAppSelector((state) => state.colours.bookColours[book.id]) as string;
  const { library } = useAppSelector((state) => state.bookStore);

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
            showBookmarkIcon={showBookmarkIcon}
          />
        );

      case ModalEnum.ADD_TO_LIBRARY_MODAL:
        return (
          <AddToLibrary
            book={book}
            setActiveModal={setActiveModal}
            modalType={modalType}
            showBookmarkIcon={showBookmarkIcon}
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

  const icon = <ImBookmark size={25} color={color} />;

  const isBookInLibrary = !!library[book.id] && showBookmarkIcon;

  return (
    <Fragment>
      <StyledBook color={color} $showicon={isBookInLibrary}>
        <div className="icon">{icon}</div>
        <div className="bg-container">
          <figure className="cover" onClick={handleModal}>
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
