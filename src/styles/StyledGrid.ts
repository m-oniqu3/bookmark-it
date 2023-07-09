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

  .placeholder {
    background-color: var(--primary);
    border-radius: 5px;
    height: 9.8rem;
    width: 6.5rem;

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

    @media (${devices.medium}) {
      height: 11.5rem;
      width: 7.5rem;
    }
  }

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
