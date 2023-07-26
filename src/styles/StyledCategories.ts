import { styled } from "styled-components";
import { devices } from "./breakpoints";

export const StyledCategories = styled.div`
  display: flex;
  gap: 1rem;

  .category {
    padding: 7px 12px;
    border-radius: 5px;
    text-transform: capitalize;
    font-size: 0.9rem;
    font-weight: 500;
    color: #1a1a1a;
    background-color: var(--neutral-light);
    min-width: fit-content;
    cursor: pointer;
    height: 31px;
  }

  @media (${devices.large}) {
    flex-wrap: wrap;
    position: sticky;
    top: 12vh;
    height: fit-content;
    padding-bottom: 1rem;
  }
`;
