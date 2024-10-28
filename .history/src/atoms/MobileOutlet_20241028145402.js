// Layout.js
import React from 'react';
import Header from "./DashHeader"; // Import your header component
import Mobilehome from './Mobilehome'; // Import your bottom navigation component
import { Outlet, useLocation } from 'react-router-dom';

function Layout() {

  const location = useLocation();
  const showBottomNav = location.pathname.startsWith('/dash');

  return (
    <div>
            {showBottomNav && <Header />} {/* Render bottom navigation only on /dash */}
      <div className="content">
        <Outlet /> {/* This renders the child routes */}
      </div>
      {showBottomNav && <Mobilehome />} {/* Render bottom navigation only on /dash */}
    </div>
  );
}

export default Layout;
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
      <Header /> {/* Render Header for all routes */}
      <div className="content">
        <Outlet /> {/* Render the child routes */}
      </div>
      {showBottomNav && <Mobilehome />} {/* Render bottom navigation only on specified routes */}
    </div>
  );
}

export default Layout;
