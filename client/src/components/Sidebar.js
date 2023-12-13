import NavList from "./NavList"
import styled from 'styled-components';

const StyledSection = styled.section`
    background:#ffffff;
    border-right: 1px solid #ddd;
    width: 12.5%;

    @media (max-width: 768px) {
    width: 25%;

  }
`;
const Sidebar = () => {
  return (
    <StyledSection>
      <div className="gap-5">Logo</div>
      <NavList/>
    </StyledSection>
  )
}
export default Sidebar