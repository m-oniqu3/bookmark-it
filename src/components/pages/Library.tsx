import { Fragment, useState } from "react";
import { styled } from "styled-components";
import Search from "../../assets/search.svg";
import useFilterLibrary from "../../hooks/useFilterLibrary";
import { useAppSelector } from "../../store/hooks/hooks";
import { StyledGrid } from "../../styles/StyledGrid";
import { devices } from "../../styles/breakpoints";
import { Filter } from "../../types/Book";
import Container from "../helpers/ui/Container";
import Empty from "../helpers/ui/Empty";
import { parseColor } from "../utils/parseColor";

const StyledLibrary = styled(Container)`
  padding: 1.5rem 0;

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 15.5rem;
    gap: 3rem;

    .options {
      order: 1;
    }
  }

  .title {
    display: none;

    @media (${devices.large}) {
      display: block;
      padding-bottom: 1rem;
      color: var(--secondary);
      font-size: 0.9rem;
      font-weight: 400;
    }
  }

  .options {
    display: flex;
    flex-direction: column;

    @media (${devices.large}) {
      /* flex-wrap: wrap; */
      position: sticky;
      top: 12vh;
      height: fit-content;
      gap: 2rem;
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

  .authors {
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

    .author {
      padding: 7px 12px;
      border-radius: 5px;
      text-transform: capitalize;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      min-width: fit-content;
      cursor: pointer;

      &.active {
        background-color: var(--secondary) !important;
        color: var(--neutral-primary) !important;
      }
    }
  }
`;

const filters: Filter[] = ["All", "TBR", "Reading", "Finished", "DNF"];

const Library = () => {
  const colors = useAppSelector((state) => state.colours.bookColours);
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [activeAuthor, setActiveAuthor] = useState<string>("All");

  const { authors, books } = useFilterLibrary(activeFilter, activeAuthor);

  const authorColours = Object.values(colors).slice(0, authors.length + 1);

  const handleFilter = (filter: Filter) => setActiveFilter(filter);
  const handleAuthor = (author: string) => setActiveAuthor(author);

  const filterList = filters.map((filter) => {
    const active = activeFilter === filter ? "active" : "";

    return (
      <div key={filter} className={`filter ${active}`} onClick={() => handleFilter(filter)}>
        {filter}
      </div>
    );
  });

  const authorList = ["All", ...authors].map((author, i) => {
    const active = activeAuthor === author ? "active" : "";
    const background = `rgba(${parseColor(authorColours[i])}, 0.5)`;

    return (
      <div
        key={author}
        className={`author ${active}`}
        onClick={() => handleAuthor(author)}
        style={{ backgroundColor: background }}
      >
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
      <div className="options">
        <div>
          <h3 className="title">Categories</h3>
          <div className="filters">{filterList}</div>
        </div>

        <div>
          <h3 className="title">Authors</h3>
          <div className="authors">{authorList}</div>
        </div>
      </div>
      <Fragment>{content}</Fragment>
    </StyledLibrary>
  );
};

export default Library;
