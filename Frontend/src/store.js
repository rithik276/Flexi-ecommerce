import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./containers/Products/productSlice";
export const store = configureStore({
  reducer: {
    product: productsReducer,
  },
});
