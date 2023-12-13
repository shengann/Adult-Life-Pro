import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormRow from "./FormRow"
import styled from 'styled-components';
import moment from 'moment'
import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useUpdateExpenseMutation } from '../slices/expenseSlice';
import DatePicker from "react-datepicker";
import Creatable from 'react-select/creatable';

const StyledDatePicker = styled(DatePicker)`
  border: solid 1px #ccc;
  border-radius: 10px;
  height: 5.5vh;
  width: 95%;
`;

const StyledCreatable = styled(Creatable)`
  width: 70%;
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
    const [updateExpense] = useUpdateExpenseMutation()
    const handleSubmit = (e) => {
        e.preventDefault();
        updateExpense({ ...expenseData })
            .then(() => onClose())
            .catch((error) => {
                console.error("Error updating expense:", error);
            });
    };

    const options = [
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Dining Out', label: 'Dining Out' },
        { value: 'Transportation', label: 'Transportation' }
    ]

    const [isSplitExpense, setIsSplitExpense] = useState(false);
    console.log("expenseData", expenseData.category)

    return (
        <Modal
            show={showPopup}
            onHide={onClose}
            centered
            keyboard
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <div className='d-flex justify-content-between'>
                    <StyledDatePicker
                        value={expenseData.date ? moment(expenseData.date).format("MMM Do, YYYY") : null}
                        disabled={displayMode === 'view' ? true : false}
                        selected={expenseData.date ? new Date(expenseData.date) : null}
                        onChange={(date) => setExpenseData({ ...expenseData, date: date })}
                        showIcon
                        todayButton="Today"
                    />
                    <StyledCreatable
                        options={options}
                        onChange={(inputValue) => setExpenseData({ ...expenseData, category: inputValue ? inputValue.value : null})}
                        formatCreateLabel={(inputValue) => `Add new Category: ${inputValue}`}
                        placeholder='Category'
                        isClearable={true}
                        isSearchable={true}
                    />
                </div>
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
                <FormRow
                    type="text"
                    name="amount"
                    labelText='Amount'
                    value={expenseData.amount}
                    handleChange={handleExpenseInput}
                    disabled={displayMode === 'view' ? true : false}
                />
                <div className='d-flex flex-row gap-3' style={{ marginTop: '0.3rem' }}>
                    <label>
                        Split It
                    </label>
                    <Form.Check
                        type="switch"
                        disabled={displayMode === 'view' ? true : false}
                        onChange={(event) => {
                            setIsSplitExpense(event.target.checked)
                        }}
                    />
                </div>
                {isSplitExpense && (
                    <p>12333</p>
                )}

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