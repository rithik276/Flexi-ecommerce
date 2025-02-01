/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch } from "react-redux";
import { STATIC_URL } from "../../utils/config";
import { getCart, updateQuantity } from "./cartSlice";

const CartList = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [selectedButton, setSelectedButton] = useState("plus");
  const dispatch = useDispatch();

  const getStockForSize = () => {
    for (let i in item.size_stock) {
      if (Object.keys(item.size_stock[i]) == item.size) {
        return item.size_stock[i][item.size] > 10
          ? 10
          : item.size_stock[i][item.size];
      }
    }
  };

  const handleQuantity = async (value) => {
    if (value == 1) {
      setSelectedButton("plus");
      const quan = quantity;
      setQuantity(quan + 1);
    } else {
      setSelectedButton("minus");
      const quan = quantity;
      setQuantity(quan - 1);
    }
  };

  const changeQuantity = async () => {
    const payload = [
      {
        product_id: item.product_id,
        product_variant_id: item.product_variant_id,
        quantity: quantity,
        size: item.size,
      },
    ];
    await dispatch(updateQuantity(payload));
  };

  const deleteCart = async () => {
    const payload = [
      {
        product_id: item.product_id,
        product_variant_id: item.product_variant_id,
        quantity: 0,
        size: item.size,
      },
    ];
    await dispatch(updateQuantity(payload));
    await dispatch(getCart())
  };

  return (
    <>
      <div className="mb-7 grid grid-flow-col grid-cols-3 items-center justify-between">
        <div className=" col-span-2 flex gap-5">
          <div className="h-16 w-16 rounded-xl bg-white pt-2">
            <img
              src={STATIC_URL("media/" + item.image)}
              alt=""
              className="pt-1"
            />
          </div>
          <div>
            <h1 className="text-xl font-medium text-white">
              {item.product_name}
            </h1>
            <div className="mt-1 flex items-center justify-center gap-3">
              <div className="font-bold text-white">Rs. {item.price}</div>
              <div className="border-l-2 pl-2 font-bold text-white">
                Size: {item.size}
              </div>

              <div
                className={`ml-7 flex h-5 w-5 items-center justify-center rounded-full border-2 ${item.quantity <= 1 && "opacity-10"} ${selectedButton == "minus" && "border-orange-700 bg-orange-700"}`}
              >
                <button
                  className="flex items-center justify-center text-white"
                  onClick={() => handleQuantity(-1)}
                  disabled={quantity <= 1}
                >
                  <RemoveIcon fontSize="small" />
                </button>
              </div>
              <div className="text-xl font-semibold text-white">
                <h3>{quantity}</h3>
              </div>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 
                    ${quantity >= getStockForSize() && "opacity-10"}
                    ${selectedButton == "plus" && "border-orange-700 bg-orange-700"}`}
              >
                <button
                  className="flex items-center justify-center text-white"
                  onClick={() => handleQuantity(1)}
                  disabled={quantity >= getStockForSize()}
                >
                  <AddIcon fontSize="small" />
                </button>
              </div>
              <div className="h-6 w-32 rounded-md bg-orange-600 text-center font-semibold text-white">
                <button onClick={() => changeQuantity()}>
                  update quantity
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center place-self-end border-green-700">
          <div onClick={() => deleteCart()} className="text-white">
            <DeleteOutlinedIcon fontSize="large" />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartList;
