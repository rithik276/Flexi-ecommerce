/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectedProduct } from "../containers/Products/productSlice";

const Product = ({ product }) => {
  const [favClick, setFavClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const toggleClick = (e) => {
    e.stopPropagation();
    setFavClick(!favClick);
  };
  const handleProductClick = () => {
    navigate(
      `/products/${(product.product.product_name).toLowerCase()}/${product.product.product_id}`,
    );
    dispatch(selectedProduct(product));
  }
  return (
    <>
      <div style={{ cursor: "pointer" }} className="relative">
        <div
          onClick={() => handleProductClick()}
          className="flex h-32 w-full items-center justify-center rounded-3xl border-4 border-orange-500 bg-white lg:h-2/3 lg:w-64"
          >
          <img
            src={`http://localhost:8000/${product.variants[0].image}`}
            alt=""
            className="p-7"
          />

          <div
            onClick={toggleClick}
            className="z-2 absolute left-52 top-3 hidden lg:block"
          >
            {favClick ? (
              <MdOutlineFavorite
                className="text-red-500"
                style={{ fontSize: 35 }}
              />
            ) : (
              <MdOutlineFavoriteBorder
                className="text-red-500"
                style={{ fontSize: 35 }}
              />
            )}
          </div>
        </div>
        <div className="mt-3 text-center text-white">
          <h3 className=" text-sm font-semibold lg:text-2xl">
            {product.product.product_name}
          </h3>
          <h5 className="text-sm font-bold lg:text-lg">
            Rs.{product.variants[0].price}
          </h5>
        </div>
      </div>
    </>
  );
};

export default Product;
