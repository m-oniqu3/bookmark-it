import { useAppSelector } from "../../store/hooks/hooks";
import Footer from "../nav/Footer";
import AuthHome from "./AuthHome";
import Home from "./Home";

const HomePage = () => {
  const { isSignedIn } = useAppSelector((state) => state.auth);
  const mode = isSignedIn ? "light" : "dark";

  return (
    <>
      {isSignedIn ? <AuthHome /> : <Home />}
      <Footer mode={mode} />
    </>
  );
};

export default HomePage;
