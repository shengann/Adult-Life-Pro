import Table from 'react-bootstrap/Table';
import { RxAvatar } from "react-icons/rx";
import styled from 'styled-components';

const Section = styled.section`
  width: 90%;

  @media (min-width: 640px) {
      width: 45%;
  }
`
const FriendsTable = ({ data, title, tableId }) => {
  return (
    <Section>
      <div className="border rounded-3 mb-2 bg-secondary bg-gradient text-white w-50 d-flex align-items-center" style={{ height: '5vh' }}>
        <span className="ms-2">{title}</span>
      </div>
      <Table hover className="table rounded-3 overflow-hidden table-responsive">
        <tbody>
          {data && data.length > 0 && data.map((item, index) => {
            return (
              <>
                <tr>
                  <td><span className="fs-5 me-3"><RxAvatar /></span>{item.name}</td>
                  <td></td>
                  <td>$ {item.amount}</td>
                </tr>
              </>
            )
          })
          }
        </tbody>
      </Table>
    </Section>

  )
}
export default FriendsTable