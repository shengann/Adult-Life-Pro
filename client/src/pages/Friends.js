import { FriendsTable, FriendExpenseModal, SettleUpModal, FriendsCard } from '../components';
import { useGetReceivableQuery, useGetPayableQuery, useGetFriendsQuery } from '../slices/friendsSlice';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Friends = () => {
  const { data: receivable, refetch: refetchReceivable } = useGetReceivableQuery()
  const { data: payable, refetch: refetchPayable } = useGetPayableQuery()
  const { data: friends, refetch: refetchFriends } = useGetFriendsQuery()

  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showFriendExpenseModal, setShowFriendExpenseModal] = useState(false);
  const [settleUpFriend, setSettleUpFriend] = useState(null);
  const [showSettleUpFriendModal, setShowSettleUpFriendModal] = useState(false);

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

  const handleSettleUpModal = (friend) => {
    setSettleUpFriend(friend);
  };

  useEffect(() => {
    if (settleUpFriend !== null) {
      setShowSettleUpFriendModal(true);
    }
  }, [settleUpFriend]);

  const handleCloseSettleUpModal = () => {
    setShowSettleUpFriendModal(false);
    setSettleUpFriend(null);
    refetchReceivable();
    refetchPayable();
    refetchFriends();
  };

  return (
    <div>
      <div className="mt-3 mx-2">
        <div className="d-flex flex-column flex-sm-row justify-content-evenly">
          <FriendsTable
            data={payable}
            title={"You owe"}
            onShowDetails={handleFriendExpenseModal}
            onShowSettleUp={handleSettleUpModal}
          />
          <span className="d-none d-sm-block vr"></span>
          <FriendsTable
            data={receivable}
            title={"You are owed"}
            onShowDetails={handleFriendExpenseModal}
            onShowSettleUp={handleSettleUpModal}
          />
        </div>
        <Container className='mt-4'>
          <Row xs={2} sm={2} md={3} lg={4} xl={5} className='mb-4'>
            {
              friends && friends.map((friend,index) => {
                return (
                  <Col className='my-2' key={index}>
                    <FriendsCard
                      friend={friend}
                      onShowDetails={handleFriendExpenseModal}
                      onShowSettleUp={handleSettleUpModal}
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
      {
        settleUpFriend !== null &&
        < SettleUpModal
          showModal={showSettleUpFriendModal}
          friend={settleUpFriend}
          onClose={handleCloseSettleUpModal}
        />
      }
    </div>

  )
}
export default Friends