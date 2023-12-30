import {Modal} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {closeModal, selectCreateCategoriesLoading, selectIsModalOpen} from "../../store/categoriesSlice.ts";
import CategoryFrom from "../../components/Forms/CategoryForm/CategoryFrom.tsx";
import {TCategoryMutation} from "../../type";
import {createCategory, fetchCategories} from "../../store/categoriesThunk.ts";

const CategoriesModal = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectIsModalOpen);
    const createLoading = useAppSelector(selectCreateCategoriesLoading);

    const handleClose = () => {
        dispatch(closeModal());
    }

    const onSubmit = async (category: TCategoryMutation) => {
        await dispatch(createCategory(category));
        await dispatch(fetchCategories());
        handleClose();
    };

    return (
        <div
            className="modal show"
            style={{ display: isOpen ? 'block' : "none", position: 'initial' }}
        >
            <Modal show={isOpen} backdrop="static" onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <CategoryFrom onSubmit={onSubmit} loading={createLoading}/>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CategoriesModal;