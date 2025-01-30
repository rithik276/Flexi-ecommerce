/* eslint-disable react/prop-types */
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDispatch } from "react-redux";
import { STATIC_URL } from "../../utils/config";
import { handleChangeQuantity } from "./cartSlice";

const CartList = ({ item }) => {
  
    const [selectedButton, setSelectedButton] = useState('plus')
    const dispatch = useDispatch();
    const handleQuantity = (value) => {
        if(value == '+'){
            setSelectedButton("plus")
        }
        else{
            setSelectedButton("minus")
        }
        const obj = {
          product_id: item.product.product_id,
          product_variant_id: item.product_variant_id,
          quantity: value,
        };
        dispatch(handleChangeQuantity(obj))
    };

    return (
      <>
        <div className="mb-4 flex gap-5">
          <div className="h-16 w-16 rounded-xl bg-white pt-2">
            <img src={STATIC_URL(item.image)} alt="" className="pt-1" />
          </div>
          <div>
            <h1 className="text-xl font-medium text-white">
              {item.product.product_name}
            </h1>
            <div className="mt-1 flex items-center justify-center gap-3">
              <div className="text-white font-bold">
                Rs. {item.price}
              </div>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${item.quantity <= 1 && "opacity-10"} ${selectedButton == "minus" && "border-orange-700 bg-orange-700"}`}
              >
                <button
                  className="flex items-center justify-center text-white"
                  onClick={() => handleQuantity(-1)}
                  disabled={item.quantity <= 1}
                >
                  <RemoveIcon fontSize="small" />
                </button>
              </div>
              <div className="text-xl font-semibold text-white">
                <h3>{item.quantity}</h3>
              </div>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 
                    ${item.quantity >= item.size_stock[item.size] && "opacity-10"}
                    ${selectedButton == "plus" && "border-orange-700 bg-orange-700"}`}
              >
                <button
                  className="flex items-center justify-center text-white"
                  onClick={() => handleQuantity(1)}
                  disabled={item.quantity >= item.size_stock[item.size]}
                >
                  <AddIcon fontSize="small" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default CartList;
