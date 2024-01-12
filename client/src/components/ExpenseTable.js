import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { BiDetail } from "react-icons/bi";
import styled from 'styled-components';
import moment from 'moment'
import { MdDelete, MdEdit } from "react-icons/md";

const Section = styled.section`
font-family: Poppins, sans-serif;
.table{
  font-weight: 500;
  font-size: 1.5vh;
  table-layout: fixed;
}

.icon{
  font-size: 2.2vh;
  margin-right: 0.3rem;
}

 @media (max-width: 768px) {
    .icon {
      font-size: 0.65rem; 
    }

    td {
      font-size: 0.7rem; 
    }

  }
`;

const Tr = styled.tr`
  height: 5vh;
  `

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
                    <Tr key={index}>
                      <td><div className='icon'><Badge pill bg="info" >{item.category}</Badge> &#x1F372;</div></td>
                      <td>{item.note}</td>
                      <td>RHB Credit Card</td>
                      <td>$ {item.amount}</td>
                      <td className='text-end'>
                        <BiDetail className="icon" onClick={() => onShowDetails(item, 'view')} />
                        <MdDelete className="icon" onClick={() => onShowDeleteModal(item)} />
                        <MdEdit className="icon" onClick={() => onShowDetails(item, 'edit')} />
                      </td>
                    </Tr>)
                })}
                <Tr>
                  <th scope="row"></th>
                  <td></td>
                  <td></td>
                  <td>$ {totalExpense}</td>
                  <td></td>
                </Tr>
              </tbody>
            </Table>
          </div>
        </Section>
      </>
    )
  }
}
export default ExpenseTable