import styled from 'styled-components';

const Section = styled.section`
    .amount{
        color:  ${props => props.payable ? '#800020' : '#008080'}; 
    }
    .border{
        height: ${props => props.isamountzero ? '42vh' : '42vh'};           
        width: 42vw;
    }
    .expense-btn {
        margin-top:${props => props.isamountzero ? '1.5em' : '0'}; 
    }
    .icon{
        font-size: 15vh;
    }
    .btn{
        font-size: smaller;
    }
    .text-body-secondary{
        font-size: smaller;
    }
    .amount{
        font-size: medium;  
    }

    //sm for boostrap
    @media (min-width: 576px) and (max-width: 768px) {
        .border{
            width: 30vw;
        }
    }

    @media (min-width: 768px) {
        .border{
            width: 15vw;
        }
    }
`;

export default Section