import { createSlice } from "@reduxjs/toolkit";
import { getItems } from "../services/productService";

const slice = createSlice({
  name: "products",
  initialState: {
    products: [],
  },
  reducers: {
    getProducts: (state, action) => {
      state.products = action.payload.result;
    },
  },
});

// method
export const { getProducts } = slice.actions;

// reducer
export default slice.reducer;

export const getAllProducts = (params = {}) => {
  return async (dispatch) => {
    try {
      const { data } = await getItems(params);
      dispatch(getProducts(data));
    } catch (error) {
      throw new Error(error);
    }
  };
};
