import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { useGetExpensesQuery } from '../reducers/expenseSlice';
import { ExpenseTable } from '../components';
import ExpenseDetailPopup from '../components/ExpenseDetailPopup';

const Section = styled.section`
font-family: Poppins, sans-serif;
`;


const Expenses = () => {
  const {data : expenses}  = useGetExpensesQuery()
  if (expenses && expenses.length !== 0) {
    return (
      <Section>
        <Container fluid>
          {expenses.map((expense) => {
            return <ExpenseTable key={expense.date}{...expense} />
          })}
        </Container>
        <ExpenseDetailPopup />
      </Section>
    )
  }
}
export default Expenses