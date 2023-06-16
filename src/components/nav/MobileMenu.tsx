import ReactDOM from "react-dom";
import { VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/bookmark.png";
import { StyledLogo } from "../../styles/StyledLogo.styled";
import Container from "../helpers/ui/Container";

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0%;
  /* background: rgb(255, 255, 255); */
  backdrop-filter: blur(30px);
  width: 100%;
  min-height: 90vh;
  height: 100%;
  z-index: 2;
  padding: 1rem 0;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    height: 2rem;
  }

  ul {
    list-style: none;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    li {
      margin: 1rem 0;
      cursor: pointer;

      a {
        text-decoration: none;
        color: inherit;
        font-size: clamp(1rem, 2vw, 1.1rem);
        transition: all 0.3s ease-in-out;

        &:hover {
          color: var(--primary);
          font-weight: bold;
        }
      }
    }
  }
`;

const MobileMenu = () => {
  return ReactDOM.createPortal(
    <StyledMenu>
      <Container>
        <div className="header">
          <StyledLogo>
            <img src={logo} alt="Bookmark Logo" />
          </StyledLogo>

          <VscClose size={35} color="var(--primary)" />
        </div>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>

          <li>
            <Link to="/library">Library</Link>
          </li>

          <li>
            <Link to="/shelves">Shelves</Link>
          </li>

          <li>
            <Link to="">Login</Link>
          </li>
        </ul>
      </Container>
    </StyledMenu>,
    document.querySelector("#menu") as HTMLDivElement
  );
};

export default MobileMenu;
