import { FriendsTable } from '../components';
import { useGetReceivableQuery, useGetPayableQuery } from '../slices/friendsSlice';

const Friends = () => {
  const { data: receivable } = useGetReceivableQuery()
  const { data: payable } = useGetPayableQuery()

  return (
    <div className="mt-2 mx-2">
      <div className="d-flex flex-column flex-sm-row justify-content-evenly">
        <FriendsTable tableId="payable" data={payable} title={"You owe"}/>
        <FriendsTable tableId="receivable"  data={receivable} title={"you are owed"}/>
      </div>
      
    </div>
  )
}
export default Friends