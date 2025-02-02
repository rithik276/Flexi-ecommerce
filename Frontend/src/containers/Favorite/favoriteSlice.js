import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "./constants";
import { URL } from "../../utils/config";
import { header } from "../../utils/config";
import axios from "axios";

const initialState = {
  isLoading: false,
  isError: false,
  error_msg: "",
  favorites: [],
};

export const addFavoriteProduct = createAsyncThunk(
  "favorite/addFavoriteProduct",
  async ({ product_id, product_variant_id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios({
        url: URL(API_ENDPOINTS.ADD_FAVORITE_PRODUCT),
        method: "POST",
        data: { product_id, product_variant_id },
        headers: header,
      });
      dispatch(fetchFavorites());
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const fetchFavorites = createAsyncThunk(
  "favorite/fetchFavorites",
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

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error_msg = action.payload?.message;
      });
  },
});

export default favoriteSlice.reducer;
