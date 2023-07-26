import { Fragment } from "react";
import { useAppSelector } from "../../store/hooks/hooks";
import { StyledCategories } from "../../styles/StyledCategories";
import { parseColor } from "../utils/parseColor";

const exploreGenres = ["Bookmark's Picks", "Romance", "Easy Reads", "Tiktok", "Fiction", "spice", "Fantasy"];

const ExploreGenres = () => {
  const colors = useAppSelector((state) => state.colours.bookColours);
  const genreColours = Object.values(colors).slice(0, exploreGenres.length);

  const renderedGenres = exploreGenres.map((category, i) => {
    const background = `rgba(${parseColor(genreColours[i])}, 0.5)`;
    return (
      <div key={i} className="category" style={{ backgroundColor: background }}>
        {category}
      </div>
    );
  });
  return (
    <StyledCategories>
      <Fragment>{renderedGenres}</Fragment>
    </StyledCategories>
  );
};

export default ExploreGenres;
