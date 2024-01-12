import Modal from 'react-bootstrap/Modal';

const FriendExpenseModal = ({ showModal, friendDetails, onClose }) => {
  return (
    <div>
      <Modal
        size="lg"
        show={showModal}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{friendDetails && friendDetails._id}</Modal.Body>
      </Modal>
    </div>
  )
}
export default FriendExpenseModal