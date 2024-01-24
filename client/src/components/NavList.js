import { NavLink } from 'react-router-dom';
import { BiMoney } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import Section from '../styles/NavList';
import { Row, Col } from 'react-bootstrap';


const NavList = () => {
  const Lists = [
    // { key: 1, title: 'Home', path: '/home', icon: <AiOutlineHome /> },
    { key: 2, title: 'Expense', path: '/expenses', icon: <BiMoney /> },
    { key: 4, title: 'Friend', path: '/friends', icon: <FaUserFriends /> },

  ]
  return (
    <Section>
      {Lists.map((item) => {
        const { path, icon, title } = item
        return (
          <NavLink
            key={item.key}
            to={path}
            className="d-flex flex-column navLink align-items-center"
          >
            <Row xs={1} sm={2} md={2} lg={2} xl={2} className="item mb-2">
              <Col className='icon align-self-center '>{icon}</Col>
              <Col className='title align-self-center'>{title}</Col>
            </Row>
          </NavLink>)
      })}
    </Section>

  )
}
export default NavList