import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import rekapReducer from "./rekapSlice";


export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    user: userReducer,
    rekap: rekapReducer,
  },
});