// Kingslanding.js
import React, { useContext, useEffect } from 'react';
import "./Kingslanding.css";
import HeaderGlass from './HeaderGlass';
import AllEventsAtom from './AllEventsAtom';
import Footer from "./Footer";
import Recents from "./Rec"

function Kingslanding() {

  return (
    <div className='kings-holder'>
      <div className='content'>
        <HeaderGlass />
        <AllEventsAtom />
        {/* Pass events array to AllEventsAtom */}
        <7
        <Footer />
      </div>
    </div>
  );
}

export default Kingslanding;
