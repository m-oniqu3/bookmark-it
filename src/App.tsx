import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles } from "./styles/Global.styled";

const App = () => {
  return (
    <>
      <GlobalStyles />
      <ToastContainer position="top-left" autoClose={2000} limit={3} />
    </>
  );
};

export default App;
