import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { styled } from "styled-components";
import ScrollToTop from "../components/helpers/routes/ScrollToTop";
import Navbar from "../components/nav/Navbar";
import { useAppSelector } from "../store/hooks/hooks";

const StyledLayout = styled.div`
  .main {
    position: relative;
    top: 68.5px;
  }
`;

const RootLayout = () => {
  const feedback = useAppSelector((state) => state.bookStore.toast);
  const shelfFeedback = useAppSelector((state) => state.bookShelf.toast);
  const navigate = useNavigate();

  useEffect(() => {
    if (feedback.message) {
      const { message, type } = feedback;
      const goToLibrary = () => navigate("/library");
      if (type === "success") {
        toast.success(message, { onClick: goToLibrary });
      } else if (type === "info") toast.info(message, { onClick: goToLibrary });
      else if (type === "warning") toast.warning(message, { onClick: goToLibrary });
    }
  }, [feedback, navigate]);

  useEffect(() => {
    if (shelfFeedback.message) {
      const { message, type } = shelfFeedback;
      const goToShelf = () => navigate("/shelves");
      if (type === "success") {
        toast.success(message, { onClick: goToShelf });
      } else if (type === "info") toast.info(message, { onClick: goToShelf });
      else if (type === "warning") toast.warning(message, { onClick: goToShelf });
      else if (type === "error") toast.error(message, { onClick: goToShelf });
    }
  }, [shelfFeedback, navigate]);

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
