import Table from 'react-bootstrap/Table';
import { RxAvatar } from "react-icons/rx";
const FriendsTable = () => {
  return (
    <div className="table-responsive">
      <Table hover className="table rounded-3 overflow-hidden">
        <div className="border rounded-3 mb-2 bg-dark bg-gradient text-white">
          You Owe
        </div>
        <tbody>
          <tr>
            <td><span className="fs-5"><RxAvatar /></span></td>
            <td>Wong Sheng Ann</td>
            <td>RM 1009</td>
          </tr>
        </tbody>
      </Table>
    </div>

  )
}
export default FriendsTable