import { FriendsTable } from '../components';
import { Row, Col,Container} from 'react-bootstrap';

const Friends = () => {
  return (
    <div className="mt-2">
      <Container>
        <Row>
          <Col><FriendsTable /></Col>
          <Col><FriendsTable /></Col>
        </Row>
      </Container>
      
    </div>
  )
}
export default Friends