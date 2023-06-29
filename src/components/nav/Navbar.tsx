import { Fragment, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import Logo from "../../assets/bookmark.png";
import { StyledLogo } from "../../styles/StyledLogo.styled";
import { devices } from "../../styles/breakpoints";
import { ModalEnum, ModalType } from "../../types/ModalType";
import Button from "../helpers/ui/Button";
import Container from "../helpers/ui/Container";
import Modal from "../helpers/ui/Modal";
import SearchBar from "../search/SearchBar";
import Login from "../user/Login";
import MobileMenu from "./MobileMenu";

const StyledNavContainer = styled.div`
  background: var(--neutral-primary);
  border-bottom: 1px solid rgba(230, 230, 230, 0.688);
  position: fixed;
  width: 100%;
  z-index: 1;
  padding: 1rem 0;

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      display: flex;
      align-items: center;
      gap: 1rem;

      h3 {
        display: none;

        @media ${devices.medium} {
          display: block;
          font-family: "Rubik", sans-serif;
          font-size: clamp(1.2rem, 2.5vw, 1.4rem);
          font-weight: bold;
          color: var(--primary);
        }
      }
    }

    &__list {
      display: none;

      @media (${devices.large}) {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        place-items: center;
        gap: 1rem;
        list-style: none;
        width: 300px;
      }

      a {
        @media (${devices.large}) {
          text-decoration: none;
          color: var(--neutral-medium);
          font-size: 0.95rem;
          font-weight: 400;
          font-stretch: condensed; /* Added font-stretch property */
          width: 50px;

          &.active {
            color: var(--secondary);
            font-weight: 500;
          }

          &:hover {
            color: var(--secondary);
          }
        }
      }
    }

    &__group {
      width: 100%;
      display: flex;
      justify-content: center;

      @media (${devices.large}) {
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
        width: min(40%, 250px);
      }

      button {
        display: none;

        @media (${devices.large}) {
          display: grid;
        }
      }
    }

    &__icon {
      display: grid;
      place-items: center;

      @media (${devices.large}) {
        display: none;
      }
    }
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  const { pathname } = useLocation();

  const handleMobileMenu = () => setIsMenuOpen((state) => !state);

  //close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <Fragment>
      <StyledNavContainer>
        <Container>
          <nav className="nav">
            <div className="logo">
              <StyledLogo>
                <img src={Logo} alt="logo" />
              </StyledLogo>
              <h3>Bookmark</h3>
            </div>

            <ul className="nav__list">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/explore">Explore</NavLink>
              </li>

              <li>
                <NavLink to="/library/all">Library</NavLink>
              </li>

              <li>
                <NavLink to="/shelves">Shelves</NavLink>
              </li>
            </ul>

            <div className="nav__group">
              <SearchBar />
              <Button
                onClick={() => setActiveModal({ type: ModalEnum.LOGIN_MODAL })}
              >
                Login
              </Button>
            </div>

            <div className="nav__icon" onClick={handleMobileMenu}>
              <AiOutlineMenu size={28} color="var(--primary)" />
            </div>
          </nav>
        </Container>
      </StyledNavContainer>

      {isMenuOpen && <MobileMenu closeMenu={() => setIsMenuOpen(false)} />}
      {activeModal && (
        <Modal closeModal={() => setActiveModal(null)} variant>
          <Login />
        </Modal>
      )}
    </Fragment>
  );
};

export default Navbar;
