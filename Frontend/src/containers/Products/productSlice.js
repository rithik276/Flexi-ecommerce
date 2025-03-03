import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "./constants";
import { URL } from "../../utils/config";
import { header } from "../../utils/config";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error_msg: "",
  selected_product: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: URL(API_ENDPOINTS.FETCH_PRODUCTS),
        method: "GET",
        headers: header,
      });
      const productsArray = Object.values(response.data);
      return productsArray;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const selectedProduct = createAsyncThunk(
  "products/selectedProduct",
  async ({ product_id }, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: `${URL(API_ENDPOINTS.SELECTED_PRODUCT)}${product_id}/`,
        method: "GET",
        headers: header,
      });
      return response.data[0];
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);



const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error_msg =
          action.payload?.message ||
          "Failed to fetch products, please try again later";
      })
      .addCase(selectedProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(selectedProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selected_product = action.payload;
      })
      .addCase(selectedProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error_msg =
          action.payload?.message ||
          "Failed to fetch the selected product, please try again later";
      })
  },
});

export default productSlice.reducer;
