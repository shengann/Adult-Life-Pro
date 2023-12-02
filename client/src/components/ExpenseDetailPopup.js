import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormRow from "./FormRow"
import styled from 'styled-components';

const Section = styled.section`

`
const ExpenseDetailPopup = ({ showPopup, expenseDetails, onClose }) => {
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
                        value='sss'
                    />
                    <FormRow
                        type="text"
                        name="note"
                        labelText='Note'
                        value='sss'
                    />
                    <FormRow
                        type="text"
                        name="amount"
                        labelText='Amount'
                        value='sss'
                    />
                    <FormRow
                        type="text"
                        name="category"
                        labelText='category'
                        value='sss'
                    />
                    <FormRow
                        type="text"
                        name="account"
                        labelText='Account'
                        value='sss'
                    />
                    <FormRow
                        name="description"
                        labelText='Description'
                        type="text"
                        value='sss'
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