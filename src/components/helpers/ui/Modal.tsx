import { ReactNode } from "react";
import ReactDOM from "react-dom";
import { IoIosClose } from "react-icons/io";
import { styled } from "styled-components";
import { devices } from "../../../styles/breakpoints";

type Props = {
  children: ReactNode;
  variant?: "primary" | "secondary";
};

const ModalBase = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 5;
  backdrop-filter: blur(5px);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPrimaryModal = styled(ModalBase)`
  .children {
    position: fixed;
    bottom: 0.5rem;
    left: 0.5rem;
    width: calc(100vw - 1rem);
    background-color: var(--neutral-primary);
    border-radius: 8px;

    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px,
      rgba(17, 17, 26, 0.1) 0px 0px 8px;
    padding: 0.5rem;

    @media (${devices.medium}) {
      position: relative;
      width: 550px;
      padding: 0.8rem;
    }

    .icon-container {
      position: relative;
      z-index: 10;
      cursor: pointer;
      opacity: 0.5;

      .icon {
        position: absolute;
        top: -10px;
        right: -10px;
      }
    }
  }
`;

const StyledSecondaryModal = styled(ModalBase)`
  .children {
  }
`;

const Modal = (props: Props) => {
  const { variant, children } = props;

  const handleEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  const Modal = variant ? StyledSecondaryModal : StyledPrimaryModal;
  return ReactDOM.createPortal(
    <Modal>
      <div className="children" onClick={handleEvent}>
        <div className="icon-container">
          <IoIosClose size="35px" className="icon" color="var(--secondary)" />
        </div>

        {children}
      </div>
    </Modal>,
    document.querySelector("#modal") as HTMLDivElement
  );
};

export default Modal;
