import { styled } from "styled-components";
import { devices } from "./breakpoints";

export const StyledButtonGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem 0 0;
  gap: 0.4rem;

  @media (${devices.medium}) {
    gap: 1rem;
  }

  button {
    padding: 8px 10px;

    @media (${devices.medium}) {
      padding: 8px 20px;
    }
  }
`;
