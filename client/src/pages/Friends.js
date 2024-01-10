import { FriendsTable } from '../components';
import { useGetFriendsQuery } from '../slices/friendsSlice';

const Friends = () => {
  const { data: friends } = useGetFriendsQuery()
  return (
    <div className="mt-2 mx-2">
      <div className="d-flex flex-column flex-sm-row justify-content-evenly">
        <FriendsTable data={friends} title={"You own"}/>
        <FriendsTable data={friends} title={"you are owned"}/>
      </div>
      
    </div>
  )
}
export default Friends