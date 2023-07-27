import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import BookDetails from "./components/books/BookDetails.tsx";
import Picks from "./components/explore/Picks.tsx";
import Recs from "./components/explore/Recs.tsx";
import Home from "./components/pages/Home.tsx";
import Library from "./components/pages/Library.tsx";
import SearchResults from "./components/pages/SearchResults.tsx";
import Shelf from "./components/pages/Shelf.tsx";
import ExploreLayout from "./layout/ExploreLayout.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import { store } from "./store/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/explore",
        element: <ExploreLayout />,

        children: [
          { path: "picks/:category", element: <Picks /> },
          { path: "recs/:category", element: <Recs /> },
          { path: "*", element: <div>404</div> },
        ],
      },
      { path: "/library", element: <Library /> },
      { path: "/shelves", element: <Shelf /> },
      { path: "/search/:query", element: <SearchResults /> },
      { path: "/details/:id", element: <BookDetails /> },
      { path: "*", element: <div>404</div> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <App />
    </Provider>
  </React.StrictMode>
);
