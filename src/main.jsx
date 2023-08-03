import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./components/layout/Main";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Movies from "./pages/Movies";
import MovieDetailPage from "./pages/MovieDetailPage";

const router = createBrowserRouter([
  {
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },
      {
        path: "/movies",
        element: <Movies></Movies>,
      },
      {
        path: "/movies/:movieId",
        element: <MovieDetailPage></MovieDetailPage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
