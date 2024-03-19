import React from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="hidden text-white xl:mt-12 xl:flex  xl:w-4/5">
      <NavLink to={"/"}>
        <h5 className="ml-32 text-3xl font-bold">Home</h5>
      </NavLink>
      <NavLink to={"/favorite"}>
        <h5 className="ml-32 text-3xl font-bold">Favorite</h5>
      </NavLink>
      <NavLink to={"/cart"}>
        <h5 className="ml-32 text-3xl font-bold">Cart</h5>
      </NavLink>
      <NavLink to={"/login"}>
        <h5 className="ml-32 text-3xl font-bold">Login</h5>
      </NavLink>
    </div>
  );
};

export default NavLinks;
