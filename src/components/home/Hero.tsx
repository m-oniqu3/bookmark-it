import { styled } from "styled-components";
import { devices } from "../../styles/breakpoints";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Heading from "../helpers/ui/Heading";

const StyledHero = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  position: relative;
  top: -1rem;

  article {
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    width: min(75%, 500px);
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    @media (${devices.medium}) {
      top: 50%;
    }

    h1 {
      width: min(70%, 80%);
    }

    p {
      font-weight: 300;
      line-height: 150%;
      width: min(90%, 350px);
    }

    button {
      width: fit-content;
    }
  }
`;

type Props = {
  heading: string;
  text: string;
  button: string;
  background: string;
};

const Hero = (props: Props) => {
  const { heading, text, button, background } = props;

  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <StyledHero url={background}>
      <Container>
        <article>
          <Heading variant="large" text={heading} />
          <p>{text}</p>
          <Button onClick={handleClick}>{button}</Button>
        </article>
      </Container>
    </StyledHero>
  );
};

export default Hero;
