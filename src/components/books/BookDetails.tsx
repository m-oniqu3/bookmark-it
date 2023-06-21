/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useRef, useState } from "react";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useGetBookDetailsQuery } from "../../store/features/api/apiSlice";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";
import Container from "../helpers/ui/Container";
import Loading from "../helpers/ui/Loading";

const StyledDetailsContainer = styled(Container)`
  display: grid;
  grid-template-columns: 180px 1fr;
  padding: 2rem 0;
  position: relative;

  @media (${devices.semiLarge}) {
    grid-template-columns: repeat(7, 1fr);
    gap: 1rem;
  }

  .image {
    @media (${devices.semiLarge}) {
      grid-column: 1/3;
      grid-row: 1/3;
      margin: 0 auto;
      position: relative;
    }

    figure {
      position: relative;
      height: 11rem;
      width: 7.125rem;
      border-radius: 10px;
      box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
        rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
      margin: 0 auto;

      @media (${devices.semiLarge}) {
        height: 14rem;
        width: 9rem;
      }

      img {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .add {
      display: none;

      @media (${devices.semiLarge}) {
        padding: 1.5rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.8rem;
        height: 1.8rem;

        svg {
          width: 100%;
          height: 100%;
          position: relative;
          left: 3px;
        }
      }
    }
  }

  .intro {
    position: relative;

    @media (${devices.semiLarge}) {
      grid-column: 3/-1;
    }

    .title {
      font-size: clamp(1.2rem, 2.5vw, 1.5rem);
      color: var(--secondary);
      font-family: "Roboto", sans-serif;
      font-weight: bold;
    }

    .subtitle {
      color: var(--neutral-medium);
      font-size: 0.8rem;
      padding: 0.2rem 0 0.3rem;
      line-height: 120%;
      overflow: hidden !important;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;

      @media (${devices.semiLarge}) {
        font-size: 1rem;
      }
    }

    .author {
      color: var(--secondary);
      font-size: 1rem;
    }

    .author-works {
      margin-top: 0.3rem;
      color: var(--secondary);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        text-decoration: underline;
      }
    }

    .icon {
      width: 1.8rem;
      height: 1.8rem;
      position: absolute;
      bottom: 0;
      cursor: pointer;

      @media (${devices.semiLarge}) {
        display: none;
      }

      svg {
        width: 100%;
        height: 100%;
        position: relative;
        left: -3px;
      }
    }
  }

  .mobile-library-categories {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column: 1/3;
    gap: 1rem;
    padding-top: 1rem;

    @media (${devices.semiLarge}) {
      display: none;
    }
  }

  .desktop-library-categories {
    display: none;

    @media (${devices.semiLarge}) {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  }

  .details {
    grid-column: 1/3;
    padding-top: 2rem;

    @media (${devices.semiLarge}) {
      display: grid;
      grid-column: 3/-1;
      padding-top: 0rem;
    }

    .description {
      padding-top: 1rem;
    }

    .description,
    .description * {
      font-style: normal !important;
      font-weight: normal;
      line-height: 150%;

      @media (${devices.semiLarge}) {
        order: 1;
      }
    }

    .categories {
      padding-top: 1rem;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      order: 1;

      @media (${devices.semiLarge}) {
        order: 0;
        padding-bottom: 1rem;
      }

      .category {
        font-weight: 400;
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid var(--secondary);
        color: var(--secondary);
        transition: all 0.3s ease-in-out;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;

        &:hover {
          background-color: var(--secondary);
          color: var(--neutral-primary);
        }

        @media (${devices.small}) {
          width: fit-content;
        }
      }
    }
  }
`;

const BookDetails = () => {
  const {
    state: { id },
  } = useLocation();

  const { bookDetails, isLoading, isFetching, isSuccess, error } =
    useGetBookDetailsQuery(id, {
      selectFromResult: (result: any) => {
        return {
          bookDetails: {
            id: result.data?.id,
            title: result.data?.volumeInfo.title,
            subtitle: result.data?.volumeInfo.subtitle,
            authors: result.data?.volumeInfo.authors,
            publishedDate: result.data?.volumeInfo.publishedDate,
            categories: result.data?.volumeInfo?.categories,
            description: result.data?.volumeInfo?.description,
            imageLinks: result.data?.volumeInfo.imageLinks,
            searchInfo: result.data?.searchInfo,
          } as Book,

          isLoading: result.isLoading,
          error: result.error,
          isSuccess: result.isSuccess,
          isFetching: result.isFetching,
        };
      },
    });
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const navigate = useNavigate();
  const [openAddToLibraryOptions, setOpenAddToLibraryOptions] = useState(false);

  if (!id) <Navigate to="/" />;

  useEffect(() => {
    if (bookDetails.description && descriptionRef.current) {
      descriptionRef.current.innerHTML = bookDetails.description.trim();
    } else if (!bookDetails.description && descriptionRef.current) {
      descriptionRef.current.innerHTML = "No description available";
    }
  }, [bookDetails.description]);

  //remove duplicate categories
  const categorySet = new Set(bookDetails.categories);
  const allCategories = [...categorySet]?.map((category, index) => {
    return (
      <p className="category" key={Date.now() + index}>
        {category}
      </p>
    );
  });

  const handleAuthorWorks = () => navigate(`/search/${bookDetails.authors}`);

  const handleAddToLibraryOptions = () => {
    setOpenAddToLibraryOptions((state) => !state);
  };

  // iffe to determine content
  const content = (() => {
    if (isLoading || isFetching) return <Loading />;
    if (error) return <p>Error</p>;

    if (isSuccess && bookDetails) {
      const src = bookDetails.imageLinks?.smallThumbnail;

      return (
        <StyledDetailsContainer>
          <div className="image">
            <figure>
              <img src={src} alt={bookDetails.title} />
            </figure>

            <p className="add" onClick={handleAddToLibraryOptions}>
              Add to Library
              <span>
                <BsFillBookmarkPlusFill color="var(--secondary)" />
              </span>
            </p>

            {openAddToLibraryOptions && (
              <article className="desktop-library-categories">
                <p>options</p>
              </article>
            )}
          </div>

          <article className="intro">
            <h1 className="title">{bookDetails.title}</h1>
            {bookDetails.subtitle && (
              <p className="subtitle">{bookDetails.subtitle}</p>
            )}
            {bookDetails.authors && (
              <p className="author">{bookDetails.authors[0]}</p>
            )}
            <p className="author-works" onClick={handleAuthorWorks}>
              More by Author
            </p>

            <div className="icon" onClick={handleAddToLibraryOptions}>
              <BsFillBookmarkPlusFill color="var(--secondary)" />
            </div>
          </article>

          {openAddToLibraryOptions && (
            <article className="mobile-library-categories">
              <p>options</p>
            </article>
          )}

          <article className="details">
            <p className="description" ref={descriptionRef}></p>

            {bookDetails.categories && (
              <div className="categories">{allCategories}</div>
            )}
          </article>
        </StyledDetailsContainer>
      );
    }
  })();

  return <Fragment>{content}</Fragment>;
};

export default BookDetails;
