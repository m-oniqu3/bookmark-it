import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledText } from "../../../styles/StyledText";
import { devices } from "../../../styles/breakpoints";
import Button from "./Button";
import Heading from "./Heading";

const StyledEmptyShelf = styled.section<{ $adjust?: boolean }>`
  text-align: center;
  display: grid;
  place-content: center;
  place-items: center;
  min-height: 80vh;
  height: 100%;
  position: relative;

  @media (${devices.xlarge}) {
    grid-template-columns: 1fr 1fr;
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
    width: ${(props) => (props.$adjust ? "min(85%, 400px);" : "min(75%, 300px)")};
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
  adjust?: boolean;
}

const Empty = (props: Props) => {
  const { src, route, message, buttonName, heading, adjust } = props;

  const navigate = useNavigate();
  const handleClick = () => navigate(`${route}`);

  return (
    <StyledEmptyShelf $adjust={adjust}>
      <figure>
        <img src={src} alt="Illustration" />
      </figure>

      <article>
        <Heading variant="small">{heading}</Heading>
        <StyledText>{message}</StyledText>
        <Button onClick={handleClick}>{buttonName}</Button>
      </article>
    </StyledEmptyShelf>
  );
};

export default Empty;
