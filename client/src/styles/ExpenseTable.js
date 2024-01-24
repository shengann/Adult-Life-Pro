import styled from 'styled-components';

const Section = styled.section`
  .table{
    font-size: small;
    table-layout: fixed;
  }
  .category{
    font-size: xx-small;
  }

  .icon{
    font-size: medium;
  }
  .btn-icon{
    color: black;
  }
  .btn:hover {
    background-color: gray;
    border-color: white;
    .btn-icon {
      color: white;
    }
  }
  tr{
    height:5vh;
  }
  @media (min-width: 576px) {
    .category{
      font-size: small;
    }
  }

`;

export default Section