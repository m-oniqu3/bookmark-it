import { useEffect, useRef } from "react";
import { styled } from "styled-components";

const HeadingBase = styled.h1`
  font-weight: bold;
  line-height: 110%;
  color: var(--secondary);
  font-family: "Rubik", sans-serif;

  span {
    color: var(--primary);
  }
`;

const MediumHeading = styled(HeadingBase)`
  font-size: 2rem;
`;

const LargeHeading = styled(HeadingBase)`
  font-size: clamp(2.8rem, 4vw, 4rem);
`;

type Props = {
  text: string;
  variant: "medium" | "large";
};

const Heading = (props: Props) => {
  const { text, variant } = props;
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = text;
    }
  }, [text]);

  const StyledHeading = variant === "medium" ? MediumHeading : LargeHeading;

  return <StyledHeading ref={ref}>{text}</StyledHeading>;
};

export default Heading;
