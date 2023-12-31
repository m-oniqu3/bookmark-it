import { useEffect } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { ImBookmark } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { addToLibrary, getActiveBookCategory } from "../../store/features/library/librarySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { StyledButtonGroup } from "../../styles/StyledButtonGroup";
import { devices } from "../../styles/breakpoints";
import { Book, BookCategory } from "../../types/Book";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Button from "../helpers/ui/Button";
import { parseColor } from "../utils/parseColor";

type StyledProps = { color: string; $showicon: boolean };

const StyledAddToLibrary = styled.div<StyledProps>`
  .content {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 1rem;
  }

  .background {
    background-color: ${({ color }) => `rgba(${parseColor(color)},
       0.5)`};
    padding: 12px;
    border-radius: 5px;
    display: grid;
    place-items: center;
    position: relative;

    .icon {
      position: absolute;
      top: 0;
      right: 0px;
      z-index: 1;
      display: ${({ $showicon }) => ($showicon ? "block" : "none")};
      filter: brightness(60%);
    }
  }

  figure {
    height: 122px;
    width: 75px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
      object-fit: cover;
    }
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: space-between;

    .question {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      position: relative;
      top: -8px;

      @media (${devices.small}) {
        display: block;
      }
    }

    .title {
      font-size: 1.2rem;
      color: var(--secondary);
      width: calc(100% - 1rem);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      font-family: "Rubik", sans-serif;
      font-weight: bold;
    }

    .categories {
      display: grid;
      grid-template-columns: auto auto;

      gap: 0.5rem;

      @media (${devices.xsmall}) {
        display: grid;
      }

      .category {
        padding: 8px 4px;
        border: 1px solid var(--neutral-light);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-width: fit-content;
        transition: all 0.3s ease-in-out;

        &:hover {
          border: 1px solid var(--secondary);
          border-radius: 5px;
          cursor: pointer;
        }

        span {
          display: grid;
          place-items: center;
          color: var(--secondary);
        }

        &__active {
          background-color: var(--secondary);
          color: var(--neutral-primary);

          span {
            color: var(--neutral-primary);
          }
        }
      }

      .tbr {
        grid-column: 1/2;
        grid-row: 1;
      }

      .reading {
        grid-column: 2/3;
        grid-row: 1;
      }
    }
  }
`;

type Props = {
  book: Book;
  setActiveModal: (modal: ModalType | null) => void;
  modalType: "library" | "shelf";
  showBookmarkIcon: boolean;
};

const categories: BookCategory[] = ["Reading", "TBR", "DNF", "Finished"];

const AddToLibrary = (props: Props) => {
  const { book, setActiveModal, modalType, showBookmarkIcon } = props;
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const duplicateBookCategory = useAppSelector((state) => state.bookStore.duplicateBookCategory);
  const color = useAppSelector((state) => state.colours.bookColours[book.id]);
  const { library } = useAppSelector((state) => state.bookStore);
  const navigate = useNavigate();
  const isBookInLibrary = !!library[book.id] && showBookmarkIcon;

  const src = book.imageLinks?.smallThumbnail;

  const handleSummary = () => {
    setActiveModal({ type: ModalEnum.INFO_MODAL, book, modal: modalType });
  };

  const handleDetails = () => {
    navigate(`/details/${book.id}`);
  };

  const icon = <ImBookmark size={25} color={color} />;

  useEffect(() => {
    dispatch(getActiveBookCategory(book.id));
  }, [book.id, dispatch]);

  const handleCategory = (category: BookCategory) => {
    const now = Date.now();
    if (user) {
      dispatch(addToLibrary({ bookInfo: book, category, timeAdded: now, user }));
    }
    setActiveModal(null);
  };

  const bookCategories = categories.map((category) => {
    const className = category.toLowerCase().split(" ").join("-");
    const active = duplicateBookCategory === category ? "category__active" : "";

    return (
      <p key={category} className={`category ${className} ${active}`} onClick={() => handleCategory(category)}>
        <span>
          <BsFillBookmarkFill />
        </span>
        {category}
      </p>
    );
  });

  return (
    <StyledAddToLibrary color={color} $showicon={isBookInLibrary}>
      <div className="content">
        <div className="background">
          <div className="icon">{icon}</div>
          <figure>
            <img src={src} alt={book.title} />
          </figure>
        </div>

        <article>
          <h1 className="title">Choose a category</h1>
          <p className="question">Where do you want to add this book?</p>
          <div className="categories">{bookCategories}</div>
        </article>
      </div>

      <StyledButtonGroup>
        <Button buttonType="action" onClick={handleSummary}>
          Back to Summary
        </Button>
        <Button buttonType="action" onClick={handleDetails}>
          Details & More
        </Button>
      </StyledButtonGroup>
    </StyledAddToLibrary>
  );
};

export default AddToLibrary;
