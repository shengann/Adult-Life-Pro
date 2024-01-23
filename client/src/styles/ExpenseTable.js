import styled from 'styled-components';

const Section = styled.section`
  .table{
    font-size: small;
    table-layout: fixed;
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

`;

export default Section