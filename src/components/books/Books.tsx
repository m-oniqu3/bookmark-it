import { Fragment } from "react";
import { styled } from "styled-components";
import { devices } from "../../styles/breakpoints";
import type { Book } from "../../types/Book";

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
  const { book } = props;

  const src = book.imageLinks?.smallThumbnail;
  return (
    <Fragment>
      <StyledBook>
        <figure>
          <img src={src} alt={book.title} />
        </figure>
      </StyledBook>
    </Fragment>
  );
};

export default Books;
