/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { STATIC_URL } from "../utils/config";
import { addFavoriteProduct } from "../containers/Products/productSlice";

const Product = ({ product }) => {
  const { favorites,isLoading: product_loading } = useSelector((state) => state.products);
  const [favClick, setFavClick] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setFavClick(favorites.some((i) => i.product_id === product.product_id));
  }, [favorites, product.product_id]);

  const toggleClick = (e) => {
    e.stopPropagation();
    setFavClick(!favClick);
    dispatch(
      addFavoriteProduct({
        product_id: product.product_id,
        product_variant_id: product.product_variant_id,
      }),
    );
  };
  const handleProductClick = async () => {
    // await dispatch(selectedProduct({"product_id":product.product_id}));
    navigate(
      `/products/${product.product_name.toLowerCase()}/${product.product_id}`,
    );
  };
  if (product_loading) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }
  return (
    <>
      <div style={{ cursor: "pointer" }} className="relative">
        <div
          onClick={() => handleProductClick()}
          className="flex h-32 w-full items-center justify-center rounded-3xl border-4 border-orange-500 bg-white lg:h-2/3 lg:w-64"
        >
          <img src={STATIC_URL(product.image)} alt="" className="p-7" />

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
            {product.product_name}
          </h3>
          <h5 className="text-sm font-bold lg:text-lg">Rs.{product.price}</h5>
        </div>
      </div>
    </>
  );
};

export default Product;
