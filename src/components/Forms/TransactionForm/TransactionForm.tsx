import {ICategory, ITransactionMutation} from "../../../type";
import React, {useEffect, useState} from "react";
import {Button, Spinner} from "react-bootstrap";
import {useAppSelector} from "../../../app/hook.ts";
import {selectCategories} from "../../../store/categoriesSlice.ts";

interface Props {
    onSubmit: (data: ITransactionMutation) => void;
    onClose: () => void;
    loading: boolean;
}

const TransactionForm: React.FC<Props> = ({onSubmit, onClose, loading}) => {
    const [formState, setFormState] = useState<ITransactionMutation>({
       category: '',
        amount: '',
        createAt: '',
    });

    const [filterCategories, setFilterCategories] = useState<ICategory[]>([]);

    const categories = useAppSelector(selectCategories);

    useEffect(() => {
        setFilterCategories(categories.filter((category) => category.type === "income"));
    }, [categories]);

    const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setFilterCategories(categories.filter((category) => category.type === value));
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const obj = {
            ...formState,
            createAt: (new Date()).toString(),
        }

        onSubmit(obj);
    };

    return (
        <form onSubmit={onFormSubmit}>
            <div className="mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select
                    required
                    className="form-select"
                    name="type"
                    onChange={onTypeChange}
                    defaultValue="income"
                >
                    <option
                        value="income"
                    >
                        Income
                    </option>
                    <option
                        value="expense"
                    >
                        Expense
                    </option>
                </select>
            </div>

            <div className="mb-3">
                <select
                    required
                    className="form-select"
                    name="category"
                    value={formState.category}
                    onChange={onChange}
                >
                    <option value="" disabled>Selected category</option>
                    {filterCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                            { category.name }
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="amount" className="form-label">Name</label>
                <input
                    required
                    type="number"
                    className="form-control"
                    id="amount"
                    placeholder="Amount"
                    name="amount"
                    value={formState.amount}
                    onChange={onChange}
                />
            </div>

            <div className="d-flex justify-content-end"></div>
            <Button variant="secondary" className="mr-2" onClick={onClose}>Close</Button>
            <Button className="ms-2" variant="primary" type="submit" disabled={loading}>
                {loading && <Spinner/>}
                Submit
            </Button>
        </form>
    );
};

export default TransactionForm;