import Modal from 'react-bootstrap/Modal';
import { useGetFriendDetailsQuery } from '../slices/friendsSlice';
import moment from 'moment';

import styled from 'styled-components';
import groupFriendExpenseDetails from '../utils/groupFriendExpenseDetails';
import { useEffect, useState } from 'react';

const Section = styled.section`
   .category-icon {
      font-size: x-large;
   }
   .primary {
      font-size: small;
   }
   .secondary {
      font-size: large;
   }
   .personal-expense-amount {
      color: #008080;
   }
   @media (min-width: 576px) {
    .personal-expense,
    .total-expense {
      width: 28%;
    }
  }

  @media (min-width: 992px) {
    .personal-expense,
    .total-expense {
      width: 20%;
  }
}
   
`;

const Payable = styled.div`
   color: #800020;
`;

const FriendExpenseModal = ({ showModal, friend, onClose }) => {
  const [groupedFriendDetailsDetails, setGroupedFriendDetailsDetails] = useState(null)
  const { data: friendDetails } = useGetFriendDetailsQuery(friend._id);

  useEffect(() => {
    if (friendDetails) {
      const groupedDetails = groupFriendExpenseDetails(friendDetails);
      setGroupedFriendDetailsDetails(groupedDetails)
    }
  }, [friendDetails]);

  const getAmountByName = (nameToFind, splitGroup) => {
    const foundObject = splitGroup.find(item => item.name === nameToFind);
    return foundObject ? foundObject.amount : null;
  };

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
          {groupedFriendDetailsDetails && groupedFriendDetailsDetails.map((item, index) => {
            return (
              <div>
                <div key={index} className="border bg-secondary-subtle rounded-2"><div className='m-1'>{item.date}</div></div>

                {item.items.map((detail, innerIndex) => {
                  return (
                    <Section key={innerIndex} className='d-flex border-bottom'>
                      <div class="me-1 my-2 d-flex flex-column">
                        <div className='month'>{moment(detail.date).format("MMM")}</div>
                        <div className="day align-self-center">{moment(detail.date).format("D")}</div>
                      </div>
                      <div class="me-1 my-2 align-self-center category-icon">&#x1F372;</div>
                      <div class="me-auto my-2 align-self-center">{detail.note}</div>
                      <div class="me-1 my-2 d-flex flex-column total-expense">
                        <div className='primary align-self-center text-secondary text-capitalize'>{detail.paidBy} paid</div>
                        <div className="secondary align-self-center">${detail.amount}</div>
                      </div>
                      {
                        detail.paidBy === 'You' ? (
                          <div className="me-1 my-2 d-flex flex-column personal-expense">
                            <div className='primary align-self-center text-secondary text-capitalize'>{friend.name} owe {detail.paidBy}</div>
                            <div className="secondary align-self-center personal-expense-amount">${getAmountByName(friend.name, detail.splitGroup)}</div>
                          </div>
                        ) : (
                          <div class="me-1 my-2 d-flex flex-column personal-expense">
                            <div className='primary align-self-center text-secondary text-capitalize'>You owe {detail.paidBy}</div>
                            <Payable className="secondary align-self-center">${detail.personalExpense}</Payable>
                          </div>
                        )
                      }
                    </Section>
                  )
                })
                }

              </div>
            )
          })}
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default FriendExpenseModal