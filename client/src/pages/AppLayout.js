import { Outlet } from 'react-router-dom'
import { Header, Sidebar } from '../components'
import styled from 'styled-components';

const StyledAppLayout = styled.div`
  display: flex;
  height: 100vh; // Set the height of the main container to 100vh
`;

const MainContent = styled.div`
  flex: 1; // Use flex to make sure this div takes the remaining space
  overflow-y: auto; // Allow the content to scroll if it overflows
`;

const AppLayout = () => {
  return (
    <StyledAppLayout>
      <Sidebar />
      <MainContent>
        <Header />
        <Outlet />
      </MainContent>
    </StyledAppLayout>
  );
}
export default AppLayout