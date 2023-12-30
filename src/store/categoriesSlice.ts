import {createSlice} from '@reduxjs/toolkit';
import {createCategory, deleteCategories, fetchCategories} from './categoriesThunk.ts';
import {ICategory} from '../type';
import {RootState} from '../app/store.ts';

interface CategoryState {
  items: ICategory[];
  fetchLoading: boolean;
  updateLoading: boolean
  deleteLoading: string | false;
  isModalOpen: boolean;
  createLoading: boolean;
}

const initialState: CategoryState = {
  items: [],
  fetchLoading: false,
  updateLoading: false,
  deleteLoading: false,
  isModalOpen: false,
  createLoading: false,
}

const categoriesSlice  = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openModal: (state) => {
        state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, {payload: categories}) => {
      state.fetchLoading = false;
      state.items = categories;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.fetchLoading = false;
    });
    builder.addCase(createCategory.pending, (state) => {
      state.createLoading = true;
    });
    builder.addCase(createCategory.fulfilled, (state) => {
      state.createLoading = false;
    });
    builder.addCase(createCategory.rejected, (state) => {
      state.createLoading = false;
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

export const categoryReducer = categoriesSlice.reducer;
export const {openModal, closeModal} = categoriesSlice.actions;
export const selectCategories = (state: RootState) => state.categories.items;
export const selectFetchCategoriesLoading = (state: RootState) => state.categories.fetchLoading;
export const selectDeleteCategoriesLoading = (state: RootState) => state.categories.deleteLoading;
export const selectCreateCategoriesLoading = (state: RootState) => state.categories.createLoading;
export const  selectIsModalOpen  = (state: RootState) => state.categories.isModalOpen;