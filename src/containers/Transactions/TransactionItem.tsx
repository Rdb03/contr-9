import {ITransaction} from "../../type";
import React from "react";
import {ListGroup} from "react-bootstrap";

interface Props {
    transaction: ITransaction;
}

const TransactionItem: React.FC<Props> = ({transaction}) => {
    const getTypeColor = (): string => {
        return transaction.category.type === "income" ? "green" : "red";
    };

    return (
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
            <div>
                <span>{ transaction.createAt }</span>
                <span> { transaction.category.name }</span>
            </div>
            <div className="d-flex align-items-center">
                  <span className="d-inline me-3" style={{color: getTypeColor()}}>
                     { transaction.amount }
                  </span>
                <div>
                    <button
                        className="btn btn-warning me-3"
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-danger"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </ListGroup.Item>
    );
};

export default TransactionItem;