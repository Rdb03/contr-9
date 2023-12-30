import {ListGroup} from 'react-bootstrap';
import {ICategory} from '../../type';
import * as React from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hook.ts';
import {deleteCategories, fetchCategories} from '../../store/categoriesThunk.ts';
import {selectDeleteCategoriesLoading} from '../../store/categoriesSlice.ts';
import ButtonSpinner from '../../components/Spinner/ButtonSpinner.tsx';

interface Props {
  category: ICategory;
}

const CategoryItem: React.FC<Props> = ({category}) => {
  const dispatch = useAppDispatch();
  const deleteCategory = useAppSelector(selectDeleteCategoriesLoading);

  const getTypeColor = () => {
    return category.type === "income" ? "green" : "red";
  }

  const onDelete = async () => {
    if (window.confirm("Вы точно хотите удалить запись?")) {
      await dispatch(deleteCategories(category.id));
      await dispatch(fetchCategories());
    }
  };

  return (
    <ListGroup.Item className="d-flex justify-content-between align-items-center">
      <div>
        { category.name }
      </div>
      <div className="d-flex align-items-center">
                  <span className="d-inline me-3" style={{color: getTypeColor()}}>
                     { category.type }
                  </span>
        <div>
          <button className="btn btn-warning me-3">Edit</button>
          <button className="btn btn-danger" onClick={onDelete} disabled={!!deleteCategory}>
            {deleteCategory && deleteCategory === category.id ? <ButtonSpinner/> : null}
            Delete
          </button>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default CategoryItem;