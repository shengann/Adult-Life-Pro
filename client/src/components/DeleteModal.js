import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDeleteExpenseMutation } from '../slices/expenseSlice';

const DeleteModal = ({ showModal, id, onClose }) => {
    const [deleteExpense] = useDeleteExpenseMutation()

    const handleDelete = () => {
        deleteExpense(id)
            .then(() => onClose())
            .catch((error) => {
                console.error("Error deleting expense:", error);
            });
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
                <Modal.Body>Are you sure you want to delete this item? You will not be recover it.</Modal.Body>
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