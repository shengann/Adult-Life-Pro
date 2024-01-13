import { FriendsTable, FriendExpenseModal } from '../components';
import FriendsCard from '../components/FriendsCard';
import { useGetReceivableQuery, useGetPayableQuery, useGetFriendsQuery } from '../slices/friendsSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';

const Friends = () => {
  const { data: receivable } = useGetReceivableQuery()
  const { data: payable } = useGetPayableQuery()
  const { data: friends } = useGetFriendsQuery()

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showFriendExpenseModal, setShowFriendExpenseModal] = useState(false);

  const handleFriendExpenseModal = (friend) => {
    setSelectedFriend(friend);
  };

  useEffect(() => {
    if (selectedFriend !== null) {
      setShowFriendExpenseModal(true);
    }
  }, [selectedFriend]);

  const handleClosePopup = () => {
    setShowFriendExpenseModal(false);
    setSelectedFriend(null);
  };

  return (
    <div>
      <div className="mt-2 mx-2">
        <div className="d-flex flex-column flex-sm-row justify-content-evenly">
          <FriendsTable tableId="payable" data={payable} title={"You owe"} />
          <span class="d-none d-sm-block vr"></span>
          <FriendsTable tableId="receivable" data={receivable} title={"you are owed"} />
        </div>
        <Container className='mt-4'>
          <Row xs={2} sm={2} md={3} lg={4} xl={5} className='mb-4'>
            {
              friends && friends.map((friend) => {
                return (
                  <Col className='my-2'>
                    <FriendsCard
                      friend={friend}
                      onShowDetails={handleFriendExpenseModal}
                    />
                  </Col>
                )
              })
            }
          </Row>
        </Container>
      </div>
      {
        selectedFriend !== null &&
        < FriendExpenseModal
          showModal={showFriendExpenseModal}
          friend={selectedFriend}
          onClose={handleClosePopup}
        />
      }
    </div>

  )
}
export default Friends