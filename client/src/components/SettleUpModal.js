import moment from 'moment';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import DatePicker from "react-datepicker";
import styled from 'styled-components';

const SharedStyle = `
  width: 15vw;
  height: 4.5vh;
  background-color: #f6f6f6;
  color: #acacac;
  border: 1px solid;
`;

const Section = styled.section`
.amount-input{
  height: 5.5vh;
  width: 30%;
  font-size: x-large;
  font-weight: bolder;
}
.payment-method-input {
    ${SharedStyle}
  }

  .datepicker {
    ${SharedStyle}
  }
`;

const SettleUpModal = ({ showModal, friend, onClose }) => {
  const initialState = (friend.amount < 0) ? {
    amount: -friend.amount,
    source: friend.name,
    transferDestination: null,
    date: new Date(),
  } :
    {
      amount: -friend.amount,
      source: null,
      transferDestination: friend.name,
      date: new Date(),
    }

  const [settleUpData, setSettleUpData] = useState(initialState)
  const handleSettleUpInput = (e) => {
    const { name, value } = e.target;
    const isNumericInput = ['amount'].includes(name);
    setSettleUpData(() => ({
      ...settleUpData,
      [name]: isNumericInput ? parseFloat(value) || '' : value,
    }));

  };

  return (
    <div>
      <Modal
        show={showModal}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title className="fs-6">
            Settle Up
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Section>
            {
              settleUpData.amount < 0 ?
                (
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div className='text-capitalize'>
                      You Paid <span className="text-warning">{settleUpData.transferDestination}</span>
                    </div>
                    <div className='text-center'>
                      $ <input
                        className='rounded-1 amount-input'
                        onChange={handleSettleUpInput}
                        value={Math.abs(settleUpData.amount)}
                        name='amount'
                        type='number'
                      />
                    </div>
                    <div className='d-flex'>
                      <div className='d-flex gap-2'>
                        <DatePicker
                          value={settleUpData.date ? moment(settleUpData.date).format("D MMM YYYY") : null}
                          showIcon
                          className='rounded-4 datepicker'
                        />
                        <input className='rounded-4 payment-method-input' placeholder='Payment Method'></input>
                      </div>
                    </div>
                  </div>
                ) :
                (
                  <div className="d-flex flex-column align-items-center gap-2">
                    <div className='text-capitalize '>
                      <span className='text-warning'>{settleUpData.source}</span> Paid You
                    </div>
                    <div className='text-center'>
                      $ <input
                        className='rounded-1 amount-input'
                        onChange={handleSettleUpInput}
                        value={Math.abs(settleUpData.amount)}
                        name='amount'
                        type='number'
                      />
                    </div>
                    <div className='d-flex'>
                      <div className='d-flex gap-2'>
                        <DatePicker
                          value={settleUpData.date ? moment(settleUpData.date).format("D MMM YYYY") : null}
                          showIcon
                          className='rounded-4 datepicker'
                        />
                        <input className='rounded-4 payment-method-input' placeholder='Payment Method'></input>
                      </div>

                    </div>
                  </div>

                )
            }
          </Section>
        </Modal.Body>
      </Modal>
    </div>
  )
}
export default SettleUpModal