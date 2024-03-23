/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";

const SearchBarList = ({ data }) => {
  return (
    <div className="bg-bg absolute z-50 mt-14 w-full rounded-3xl border p-2 lg:ml-16">
      <ul className="bg-bg text-white">
        {Object.keys(data).map((ele, index) => (
          <NavLink to={data[ele].product_id} key={index}>
            <li className="mb-3 rounded-3xl px-10 text-xl font-bold text-white hover:bg-zinc-700">
              {data[ele].product_name}
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SearchBarList;
