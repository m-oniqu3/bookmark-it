import { styled } from "styled-components";
import { StyledGrid } from "../../../styles/StyledGrid";
import { devices } from "../../../styles/breakpoints";

const StyledLoading = styled.div`
  width: 100%;

  .placeholder {
    background-color: var(--neutral-light);
    border-radius: 5px;
    height: calc(6rem + 24px);
    width: calc(4rem + 24px);

    @media (${devices.xsmall}) {
      height: calc(7.5rem + 24px);
      width: calc(5rem + 24px);
    }

    @media (${devices.medium}) {
      height: calc(10.8rem + 24px);
      width: calc(7.2rem + 24px);
    }
  }

  .placeholder {
    animation: pulse 1s infinite;
    @keyframes pulse {
      0% {
        opacity: 0.4;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0.4;
      }
    }
  }
`;

const createPlaceholders = () => {
  const placeholderArray = [];

  for (let i = 0; i < 24; i++) {
    placeholderArray.push(<div className="placeholder" key={i}></div>);
  }

  return placeholderArray;
};

const LoadingBooks = () => {
  const placeholders = createPlaceholders();
  return (
    <StyledLoading>
      <StyledGrid>{placeholders}</StyledGrid>
    </StyledLoading>
  );
};

export default LoadingBooks;
