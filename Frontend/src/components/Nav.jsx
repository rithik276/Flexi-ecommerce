import React from "react";
import logo from "../assets/images/LOGOS/flexi_logo.png";
import { NavLink } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";

const Nav = () => {
  return (
    <div className="flex items-center bg-[#1B1B1B]">
      <div>
        <NavLink to={"/"}>
          <div className="ml-8 w-36 pb-6 pt-[2.3rem] xl:ml-36 xl:w-52 xl:pb-14  xl:pt-[3.3rem]">
            <img src={logo} alt="" />
          </div>
        </NavLink>
      </div>
      <div className="ml-16 flex w-1/2 items-center">
        <div className="z-1 absolute pl-2 pt-1">
          <IoIosSearch className="text-black" style={{ fontSize: 33 }} />
        </div>
        <div className="w-full">
          <input className="left-1 mr-10 h-12 w-full rounded-3xl border pl-12 text-3xl font-bold" />
        </div>
      </div>
      <div className="ml-20 flex space-x-7">
        <NavLink to={"/favorite"}>
          <MdOutlineFavoriteBorder
            className="text-white"
            style={{ fontSize: 60 }}
          />
        </NavLink>
        <NavLink to={"/cart"}>
          <TiShoppingCart className="text-white" style={{ fontSize: 60 }} />
        </NavLink>
      </div>
    </div>
  );
};

export default Nav;
