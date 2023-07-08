import { Fragment, useState } from "react";
import { styled } from "styled-components";
import Search from "../../assets/search.svg";
import useFilterLibrary from "../../hooks/useFilterLibrary";
import { StyledGrid } from "../../styles/StyledGrid";
import { devices } from "../../styles/breakpoints";
import { Filter } from "../../types/Book";
import Container from "../helpers/ui/Container";
import Empty from "../helpers/ui/Empty";

const StyledLibrary = styled(Container)`
  padding: 1.5rem 0;

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 15.5rem;
    gap: 3rem;

    .filters {
      order: 1;
    }
  }

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

    @media (${devices.large}) {
      flex-wrap: wrap;
      position: sticky;
      top: 12vh;
      height: fit-content;
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
      cursor: pointer;

      &.active {
        background-color: var(--secondary);
        color: var(--neutral-primary);
      }
    }
  }
`;

const filters: Filter[] = ["All", "TBR", "Reading", "Finished", "DNF"];

const Library = () => {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [activeAuthor, setActiveAuthor] = useState<string>("All");

  const { authors, books } = useFilterLibrary(activeFilter, activeAuthor);

  const handleFilter = (filter: Filter) => {
    setActiveFilter(filter);
  };

  const handleAuthor = (author: string) => {
    setActiveAuthor(author);
    console.log(author);
  };

  const filterList = filters.map((filter) => {
    const active = activeFilter === filter ? "active" : "";

    return (
      <div key={filter} className={`filter ${active}`} onClick={() => handleFilter(filter)}>
        {filter}
      </div>
    );
  });

  const authorList = ["All", ...authors].map((author) => {
    const active = activeAuthor === author ? "active" : "";

    return (
      <div key={author} onClick={() => handleAuthor(author)}>
        {author}
      </div>
    );
  });

  const content = (() => {
    if (books.length > 0) {
      return <StyledGrid>{books}</StyledGrid>;
    } else {
      return (
        <Empty
          src={Search}
          route="/explore"
          heading="There are no books here as yet"
          message="Search for a book to add it to your library or visit the explore page to find more books."
          buttonName="Explore"
        />
      );
    }
  })();

  return (
    <StyledLibrary>
      <div className="filters">
        <div>{filterList} </div>
        <div>{authorList}</div>
      </div>
      <Fragment>{content}</Fragment>
    </StyledLibrary>
  );
};

export default Library;
