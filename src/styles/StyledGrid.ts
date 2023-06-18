import styled from "styled-components";
import { devices } from "./breakpoints";

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(95px, 1fr));
  gap: 1rem;
  place-items: center;
  padding-bottom: 2rem;

  @media (${devices.medium}) {
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
    gap: 1.5rem;
  }

  @media (${devices.xlarge}) {
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  }
`;
