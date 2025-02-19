import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/LOGOS/flexi_logo.png";
import OrderList from "./CheckoutList";

import Footer from "../../components/Footer";
import DetailsCard from "../../components/DetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../Cart/cartSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCart());
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    const calcTotal = cart?.products?.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    setTotal(calcTotal);
  }, [cart, setTotal]);

  if (cart?.cart?.length <= 0 && cart.isLoading) {
    navigate("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#1B1B1B]">
      {/* Logo Section */}
      <div className="w-1/5">
        <NavLink to={"/"}>
          <div className="ml-24 w-52 pb-5 pt-[3.3rem]">
            <img src={logo} alt="" />
          </div>
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="flex flex-grow justify-between px-10">
        {/* Order List Section */}
        <div className="w-3/4 rounded-xl px-4">
          {/* Header Row */}
          <div className="grid grid-cols-8 pr-5 text-white">
            <div className="col-span-4"></div>
            <div className="text-center text-xl font-semibold">Price</div>
            <div className="text-center text-xl font-semibold">Size</div>
            <div className="text-center text-xl font-semibold">Quantity</div>
            <div className="text-center text-xl font-semibold">SubTotal</div>
          </div>

          {/* Scrollable Order List */}
          <div className="max-h-[400px]">
            {cart?.products?.map((item, index) => (
              <OrderList key={index} item={item} />
            ))}
          </div>
        </div>

        {/* Details Section */}
        <DetailsCard total={total} cart={cart} />
      </div>

      {/* Sticky Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Checkout;
