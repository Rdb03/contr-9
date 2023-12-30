import {useEffect} from 'react';
import {fetchCategories} from '../../store/categoriesThunk.ts';
import {ListGroup} from "react-bootstrap";
import {useAppDispatch, useAppSelector} from '../../app/hook.ts';
import {selectCategories, selectFetchCategoriesLoading} from '../../store/categoriesSlice.ts';
import Spinner from '../../components/Spinner/Spinner.tsx';
import CategoryItem from './CategoryItem.tsx';

const Categories = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const fetchLoading = useAppSelector(selectFetchCategoriesLoading);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <h4 className="mt-5 mb-3">Categories</h4>
      {
        fetchLoading
          ? <Spinner/> :
          <ListGroup>
            {categories.map((category) => <CategoryItem category={category}/>)}
          </ListGroup>
      }
    </>
  );
};

export default Categories;