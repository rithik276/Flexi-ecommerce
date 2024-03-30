import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products = [...state.products, action.payload.products];
    },
    clearProducts: (state) => {
      state.products = [];
    },
  },
});

export const { addProducts, clearProducts } = productSlice.actions;

export const productsReducer = productSlice.reducer;
