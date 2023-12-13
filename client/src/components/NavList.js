import { NavLink } from 'react-router-dom';
import { LuListTodo } from "react-icons/lu";
import { TbReportAnalytics } from "react-icons/tb";
import { BiMoney } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import styled from 'styled-components';

const StyledSection = styled.section`
    .navLink{
      min-width: 25vh;
      text-decoration: none;
    }
    
    .item{
      margin-bottom: 1vh;
      margin-left: 3vh;
    }

    .icon{
      color: #9ca3af;
      font-size: 3vh;
    }

    .title{
      color: black;
      font-size: 1.7vh;
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
          key={item.key}
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