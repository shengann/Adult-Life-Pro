import Table from 'react-bootstrap/Table';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import { BiDetail } from "react-icons/bi";
const Section = styled.section`
font-family: Poppins, sans-serif;
.table{
  width:130vh;
  border-radius: 3rem; 
  font-weight: 500;
  font-size: 1.5vh;
}

.icon{
  font-size: 2vh;

}
`;

const Tr = styled.tr`
  height: 5vh;

  `

const Expenses = () => {
  return (
    <Section>
      <Container fluid>
        <div>Expenses</div>
        <h3 style={{ display: 'inline-block' }}>Today</h3><p style={{ display: 'inline-block', marginLeft: '1rem' }}>Nov 18 2023</p> <Badge pill bg="dark">Sat</Badge>
        <Table hover className="table rounded-3 overflow-hidden">
          <tbody>
            <Tr>
              <th scope="row"><div className='icon'><Badge pill>Food</Badge> &#x1F372;</div></th>
              <td>MCD</td>
              <td>RHB Credit Card</td>
              <td>RM 5.00</td>
              <td><BiDetail className="icon" /></td>
            </Tr>
            <Tr>
              <th scope="row"><div className='icon'><Badge pill>Online Shopping</Badge></div></th>
              <td></td>
              <td>Cash</td>
              <td>RM 10000.00</td>
              <td><BiDetail className='icon' /></td>
            </Tr>
          </tbody>
        </Table>
      </Container>
    </Section>


  )
}
export default Expenses