/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef } from "react";
import styled from "styled-components";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";

interface Props {
  book: Book;
}

const StyledSummary = styled.section`
  .summary {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 1rem;

    figure {
      height: 150px;
      width: 100px;
      box-shadow: rgba(90, 90, 90, 0.25) 0px 2px 5px -1px,
        rgba(76, 76, 76, 0.3) 0px 1px 3px -1px;
      border-radius: 5px;

      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
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
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-family: "Roboto", sans-serif;
        font-weight: bold;

        @media (${devices.medium}) {
          -webkit-line-clamp: 1;
        }
      }

      .author {
        color: var(--secondary);
      }

      .details {
        display: flex;
        color: var(--secondary);
        padding: 3px 0;
        flex-wrap: wrap-reverse;
        text-transform: capitalize;
      }

      .snippet {
        font-weight: 300;
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
        bottom: -12px;

        @media (${devices.xsmall}) {
          -webkit-line-clamp: 3;
        }
      }
    }
  }
`;

const Summary = (props: Props) => {
  const snippetRef = useRef<HTMLParagraphElement | null>(null);
  const { book } = props;

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
  const categories = !book.categories ? "" : `- ${book.categories[0]}`;

  return (
    <StyledSummary>
      <div className="summary">
        <figure>
          <img src={src} alt={book.title} />
        </figure>

        <article>
          <h1 className="title">{book.title}</h1>
          <p className="author">{author}</p>

          <p className="details">
            {new Date(book.publishedDate).getFullYear().toString()}
            &nbsp;
            {categories}
          </p>

          <p className="snippet" ref={snippetRef} />
        </article>
      </div>
    </StyledSummary>
  );
};

export default Summary;
