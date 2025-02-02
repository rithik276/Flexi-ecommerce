import React, { useEffect } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import CartList from "./CartList";
import { getCart } from "./cartSlice";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getCart());
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  },[dispatch]);
  const checkout = () => {}
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex-grow  bg-bg">
        <div className="mx-24">
          <h1 className="text-2xl font-semibold text-white">My Cart</h1>
          <div className="mt-5">
            {cart?.products?.map((item, idx) => (
              <CartList item={item} key={idx} />
            ))}
          </div>
        </div>
      </div>
      <div
        className="flex items-center justify-center bg-bg"
        onClick={() => checkout()}
      >
        <button className="mb-10 mt-10 h-12 w-52 rounded-2xl bg-orange-600 text-3xl font-semibold tracking-normal text-white">
          Checkout
        </button>
      </div>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default Cart;
