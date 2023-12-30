import {createAsyncThunk} from '@reduxjs/toolkit';
import {ICategoriesList, ICategory, TCategoryMutation} from '../type';
import axiosApi from '../axiosApi.ts';

export const fetchCategories = createAsyncThunk<ICategory[]>(
  'categories/fetch',
  async () => {
    const response = await axiosApi<ICategoriesList | null>('/categories.json');
    const categories = response.data;
    let newCategories: ICategory[] = [];

    if(categories) {
      newCategories = Object.keys(categories).map((id) => ({
          ...categories[id],
          id: id
        }))
    }

    return newCategories;
  }
);

interface Params {
    category: TCategoryMutation;
    id: string,
}

export const createCategory = createAsyncThunk<void, TCategoryMutation>(
    'categories/create',
    async (category) => {
        await axiosApi.post('/categories.json', category);
    }
);

export const deleteCategories = createAsyncThunk<void, string>(
  'categories/delete',
  async (id) =>{
    await axiosApi.delete(`/categories/${id}.json`);
  }
);