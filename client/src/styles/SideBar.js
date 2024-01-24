import styled from 'styled-components';

const Section = styled.section`
  background:#ffffff;
  border-right: 1px solid #ddd;
  width: 15vw;
  .icon {
    height: 50%;
    width: 50%;
  }
  .logo-text {
    color: gray;
    font-weight: lighter;
    font-size: xx-small;
    margin-top: 0.25rem;
  }
  @media (min-width: 576px) {
    .icon{
      height: 20%;
      width: 20%;
    }
    .logo-text{
      font-family: 'Bradley Hand', cursive;
      font-size: medium;
    }
  }
  @media (min-width: 576px) {
    .icon{
      height: 20%;
      width: 20%;
    }
    .logo-text{
      font-family: 'Bradley Hand', cursive;
      font-size: medium;
    }
  }
`;

export default Section;