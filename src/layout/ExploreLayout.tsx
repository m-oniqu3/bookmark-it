/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Container from "../components/helpers/ui/Container";
import { subjects } from "../components/utils/subjects";
import { StyledCategories } from "../styles/StyledCategories";
import { devices } from "../styles/breakpoints";

const StyledExplore = styled(Container)`
  padding: 1.5rem 0;

  @media (${devices.large}) {
    display: grid;
    grid-template-columns: 1fr 15.5rem;
    gap: 3rem;

    aside {
      order: 1;
    }
  }

  aside {
    .list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      overflow-x: scroll;
      scrollbar-width: none;
      padding-bottom: 1rem;
      height: fit-content;

      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
`;

const exploreGenres = ["all", "romance", "easy reads", "tiktok", "fiction", "spice", "fantasy"];

const ExploreLayout = () => {
  const page = useLocation().pathname.split("/")[2];
  console.log(page);
  const [categories, setCategories] = useState<string[]>(page === "picks" ? exploreGenres : subjects);
  const [pick, setPick] = useState<string>("all");
  const [rec, setRec] = useState<string>("romance");

  useEffect(() => {
    if (page === "picks") setCategories(exploreGenres);
    else setCategories(subjects);
  }, [page]);

  const handleCategory = (value: string) => {
    if (page === "picks") setPick(value);
    else setRec(value);
  };

  const renderedCategories = categories.map((category, i) => {
    // const background = `rgba(${parseColor(genreColours[i])}, 0.5)`;
    return (
      <Link
        to={`${page}/${category}`}
        key={i}
        className="category"
        style={{ backgroundColor: "pink" }}
        onClick={() => handleCategory(category)}
      >
        {category}
      </Link>
    );
  });

  if (!page) {
    return <Navigate to="/explore/picks/all" replace={true} />;
  }

  return (
    <Fragment>
      <StyledExplore>
        <main>
          <Outlet />
        </main>
        <aside>
          <ul>
            <li>
              <NavLink to={`picks/${pick}`}>Picks</NavLink>
            </li>
            <li>
              <NavLink to={`recs/${rec}`}>Recs</NavLink>
            </li>
          </ul>
          <StyledCategories>{renderedCategories}</StyledCategories>
        </aside>
      </StyledExplore>
    </Fragment>
  );
};

export default ExploreLayout;
