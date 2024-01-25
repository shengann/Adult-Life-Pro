import {Button,Modal} from 'react-bootstrap';
import { useDeleteExpenseMutation } from '../slices/expenseSlice';
import { useEffect, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const DeleteModal = ({ showModal, id, onClose }) => {
    const isTestUser = process.env.REACT_APP_IS_TEST_USER;
    const [isShowAlert, setIsShowAlert] = useState(false)

    useEffect(() => {
        if (isShowAlert) {
            const timer = setTimeout(() => {
                setIsShowAlert(false);
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isShowAlert]);
    const [deleteExpense] = useDeleteExpenseMutation()

    const handleDelete = async () => {
        if (isTestUser) {
            await deleteExpense(id);
            setIsShowAlert(true)
        } else {
            await deleteExpense(id);
            onClose();
        }
    }

    return (
        <>
            <Modal
                show={showModal}
                onHide={onClose}
                centered
                keyboard
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this item? You will not be recover it.
                    {
                        isShowAlert && (
                            <Alert key='warning' variant='danger' dismissible transition>
                                Demo Website. Read Only!
                            </Alert>
                        )

                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary btn-sm" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="primary btn-sm" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default DeleteModal