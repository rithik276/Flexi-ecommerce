import React from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import CartList from "./CartList";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <div className="flex-grow  bg-bg">
        <div className="mx-24">
          <h1 className="text-2xl font-semibold text-white">My Cart</h1>
          <div className="mt-5">
            {cart.map((item, idx) => (
              <CartList item={item} key={idx} />
            ))}
          </div>
        </div>
      </div>
      <footer className="">
        <Footer />
      </footer>
    </div>
  );
};

export default Cart;
