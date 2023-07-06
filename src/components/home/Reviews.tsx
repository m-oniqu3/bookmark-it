import { Fragment, useMemo, useState } from "react";
import ReactStars from "react-rating-star-with-type";
import { styled } from "styled-components";
import { StyledText } from "../../styles/StyledText";
import { devices } from "../../styles/breakpoints";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Heading from "../helpers/ui/Heading";
import Modal from "../helpers/ui/Modal";
import Login from "../user/Login";
import { reviews } from "../utils/reviews";

const StyledReviews = styled.div`
  text-align: center;
  padding: 3rem 0;
  height: 100%;
  background-color: var(--neutral-light);

  .intro {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    max-width: 600px;
    margin: 0 auto;

    @media (${devices.medium}) {
      padding: 2rem 0;
    }
  }

  .reviews {
    padding-top: 4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;
    gap: 2rem;

    .review {
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      max-width: 500px;

      .stars {
        margin: 0 auto;
        width: fit-content;
      }
    }
  }
`;

const Reviews = () => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  const handleClick = () => setActiveModal({ type: ModalEnum.LOGIN_MODAL });

  //get three random reviews
  const limitReviews = useMemo(() => {
    return reviews.sort(() => 0.5 - Math.random()).slice(0, 3);
  }, []);

  const reviewList = limitReviews.map((review) => {
    const color = `var(--primary)`;
    return (
      <article key={review.id} className="review">
        <strong>{review.name}</strong>

        <div className="stars">
          <ReactStars value={5} count={5} size={16} activeColor={color} />
        </div>

        <StyledText>{review.review}</StyledText>
      </article>
    );
  });

  return (
    <Fragment>
      <StyledReviews>
        <Container>
          <article className="intro">
            <Heading
              variant="medium"
              text=" See what <span> others </span>are saying about BookMark."
            />

            <StyledText>
              Here are some reviews from users who have used BookMark.
            </StyledText>

            <Button onClick={handleClick}>Start Organizing</Button>
          </article>
          <div className="reviews">{reviewList}</div>
        </Container>
      </StyledReviews>

      {activeModal && (
        <Modal closeModal={() => setActiveModal(null)} variant>
          <Login />
        </Modal>
      )}
    </Fragment>
  );
};

export default Reviews;
