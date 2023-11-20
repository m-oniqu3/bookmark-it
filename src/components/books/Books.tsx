import { Fragment, useRef, useState } from "react";
import { ImBookmark } from "react-icons/im";
import { styled } from "styled-components";
import { useAppSelector } from "../../store/hooks/hooks";
import { devices } from "../../styles/breakpoints";
import type { Book } from "../../types/Book";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Modal from "../helpers/ui/Modal";

import AddToLibrary from "./AddToLibrary";
import Information from "./Information";

// import { usePalette } from "react-palette";
import NewShelf from "../shelves/NewShelf";
import Login from "../user/Login";
import AddToShelf from "./AddToShelf";

import useBackground from "../../hooks/useBackground";
import { parseColor } from "../utils/parseColor";

type StyledProps = { color: string; $showicon: boolean; $showShelfIcon: boolean };

const StyledBook = styled.div<StyledProps>`
  position: relative;

  .icon {
    position: absolute;
    top: 0;
    right: 2px;
    z-index: 3;
    display: ${({ $showicon }) => ($showicon ? "block" : "none")};
    filter: brightness(70%);
  }

  .shelf-icon {
    position: absolute;
    top: 0;
    right: 2px;
    z-index: 1;
    display: ${({ $showShelfIcon }) => ($showShelfIcon ? "block" : "none")};
    filter: brightness(70%);
  }

  .bg-container {
    background-color: ${({ color }) => `rgb(${parseColor(color)}, 0.5)`};

    padding: 12px;
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
  showShelfIcon: boolean;
};

const Books = (props: Props) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const { book, modalType, showBookmarkIcon, showShelfIcon } = props;
  // const dispatch = useAppDispatch();
  // const color = useAppSelector((state) => state.colours.bookColours[book.id]) as string;
  const { isSignedIn } = useAppSelector((state) => state.auth);
  const { library } = useAppSelector((state) => state.bookStore);
  const { books } = useAppSelector((state) => state.bookShelf);

  const imgRef = useRef<HTMLImageElement>(null);
  const color = useBackground(book.id, book.imageLinks?.smallThumbnail as string);

  // `/api/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`
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

      case ModalEnum.ADD_TO_SHELF_MODAL:
        return <AddToShelf book={book} setActiveModal={setActiveModal} modalType={modalType} />;

      case ModalEnum.NEW_SHELF_MODAL:
        return <NewShelf book={book} setActiveModal={setActiveModal} />;

      case ModalEnum.LOGIN_MODAL:
        return <Login closeModal={() => setActiveModal(null)} />;

      default:
        return null;
    }
  })();

  // `/api/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api` ??

  const icon = <ImBookmark size={25} color={color} />;
  const shelfIcon = <ImBookmark size={25} color={color} />;

  const isBookInLibrary = library[book.id] && showBookmarkIcon && isSignedIn;
  const isBookInShelf = isBookInLibrary && books[book.id] && showShelfIcon && isSignedIn;

  return (
    <Fragment>
      <StyledBook color={color} $showicon={isBookInLibrary} $showShelfIcon={isBookInShelf}>
        <div className="icon">{icon}</div>
        <div className="shelf-icon">{shelfIcon}</div>
        <div className="bg-container">
          <figure className="cover" onClick={handleModal}>
            <img src={book.imageLinks?.smallThumbnail.replace("api", "").trim()} alt={book.title} ref={imgRef} />
          </figure>
        </div>
      </StyledBook>

      {activeModal && (
        <Modal closeModal={() => setActiveModal(null)} variant={activeModal.type === ModalEnum.LOGIN_MODAL}>
          <Fragment>{modalContent}</Fragment>
        </Modal>
      )}
    </Fragment>
  );
};

export default Books;
