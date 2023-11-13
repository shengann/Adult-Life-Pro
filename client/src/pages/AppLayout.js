import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../components'

const AppLayout = () => {
  return (
    <div className="d-flex flex-row gap-2" >
      <div >
        <Sidebar />
      </div>
      <div>
        <Header />
        <Outlet />
      </div>
    </div>

  )
}
export default AppLayout