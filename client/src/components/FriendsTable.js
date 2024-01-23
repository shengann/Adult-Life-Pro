import Table from 'react-bootstrap/Table';
import { RxAvatar } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { BiDetail } from "react-icons/bi";
import React from 'react';
import { computeTotal } from "../utils";
import Section from '../styles/FriendTable';

const FriendsTable = ({ data, title, onShowDetails, onShowSettleUp }) => {
  const totalAmount = (data) ? computeTotal(data) : null
  return (
    <Section payable={totalAmount > 0}>
      <div className="border rounded-3 mb-3 total-amount w-50 d-flex align-items-center">
        <span className="ms-2">{title} :</span>
        <span className='ms-auto amount'>${Math.abs(totalAmount)}</span>
      </div>
      <Table className="table rounded-3 overflow-hidden table-responsive">
        <tbody>
          {data && data.length > 0 && data.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td><span className="fs-5 me-3"><RxAvatar /></span>{item.name}</td>
                  <td>$ {Math.abs(item.amount)}</td>
                  <td className="text-end">
                    <button
                      className='btn btn-sm btn-outline-secondary rounded-2 '
                      onClick={() => onShowDetails(item)}
                    >
                      <BiDetail className="icon" size={20} />
                    </button>
                    <button
                      className='btn btn-sm btn-outline-secondary rounded-2 mx-1'
                      onClick={() => onShowSettleUp(item)}
                    >
                      <TiTick className="icon" size={20} />
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            )
          })
          }
        </tbody>
      </Table>
    </Section>

  )
}
export default FriendsTable