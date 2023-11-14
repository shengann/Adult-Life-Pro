import { NavLink } from 'react-router-dom';
import { LuListTodo } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import styled from 'styled-components';

const StyledNavLink = styled(NavLink)`
    min-width: 250px;
    max-width: 250px;
    background:#36454F;
    text-decoration: none;
    
    .icon {
      margin-left: 10px;
      color:  #FFFFFF;
    }
    .title {
      font-size: 15px;
      color: #FFFFFF;
      text-decoration: none; 
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
    <>
      {Lists.map((item) => {
        const { path, icon, title } = item
        return (
          <StyledNavLink
            to={path}
            className="d-flex flex-column"
          >
            <div>
              <span className='icon'>{icon}</span>
              <span className='title'>{title}</span>
            </div>
          </StyledNavLink>)
      })}
    </>

  )
}
export default NavList