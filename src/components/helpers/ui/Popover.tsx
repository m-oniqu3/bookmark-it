import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { styled } from "styled-components";
import useDetectClick from "../../../hooks/useDetectClick";
import { devices } from "../../../styles/breakpoints";

type StyledProps = {
  offsets: { x: number; y: number };
};

const StyledPopover = styled.div<StyledProps>`
  position: absolute;
  border-radius: 5px;
  z-index: 20;
  top: calc(${(props) => props.offsets.y + 25}px);
  left: calc(${(props) => props.offsets.x - props.offsets.x}px);
  background-color: var(--neutral-primary);
  border: 1px solid #dbdbdb;
  padding: 0.5rem;

  @media (${devices.medium}) {
    top: calc(${(props) => props.offsets.y + 25}px);
    left: calc(${(props) => props.offsets.x - 20}px);
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

  //check if popover will fit in the screen
  useEffect(() => {
    const popover = popoverRef.current;
    if (popover) {
      const { width, height } = popover.getBoundingClientRect();
      const { innerWidth, innerHeight } = window;
      const { x, y } = offsets;

      if (x + width > innerWidth) {
        popover.style.left = `${innerWidth - width - 20}px`;
      }
      if (y + height > innerHeight) {
        popover.style.top = `${innerHeight - height - 25}px`;
      }
    }
  }, [offsets]);

  useEffect(() => {
    window.addEventListener("resize", closePopover);

    return () => window.removeEventListener("resize", closePopover);
  }, [closePopover]);

  return ReactDOM.createPortal(
    <StyledPopover onClick={closePopover} offsets={offsets} ref={popoverRef}>
      <div className="content">{children}</div>
    </StyledPopover>,
    document.getElementById("popover") as HTMLDivElement
  );
};

export default Popover;
