import { styled } from "styled-components";
import { StyledGrid } from "../../../styles/StyledGrid";
import { devices } from "../../../styles/breakpoints";

const StyledLoading = styled.div`
  padding: 1.5rem 0;
  width: 100%;

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 15.5rem;
    gap: 3rem;

    aside {
      order: 1;
    }
  }

  .title {
    display: none;

    @media (${devices.large}) {
      display: grid;
      border-radius: 5px;
      padding: 6px;
      width: 120px;
      background-color: var(--neutral-light);
      margin-bottom: 1rem;
    }
  }

  .placeholder {
    background-color: var(--neutral-light);
    border-radius: 5px;
    height: calc(6rem + 24px);
    width: calc(4rem + 24px);

    @media (${devices.xsmall}) {
      height: calc(7.5rem + 24px);
      width: calc(5rem + 24px);
    }

    @media (${devices.medium}) {
      height: calc(10.8rem + 24px);
      width: calc(7.2rem + 24px);
    }
  }

  .genres,
  .searches {
    display: flex;
    gap: 1rem;
    width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;
    padding-bottom: 1rem;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (${devices.large}) {
      flex-wrap: wrap;
    }

    .genre {
      padding: 17px 4.5rem;
      border-radius: 5px;
      background-color: var(--neutral-light);

      &:nth-child(1n) {
        padding: 17px 3rem;
        background-color: var(--neutral-light);
      }

      &:nth-child(3n) {
        padding: 17px 2.5rem;
        background-color: var(--neutral-light);
      }
    }

    .search {
      padding: 17px 4.5rem;
      border-radius: 5px;
      background-color: var(--neutral-light);

      &:nth-child(3n) {
        padding: 17px 3rem;
        background-color: var(--neutral-light);
      }

      &:nth-child(1n) {
        padding: 17px 2.5rem;
        background-color: var(--neutral-light);
      }
    }
  }

  .placeholder,
  .genre,
  .search {
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
  }
`;

const createPlaceholders = () => {
  const placeholderArray = [];

  for (let i = 0; i < 24; i++) {
    placeholderArray.push(<div className="placeholder" key={i}></div>);
  }

  return placeholderArray;
};

const createGenres = () => {
  const genresArray = [];
  for (let i = 0; i < 7; i++) {
    genresArray.push(<div className="genre" key={i}></div>);
  }

  return genresArray;
};

const createSearches = () => {
  const searches = [];
  for (let i = 0; i < 7; i++) {
    searches.push(<div className="search" key={i}></div>);
  }

  return searches;
};

const LoadingSearch = () => {
  const placeholders = createPlaceholders();
  const genres = createGenres();
  const searches = createSearches();

  return (
    <StyledLoading>
      <aside>
        <div>
          <div className="title"></div>
          <div className="genres">{genres}</div>
        </div>
        <div>
          <div className="title"></div>
          <div className="searches">{searches}</div>
        </div>
      </aside>
      <StyledGrid>{placeholders}</StyledGrid>
    </StyledLoading>
  );
};

export default LoadingSearch;
