import { Fragment, useState } from "react";
import type { Book } from "../../types/Book";

// @ts-expect-error - no types available
import { ColorExtractor } from "react-color-extractor";
import { styled } from "styled-components";
import { devices } from "../../styles/breakpoints";
import { parseColor } from "../utils/parseColor";

const StyledSidebar = styled.aside`
  /* display: none; */

  .genres {
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
      /* overflow: none; */
    }

    .genre {
      padding: 7px 12px;
      border-radius: 5px;
      text-transform: capitalize;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      min-width: fit-content;
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
  "colleen hoover",
  "harley laroux",
  "sally thorne",
  "lj shen",
  "ana huang",
  "sophie lark",
  "twisted games",
];

const Sidebar = (props: Props) => {
  const { books } = props;
  const [colors, setColors] = useState<string[]>([]);

  const result = books
    .filter((book) => book.categories !== undefined)
    .filter((book) => book.imageLinks?.smallThumbnail !== undefined);

  const uniqueGenres = new Set(
    result.map((book) => book.categories).flat() as string[]
  );

  const genreColors: string[] = [];

  const handleColors = (colors: string[]) => {
    genreColors.push(colors[0]);
    setColors(genreColors.slice(0, uniqueGenres.size));
  };

  const image = books.slice(0, uniqueGenres.size).map((book, i) => {
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
          style={{
            backgroundColor: `rgba(${parseColor(colors[i])}, 0.5)`,
          }}
          key={i}
        >
          {genre.toLowerCase()}
        </div>
      ))}
    </div>
  );

  return (
    <StyledSidebar>
      <Fragment> {content}</Fragment>
      <div style={{ display: "none" }}>{image}</div>
    </StyledSidebar>
  );
};

export default Sidebar;
