import { LayoutContainer } from './style';
import { Outlet } from 'react-router-dom';
import SideMenu from '../SideMenu';

function Layout() {
  return (
    <LayoutContainer>
      <SideMenu />
      <Outlet />
    </LayoutContainer>
  );
}

export default Layout;
