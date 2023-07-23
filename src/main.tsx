import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import BookDetails from "./components/books/BookDetails.tsx";
import AuthHome from "./components/pages/AuthHome.tsx";
import Explore from "./components/pages/Explore.tsx";
import Library from "./components/pages/Library.tsx";
import SearchResults from "./components/pages/SearchResults.tsx";
import Shelf from "./components/pages/Shelf.tsx";
import RootLayout from "./layout/RootLayout.tsx";
import { store } from "./store/index.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <AuthHome /> },
      { path: "/explore", element: <Explore /> },
      { path: "/library", element: <Library /> },
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
