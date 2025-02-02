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
  favorites : []
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

export const addFavoriteProduct = createAsyncThunk(
  "products/addFavoriteProduct",
  async ({ product_id,product_variant_id }, { dispatch,rejectWithValue }) => {
    try {
      const response = await axios({
        url: URL(API_ENDPOINTS.ADD_FAVORITE_PRODUCT),
        method: "POST",
        data: { product_id, product_variant_id },
        headers: header,
      });
      dispatch(fetchFavorites())
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchFavorites = createAsyncThunk(
  "products/fetchFavorites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: URL(API_ENDPOINTS.FAVORITE_PRODUCTS),
        method: "GET",
        headers: header,
      });
      return response.data;
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
      .addCase(addFavoriteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error_msg = action.payload?.message;
      })

      .addCase(fetchFavorites.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.favorites = action.payload
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error_msg =
          action.payload?.message;
      });
  },
});

export default productSlice.reducer;
