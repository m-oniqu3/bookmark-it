import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import BookSitting from "../../assets/book_sitting.png";
import { auth, provider } from "../../firebase/firebase";
import { setUser } from "../../store/features/auth/authSlice";
import { useAppDispatch } from "../../store/hooks/hooks";
import { StyledText } from "../../styles/StyledText";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";

const StyledLogin = styled(Container)`
  text-align: center;
  padding: 1rem 0;

  h1 {
    font-size: clamp(1.2rem, 2vw, 1.7rem);
    color: var(--primary);
    font-family: "Rubik", sans-serif;
    font-weight: 700;
  }

  .intro {
    padding: 1rem 0;

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
    padding: 7px 20px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: 1px solid #f1f1f1;
    background-color: var(--neutral-light);

    span {
      display: grid;
      place-items: center;
    }

    &:hover {
      border: 1px solid transparent;
    }
  }
`;

type Props = {
  closeModal: () => void;
};

const Login = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const { closeModal } = props;

  const path = window.location.pathname;

  const handleLogin = function () {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const data = { user: result.user.uid, isSignedIn: true };
        console.log(data);
        dispatch(setUser(data));
        localStorage.setItem("bkmk_user", JSON.stringify(data));
        navigate(`${path}`, { replace: true });
        closeModal();
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
    setLoading(false);
  };

  return (
    <StyledLogin>
      <h1>Start Organizing</h1>
      <StyledText className="intro">
        Join Bookmark and access all your favourites in one place. Organize your books by adding them to your library
        and shelves.
      </StyledText>

      <figure>
        <img src={BookSitting} alt="Illustration of a girl sitting on a book" />
      </figure>

      <Button buttonType="action" disabled={loading} onClick={handleLogin}>
        <span>
          <FcGoogle size={25} />
        </span>
        <p>Sign in with Google</p>
      </Button>
    </StyledLogin>
  );
};

export default Login;
