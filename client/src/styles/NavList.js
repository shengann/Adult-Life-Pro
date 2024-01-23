import styled from 'styled-components';

const Section = styled.section`
    .navLink{
      min-width: 25vh;
      text-decoration: none;
    }
    
    .item{
      margin-bottom: 1vh;
      margin-left: 3vh;
    }

    .icon{
      color: black;
      font-size: 3.5vh;
    }

    .title{
      color: #36454F	;
      font-size: small;
      font-weight: lighter;
    }
    .active .item {
      background-color: #dde0e5;
      border: 1px solid #ccc; 
      border-radius: 30px;
    }

`;

export default Section;