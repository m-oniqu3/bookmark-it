import { styled } from "styled-components";
import { StyledText } from "../../styles/StyledText";
import { devices } from "../../styles/breakpoints";
import Container from "../helpers/ui/Container";
import Heading from "../helpers/ui/Heading";

const StyledGenre = styled.div`
  text-align: center;
  padding: 2rem 0;

  @media (${devices.large}) {
    text-align: left;
  }

  .container {
    @media (${devices.large}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      place-content: center;
      place-items: center;
    }
  }

  article {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;
    max-width: 500px;
    margin: 0 auto;

    @media (${devices.large}) {
      max-width: 450px;
      text-align: left;
      margin: 0;
      margin-right: auto;
      padding: 5rem 0;
    }

    .genres {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      padding: 2rem 0;

      @media (${devices.large}) {
        justify-content: flex-start;
        padding: 1rem 0;
      }

      .genre {
        font-size: 1rem;
        padding: 7px 10px;
        border-radius: 5px;
        border: 1px solid var(--secondary);
        color: var(--secondary);
        text-align: center;
        min-width: 120px;
        width: fit-content;
        transition: all 0.3s ease-in-out;

        &:hover {
          background-color: var(--secondary);
          color: var(--neutral-primary);
        }
      }
    }
  }

  figure {
    margin-top: 2rem;

    img {
      width: 90%;
      margin: 0 auto;

      object-fit: cover;
    }
  }
`;

type Props = {
  heading: string;
  paragraph: string;
  genres: string[];
  src: string;
  alt: string;
};

const Genre = (props: Props) => {
  const { heading, paragraph, genres, src, alt } = props;

  const genreList = genres.map((genre) => {
    return (
      <p key={genre} className="genre">
        {genre}
      </p>
    );
  });

  return (
    <StyledGenre>
      <Container className="container">
        <article>
          <Heading variant="medium" text={heading} />
          <StyledText>{paragraph}</StyledText>
          <div className="genres">{genreList}</div>
        </article>
        <figure>
          <img src={src} alt={alt} />
        </figure>
      </Container>
    </StyledGenre>
  );
};

export default Genre;
