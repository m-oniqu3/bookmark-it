import { useEffect } from "react";
import { BsFillBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { addToLibrary, getCategory } from "../../store/features/library/librarySlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { StyledButtonGroup } from "../../styles/StyledButtonGroup";
import { devices } from "../../styles/breakpoints";
import { Book, BookCategory } from "../../types/Book";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Button from "../helpers/ui/Button";
import { parseColor } from "../utils/parseColor";

const StyledAddToLibrary = styled.div<{ color: string }>`
  .content {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 1rem;
  }

  .background {
    background-color: ${({ color }) => `rgba(${parseColor(color)},
       0.5)`};
    padding: 0.8rem;
    border-radius: 5px;
    display: grid;
    place-items: center;
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
};

const categories: BookCategory[] = ["Reading", "TBR", "DNF", "Finished"];

const AddToLibrary = (props: Props) => {
  const { book, setActiveModal, modalType } = props;
  const dispatch = useAppDispatch();
  const duplicateBookCategory = useAppSelector((state) => state.bookStore.duplicateBookCategory);
  const color = useAppSelector((state) => state.colours.bookColours[book.id]);
  const navigate = useNavigate();

  const src = book.imageLinks?.smallThumbnail;

  const handleSummary = () => {
    setActiveModal({ type: ModalEnum.INFO_MODAL, book, modal: modalType });
  };

  const handleDetails = () => {
    navigate(`/details/${book.id}`);
  };

  useEffect(() => {
    dispatch(getCategory(book.id));
  }, [book.id, dispatch]);

  const handleCategory = (category: BookCategory) => {
    const now = Date.now();

    dispatch(addToLibrary({ bookInfo: book, category, timeAdded: now }));
    setActiveModal(null);
  };

  const bookCategories = categories.map((category) => {
    const className = category.toLowerCase().split(" ").join("-");
    const active = duplicateBookCategory === category ? "category__active" : "";

    //todo set background color insteads
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
    <StyledAddToLibrary color={color}>
      <div className="content">
        <div className="background">
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
