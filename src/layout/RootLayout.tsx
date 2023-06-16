import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Navbar from "../components/nav/Navbar";

const StyledLayout = styled.div`
  .main {
    position: relative;
    top: 68.5px;
    background: violet;
  }
`;

const RootLayout = () => {
  return (
    <StyledLayout>
      <Navbar />

      <main className="main">
        <Outlet />
      </main>
    </StyledLayout>
  );
};

export default RootLayout;
