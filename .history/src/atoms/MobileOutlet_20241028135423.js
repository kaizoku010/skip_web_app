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
      <Header /> {/* Your header */}
      <div className="content">
        <Outlet /> {/* This renders the child routes */}
      </div>
      {showBottomNav && <Mobilehome />} {/* Render bottom navigation only on /dash */}
    </div>
  );
}

export default Layout;
