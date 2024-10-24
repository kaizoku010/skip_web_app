// Kingslanding.js
import React, { useContext, useEffect } from 'react';
import "./Kingslanding.css";
import HeaderGlass from './HeaderGlass';
import AllEventsAtom from './AllEventsAtom';
import Footer from "./Footer";

function Kingslanding() {


  useEffect(() => {
    // Ensure events are correctly logged or handled here
  }, [events]);

  // if (loading) {
  //   return <p>Loading events...</p>;
  // }

  // if (error) {
  //   return <p>Error fetching events: {error.message}</p>;
  // }

  return (
    <div className='kings-holder'>
      <div className='content'>
        <HeaderGlass />
        <AllEventsAtom />
        {/* Pass events array to AllEventsAtom */}
        <Footer />
      </div>
    </div>
  );
}

export default Kingslanding;
