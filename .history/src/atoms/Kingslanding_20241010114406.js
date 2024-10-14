// Kingslanding.js
import React, { useContext, useEffect } from 'react';
import "./Kingslanding.css";
import HeaderGlass from './HeaderGlass';
import AllEventsAtom from './AllEventsAtom';
import Footer from "./Footer";
import Recents from "./Recents.js"

function Kingslanding() {


  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (userObject) {
      navigate('/dash');
    }
  }, [userObject, navigate]);


  return (
    <div className='kings-holder'>
      <div className='content'>
        <HeaderGlass />
        <AllEventsAtom />
        {/* Pass events array to AllEventsAtom */}
        <Recents/>
        <Footer />
      </div>
    </div>
  );
}

export default Kingslanding;
