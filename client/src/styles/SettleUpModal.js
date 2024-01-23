import styled from 'styled-components';

const SharedStyle = `
  width: 12vw;
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
`;

export default Section;