import { NavLink } from 'react-router-dom';
import { LuListTodo } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import styled from 'styled-components';

const StyledSection = styled.section`
    .navLink{
      min-width: 250px;
      max-width: 250px;
      text-decoration: none;
    }
    
    
    .item{
      color: black;
      margin-bottom: 10px;
      font-size: 18px;
      margin-left: 25px;
      height: 35px;
    }

`;

const NavList = () => {
  const Lists = [
    { key: 1, title: 'Home', path: '/', icon: <AiOutlineHome /> },
    { key: 2, title: 'Expenses', path: '/expenses', icon: <TbReportAnalytics /> },
    { key: 3, title: 'Financial Report', path: '/financial-report', icon: <LuListTodo /> },
    { key: 4, title: 'To-do', path: '/to-do', icon: <BiMoney /> },

  ]
  return (
    <StyledSection>
      {Lists.map((item) => {
        const { path, icon, title } = item
        return (
          <NavLink
            to={path}
            className="d-flex flex-column navLink"
          >
            <div className="item">
              <span className='icon'>{icon}</span>
              <span className='title'>{title}</span>
            </div>
          </NavLink>)
      })}
    </StyledSection>

  )
}
export default NavList