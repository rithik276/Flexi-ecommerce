import React from "react";
import Nav from "../../components/Nav";
import Product from "../../components/Product";

const Products = () => {
  return (
    <>
      <Nav />
      <div className="bg-bg min-h-screen">
        <div className="mx-12 lg:mx-24">
          <div className=" flex items-center justify-between pt-6 text-white lg:pt-0">
            <div className="text-lg uppercase">Sort</div>
            <div className="text-lg uppercase">Filter</div>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-4 lg:gap-24">
            <Product />
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
