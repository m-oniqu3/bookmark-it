import { styled } from "styled-components";
import bookgrid from "../../assets/book-grid.png";
import background from "../../assets/private_background.png";
import { StyledText } from "../../styles/StyledText";
import { devices } from "../../styles/breakpoints";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Heading from "../helpers/ui/Heading";

const StyledHero = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  position: relative;
  top: -0.5rem;

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding-bottom: 2rem;

    @media (${devices.medium}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      place-items: center;
    }

    article {
      /* position: absolute;
    top: 55%;
    transform: translateY(-50%); */
      width: min(100%, 500px);
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
      text-align: center;
      padding: 4rem 0;
      margin: 0 auto;

      @media (${devices.medium}) {
        text-align: left;
        margin: 0;
        margin-right: auto;
      }

      h1 {
        width: min(100%, 80%);
        margin: 0 auto;

        @media (${devices.medium}) {
          margin: 0;
        }
      }

      p {
        width: min(80%, 400px);
        margin: 0 auto;

        @media (${devices.medium}) {
          margin: 0;
        }
      }

      button {
        width: fit-content;
        margin: 0 auto;

        @media (${devices.medium}) {
          margin: 0;
        }
      }
    }

    figure {
      width: min(80%, 450px);
      height: 100%;
      margin: 0 auto;
      padding: 2rem 0;

      @media (${devices.medium}) {
        margin: 0;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

const AuthHero = () => {
  const heading = "Start <span>organizing</span> ";

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <StyledHero url={background}>
      <Container className="container">
        <article>
          <Heading variant="large" text={heading} />
          <StyledText>
            Keep track of the books you've read, the books you're currently reading, the books you want to read and
            those hard to finish books.
          </StyledText>

          <Button onClick={handleClick}>Get Started</Button>
        </article>

        <figure>
          <img src={bookgrid} alt="grid of books" />
        </figure>
      </Container>
    </StyledHero>
  );
};

export default AuthHero;
