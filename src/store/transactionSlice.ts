import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../app/store.ts";
import {createTransaction, fetchTransactions} from "./transactionThunk.ts";
import {ITransaction} from "../type";

interface TransactionState {
    items: ITransaction[];
    fetchLoading: boolean;
    isModalOpen: boolean;
    createLoading: boolean;
}

const initialState: TransactionState = {
    items: [],
    fetchLoading: false,
    createLoading: false,
    isModalOpen: false,
};

const transactionsSlice = createSlice({
   name: 'transactions',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
    },
    extraReducers: (builder ) => {
        builder.addCase(createTransaction.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createTransaction.fulfilled, (state) => {
            state.createLoading = false;
        });
        builder.addCase(fetchTransactions.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchTransactions.fulfilled, (state, {payload: transactions}) => {
            state.fetchLoading = false;
            state.items = transactions;
        });
    }
});

export const transactionReducer = transactionsSlice.reducer;
export const {openModal
    , closeModal: transactionCloseModal} = transactionsSlice.actions;
export const selectTransaction = (state: RootState) => state.transactions.items;
export const  selectIsModalOpen = (state: RootState) => state.transactions.isModalOpen;
export const selectTransactionCreateLoading = (state: RootState) => state.transactions.createLoading;
export const  selectFetchTransactionLoading = (state: RootState) => state.transactions.fetchLoading;

