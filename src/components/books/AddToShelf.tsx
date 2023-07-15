import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useAppSelector } from "../../store/hooks/hooks";
import { StyledButtonGroup } from "../../styles/StyledButtonGroup";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Button from "../helpers/ui/Button";
import { parseColor } from "../utils/parseColor";

type StyledProps = { color: string };

const StyledShelf = styled.div<StyledProps>`
  .content {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 1rem;
    height: 142px;
  }

  .background {
    background-color: ${({ color }) => `rgba(${parseColor(color)},
       0.5)`};
    padding: 10px;
    border-radius: 5px;
    display: grid;
    place-items: center;
    position: relative;

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
  }

  article {
    max-height: 142px;
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

    .shelves {
      display: grid;
      grid-template-columns: 1fr;
      max-height: 120px;
      overflow-y: auto;
      padding: 0.2rem 0;

      @media ${devices.small} {
        grid-template-columns: 1fr 1fr;
      }

      .shelf {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0;

        input[type="checkbox"] {
          cursor: pointer;

          accent-color: ${({ color }) => `rgba(${parseColor(color)}, 
              0.5)`};
        }
      }
    }
  }
`;

type Props = {
  book: Book;
  setActiveModal: (modal: ModalType | null) => void;
  modalType: "library" | "shelf";
};

const AddToShelf = (props: Props) => {
  const { book, setActiveModal, modalType } = props;
  const navigate = useNavigate();
  const color = useAppSelector((state) => state.colours.bookColours[book.id]);

  const handleSummary = () => {
    setActiveModal({ type: ModalEnum.INFO_MODAL, book, modal: modalType });
  };

  const handleDetails = () => {
    navigate(`/details/${book.id}`);
  };

  const src = book.imageLinks?.smallThumbnail;

  const tempShelves = [
    "romance",
    "fantasy",
    "fiction",
    "non-fiction",
    "thriller",
    "mystery",
    "horror",
    "comedy",
    "drama",
    "action",
    "adventure",
    "biography",
    "history",
    "science",
    "poetry",
    "children",
    "young-adult",
    "other",
  ];

  const availableShelves = tempShelves.map((shelf) => {
    return (
      <div key={shelf} className="shelf">
        <input type="checkbox" id={shelf} name={shelf} value={shelf} />
        <p key={shelf}>{shelf}</p>
      </div>
    );
  });

  return (
    <StyledShelf color={color}>
      <div className="content">
        <div className="background">
          <figure>
            <img src={src} alt={book.title} />
          </figure>
        </div>

        <article>
          <h1 className="title">Select the shelf</h1>
          <div className="shelves">{availableShelves}</div>
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
    </StyledShelf>
  );
};

export default AddToShelf;
