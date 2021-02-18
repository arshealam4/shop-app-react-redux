import { createSlice } from "@reduxjs/toolkit";
import { getCategoryItems } from '../services/categoryService';

const slice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    selectedId: "1"
  },
  reducers: {
    getCategories: (state, action) => {
      const category = [
        {
          title: "All",
          _id: "1",
        },
      ].concat(action.payload.result);
      state.categories = category;
    },
    setCategoryId: (state, action) => {
      state.selectedId = action.payload;
    },
  },
});

// method
export const { getCategories, setCategoryId } = slice.actions;

// reducer
export default slice.reducer;

export const getAllCategories = () => {
  return async (dispatch) => {
    try {
      const { data } = await getCategoryItems();
      dispatch(getCategories(data));
    } catch (error) {
      throw new Error(error);
    }
  };
};
