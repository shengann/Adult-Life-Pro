import NavList from "./NavList"
import styled from 'styled-components';

const StyledSection = styled.section`
  background:#ffffff;
  border-right: 1px solid #ddd;
  width: 15%;
  .icon {
    height: 20%;
    width: 20%;
  }
  .logo-text {
    font-family: 'Bradley Hand', cursive;
    color: gray;
    font-weight: lighter;
  }
  @media (max-width: 768px) {
    width: 25%;
  }
`;
const Sidebar = () => {
  return (
    <StyledSection>
      <div className="d-flex flex-column my-2 align-items-center">
        <img className="icon mt-2" src="/favicon.ico" alt="Icon" />
        <div className="logo-text">Adult Life Pro</div>
      </div>
      <NavList />
    </StyledSection>
  )
}
export default Sidebar