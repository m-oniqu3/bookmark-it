import ReactDOM from "react-dom";
import { styled } from "styled-components";
import { devices } from "../../../styles/breakpoints";

const StyledModal = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 25;
  backdrop-filter: blur(5px);

  display: flex;
  justify-content: center;
  align-items: center;

  .children {
    position: fixed;
    width: 300px;
    bottom: 0.5rem;
    background-color: var(--neutral-primary);
    border: 1px solid #dbdbdb;
    padding: 0.5rem;
    border-radius: 5px;

    @media (${devices.xsmall}) {
      position: relative;
    }
  }
`;

type Props = {
  children: React.ReactNode;
  closeModal: () => void;
};

export const SmallModal = (props: Props) => {
  const { children, closeModal } = props;
  const handleEvent = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <StyledModal onClick={closeModal}>
      <div className="children" onClick={handleEvent}>
        {children}
      </div>
    </StyledModal>,
    document.getElementById("modal") as HTMLDivElement
  );
};
