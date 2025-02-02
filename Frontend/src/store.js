import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./containers/Products/productSlice"
import  cartReducer  from "./containers/Cart/cartSlice";
import favoriteReducer from "./containers/Favorite/favoriteSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    favorite : favoriteReducer
  }
});

export default store;