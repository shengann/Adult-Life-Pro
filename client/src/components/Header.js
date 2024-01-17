import styled from 'styled-components';
import { FiAlignLeft } from "react-icons/fi";

const Section = styled.section`
    background:#ffffff;
    height: 6vh;
    .sidebar-button{
      font-size: x-large;
      background-color: #ffffff;
    }
`;

const Header = ({ handleShowSidebar }) => {
  return (
    <Section>
      <div className="d-flex justify-content-between">
        <button 
          className="sidebar-button border-0 align-self-center"
          onClick={handleShowSidebar}
        >
          <FiAlignLeft />
        </button>
        <div>justify-content-between</div>

      </div>
    </Section>
  )
}
export default Header