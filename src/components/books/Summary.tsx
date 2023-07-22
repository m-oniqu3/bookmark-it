/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef } from "react";
import { ImBookmark } from "react-icons/im";
import ReactStars from "react-rating-star-with-type";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { addSearch } from "../../store/features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { Book } from "../../types/Book";
import { parseColor } from "../utils/parseColor";

type StyledProps = { background: string; $showicon: boolean };

const StyledSummary = styled.section<StyledProps>`
  .summary {
    display: grid;
    grid-template-columns: 100px auto;
    gap: 1rem;

    .background {
      background-color: ${({ background }) => `rgba(${parseColor(background)},
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
        padding: 3px 0;
        width: fit-content;
        cursor: pointer;

        &:hover {
          background: ${({ background }) =>
            `linear-gradient(to left, #000000c5, rgba(${parseColor(background)}) 100%)`};
          background-position: 0 100%;
          background-size: 100% 2px;
          background-repeat: no-repeat;
        }
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

      .rating {
        display: flex;
        align-items: center;
        gap: 0.2rem;

        .count {
          padding-top: 2px;
          font-size: 0.9rem;
        }

        span {
          display: grid;
          place-items: center;
        }
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
      }
    }
  }
`;
type Props = {
  book: Book;
  showBookmarkIcon: boolean;
};

const Summary = (props: Props) => {
  const { book, showBookmarkIcon } = props;
  const { library } = useAppSelector((state) => state.bookStore);
  const color = useAppSelector((state) => state.colours.bookColours[book.id]) as string;
  const snippetRef = useRef<HTMLParagraphElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const isBookInLibrary = !!library[book.id] && showBookmarkIcon;
  const src = book.imageLinks?.smallThumbnail;

  const author = !book.authors ? "" : book.authors[0];
  const categories = !book.categories || !book.categories.length ? "" : `${book.categories[0]}`;

  const handleAuthor = () => {
    if (author) {
      navigate(`/search/${author}`);
      dispatch(addSearch(author));
    }
  };

  const icon = <ImBookmark size={25} color={color} />;

  return (
    <StyledSummary background={color} $showicon={isBookInLibrary}>
      <div className="summary">
        <div className="background">
          <div className="icon">{icon}</div>
          <figure>
            <img src={src} alt={book.title} />
          </figure>
        </div>

        <article>
          <h1 className="title">{book.title}</h1>
          <p className="author" onClick={handleAuthor}>
            {author}
          </p>

          <p className="details">
            {book.publishedDate && `${new Date(book.publishedDate).getFullYear().toString()} `}
            {book.publishedDate && categories && " - "}
            {categories}
          </p>

          <div className="rating">
            <ReactStars
              value={book.averageRating || 1}
              count={5}
              size={15}
              activeColor={color}
              inactiveColor={`rgba(${parseColor(color)}, 0.8)`}
            />
            <p className="count">
              {book.ratingsCount || 1}
              {book.ratingsCount === 1 || !book.ratingsCount ? " review" : " reviews"}
            </p>
          </div>

          <p className="snippet" ref={snippetRef} />
        </article>
      </div>
    </StyledSummary>
  );
};

export default Summary;
