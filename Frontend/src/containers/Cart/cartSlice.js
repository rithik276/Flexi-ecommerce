import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart:[]
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    handleAddCart: (state, action) => {
      state.cart.push(action.payload);
    },

    handleChangeQuantity: (state, action) => {
      state.cart = state.cart.map(
        (cart_obj) =>
          cart_obj.product.product_id === action.payload.product_id &&
          cart_obj.product_variant_id === action.payload.product_variant_id
            ? {
                ...cart_obj,
                quantity: cart_obj.quantity + action.payload.quantity,
              }
            : cart_obj,
      );
    },
  },
});

export const { handleAddCart, handleChangeQuantity} = cartSlice.actions
export default cartSlice.reducer