import { BsCheckSquareFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { addBooksToShelf, addShelfToBook } from "../../store/features/shelf/shelfSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
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
    position: relative;

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

    .save {
      position: absolute;
      bottom: 0;
      right: 15px;
      cursor: pointer;
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
  const { shelves } = useAppSelector((state) => state.bookShelf);

  const dispatch = useAppDispatch();

  const handleSummary = () => {
    setActiveModal({ type: ModalEnum.INFO_MODAL, book, modal: modalType });
  };

  const handleDetails = () => {
    navigate(`/details/${book.id}`);
  };

  const src = book.imageLinks?.smallThumbnail;

  const sortedShelves: string[] = Object.entries(shelves)
    .sort((a, b) => b[1].createdAt - a[1].createdAt)
    .map((shelf) => shelf["0"]);

  const handleUpdates = (e: React.ChangeEvent<HTMLInputElement>) => {
    const shelf = e.target.value;
    dispatch(addBooksToShelf({ bookId: book.id, shelfName: shelf }));
    dispatch(addShelfToBook({ bookId: book.id, selectedShelf: shelf }));
  };

  const availableShelves = sortedShelves.map((shelf) => {
    return (
      <div key={shelf} className="shelf">
        <input type="checkbox" value={shelf} onChange={handleUpdates} />
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

          <div className="save">
            <BsCheckSquareFill color="green" size={20} />
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
    </StyledShelf>
  );
};

export default AddToShelf;
