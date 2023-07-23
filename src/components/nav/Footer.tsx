import { NavLink } from "react-router-dom";

import { styled } from "styled-components";
import { devices } from "../../styles/breakpoints";
import Container from "../helpers/ui/Container";

type StyledProps = {
  mode: "light" | "dark";
};
const StyledFooter = styled.footer<StyledProps>`
  padding-top: 0.5rem;
  border-top: 1px solid ${(props) => (props.mode === "light" ? "var(--neutral-light)" : "gainsboro")};
  background-color: ${(props) => (props.mode === "light" ? "var(--neutral-primary)" : "var(--neutral-light)")};

  .footer {
    ul {
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      @media (${devices.xsmall}) {
        flex-direction: row;
        justify-content: space-evenly;

        max-width: 500px;
        margin: 0 auto;
      }

      li {
        padding: 1rem 0;

        a {
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease-in-out;

          &:hover {
            color: var(--secondary);
            text-decoration: underline;
          }
        }
      }
    }
  }

  .links {
    display: flex;
    flex-direction: column;
    list-style: none;

    li {
      padding: 1rem 0;
      text-align: center;

      a {
        text-decoration: none;
        color: inherit;
        transition: all 0.3s ease-in-out;

        &:hover {
          color: var(--secondary);
          text-decoration: underline;
        }
      }
    }
  }
`;

type Props = {
  mode: "light" | "dark";
};

const Footer = (props: Props) => {
  return (
    <StyledFooter mode={props.mode}>
      <Container className="footer">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/explore">Explore</NavLink>
          </li>

          <li>
            <NavLink to="/library">Library</NavLink>
          </li>

          <li>
            <NavLink to="/shelves">Shelves</NavLink>
          </li>
        </ul>
      </Container>

      <ul className="links">
        <li>
          <a target="_blank" href="https://github.com/m-oniqu3?tab=repositories" rel="noreferrer">
            Designed & Developed by Monique
          </a>
        </li>
        <li>&copy; 2023 Bookmark </li>
      </ul>
    </StyledFooter>
  );
};

export default Footer;
