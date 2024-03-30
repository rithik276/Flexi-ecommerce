import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import Product from "../../components/Product";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, clearProducts } from "./productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios({
          url: "http://localhost:8000/api/v1/get_products/",
          method: "GET",
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyNDE5NjAzLCJpYXQiOjE3MTExMjM2MDMsImp0aSI6ImI4ZDhiZjk0N2FjNzQ5NTNiNTYwODE0NmVjZmFlZmFiIiwidXNlcl9pZCI6ImZmOWZjZjIzLTE0NDgtNDA4Ny04ZDhmLTNhZjQ2MWY5OWE0YyJ9.gpI4KPR6Aw-IdvtREfM1A2IKh6mPdoxXDlkcInL2IDQ",
          },
        });
        const productsArray = Object.values(response.data);
        dispatch(clearProducts());
        productsArray.forEach((item) => {
          dispatch(addProducts({ products: item }));
        });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <>
      <Nav />
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
    </>
  );
};

export default Products;
