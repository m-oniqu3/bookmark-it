import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledText } from "../../../styles/StyledText";
import { devices } from "../../../styles/breakpoints";
import Button from "./Button";
import Heading from "./Heading";

const StyledEmptyShelf = styled.section`
  text-align: center;
  display: grid;
  place-content: center;
  place-items: center;
  min-height: 80vh;
  height: 100%;
  position: relative;

  @media (${devices.xlarge}) {
    grid-template-columns: 1fr 1fr;
    /* gap: 1rem; */
    max-width: 56.25rem;
    margin: 0 auto;
    height: 50vh;
  }

  figure {
    width: min(85%, 300px);
    margin: 0 auto 1.5rem;

    img {
      width: 100%;
    }
  }

  article {
    max-width: 300px;
    margin: 0 auto;

    @media (${devices.xlarge}) {
      max-width: 350px;
      text-align: left;
    }

    p {
      padding: 1rem 0;
    }
  }
`;

interface Props {
  src: string;
  route: string;
  heading: string;
  message: string;
  buttonName: string;
}

const Empty = (props: Props) => {
  const { src, route, message, buttonName, heading } = props;

  const navigate = useNavigate();
  const handleClick = () => navigate(`${route}`);

  return (
    <StyledEmptyShelf>
      <figure>
        <img src={src} alt="Illustration" />
      </figure>

      <article>
        <Heading variant="small" text={heading} />
        <StyledText>{message}</StyledText>
        <Button onClick={handleClick}>{buttonName}</Button>
      </article>
    </StyledEmptyShelf>
  );
};

export default Empty;
