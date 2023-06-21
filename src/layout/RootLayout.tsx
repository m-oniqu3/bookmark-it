import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import ScrollToTop from "../components/helpers/routes/ScrollToTop";
import Navbar from "../components/nav/Navbar";

const StyledLayout = styled.div`
  .main {
    position: relative;
    top: 68.5px;
  }
`;

const RootLayout = () => {
  return (
    <ScrollToTop>
      <StyledLayout>
        <Navbar />

        <main className="main">
          <Outlet />
        </main>
      </StyledLayout>
    </ScrollToTop>
  );
};

export default RootLayout;
