/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useRef, useState } from "react";
import ReactStars from "react-rating-star-with-type";
import { Navigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useGetBookDetailsQuery } from "../../store/features/api/apiSlice";
import { devices } from "../../styles/breakpoints";
import { Book } from "../../types/Book";
import Container from "../helpers/ui/Container";
import Loading from "../helpers/ui/Loading";

// @ts-expect-error - no types available
import { ColorExtractor } from "react-color-extractor";
import { StyledTitle } from "../../styles/StyledTitle";
import { parseColor } from "../utils/parseColor";

const StyledDetailsContainer = styled(Container)<StyledProps>`
  padding: 2rem 0;

  @media (${devices.semiLarge}) {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
  }

  @media (${devices.xlarge}) {
    grid-template-columns: ${({ categories }) => (categories ? "250px 1fr 15.5rem;" : "200px 1fr")};
    width: ${({ categories }) => (categories ? "" : "70%")};
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

    @media (${devices.large}) {
      margin: 0;
      margin-left: auto;
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
      width: ${({ categories }) => (categories ? "80%" : "85%")};
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
      font-size: clamp(1.5rem, 2.5vw, 2.3rem);
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

    .rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;

      @media (${devices.semiLarge}) {
        padding-top: 0.2rem;
        justify-content: flex-start;
      }

      svg {
        color: ${({ background }) => background};
      }
    }
  }

  .details {
    .synopsis {
      font-size: clamp(1.2rem, 1.5vw, 1.6rem);
      font-weight: 700;
      color: var(--secondary);
      margin-top: 1.2rem;

      @media (${devices.medium}) {
        margin-top: 1.8rem;
      }
    }

    .description {
      padding-top: 0.5rem;
    }

    .description,
    .description * {
      font-style: normal !important;
      font-weight: 300;
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

type StyledProps = {
  background: string;
  categories: boolean;
};

const BookDetails = () => {
  const { id } = useParams() as { id: string };
  const [colors, setColors] = useState<string[]>([]);

  const { bookDetails, isLoading, isFetching, isSuccess, error } = useGetBookDetailsQuery(id, {
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
          averageRating: result.data?.volumeInfo?.averageRating,
          ratingsCount: result.data?.volumeInfo?.ratingsCount,
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
  const categorySet = new Set(bookDetails.categories?.map((cat) => cat.split("/"))?.flat());
  const allCategories = [...categorySet]?.map((category, index) => {
    const newColor = parseColor(colors[index % colors.length]);

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

  const background = colors[0];

  // iife to determine content
  const content = (() => {
    if (isLoading || isFetching) return <Loading />;
    if (error) return <p>Error</p>;

    if (isSuccess && bookDetails) {
      const src = `/api/content?id=${id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;

      return (
        <StyledDetailsContainer background={background} categories={!!bookDetails.categories}>
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
              {bookDetails.subtitle && <p className="subtitle">{bookDetails.subtitle}</p>}
              {bookDetails.authors && <p className="author">{bookDetails.authors[0]}</p>}

              <div className="rating">
                <ReactStars
                  value={bookDetails.averageRating || 1}
                  count={5}
                  size={16}
                  activeColor={background}
                  inactiveColor={`rgba(${parseColor(background)}, 0.8)`}
                />
                <p className="count">
                  {bookDetails.ratingsCount || 1}
                  {bookDetails.ratingsCount === 1 || !bookDetails.ratingsCount ? " review" : " reviews"}
                </p>
              </div>
            </div>

            <article className="details">
              {bookDetails.categories && <div className="categories">{allCategories}</div>}

              <div>
                <h2 className="synopsis">Synopsis</h2>
                <p className="description" ref={descriptionRef}></p>
              </div>
            </article>
          </section>
          {bookDetails.categories && (
            <aside>
              <StyledTitle>Genres</StyledTitle>
              <div className="genres">{allCategories}</div>
            </aside>
          )}
        </StyledDetailsContainer>
      );
    }
  })();

  return <Fragment>{content}</Fragment>;
};

export default BookDetails;
