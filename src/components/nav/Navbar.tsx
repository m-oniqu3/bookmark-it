import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { styled } from "styled-components";
import Logo from "../../assets/bookmark.png";
import { StyledLogo } from "../../styles/StyledLogo.styled";
import Container from "../helpers/ui/Container";
import SearchBar from "../search/SearchBar";
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
      }
    }

    &__icon {
      display: grid;
      place-items: center;
    }
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMobileMenu = () => setIsMenuOpen((state) => !state);

  return (
    <>
      <StyledNavContainer>
        <Container>
          <nav className="nav">
            <div className="logo">
              <StyledLogo>
                <img src={Logo} alt="logo" />
              </StyledLogo>
              <h3>Bookmark</h3>
            </div>

            <div className="nav__group">
              <SearchBar />
            </div>

            <div className="nav__icon" onClick={handleMobileMenu}>
              <AiOutlineMenu size={28} color="var(--primary)" />
            </div>
          </nav>
        </Container>
      </StyledNavContainer>

      {isMenuOpen && <MobileMenu />}
    </>
  );
};

export default Navbar;
