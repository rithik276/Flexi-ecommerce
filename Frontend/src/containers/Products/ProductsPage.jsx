import { useDispatch, useSelector } from "react-redux";
import Nav from "../../components/Nav";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import { STATIC_URL } from "../../utils/config";
import { addCart } from "../Cart/cartSlice";
import { useNavigate, useParams } from "react-router-dom";
import { selectedProduct } from "./productSlice";

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { product_name, product_id } = useParams();
  const { selected_product, isLoading: product_loading } = useSelector(
    (state) => state.products,
  );
  const [product_variant, setProduct_variant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (product_id) {
        await dispatch(selectedProduct({ product_id: product_id }));
      }
    };
    fetchData();
  }, [dispatch, product_id]);

  useEffect(() => {
    const setProductVariant = async () => {
      if (selected_product?.variants?.length > 0) {
        setProduct_variant(selected_product?.variants[0]);
      }
    };

    setProductVariant();
  }, [selected_product]);


  useEffect(() => {
    if (product_variant?.size_stock) {
      setSelectedSize(product_variant.size_stock[0]);
    }
  }, [product_variant]);

  const handleSelectProduct = (id) => {
    setProduct_variant(
      selected_product.variants.find((p) => p.product_variant_id == id),
    );
  };

  const handleSize = (size) => {
    setSelectedSize(size);
  };

  const handleBuy = async (e) => {
    if (e.target.textContent === "In Cart") {
      navigate("/cart");
    } else {
      const payload = [
        {
          product_id: product_id,
          product_variant_id: product_variant.product_variant_id,
          quantity: 1,
          size: selectedSize,
        },
      ];
      await dispatch(addCart(payload));
      await dispatch(selectedProduct({ product_id }));
    }
  };

  // Only show loading when the product is being fetched
  if (product_loading || !product_variant) {
    return (
      <div>
        <h1>loading...</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex-grow bg-bg">
        <div className="flex gap-12 pl-10">
          <div className="w-1/3">
            <img
              src={STATIC_URL(product_variant.image)}
              alt=""
              className="h-72"
            />
          </div>
          <div className="w-2/3">
            <h1 className="text-5xl font-medium text-white">
              {selected_product.product_name}
            </h1>
            <h3 className="mt-2 text-3xl font-bold tracking-normal text-white">
              Rs. {product_variant.price}
            </h3>
            <div className="mt-3 w-1/2 border-b-2 border-white"></div>
            <p className="mt-3 w-1/2 text-base font-light tracking-normal text-white">
              {selected_product.product_description.length > 200
                ? selected_product.product_description.slice(0, 200) + "..."
                : selected_product.product_description}
            </p>
            <div className="mt-3 flex w-full">
              <div className="w-1/3">
                <h1 className="text-2xl font-semibold text-white">
                  More Colors
                </h1>
                <div
                  style={{ cursor: "pointer" }}
                  className="relative mt-3 flex gap-4"
                >
                  {selected_product.variants.map((variant, i) => (
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-white ${
                        variant.product_variant_id ==
                          product_variant.product_variant_id &&
                        "border-4 border-orange-500"
                      }`}
                      key={i}
                      onClick={() =>
                        handleSelectProduct(variant.product_variant_id)
                      }
                    >
                      <img
                        src={STATIC_URL(variant.image)}
                        alt=""
                        className=""
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="mt-10 h-1/3 w-2/3 rounded-2xl bg-orange-600 text-2xl font-semibold text-white"
                  onClick={(e) => handleBuy(e)}
                >
                  {product_variant.cart.indexOf(selectedSize)>=0 ? "In Cart" : "Add to Cart"}
                </button>
              </div>
              <div className="w-1/2">
                <h1 className="text-2xl font-semibold text-white">Size</h1>
                <div
                  style={{ cursor: "pointer" }}
                  className="relative mt-3 flex gap-2"
                >
                  {product_variant.size_stock.map((size) => (
                    <button
                      className={`relative flex h-12 w-12 items-center justify-center rounded-3xl text-xl font-bold ${
                        selectedSize == size ? "bg-orange-600" : "bg-white"
                      } `}
                      key={size}
                      onClick={() => handleSize(size)}
                    >
                      {size}

                      {/* Diagonal Strikethrough */}
                      {/* {stock == 0 && (
                          <span className="border-t-1 absolute bottom-4 right-4 h-full w-full rotate-45 transform border-r-2 border-gray-700"></span>
                        )} */}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="flex-shrink-0">
        <Footer />
      </footer>
    </div>
  );
};

export default ProductsPage;
