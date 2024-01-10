import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../components'

const AppLayout = () => {
  return (
    <div className='d-flex vh-100'>
      <Sidebar />
      <main className='flex-grow-1 overflow-auto'>
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
export default AppLayout