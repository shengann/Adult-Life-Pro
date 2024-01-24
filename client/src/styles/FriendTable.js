import styled from 'styled-components';

const Section = styled.section` 
  margin-left: 1.5em;
  width: 90%;

  .amount{
    color:  ${props => props.payable ? '#FF5555' : '#00AAAA'};
    font-size: large;
    margin-right: 0.5rem;
  }
  .total-amount{
    background-color: #333333 ;
    color: #FFD700;
    font-size: small;
    height: 5vh;
    width: 75%;
  }
  .icon{
    color: gray;
  }

  .btn:hover {
    background-color: gray;
    border-color: white;

    .icon {
      color: white;
    }
  }
  //sm for boostrap
  @media (min-width: 576px) and (max-width: 768px) {
    width: 45%;
    margin-left: 0;
    .total-amount{
      font-size: small;
      height: 6vh;
      width: 75%;
    }
    .amount{
      font-size: medium;
      margin-right: 0.5rem;
    }
  }

  @media (min-width: 768px) {
    width: 45%;
    margin-left: 0;
    .total-amount{
      font-size: medium;
      height: 6vh;
      width: 50%;
    }
    .amount{
      margin-right: 1.5rem;
    }
  }
`

export default Section;