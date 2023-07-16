import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";
import useDetectClick from "../../../hooks/useDetectClick";

type StyledProps = {
  offsets: { x: number; y: number };
};

const StyledPopover = styled.div<StyledProps>`
  position: absolute;
  top: ${(props) => props.offsets.y + 10}px;
  left: ${(props) => props.offsets.x - 25}px;
  background-color: gainsboro;
  border: 1px solid #b6b6b6;
  border-radius: 5px;
  padding: 0.3rem;

  button {
    font-size: 0.9rem;
    padding: 4px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    border: none;

    &:hover {
      background-color: #737373;
      color: var(--neutral-primary);
    }
  }
`;

type Props = {
  children: React.ReactNode;
  closePopover: () => void;
  offsets: { x: number; y: number };
};

const Popover = (props: Props) => {
  const { children, closePopover, offsets } = props;
  const popoverRef = useRef<HTMLDivElement | null>(null);
  useDetectClick({ ref: popoverRef, closeElement: closePopover });

  useEffect(() => {
    window.addEventListener("resize", closePopover);

    return () => window.removeEventListener("resize", closePopover);
  }, [closePopover]);

  return ReactDOM.createPortal(
    <StyledPopover onClick={closePopover} offsets={offsets} ref={popoverRef}>
      <div className="content" style={{ top: props.offsets.y, left: props.offsets.x }}>
        {children}
      </div>
    </StyledPopover>,
    document.getElementById("popover") as HTMLDivElement
  );
};

export default Popover;
