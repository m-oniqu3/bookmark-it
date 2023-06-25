import { StyledGrid } from "../../../styles/StyledGrid";

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

  return <StyledGrid>{placeholders}</StyledGrid>;
};

export default Loading;
