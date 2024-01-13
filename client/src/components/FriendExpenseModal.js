import Modal from 'react-bootstrap/Modal';
import { useGetFriendDetailsQuery } from '../slices/friendsSlice';

const FriendExpenseModal = ({ showModal, friend, onClose }) => {
  const { data: friendDetails } = useGetFriendDetailsQuery(friend._id);

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
        <Modal.Body>
          <div>
            {friendDetails && friendDetails.map((item, index) => {
              return (
                <div key={index}>{item.paidBy}</div>
              )
            })}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default FriendExpenseModal