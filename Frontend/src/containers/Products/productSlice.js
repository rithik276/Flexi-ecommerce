import { createSlice } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import {
  handleAddProducts,
  handleClearProducts,
  handleError,
  handleLoading,
  handleSelectedProduct,
} from "./productReducer";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error_msg : "",
  selected_product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: handleAddProducts,
    clearProducts: handleClearProducts,
    loadingHandler: handleLoading,
    errorHandler: handleError,
    selectedProduct: handleSelectedProduct,
  },
});

export const { addProducts, clearProducts, loadingHandler, errorHandler, selectedProduct} =
  productSlice.actions;


const persistConfig = {
  key: "product",
  storage,
  whitelist: ["selected_product"],
};

const persistedProductsReducer = persistReducer(
  persistConfig,
  productSlice.reducer,
);

export const productsReducer = persistedProductsReducer;


