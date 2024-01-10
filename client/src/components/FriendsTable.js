import Table from 'react-bootstrap/Table';
import { RxAvatar } from "react-icons/rx";
const FriendsTable = ({ data, title }) => {
  return (
    <div className="table-responsive">
      <Table hover className="table rounded-3 overflow-hidden">
        <div className="border rounded-3 mb-2 bg-dark bg-gradient text-white" style={{ height: '5vh' }}>
          <span className="ms-2">{title}</span>
        </div>
        <tbody>
          {data && data.length > 0 && data.map((item, index) => {
            return (
              <tr key={index}>
                <td><span className="fs-5 me-3"><RxAvatar /></span>{item.name}</td>
                <td></td>
                <td>RM {item.amount}</td>
              </tr>
            )
          })
          }
        </tbody>
      </Table>
    </div>

  )
}
export default FriendsTable