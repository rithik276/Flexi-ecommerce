import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./containers/Products/productSlice"
import  cartReducer  from "./containers/Cart/cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  }
});

export default store;