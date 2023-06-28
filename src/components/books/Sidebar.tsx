import { Fragment, useState } from "react";
import type { Book } from "../../types/Book";

// @ts-expect-error - no types available
import { ColorExtractor } from "react-color-extractor";
import { styled } from "styled-components";
import { devices } from "../../styles/breakpoints";

const StyledSidebar = styled.aside`
  display: none;

  @media (${devices.large}) {
    position: sticky;
    top: 12vh;
    height: fit-content;
    /* padding: 0 1rem;
    border-left: 1px solid var(--neutral-light); */
    display: block;
  }

  .genres {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    .genre {
      padding: 6px 12px;
      border-radius: 5px;
      text-transform: capitalize;
    }
  }
`;

type Props = {
  books: Book[];
};
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
        <div className="genre" style={{ backgroundColor: colors[i] }} key={i}>
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
