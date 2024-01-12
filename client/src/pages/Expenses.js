import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { useGetExpensesQuery } from '../slices/expenseSlice';
import { DeleteModal, ExpenseTable } from '../components';
import ExpenseDetailModal from '../components/ExpenseDetailModal';
import { useState } from 'react';
import { IoAdd } from "react-icons/io5";

const Section = styled.section`
width: 75%;

@media (max-width: 768px) {
    width: 100%;
  }
`;


const Expenses = () => {
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

  const { data: expenses } = useGetExpensesQuery()
  if (expenses && expenses.length !== 0) {
    return (
      <div>
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
                onShowDeleteModal={handleShowDeleteModal}
              />
            })}
          </Section>
        </Container>
      </div>

    )
  }
}
export default Expenses