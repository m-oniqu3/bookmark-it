import styled from "styled-components";
import { devices } from "./breakpoints";

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
  gap: 1.5rem;
  place-items: center;
  padding-bottom: 2rem;
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

  @media (${devices.medium}) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 2rem;
  }

  @media (${devices.xlarge}) {
    grid-template-columns: repeat(auto-fit, minmax(135px, 1fr));
    gap: 3rem;
  }
`;
