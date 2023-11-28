import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import { BiDetail } from "react-icons/bi";
import styled from 'styled-components';
import moment from 'moment'
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setExpensesDetailPopup } from '../reducers/reducers.js'

const Section = styled.section`
font-family: Poppins, sans-serif;
.table{
  border-radius: 3rem; 
  font-weight: 500;
  font-size: 1.5vh;
  width: 70%;
  table-layout: fixed;
}

.icon{
  font-size: 2.2vh;
  margin-right: 0.75rem;
}
`;

const Tr = styled.tr`
  height: 5vh;
  `

const ExpenseTable = ({ date, items, totalExpense }) => {
  const dispatch = useDispatch()
  function showDetails() {
    dispatch(setExpensesDetailPopup())
  }

  if (items && items.length !== 0) {
    return (
      <>
        <Section>
          <h6>{moment(date).format("MMM Do, YYYY")} <Badge pill bg="dark">{moment(date).format("ddd")}</Badge></h6>
          <Table hover className="table rounded-3 overflow-hidden">
            <tbody>
              {items.map((item) => {
                return (
                  <Tr>
                    <th scope="row"><div className='icon'><Badge pill>{item.category}</Badge> &#x1F372;</div></th>
                    <td>{item.note}</td>
                    <td>RHB Credit Card</td>
                    <td>RM {item.amount}</td>
                    <td className='text-end'>
                      <BiDetail className="icon" onClick={()=> showDetails()} />
                      <MdDelete className="icon" />
                      <MdEdit className="icon" />
                    </td>
                  </Tr>)
              })}
              <Tr>
                <th scope="row"></th>
                <td></td>
                <td></td>
                <td>RM {totalExpense}</td>
                <td></td>
              </Tr>
            </tbody>
          </Table>
        </Section>
      </>
    )
  }
}
export default ExpenseTable