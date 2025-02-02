/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { STATIC_URL } from "../../utils/config";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../Cart/cartSlice";
import { addFavoriteProduct } from "./favoriteSlice";

const FavoriteList = ({ item }) => {
  const { cart, isLoading: cart_loading } = useSelector((state) => state.cart);
  const [inCart, setInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!cart_loading) {
      setInCart(
        cart?.products?.some(
          (i) =>
            i.product_id == item.product_id &&
            i.product_variant_id == item.product_variant_id,
        ),
      );
    }
  }, [cart, cart_loading, item]);

  const handleSize = (size) => {
    setSelectedSize(size);
  };

  const addCartItem = async (e) => {
    if (e.target.textContent === "Add to Cart") {
      const payload = [
        {
          product_id: item.product_id,
          product_variant_id: item.product_variant_id,
          quantity: 1,
          size: selectedSize,
        },
      ];
      await dispatch(addCart(payload));
      setInCart(true);
    }
  };

  const deleteFavorite = async () => {
    await dispatch(
      addFavoriteProduct({
        product_id: item.product_id,
        product_variant_id: item.product_variant_id,
      }),
    );
  };

  if (cart_loading) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  return (
    <div className="mb-7 grid grid-flow-col grid-cols-3 items-center justify-between">
      <div className=" flex items-start justify-between col-span-2">
        <div className=" flex gap-5">
          <div className="h-16 w-16 rounded-xl bg-white pt-2">
            <img
              src={STATIC_URL("media/" + item.image)}
              alt=""
              className="pt-1"
            />
          </div>
          <div>
            <div className="flex justify-center items-center gap-2">
              <h1 className="text-xl font-medium text-white">
                {item.brand_name +' ' +item.product_name}
              </h1>
              <h1 className="text-xl font-medium capitalize text-white">
                {item.color}
              </h1>
            </div>

            <div className="mt-1">
              <div className="font-bold text-white">Rs. {item.price}</div>
            </div>
          </div>
        </div>
        <div className="w-1/2 mr-24">
          <h1 className="text-xl font-medium text-white">Select Size</h1>
          <div className="mt-1 flex gap-3">
            {item.size_stock.map((size) => (
              <button
                className={`relative flex h-7 w-7 items-center justify-center rounded-3xl text-lg font-bold ${
                  selectedSize == size ? "bg-orange-600" : "bg-white"
                } `}
                key={size}
                onClick={() => handleSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-1 flex items-center justify-center gap-5 place-self-end  border-green-700">
        <div onClick={(e) => addCartItem(e)} className="h-full w-full">
          <button
            className={`h-1/2 w-32 rounded-xl ${!inCart ? (selectedSize ? "bg-orange-600" : "cursor-not-allowed bg-orange-500 opacity-40") : "cursor-not-allowed bg-gray-700 opacity-40"} text-xl font-semibold text-white`}
          >
            {!inCart ? "Add to Cart" : "In Cart"}
          </button>
        </div>
        <div
          className="cursor-pointer text-white"
          onClick={() => deleteFavorite()}
        >
          <DeleteOutlinedIcon fontSize="large" />
        </div>
      </div>
    </div>
  );
};

export default FavoriteList;
