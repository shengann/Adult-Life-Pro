import styled from 'styled-components';

const SharedStyle = `
  width: 35vw;
  height: 4.5vh;
  background-color: #f6f6f6;
  color: #acacac;
  border: 1px solid;
`;

const Section = styled.section`
  .amount-input{
    height: 5.5vh;
    width: 30%;
    font-size: x-large;
    font-weight: bolder;
  }
  .payment-method-input {
    ${SharedStyle}
  }

  .datepicker {
    ${SharedStyle}
  }
  @media (min-width: 576px) {
    .payment-method-input {
      width: 25vw;
    }

    .datepicker {
      width: 25vw;
    }
  }
  @media (min-width: 768px) {
    .payment-method-input {
      width: 15vw;
    }

    .datepicker {
      width: 15vw;
    }
  }
`;

export default Section;