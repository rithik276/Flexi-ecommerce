/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Home from "./containers/Home/Home";
import Products from "./containers/Products/Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      index: true,
      element: <Home />,
    },
    {
      path: "products",
      element: <Products />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
