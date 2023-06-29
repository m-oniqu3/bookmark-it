import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import type { Book } from "../../types/Book";

// @ts-expect-error - no types available
import { ColorExtractor } from "react-color-extractor";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
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
  const [colors, setColors] = useState<string[]>([]);
  const navigate = useNavigate();

  const result = books
    .filter((book) => book.categories !== undefined)
    .filter((book) => book.imageLinks?.smallThumbnail !== undefined);

  const uniqueGenres = new Set(
    result
      .map((book) => {
        const categories: string = book.categories ? book.categories[0] : "";
        return categories.toLowerCase();
      })
      .flat() as string[]
  );

  const uniqueColors = new Set() as Set<string>;

  const handleColors = (values: string[]) => {
    uniqueColors.add(values[0]);
    setColors([...uniqueColors]);
  };

  const image = result.map((book, i) => {
    const src = `/api/content?id=${book.id}&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api`;

    return (
      <ColorExtractor key={i} getColors={handleColors}>
        <img src={src} alt={book.title} />
      </ColorExtractor>
    );
  });

  const content = (
    <div className="genres">
      {[...uniqueGenres].map((genre, i) => (
        <div
          className="genre"
          style={{ backgroundColor: `rgba(${parseColor(colors[i])}, 0.5)` }}
          key={i}
        >
          {genre.toLowerCase()}
        </div>
      ))}
    </div>
  );

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
        {content}
      </div>
      <div style={{ display: "none" }}>{image}</div>
    </StyledSidebar>
  );
};

export default Sidebar;
