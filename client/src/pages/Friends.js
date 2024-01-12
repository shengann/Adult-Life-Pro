import { FriendsTable } from '../components';
import FriendsCard from '../components/FriendsCard';
import { useGetReceivableQuery, useGetPayableQuery } from '../slices/friendsSlice';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Friends = () => {
  const { data: receivable } = useGetReceivableQuery()
  const { data: payable } = useGetPayableQuery()

  return (
    <div className="mt-2 mx-2">
      <div className="d-flex flex-column flex-sm-row justify-content-evenly">
        <FriendsTable tableId="payable" data={payable} title={"You owe"}/>
        <span class="d-none d-sm-block vr"></span>
        <FriendsTable tableId="receivable"  data={receivable} title={"you are owed"}/>
      </div>
      <Container className='mt-4'>
        <Row  xs={2} sm={2} md={3} lg={4} xl={5} className='mb-4'>
          <Col className='my-2'><FriendsCard /></Col>
          <Col><FriendsCard /></Col>
          <Col><FriendsCard /></Col>
          <Col><FriendsCard /></Col>
          <Col><FriendsCard /></Col>
        </Row>
      </Container>
    </div>
  )
}
export default Friends