import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookDetails from "./components/books/BookDetails";
import Picks from "./components/explore/Picks";
import Recs from "./components/explore/Recs";
import NoMatch from "./components/helpers/routes/NoMatch";
import ProtectedRoute from "./components/helpers/routes/ProtectedRoute";
import Loading from "./components/helpers/ui/Loading";
import HomePage from "./components/pages/HomePage";
import Library from "./components/pages/Library";
import SearchResults from "./components/pages/SearchResults";
import Shelf from "./components/pages/Shelf";
import { database } from "./firebase/firebase";
import ExploreLayout from "./layout/ExploreLayout";
import RootLayout from "./layout/RootLayout";
import { populateLibrary } from "./store/features/library/librarySlice";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import { GlobalStyles } from "./styles/Global.styled";

const App = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getData(user: string) {
      setLoading(true);
      const ref = doc(database, "library", user);
      const docSnap = await getDoc(ref);

      if (docSnap.exists() && docSnap.data().library) {
        dispatch(populateLibrary(docSnap.data().library));
        console.log("Document data:", docSnap.data());
      }

      setLoading(false);
    }

    if (user) {
      getData(user);
    }
  }, [user, dispatch]);

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
        {
          path: "/library",
          element: (
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          ),
        },
        {
          path: "/shelves",
          element: (
            <ProtectedRoute>
              <Shelf />
            </ProtectedRoute>
          ),
        },
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
      {loading && <Loading />}
    </>
  );
};

export default App;
