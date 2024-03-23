import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/images/LOGOS/flexi_logo.png";
import { NavLink } from "react-router-dom";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { IoIosSearch } from "react-icons/io";
import SearchBarList from "./SearchBarList";
const Nav = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [openSearch, setOpenSearch] = useState(false);

  const fetchData = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        url: `http://localhost:8000/api/v1/products/search/?query=${e.target.value}`,
        method: "POST",
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNDE5NjAzLCJpYXQiOjE3MTExMjM2MDMsImp0aSI6ImI4ZDhiZjk0N2FjNzQ5NTNiNTYwODE0NmVjZmFlZmFiIiwidXNlcl9pZCI6ImZmOWZjZjIzLTE0NDgtNDA4Ny04ZDhmLTNhZjQ2MWY5OWE0YyJ9.gpI4KPR6Aw-IdvtREfM1A2IKh6mPdoxXDlkcInL2IDQ",
        },
      });
      setData(res.data);
    } catch (e) {
      setData([]);
    }
  };

  const toggleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length >= 3) {
      fetchData(e);
      setOpenSearch(true);
    }
    if (e.target.value.length <= 0) {
      setOpenSearch(false);
    }
    if (data.length == 0) {
      setOpenSearch(false);
    }
  };

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
      <div className="relative flex flex-col items-center lg:w-[80%]">
        <div className="z-10 w-full">
          <div className="flex w-full items-center lg:mx-8">
            <div className="z-1 absolute  pl-2 pt-1">
              <IoIosSearch className="text-black" style={{ fontSize: 33 }} />
            </div>
            <div className="w-full">
              <input
                value={search}
                onChange={(e) => toggleSearch(e)}
                className="h-12 w-full rounded-3xl pl-12  text-xl font-bold focus:outline-none lg:text-3xl"
              />
            </div>
          </div>
        </div>
        {openSearch && <SearchBarList data={data} />}
      </div>
      <div className="flex items-center justify-center space-x-7 lg:ml-2 lg:w-1/3">
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
  );
};

export default Nav;
