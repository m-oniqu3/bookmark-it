import { styled } from "styled-components";
import { devices } from "./breakpoints";

export const StyledTitle = styled.h3`
  display: none;

  @media (${devices.large}) {
    display: block;
    padding-bottom: 1rem;
    color: var(--secondary);
    font-size: 0.9rem;
    font-weight: 400;
  }
`;
