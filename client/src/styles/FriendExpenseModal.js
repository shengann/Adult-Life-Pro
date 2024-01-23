import styled from 'styled-components';

const Section = styled.section`
   .category-icon {
      font-size: x-large;
   }
   .primary {
      font-size: small;
   }
   .secondary {
      font-size: large;
   }
   .receivable-amount {
      color: #008080;
   }
   .payable-amount{
      color: #800020;
   }
   @media (min-width: 576px) {
    .personal-expense,
    .total-expense {
      width: 28%;
    }
  }

  @media (min-width: 992px) {
    .personal-expense,
    .total-expense {
      width: 20%;
  }
}  
`;

export default Section;