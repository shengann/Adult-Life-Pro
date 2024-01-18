import FormRow from "./FormRow"
import styled from 'styled-components';
import moment from 'moment'
import { useEffect, useState } from 'react';
import { useUpdateExpenseMutation, useAddExpenseMutation } from '../slices/expenseSlice';
import DatePicker from "react-datepicker";
import Creatable from 'react-select/creatable';
import Select from 'react-select';
import { Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { handleCreatableInput, splitExpense } from "../utils";

const StyledDatePicker = styled(DatePicker)`
  border: solid 1px #ccc;
  border-radius: 10px;
  width: 95%;
`;

const ExpenseDetailModal = ({ showPopup, expenseDetails, displayMode, onClose }) => {
    const categoryOptions = [
        { value: 'Groceries', label: 'Groceries' },
        { value: 'Dining Out', label: 'Dining Out' },
        { value: 'Transportation', label: 'Transportation' }
    ]
    const splitOptions = [
        { value: 'Equally', label: 'Equally' },
        { value: 'Unequally', label: 'Unequally' },
    ]
    const paidByOptions = [
        { value: 'You', label: 'You' }
    ]

    const splitGroupDefaultValue = (splitGroup) => {
        return splitGroup.map(item => ({
            value: item.name,
            label: item.name
        }));
    };

    const initialState = {
        id: expenseDetails._id,
        amount: expenseDetails.amount,
        category: expenseDetails.category,
        date: displayMode === 'add' ? new Date() : expenseDetails.date,        
        description: expenseDetails.description,
        note: expenseDetails.note,
        paidBy: expenseDetails.paidBy,
        splitOptions: expenseDetails.splitOptions,
        splitGroup: expenseDetails.splitGroup,
        personalExpense: expenseDetails.personalExpense
    }
    const [expenseData, setExpenseData] = useState(initialState);

    const handleEquallySplitGroupSubmission = (splitGroup,amount) => {
        return splitGroup.map(item => ({
            ...item,
            amount: amount
        }));
    }

    const handleExpenseInput = (e) => {
        const { name, value } = e.target;
        const isNumericInput = ['amount'].includes(name);
        setExpenseData((state) => ({
            ...expenseData,
            [name]: isNumericInput ? parseFloat(value) || null : value,
        }));

    };
    const [updateExpense] = useUpdateExpenseMutation()
    const [createExpense] = useAddExpenseMutation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (displayMode === "edit") {
            updateExpense({ ...expenseData })
                .then(() => onClose())
                .catch((error) => {
                    console.error("Error updating expense:", error);
                });
        } else if (displayMode === "add") {
            createExpense({ ...expenseData })
                .then(() => onClose())
                .catch((error) => {
                    console.error("Error creating expense:", error);
                });
        }

    };

    const [isSplitExpense, setIsSplitExpense] = useState(false);

    const handleSplitGroupInput = (splitGroup) => {
        const updatedSplitGroup = handleCreatableInput(splitGroup, expenseData)
        setExpenseData({ ...expenseData, splitGroup: updatedSplitGroup });
    };

    useEffect(() => {
        if (expenseData.personalExpense && displayMode !== "add") {
            setIsSplitExpense(true);
        }
    }, [displayMode]);

    useEffect(() => {
        if (expenseData.splitGroup && expenseData.splitOptions && expenseData.amount) {
            const personalExpense = splitExpense(expenseData.amount, expenseData.splitOptions, expenseData.splitGroup);
            setExpenseData((prevData) => ({ ...prevData, personalExpense: parseFloat(personalExpense) }));
        }
    }, [expenseData.splitGroup, expenseData.splitOptions, expenseData.amount]);

    useEffect(()=>{
        if (expenseData.splitOptions === "Equally") {
            const updatedSplitGroup = handleEquallySplitGroupSubmission(expenseData.splitGroup, expenseData.personalExpense);
            setExpenseData((prevData) => ({ ...prevData, splitGroup: updatedSplitGroup }));
        }
    }, [expenseData.personalExpense])

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
                        disabled={displayMode === 'view'}
                        selected={expenseData.date ? new Date(expenseData.date) : null}
                        onChange={(date) => setExpenseData({ ...expenseData, date: date })}
                        showIcon
                        todayButton="Today"
                    />
                    <Creatable
                        className="w-75"
                        placeholder='Category'
                        defaultValue={expenseData.category ? { value: expenseData.category, label: expenseData.category } : ''}
                        options={categoryOptions}
                        onChange={(inputValue) => setExpenseData({ ...expenseData, category: inputValue ? inputValue.value : null })}
                        formatCreateLabel={(inputValue) => `Add new Category: ${inputValue}`}
                        isClearable={true}
                        isSearchable={true}
                        isDisabled={displayMode === 'view'}
                    />
                </div>
                <FormRow
                    type="text"
                    name="note"
                    labelText='Note'
                    value={expenseData.note}
                    handleChange={handleExpenseInput}
                    disabled={displayMode === 'view'}
                />
                <FormRow
                    type="text"
                    name="account"
                    labelText='Account'
                    value=''
                    handleChange={handleExpenseInput}
                    disabled={displayMode === 'view'}
                />
                <FormRow
                    name="description"
                    labelText='Description'
                    type="text"
                    value={expenseData.description}
                    handleChange={handleExpenseInput}
                    disabled={displayMode === 'view'}
                />
                <div className='d-flex gap-2 my-2'>
                    <label className='align-self-center'>Amount</label>
                    <FormRow
                        name="amount"
                        type="number"
                        value={expenseData.amount}
                        handleChange={handleExpenseInput}
                        disabled={displayMode === 'view'}
                    />
                    <div className='d-flex flex-row gap-2 align-self-center'>
                        <label>
                            Split It
                        </label>
                        <Form.Check
                            type="switch"
                            disabled={displayMode === 'view'}
                            onChange={(event) => {
                                setIsSplitExpense(event.target.checked)
                            }}
                            checked={isSplitExpense}
                        />
                    </div>
                </div>
                {isSplitExpense && (
                    <>
                        <div className='d-flex gap-2 my-2'>
                            <div className='align-self-center'>Paid By</div>
                            <Creatable
                                defaultValue={expenseData.paidBy ? { value: expenseData.paidBy, label: expenseData.paidBy } : ''}
                                options={paidByOptions}
                                isClearable={true}
                                onChange={(inputValue) => setExpenseData({ ...expenseData, paidBy: inputValue ? inputValue.value : null })}
                                isDisabled={displayMode === 'view'}
                            />
                            <div className='align-self-center'>& Split</div>
                            <Select
                                defaultValue={expenseData.splitOptions ? { value: expenseData.splitOptions, label: expenseData.splitOptions } : ''}
                                options={splitOptions}
                                onChange={(inputValue) => setExpenseData({ ...expenseData, splitOptions: inputValue ? inputValue.value : null })}
                                isDisabled={displayMode === 'view'}
                            />

                        </div>

                        <div className='d-flex gap-2 my-2'>
                            <div className='align-self-center'>Split It Among</div>
                            <Creatable
                                defaultValue={splitGroupDefaultValue(expenseDetails.splitGroup)}
                                className="w-75"
                                isClearable={true}
                                onChange={(inputValue) => handleSplitGroupInput(inputValue.map(item => item.value))}
                                isMulti={true}
                                formatCreateLabel={(inputValue) => `Add new Friend(s): ${inputValue}`}
                                isDisabled={displayMode === 'view'}
                            />
                        </div>
                        <Row>
                            {expenseData.splitOptions === 'Unequally' && expenseData.splitGroup.map((groupItem, index) => (
                                <Col key={index} className='d-flex gap-2 mt-2 justify-content-between' md={6}>
                                    <div className='align-self-center'>{groupItem.name}</div>
                                    <FormRow
                                        type='number'
                                        value={groupItem.amount}
                                        handleChange={(e) => {
                                            const updatedSplitGroup = [...expenseData.splitGroup];
                                            updatedSplitGroup[index].amount = parseFloat(e.target.value);
                                            setExpenseData({ ...expenseData, splitGroup: updatedSplitGroup })
                                        }}
                                        disabled={displayMode === 'view'}
                                        width='7.5vw'
                                        textAlign='right'
                                    />
                                </Col>
                            ))}
                        </Row>
                        <p>Your Expense : {expenseData.personalExpense}</p>

                    </>
                )}
            </Modal.Body>
            {
                displayMode !== 'view' && (
                    <Modal.Footer>
                        <Button className="btn btn-sm" variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                        <Button className="btn btn-sm" variant="success" onClick={handleSubmit}>
                            {displayMode === 'edit' ? "Save Changes" : "Add Expense"}
                        </Button>
                    </Modal.Footer>
                )
            }

        </Modal>
    )
}
export default ExpenseDetailModal