import { Table, Badge } from 'react-bootstrap';
import { BiDetail } from "react-icons/bi";
import moment from 'moment'
import { MdDelete, MdEdit } from "react-icons/md";
import Icon from "./Icon"
import Section from '../styles/ExpenseTable';

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
                      <td><div className='icon mr-1'><Badge pill bg="info" className='category'>{item.category}</Badge> <Icon category={item.category} /></div></td>
                      <td>{item.note}</td>
                      <td className='d-none d-sm-table-cell'>Cash</td>
                      <td>$ {item.personalExpense.toFixed(2)}</td>
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
                  <td className='d-none d-sm-table-cell'></td>
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