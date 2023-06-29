/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { useGetBookDetailsQuery } from "../../store/features/api/apiSlice";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";
import Container from "../helpers/ui/Container";
import Loading from "../helpers/ui/Loading";

// @ts-expect-error - no types available
import { ColorExtractor } from "react-color-extractor";
import { parseColor } from "../utils/parseColor";

const StyledDetailsContainer = styled(Container)<{ background: string }>`
  padding: 2rem 0;

  @media (${devices.semiLarge}) {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }

  @media (${devices.xlarge}) {
    grid-template-columns: 250px 1fr 15.5rem;
    gap: 1rem;
  }

  .background {
    background-color: ${({ background }) => `rgba(${parseColor(background)},
       0.5)`};
    padding: 0.8rem;
    border-radius: 5px;
    margin: 0 auto 1rem;
    width: fit-content;

    @media (${devices.semiLarge}) {
      width: fit-content;
      height: fit-content;
      place-items: start;
    }

    figure {
      position: relative;
      height: 11rem;
      width: 7.125rem;
      border-radius: 10px;

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
  }

  .overview {
    @media (${devices.xlarge}) {
      width: 85%;
      margin: 0 auto;
    }
  }

  .intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    gap: 0.3rem;
    text-align: center;

    @media (${devices.semiLarge}) {
      text-align: left;
    }

    .title {
      font-size: clamp(1.5rem, 2.5vw, 2rem);
      color: var(--secondary);
      font-family: "Rubik", sans-serif;
      font-weight: bold;
    }

    .subtitle {
      color: var(--neutral-medium);
      font-size: 0.95rem;
      overflow: hidden !important;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .author {
      color: var(--secondary);
      font-size: 1rem;
      font-weight: 600;
    }
  }

  .details {
    .description {
      padding-top: 1rem;
    }

    .description,
    .description * {
      font-style: normal !important;
      font-weight: normal;
      line-height: 150%;
    }

    .categories {
      padding-top: 1rem;
      display: flex;
      align-items: center;
      overflow-x: scroll;
      scrollbar-width: none;
      gap: 1rem;
      width: 100%;

      &::-webkit-scrollbar {
        display: none;
      }

      @media (${devices.medium}) {
        overflow-x: hidden;
        flex-wrap: wrap;
        justify-content: center;
      }

      @media (${devices.semiLarge}) {
        justify-content: flex-start;
      }

      @media (${devices.xlarge}) {
        display: none;
      }

      .category {
        font-size: 0.9rem;
        font-weight: 400;
        padding: 7px 10px;
        border-radius: 5px;
        color: black;
        text-align: center;
        min-width: fit-content;
        font-weight: 500;
      }
    }
  }

  aside {
    display: none;

    @media (${devices.xlarge}) {
      display: block;

      .genres {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        width: 100%;

        .category {
          padding: 7px 12px;
          border-radius: 5px;
          text-transform: capitalize;
          font-size: 0.9rem;
          font-weight: 500;
          color: #1a1a1a;
          min-width: fit-content;
        }
      }
    }
  }
`;

const BookDetails = () => {
  const {
    state: { id },
  } = useLocation();
  const [colors, setColors] = useState<string[]>([]);

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

  // const [openAddToLibraryOptions, setOpenAddToLibraryOptions] = useState(false);

  if (!id) <Navigate to="/" />;

  useEffect(() => {
    if (bookDetails.description && descriptionRef.current) {
      descriptionRef.current.innerHTML = bookDetails.description.trim();
    } else if (!bookDetails.description && descriptionRef.current) {
      descriptionRef.current.innerHTML = "No description available";
    }
  }, [bookDetails.description]);

  //remove duplicate categories, split categories with "/" and flatten array
  const categorySet = new Set(
    bookDetails.categories?.map((cat) => cat.split("/"))?.flat()
  );
  const allCategories = [...categorySet]?.map((category, index) => {
    const newColor = parseColor(colors[index % colors.length]);
    console.log("newColor", newColor);
    return (
      <p
        className="category"
        key={category}
        style={{
          backgroundColor: `rgba(${newColor}, 0.5)`,
        }}
      >
        {category}
      </p>
    );
  });

  // const handleAddToLibraryOptions = () => {
  //   setOpenAddToLibraryOptions((state) => !state);
  // };

  const handleColors = (colors: string[]) => {
    setColors(colors);
  };

  // iffe to determine content
  const content = (() => {
    if (isLoading || isFetching) return <Loading />;
    if (error) return <p>Error</p>;

    if (isSuccess && bookDetails) {
      const src = `/api/content?id=${id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;

      return (
        <StyledDetailsContainer background={colors[0]}>
          <div className="background">
            <figure>
              <ColorExtractor getColors={handleColors}>
                <img src={src} alt={bookDetails.title} />
              </ColorExtractor>
            </figure>
          </div>

          <section className="overview">
            <div className="intro">
              <h1 className="title">{bookDetails.title}</h1>
              {bookDetails.subtitle && (
                <p className="subtitle">{bookDetails.subtitle}</p>
              )}
              {bookDetails.authors && (
                <p className="author">{bookDetails.authors[0]}</p>
              )}
            </div>

            <article className="details">
              {bookDetails.categories && (
                <div className="categories">{allCategories}</div>
              )}

              <p className="description" ref={descriptionRef}></p>
            </article>
          </section>

          <aside>
            {bookDetails.categories && (
              <div className="genres">{allCategories}</div>
            )}
          </aside>
        </StyledDetailsContainer>
      );
    }
  })();

  return <Fragment>{content}</Fragment>;
};

export default BookDetails;

/* {openAddToLibraryOptions && (
              <article className="desktop-library-categories">
                <Options />
              </article>
            )}

             {openAddToLibraryOptions && (
            <article className="mobile-library-categories">
              <Options />
            </article>
          )}
          
            <div className="icon">
              <BsFillBookmarkPlusFill color="var(--secondary)" />
            </div>
            
   <p className="add" onClick={handleAddToLibraryOptions}>
              Add to Library
              <span>
                <BsFillBookmarkPlusFill color="var(--secondary)" />
              </span>
            </p>*/
