import { useState } from "react";
import ReactDOM from "react-dom";
import { VscClose } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/bookmark.png";
import { StyledLogo } from "../../styles/StyledLogo.styled";
import Container from "../helpers/ui/Container";
import Modal from "../helpers/ui/Modal";
import Login from "../user/Login";

const StyledMenu = styled.div`
  position: fixed;
  top: 0;
  left: 0%;
  background: rgb(255, 255, 255);
  backdrop-filter: blur(30px);
  width: 100%;
  min-height: 90vh;
  height: 100%;
  z-index: 5;
  padding: 1rem 0;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
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

type Props = {
  closeMenu: () => void;
};

const MobileMenu = (props: Props) => {
  const { closeMenu } = props;
  const [openModal, setOpenModal] = useState(false);

  const handleModal = () => setOpenModal((state) => !state);

  return ReactDOM.createPortal(
    <>
      <StyledMenu>
        <Container>
          <div className="header">
            <StyledLogo>
              <img src={logo} alt="Bookmark Logo" />
            </StyledLogo>

            <VscClose size={35} color="var(--primary)" onClick={closeMenu} />
          </div>

          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <NavLink to="/explore/picks/all">Explore</NavLink>
            </li>

            <li>
              <NavLink to="/library">Library</NavLink>
            </li>

            <li>
              <NavLink to="/shelves">Shelves</NavLink>
            </li>

            <li onClick={handleModal}>
              <p>Login</p>
            </li>
          </ul>
        </Container>
      </StyledMenu>

      {openModal && (
        <Modal closeModal={() => setOpenModal(false)}>
          <Login closeModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </>,
    document.querySelector("#menu") as HTMLDivElement
  );
};

export default MobileMenu;
