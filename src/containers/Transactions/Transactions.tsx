import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {useEffect} from "react";
import {fetchCategories} from "../../store/categoriesThunk.ts";
import {fetchTransactions} from "../../store/transactionThunk.ts";
import Spinner from "../../components/Spinner/Spinner.tsx";
import {ListGroup} from "react-bootstrap";
import {selectFetchTransactionLoading, selectTransaction} from "../../store/transactionSlice.ts";
import TransactionItem from "./TransactionItem.tsx";

const Transactions = () => {
    const dispatch = useAppDispatch();
    const fetchLoading = useAppSelector(selectFetchTransactionLoading);
    const transaction = useAppSelector(selectTransaction);

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);


  return (
    <div>
        {
            fetchLoading
                ? <Spinner/> :
                <ListGroup>
                    {transaction.map((transaction, index) => <TransactionItem key={index} transaction={transaction} />)}
                </ListGroup>
        }
    </div>
  );
};

export default Transactions;