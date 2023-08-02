import styled from "styled-components";
import { devices } from "./breakpoints";

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(75px, 1fr));
  gap: 1rem;
  place-items: center;
  place-content: start;
  width: 100%;
  height: 100%;

  @media (${devices.xsmall}) {
    grid-template-columns: repeat(auto-fit, minmax(90px, 1fr));
    gap: 1.2rem;
  }

  @media (${devices.medium}) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1.5rem;
  }

  @media (${devices.large}) {
    grid-template-columns: repeat(auto-fit, minmax(125px, 1fr));
    gap: 1.7rem;
  }
`;
