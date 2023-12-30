import {createSlice} from '@reduxjs/toolkit';
import {deleteCategories, fetchCategories} from './categoriesThunk.ts';
import {ICategory} from '../type';
import {RootState} from '../app/store.ts';

interface CategoryState {
  items: ICategory[];
  fetchLoading: boolean;
  updateLoading: boolean
  deleteLoading: string | false;
  isModalOpen: boolean;
}

const initialState: CategoryState = {
  items: [],
  fetchLoading: false,
  updateLoading: false,
  deleteLoading: false,
  isModalOpen: false,
}

const cartSlice  = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.items = categories;
      state.fetchLoading = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(deleteCategories.pending, (state, action) => {
      state.deleteLoading = action.meta.arg;
    });
    builder.addCase(deleteCategories.fulfilled, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(deleteCategories.rejected, (state) => {
      state.fetchLoading = false;
    });
  }
});

export const categoryReducer = cartSlice.reducer;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectDeleteCategoriesLoading = (state: RootState) => state.categories.deleteLoading;
export const selectFetchCategoriesLoading = (state: RootState) => state.categories.fetchLoading;