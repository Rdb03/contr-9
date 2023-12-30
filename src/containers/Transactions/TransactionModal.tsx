import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {
    selectIsModalOpen,
    selectTransactionCreateLoading,
    transactionCloseModal
} from "../../store/transactionSlice.ts";
import {Modal} from "react-bootstrap";
import TransactionForm from "../../components/Forms/TransactionForm/TransactionForm.tsx";
import {ITransactionMutation} from "../../type";
import {createTransaction} from "../../store/transactionThunk.ts";

const TransactionModal = () => {
    const  dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectIsModalOpen);
    const createLoading = useAppSelector(selectTransactionCreateLoading);

    const handleClose = () => {
        dispatch(transactionCloseModal());
    };

    const onSubmit = async (data: ITransactionMutation) => {
       await dispatch(createTransaction({
            ...data,
            amount: parseInt(data.amount),
        }));

       handleClose();
    };

    return (
        <Modal show={isOpen} backdrop="static" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Transaction</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <TransactionForm
                    onClose={handleClose}
                    onSubmit={onSubmit}
                    loading={createLoading}
                />
            </Modal.Body>
        </Modal>
    );
};

export default TransactionModal;