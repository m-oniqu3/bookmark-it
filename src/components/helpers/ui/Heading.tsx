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

const SmallHeading = styled(HeadingBase)`
  font-size: clamp(1.5rem, 6vw, 2rem);
`;

const MediumHeading = styled(HeadingBase)`
  font-size: clamp(2rem, 6vw, 3rem);
`;

const LargeHeading = styled(HeadingBase)`
  font-size: clamp(2.8rem, 6vw, 4rem);
`;

type Props = {
  children: string;
  variant: "small" | "medium" | "large";
};

const Heading = (props: Props) => {
  const { children, variant } = props;
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = children;
    }
  }, [children]);

  const StyledHeading = (() => {
    switch (variant) {
      case "small":
        return SmallHeading;
      case "medium":
        return MediumHeading;
      case "large":
        return LargeHeading;
      default:
        return SmallHeading;
    }
  })();

  return <StyledHeading ref={ref} />;
};

export default Heading;
