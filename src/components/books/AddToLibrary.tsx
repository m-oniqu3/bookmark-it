import { BsFillBookmarkFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { StyledButtonGroup } from "../../styles/StyledButtonGroup";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Button from "../helpers/ui/Button";

const StyledAddToLibrary = styled.div`
  .content {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 1rem;
  }
  figure {
    height: 150px;
    width: 100px;
    box-shadow: rgba(90, 90, 90, 0.096) 0px 2px 5px -1px,
      rgba(76, 76, 76, 0.3) 0px 1px 3px -1px;
    border-radius: 5px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    justify-content: space-between;

    p {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

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
      font-family: "Roboto", sans-serif;
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

const categories = ["Reading", "TBR", "DNF", "Finished"];

const AddToLibrary = (props: Props) => {
  const navigate = useNavigate();
  const { book, setActiveModal, modalType } = props;

  const src = book.imageLinks?.smallThumbnail;

  const handleSummary = () => {
    setActiveModal({
      type: ModalEnum.INFO_MODAL,
      book,
      modal: modalType,
    });
  };

  const handleDetails = () => {
    navigate(`/details/${book.id}`, {
      state: { id: book.id },
    });
  };

  return (
    <StyledAddToLibrary>
      <div className="content">
        <figure>
          <img src={src} alt={book.title} />
        </figure>

        <article>
          <h1 className="title">Choose a category</h1>
          <p>Where do you want to add this book?</p>
          <div className="categories">
            {categories.map((category) => {
              return (
                <p
                  key={category}
                  className={`category ${category
                    .toLowerCase()
                    .split(" ")
                    .join("-")}  `}
                >
                  <span>
                    <BsFillBookmarkFill />
                  </span>
                  {category}
                </p>
              );
            })}
          </div>
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
