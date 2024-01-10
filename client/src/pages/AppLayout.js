import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../components'

const AppLayout = () => {
  return (
    <div className='d-flex vh-100'>
      <Sidebar />
      <main className='flex-grow-1 overflow-auto'>
        <Header />
        <Outlet className="justify-content-center"/>
      </main>
    </div>
  );
}
export default AppLayout