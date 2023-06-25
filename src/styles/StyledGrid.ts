import styled from "styled-components";
import { devices } from "./breakpoints";

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
  gap: 1rem;
  place-items: center;
  padding-bottom: 2rem;
  width: 100%;
  height: 100%;

  .placeholder {
    background-color: var(--primary);
    border-radius: 5px;
    opacity: 0.2;
    height: 9.8rem;
    width: 6.5rem;

    @media (${devices.medium}) {
      height: 11.5rem;
      width: 7.5rem;
    }
  }

  @media (${devices.medium}) {
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 1.5rem;
  }

  @media (${devices.xlarge}) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;
