import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import { setExpensesDetailPopup } from '../reducers/reducers.js'
import { useDispatch } from "react-redux";
import styled from 'styled-components';


const ExpenseDetailPopup = () => {

    const showExpenseDetailPopup = useSelector(state => state.root.showExpenseDetailPopup)
    const dispatch = useDispatch()

    function handleClose() {
        dispatch(setExpensesDetailPopup())
    }


    return (
        <>
            <Modal
                show={showExpenseDetailPopup}
                onHide={handleClose}
                centered
                keyboard
                backdrop={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ExpenseDetailPopup