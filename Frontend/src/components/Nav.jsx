import React from "react";
import logo from "../assets/images/LOGOS/flexi_logo.png";
import { NavLink } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";

const Nav = () => {
  return (
    <div className="flex flex-col items-center space-y-2 bg-[#1B1B1B] lg:flex-row lg:space-y-0">
      <div className="flex w-full items-center justify-around lg:w-1/5">
        <div>
          <NavLink to={"/"}>
            <div className="ml-0 w-36 pb-6 pt-[2.3rem] lg:ml-24 lg:w-52 lg:pb-14  lg:pt-[3.3rem]">
              <img src={logo} alt="" />
            </div>
          </NavLink>
        </div>

        <div className="mt-5 flex items-end space-x-4 lg:hidden">
          <NavLink to={"/favorite"}>
            <MdOutlineFavoriteBorder
              className=" text-white lg:block"
              style={{ fontSize: 35 }}
            />
          </NavLink>
          <NavLink to={"/cart"}>
            <TiShoppingCart
              className=" text-white lg:block"
              style={{ fontSize: 35 }}
            />
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col lg:w-4/5 lg:flex-row">
        <div className="flex items-center lg:mx-8  lg:w-3/4">
          <div className="w-full ">
            <input className="h-12 w-full rounded-3xl  pl-12 text-xl font-bold lg:text-3xl" />
          </div>
          <div className="z-1 absolute  pl-2 pt-1">
            <IoIosSearch className="text-black" style={{ fontSize: 33 }} />
          </div>
        </div>
        <div className="flex items-center justify-center space-x-7 lg:ml-2">
          <NavLink to={"/favorite"}>
            <MdOutlineFavoriteBorder
              className="hidden text-white lg:block"
              style={{ fontSize: 60 }}
            />
          </NavLink>
          <NavLink to={"/cart"}>
            <TiShoppingCart
              className="hidden text-white lg:block"
              style={{ fontSize: 60 }}
            />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
