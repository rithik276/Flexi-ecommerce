import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./containers/Products/productSlice"
import { cartReducer } from "./containers/Cart/cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;