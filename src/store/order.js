import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { placeOrder, getOrderItems } from "../services/orderService";

const slice = createSlice({
  name: "orders",
  initialState: {
    orderItems: [],
  },
  reducers: {
    getOrders: (state, action) => {
      state.orderItems = action.payload;
    },
    addOrder: (state, action) => {
      state.orderItems.unshift(action.payload);
    },
  },
});

// method
export const { getOrders, addOrder } = slice.actions;

// reducer
export default slice.reducer;

export const getAllOrders = () => {
  return async (dispatch) => {
    try {
      const { result } = await getOrderItems();
      dispatch(getOrders(result));
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const addOrders = (order) => {
  return async (dispatch) => {
    console.log(order)
    try {
      const { result } = await placeOrder(order);
      dispatch(addOrder(result));
      toast.success('Order placed successfully')
    } catch (error) {
      toast.success('Error while placing order')
      throw new Error(error);
    }
  };
};
