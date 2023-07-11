import { IoIosClose } from "react-icons/io";
import type { Book } from "../../types/Book";

import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { addSearch, removeSearch } from "../../store/features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { StyledTitle } from "../../styles/StyledTitle";
import { devices } from "../../styles/breakpoints";
import { parseColor } from "../utils/parseColor";

const StyledSidebar = styled.aside`
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
      min-width: max-content;
      height: fit-content;

      @media (${devices.large}) {
        min-width: fit-content;
      }
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

const Sidebar = (props: Props) => {
  const { books } = props;
  const colors = useAppSelector((state) => state.colours.bookColours);
  const recentSearches = useAppSelector((state) => state.searches.recentSearches);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const result = books
    .filter((book) => book.categories !== undefined)
    .filter((book) => book.imageLinks?.smallThumbnail !== undefined);

  const uniqueCategories = Array.from(
    new Set(
      result.map((book) => {
        const categories = book.categories ? book.categories[0] : "";
        return categories.toLowerCase();
      })
    )
  );

  const genreColours = Object.values(colors).slice(0, uniqueCategories.length);

  const content = uniqueCategories.map((genre, i) => {
    const background = `rgba(${parseColor(genreColours[i])}, 0.5)`;

    return (
      <div className="genre" style={{ backgroundColor: background }} key={genre}>
        {genre.toLowerCase()}
      </div>
    );
  });

  const handleSearch = (search: string) => {
    navigate(`/search/${search}`);
    dispatch(addSearch(search));
  };

  const deleteSearch = (search: string) => {
    dispatch(removeSearch(search));
  };

  const searches = recentSearches.map((search) => {
    return (
      <div className="search" key={search}>
        <p onClick={() => handleSearch(search)}> {search}</p>

        <span onClick={() => deleteSearch(search)}>
          <IoIosClose size={20} />
        </span>
      </div>
    );
  });

  return (
    <StyledSidebar>
      <div className="recents">
        {recentSearches.length > 0 && (
          <Fragment>
            <StyledTitle className="title">Recent Searches</StyledTitle>
            <div className="searches">{searches}</div>
          </Fragment>
        )}
      </div>

      <div className="genre-group">
        <StyledTitle className="title">Genres</StyledTitle>
        <div className="genres">{content}</div>
      </div>
    </StyledSidebar>
  );
};

export default Sidebar;
