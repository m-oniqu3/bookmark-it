import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "./store/hooks/hooks";
import { GlobalStyles } from "./styles/Global.styled";

const App = () => {
  const feedback = useAppSelector((state) => state.bookStore.toast);

  useEffect(() => {
    if (feedback.message) {
      const { message, type } = feedback;
      const goToLibrary = () => (window.location.pathname = "/library");
      if (type === "success") {
        toast.success(message, { onClick: goToLibrary });
      } else if (type === "info") toast.info(message, { onClick: goToLibrary });
      else if (type === "warning") toast.warning(message, { onClick: goToLibrary });
    }
  }, [feedback]);

  return (
    <>
      <GlobalStyles />
      <ToastContainer position="top-left" autoClose={2000} />
    </>
  );
};

export default App;
