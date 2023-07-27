/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Container from "../components/helpers/ui/Container";
import { parseColor } from "../components/utils/parseColor";
import { subjects } from "../components/utils/subjects";
import { useAppSelector } from "../store/hooks/hooks";
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
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (${devices.large}) {
      position: sticky;
      top: 12vh;
      height: fit-content;
      padding-bottom: 1rem;
    }

    ul {
      list-style: none;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding-bottom: 0.2rem;

      a {
        display: flex;
        justify-content: center;
        padding: 7px 12px;
        border-radius: 5px;
        text-transform: capitalize;
        font-size: 0.9rem;
        font-weight: 500;
        color: #1a1a1a;
        background-color: var(--neutral-light);
        min-width: fit-content;
        cursor: pointer;
        height: 31px;
        text-decoration: none;
        transition: all 0.3s ease-in-out;

        &.active {
          background-color: var(--secondary);
          color: var(--neutral-light);
          font-weight: 500;

          &:hover {
            background-color: var(--secondary);
            color: var(--neutral-light);
          }
        }

        &:hover {
          background-color: gainsboro;
        }
      }
    }
  }
`;

const exploreGenres = ["all", "romance", "easy reads", "tiktok", "fiction", "spice", "fantasy"];

const ExploreLayout = () => {
  const { pathname } = useLocation();
  const page = pathname.split("/")[2];
  const colors = useAppSelector((state) => state.colours.bookColours);
  const [categories, setCategories] = useState<string[]>(page === "picks" ? exploreGenres : subjects);
  const [pick, setPick] = useState<string>("all");
  const [rec, setRec] = useState<string>("romance");
  const genreColours = Object.values(colors).slice(0, categories.length);
  const [current, setCurrent] = useState<string>("all");

  useEffect(() => {
    setCurrent(pathname.split("/")[3].replace("%20", " "));
  }, [pathname, page]);

  useEffect(() => {
    if (page === "picks") setCategories(exploreGenres);
    else setCategories(subjects);
  }, [page]);

  const handleCategory = (value: string) => {
    if (page === "picks") setPick(value);
    else setRec(value);
  };

  const renderedCategories = categories.map((category, i) => {
    const background = `rgba(${parseColor(genreColours[i])}, 0.5)`;

    const active = current === category.toLowerCase() ? "active" : "";

    return (
      <Link
        to={`${page}/${category}`}
        key={i}
        className={`category ${active}`}
        style={{ backgroundColor: background }}
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
        <aside>
          <ul>
            <li>
              <NavLink to={`picks/${pick}`}>Our Picks</NavLink>
            </li>
            <li>
              <NavLink to={`recs/${rec}`}>Other Genres</NavLink>
            </li>
          </ul>

          <StyledCategories>{renderedCategories}</StyledCategories>
        </aside>

        <Outlet />
      </StyledExplore>
    </Fragment>
  );
};

export default ExploreLayout;
