import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../components'
import { useState } from 'react';

const AppLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className='d-flex vh-100'>
      {
        showSidebar && <Sidebar />
      }
      <main className='flex-grow-1 overflow-auto'>
        <Header 
          handleShowSidebar={handleShowSidebar}
        />
        <Outlet />
      </main>
    </div>
  );
}
export default AppLayout