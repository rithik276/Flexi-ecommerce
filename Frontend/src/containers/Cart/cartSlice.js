import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { header, URL } from "../../utils/config";
import { API_ENDPOINTS } from "./constants";

export const addCart = createAsyncThunk(
  "cart/addCart",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: URL(API_ENDPOINTS.ADD_CART),
        method: "POST",
        data: payload,
        headers: header,
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async (payload, { dispatch,rejectWithValue }) => {
    try {
      const response = await axios({
        url: URL(API_ENDPOINTS.ADD_CART),
        method: "POST",
        data: payload,
        headers: header,
      })
      // await dispatch(getCart());
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios({
        url: URL(API_ENDPOINTS.GET_CART),
        method: "GET",
        headers: header,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const initialState = {
  cart: {},
  isLoading: false,
  isError: false,
  error_msg: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addCart.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(addCart.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error_msg = action.payload;
    });

    builder.addCase(getCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      console.log("dsa", action.payload);

      state.isLoading = false;
      state.cart = action.payload;
    });
    builder.addCase(getCart.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error_msg = action.payload;
    });

    builder.addCase(updateQuantity.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateQuantity.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(updateQuantity.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.error_msg = action.payload;
    });
  },
});

// export const { handleAddCart } = cartSlice.actions;
export default cartSlice.reducer;
