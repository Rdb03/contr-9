import {configureStore} from '@reduxjs/toolkit';
import {categoryReducer} from '../store/categoriesSlice.ts';
import {transactionReducer} from "../store/transactionSlice.ts";

export const store = configureStore({
    reducer: {
        categories: categoryReducer,
        transactions: transactionReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;