import { IoIosClose } from "react-icons/io";
import type { Book } from "../../types/Book";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { RootState } from "../../store";
import { devices } from "../../styles/breakpoints";
import { parseColor } from "../utils/parseColor";

const StyledSidebar = styled.aside`
  .title {
    display: none;

    @media (${devices.large}) {
      display: block;
      padding-bottom: 1rem;
      color: var(--secondary);
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

    .genre,
    .search {
      padding: 7px 12px;
      border-radius: 5px;
      text-transform: capitalize;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      min-width: fit-content;
    }
  }

  .searches {
    @media (${devices.large}) {
      padding-bottom: 1.5rem;
    }

    .search {
      background-color: var(--neutral-light);
      display: flex;
      gap: 5px;
      align-content: center;
      justify-content: center;
      cursor: pointer;

      p {
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 1.2rem;
        width: 1.2rem;
      }
    }
  }

  @media (${devices.large}) {
    position: sticky;
    top: 12vh;
    height: fit-content;
  }
`;

type Props = {
  books: Book[];
};

const recentSearches = [
  "helen hoang",
  "scythe",
  "lj shen",
  "punk 57",
  "ana huang",
];

const Sidebar = (props: Props) => {
  const { books } = props;
  const colors = useSelector((state: RootState) => state.colours.bookColours);
  const navigate = useNavigate();
  const uniqueCategories = {} as { [key: string]: string };

  const result = books
    .filter((book) => book.categories !== undefined)
    .filter((book) => book.imageLinks?.smallThumbnail !== undefined);

  const bookCategories = Array.from(
    new Set(
      result.map((book) => {
        const categories = book.categories ? book.categories[0] : "";
        return { categories, id: book.id };
      })
    )
  );

  bookCategories.map(({ categories, id }) => {
    if (!uniqueCategories[categories]) {
      uniqueCategories[categories] = id;
    }
  });

  const content = Object.keys(uniqueCategories).map((key) => {
    const background = `rgba(${parseColor(
      colors[uniqueCategories[key]]
    )}, 0.5)`;

    return (
      <div className="genre" style={{ backgroundColor: background }} key={key}>
        {key.toLowerCase()}
      </div>
    );
  });

  const handleSearch = (search: string) => {
    navigate(`/search/${search}`);
  };

  return (
    <StyledSidebar>
      <div className="recents">
        <h3 className="title">Recent Searches</h3>
        <div className="searches">
          {recentSearches.map((search, i) => (
            <div className="search" key={i}>
              <p onClick={() => handleSearch(search)}> {search}</p>

              <span>
                <IoIosClose size={20} />
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="genre-group">
        <h3 className="title">Genres</h3>
        <div className="genres">{content}</div>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
