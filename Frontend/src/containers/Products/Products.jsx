import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import Product from "../../components/Product";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, clearProducts, loadingHandler, errorHandler } from "./productSlice";
import { TOKEN } from "./../../utils/constants";

const Products = () => {
  const dispatch = useDispatch();
  const { products, isLoading, isError, error_msg } = useSelector(
    (state) => state.product,
  );

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch(loadingHandler(true));
      try {
        const response = await axios({
          url: "http://localhost:8000/api/v1/get_products/",
          method: "GET",
          headers: {
            authorization: "Bearer " + TOKEN,
          },
        });
        const productsArray = Object.values(response.data);
        dispatch(clearProducts());
        dispatch(addProducts({ products: productsArray }));
        dispatch(loadingHandler(false));
      } catch (error) {
        console.error("Error fetching products:", error.message);
        dispatch(loadingHandler(false));
        dispatch(errorHandler({ error: true, error_msg: error.message }));
      }
    };
    fetchProducts();
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
