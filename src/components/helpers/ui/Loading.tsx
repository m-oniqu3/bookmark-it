import { styled } from "styled-components";
import { StyledGrid } from "../../../styles/StyledGrid";

const StyledLoading = styled.div`
  width: 100%;

  .title {
    height: 6vh;
    margin-bottom: 1rem;
    width: 100%;
    margin-bottom: 1rem;
    background: var(--primary);
    border-radius: 5px;
    animation: pulse 5s infinite;

    @keyframes pulse {
      0% {
        opacity: 0.1;
      }

      25% {
        opacity: 0.15;
      }

      50% {
        opacity: 0.2;
      }

      75% {
        opacity: 0.15;
      }

      100% {
        opacity: 0.1;
      }
    }
  }
`;

const createPlaceholders = () => {
  const windowWidth = window.innerWidth - 24;
  const windowHeight = window.innerHeight - 65;

  let placeholderWidth;
  let placeholderHeight;
  const gap = 24;

  if (windowWidth >= 1024) {
    placeholderWidth = 120 + gap;
    placeholderHeight = 184 + gap;
  } else if (windowWidth >= 600) {
    placeholderWidth = 120 + gap;
    placeholderHeight = 184 + gap;
  } else {
    placeholderWidth = 104;
    placeholderHeight = 156.8;
  }

  const placeholderCount =
    Math.floor(windowWidth / placeholderWidth) *
    Math.floor(windowHeight / placeholderHeight);

  const placeholderArray = [];
  for (let i = 0; i < placeholderCount; i++) {
    placeholderArray.push(<div className="placeholder" key={i}></div>);
  }

  return placeholderArray;
};

const Loading = () => {
  const placeholders = createPlaceholders();

  return (
    <StyledLoading>
      <div className="title"></div>
      <StyledGrid>{placeholders}</StyledGrid>;
    </StyledLoading>
  );
};

export default Loading;
