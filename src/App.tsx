import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import { GlobalStyles } from "./styles/Global.styled";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <p>home</p> },
      { path: "/explore", element: <p>explore</p> },
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
