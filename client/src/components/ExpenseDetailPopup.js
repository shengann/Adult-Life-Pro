import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormRow from "./FormRow"
import styled from 'styled-components';
import moment from 'moment'
import { useState } from 'react';

const Section = styled.section`

`
const ExpenseDetailPopup = ({ showPopup, expenseDetails, onClose }) => {

    const initialState = {
        amount: expenseDetails.amount,
        category: expenseDetails.category,
        date: expenseDetails.date,
        description: expenseDetails.description,
        note: expenseDetails.note,
    }

    const [expenseData, setExpenseData] = useState(initialState);

    const handleExpenseInput = (e) => {
        const { name, value } = e.target;
        setExpenseData((state) => ({
            ...state,
            [name]: value
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();

    };
    return (
        <Section>
            <Modal
                show={showPopup}
                onHide={onClose}
                centered
                keyboard
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <FormRow
                        type="text"
                        name="date"
                        labelText='Date'
                        value={moment(expenseData.date).format("MMM Do, YYYY")}
                        handleChange={handleExpenseInput}
                    />
                    <FormRow
                        type="text"
                        name="note"
                        labelText='Note'
                        value={expenseData.note}
                        handleChange={handleExpenseInput}
                    />
                    <FormRow
                        type="text"
                        name="amount"
                        labelText='Amount'
                        value={expenseData.amount}
                        handleChange={handleExpenseInput}
                    />
                    <FormRow
                        type="text"
                        name="category"
                        labelText='category'
                        value={expenseData.category}
                        handleChange={handleExpenseInput}
                    />
                    <FormRow
                        type="text"
                        name="account"
                        labelText='Account'
                        value=''
                        handleChange={handleExpenseInput}
                    />
                    <FormRow
                        name="description"
                        labelText='Description'
                        type="text"
                        value={expenseData.description}
                        handleChange={handleExpenseInput}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Section>
    )
}
export default ExpenseDetailPopup