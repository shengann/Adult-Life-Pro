import { FriendsTable } from '../components';
import { Row, Col,Container} from 'react-bootstrap';
import { useGetFriendsQuery } from '../slices/friendsSlice';

const Friends = () => {
  const { data: friends } = useGetFriendsQuery()
  return (
    <div className="mt-2">
      <Container>
        <Row>
          <Col><FriendsTable data={friends} title={"You own"}/></Col>
          <Col><FriendsTable data={friends} title={"you are owned"}/></Col>
        </Row>
      </Container>
      
    </div>
  )
}
export default Friends