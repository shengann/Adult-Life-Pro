import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { useGetExpensesQuery } from '../slices/expenseSlice';
import { ExpenseTable } from '../components';
import ExpenseDetailPopup from '../components/ExpenseDetailPopup';
import { useState } from 'react';

const Section = styled.section`
font-family: Poppins, sans-serif;
`;


const Expenses = () => {
  const [showExpenseDetailPopup, setShowExpenseDetailPopup] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);

  const handleShowDetails = (items) => {
    setSelectedItems(items);
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
            onClose={handleClosePopup}
          />
        )}
        <Section>
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