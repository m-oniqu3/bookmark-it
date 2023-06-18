import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Explore from "./components/pages/Explore";
import Home from "./components/pages/Home";
import Library from "./components/pages/Library";
import SearchResults from "./components/pages/SearchResults";
import Shelf from "./components/pages/Shelf";
import LibraryLayout from "./layout/LibraryLayout";
import RootLayout from "./layout/RootLayout";
import { GlobalStyles } from "./styles/Global.styled";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      {
        path: "/library",
        element: <LibraryLayout />,
        children: [{ path: "*", element: <Library /> }],
      },
      { path: "/shelves", element: <Shelf /> },
      { path: "/search/:query", element: <SearchResults /> },
    ],
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <GlobalStyles />
    </div>
  );
};

export default App;
