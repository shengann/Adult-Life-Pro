import moment from 'moment';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useAddCashFlowMutation } from '../slices/cashFlowsSlice';
import Section from '../styles/SettleUpModal';

const SettleUpModal = ({ showModal, friend, onClose }) => {
  const initialState = (friend.amount < 0) ? {
    amount: -friend.amount,
    source: friend.name,
    transferDestination: "Cash",
    date: new Date(),
  } :
    {
      amount: -friend.amount,
      source: "Cash",
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

  const [createCashFlow] = useAddCashFlowMutation()

  const handleSubmit = (e) => {
    createCashFlow({ ...settleUpData })
      .then(() => onClose())
      .catch((error) => {
        console.error("Error creating cash flow:", error);
      });
  }
  

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
              <div className="d-flex flex-column align-items-center gap-2">
                {
                  (settleUpData.amount < 0) ?
                    (
                      <div className='text-capitalize'>
                        You Paid <span className="text-warning">{settleUpData.transferDestination}</span>
                      </div>
                    ) :
                    (
                      <div className='text-capitalize '>
                        <span className='text-warning'>{settleUpData.source}</span> Paid You
                      </div>
                    )
                }
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
            }
          </Section>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-sm" variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button className="btn btn-sm" variant="success" onClick={handleSubmit}>
            Settle Up
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
export default SettleUpModal