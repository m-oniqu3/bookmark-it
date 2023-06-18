import styled from "styled-components";
import loading from "./../../../assets/blocks-wave.svg";

const StyledLoader = styled.div`
  display: grid;
  place-items: center;
  place-content: center;
  min-height: calc(90vh - 65px);
  height: 100%;
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
