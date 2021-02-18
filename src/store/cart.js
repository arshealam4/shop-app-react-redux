import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const slice = createSlice({
  name: "carts",
  initialState: {
    cartItems: [],
    count: 0,
    totalAmount: 0,
  },
  reducers: {
    getItems: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.totalAmount = action.payload.totalAmount;
      state.count = action.payload.count;
    },
    emptyCart: (state, action) => {
      state.cartItems = action.payload.cartItems;
      state.totalAmount = action.payload.totalAmount;
      state.count = action.payload.count;
      localStorage.removeItem("cart", JSON.stringify(action.payload));
    },
    addItems: (state, action) => {
      const item = {
        id: action.payload._id,
        title: action.payload.title,
        quantity: 1,
        price: action.payload.price,
        total: action.payload.price,
      };
      const items = state.cartItems;
      const index = items.findIndex((i) => i.id === item.id);

      if (index > -1) {
        items[index].total = items[index].total + items[index].price;
        items[index].quantity = items[index].quantity + 1;
        state.cartItems = items;
        state.totalAmount = state.totalAmount + items[index].price;
      } else {
        state.cartItems.push(item);
        state.totalAmount = state.totalAmount + item.price;
        state.count = state.count + 1;
      }
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          totalAmount: state.totalAmount,
          count: state.count,
        })
      );
    },
    removeItems: (state, action) => {
      const items = state.cartItems;
      const index = items.findIndex((item) => item.id === action.payload);

      if (items[index].quantity > 1) {
        items[index].total = items[index].total - items[index].price;
        items[index].quantity = items[index].quantity - 1;
        state.cartItems = items;
        state.totalAmount = state.totalAmount - items[index].price;
      } else {
        state.totalAmount = state.totalAmount - items[index].price;
        state.count = state.count - 1;
        items.splice(index, 1);
      }
      localStorage.setItem(
        "cart",
        JSON.stringify({
          cartItems: state.cartItems,
          totalAmount: state.totalAmount,
          count: state.count,
        })
      );
    },
  },
});

// method
export const { getItems, addItems, removeItems, emptyCart } = slice.actions;

// reducer
export default slice.reducer;

export const getCartItems = () => {
  return async (dispatch) => {
    try {
      let cart = (await localStorage.getItem("cart"))
        ? JSON.parse(await localStorage.getItem("cart"))
        : null;
      if (!cart) {
        cart = {
          cartItems: [],
          count: 0,
          totalAmount: 0,
        };
      }
      dispatch(getItems(cart));
    } catch (error) {
      throw new Error(error);
    }
  };
};

export const emptyCartItems = () => {
  return async (dispatch) => {
    try {
      const cart = {
        cartItems: [],
        count: 0,
        totalAmount: 0,
      };
      dispatch(emptyCart(cart));
      toast.success('Cart Cleared!')
    } catch (error) {
      toast.error('Error to clear cart')
      throw new Error(error);
    }
  };
};

export const addItemToCart = (item) => {
  return async (dispatch) => {
    try {
      dispatch(addItems(item));
      toast.success('Item added in cart')
    } catch (error) {
      toast.error('Error to adding item in cart')
      throw new Error(error);
    }
  };
};

export const removeItemFromCart = (itemId) => {
  return async (dispatch) => {
    try {
      dispatch(removeItems(itemId));
      toast.success('Item removed from cart')
    } catch (error) {
      toast.error('Error to removing item from cart')
      throw new Error(error);
    }
  };
};
