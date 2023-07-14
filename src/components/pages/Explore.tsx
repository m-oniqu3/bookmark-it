import { useState } from "react";
import { styled } from "styled-components";
import useExplore from "../../hooks/useExplore";
import { useAppSelector } from "../../store/hooks/hooks";
import { StyledGrid } from "../../styles/StyledGrid";
import { devices } from "../../styles/breakpoints";
import Container from "../helpers/ui/Container";
import { parseColor } from "../utils/parseColor";

const StyledExplore = styled(Container)`
  padding: 1.5rem 0;

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 15.5rem;
    gap: 3rem;

    .categories {
      order: 1;
    }
  }

  .categories {
    display: flex;
    gap: 1rem;
    width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;
    padding-bottom: 1rem;
    height: fit-content;

    &::-webkit-scrollbar {
      display: none;
    }

    @media (${devices.large}) {
      flex-wrap: wrap;
      position: sticky;
      top: 12vh;
      height: fit-content;
    }

    .category {
      padding: 7px 12px;
      border-radius: 5px;
      text-transform: capitalize;
      font-size: 0.9rem;
      font-weight: 500;
      color: #1a1a1a;
      min-width: fit-content;
      cursor: pointer;
      height: 31px;
    }
  }
`;

const genres = ["All", "Romance", "Easy Reads", "Tiktok", "Fiction", "spice", "Fantasy"];

const Explore = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const books = useExplore(selectedCategory);
  const colors = useAppSelector((state) => state.colours.bookColours);

  const genreColours = Object.values(colors).slice(0, genres.length);

  const handleCategory = (value: string) => {
    setSelectedCategory(value.toLowerCase());
  };

  const renderCategories = () => {
    return genres.map((genre, i) => {
      const background = `rgba(${parseColor(genreColours[i])}, 0.5)`;
      return (
        <div key={i} className="category" style={{ backgroundColor: background }} onClick={() => handleCategory(genre)}>
          {genre}
        </div>
      );
    });
  };
  return (
    <StyledExplore>
      <div className="categories">{renderCategories()}</div>
      <StyledGrid>{books}</StyledGrid>
    </StyledExplore>
  );
};

export default Explore;
