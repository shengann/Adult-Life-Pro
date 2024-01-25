import moment from 'moment';
import { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import { useAddCashFlowMutation } from '../slices/cashFlowsSlice';
import Section from '../styles/SettleUpModal';
import Alert from 'react-bootstrap/Alert';

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

  const [createCashFlow] = useAddCashFlowMutation()

  const handleSubmit = async (e) => {
    if (isTestUser) {
      await createCashFlow({ ...settleUpData })
      setIsShowAlert(true)
    } else {
      await createCashFlow({ ...settleUpData })
      onClose();
    }
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
                  (initialState.amount < 0) ?
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
          {
            isShowAlert && (
              <Alert key='warning' variant='danger' dismissible transition className='mt-2'>
                Demo Website. Read Only!
              </Alert>
            )

          }
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