import { NavLink, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Container from "../components/helpers/ui/Container";
import { devices } from "../styles/breakpoints";

const StyledNav = styled.nav`
  height: 10vh;
  border-bottom: 1px solid rgba(230, 230, 230, 0.688);
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (${devices.semiLarge}) {
    height: 9vh;
    justify-content: space-between;
  }

  h1 {
    display: none;

    @media (${devices.semiLarge}) {
      display: grid;
      color: var(--secondary);
      font-size: 1rem;
    }
  }

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    width: min(100%, 400px);
    list-style: none;

    a {
      color: var(--neutral-medium);
      text-decoration: none;

      &.active,
      &:hover {
        color: var(--secondary);
      }
    }
  }
`;

const LibraryLayout = () => {
  const links = [
    { name: "All", link: "all" },
    { name: "TBR", link: "tbr" },
    { name: "In Progress", link: "in-progress" },
    { name: "Completed", link: "completed" },
    { name: "DNF", link: "dnf" },
  ];

  const renderLinks = () => {
    return links.map((link) => {
      return (
        <li key={link.name}>
          <NavLink to={link.link}>{link.name}</NavLink>
        </li>
      );
    });
  };

  return (
    <Container>
      <StyledNav>
        <h1>Your Library</h1>
        <ul>{renderLinks()}</ul>
      </StyledNav>

      <main>
        <Outlet />
      </main>
    </Container>
  );
};

export default LibraryLayout;
