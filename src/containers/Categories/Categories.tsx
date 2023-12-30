import {useEffect} from 'react';
import {fetchCategories} from '../../store/categoriesThunk.ts';
import {ListGroup} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from '../../app/hook.ts';
import {openModal, selectCategories, selectFetchCategoriesLoading} from '../../store/categoriesSlice.ts';
import Spinner from '../../components/Spinner/Spinner.tsx';
import CategoryItem from './CategoryItem.tsx';
import CategoriesModal from "./CategoriesModal.tsx";

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const fetchLoading = useAppSelector(selectFetchCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-5 mt-3">
        <h4>Categories</h4>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => dispatch(openModal())}
        >
          Add
        </button>
      </div>
      {
        fetchLoading
          ? <Spinner/> :
          <ListGroup>
            {categories.map((category) => <CategoryItem category={category}/>)}
          </ListGroup>
      }

      <CategoriesModal/>
    </>
  );
};

export default Categories;