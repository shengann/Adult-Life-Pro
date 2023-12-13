import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormRow from "./FormRow"
import styled from 'styled-components';
import moment from 'moment'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useUpdateExpenseMutation } from '../slices/expenseSlice';
import DatePicker from "react-datepicker";

const StyledDatePicker = styled(DatePicker)`
  border: solid 1px #ccc;
  border-radius: 10px;
  height: 4vh;
`;

const ExpenseDetailPopup = ({ showPopup, expenseDetails, displayMode, onClose }) => {
    const initialState = {
        id: expenseDetails._id,
        amount: expenseDetails.amount,
        category: expenseDetails.category,
        date: expenseDetails.date,
        description: expenseDetails.description,
        note: expenseDetails.note
    }

    const [expenseData, setExpenseData] = useState(initialState);

    const handleExpenseInput = (e) => {
        const { name, value } = e.target;
        setExpenseData((state) => ({
            ...state,
            [name]: value
        }));

    };

    const [updatePost] = useUpdateExpenseMutation()


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("expenseData", expenseData)
        updatePost({ ...expenseData })
            .then(() => onClose())
            .catch((error) => {
                console.error("Error updating expense:", error);
            });

    };
    return (
        <Modal
            show={showPopup}
            onHide={onClose}
            centered
            keyboard
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <StyledDatePicker
                    value={expenseData.date ? moment(expenseData.date).format("MMM Do, YYYY") : null}
                    disabled={displayMode === 'view' ? true : false}
                    selected={expenseData.date ? new Date(expenseData.date) : null}
                    onChange={(date) => setExpenseData({ ...expenseData, date: date })}
                    showIcon
                    todayButton="Today"
                />
                <FormRow
                    type="text"
                    name="note"
                    labelText='Note'
                    value={expenseData.note}
                    handleChange={handleExpenseInput}
                    disabled={displayMode === 'view' ? true : false}
                />
                <FormRow
                    type="text"
                    name="amount"
                    labelText='Amount'
                    value={expenseData.amount}
                    handleChange={handleExpenseInput}
                    disabled={displayMode === 'view' ? true : false}
                />
                <FormRow
                    type="text"
                    name="category"
                    labelText='category'
                    value={expenseData.category}
                    handleChange={handleExpenseInput}
                    disabled={displayMode === 'view' ? true : false}
                />
                <FormRow
                    type="text"
                    name="account"
                    labelText='Account'
                    value=''
                    handleChange={handleExpenseInput}
                    disabled={displayMode === 'view' ? true : false}
                />
                <FormRow
                    name="description"
                    labelText='Description'
                    type="text"
                    value={expenseData.description}
                    handleChange={handleExpenseInput}
                    disabled={displayMode === 'view' ? true : false}
                />
                <div className='d-flex flex-row gap-2'>
                    <label>
                        Split It
                    </label>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        disabled={displayMode === 'view' ? true : false}
                    />
                </div>

            </Modal.Body>
            <Modal.Footer>
                <Button className="btn btn-sm" variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button className="btn btn-sm" variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ExpenseDetailPopup