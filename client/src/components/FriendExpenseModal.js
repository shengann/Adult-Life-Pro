import Modal from 'react-bootstrap/Modal';
import { useGetFriendDetailsQuery } from '../slices/friendsSlice';
import moment from 'moment';
import Icon from './Icon'
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
   .receivable-amount {
      color: #008080;
   }
   .payable-amount{
      color: #800020;
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

  const checkIsOwnAcc = (paymentMethod) => {
    const ownAccList = ['Cash']
    const foundObject = ownAccList.find(item => item === paymentMethod);
    return foundObject;
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
                      <div className="me-1 my-2 d-flex flex-column">
                        <div className='month'>{moment(detail.date).format("MMM")}</div>
                        <div className="day align-self-center">{moment(detail.date).format("D")}</div>
                      </div>
                      {
                        detail.category && (
                          <div className="me-1 my-2 align-self-center category-icon"><Icon category={detail.category}/></div>
                        )
                      }
                      {
                        detail.category && (
                          <div className="me-auto my-2 align-self-center">{detail.note}</div>
                        )
                      }
                      {
                        detail.category && (
                          <div className="me-1 my-2 d-flex flex-column total-expense">
                            <div className='primary align-self-center text-secondary text-capitalize'>{detail.paidBy} paid</div>
                            <div className="secondary align-self-center">${detail.amount}</div>
                          </div>)
                      }
                      {
                        detail.category && (detail.paidBy === 'You' ? (
                          <div className="me-1 my-2 d-flex flex-column personal-expense">
                            <div className='primary align-self-center text-secondary text-capitalize'>{friend.name} owe {detail.paidBy}</div>
                            <div className="secondary align-self-center receivable-amount">${getAmountByName(friend.name, detail.splitGroup)}</div>
                          </div>
                        ) : (
                          <div className="me-1 my-2 d-flex flex-column personal-expense">
                            <div className='primary align-self-center text-secondary text-capitalize'>You owe {detail.paidBy}</div>
                            <div className="secondary align-self-center payable-amount">${detail.personalExpense}</div>
                          </div>
                        ))
                      }
                      {
                        detail.source && (
                          <div className="me-1 my-2 align-self-center category-icon">&#x1f4b5;</div>
                        )
                      }
                      {
                        detail.source && (
                          <div className="me-auto my-2 align-self-center">{checkIsOwnAcc(detail.source) ? 'You' : detail.source} Paid ${Math.abs(detail.amount)} To {checkIsOwnAcc(detail.transferDestination) ? 'You' : detail.transferDestination}</div>
                        )
                      }
                      {
                        detail.source && (detail.amount > 0 ? (
                          <div className="me-1 my-2 d-flex flex-column personal-expense">
                            <div className='primary align-self-center text-secondary text-capitalize'>{detail.transferDestination}</div>
                            <div className="secondary align-self-center receivable-amount">+${Math.abs(detail.amount)}</div>
                          </div>
                        ) : (
                          <div className="me-1 my-2 d-flex flex-column personal-expense">
                            <div className='primary align-self-center text-secondary text-capitalize'>{detail.source}</div>
                            <div className="secondary align-self-center payable-amount">-${Math.abs(detail.amount)}</div>
                          </div>
                        ))
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