import {Button, Spinner} from "react-bootstrap";
import {useAppDispatch} from "../../../app/hook.ts";
import {closeModal} from "../../../store/categoriesSlice.ts";
import React, {useState} from "react";
import {TCategoryMutation} from "../../../type";

interface Props {
    onSubmit: (category: TCategoryMutation) => void;
    loading: boolean;
}

const CategoryFrom: React.FC<Props>= ({onSubmit, loading}) => {
    const dispatch = useAppDispatch();
    const [formState, setFormState] = useState<TCategoryMutation>({
       type: 'income',
        name: ''
    });

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formState);
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
        const {name, value} = e.target;

        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleClose = () => {
        dispatch(closeModal());
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select
                    required
                    className="form-select"
                    name="type"
                    value={formState.type}
                    onChange={onChange}
                >
                    <option value="income">Income</option>
                    <option value="expanse">Expanse</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    required
                    type="text"
                    className="form-control"
                    id="type"
                    placeholder="Name"
                    name="name"
                    value={formState.name}
                    onChange={onChange}
                />
            </div>

            <div className="d-flex justify-content-end"></div>
            <Button variant="secondary" className="mr-2" onClick={handleClose}>Close</Button>
            <Button className="ms-2" variant="primary" type="submit" disabled={loading}>
                {loading && <Spinner/>}
                Submit
            </Button>
        </form>
    );
};

export default CategoryFrom;