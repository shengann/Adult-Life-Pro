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
import Select from 'react-select';
import { Row, Col } from 'react-bootstrap';

const StyledDatePicker = styled(DatePicker)`
  border: solid 1px #ccc;
  border-radius: 10px;
  height: 5.5vh;
  width: 95%;
`;

const StyledCreatable = styled(Creatable)`
  width: 75%;
`;

const ExpenseDetailPopup = ({ showPopup, expenseDetails, displayMode, onClose }) => {
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
    const splitGroupOptions = []

    const [splitExpenseData, setSplitExpenseData] = useState({ paidBy: null, splitOptions: null, splitGroup: [] })
    const handleSplitGroupInput = (splitGroup) => {
        const initialSplitGroup = splitExpenseData.splitGroup.map((item) => item.name);

        if (initialSplitGroup.length < splitGroup.length) {
            const newSplitGroup = splitGroup.filter(item => !initialSplitGroup.includes(item));
            const updatedSplitGroup = [...splitExpenseData.splitGroup, { name: newSplitGroup[0], amount: null }];

            setSplitExpenseData({ ...splitExpenseData, splitGroup: updatedSplitGroup });
        } else if (initialSplitGroup.length > splitGroup.length) {
            const deletedSplitGroup = initialSplitGroup.filter(item => !splitGroup.includes(item));
            const updatedSplitGroup = splitExpenseData.splitGroup.filter(item => item.name !== deletedSplitGroup[0]);

            setSplitExpenseData({ ...splitExpenseData, splitGroup: updatedSplitGroup });
        }
    };
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
            ...expenseData,
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

    const [isSplitExpense, setIsSplitExpense] = useState(false);
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
                    <StyledCreatable
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
                        type="text"
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
                        />
                    </div>
                </div>
                {isSplitExpense && (
                    <>
                        <div className='d-flex gap-2 my-2'>
                            <div className='align-self-center'>Paid By</div>
                            <Creatable
                                options={paidByOptions}
                                isClearable={true}
                                onChange={(inputValue) => setSplitExpenseData({ ...splitExpenseData, paidBy: inputValue ? inputValue.value : null })}
                                isDisabled={displayMode === 'view'}
                            />
                            <div className='align-self-center'>& Split</div>
                            <Select
                                options={splitOptions}
                                onChange={(inputValue) => setSplitExpenseData({ ...splitExpenseData, splitOptions: inputValue ? inputValue.value : null })}
                                isDisabled={displayMode === 'view'}
                            />

                        </div>

                        <div className='d-flex gap-2 my-2'>
                            <div className='align-self-center'>Split It Among</div>
                            <StyledCreatable
                                options={splitGroupOptions}
                                isClearable={true}
                                onChange={(inputValue) => handleSplitGroupInput(inputValue.map(item => item.value))}
                                isMulti={true}
                                formatCreateLabel={(inputValue) => `Add new Friend(s): ${inputValue}`}
                                isDisabled={displayMode === 'view'}
                            />
                        </div>
                        <Row>
                            {splitExpenseData.splitOptions === 'Unequally' && splitExpenseData.splitGroup.map((groupItem, index) => (
                                <Col key={index} className='d-flex gap-2 mt-2 justify-content-between' md={6}>
                                    <div className='align-self-center'>{groupItem.name}</div>
                                    <FormRow
                                        type='number'
                                        value={groupItem.amount}
                                        handleChange={(e) => {
                                            const updatedSplitGroup = [...splitExpenseData.splitGroup];
                                            updatedSplitGroup[index].amount = e.target.value
                                            setSplitExpenseData({ ...splitExpenseData, splitGroup: updatedSplitGroup })
                                        }}
                                        disabled={displayMode === 'view'}
                                        width='9vw'
                                    />
                                </Col>
                            ))}
                        </Row>

                    </>
                )}
            </Modal.Body>
            {
                displayMode !== 'view' && (
                    <Modal.Footer>
                        <Button className="btn btn-sm" variant="secondary" onClick={onClose}>
                            Close
                        </Button>
                        <Button className="btn btn-sm" variant="primary" onClick={handleSubmit}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                )
            }

        </Modal>
    )
}
export default ExpenseDetailPopup