export const handleAddProducts = (state, action) => {
  state.products = [...state.products, ...action.payload.products];
};

export const handleClearProducts = (state) => {
  state.products = [];
};

export const handleLoading = (state, action) => {
  state.isLoading = action.payload;
};

export const handleError = (state, action) => {
  state.isError = action.payload.error;
  state.error_msg = action.payload.error_msg;
};

export const handleSelectedProduct = (state, action) => {
  state.selected_product = action.payload;
};
