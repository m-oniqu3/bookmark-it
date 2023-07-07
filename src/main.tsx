import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import BookDetails from "./components/books/BookDetails.tsx";
import Explore from "./components/pages/Explore.tsx";
import Home from "./components/pages/Home.tsx";
import Library from "./components/pages/Library.tsx";
import SearchResults from "./components/pages/SearchResults.tsx";
import Shelf from "./components/pages/Shelf.tsx";
import LibraryLayout from "./layout/LibraryLayout.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import { store } from "./store/index.ts";

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
      { path: "/details/:id", element: <BookDetails /> },
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
