import { Fragment } from "react";
import { useAppSelector } from "../../store/hooks/hooks";
import { StyledCategories } from "../../styles/StyledCategories";
import { parseColor } from "../utils/parseColor";
import { subjects } from "../utils/subjects";

const ExploreSubjects = () => {
  const colors = useAppSelector((state) => state.colours.bookColours);
  const genreColours = Object.values(colors).slice(0, subjects.length);

  const renderedSubjects = subjects.map((category, i) => {
    const background = `rgba(${parseColor(genreColours[i])}, 0.5)`;
    return (
      <div key={i} className="category" style={{ backgroundColor: background }}>
        {category}
      </div>
    );
  });

  return (
    <StyledCategories>
      <Fragment>{renderedSubjects}</Fragment>
    </StyledCategories>
  );
};

export default ExploreSubjects;
