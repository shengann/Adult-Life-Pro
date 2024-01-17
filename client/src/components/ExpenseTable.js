import { Table, Badge } from 'react-bootstrap';
import { BiDetail } from "react-icons/bi";
import styled from 'styled-components';
import moment from 'moment'
import { MdDelete, MdEdit } from "react-icons/md";

const Section = styled.section`
  .table{
    font-size: small;
    table-layout: fixed;
  }

  .icon{
    font-size: medium;
  }
  .btn-icon{
      color: black;
  }
  .btn:hover {
    background-color: gray;
    border-color: white;
    .btn-icon {
      color: white;
    }
  }
  tr{
    height:5vh;
  }

`;

const ExpenseTable = ({ date, items, totalExpense, onShowDetails, onShowDeleteModal }) => {

  if (items && items.length !== 0) {
    return (
      <>
        <Section>
          <h6>{moment(date).format("MMM Do, YYYY")} <Badge pill bg="dark">{moment(date).format("ddd")}</Badge></h6>
          <div className="table-responsive">
            <Table hover className="table rounded-3 overflow-hidden">
              <tbody>
                {items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td><div className='icon mr-1'><Badge pill bg="info" >{item.category}</Badge> &#x1F372;</div></td>
                      <td>{item.note}</td>
                      <td>RHB Credit Card</td>
                      <td>$ {item.amount}</td>
                      <td className='text-end'>
                        <button
                          className='btn btn-sm btn-outline-secondary rounded-2'
                          onClick={() => onShowDetails(item, 'view')}
                        >
                          <BiDetail className='btn-icon' />
                        </button>
                        <button
                          className='btn btn-sm btn-outline-secondary rounded-2 mx-1'
                          onClick={() => onShowDeleteModal(item)}
                        >
                          <MdDelete className='btn-icon' />
                        </button>
                        <button
                          className='btn btn-sm btn-outline-secondary rounded-2'
                          onClick={() => onShowDetails(item, 'edit')}
                        >
                          <MdEdit className='btn-icon' />
                        </button>
                      </td>
                    </tr>)
                })}
                <tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td>$ {totalExpense}</td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Section>
      </>
    )
  }
}
export default ExpenseTable