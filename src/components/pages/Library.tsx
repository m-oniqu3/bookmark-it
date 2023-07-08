import { styled } from "styled-components";
import Container from "../helpers/ui/Container";

const StyledLibrary = styled.div`
  padding: 1.5rem 0;

  .filters {
    display: flex;
    gap: 1rem;
    width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;
    padding-bottom: 1rem;

    &::-webkit-scrollbar {
      display: none;
    }

    .filter {
      padding: 7px 12px;
      border-radius: 5px;
      text-transform: capitalize;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      min-width: fit-content;
      background-color: var(--neutral-light);
    }
  }
`;

const filters = ["All", "TBR", "Reading", "Finished", "DNF"];

const Library = () => {
  const filterList = filters.map((filter) => {
    return (
      <div key={filter} className="filter">
        {filter}
      </div>
    );
  });

  return (
    <StyledLibrary>
      <Container>
        <div className="filters">{filterList}</div>
      </Container>
    </StyledLibrary>
  );
};

export default Library;
