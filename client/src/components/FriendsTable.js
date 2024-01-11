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
      <div className="border rounded-3 mb-2 bg-dark bg-gradient text-white w-50" style={{ height: '5vh' }}>
        <span className="ms-2">{title}</span>
      </div>
      <Table hover className="table rounded-3 overflow-hidden table-responsive">
        <tbody>
          {data && data.length > 0 && data.map((item, index) => {
            return (
              <>
                <tr data-bs-toggle="collapse" data-bs-target={`#${tableId}_r${index}`} aria-expanded="false">
                  <td><span className="fs-5 me-3"><RxAvatar /></span>{item.name}</td>
                  <td></td>
                  <td>RM {item.amount}</td>
                </tr>
                <tr className="collapse" id={`${tableId}_r${index}`} data-bs-parent={`#${tableId}`}>
                  <td colspan="5">
                    <Table className="w-25">
                      <thead>
                        <tr>
                          <th>test</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>test</td>
                        </tr>
                      </tbody>
                    </Table></td>
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