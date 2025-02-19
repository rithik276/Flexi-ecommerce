/* eslint-disable react/prop-types */
import React from "react";
import { STATIC_URL } from "../../utils/config";

const CheckoutList = ({ item }) => {
  return (
    <div className="pl-10">
      {/* Product Row */}
      <div className="grid grid-cols-12 items-center  pt-4">
        {/* Product Info */}
        <div className="col-span-6 flex items-center gap-5">
          <div className="h-16 w-16 rounded-xl bg-white pt-2">
            <img
              src={STATIC_URL("media/" + item?.image)}
              alt="aa"
              className="pt-1"
            />
          </div>
          <div className="text-white">
            <h1 className="text-xl font-semibold">{item.product_name}</h1>
          </div>
        </div>

        {/* Product Details (Aligned) */}
        <div className="col-span-6 grid grid-cols-4 pr-7">
          <div className="w-full  text-white">
            <h1 className="text-xl font-semibold">₹ {item.price}</h1>
          </div>
          <div className="mr-7 text-center text-white">
            <h1 className="text-xl font-semibold">{item.size}</h1>
          </div>
          <div className="mr-2 text-center text-white">
            <h1 className="text-xl font-semibold">{item.quantity}</h1>
          </div>
          <div className="ml-7 w-full text-white">
            <h1 className="text-xl font-semibold">
              ₹ {item.quantity * item.price}
            </h1>
          </div>
          <div className="w-0"></div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutList;
