import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {API_ENDPOINTS} from './constants'
import {URL} from '../../utils/config'
import {header} from '../../utils/config'
import axios from "axios";


const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  error_msg : "",
  selected_product: [],
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_,{rejectwithValue}) => {
    try{
      const response = await axios({ 
        url: URL(API_ENDPOINTS.FETCH_PRODUCTS),
        method: "GET",
        headers: header
      })
      const productsArray = Object.values(response.data);
      return productsArray
    } catch(err){
      return rejectwithValue(err.response.data)
    }
  }

)
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    selectedProduct : (state,action) => {
      state.selected_product = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isError = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isError = true;
        state.error_msg =
          action.payload?.message ||
          "Failed to fetch products please try again later";
      });
  },
});

export const {selectedProduct} = productSlice.actions
export default productSlice.reducer;



