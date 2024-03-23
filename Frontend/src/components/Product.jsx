import React, { useState } from "react";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { MdOutlineFavorite } from "react-icons/md";
import shoe from "../assets/images/AIR FORCE 1/air_force_1_cyan.png";
import { NavLink } from "react-router-dom";

const Product = () => {
  const [favClick, setFavClick] = useState(false);
  
  const toggleClick = () => {
    setFavClick(!favClick);
  };
  return (
    <NavLink to={`${1}`}>
      <div className="relative">
        <div className="flex h-32 w-full items-center justify-center rounded-3xl border-4 border-orange-500 bg-white lg:h-40 lg:w-64">
          <img src={shoe} alt="" className="pt-8 h-fit w-fit object-fill" />

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
            Jordan Max Aura 4
          </h3>
          <h5 className="text-sm font-bold lg:text-lg">$499.00</h5>
        </div>
      </div>
    </NavLink>
  );
};

export default Product;
