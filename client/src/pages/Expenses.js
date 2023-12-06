import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { useGetExpensesQuery } from '../slices/expenseSlice';
import { ExpenseTable } from '../components';
import ExpenseDetailPopup from '../components/ExpenseDetailPopup';
import { useState } from 'react';

const Section = styled.section`
font-family: Poppins, sans-serif;
width: 70%;
`;


const Expenses = () => {
  const [showExpenseDetailPopup, setShowExpenseDetailPopup] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);
  const [displayMode, setDisplayMode] = useState(null);

  const handleShowDetails = (items,selectedDisplayMode) => {
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
        <Section>
          <div className="text-end mx-2">
            <button className="btn btn-primary btn-sm">Add Expense</button>
          </div>
          <Container fluid>
            {expenses.map((expense) => {
              return <ExpenseTable
                key={expense.date}
                {...expense}
                onShowDetails={handleShowDetails}
              />
            })}
          </Container>
        </Section>
      </div>

    )
  }
}
export default Expenses