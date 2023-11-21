/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useRef, useState } from "react";
import { ImBookmark } from "react-icons/im";
import ReactStars from "react-rating-star-with-type";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import server_down from "../../assets/server_down.svg";
import web_search from "../../assets/web_search.svg";
import { useGetBookDetailsQuery } from "../../store/features/api/apiSlice";
import { addSearch } from "../../store/features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { StyledTitle } from "../../styles/StyledTitle";
import Empty from "../helpers/ui/Empty";
import { parseColor } from "../utils/parseColor";
import Options from "./Options";

import useBackground from "../../hooks/useBackground";
import { StyledDetailsContainer } from "../../styles/StyledDetailsContainer";
import { ModalEnum, ModalType } from "../../types/ModalType";
import LoadingDetails from "../helpers/ui/LoadingDetails";
import Modal from "../helpers/ui/Modal";
import Login from "../user/Login";
import { selectBookDetails } from "../utils/selectors";

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

  const { color: bookColor, palette } = useBackground(id, bookDetails?.imageLinks?.smallThumbnail as string);

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
    } else if (descriptionRef.current && !bookDetails.description) {
      descriptionRef.current.innerHTML = "No description available";
    }
  }, [bookDetails.description]);

  const isBookInLibrary = !!library[id];

  //remove duplicate categories, split categories with "/" and flatten array
  const categorySet = new Set(bookDetails.categories?.map((cat) => cat.split("/"))?.flat());
  const allCategories = [...categorySet]?.map((category, index) => {
    const newColor = parseColor(palette[index % palette.length]);

    const color = `rgba(${newColor}, 0.5)`;
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
      const src = bookDetails.imageLinks?.smallThumbnail;

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
