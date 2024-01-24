import styled from 'styled-components';

const Section = styled.section`
    .navLink{
      width: 15vw;
      text-decoration: none;
    }
    
    .item{
      width: 15vw;
    }

    .icon{
      color: black;
      font-size: x-large;
    }

    .title{
      color: #36454F	;
      font-size: x-small;
      font-weight: lighter;
    }
    .active .item {
      background-color: #dde0e5;
      border: 1px solid #ccc; 
      border-radius: 15px;
    }
    @media (min-width: 576px) {
      .item{
        width: 90%;
        margin-bottom: 1vh;
      }
      .icon{
        margin-left: 0.25rem;
      }
      .title{
        font-size: small;
      }
      .active .item {
        border-radius: 30px;
      }
    }

`;

export default Section;