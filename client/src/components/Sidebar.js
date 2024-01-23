import NavList from "./NavList"
import Section from "../styles/SideBar"

const Sidebar = () => {
  return (
    <Section>
      <div className="d-flex flex-column my-2 align-items-center">
        <img className="icon mt-2" src="/favicon.ico" alt="Icon" />
        <div className="logo-text">Adult Life Pro</div>
      </div>
      <NavList />
    </Section>
  )
}
export default Sidebar