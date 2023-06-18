import { FcGoogle } from "react-icons/fc";
import { styled } from "styled-components";
import BookSitting from "../../assets/book_sitting.png";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";

const StyledLogin = styled(Container)`
  text-align: center;
  padding: 1rem 0;

  h1 {
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    color: var(--primary);
    font-family: "Roboto", sans-serif;
    font-weight: 700;
  }

  .intro {
    padding: 1rem 0;
    line-height: 135%;
    max-width: 450px;
    margin: 0 auto;
  }

  figure {
    width: 70%;
    max-width: 250px;
    margin: 1rem auto;

    img {
      width: 100%;
    }
  }

  button {
    width: 100%;
    max-width: 250px;
    margin: 1.5rem auto 0;

    span {
      display: grid;
      place-items: center;
    }
  }
`;

const Login = () => {
  return (
    <StyledLogin>
      <h1>Start Organizing</h1>
      <p className="intro">
        Join Bookmark and access all your favourites in one place. Organize your
        books by adding them to your library and shelves.
      </p>

      <figure>
        <img src={BookSitting} alt="Illustration of a girl sitting on a book" />
      </figure>

      <Button buttonType="action" onClick={() => console.log("click")}>
        <span>
          <FcGoogle size={25} />
        </span>
        <p>Sign in with Google</p>
      </Button>
    </StyledLogin>
  );
};

export default Login;
