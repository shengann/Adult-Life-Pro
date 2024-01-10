import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { useGetExpensesQuery } from '../slices/expenseSlice';
import { ExpenseTable } from '../components';
import ExpenseDetailPopup from '../components/ExpenseDetailPopup';
import { useState } from 'react';
import { IoAdd } from "react-icons/io5";

const Section = styled.section`
width: 75%;

@media (max-width: 768px) {
    width: 100%;
  }
`;


const Expenses = () => {
  const [showExpenseDetailPopup, setShowExpenseDetailPopup] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [displayMode, setDisplayMode] = useState(null);

  const handleShowDetails = (items, selectedDisplayMode) => {
    setSelectedItems(items);
    setDisplayMode(selectedDisplayMode)
    setShowExpenseDetailPopup(true);
  };

  const handleClosePopup = () => {
    setShowExpenseDetailPopup(false);
  };

  const { data: expenses } = useGetExpensesQuery()
  if (expenses && expenses.length !== 0) {
    return (
      <div>
        {showExpenseDetailPopup && selectedItems && (
          <ExpenseDetailPopup
            showPopup={showExpenseDetailPopup}
            expenseDetails={selectedItems}
            displayMode={displayMode}
            onClose={handleClosePopup}
          />
        )}
        <Container fluid className="d-flex flex-column align-items-center mt-3">
          <div className="d-flex justify-content-between w-75">
            <div></div>
            <div>Oct 2023</div>
            <button
              className="btn btn-primary btn-sm rounded-5"
              onClick={() => handleShowDetails([], 'add')}
            >
              <IoAdd />
            </button>
          </div>
          <Section>
              {expenses.map((expense) => {
                return <ExpenseTable
                  key={expense.date}
                  {...expense}
                  onShowDetails={handleShowDetails}
                />
              })}
          </Section>
        </Container>
      </div>

    )
  }
}
export default Expenses