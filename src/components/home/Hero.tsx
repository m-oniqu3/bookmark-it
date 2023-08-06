import { useState } from "react";
import { styled } from "styled-components";
import { StyledText } from "../../styles/StyledText";
import { devices } from "../../styles/breakpoints";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Heading from "../helpers/ui/Heading";
import Modal from "../helpers/ui/Modal";
import Login from "../user/Login";

type StyledProps = {
  url: string;
};

const StyledHero = styled.div<StyledProps>`
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
      width: min(100%, 350px);
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
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const { heading, text, button, background } = props;

  const handleClick = () => setActiveModal({ type: ModalEnum.LOGIN_MODAL });

  return (
    <>
      <StyledHero url={background}>
        <Container>
          <article>
            <Heading variant="large" text={heading} />
            <StyledText>{text}</StyledText>
            <Button onClick={handleClick}>{button}</Button>
          </article>
        </Container>
      </StyledHero>

      {activeModal && (
        <Modal closeModal={() => setActiveModal(null)} variant>
          <Login closeModal={() => setActiveModal(null)} />
        </Modal>
      )}
    </>
  );
};

export default Hero;
