import { NavLink } from 'react-router-dom';
import { BiMoney } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import Section from '../styles/NavList';

const NavList = () => {
  const Lists = [
    // { key: 1, title: 'Home', path: '/home', icon: <AiOutlineHome /> },
    { key: 2, title: 'Expenses', path: '/expenses', icon: <BiMoney /> },
    { key: 4, title: 'Friends', path: '/friends', icon: <FaUserFriends /> },

  ]
  return (
    <Section>
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
    </Section>

  )
}
export default NavList