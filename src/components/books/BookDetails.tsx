/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useRef, useState } from "react";
import { ImBookmark } from "react-icons/im";
import ReactStars from "react-rating-star-with-type";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import server_down from "../../assets/server_down.svg";
import web_search from "../../assets/web_search.svg";
import { useGetBookDetailsQuery } from "../../store/features/api/apiSlice";
import { addSearch } from "../../store/features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { StyledTitle } from "../../styles/StyledTitle";
import { devices } from "../../styles/breakpoints";
import Container from "../helpers/ui/Container";
import Empty from "../helpers/ui/Empty";
import { parseColor } from "../utils/parseColor";
import Options from "./Options";

import useBackground from "../../hooks/useBackground";
import { ModalEnum, ModalType } from "../../types/ModalType";
import LoadingDetails from "../helpers/ui/LoadingDetails";
import Modal from "../helpers/ui/Modal";
import Login from "../user/Login";
import { selectBookDetails } from "../utils/selectors";

type StyledProps = {
  background: string;
  categories: boolean;
};

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
    padding: 13px;
    border-radius: 5px;
    margin: 0 auto 1rem;
    width: fit-content;
    position: relative;

    @media (${devices.semiLarge}) {
      width: fit-content;
      height: fit-content;
      place-items: start;
    }

    @media (${devices.large}) {
      margin: 0;
      margin-left: auto;
    }

    .icon {
      position: absolute;
      top: 0;
      right: -1px;
      z-index: 1;
      filter: brightness(70%);
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
      margin: 0 auto;
      color: var(--secondary);
      font-size: 1rem;
      font-weight: 600;
      padding-bottom: 3px;
      width: fit-content;
      cursor: pointer;

      &:hover {
        background: ${({ background }) => `linear-gradient(to left, #000000c5, rgba(${parseColor(background)}) 100%)`};
        background-position: 0 100%;
        background-size: 100% 2px;
        background-repeat: no-repeat;
      }

      @media (${devices.semiLarge}) {
        margin: 0;
        margin-right: auto;
      }
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
      word-break: break-word;
    }

    .description,
    .description * {
      font-style: normal !important;
      font-weight: 300;
      line-height: 150%;
      word-break: break-word;
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
        text-transform: capitalize;
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
          text-transform: capitalize;
        }
      }
    }
  }

  .options {
    display: grid;
    /* justify-content: center; */
    place-items: center;

    padding: 0.5rem 0;

    @media (${devices.large}) {
      place-items: end;
      padding: 1rem 0;
    }

    button {
      width: 139.594px;
      font-size: 0.9rem;
      padding: 8px 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      border: none;
      color: #1a1a1a;
      font-weight: 500;
      background-color: ${({ background }) => `rgba(${parseColor(background)},
       0.5)`};

      &:hover {
        background-color: ${({ background }) => `rgba(${parseColor(background)},
      0.8)`};
        color: var(--neutral-primary);
      }

      @media (${devices.medium}) {
        width: 169.594px;
      }
    }
  }
`;

const BookDetails = () => {
  const { id } = useParams() as { id: string };

  const { library } = useAppSelector((state) => state.bookStore);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);
  const [options, setOptions] = useState(false);
  const { isSignedIn } = useAppSelector((state) => state.auth);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  if (!id) <Navigate to="/" />;

  const { bookDetails, isLoading, isFetching, isSuccess, error } = useGetBookDetailsQuery(id, {
    selectFromResult: (result: any) => selectBookDetails(result),
  });

  const bookColor = useBackground(id, bookDetails?.imageLinks?.smallThumbnail as string);

  const handleAuthor = () => {
    const author = bookDetails.authors ? bookDetails.authors[0] : "";
    if (author) {
      navigate(`/search/${author}`);
      dispatch(addSearch(author));
    }
  };

  const handleOptions = () => {
    if (!isSignedIn) {
      return setActiveModal({ type: ModalEnum.LOGIN_MODAL });
    }

    setOptions((state) => !state);
  };

  const closeModal = () => setActiveModal(null);

  useEffect(() => {
    if (bookDetails.description && descriptionRef.current) {
      descriptionRef.current.innerHTML = bookDetails.description.trim();
    } else if (bookDetails.description === "" && descriptionRef.current) {
      descriptionRef.current.innerHTML = "No description available";
    } else if (descriptionRef.current) {
      descriptionRef.current.innerHTML = "No description available";
    }
  }, [bookDetails.description]);

  const isBookInLibrary = !!library[id];

  //remove duplicate categories, split categories with "/" and flatten array
  const categorySet = new Set(bookDetails.categories?.map((cat) => cat.split("/"))?.flat());
  const allCategories = [...categorySet]?.map((category, index) => {
    const newColor = parseColor(bookColor);

    const color = `rgba(${newColor}, ${0.2 + index * 0.1})`;
    return (
      <p className="category" key={category} style={{ backgroundColor: `${color}` }}>
        {category.toLowerCase()}
      </p>
    );
  });

  // iife to determine content
  const content = (() => {
    const icon = <ImBookmark size={28} color={bookColor} />;

    if (isLoading || isFetching) return <LoadingDetails />;
    if (error)
      return (
        <Empty
          src={server_down}
          heading="Something went wrong"
          message="Try searching for another book or visit the Explore page."
          buttonName="Explore"
          route="/explore/picks/all"
        />
      );

    if (!isSuccess || !bookDetails)
      return (
        <Empty
          src={web_search}
          heading="No results found"
          message="Try refreshing the page or visit the Explore page."
          buttonName="Explore"
          route="/explore/picks/all"
        />
      );

    if (isSuccess && bookDetails) {
      const src = `/api/content?id=${id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;

      return (
        <StyledDetailsContainer background={bookColor} categories={!!bookDetails.categories}>
          <div>
            <div className="background">
              {isBookInLibrary && <div className="icon">{icon}</div>}
              <figure>
                <img src={src} alt={bookDetails.title} />
              </figure>
            </div>

            <div className="options">
              <button onClick={handleOptions}>Add to Library</button>
              {options && <Options book={bookDetails} closeOptions={() => setOptions(false)} />}
            </div>
          </div>

          <section className="overview">
            <div className="intro">
              <h1 className="title">{bookDetails.title}</h1>
              {bookDetails.subtitle && <p className="subtitle">{bookDetails.subtitle}</p>}
              {bookDetails.authors && (
                <p className="author" onClick={handleAuthor}>
                  {bookDetails.authors[0]}
                </p>
              )}

              <div className="rating">
                <ReactStars
                  value={bookDetails.averageRating || 1}
                  count={5}
                  size={16}
                  activeColor={bookColor}
                  inactiveColor={`rgba(${parseColor(bookColor)}, 0.8)`}
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

  return (
    <>
      <Fragment>{content}</Fragment>
      {activeModal && (
        <Modal closeModal={closeModal} variant>
          <Login closeModal={closeModal} />
        </Modal>
      )}
    </>
  );
};

export default BookDetails;
