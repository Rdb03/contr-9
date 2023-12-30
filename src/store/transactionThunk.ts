import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITransaction, ITransactionList, TTransactionApi} from "../type";
import axiosApi from "../axiosApi.ts";
import {AppDispatch, RootState} from "../app/store.ts";
import {fetchCategories} from "./categoriesThunk.ts";

export const fetchTransactions =createAsyncThunk<ITransaction[], undefined, {dispatch: AppDispatch, getState: RootState}>(
    'transaction/fetch',
    async (_, {getState, dispatch}) => {
        await dispatch(fetchCategories());
        const state = getState() as RootState;
        const categories = state.categories.items;

        const response = await axiosApi<ITransactionList | null>('/transactions.json');
        const transactions = response.data;
        const newTransactions: ITransaction[] = [];

        if(transactions) {
            Object.keys(transactions).forEach((id) => {
               const transaction = transactions[id];
               const transactionCategory = transaction.category;
               const existingCategory = categories.find((category) => category.id === transactionCategory);

                if(existingCategory) {
                    newTransactions.push({
                        ...transaction,
                        category: {
                            name: existingCategory.name,
                            type: existingCategory.type,
                        },
                        id
                    })
                }
            });
        }

        return newTransactions.sort((a,b) => {
            if (a.createAt > b.createAt) {
                return -1;
            }
            if (a.createAt < b.createAt) {
                return 1;
            }

            return 0;
        });
    }
);

export const createTransaction = createAsyncThunk<void, TTransactionApi>(
  'transaction/create',
    async (transaction) =>  {
      await axiosApi.post('/transaction.json', transaction);
    }
);