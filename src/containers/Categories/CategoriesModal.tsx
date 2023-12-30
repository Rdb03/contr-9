import {Modal} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from "../../app/hook.ts";
import {
    closeModal,
    selectCategory,
    selectCreateCategoriesLoading,
    selectIsModalOpen, selectUpdateCategoryLoading
} from "../../store/categoriesSlice.ts";
import CategoryFrom from "../../components/Forms/CategoryForm/CategoryFrom.tsx";
import {TCategoryMutation} from "../../type";
import {createCategory, fetchCategories, updateCategory} from "../../store/categoriesThunk.ts";

const CategoriesModal = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(selectIsModalOpen);
    const createLoading = useAppSelector(selectCreateCategoriesLoading);
    const category = useAppSelector(selectCategory);
    const updateLoading = useAppSelector(selectUpdateCategoryLoading);

    const handleClose = () => {
        dispatch(closeModal());
    }

    const onSubmit = async (newCategory: TCategoryMutation) => {
        const data = {
            type: newCategory.type,
            name: newCategory.name,
        }

        if(category) {
           await  dispatch(updateCategory({
                id: category.id,
                category: data,
            }))
        } else {
            await dispatch(createCategory(data));
        }
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
                    <CategoryFrom
                        onClose={handleClose}
                        onSubmit={onSubmit}
                        loading={category ? updateLoading : createLoading}
                        category={category}
                    />
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CategoriesModal;