/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef } from "react";
import ReactStars from "react-rating-star-with-type";
import styled from "styled-components";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";
import { parseColor } from "../utils/parseColor";

interface Props {
  book: Book;
  background: string;
}

const StyledSummary = styled.section<{ background: string }>`
  .summary {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 1rem;

    .background {
      background-color: ${({ background }) => `rgba(${parseColor(background)},
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
      position: relative;

      .title {
        font-size: 1.2rem;
        color: var(--secondary);
        width: calc(100% - 2rem);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        font-family: "Rubik", sans-serif;
        font-weight: bold;
      }

      .author {
        color: var(--secondary);
        font-size: 0.95rem;
        font-weight: 500;
      }

      .details {
        display: flex;
        color: var(--secondary);
        padding: 3px 0;
        flex-wrap: wrap-reverse;
        text-transform: capitalize;
        font-size: 0.95rem;
        font-weight: 500;
      }

      .snippet {
        font-size: 0.92rem;
        font-weight: 400;
        line-height: 125%;
        padding-top: 0.5rem;
        width: calc(100% - 1rem);
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: var(--secondary);
        font-style: normal;
        position: relative;
        bottom: 0px;

        @media (${devices.xsmall}) {
          -webkit-line-clamp: 3;
        }
      }
    }
  }
`;

const Summary = (props: Props) => {
  const snippetRef = useRef<HTMLParagraphElement | null>(null);
  const { book, background } = props;

  /** the textSnippet includes html tags so use useRef to include the text in the innerHTML
   * if there is no snippet then show description or alternative text
   */
  useEffect(() => {
    if (book.searchInfo) {
      snippetRef.current!.innerHTML = book.searchInfo.textSnippet;
    } else if (book.description) {
      snippetRef.current!.innerHTML = book.description;
    } else snippetRef.current!.innerHTML = "Visit Details & More";
  }, [book]);

  const src = book.imageLinks?.smallThumbnail;

  const author = !book.authors ? "Unknown" : book.authors[0];
  const categories = !book.categories ? "" : `${book.categories[0]}`;

  return (
    <StyledSummary background={background}>
      <div className="summary">
        <div className="background">
          <figure>
            <img src={src} alt={book.title} />
          </figure>
        </div>

        <article>
          <h1 className="title">{book.title}</h1>
          <p className="author">{author}</p>

          <p className="details">
            {book.publishedDate &&
              `${new Date(book.publishedDate).getFullYear().toString()} -  `}
            {categories}
          </p>

          <ReactStars
            value={book.averageRating || 1}
            count={5}
            size={15}
            activeColor={background}
            inactiveColor={`rgba(${parseColor(background)}, 0.8)`}
          />

          <p className="snippet" ref={snippetRef} />
        </article>
      </div>
    </StyledSummary>
  );
};

export default Summary;
