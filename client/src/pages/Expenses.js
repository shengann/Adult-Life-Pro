import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { useGetExpensesQuery } from '../slices/expenseSlice';
import { DeleteModal, ExpenseTable, ExpenseDetailModal } from '../components';
import { useState } from 'react';
import { IoAdd } from "react-icons/io5";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Section = styled.section`
  .expense-table{
    width: 75%;
  }
  @media (max-width: 768px) {
    .expense-table {
      width: 100%; /* Adjust this width as needed */
    }
  }
  .right-icon {
    position: relative;
     left: -115px;
  }
  .left-right-icon {
    background-color: #f3f6fc;
  }
`;


const Expenses = () => {
  const [expenseMonthYear, setExpenseMonthYear] = useState(new Date())
  const [showExpenseDetailModal, setShowExpenseDetailModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [displayMode, setDisplayMode] = useState(null);

  const handleShowDetails = (items, selectedDisplayMode) => {
    setSelectedItems(items);
    setDisplayMode(selectedDisplayMode)
    setShowExpenseDetailModal(true);
  };

  const handleClosePopup = () => {
    setShowExpenseDetailModal(false);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleShowDeleteModal = (items) => {
    setSelectedItems(items);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleMonthChange = (direction) => {
    let newDate = new Date(expenseMonthYear);

    if (direction === 'left') {
      if (newDate.getMonth() === 0) {
        newDate.setMonth(11);
        newDate.setFullYear(expenseMonthYear.getFullYear() - 1);
      } else {
        newDate.setMonth(newDate.getMonth() - 1);
      }
    } else if (direction === 'right') {
      if (newDate.getMonth() === 11) {
        newDate.setMonth(0);
        newDate.setFullYear(expenseMonthYear.getFullYear() + 1);
      } else {
        newDate.setMonth(newDate.getMonth() + 1);
      }
    }

    setExpenseMonthYear(newDate);
  };

  const { data: expenses } = useGetExpensesQuery({
    query: { date: expenseMonthYear.toISOString() },
  });
  return (
    <Section>
      {showExpenseDetailModal && selectedItems && (
        <ExpenseDetailModal
          showPopup={showExpenseDetailModal}
          expenseDetails={selectedItems}
          displayMode={displayMode}
          onClose={handleClosePopup}
        />
      )}
      {showDeleteModal && selectedItems && (
        <DeleteModal
          showModal={showDeleteModal}
          id={selectedItems._id}
          onClose={handleCloseDeleteModal}
        />
      )}
      <Container className="d-flex flex-column align-items-center mt-3">
        <div className="d-flex justify-content-between w-75">
          <div></div>
          <div>
            <button className="border-0 left-right-icon" onClick={() => handleMonthChange("left")}>
              <FiChevronLeft />
            </button>
            <DatePicker
              className='border-0 w-50 rounded-3 bg-dark-subtle'
              wrapperClassName='datetime-picker'
              dateFormat="MMM yyyy"
              portalId="root-portal"
              showMonthYearPicker
              showIcon
              value={expenseMonthYear ? moment(expenseMonthYear).format("MMM yyyy") : null}
              onChange={(date) => setExpenseMonthYear(date)}
            />
            <button className="border-0 right-icon left-right-icon" onClick={() => handleMonthChange("right")}>
              <FiChevronRight />
            </button>
          </div>

          <button
            className="btn btn-primary btn-sm rounded-5"
            onClick={() => handleShowDetails([], 'add')}
          >
            <IoAdd />
          </button>
        </div>
        <div className="expense-table">
          {expenses && expenses.map((expense) => {
            return <ExpenseTable
              key={expense.date}
              {...expense}
              onShowDetails={handleShowDetails}
              onShowDeleteModal={handleShowDeleteModal}
            />
          })}
        </div>
      </Container>
    </Section>

  )

}
export default Expenses