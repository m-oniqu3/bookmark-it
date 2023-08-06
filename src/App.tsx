import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookDetails from "./components/books/BookDetails";
import Picks from "./components/explore/Picks";
import Recs from "./components/explore/Recs";
import NoMatch from "./components/helpers/routes/NoMatch";
import HomePage from "./components/pages/HomePage";
import Library from "./components/pages/Library";
import SearchResults from "./components/pages/SearchResults";
import Shelf from "./components/pages/Shelf";
import ExploreLayout from "./layout/ExploreLayout";
import RootLayout from "./layout/RootLayout";
import { GlobalStyles } from "./styles/Global.styled";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        {
          path: "/explore",
          element: <ExploreLayout />,

          children: [
            { path: "picks/:category", element: <Picks /> },
            { path: "recs/:category", element: <Recs /> },
          ],
        },
        { path: "/library", element: <Library /> },
        { path: "/shelves", element: <Shelf /> },
        { path: "/search/:query", element: <SearchResults /> },
        { path: "/details/:id", element: <BookDetails /> },
        { path: "*", element: <NoMatch /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <GlobalStyles />
      <ToastContainer position="top-left" autoClose={2000} limit={4} />
    </>
  );
};

export default App;
