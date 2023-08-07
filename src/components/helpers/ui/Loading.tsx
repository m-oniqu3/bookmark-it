import styled from "styled-components";
import loading from "../../../assets/blocks-wave.svg";

const StyledLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: grid;
  background-color: rgba(0, 0, 0, 0.179);
  place-items: center;
  place-content: center;
  height: 100vh;
  width: 100vw;
  z-index: 40;
  overflow: hidden;
`;

const Loading = () => {
  return (
    <StyledLoader>
      <figure>
        <img src={loading} alt="Loading icon" />
      </figure>
    </StyledLoader>
  );
};

export default Loading;
