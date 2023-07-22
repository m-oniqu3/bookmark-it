import { useState } from "react";
import { styled } from "styled-components";
import { createShelf } from "../../store/features/shelf/shelfSlice";
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
  }

  .background {
    background-color: ${({ color }) => `rgba(${parseColor(color)},
       0.5)`};
    padding: 12px;
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
    max-height: 142px;
    overflow-y: hidden;

    .title {
      font-size: 1.2rem;
      color: var(--secondary);
      width: calc(100% - 1rem);
      font-family: "Rubik", sans-serif;
      font-weight: bold;
    }

    p {
      padding: 0.2rem 0;
    }

    .options {
      display: flex;
      gap: 1rem;
      padding: 0.5rem 0;

      overflow-x: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .option {
        padding: 3px 5px;
        border: 1px solid var(--neutral-light);
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        min-width: fit-content;
        transition: all 0.3s ease-in-out;
        font-size: 0.85rem;

        &:hover {
          border: 1px solid var(--secondary);
          border-radius: 5px;
          cursor: pointer;
        }
      }
    }

    .form {
      padding-top: 0.2rem;
      position: relative;

      @media (${devices.medium}) {
        padding-top: 0;
        top: 20%;
        transform: translateY(-20%);
      }

      input {
        padding: 0.4rem 0;
        border-radius: 0;
        border: none;
        border-bottom: 1px solid gainsboro;

        width: 100%;

        &:focus {
          outline: none;
        }
      }
    }
  }

  button {
    padding: 8px 7px;
  }
`;

type Props = {
  book: Book;

  setActiveModal: (modal: ModalType | null) => void;
};

const NewShelf = (props: Props) => {
  const { book, setActiveModal } = props;
  const [name, setName] = useState<string>("");
  const color = useAppSelector((state) => state.colours.bookColours[book.id]);
  const dispatch = useAppDispatch();

  const src = book.imageLinks?.smallThumbnail;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleCancel = () => {
    setActiveModal({ type: ModalEnum.INFO_MODAL, book, modal: "shelf" });
  };

  const handleCreate = () => {
    dispatch(createShelf(name.trim()));
    setActiveModal({ type: ModalEnum.INFO_MODAL, book, modal: "shelf" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createShelf(name.trim()));
    setActiveModal({ type: ModalEnum.INFO_MODAL, book, modal: "shelf" });
  };

  const renderOptions = ["romance", "mystery", "fantasy", "booktok", "sad recs"].map((option) => {
    return (
      <p className="option" onClick={() => setName(option)}>
        {option}
      </p>
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
          <h1 className="title">Create Shelf</h1>
          <p> Create a shelf to add this book to.</p>

          <div className="options">{renderOptions}</div>

          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter name"
              required
              maxLength={40}
              autoFocus
              value={name}
              onChange={handleChange}
            />
          </form>
        </article>
      </div>

      <StyledButtonGroup>
        <Button buttonType="action" onClick={handleCancel}>
          Back To Summary
        </Button>
        <Button buttonType="action" onClick={handleCreate}>
          Create Shelf
        </Button>
      </StyledButtonGroup>
    </StyledShelf>
  );
};

export default NewShelf;
