// Layout.js
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header'; // Your header component
import Mobilehome from './Mobilehome'; // Your bottom navigation component

function Layout() {
  const location = useLocation();
  
  // Define the paths where you want to show the bottom navigation
  const pathsWithBottomNav = ['/dash', '/userdetails', '/currentevent', '/content'];

  const showBottomNav = pathsWithBottomNav.some(path => location.pathname.startsWith(path));

  return (
    <div>
            {showBottomNav && <Header />} {/* Render bottom navigation only on specified routes */}

      {/* <Header /> Render Header for all routes */}
      <div className="content">
        <Outlet /> {/* Render the child routes */}
      </div>
      {showBottomNav && <Mobilehome />} {/* Render bottom navigation only on specified routes */}
    </div>
  );
}

export default Layout;
