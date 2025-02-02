import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import Product from "../../components/Product";
import { useDispatch, useSelector } from "react-redux";
import {  fetchProducts } from "./productSlice";
import { fetchFavorites } from "../Favorite/favoriteSlice";


const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, error_msg } = useSelector((state) => state.products);

   useEffect(() => {
     dispatch(fetchProducts());
     dispatch(fetchFavorites())
   }, [dispatch]);

  return (
    <div>
      <Nav />
      {isLoading ? (
        <span>Loading..</span>
      ) : (
        <>
          {isError ? (
            <span>{error_msg}</span>
          ) : (
            <div className="min-h-screen bg-bg">
              <div className="mx-12 lg:mx-24">
                <div className=" flex items-center justify-between pt-6 text-white lg:pt-0">
                  <div className="text-lg uppercase">Sort</div>
                  <div className="text-lg uppercase">Filter</div>
                </div>
                <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-4 lg:gap-24"> 
                  {products.map((elem, index) => (
                    <Product key={index} product={elem} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;
