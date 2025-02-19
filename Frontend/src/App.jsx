/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Home from "./containers/Home/Home";
import Products from "./containers/Products/Products";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cart from "./containers/Cart/Cart";
import Favorite from "./containers/Favorite/Favorite";
import ProductsPage from "./containers/Products/ProductsPage";
import Checkout from "./containers/Checkout/Checkout";
import Login from "./containers/Auth/Login";

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
      path: "/products",
      element: <Products />,
    },
    {
      path: "/products/:product_name/:product_id",
      element: <ProductsPage />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "/favorite",
      element: <Favorite />,
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
