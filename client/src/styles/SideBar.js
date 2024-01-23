import styled from 'styled-components';

const Section = styled.section`
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

export default Section;