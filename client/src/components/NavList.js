import { NavLink } from 'react-router-dom';
import { BiMoney } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
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
      color: black;
      font-size: 3.5vh;
    }

    .title{
      color: #36454F	;
      font-size: medium;
      font-weight: lighter;
    }
    .active .item {
      background-color: #dde0e5;
      border: 1px solid #ccc; 
      border-radius: 30px;
    }

`;

const NavList = () => {
  const Lists = [
    { key: 1, title: 'Home', path: '/', icon: <AiOutlineHome /> },
    { key: 2, title: 'Expenses', path: '/expenses', icon: <BiMoney /> },
    { key: 4, title: 'Friends', path: '/friends', icon: <FaUserFriends /> },

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
            <div className="item ms-3 me-2">
              <span className='icon ms-3'>{icon}</span>
              <span className='title ms-2'>{title}</span>
            </div>
          </NavLink>)
      })}
    </StyledSection>

  )
}
export default NavList