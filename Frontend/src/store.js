import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./containers/Products/productSlice";
import persistStore from "redux-persist/es/persistStore";

const store = configureStore({
  reducer: {
    product: productsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);

export default store;